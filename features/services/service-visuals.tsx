"use client";

import { motion, type SVGMotionProps, type TargetAndTransition } from "framer-motion";
import { createContext, useContext } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// Line-art illustrations for the Services story. Every stroke draws itself in
// (staggered by `delay`), then one small motion loops. With reduced motion the
// final drawing is shown still.

const STROKE = "#b69cff";
const ACCENT = "#6d5bd0";
const Still = createContext(false);

type DrawProps = { delay?: number };

function useDraw(delay = 0) {
  const still = useContext(Still);
  return still
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: {
          pathLength: { duration: 0.9, delay, ease: "easeInOut" as const },
          opacity: { duration: 0.2, delay },
        },
      };
}

const line = { fill: "none", stroke: STROKE, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function P({ delay, ...props }: DrawProps & SVGMotionProps<SVGPathElement>) {
  return <motion.path {...line} {...useDraw(delay)} {...props} />;
}
function R({ delay, ...props }: DrawProps & SVGMotionProps<SVGRectElement>) {
  return <motion.rect {...line} {...useDraw(delay)} {...props} />;
}
function C({ delay, ...props }: DrawProps & SVGMotionProps<SVGCircleElement>) {
  return <motion.circle {...line} {...useDraw(delay)} {...props} />;
}

// A looping animation that starts after the drawing finishes.
function loop(still: boolean, animate: TargetAndTransition, delay = 1.2, duration = 1.6) {
  return still
    ? {}
    : {
        animate,
        transition: { duration, delay, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const },
      };
}

// Fades in a filled accent element after the drawing.
function appear(still: boolean, delay = 1) {
  return still ? {} : { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, transition: { delay, duration: 0.4 } };
}

function Websites() {
  const still = useContext(Still);
  return (
    <>
      <R x={40} y={30} width={240} height={180} rx={14} />
      <P d="M40 62 H280" delay={0.3} />
      {[60, 74, 88].map((cx, i) => (
        <C key={cx} cx={cx} cy={46} r={4} delay={0.4 + i * 0.05} />
      ))}
      <R x={110} y={40} width={150} height={12} rx={6} delay={0.5} />
      <R x={60} y={80} width={200} height={54} rx={8} delay={0.6} />
      <P d="M60 152 H210 M60 168 H240 M60 184 H180" delay={0.8} />
      <motion.g {...loop(still, { x: [0, 120, 60], y: [0, -40, 10] }, 1.4, 2.4)}>
        <motion.path
          d="M120 120 l0 22 l6 -6 l8 14 l5 -3 l-8 -13 l9 -1 z"
          fill={ACCENT}
          stroke={STROKE}
          strokeWidth={1}
          {...appear(still, 1.1)}
        />
      </motion.g>
    </>
  );
}

function Saas() {
  const still = useContext(Still);
  const bars = [
    { x: 120, h: 50 },
    { x: 150, h: 90 },
    { x: 180, h: 66 },
    { x: 210, h: 110 },
    { x: 240, h: 80 },
  ];
  return (
    <>
      <R x={30} y={30} width={260} height={180} rx={14} />
      <P d="M90 30 V210" delay={0.3} />
      <P d="M46 56 H74 M46 76 H70 M46 96 H74 M46 116 H66" delay={0.4} />
      <P d="M106 190 H274" delay={0.5} />
      {bars.map((bar, i) => (
        <motion.rect
          key={bar.x}
          x={bar.x}
          width={18}
          rx={4}
          fill={i === 3 ? ACCENT : "rgba(182,156,255,0.18)"}
          stroke={STROKE}
          strokeWidth={1.5}
          initial={still ? false : { y: 190, height: 0 }}
          animate={
            still
              ? { y: 190 - bar.h, height: bar.h }
              : {
                  y: [190, 190 - bar.h, 190 - bar.h * (0.65 + (i % 3) * 0.1), 190 - bar.h],
                  height: [0, bar.h, bar.h * (0.65 + (i % 3) * 0.1), bar.h],
                }
          }
          transition={
            still
              ? undefined
              : {
                  duration: 2.6,
                  times: [0, 0.3, 0.65, 1],
                  delay: 0.6 + i * 0.08,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }
          }
        />
      ))}
      <P d="M110 120 L150 90 L180 106 L215 64 L250 80" delay={1} stroke={ACCENT} strokeWidth={2} />
    </>
  );
}

function Chatbot() {
  const still = useContext(Still);
  return (
    <>
      <R x={50} y={24} width={220} height={192} rx={18} />
      <P d="M50 58 H270" delay={0.3} />
      <C cx={74} cy={41} r={8} delay={0.35} />
      <P d="M90 41 H150" delay={0.4} />
      <R x={70} y={74} width={130} height={30} rx={15} delay={0.5} />
      <R x={120} y={116} width={130} height={30} rx={15} delay={0.7} stroke={ACCENT} />
      <R x={70} y={158} width={70} height={30} rx={15} delay={0.9} />
      {[90, 105, 120].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={173}
          r={3.5}
          fill={STROKE}
          {...appear(still, 1.1)}
          {...loop(still, { y: [0, -5, 0] }, 1.2 + i * 0.15, 0.6)}
        />
      ))}
    </>
  );
}

function Ecommerce() {
  const still = useContext(Still);
  return (
    <>
      <P d="M50 60 H82 L106 160 H238 L262 88 H96" />
      <C cx={122} cy={184} r={12} delay={0.5} />
      <C cx={222} cy={184} r={12} delay={0.6} />
      <motion.g {...loop(still, { y: [0, 18, 0] }, 1.2, 1.4)}>
        <R x={150} y={70} width={44} height={44} rx={6} delay={0.8} stroke={ACCENT} />
        <P d="M150 86 H194 M172 70 V86" delay={0.9} stroke={ACCENT} />
      </motion.g>
      <motion.g {...loop(still, { scale: [1, 1.18, 1] }, 1.3, 0.9)}>
        <motion.circle cx={262} cy={60} r={13} fill={ACCENT} {...appear(still, 1)} />
        <motion.text x={262} y={65} textAnchor="middle" fontSize={13} fill="#fff" fontWeight={700} {...appear(still, 1)}>
          1
        </motion.text>
      </motion.g>
    </>
  );
}

function Portfolio() {
  const still = useContext(Still);
  return (
    <>
      <R x={60} y={30} width={200} height={180} rx={18} />
      <C cx={160} cy={84} r={28} delay={0.3} />
      <P d="M146 82 a14 14 0 0 1 28 0 M140 104 q20 -18 40 0" delay={0.5} />
      <P d="M120 132 H200 M134 148 H186" delay={0.6} />
      {[86, 136, 186].map((x, i) => (
        <R key={x} x={x} y={166} width={42} height={28} rx={6} delay={0.8 + i * 0.08} />
      ))}
      <motion.path
        d="M232 52 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z"
        fill={ACCENT}
        stroke={STROKE}
        strokeWidth={1}
        {...appear(still, 1.1)}
        {...loop(still, { scale: [0.8, 1.25, 0.8], rotate: [0, 45, 0] }, 1.2, 1.4)}
      />
    </>
  );
}

function Landing() {
  const still = useContext(Still);
  return (
    <>
      <R x={30} y={30} width={260} height={180} rx={14} />
      <P d="M54 56 H86 M200 56 H220 M232 56 H266" delay={0.3} />
      <P d="M70 96 H250" delay={0.5} strokeWidth={4} />
      <P d="M96 118 H224" delay={0.6} strokeWidth={4} />
      <P d="M110 140 H210" delay={0.7} />
      <motion.rect
        x={120}
        y={156}
        width={80}
        height={28}
        rx={14}
        fill={ACCENT}
        stroke={STROKE}
        strokeWidth={1.5}
        {...appear(still, 0.9)}
        {...loop(still, { opacity: [1, 0.55, 1] }, 1.2, 1.1)}
      />
      <motion.g {...loop(still, { x: [0, 10, 0] }, 1.2, 0.9)}>
        <P d="M62 170 H108 M98 162 L108 170 L98 178" delay={1} />
      </motion.g>
    </>
  );
}

function Uiux() {
  const still = useContext(Still);
  return (
    <>
      {[70, 110, 150, 190].map((y, i) => (
        <P key={y} d={`M30 ${y} H290`} delay={i * 0.05} stroke="rgba(182,156,255,0.18)" strokeWidth={1} />
      ))}
      {[80, 130, 180, 230].map((x, i) => (
        <P key={x} d={`M${x} 40 V210`} delay={0.1 + i * 0.05} stroke="rgba(182,156,255,0.18)" strokeWidth={1} />
      ))}
      <motion.path
        {...line}
        stroke={ACCENT}
        strokeWidth={2.5}
        {...useDraw(0.4)}
        d="M50 180 C110 40 210 220 270 70"
      />
      {[
        [50, 180],
        [270, 70],
      ].map(([cx, cy]) => (
        <motion.rect key={cx} x={cx - 6} y={cy - 6} width={12} height={12} fill="#0e0f12" stroke={STROKE} strokeWidth={1.5} {...appear(still, 1)} />
      ))}
      <motion.g {...loop(still, { x: [0, 10, 0], y: [0, 50, 0] }, 1.4, 1.8)}>
        <P d="M50 180 L110 40" delay={1} strokeDasharray="4 4" />
        <motion.circle cx={110} cy={40} r={5} fill={STROKE} {...appear(still, 1.1)} />
      </motion.g>
    </>
  );
}

function Redesign() {
  const still = useContext(Still);
  return (
    <>
      <R x={24} y={60} width={110} height={120} rx={10} strokeDasharray="5 5" stroke="rgba(182,156,255,0.5)" />
      <P d="M38 84 H120 M38 104 H100 M38 124 H112" delay={0.3} stroke="rgba(182,156,255,0.5)" />
      <R x={186} y={44} width={110} height={152} rx={12} delay={0.5} />
      <R x={200} y={60} width={82} height={40} rx={6} delay={0.7} stroke={ACCENT} />
      <P d="M200 118 H282 M200 134 H262 M200 150 H274" delay={0.8} />
      <R x={200} y={166} width={40} height={16} rx={8} delay={0.9} stroke={ACCENT} />
      <motion.g {...loop(still, { rotate: [0, 360] }, 1.2, 2.4)}>
        <P d="M146 112 a16 16 0 0 1 28 -6 M174 106 v-10 M174 106 h-10" delay={0.6} stroke={ACCENT} strokeWidth={2} />
        <P d="M174 128 a16 16 0 0 1 -28 6 M146 134 v10 M146 134 h10" delay={0.7} stroke={ACCENT} strokeWidth={2} />
      </motion.g>
    </>
  );
}

function Seo() {
  const still = useContext(Still);
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const angle = Math.PI + (i / 8) * Math.PI;
    return { x1: 160 + Math.cos(angle) * 92, y1: 160 + Math.sin(angle) * 92, x2: 160 + Math.cos(angle) * 104, y2: 160 + Math.sin(angle) * 104 };
  });
  return (
    <>
      <P d="M56 160 A104 104 0 0 1 264 160" />
      <P d="M200 74 A92 92 0 0 1 252 160" delay={0.5} stroke={ACCENT} strokeWidth={5} />
      {ticks.map((t, i) => (
        <P key={i} d={`M${t.x1} ${t.y1} L${t.x2} ${t.y2}`} delay={0.3 + i * 0.04} />
      ))}
      {/* Needle: sweeps from the left over the top to ~90 */}
      <motion.line
        x1={160}
        y1={160}
        stroke={STROKE}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={still ? false : { x2: 82, y2: 160 }}
        animate={still ? { x2: 224, y2: 115 } : { x2: [82, 160, 224, 216, 224], y2: [160, 82, 115, 106, 115] }}
        transition={still ? undefined : { duration: 2.4, delay: 0.6, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.6 }}
      />
      <motion.circle cx={160} cy={160} r={7} fill={ACCENT} stroke={STROKE} strokeWidth={1.5} {...appear(still, 0.6)} />
      <P d="M70 212 L120 196 L160 204 L210 184 L250 190" delay={1.1} />
      <P d="M238 182 L252 188 L244 200" delay={1.4} />
    </>
  );
}

const visuals = [Websites, Saas, Chatbot, Ecommerce, Portfolio, Landing, Uiux, Redesign, Seo];

export function ServiceVisual({ index, still = false }: { index: number; still?: boolean }) {
  const reduceMotion = usePrefersReducedMotion();
  const Visual = visuals[index] ?? Websites;

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px]">
      <div
        aria-hidden
        className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(109,91,208,0.35),transparent_70%)] blur-2xl"
      />
      <svg viewBox="0 0 320 240" className="relative h-full w-full" aria-hidden>
        <Still.Provider value={still || reduceMotion}>
          <Visual />
        </Still.Provider>
      </svg>
    </div>
  );
}
