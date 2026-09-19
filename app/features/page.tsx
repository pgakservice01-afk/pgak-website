import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import FeatureExplorer from '@/components/FeatureExplorer';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { CAPABILITIES } from '@/lib/capabilities';
import styles from './features.module.css';

export const metadata: Metadata = pageMeta({ title:'20 AI CCTV Features for Indian Businesses | PGAK', description:'Explore 20 AI camera capabilities: smart search, intrusion alerts, ANPR, PPE, occupancy and more. See Indian use cases and camera compatibility requirements.', path:'/features' });
export default function FeaturesPage() {
  return <><JsonLd nodes={[webPageSchema({path:'/features',name:'20 AI CCTV capabilities for Indian businesses',description:'Explore AI video analytics capabilities, Indian use cases and hardware requirements.'}),breadcrumbSchema([{name:'Home',path:'/'},{name:'Features',path:'/features'}])]} /><Nav /><main id="main-content" className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroCopy}><p className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span>Features</p><p className={styles.kicker}>A MORE INTELLIGENT VIEW</p><h1>AI CCTV features.<br />Made clear.</h1><p className={styles.lead}>Find the moment. Understand the activity.<br />Help your team act sooner.</p><p className={styles.description}>Explore 20 AI CCTV camera features for Indian businesses. See how video analytics can help with intrusion alerts, number plate recognition, people counting and faster footage searches.</p><div className={styles.actions}><a href="#explore-features" className="btn btn-primary">Explore all 20 features ↓</a><Link href="/free-audit" className={styles.textLink}>Check my cameras ↗</Link></div><p className={styles.note}>The right capabilities depend on your cameras, hardware and software. We confirm compatibility before recommending a setup.</p></div>
      <div className={styles.heroImage}><Image src="/features/india-factory.webp" alt="Workers and textile machinery inside an Indian factory" fill priority sizes="(max-width: 800px) 100vw, 52vw" /><div className={styles.sceneLabel}><span>INDUSTRIAL SPACES / INDIA</span><p>Intelligence starts<br />with the right view.</p><small>Illustrative photograph · EqualStock IN / Pexels</small></div></div>
    </section>
    <div className={styles.strip}><span><b>20</b> capabilities to explore</span><span>Indian business use cases</span><span>Clear compatibility requirements</span></div>
    <FeatureExplorer />
    <section className={styles.guides}><p className={styles.kicker}>GO A LITTLE DEEPER</p><h2>Practical guides for your next step.</h2><div>{CAPABILITIES.map(c => <Link href={`/features/${c.slug}`} key={c.slug}>{c.navLabel}<span aria-hidden="true">↗</span></Link>)}</div></section>
  </main><Footer /></>;
}
