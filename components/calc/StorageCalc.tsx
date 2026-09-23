"use client";

import { useMemo, useState } from "react";

import { AssumptionNote, NumberField, Row } from "@/components/calc/fields";
import { FORMULA_VERSION, computeStorage, formatNumber } from "@/lib/calc/engine";

/** Storage sizing. Decimal TB throughout, with reserve and RAID kept apart. */
export default function StorageCalc() {
  const [cameras, setCameras] = useState<number | null>(16);
  const [bitrate, setBitrate] = useState<number | null>(2);
  const [hours, setHours] = useState<number | null>(24);
  const [days, setDays] = useState<number | null>(30);
  const [usablePct, setUsablePct] = useState<number | null>(80);
  const [raid, setRaid] = useState<number | null>(1);

  const n = (v: number | null, d = 0) => (v === null ? d : v);
  const r = useMemo(
    () =>
      computeStorage({
        cameras: n(cameras),
        bitrateMbps: n(bitrate),
        hoursPerDay: n(hours),
        days: n(days),
        usableFraction: Math.min(1, Math.max(0.01, n(usablePct, 100) / 100)),
        raidOverheadFactor: n(raid, 1) > 1 ? n(raid, 1) : undefined,
      }),
    [cameras, bitrate, hours, days, usablePct, raid]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">Your recording</h2>
        <div className="mt-5 flex flex-col gap-4">
          <NumberField label="Cameras recording" unit="count" value={cameras} onChange={setCameras} min={1} max={512} slider />
          <NumberField
            label="Recorded bitrate per camera"
            unit="Mbps"
            value={bitrate}
            onChange={setBitrate}
            min={0.25}
            step={0.25}
            hint="Read it from your recorder's stream settings. Do not apply a codec saving on top of a measured figure."
          />
          <NumberField label="Recording hours per day" unit="hours" value={hours} onChange={setHours} min={1} max={24} slider />
          <NumberField label="Retention required" unit="days" value={days} onChange={setDays} min={1} max={365} slider />
          <NumberField
            label="Usable capacity for recording"
            unit="%"
            value={usablePct}
            onChange={setUsablePct}
            min={10}
            max={100}
            hint="Disks are not filled to 100%. 80% is a common working reserve."
          />
          <NumberField
            label="RAID overhead factor"
            unit="×"
            value={raid}
            onChange={setRaid}
            min={1}
            max={3}
            step={0.05}
            hint="1 = no RAID. Mirroring is roughly 2×. Kept separate from the reserve above, never folded into it."
          />
        </div>
      </div>

      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">What to buy</h2>
        <div className="mt-4">
          <Row label="Footage recorded" value={`${formatNumber(r.recordedTB, 3)} TB`} strong />
          <Row label="Per camera per day" value={`${formatNumber(r.perCameraPerDayGB, 1)} GB`} />
          <Row label={`Nominal at ${usablePct ?? 100}% usable`} value={`${formatNumber(r.nominalTB, 2)} TB`} strong />
          <Row label="With RAID overhead" value={r.withRaidTB === null ? "Not applied" : `${formatNumber(r.withRaidTB, 2)} TB`} />
        </div>
        <AssumptionNote>
          Decimal units: 1 TB = 1000 GB, the way drives are sold. Your operating system will report
          less. Formula version {FORMULA_VERSION}.
        </AssumptionNote>
        <p className="mt-4 text-[0.9rem] text-ink-soft">
          Retention is your recorder&rsquo;s job, not the analytics layer&rsquo;s: PGAK reads the
          streams and does not change how long footage is kept.
        </p>
      </div>
    </div>
  );
}
