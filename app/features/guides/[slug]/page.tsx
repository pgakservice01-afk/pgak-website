import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import JsonLd from '@/components/JsonLd';
import ProofVideo from '@/components/ProofVideo';
import { EXPLORER_FEATURES, FEATURE_PHOTOS } from '@/lib/feature-explorer';
import { FEATURE_GUIDES } from '@/lib/feature-guides';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/schema';
import styles from './guide.module.css';

export function generateStaticParams() { return EXPLORER_FEATURES.map(f => ({slug:f.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const f=EXPLORER_FEATURES.find(f=>f.slug===slug); const g=FEATURE_GUIDES[slug];
  if(!f||!g) return {};
  return pageMeta({title:guideTitle(g.keyword),description:guideDescription(g.intro,f.description),path:`/features/guides/${slug}`});
}

/**
 * Titles and descriptions for 24 template-generated pages.
 *
 * Both were measured against the live site on 2026-09-24 and both were wrong
 * in the same systematic way a template gets things wrong — every page at once.
 *
 * Titles: "<keyword>: Uses & Setup | PGAK" fitted most keywords and pushed four
 * past 60 characters, so the suffix is dropped when the keyword is long rather
 * than letting the brand get cut off mid-word in the SERP.
 *
 * Descriptions: the card blurb (`f.description`) was reused as the meta
 * description, which left 23 of 24 pages under 120 characters — a third of the
 * snippet width thrown away on the pages the homepage chooser feeds. The
 * guide's own intro is longer, per-page and already written for a reader, so it
 * is trimmed to a sentence or word boundary instead.
 */
function guideTitle(keyword: string): string {
  const full = `${keyword}: Uses & Setup | PGAK`;
  if (full.length <= 60) return full;
  const short = `${keyword} | PGAK`;
  return short.length <= 60 ? short : keyword.slice(0, 57).trimEnd() + "…";
}

function guideDescription(intro: string, fallback: string): string {
  const source = intro.length >= 120 ? intro : `${intro} ${fallback}`.trim();
  if (source.length <= 158) return source;
  // Prefer ending on a sentence; otherwise the last whole word.
  const window = source.slice(0, 158);
  const stop = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "));
  if (stop >= 120) return window.slice(0, stop + 1);
  return window.slice(0, window.lastIndexOf(" ")).trimEnd() + "…";
}
export default async function Guide({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const f=EXPLORER_FEATURES.find(f=>f.slug===slug); const g=FEATURE_GUIDES[slug];
  if(!f||!g) notFound();
  // A feature whose authorised illustration does not exist yet renders without
  // a figure. Borrowing another feature's photo would caption the wrong scene.
  const photo=f.image?FEATURE_PHOTOS[f.image]:null; const path=`/features/guides/${slug}`;
  const related=EXPLORER_FEATURES.filter(r=>r.category===f.category&&r.slug!==slug).slice(0,3);
  return <><Nav/><JsonLd nodes={[webPageSchema({path,name:g.keyword,description:f.description}),breadcrumbSchema([{name:'Home',path:'/'},{name:'AI CCTV features',path:'/features'},{name:g.keyword,path}]),faqSchema([{q:g.question,a:g.answer}])]} />
    <main id="main-content" className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/features">AI CCTV features</Link><span>/</span><span>{f.tag}</span></nav>
      <header className={styles.header}><p className={styles.eyebrow}>{f.category} · Feature guide</p><h1>{g.keyword}</h1><p className={styles.lead}>{g.intro}</p></header>
      {photo&&<figure className={styles.figure}><Image src={photo.src} alt={photo.alt} width={1200} height={800} priority sizes="(max-width: 800px) 100vw, 1100px"/><figcaption>AI-generated illustration of {f.tag.toLowerCase()}. The scene and overlays explain the concept; they are not a PGAK screenshot or measured result.</figcaption></figure>}
      <div className={styles.body}><article>
        {g.proofVideo && <section><h2>Seen on a real line</h2><p>Everything else illustrated on this site is a drawing of the idea. This is the product running.</p><div style={{marginTop:'1rem'}}><ProofVideo src={g.proofVideo.src} poster={g.proofVideo.poster} title={g.proofVideo.title} caption={g.proofVideo.caption} conditions={g.proofVideo.conditions} durationSeconds={g.proofVideo.durationSeconds} /></div></section>}
        <section><h2>How it works</h2><p>{f.description}</p></section>
        <section><h2>Where it could help your business</h2><p>{f.useCase}</p><p>{g.advice}</p></section>
        <section><h2>What your camera setup needs</h2><p>{f.requirement}</p></section>
        <section><h2>{g.question}</h2><p>{g.answer}</p></section>
        <section><h2>Check it on your own site</h2><p>Bring a camera model list and explain the event you want to find or detect. We can use that to scope a compatibility assessment. Ask for a written proposal naming the supported functions, processing hardware, licences and pilot checks before agreeing to an installation.</p><Link href="/free-audit" className="btn btn-primary">Check my camera setup →</Link></section>
      </article><aside><p className={styles.eyebrow}>PLAN BEFORE YOU BUY</p><h2>Is this the right fit?</h2><p>Feature availability varies by camera and software. A capability shown in this guide is not automatically included in a PGAK plan.</p><Link href="/pricing">Understand the cost drivers →</Link><Link href="/free-audit">Check camera compatibility →</Link>{f.source && <a href={f.source} target="_blank" rel="noreferrer">Manufacturer technology reference ↗</a>}<small>Editorial guide · Updated September 2026</small></aside></div>
      <section className={styles.related}><h2>Explore related AI camera features</h2><div>{related.map(r=><Link href={`/features/guides/${r.slug}`} key={r.slug}>{r.tag}<span>Read the guide ↗</span></Link>)}</div><Link href="/features">← All {EXPLORER_FEATURES.length} AI CCTV features</Link></section>
    </main><Footer/></>;
}
