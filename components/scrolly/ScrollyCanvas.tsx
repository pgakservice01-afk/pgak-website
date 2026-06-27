"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollyCanvas — the guide's signature mechanic.
 *
 * A sticky, full-viewport HTML5 canvas whose "playhead" is driven by scroll
 * progress (0 → 1). Instead of scrubbing ~89 pre-rendered WebP frames, the
 * frame for any given progress value is DRAWN procedurally, on-brand for PGAK:
 *
 *   0.00–0.10  boot / feed initialising
 *   0.10–0.40  live monitored scene (CAM 02)
 *   0.40–0.65  AI scanning sweep + neural mesh
 *   0.65–0.85  subjects identified (KNOWN vs UNKNOWN) with confidence
 *   0.85–1.00  threat detected → alert
 *
 * No external assets required. object-fit:cover behaviour is intrinsic because
 * everything is positioned in fractions of the live viewport size.
 */

const C = {
  ink: "#eaf3f2",
  soft: "#9fb4b6",
  faint: "#5f7775",
  accent: "#7cf5c4",
  accent2: "#3ed8e0",
  danger: "#ff7a59",
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
/** linear map v from [a,b] to [c,d], clamped */
const map = (v: number, a: number, b: number, c: number, d: number) =>
  b === a ? c : c + (d - c) * clamp((v - a) / (b - a), 0, 1);
/** triangular "bell": 0 at lo/hi, 1 at mid */
const bell = (v: number, lo: number, mid: number, hi: number) =>
  v < mid ? map(v, lo, mid, 0, 1) : map(v, mid, hi, 1, 0);

type Fig = {
  cx: number;
  footY: number;
  h: number;
  w: number;
  label: string;
  threat: boolean;
  maxConf: number;
};

export default function ScrollyCanvas({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;
    const start =
      typeof performance !== "undefined" ? performance.now() : 0;

    // --- stable scene data (generated once) ---
    const grain = Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      ph: Math.random() * Math.PI * 2,
      s: Math.random() < 0.5 ? 1 : 1.4,
    }));

    const figures: Fig[] = [
      {
        cx: 0.34,
        footY: 0.96,
        h: 0.4,
        w: 0.11,
        label: "KNOWN · FAMILY",
        threat: false,
        maxConf: 99,
      },
      {
        cx: 0.66,
        footY: 0.98,
        h: 0.44,
        w: 0.12,
        label: "UNKNOWN",
        threat: true,
        maxConf: 86,
      },
    ];

    const mesh = Array.from({ length: 18 }, () => ({
      x: 0.5 + (Math.random() - 0.5) * 0.74,
      y: 0.34 + Math.random() * 0.52,
      ph: Math.random() * Math.PI * 2,
    }));

    const roundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) => {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    // ---- layers ----
    const drawBackground = () => {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0b141b");
      g.addColorStop(0.55, "#080f14");
      g.addColorStop(1, "#05090c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const rg = ctx.createRadialGradient(
        W * 0.5,
        H * 0.08,
        0,
        W * 0.5,
        H * 0.08,
        H * 0.75,
      );
      rg.addColorStop(0, "rgba(15,184,154,0.12)");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);
    };

    const drawFloor = () => {
      ctx.save();
      ctx.strokeStyle = C.accent;
      const horizon = H * 0.46;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 11; i++) {
        const f = i / 11;
        const y = horizon + (H - horizon) * Math.pow(f, 1.7);
        ctx.globalAlpha = map(y, horizon, H, 0.02, 0.14);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      const vp = W * 0.5;
      for (let i = -6; i <= 6; i++) {
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        ctx.moveTo(vp + i * (W * 0.028), horizon);
        ctx.lineTo(vp + i * (W * 0.17), H);
        ctx.stroke();
      }
      ctx.restore();
    };

    const figBounds = (fig: Fig) => {
      const baseY = fig.footY * H;
      const h = fig.h * H;
      const w = fig.w * W;
      const cx = fig.cx * W;
      const pad = Math.min(W, H) * 0.018;
      return {
        x: cx - w / 2 - pad,
        y: baseY - h - pad,
        w: w + pad * 2,
        h: h + pad * 2,
        cx,
        baseY,
      };
    };

    const drawFigure = (fig: Fig, t: number) => {
      const baseY = fig.footY * H;
      const h = fig.h * H;
      const w = fig.w * W;
      const cx = fig.cx * W;
      const headR = w * 0.34;
      const topY = baseY - h;

      ctx.save();
      const grad = ctx.createLinearGradient(0, topY, 0, baseY);
      grad.addColorStop(0, "rgba(180,200,202,0.26)");
      grad.addColorStop(1, "rgba(120,150,150,0.05)");
      ctx.fillStyle = grad;
      ctx.shadowColor = "rgba(124,245,196,0.12)";
      ctx.shadowBlur = 24;

      const bodyTop = topY + headR * 1.5;
      roundRect(cx - w / 2, bodyTop, w, baseY - bodyTop, w * 0.42);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, topY + headR, headR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawScanline = (p: number, t: number) => {
      const sweep = Math.sin(t * 1.5) * 0.5 + 0.5;
      const yy = (0.12 + 0.76 * sweep) * H;
      const intensity =
        map(p, 0.28, 0.42, 0.12, 1) * (1 - map(p, 0.74, 0.9, 0, 0.75));
      if (intensity <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = intensity;
      const g = ctx.createLinearGradient(0, yy - H * 0.16, 0, yy);
      g.addColorStop(0, "transparent");
      g.addColorStop(1, "rgba(124,245,196,0.10)");
      ctx.fillStyle = g;
      ctx.fillRect(0, yy - H * 0.16, W, H * 0.16);

      const lg = ctx.createLinearGradient(0, 0, W, 0);
      lg.addColorStop(0, "transparent");
      lg.addColorStop(0.5, C.accent);
      lg.addColorStop(1, "transparent");
      ctx.fillStyle = lg;
      ctx.shadowColor = C.accent;
      ctx.shadowBlur = 16;
      ctx.fillRect(0, yy - 1, W, 2);
      ctx.restore();
    };

    const drawMesh = (p: number, t: number) => {
      const m = bell(p, 0.4, 0.57, 0.74);
      if (m <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = m * 0.55;
      const pts = mesh.map((n) => ({
        x: (n.x + Math.sin(t * 0.8 + n.ph) * 0.004) * W,
        y: (n.y + Math.cos(t * 0.7 + n.ph) * 0.004) * H,
      }));
      ctx.strokeStyle = C.accent2;
      ctx.lineWidth = 1;
      const maxD = Math.min(W, H) * 0.22;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            ctx.globalAlpha = m * 0.5 * (1 - d / maxD);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = m * 0.9;
      ctx.fillStyle = C.accent2;
      for (const pt of pts) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const setFont = (px: number, weight = 600) => {
      ctx.font = `${weight} ${px}px 'Sora', ui-sans-serif, system-ui, sans-serif`;
    };

    const drawDetection = (fig: Fig, p: number, t: number) => {
      const appear = map(p, 0.42, 0.56, 0, 1);
      if (appear <= 0.01) return;
      const b = figBounds(fig);
      const threatNow = fig.threat && p > 0.83;
      const col = threatNow ? C.danger : fig.threat ? C.accent2 : C.accent;

      ctx.save();
      // box (grows from center)
      const gx = b.x + (b.w / 2) * (1 - appear);
      const gy = b.y + (b.h / 2) * (1 - appear);
      const gw = b.w * appear;
      const gh = b.h * appear;
      ctx.strokeStyle = col;
      ctx.globalAlpha = threatNow ? 0.95 : 0.85;
      ctx.lineWidth = 2;
      ctx.shadowColor = col;
      ctx.shadowBlur = threatNow ? 18 * (0.6 + 0.4 * Math.sin(t * 6)) : 8;
      ctx.strokeRect(gx, gy, gw, gh);

      // corner ticks
      ctx.shadowBlur = 0;
      const tick = Math.min(gw, gh) * 0.18;
      ctx.lineWidth = 3;
      const corners: [number, number, number, number][] = [
        [gx, gy, 1, 1],
        [gx + gw, gy, -1, 1],
        [gx, gy + gh, 1, -1],
        [gx + gw, gy + gh, -1, -1],
      ];
      for (const [x, y, sx, sy] of corners) {
        ctx.beginPath();
        ctx.moveTo(x + sx * tick, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + sy * tick);
        ctx.stroke();
      }

      // label tag
      const labelOp = map(p, 0.58, 0.68, 0, 1);
      if (labelOp > 0.01) {
        ctx.globalAlpha = labelOp;
        const conf = Math.round(map(p, 0.58, 0.8, 0, fig.maxConf));
        const txt = threatNow ? "⚠ THREAT" : fig.label;
        setFont(13, 700);
        const padX = 9;
        const tw = ctx.measureText(txt).width;
        const cw = 52;
        const tagW = tw + padX * 2 + cw;
        const tagH = 24;
        const tx = gx;
        const ty = gy - tagH - 6;
        ctx.fillStyle = col;
        roundRect(tx, ty, tagW, tagH, 5);
        ctx.fill();
        ctx.fillStyle = "#04201a";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(txt, tx + padX, ty + tagH / 2 + 0.5);
        setFont(12, 700);
        ctx.fillText(`${conf}%`, tx + padX + tw + 8, ty + tagH / 2 + 0.5);
      }
      ctx.restore();
    };

    const drawGrain = (t: number) => {
      ctx.save();
      ctx.fillStyle = "#ffffff";
      for (const g of grain) {
        ctx.globalAlpha = 0.025 * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3 + g.ph)));
        ctx.fillRect(g.x * W, g.y * H, g.s, g.s);
      }
      ctx.restore();
    };

    const drawVignette = () => {
      const g = ctx.createRadialGradient(
        W * 0.5,
        H * 0.5,
        Math.min(W, H) * 0.3,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.75,
      );
      g.addColorStop(0, "transparent");
      g.addColorStop(1, "rgba(3,6,8,0.82)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };

    const drawHUD = (p: number, t: number) => {
      const inset = Math.min(W, H) * 0.045;
      const brk = Math.min(W, H) * 0.03;
      ctx.save();
      ctx.strokeStyle = "rgba(159,180,182,0.4)";
      ctx.lineWidth = 1.5;
      const cs: [number, number, number, number][] = [
        [inset, inset, 1, 1],
        [W - inset, inset, -1, 1],
        [inset, H - inset, 1, -1],
        [W - inset, H - inset, -1, -1],
      ];
      for (const [x, y, sx, sy] of cs) {
        ctx.beginPath();
        ctx.moveTo(x + sx * brk, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + sy * brk);
        ctx.stroke();
      }

      // top-left LIVE badge
      setFont(13, 700);
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      const recOn = 0.5 + 0.5 * Math.sin(t * 4);
      ctx.fillStyle = `rgba(255,122,89,${0.4 + 0.6 * recOn})`;
      ctx.beginPath();
      ctx.arc(inset + 8, inset + 22, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.ink;
      ctx.fillText("LIVE", inset + 20, inset + 23);
      ctx.fillStyle = C.soft;
      setFont(12, 500);
      ctx.fillText("CAM 02 · PGAK VISION", inset + 56, inset + 23);

      // top-right timecode
      const total = Math.floor(t);
      const tc = `REC 00:${String(Math.floor(total / 60) % 60).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
      ctx.textAlign = "right";
      ctx.fillStyle = C.soft;
      ctx.fillText(tc, W - inset, inset + 23);

      // bottom-left status (phase-driven)
      let status = "● MONITORING";
      let sc = C.accent;
      if (p >= 0.85) {
        status = "⚠ THREAT DETECTED";
        sc = C.danger;
      } else if (p >= 0.65) {
        status = "◆ IDENTIFYING SUBJECTS";
        sc = C.accent2;
      } else if (p >= 0.4) {
        status = "◆ AI SCANNING…";
        sc = C.accent2;
      }
      setFont(13, 700);
      ctx.textAlign = "left";
      ctx.fillStyle = sc;
      ctx.fillText(status, inset, H - inset - 10);
      ctx.restore();
    };

    const drawAlert = (p: number, t: number) => {
      const a = map(p, 0.85, 0.93, 0, 1);
      if (a <= 0.01) return;
      const pulse = 0.5 + 0.5 * Math.sin(t * 5);

      // red wash around edges
      ctx.save();
      const g = ctx.createRadialGradient(
        W * 0.5,
        H * 0.5,
        Math.min(W, H) * 0.25,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.7,
      );
      g.addColorStop(0, "transparent");
      g.addColorStop(1, `rgba(255,90,60,${0.22 * a * (0.6 + 0.4 * pulse)})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // banner
      ctx.globalAlpha = a;
      setFont(Math.max(14, Math.min(W * 0.02, 22)), 800);
      const txt = "⚠  THREAT DETECTED · CAM 02";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const tw = ctx.measureText(txt).width;
      const bw = tw + 56;
      const bh = 50;
      const bx = W * 0.5 - bw / 2;
      const by = H * 0.13;
      ctx.fillStyle = `rgba(255,90,60,${0.16 + 0.12 * pulse})`;
      roundRect(bx, by, bw, bh, 12);
      ctx.fill();
      ctx.strokeStyle = C.danger;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = a * (0.7 + 0.3 * pulse);
      roundRect(bx, by, bw, bh, 12);
      ctx.stroke();
      ctx.globalAlpha = a;
      ctx.fillStyle = "#ffd9cd";
      ctx.fillText(txt, W * 0.5, by + bh / 2 + 1);

      // notification card sliding in from right
      const slide = map(p, 0.88, 0.97, 1, 0);
      const cw = Math.min(W * 0.32, 300);
      const ch = 84;
      const cx0 = W - Math.min(W, H) * 0.045 - cw + slide * (cw + 40);
      const cy0 = H * 0.3;
      ctx.globalAlpha = a * (1 - slide);
      ctx.fillStyle = "rgba(16,30,37,0.92)";
      roundRect(cx0, cy0, cw, ch, 12);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,122,89,0.5)";
      ctx.lineWidth = 1;
      roundRect(cx0, cy0, cw, ch, 12);
      ctx.stroke();
      ctx.fillStyle = C.danger;
      ctx.beginPath();
      ctx.arc(cx0 + 22, cy0 + 26, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.textAlign = "left";
      ctx.fillStyle = C.ink;
      setFont(13, 700);
      ctx.fillText("PGAK Alert", cx0 + 40, cy0 + 24);
      ctx.fillStyle = C.soft;
      setFont(12, 500);
      ctx.fillText("Unknown person · perimeter", cx0 + 18, cy0 + 50);
      ctx.fillStyle = C.faint;
      ctx.fillText("Detected in 0.8s · tap to view", cx0 + 18, cy0 + 68);
      ctx.restore();
    };

    const drawBoot = (p: number) => {
      // Brief "feed powering on" wash. The headline (DOM overlay) sits on top as
      // the title card, so we keep this text-free and fade it out quickly.
      const a = map(p, 0.0, 0.06, 0.92, 0);
      if (a <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = "#05090c";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    };

    const draw = (p: number, t: number) => {
      ctx.clearRect(0, 0, W, H);
      drawBackground();
      drawFloor();
      for (const f of figures) drawFigure(f, t);
      drawScanline(p, t);
      drawMesh(p, t);
      for (const f of figures) drawDetection(f, p, t);
      drawGrain(t);
      drawVignette();
      drawHUD(p, t);
      drawAlert(p, t);
      drawBoot(p);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Progress (0→1) computed straight from the scroll track's geometry, so the
    // canvas never depends on an external motion value being in sync.
    const computeProgress = () => {
      const el = targetRef.current;
      if (!el) return 0;
      const denom = el.offsetHeight - window.innerHeight;
      if (denom <= 0) return 0;
      return clamp(-el.getBoundingClientRect().top / denom, 0, 1);
    };

    const render = () =>
      draw(computeProgress(), (performance.now() - start) / 1000);

    const onResize = () => {
      resize();
      render();
    };

    resize();
    render();
    window.addEventListener("resize", onResize);
    // Scroll-driven redraw: scrubbing stays correct even when rAF is throttled
    // (low-power mode, background tabs, headless renderers).
    window.addEventListener("scroll", render, { passive: true });

    // rAF drives the ambient motion (scanline sweep, grain shimmer, alert pulse)
    // in normal browsers; it simply idles where rAF isn't serviced.
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", render);
    };
  }, [targetRef]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
