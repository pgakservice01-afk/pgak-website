/** Start nonvisual work after load and two animation frames; supports cancellation. */
export function afterPagePaint(start: () => void): () => void {
  if (typeof window === "undefined" || typeof document === "undefined")
    return () => {};
  let cancelled = false;
  let frame = 0;
  const schedule = () => {
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        if (!cancelled) start();
      });
    });
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    window.cancelAnimationFrame(frame);
  };
}
