"use client";
import { useState } from "react";
import QuickLead from "@/components/sections/QuickLead";
import { CAMERA_OPTIONS } from "@/lib/leads";
import {
  SITE_TYPES,
  PROBLEMS,
  readinessChecklist,
  projectBrief,
} from "@/lib/b2b/readiness";
export default function ReadinessAssessment({
  id = "camera-readiness",
}: {
  id?: string;
}) {
  const [site, setSite] = useState("Not sure"),
    [cameras, setCameras] = useState("Not sure"),
    [problem, setProblem] = useState("Not sure");
  const input = { site, cameras, problem };
  return (
    <div className="assessment" id={id}>
      <p className="kicker">CAMERA READINESS ASSESSMENT</p>
      <h2>A useful brief. Before a sales call.</h2>
      <p className="buyer-lede">
        Choose what you know. Get a preliminary checklist immediately, without
        giving contact details. This tool prepares questions; it does not
        inspect your cameras.
      </p>
      <a className="text-link" href={`#${id}-callback`}>
        Skip to a callback request →
      </a>
      <div className="assessment-layout">
        <div className="assessment-controls">
          <label htmlFor={`${id}-site`}>
            Site type (optional)
            <select
              id={`${id}-site`}
              value={site}
              onChange={(e) => setSite(e.target.value)}
            >
              {SITE_TYPES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label htmlFor={`${id}-count`}>
            Camera band (optional)
            <select
              id={`${id}-count`}
              value={cameras}
              onChange={(e) => setCameras(e.target.value)}
            >
              {CAMERA_OPTIONS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label htmlFor={`${id}-problem`}>
            Main problem (optional)
            <select
              id={`${id}-problem`}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            >
              {PROBLEMS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <p>
            Never enter CCTV passwords, RTSP credentials or unrestricted
            live-access links. A later footage review requires a separately
            agreed, permissioned process.
          </p>
          <p>
            <a href="/platform/compatibility" className="text-link">
              Read the compatibility requirements →
            </a>
          </p>
        </div>
        <section
          className="assessment-result"
          aria-label="Your preliminary project brief"
          aria-live="polite"
        >
          <h3>Your preliminary project brief</h3>
          <dl>
            <dt>Site / camera band</dt>
            <dd>
              {site} / {cameras}
            </dd>
            <dt>Requested problem</dt>
            <dd>{problem}</dd>
            <dt>Compatibility</dt>
            <dd>
              Not yet verified — model, firmware and representative scenes need
              technical review.
            </dd>
          </dl>
          <ul className="buyer-list">
            {readinessChecklist(input).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => window.print()}
          >
            Print / save this brief
          </button>
          <p className="buyer-micro">
            Prepared from your selections. Not a compatibility certificate or
            performance score.
          </p>
        </section>
      </div>
      <div id={`${id}-callback`} className="assessment-callback">
        <h3>Request a technical callback</h3>
        <p className="mb-6">
          Only your phone number is required. Your selected site, camera band
          and problem accompany the request. We will agree the next step with
          you.
        </p>
        <QuickLead
          cta={id}
          context={projectBrief(input)}
          initialCameras={cameras}
        />
      </div>
      <noscript>
        <p>
          The checklist above is available without JavaScript. For a callback,
          call <a href="tel:+916283993600">+91 62839 93600</a>.
        </p>
      </noscript>
    </div>
  );
}
