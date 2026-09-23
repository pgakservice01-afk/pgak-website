"use client";

import { useMemo, useState } from "react";

import { AssumptionNote, NumberField, Row } from "@/components/calc/fields";
import {
  FORMULA_VERSION,
  computeBandwidth,
  formatINR,
  formatNumber,
} from "@/lib/calc/engine";

/** Link sizing and transfer cost. Headroom sizes the pipe, never the bytes. */
export default function BandwidthCalc() {
  const [streams, setStreams] = useState<number | null>(8);
  const [bitrate, setBitrate] = useState<number | null>(2);
  const [headroom, setHeadroom] = useState<number | null>(30);
  const [hours, setHours] = useState<number | null>(24);
  const [days, setDays] = useState<number | null>(30);
  const [tariff, setTariff] = useState<number | null>(null);

  const n = (v: number | null, d = 0) => (v === null ? d : v);
  const r = useMemo(
    () =>
      computeBandwidth({
        simultaneousStreams: n(streams),
        bitrateMbps: n(bitrate),
        headroomFraction: Math.max(0, n(headroom) / 100),
        hoursPerDay: n(hours),
        days: n(days),
        tariffPerGB: tariff,
      }),
    [streams, bitrate, headroom, hours, days, tariff]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">What leaves the site</h2>
        <div className="mt-5 flex flex-col gap-4">
          <NumberField
            label="Streams sent at the same time"
            unit="count"
            value={streams}
            onChange={setStreams}
            min={1}
            max={256}
            slider
            hint="With on-site processing this is usually a handful of streams, not every camera."
          />
          <NumberField label="Bitrate per stream" unit="Mbps" value={bitrate} onChange={setBitrate} min={0.25} step={0.25} />
          <NumberField
            label="Link headroom"
            unit="%"
            value={headroom}
            onChange={setHeadroom}
            min={0}
            max={200}
            hint="Spare capacity so the link is not run at 100%. It does not create extra data."
          />
          <NumberField label="Streaming hours per day" unit="hours" value={hours} onChange={setHours} min={1} max={24} slider />
          <NumberField label="Days" unit="days" value={days} onChange={setDays} min={1} max={365} slider />
          <NumberField
            label="Cloud transfer tariff"
            unit="₹ per GB"
            value={tariff}
            onChange={setTariff}
            allowUnknown
            step={0.5}
            hint="Use your provider's quoted rate. Leave as not known if nothing is going to a cloud."
          />
        </div>
      </div>

      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">What to provision</h2>
        <div className="mt-4">
          <Row label="Actual traffic" value={`${formatNumber(r.requiredMbps, 2)} Mbps`} strong />
          <Row label={`Link to buy (with ${headroom ?? 0}% headroom)`} value={`${formatNumber(r.recommendedLinkMbps, 2)} Mbps`} strong />
          <Row label="Data transferred" value={`${formatNumber(r.transferredGB, 0)} GB`} />
          <Row
            label="Transfer cost"
            value={r.transferCost === null ? "Tariff not known" : formatINR(r.transferCost)}
          />
        </div>
        <AssumptionNote>
          Transferred data is computed from the actual traffic figure, not the headroom figure:
          applying headroom to bytes would overstate every cloud bill. Formula version {FORMULA_VERSION}.
        </AssumptionNote>
        <p className="mt-4 text-[0.9rem] text-ink-soft">
          PGAK processes on site, so in a typical deployment only alerts and the clips you choose
          leave the building. Confirm your own architecture before applying a cloud tariff to every
          camera.
        </p>
      </div>
    </div>
  );
}
