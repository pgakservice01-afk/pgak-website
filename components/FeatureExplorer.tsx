'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EXPLORER_FEATURES, FEATURE_CATEGORIES, FEATURE_PHOTOS } from '@/lib/feature-explorer';
import styles from './FeatureExplorer.module.css';

export default function FeatureExplorer() {
  const [category, setCategory] = useState<string>('All features');
  const [query, setQuery] = useState('');
  const visible = EXPLORER_FEATURES.filter(f => (category === 'All features' || f.category === category) && `${f.title} ${f.tag} ${f.description} ${f.useCase}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <section className={styles.explorer} id="explore-features" aria-labelledby="explorer-title">
      <div className={styles.intro}><div><p className={styles.eyebrow}>THE CAPABILITY COLLECTION</p><h2 id="explorer-title">Find the intelligence<br />your site needs.</h2></div><p>Explore 20 capabilities across investigation, protection, operations and camera technology. Availability is confirmed during your site assessment.</p></div>
      <div className={styles.controls}>
        <div className={styles.filters} aria-label="Filter features by category">{FEATURE_CATEGORIES.map(c => <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}>{c === 'All features' ? 'All features · 20' : c}</button>)}</div>
        <label className={styles.search}><span className="sr-only">Search features</span><span aria-hidden="true">⌕</span><input type="search" placeholder="Try ‘plates’ or ‘factory’" value={query} onChange={e => setQuery(e.target.value)} /></label>
      </div>
      <p className={styles.resultCount} aria-live="polite">{visible.length} of 20 features · Expand a card for use cases and requirements</p>
      <div className={styles.grid}>
        {visible.map(f => { const photo = FEATURE_PHOTOS[f.image]; const n = EXPLORER_FEATURES.indexOf(f) + 1; return <article className={styles.card} key={f.slug} id={f.slug}>
          <div className={styles.photo}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div>
          <p className={styles.photoCaption}>AI-generated feature illustration</p><div className={styles.cardBody}><p className={styles.category}>{String(n).padStart(2,'0')} / {f.tag}</p><h3>{f.tag}</h3><p className={styles.description}>{f.description}</p>
            <Link href={`/features/guides/${f.slug}`} className={styles.guideLink}>Read the full feature guide ↗</Link><details className={styles.details}><summary>Explore this feature <span aria-hidden="true">＋</span></summary><div className={styles.detailBody}><h4>An Indian use case</h4><p>{f.useCase}</p><h4>What your setup needs</h4><p>{f.requirement}</p><a href={f.source} target="_blank" rel="noreferrer">View technology reference ↗</a><Link href="/free-audit">Check my camera compatibility →</Link></div></details>
          </div>
        </article>; })}
      </div>
      {visible.length === 0 && <div className={styles.empty}><h3>No matching features.</h3><p>Try another word or browse the full collection.</p><button type="button" onClick={() => { setCategory('All features'); setQuery(''); }}>Reset filters</button></div>}
      <div className={styles.assessment}><div><p className={styles.eyebrow}>START WITH THE RIGHT FIT</p><h2>Twenty possibilities.<br />One plan for your site.</h2><p>Tell us what you need to detect. We’ll assess the camera views, processing, hardware and integrations needed before proposing a solution.</p></div><Link className="btn btn-primary" href="/free-audit">Get a free camera assessment ↗</Link></div>
      <details className={styles.credits}><summary>About these illustrations & technology references</summary><p>Each feature has its own AI-generated illustration in an Indian business context. Detection boxes, counts, alerts and screen interfaces are simulated to explain the capability. These are not PGAK product screenshots, real detection results, customer sites or performance comparisons.</p><p>This collection describes industry capabilities; availability depends on the proposed hardware, software and site assessment. Technology references are linked in each feature. The hero photograph is by <a href="https://www.pexels.com/photo/indian-textile-factory-workers-in-action-31091537/" target="_blank" rel="noreferrer">EqualStock IN / Pexels</a>. Collection reviewed September 2026.</p></details>
    </section>
  );
}
