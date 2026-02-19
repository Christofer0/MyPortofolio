import ScrollReveal from "./ScrollReveal";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* =======================
   DATA
======================= */
const skills = [
  { name: "Spring Boot", level: 90, category: "Backend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Language" },
  { name: "Vue", level: 85, category: "Frontend" },
  { name: "PostgreSQL", level: 80, category: "Database" },
  { name: "GraphQL", level: 60, category: "API" },
  { name: "Docker", level: 70, category: "DevOps" },
  { name: "Python", level: 65, category: "Language" },
];

const techCategories = [
  {
    label: "Languages",
    color: "blue",
    items: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    color: "violet",
    items: ["Spring Boot", "Laravel", "Vue", "Flask", "PHP Native", "Node.js"],
  },
  {
    label: "Databases",
    color: "emerald",
    items: ["PostgreSQL", "MongoDB", "DB2", "Redis", "XAMPP", "HeidiSQL"],
  },
];

/* =======================
   HELPERS
======================= */
const circumference = 2 * Math.PI * 40;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

/* =======================
   RADAR CHART
   — replaces the 8 separate circles with one unified "skill radar"
======================= */
const RADAR_SIZE = 280;
const CENTER = RADAR_SIZE / 2;
const RINGS = 4; // concentric rings for 25/50/75/100

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

const RadarChart = ({ inView }: { inView: boolean }) => {
  const n = skills.length;
  const maxR = CENTER - 24;
  const angles = skills.map((_, i) => (360 / n) * i);

  // Build polygon points string from level
  const buildPath = (scale: number) =>
    angles
      .map((a, i) => {
        const r = (skills[i].level / 100) * maxR * scale;
        const { x, y } = polarToXY(a, r);
        return `${x},${y}`;
      })
      .join(" ");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const ENTRY = 1400; // ms to fill
    const tick = (now: number) => {
      const t = Math.min((now - start) / ENTRY, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={RADAR_SIZE} height={RADAR_SIZE} className="overflow-visible">
        {/* ── Ring grid ── */}
        {Array.from({ length: RINGS }).map((_, ri) => {
          const r = (maxR / RINGS) * (ri + 1);
          const pts = angles.map((a) => polarToXY(a, r));
          return (
            <polygon
              key={ri}
              points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* ── Axis lines ── */}
        {angles.map((a, i) => {
          const outer = polarToXY(a, maxR);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={outer.x}
              y2={outer.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.4}
            />
          );
        })}

        {/* ── Filled skill polygon ── */}
        <motion.polygon
          points={buildPath(progress)}
          fill="hsl(var(--primary) / 0.12)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.4))" }}
        />

        {/* ── Skill dots on vertices ── */}
        {angles.map((a, i) => {
          const r = (skills[i].level / 100) * maxR * progress;
          const { x, y } = polarToXY(a, r);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              fill="hsl(var(--primary))"
              style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary)))" }}
            />
          );
        })}

        {/* ── Labels ── */}
        {angles.map((a, i) => {
          const labelR = maxR + 18;
          const { x, y } = polarToXY(a, labelR);
          const anchor =
            x < CENTER - 4 ? "end" : x > CENTER + 4 ? "start" : "middle";
          return (
            <g key={i}>
              <text
                x={x}
                y={y - 3}
                textAnchor={anchor}
                className="fill-foreground"
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                {skills[i].name}
              </text>
              <text
                x={x}
                y={y + 8}
                textAnchor={anchor}
                className="fill-primary"
                style={{ fontSize: 8, fontFamily: "monospace" }}
              >
                {Math.round(skills[i].level * progress)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SkillBar = ({
  skill,
  index,
  inView,
}: {
  skill: (typeof skills)[0];
  index: number;
  inView: boolean;
}) => {
  const pct = skill.level;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 + 0.3, ease: "easeOut" }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-primary/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-mono text-foreground">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-[11px] text-primary tabular-nums font-bold">
          {skill.level}%
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary relative"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{
            duration: 1.0,
            delay: index * 0.06 + 0.4,
            ease: "easeOut",
          }}
          style={{ boxShadow: "0 0 6px hsl(var(--primary) / 0.5)" }}
        />
      </div>
    </motion.div>
  );
};

/* =======================
   TECH ECOSYSTEM — upgraded with terminal window aesthetic
======================= */
const colorMap: Record<
  string,
  {
    badge: string;
    dot: string;
    label: string;
    ring: string;
    bar: string;
    termColor: string;
  }
> = {
  blue: {
    badge:
      "border-blue-500/20 bg-blue-500/5 text-blue-300/80 hover:border-blue-400/60 hover:text-blue-200 hover:bg-blue-500/10 hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    dot: "bg-blue-400",
    label: "text-blue-400",
    ring: "border-blue-500/30",
    bar: "bg-blue-400",
    termColor: "text-blue-400",
  },
  violet: {
    badge:
      "border-violet-500/20 bg-violet-500/5 text-violet-300/80 hover:border-violet-400/60 hover:text-violet-200 hover:bg-violet-500/10 hover:shadow-[0_0_12px_rgba(139,92,246,0.25)]",
    dot: "bg-violet-400",
    label: "text-violet-400",
    ring: "border-violet-500/30",
    bar: "bg-violet-400",
    termColor: "text-violet-400",
  },
  emerald: {
    badge:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-300/80 hover:border-emerald-400/60 hover:text-emerald-200 hover:bg-emerald-500/10 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    dot: "bg-emerald-400",
    label: "text-emerald-400",
    ring: "border-emerald-500/30",
    bar: "bg-emerald-400",
    termColor: "text-emerald-400",
  },
};

const TechEcosystem = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {techCategories.map((cat, catIdx) => {
      const c = colorMap[cat.color];
      return (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: catIdx * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`relative rounded-xl border ${c.ring} bg-background/50 overflow-hidden backdrop-blur-sm group`}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-muted/20">
            <span className="w-2 h-2 rounded-full bg-rose-500/60" />
            <span className="w-2 h-2 rounded-full bg-amber-400/60" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
            <span
              className={`ml-2 font-mono text-[10px] ${c.termColor} uppercase tracking-widest`}
            >
              {cat.label}
            </span>
            <span className="ml-auto font-mono text-[9px] text-muted-foreground/30">
              {cat.items.length} pkgs
            </span>
          </div>

          {/* Badge cloud */}
          <div className="p-4 flex flex-wrap gap-2">
            {cat.items.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: catIdx * 0.1 + i * 0.05,
                  ease: "backOut",
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`inline-block px-2.5 py-1 rounded-md border text-[11px] font-mono cursor-default transition-all duration-200 ${c.badge}`}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Progress bar footer */}
          <div className="px-4 pb-4">
            <div className="h-px w-full bg-border/30 mb-2" />
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${c.bar} opacity-70`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(cat.items.length / 8) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: catIdx * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                />
              </div>
              <span className={`font-mono text-[9px] ${c.label} opacity-60`}>
                {cat.items.length}/8
              </span>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

/* =======================
   MAIN SECTION
======================= */
const SkillsSection = () => {
  const radarRef = useRef<HTMLDivElement>(null);
  const radarInView = useInView(radarRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        .glow-line {
          background: linear-gradient(90deg, transparent, hsl(var(--primary)/0.4), transparent);
        }
        .skill-dot-bg {
          background-image: radial-gradient(circle, hsl(var(--primary)/0.05) 1px, transparent 1px);
          background-size: 26px 26px;
        }
      `}</style>

      <section
        id="skills"
        className="section-padding bg-secondary/30 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          {/* ── Header ── */}
          <ScrollReveal>
            <h2 className="heading-lg mb-2">
              <span className="text-gradient font-mono text-lg block mb-3">
                02.
              </span>
              Skills & Tools
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </ScrollReveal>

          {/* ── Proficiency: Radar + Bar list ── */}
          <ScrollReveal delay={0.05}>
            <div className="relative rounded-2xl border border-primary/10 bg-background/40 skill-dot-bg backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />

              <div className="p-6 pb-2 text-center">
                <p className="text-[10px] font-mono text-primary/50 uppercase tracking-widest">
                  Proficiency Radar
                </p>
              </div>

              {/* Radar + bars side by side */}
              <div
                ref={radarRef}
                className="grid md:grid-cols-[1fr_1fr] gap-4 p-6 pt-2 items-center"
              >
                {/* Radar */}
                <div className="flex items-center justify-center py-4">
                  <RadarChart inView={radarInView} />
                </div>

                {/* Bar list */}
                <div className="space-y-3 py-4">
                  {skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={i}
                      inView={radarInView}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
            </div>
          </ScrollReveal>

          {/* ── Tech Ecosystem ── */}
          <ScrollReveal delay={0.1}>
            <div className="relative rounded-2xl border border-primary/10 bg-background/40 p-6 backdrop-blur-sm">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
              <p className="text-[10px] font-mono text-primary/50 uppercase tracking-widest text-center mb-5">
                Languages · Frameworks · Databases
              </p>
              <TechEcosystem />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default SkillsSection;
