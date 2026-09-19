import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import JsonLd from '@/components/JsonLd';
import { EXPLORER_FEATURES, FEATURE_PHOTOS } from '@/lib/feature-explorer';
import { FEATURE_GUIDES } from '@/lib/feature-guides';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/schema';
import styles from './guide.module.css';

export function generateStaticParams() { return EXPLORER_FEATURES.map(f => ({slug:f.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const f=EXPLORER_FEATURES.find(f=>f.slug===slug); const g=FEATURE_GUIDES[slug];
  if(!f||!g) return {};
  return pageMeta({title:`${g.keyword}: Uses & Setup | PGAK`,description:f.description,path:`/features/guides/${slug}`});
}
export default async function Guide({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const f=EXPLORER_FEATURES.find(f=>f.slug===slug); const g=FEATURE_GUIDES[slug];
  if(!f||!g) notFound();
  const photo=FEATURE_PHOTOS[f.image]; const path=`/features/guides/${slug}`;
  const related=EXPLORER_FEATURES.filter(r=>r.category===f.category&&r.slug!==slug).slice(0,3);
  return <><Nav/><JsonLd nodes={[webPageSchema({path,name:g.keyword,description:f.description}),breadcrumbSchema([{name:'Home',path:'/'},{name:'AI CCTV features',path:'/features'},{name:g.keyword,path}]),faqSchema([{q:g.question,a:g.answer}])]} />
    <main id="main-content" className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/features">AI CCTV features</Link><span>/</span><span>{f.tag}</span></nav>
      <header className={styles.header}><p className={styles.eyebrow}>{f.category} · Feature guide</p><h1>{g.keyword}</h1><p className={styles.lead}>{g.intro}</p></header>
      <figure className={styles.figure}><Image src={photo.src} alt={photo.alt} width={1200} height={800} priority sizes="(max-width: 800px) 100vw, 1100px"/><figcaption>AI-generated illustration of {f.tag.toLowerCase()}. The scene and overlays explain the concept; they are not a PGAK screenshot or measured result.</figcaption></figure>
      <div className={styles.body}><article>
        <section><h2>How it works</h2><p>{f.description}</p></section>
        <section><h2>Where it could help your business</h2><p>{f.useCase}</p><p>{g.advice}</p></section>
        <section><h2>What your camera setup needs</h2><p>{f.requirement}</p></section>
        <section><h2>{g.question}</h2><p>{g.answer}</p></section>
        <section><h2>Check it on your own site</h2><p>Bring a camera model list and explain the event you want to find or detect. We can use that to scope a compatibility assessment. Ask for a written proposal naming the supported functions, processing hardware, licences and pilot checks before agreeing to an installation.</p><Link href="/free-audit" className="btn btn-primary">Check my camera setup →</Link></section>
      </article><aside><p className={styles.eyebrow}>PLAN BEFORE YOU BUY</p><h2>Is this the right fit?</h2><p>Feature availability varies by camera and software. A capability shown in this guide is not automatically included in a PGAK plan.</p><Link href="/pricing">Understand the cost drivers →</Link><Link href="/free-audit">Check camera compatibility →</Link><a href={f.source} target="_blank" rel="noreferrer">Manufacturer technology reference ↗</a><small>Editorial guide · Updated September 2026</small></aside></div>
      <section className={styles.related}><h2>Explore related AI camera features</h2><div>{related.map(r=><Link href={`/features/guides/${r.slug}`} key={r.slug}>{r.tag}<span>Read the guide ↗</span></Link>)}</div><Link href="/features">← All 20 AI CCTV features</Link></section>
    </main><Footer/></>;
}
