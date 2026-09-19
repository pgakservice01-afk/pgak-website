export default function Architecture({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <figure className={`architecture ${compact ? "architecture-hero" : ""}`}>
      <div className="architecture-top">
        <span>YOUR EXISTING SYSTEM</span>
        <span>01 → 04</span>
      </div>
      <div className="architecture-camera" aria-hidden="true">
        <svg viewBox="0 0 320 150" fill="none">
          <path
            d="M80 49h153l23 45H101L80 49Z"
            fill="#fff"
            stroke="#42566a"
            strokeWidth="3"
          />
          <path d="m101 94 15 17h110l30-17" stroke="#42566a" strokeWidth="3" />
          <ellipse cx="228" cy="74" rx="13" ry="15" fill="#075fc7" />
          <path d="m124 111-20 23H67v-27" stroke="#42566a" strokeWidth="8" />
          <path d="M68 89v44" stroke="#42566a" strokeWidth="10" />
          <path
            d="m265 64 24-13m-20 27 29 1m-35 16 25 14"
            stroke="#a5b9d0"
            strokeWidth="2"
          />
        </svg>
      </div>
      <ol className="architecture-flow">
        <li>
          <span>01</span>
          <strong>Compatible camera feed</strong>
          <small>Stream, view & lighting checked</small>
        </li>
        <li>
          <span>02</span>
          <strong>Processing & configuration</strong>
          <small>Hardware and use case scoped</small>
        </li>
        <li>
          <span>03</span>
          <strong>Event evidence</strong>
          <small>Detection and delivery tested</small>
        </li>
        <li>
          <span>04</span>
          <strong>Your team’s review</strong>
          <small>A named person owns the response</small>
        </li>
      </ol>
      <figcaption>
        Architecture illustration · not a product screenshot. Actual workflow is
        confirmed during technical review.
      </figcaption>
    </figure>
  );
}
