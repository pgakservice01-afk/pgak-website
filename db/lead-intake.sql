-- Run only in the approved private intake database after review. No public policies.
-- Uses PostgREST / Supabase RPC and the service_role only. Retention is an operator duty.
begin;
create table if not exists public.website_receipts (
 ref text primary key, token_hash text not null, payload jsonb not null,
 details jsonb not null default '{}', created_at timestamptz not null default now(),
 owner_queue text not null default 'website-sales', crm_id text
);
create table if not exists public.website_outbox (
 id bigint generated always as identity primary key,
 ref text not null references public.website_receipts(ref), kind text not null check(kind in ('crm','notification')),
 version integer not null default 1, payload jsonb not null,
 state text not null default 'queued' check(state in ('queued','processing','delivered','attention')),
 attempts integer not null default 0, next_attempt_at timestamptz not null default now(),
 lease_until timestamptz, lease_token uuid, last_error text, delivered_at timestamptz,
 unique(ref,kind,version)
);
alter table public.website_receipts enable row level security;
alter table public.website_outbox enable row level security;
revoke all on public.website_receipts,public.website_outbox from anon,authenticated;
create or replace function public.accept_website_lead(p_ref text,p_token_hash text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare r website_receipts;
begin
 insert into website_receipts(ref,token_hash,payload) values(p_ref,p_token_hash,p_payload) on conflict do nothing;
 select * into r from website_receipts where ref=p_ref for update;
 if r.token_hash<>p_token_hash then raise exception 'reference conflict'; end if;
 -- Preserve the first accepted payload and attribution. Retry never creates another enquiry.
 insert into website_outbox(ref,kind,payload) values(p_ref,'crm',r.payload) on conflict do nothing;
 insert into website_outbox(ref,kind,payload) values(p_ref,'notification',jsonb_build_object('ref',p_ref)) on conflict do nothing;
 return jsonb_build_object('received',true,'ref',p_ref,'state',case when r.crm_id is null then 'queued' else 'delivered' end);
end $$;
create or replace function public.enrich_website_lead(p_ref text,p_token_hash text,p_details jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare r website_receipts; v integer;
begin
 select * into r from website_receipts where ref=p_ref and token_hash=p_token_hash for update;
 if not found then raise exception 'receipt not found'; end if;
 update website_receipts set details=p_details where ref=p_ref;
 -- Details stay with the durable receipt. The CRM adapter must support updates before dispatch.
 -- No second lead is created and no claimed delivery is made for supplemental details.
 return jsonb_build_object('saved',true);
end $$;
create or replace function public.claim_website_outbox(p_limit integer default 5)
returns setof website_outbox language plpgsql security definer set search_path=public as $$
begin
 update website_outbox set state='attention',last_error='LEASE_EXHAUSTED' where state='processing' and lease_until<now() and attempts>=8;
 return query
 with jobs as (select id from website_outbox where (state='queued' or (state='processing' and lease_until<now())) and next_attempt_at<=now() and attempts<8 order by id for update skip locked limit least(greatest(p_limit,1),5))
 update website_outbox o set state='processing', attempts=o.attempts+1,lease_until=now()+interval '2 minutes',lease_token=gen_random_uuid() from jobs where o.id=jobs.id returning o.*;
end $$;
create or replace function public.finish_website_outbox(p_id bigint,p_lease uuid,p_success boolean,p_crm_id text default null,p_error text default null)
returns void language plpgsql security definer set search_path=public as $$
declare j website_outbox;
begin
 select * into j from website_outbox where id=p_id and lease_token=p_lease and state='processing' for update;
 if not found then return; end if;
 update website_outbox set state=case when p_success then 'delivered' when attempts>=8 then 'attention' else 'queued' end,
 delivered_at=case when p_success then now() else null end,lease_until=null,
 next_attempt_at=now()+make_interval(secs=>least(3600,30*power(2,attempts)::integer)),last_error=left(p_error,80) where id=p_id;
 if p_success and j.kind='crm' then update website_receipts set crm_id=p_crm_id where ref=j.ref; end if;
end $$;
revoke all on function public.accept_website_lead(text,text,jsonb),public.enrich_website_lead(text,text,jsonb),public.claim_website_outbox(integer),public.finish_website_outbox(bigint,uuid,boolean,text,text) from public,anon,authenticated;
grant execute on function public.accept_website_lead(text,text,jsonb),public.enrich_website_lead(text,text,jsonb),public.claim_website_outbox(integer),public.finish_website_outbox(bigint,uuid,boolean,text,text) to service_role;
commit;
