import { useEffect } from "react";

const CONFIG = {
  segmentCount: 60,
  segmentSpacing: 4,
  headEase: 0.28,
  headRadius: 5,
  tailRadius: 0.8,
  // Full tail when moving, stub tail when idle
  activeSegments: 60,
  idleSegments: 10,
  // How fast the tail length transitions (0–1 lerp speed per frame)
  tailEase: 0.03,
  // Time in ms before cursor is considered idle
  idleDelay: 0,
  // Gradient: tail → mid → head
  tailColor: { r: 210, g: 220, b: 255 },
  midColor: { r: 62, g: 148, b: 253 },
  headColor: { r: 108, g: 124, b: 255 },
};

const lerp = (a, b, t) => a + (b - a) * t;

const isDesktopPointer = () =>
  window.matchMedia("(min-width: 1024px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(pointer: coarse)").matches;

const useCanvasCursor = () => {
  useEffect(() => {
    if (typeof window === "undefined" || !isDesktopPointer()) return undefined;

    const canvas = document.getElementById("canvas");
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let running = true;
    let rafId = 0;

    // Idle tracking
    let lastMoveTime = Date.now();
    let isIdle = false;
    // Smooth effective segment count (fractional)
    let effectiveCount = CONFIG.activeSegments;

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const segments = Array.from({ length: CONFIG.segmentCount }, () => ({
      x: pointer.x,
      y: pointer.y,
    }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const setPointer = (x, y) => {
      pointer.x = x;
      pointer.y = y;
    };

    const onMouseMove = (event) => {
      setPointer(event.clientX, event.clientY);
      lastMoveTime = Date.now();
      isIdle = false;
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        setPointer(event.touches[0].clientX, event.touches[0].clientY);
        lastMoveTime = Date.now();
        isIdle = false;
      }
    };

    const updateSegments = () => {
      segments[0].x += (pointer.x - segments[0].x) * CONFIG.headEase;
      segments[0].y += (pointer.y - segments[0].y) * CONFIG.headEase;

      for (let i = 1; i < segments.length; i += 1) {
        const prev = segments[i - 1];
        const curr = segments[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const dist = Math.hypot(dx, dy) || 0.001;

        if (dist > CONFIG.segmentSpacing) {
          const ratio = (dist - CONFIG.segmentSpacing) / dist;
          curr.x += dx * ratio;
          curr.y += dy * ratio;
        }
      }
    };

    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine idle state
      if (!isIdle && Date.now() - lastMoveTime > CONFIG.idleDelay) {
        isIdle = true;
      }

      // Smoothly lerp effectiveCount toward target
      const targetCount = isIdle ? CONFIG.idleSegments : CONFIG.activeSegments;
      effectiveCount = lerp(effectiveCount, targetCount, CONFIG.tailEase);
      const drawCount = Math.max(2, Math.round(effectiveCount));
      const count = Math.min(drawCount, segments.length);

      const { tailColor: tc, midColor: mc, headColor: hc } = CONFIG;
      const idleFade = isIdle ? effectiveCount / CONFIG.activeSegments : 1;

      // Draw the tail as one smooth continuous path with a linear gradient
      // We draw bands of ~4 segments, each as a path with its own strokeStyle,
      // but using sub-pixel width so the join is seamless and no circles show.
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const BANDS = Math.min(count - 1, 30); // number of color bands
      for (let b = 0; b < BANDS; b++) {
        const t0 = b / BANDS;
        const t1 = (b + 1) / BANDS;

        // Map band to segment indices (tail → head)
        const i0 = Math.round((1 - t0) * (count - 1));
        const i1 = Math.round((1 - t1) * (count - 1));

        if (i0 === i1) continue;

        // 3-stop color: tail → mid → head
        const tMid = (t0 + t1) / 2;
        const { tailColor: tc, midColor: mc, headColor: hc } = CONFIG;
        const fromC = tMid < 0.5 ? tc : mc;
        const toC = tMid < 0.5 ? mc : hc;
        const local = tMid < 0.5 ? tMid * 2 : (tMid - 0.5) * 2;
        const r = Math.round(lerp(fromC.r, toC.r, local));
        const g = Math.round(lerp(fromC.g, toC.g, local));
        const bv = Math.round(lerp(fromC.b, toC.b, local));
        const alpha = lerp(0, 0.95, tMid) * idleFade;
        const lineWidth = lerp(CONFIG.tailRadius, CONFIG.headRadius, tMid) * 2;

        ctx.beginPath();
        ctx.moveTo(segments[i0].x, segments[i0].y);
        for (let i = i0 - 1; i >= i1; i--) {
          ctx.lineTo(segments[i].x, segments[i].y);
        }

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${bv}, ${alpha})`;
        ctx.stroke();
      }

      ctx.restore();

      // Head dot with glow
      const head = segments[0];
      ctx.save();
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(108, 124, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(head.x, head.y, CONFIG.headRadius * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(108, 124, 255, 1)";
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (!running) return;

      updateSegments();
      drawSnake();
      rafId = window.requestAnimationFrame(render);
    };

    const onFocus = () => {
      if (!running) {
        running = true;
        render();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("focus", onFocus);
    render();

    return () => {
      running = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("focus", onFocus);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);
};

export default useCanvasCursor;
