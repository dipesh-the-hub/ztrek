"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import { everestProfile } from "@/lib/elevation";

const { stops, summits } = everestProfile;
const REST_INDEX = 8; // Day 9, Everest Base Camp: what the section shows before it plays
const PLAY_MS = 7000;

// Chart geometry (SVG user units)
const W = 760;
const H = 400;
const L = 56;
const R = 16;
const T = 64;
const B = 30;
const x = (day: number) => L + ((day - 1) / (stops.length - 1)) * (W - L - R);
const y = (m: number) => T + (1 - (m - 1000) / 5000) * (H - T - B);

const points = stops.map((s) => [x(s.day), y(s.altitude)] as const);
const routePath = points.reduce((d, [px, py], i) => {
  if (i === 0) return `M${px},${py}`;
  const [x0, y0] = points[i - 1];
  const cx = (x0 + px) / 2;
  return `${d} C${cx},${y0} ${cx},${py} ${px},${py}`;
}, "");
const areaPath = `${routePath} L${points.at(-1)![0]},${H - B} L${points[0][0]},${H - B} Z`;
const fmt = (n: number) => n.toLocaleString("en-US");

export default function ElevationProfile() {
  const section = useRef<HTMLElement>(null);
  const route = useRef<SVGPathElement>(null);
  const walker = useRef<SVGCircleElement>(null);
  const clip = useRef<SVGRectElement>(null);
  const progress = useRef(1);
  const stopFractions = useRef<number[]>([]);
  const frame = useRef(0);
  const reduced = useRef(false);

  const [index, setIndex] = useState(REST_INDEX);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(true);

  // Moves the line, glow dot and fill to fraction p of the route.
  const draw = useCallback((value: number) => {
    const path = route.current;
    if (!path) return;
    const p = Math.min(1, Math.max(0, value));
    progress.current = p;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len * (1 - p)}`;
    const pt = path.getPointAtLength(len * p);
    walker.current?.setAttribute("cx", `${pt.x}`);
    walker.current?.setAttribute("cy", `${pt.y}`);
    clip.current?.setAttribute("width", `${pt.x}`);
    setIndex(Math.round(p * (stops.length - 1)));
  }, []);

  const tweenTo = useCallback(
    (target: number, duration: number, linear = false) =>
      new Promise<void>((resolve) => {
        cancelAnimationFrame(frame.current);
        const from = progress.current;
        const start = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - start) / duration);
          const eased = linear ? k : 1 - Math.pow(1 - k, 3);
          draw(from + (target - from) * eased);
          if (k < 1) frame.current = requestAnimationFrame(step);
          else resolve();
        };
        frame.current = requestAnimationFrame(step);
      }),
    [draw],
  );

  const play = useCallback(async () => {
    if (reduced.current) return draw(1);
    if (progress.current >= 1) draw(0);
    setPlaying(true);
    setFinished(false);
    await tweenTo(1, PLAY_MS * (1 - progress.current), true);
    setPlaying(false);
    setFinished(progress.current >= 1);
  }, [draw, tweenTo]);

  const pause = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setPlaying(false);
  }, []);

  const jumpTo = useCallback(
    (i: number, animate: boolean) => {
      pause();
      const target = stopFractions.current[i] ?? i / (stops.length - 1);
      setFinished(target >= 1);
      if (animate && !reduced.current) tweenTo(target, 700);
      else draw(target);
    },
    [draw, pause, tweenTo],
  );

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = route.current!;
    // Days are uneven along the curve, so find the path length at each stop's x.
    const len = path.getTotalLength();
    stopFractions.current = points.map(([px]) => {
      let lo = 0;
      let hi = len;
      for (let k = 0; k < 24; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).x < px) lo = mid;
        else hi = mid;
      }
      return lo / len;
    });
    draw(stopFractions.current[REST_INDEX]);

    if (reduced.current) return;
    const el = section.current!;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        draw(0);
        play();
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [draw, play]);

  function scrub(e: React.PointerEvent<SVGRectElement>) {
    const svg = e.currentTarget.ownerSVGElement!;
    const r = svg.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((sx - L) / (W - L - R)) * (stops.length - 1));
    jumpTo(Math.min(stops.length - 1, Math.max(0, i)), false);
  }

  const stop = stops[index];
  const day = stop.day;

  return (
    <section ref={section} id="everest-profile" className="section-y bg-navy-950 text-white overflow-hidden">
      <Container className="grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] gap-8 lg:gap-16 items-center">
        <div data-reveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold-400">Everest Base Camp · 14 days</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            Climb high, <em className="font-medium text-gold-300">sleep low</em>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            The line traces where you sleep each night. Tap a day, or drag across the chart, to jump anywhere on the trail.
          </p>
          <div className="mt-7 pt-6 border-t border-white/15" aria-live="polite">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-gold-400">Day {day}</p>
            <p className="mt-1 font-display text-2xl sm:text-3xl">{stop.place}</p>
            <p className="mt-1 font-display text-5xl sm:text-6xl font-semibold text-gold-300 tabular-nums leading-none">
              {fmt(stop.altitude)}
              <span className="ml-1.5 font-sans text-lg font-medium text-white/60">m</span>
            </p>
            <p className="mt-3 min-h-[3em] text-sm text-white/70">{stop.note}</p>
          </div>
        </div>

        <div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block w-full h-auto overflow-visible touch-pan-y"
            role="img"
            aria-label="Elevation profile of the 14-day Everest Base Camp trek, from 1,400 m in Kathmandu to 5,545 m at Kala Patthar"
          >
            <defs>
              <linearGradient id="elev-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9b458" stopOpacity={0.35} />
                <stop offset="1" stopColor="#d9b458" stopOpacity={0} />
              </linearGradient>
              <clipPath id="elev-reveal">
                <rect ref={clip} x="0" y="0" width={W} height={H} />
              </clipPath>
            </defs>
            {[2000, 3000, 4000, 5000, 6000].map((m) => (
              <g key={m}>
                <line x1={L} x2={W - R} y1={y(m)} y2={y(m)} className="stroke-white/10" />
                <text x={L - 10} y={y(m) + 4} textAnchor="end" className="fill-white/50 text-[12px] tabular-nums">
                  {fmt(m)}
                </text>
              </g>
            ))}
            <path d={areaPath} fill="url(#elev-fill)" clipPath="url(#elev-reveal)" />
            <path ref={route} d={routePath} className="fill-none stroke-gold-400" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
            {summits.map((s, i) => {
              const bx = x(s.day) + (i ? 14 : -14);
              const sy = y(s.altitude);
              const base = y(stops[s.day - 1].altitude);
              const tx = bx + (i ? 18 : -18);
              return (
                <g key={s.name} className={`transition-opacity duration-500 ${s.day > day ? "opacity-0" : "opacity-100"}`}>
                  <line x1={bx} x2={bx} y1={sy} y2={base} className="stroke-gold-300" strokeDasharray="3 4" strokeWidth={1.5} />
                  <path d={`M${bx - 7},${sy + 2} L${bx},${sy - 10} L${bx + 7},${sy + 2} Z`} className="fill-gold-300" />
                  <text x={tx} y={sy - 30} textAnchor="middle" className="fill-white text-[12px] font-semibold">{s.name}</text>
                  <text x={tx} y={sy - 15} textAnchor="middle" className="fill-white/55 text-[11px] tabular-nums">{fmt(s.altitude)} m</text>
                </g>
              );
            })}
            {points.map(([px, py], i) => (
              <circle
                key={i}
                cx={px}
                cy={py}
                r={5}
                strokeWidth={2.5}
                className={`stroke-gold-400 ${i === index ? "fill-gold-400" : "fill-navy-950"} ${i > index ? "opacity-0" : ""}`}
              />
            ))}
            <circle ref={walker} r={6} cx={points[REST_INDEX][0]} cy={points[REST_INDEX][1]} className="fill-gold-300 drop-shadow-[0_0_6px_rgb(232_205_138/0.9)]" />
            <rect
              x={L}
              y={0}
              width={W - L - R}
              height={H}
              fill="transparent"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                scrub(e);
              }}
              onPointerMove={(e) => {
                if (e.buttons || e.pointerType === "mouse") scrub(e);
              }}
            />
          </svg>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <button
              type="button"
              onClick={() => (playing ? pause() : play())}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-bold text-navy-950 hover:bg-gold-400 transition-colors min-h-10 cursor-pointer"
            >
              {playing ? <Pause size={14} weight="fill" aria-hidden="true" /> : <Play size={14} weight="fill" aria-hidden="true" />}
              {playing ? "Pause" : finished ? "Replay" : "Play"}
            </button>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Jump to day">
              {stops.map((s, i) => (
                <button
                  key={s.day}
                  type="button"
                  aria-label={`Day ${s.day}: ${s.place}`}
                  aria-pressed={i === index}
                  onClick={() => jumpTo(i, true)}
                  className={`h-8 w-8 rounded-full border text-xs font-semibold tabular-nums transition-[background-color,color,border-color,transform] duration-300 cursor-pointer ${
                    i === index
                      ? "bg-gold-400 border-gold-400 text-navy-950 scale-110"
                      : "border-white/20 text-white/70 hover:border-gold-400 hover:text-white"
                  }`}
                >
                  {s.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
