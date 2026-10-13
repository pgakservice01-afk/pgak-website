import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import CalculatorLinks from "@/components/calc/CalculatorLinks";
import JsonLd from "@/components/JsonLd";
import ScopeAndEvidence from "@/components/sections/ScopeAndEvidence";
import WorkflowDiagram from "@/components/visuals/WorkflowDiagram";
import { faqSchema } from "@/lib/schema";
import { scopeTasks } from "@/lib/scope-tasks";
import { pageMeta } from "@/lib/seo";
import { SYSTEM_FLOW } from "@/lib/visuals";

/**
 * The buyer's guide for "video analytics software" (Search Console position
 * ~51 before this rebuild; the result page is "best N" lists and vendor
 * platforms). It gives a researcher the questions and tests to judge any
 * supplier, rather than ranking anyone — and every PGAK statement on it comes
 * from a registry: tasks and evidence from lib/scope-tasks.ts (feature-truth),
 * the flow from lib/visuals.ts, the internet note from lib/compat.ts, the
 * quote lines from the homepage's pricing rows. No price, accuracy figure or
 * customer name appears here.
 */

const TITLE = "Video analytics software for the CCTV you already have";
const INTRO =
  "How video analytics software works on cameras you already own, what it can be asked to detect, what your cameras need, and how to compare suppliers before you buy.";

export const metadata = pageMeta({
  title: "Video Analytics Software for Existing CCTV | PGAK",
  description:
    "How video analytics software works on the CCTV you already have, what it can detect, what your cameras need, and how to compare suppliers before you buy.",
  path: "/video-analytics-software",
});

const COMPARE: [string, string, string][] = [
  ["What you buy", "Software plus a processing unit at the site; the cameras stay", "New cameras with analytics built in, often with their own recorder or app"],
  ["Existing cameras", "Reused where the stream, placement and light suit the task", "Replaced, or kept only for plain recording"],
  ["Site work", "Power and a network connection for the unit; some small works may be needed", "Cabling and mounting for each replaced camera"],
  ["Choice of analytics", "Chosen per camera and per task in the written scope", "Limited to what that camera model supports"],
  ["When it fits", "Cameras stream over the network and already look at the right place", "Cameras are failing, analogue-only with no usable stream, or pointed where the task cannot be seen"],
];

const QUESTIONS: [string, string][] = [
  ["Which of my cameras will it work on, and how do you know?", "A per-camera answer after checking make, model, stream and view, not a brand list."],
  ["Show me it working on a scene like mine.", "A dated recording with its conditions and limits, or a test on your own footage."],
  ["Where does the processing happen?", "On a named unit at your site or in the cloud, with what each needs from your network."],
  ["What happens when the internet goes down?", "Which functions keep working locally, and which alerts cannot leave the site until it is back."],
  ["How will we measure false alerts and missed events?", "An agreed test: conditions, duration, how the true count is taken, and the pass mark."],
  ["What is in the quote, line by line?", "Hardware, installation, licence or support, optional items and anything quoted separately — with taxes shown."],
  ["Who sees the footage and the data?", "Who has access, how long it is kept, where it is stored, and how it is deleted."],
];

const QUOTE_LINES: [string, string][] = [
  ["One-time", "Processing hardware, installation and configuration, and any camera that has to be moved or added — each line named."],
  ["Recurring, if your scope has any", "Licence or support, with the term and how renewal is priced stated in the quote."],
  ["Optional", "More analytics, more sites, extended support hours."],
  ["Quoted separately if needed", "Civil works, new cable runs, barriers and network upgrades."],
];

const FAQS = [
  {
    q: "Does video analytics software work with Hikvision, CP Plus or Dahua cameras?",
    a: "Often, but the brand does not settle it. What decides it is whether the recorder or camera provides a standard network stream (RTSP or ONVIF), and whether the camera's placement and light suit the task. That is checked per camera before anything is quoted.",
  },
  {
    q: "Does it need internet?",
    a: "Detection runs on a processing unit at the site, so detection and local recording can continue without internet. Alerts to phones and remote viewing need a working connection to reach anyone off site.",
  },
  {
    q: "Does it replace my recorder or VMS?",
    a: "No. Analytics evaluates events in the video; the recorder or VMS still handles recording, playback, retention and user permissions. The quote should say which system does what.",
  },
  {
    q: "How accurate is it?",
    a: "It depends on the camera view, light, distance and the event itself, so there is no honest single figure. Measure it in a pilot on your own cameras, with false alerts and missed events counted against an agreed method.",
  },
  {
    q: "What does video analytics software cost?",
    a: "PGAK does not publish a per-camera price, because it moves with camera count, the analytics on each camera, the number of sites and the processing each site needs. Every quote is itemised into one-time, recurring, optional and separately quoted lines.",
  },
];

export default function Page() {
  const tasks = scopeTasks();
  return (
    <BuyerPage title={TITLE} intro={INTRO} path="/video-analytics-software" eyebrow="BUYER'S GUIDE">
      <JsonLd nodes={[faqSchema(FAQS)]} id="video-analytics-faq" />
      <section>
        <h2>What video analytics software does</h2>
        <p>
          <strong>
            Straight answer: video analytics software reads a feed from cameras that are already
            installed and flags one defined event — a person crossing a boundary, a vehicle stopping
            where it should not, a camera that has gone dark — so a person reviews the exception
            instead of watching every screen. The decision worth making is which single event it
            must detect, and what evidence shows it does so on your own cameras.
          </strong>
        </p>
      </section>

      <section>
        <h2>How it works on cameras you already have</h2>
        <p>
          The cameras and recorder stay. A processing unit at the site reads their streams, raises
          an event when the defined condition is met, and a person decides what to do with it.
        </p>
        <WorkflowDiagram visual={SYSTEM_FLOW} />
      </section>

      <section>
        <h2>What it can be asked to detect</h2>
        <p>
          Each task needs something different from the camera. The last column is what PGAK has
          published for that task, taken from its evidence register — not a promise for your site.
        </p>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">What the camera must provide</th>
                <th scope="col">What PGAK has published</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <th scope="row">
                    <a href={t.calculatorHref} className="text-link">
                      {t.label}
                    </a>
                  </th>
                  <td>{t.needs}</td>
                  <td>{t.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="/resources/evidence" className="text-link">
          Watch PGAK&rsquo;s recorded demonstrations →
        </a>
      </section>

      <section>
        <h2>Software on existing cameras, or new AI cameras?</h2>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <thead>
              <tr>
                <td></td>
                <th scope="col">Analytics software on existing CCTV</th>
                <th scope="col">New cameras with built-in AI</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([k, a, b]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The honest answer is often a mix: keep the cameras that already see the right thing, and
          move or add only the ones that do not.{" "}
          <a href="/calculators/retrofit-vs-replacement" className="text-link">
            Compare the two on your own quotes
          </a>
          .
        </p>
      </section>

      <section>
        <h2>What your cameras and site need</h2>
        <ol className="buyer-list">
          <li>A standard network stream from the recorder or each camera (RTSP or ONVIF).</li>
          <li>A local network connection between the recorder and the processing unit.</li>
          <li>Power and a ventilated spot for the processing unit near the recorder.</li>
          <li>A camera view and enough light for the task — a plate, a face, a hand or a boundary.</li>
        </ol>
        <p>
          Do not send passwords, IP addresses or stream links to anyone to find out.{" "}
          <a href="/platform/compatibility#check" className="text-link">
            Check whether your cameras can be used
          </a>{" "}
          — it runs in your browser and asks for none of them.
        </p>
      </section>

      <section>
        <h2>Seven questions to ask any video analytics supplier</h2>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <thead>
              <tr>
                <th scope="col">Ask</th>
                <th scope="col">A useful answer looks like</th>
              </tr>
            </thead>
            <tbody>
              {QUESTIONS.map(([q, a]) => (
                <tr key={q}>
                  <th scope="row">{q}</th>
                  <td>{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          A claim to work with every camera, need no hardware or eliminate false alarms is not
          something you can test. Ask for the conditions instead.
        </p>
      </section>

      <section>
        <h2>What a quote should contain</h2>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <tbody>
              {QUOTE_LINES.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <a href="/resources/scope-worksheet" className="text-link">
            Build your scope before asking for prices
          </a>{" "}
          · <a href="/pricing" className="text-link">How PGAK pricing works</a>
        </p>
      </section>

      <section>
        <h2>Pilot before you commit</h2>
        <p>
          Agree the conditions, the duration, how the true count is taken and the pass mark before
          the pilot starts. A demonstration on someone else&rsquo;s scene is not a measurement on
          yours.
        </p>
        <a href="/resources/evaluation-method" className="text-link">
          Use the evaluation method and pilot scorecard →
        </a>
      </section>

      <section>
        <h2>Analytics is not the same as a VMS</h2>
        <p>
          Recording, playback, storage retention and user permissions need their own specification.
          A full PGAK replacement VMS is unverified; describe the role of the existing recorder
          explicitly.
        </p>
        <a href="/platform/vms-integration" className="text-link">
          Explore VMS integration requirements →
        </a>
      </section>

      <section className="buyer-faq">
        <h2>Questions buyers ask</h2>
        {FAQS.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <CalculatorLinks path="/video-analytics-software" />
      <ScopeAndEvidence path="/video-analytics-software" variant="buyer" />
      <BuyerCTA />
    </BuyerPage>
  );
}
