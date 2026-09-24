import Link from "next/link";
import Image from "next/image";

import {
  BUYER_TASKS,
  featuresForTask,
  featuredCount,
  type FeatureEntry,
} from "@/lib/featureRegistry";

/**
 * "Choose what your cameras should help you detect" — the homepage entry into
 * the feature collection.
 *
 * Grouped by the job the buyer is doing (Protect, Investigate, Improve
 * operations, Connect) rather than by technology, because nobody arrives
 * wanting "object classification"; they arrive wanting to stop being called at
 * 2am about a dog.
 *
 * Everything is a server-rendered link. There is no filter to operate, no
 * carousel and no tab to click before the content exists, so every card and
 * its copy are crawlable and reachable by keyboard without JavaScript.
 *
 * Counts come from the registry. The number in the heading cannot drift.
 */

function Card({ f, priority }: { f: FeatureEntry; priority: boolean }) {
  return (
    <li className="card group flex flex-col overflow-hidden">
      {f.image ? (
        <div className="relative aspect-[16/9] border-b border-line">
          <Image
            src={f.image}
            alt={f.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            // Only the first row is eager: a phone should not pull eighteen
            // images before the visitor has scrolled to any of them.
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.05rem] font-semibold">{f.name}</h3>
        <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-soft">
          {f.benefit}
        </p>
        <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-faint">
          {f.compatibility}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          <Link
            href={f.route}
            data-cta="feature-explore"
            data-feature={f.id}
            className="text-[0.92rem] font-semibold text-accent underline underline-offset-4"
          >
            Explore this solution →
          </Link>
          <Link
            href={`/free-audit?feature=${f.id}`}
            data-cta="feature-enquiry"
            data-feature={f.id}
            className="text-[0.92rem] text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            Ask about it
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function FeatureChooser() {
  let rendered = 0;

  return (
    <section className="sec" id="choose-detection" aria-labelledby="choose-detection-h">
      <div className="wrap">
        <span className="eyebrow">What your cameras could do</span>
        <h2
          id="choose-detection-h"
          className="display mt-4 max-w-[26ch] text-[clamp(1.6rem,3.2vw,2.4rem)]"
        >
          Choose what your cameras should help you detect.
        </h2>
        <p className="mt-4 max-w-[68ch] text-ink-soft">
          {featuredCount()} solutions, grouped by what you are trying to get
          done. Each one says what it needs from your cameras before you ask us
          anything — including the ones that will not work on the view you have.
        </p>

        {BUYER_TASKS.map((task) => {
          const items = featuresForTask(task);
          if (items.length === 0) return null;
          return (
            <div key={task} className="mt-12">
              <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {task}
                <span className="ml-3 font-normal normal-case tracking-normal">
                  {items.length} solution{items.length === 1 ? "" : "s"}
                </span>
              </h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((f) => {
                  const priority = rendered < 3;
                  rendered += 1;
                  return <Card key={f.id} f={f} priority={priority} />;
                })}
              </ul>
            </div>
          );
        })}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            data-cta="chooser-upgrade"
            data-intent="assessment"
            className="btn btn-primary btn-wrap"
          >
            Upgrade my existing CCTV →
          </Link>
          <Link
            href="/cctv-installation-company#plan"
            data-cta="chooser-new-install"
            data-intent="new-installation"
            className="btn btn-ghost btn-wrap"
          >
            Plan a new installation →
          </Link>
          <Link
            href="/features"
            data-cta="chooser-all-features"
            className="self-center text-[0.92rem] text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            Explore more capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
