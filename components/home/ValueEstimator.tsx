"use client";

import { useState } from "react";

import FeatureScenarioTool from "@/components/calc/FeatureScenarioTool";
import type { ScenarioId } from "@/lib/calc/scenarios";

/**
 * Homepage value estimator: pick a task, change the assumptions, see the
 * result before any contact request. It reuses the tested scenario engine
 * (lib/calc/scenarios.ts) rather than a homepage-only formula, and the chosen
 * scenario id is carried into the assessment enquiry (see FeatureScenarioTool).
 */
const TASKS: { id: ScenarioId; label: string }[] = [
  { id: "C01", label: "Searching recorded footage" },
  { id: "C09", label: "Logging vehicles at a gate" },
  { id: "C29", label: "Counting at a loading bay" },
  { id: "C28", label: "Reconciling attendance" },
  { id: "C14", label: "Reviewing PPE observations" },
  { id: "C24", label: "Reusing cameras instead of replacing" },
];

export default function ValueEstimator() {
  const [task, setTask] = useState<ScenarioId>("C01");
  return (
    <div>
      <fieldset className="h-taskpick">
        <legend className="h-body">Choose a task</legend>
        <div className="h-taskpick__row">
          {TASKS.map((t) => (
            <label key={t.id} className={`h-chip${task === t.id ? " is-on" : ""}`}>
              <input
                type="radio"
                name="estimator-task"
                value={t.id}
                checked={task === t.id}
                onChange={() => setTask(t.id)}
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="h-estimator">
        <FeatureScenarioTool key={task} id={task} />
      </div>
    </div>
  );
}
