import ScrollReveal from "./ScrollReveal";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiRedis,
  SiMongodb,
  SiLaravel,
  SiSpringboot,
  SiPython,
  SiVuedotjs,
} from "react-icons/si";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const techRow1 = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

const techRow2 = [
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Vue", icon: SiVuedotjs, color: "#42B883" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
];

const row1 = [...techRow1, ...techRow1];
const row2 = [...techRow2, ...techRow2];

/* ─────────────────────────────────────────
   TICKER BADGE — icon glow on hover
───────────────────────────────────────── */
const TechBadge = ({
  icon: Icon,
  name,
  color,
}: {
  icon: React.ElementType;
  name: string;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      title={name}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.18, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-primary/15 bg-secondary/50 cursor-default select-none overflow-hidden"
      style={{
        boxShadow: hovered ? `0 0 18px ${color}50, 0 0 6px ${color}30` : "none",
        borderColor: hovered ? `${color}60` : undefined,
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* brand color wash on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: `${color}12` }}
      />
      <Icon
        className="relative z-10 text-xl transition-all duration-300"
        style={{
          color: hovered ? color : undefined,
          filter: hovered ? `drop-shadow(0 0 8px ${color})` : "none",
        }}
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TYPING HOOK
───────────────────────────────────────── */
const useTyping = (lines: string[], speed = 38, lineDelay = 600) => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }
    if (currentChar === 0 && currentLine > 0) {
      const t = setTimeout(() => setCurrentChar(1), lineDelay);
      return () => clearTimeout(t);
    }
    const target = lines[currentLine];
    if (currentChar > target.length) {
      setOutput((o) => {
        const n = [...o];
        n[currentLine] = target;
        return n;
      });
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
      return;
    }
    const t = setTimeout(() => {
      setOutput((o) => {
        const n = [...o];
        n[currentLine] = target.slice(0, currentChar);
        return n;
      });
      setCurrentChar((c) => c + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [currentLine, currentChar, lines, speed, lineDelay]);

  return { output, currentLine, done };
};

/* ─────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────── */
const StatCounter = ({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl font-bold font-mono text-primary tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-0.5">
        {label}
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
const AboutSection = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInView = useInView(terminalRef, { once: true });
  const lines = [
    'const dev = "Christofer";',
    'const passion = ["build", "debug", "ship"];',
    'const status = "open to opportunities";',
    "// Let's build something great →",
  ];
  const { output, currentLine, done } = useTyping(
    termInView ? lines : [],
    36,
    500,
  );

  return (
    <>
      <style>{`
        @keyframes ticker-left  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes ticker-right { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
        .ticker-left  { display:flex; width:max-content; animation:ticker-left  22s linear infinite; }
        .ticker-right { display:flex; width:max-content; animation:ticker-right 26s linear infinite; }
        .ticker-wrap:hover .ticker-left,
        .ticker-wrap:hover .ticker-right { animation-play-state: paused; }
        .ticker-fade {
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor { animation: blink 1s step-end infinite; }
        .scan-line {
          position:absolute; left:0; right:0; height:1px;
          background: linear-gradient(90deg,transparent,hsl(var(--primary)/0.2),transparent);
          animation: scan 3s linear infinite;
        }
        @keyframes scan { from{top:0%} to{top:100%} }
        .glow-line {
          background: linear-gradient(90deg, transparent, hsl(var(--primary)/0.4), transparent);
        }
      `}</style>

      <section id="about" className="section-padding relative overflow-hidden">
        {/* ambient bg blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <ScrollReveal>
            <h2 className="heading-lg mb-2">
              <span className="text-gradient font-mono text-lg block mb-3">
                01.
              </span>
              About Me
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-12" />
          </ScrollReveal>

          {/* ── Main grid ── */}
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* ── LEFT: text + terminal + ticker ── */}
            <div className="md:col-span-3 space-y-6">
              <ScrollReveal delay={0.1}>
                <p className="body-lg text-muted-foreground">
                  Hi! I'm{" "}
                  <span className="text-foreground font-semibold">
                    Christofer
                  </span>
                  , a developer who enjoys building, debugging, and refining web
                  applications into clean, usable products people actually love
                  to use.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="body-lg text-muted-foreground">
                  I love exploring new technologies, writing maintainable code,
                  and continuously improving my craft through real-world
                  projects.
                </p>
              </ScrollReveal>

              {/* ── Terminal card ── */}
              <ScrollReveal delay={0.2}>
                <div
                  ref={terminalRef}
                  className="rounded-xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden"
                >
                  {/* window chrome */}
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/30 border-b border-border/40">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground/40">
                      ~/christofer/intro.ts
                    </span>
                  </div>
                  {/* code body */}
                  <div className="p-4 font-mono text-[12px] leading-7 relative overflow-hidden min-h-[120px]">
                    <div className="scan-line" />
                    {lines.map((line, i) => {
                      const isComment = line.startsWith("//");
                      const isString = line.includes('"');
                      return (
                        <div key={i} className="flex gap-3">
                          <span className="select-none text-muted-foreground/25 w-4 text-right shrink-0">
                            {i + 1}
                          </span>
                          <span
                            className={
                              isComment
                                ? "text-muted-foreground/40 italic"
                                : "text-foreground/80"
                            }
                          >
                            {/* show typed or placeholder blank */}
                            {output[i] !== undefined ? (
                              <>
                                {output[i]}
                                {currentLine === i && !done && (
                                  <span className="cursor text-primary ml-0.5">
                                    ▋
                                  </span>
                                )}
                              </>
                            ) : null}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* ── Logo ticker ── */}
              <ScrollReveal delay={0.25}>
                <p className="text-[11px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-3">
                  // technologies I work with
                </p>
                <div className="ticker-wrap ticker-fade overflow-hidden rounded-xl border border-primary/10 bg-background/30 p-3 space-y-2.5 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px glow-line" />

                  <div className="ticker-left gap-2.5">
                    {row1.map((t, i) => (
                      <span key={i} className="mr-2.5">
                        <TechBadge
                          icon={t.icon}
                          name={t.name}
                          color={t.color}
                        />
                      </span>
                    ))}
                  </div>
                  <div className="ticker-right gap-2.5">
                    {row2.map((t, i) => (
                      <span key={i} className="mr-2.5">
                        <TechBadge
                          icon={t.icon}
                          name={t.name}
                          color={t.color}
                        />
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px glow-line" />
                </div>
              </ScrollReveal>
            </div>

            {/* ── RIGHT: photo + stats ── */}
            <ScrollReveal className="md:col-span-2" delay={0.2}>
              <div className="flex flex-col items-center gap-6">
                {/* Photo with animated border */}
                <div className="relative group w-64 h-64">
                  {/* spinning ring */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity"
                    style={{
                      background:
                        "conic-gradient(from 0deg, hsl(var(--primary)), transparent, hsl(var(--primary)/0.4), transparent, hsl(var(--primary)))",
                      borderRadius: "14px",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  {/* photo */}
                  <div className="relative w-full h-full rounded-xl bg-secondary overflow-hidden border border-primary/20 z-10">
                    <img
                      src="/foto.jpg"
                      alt="Christofer"
                      className="w-full h-full object-cover"
                    />
                    {/* subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                  </div>
                  {/* offset shadow box */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 border-primary/20 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300" />
                </div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-full grid grid-cols-3 gap-2"
                >
                  {[
                    { value: 5, suffix: "+", label: "Years exp" },
                    { value: 30, suffix: "+", label: "Projects" },
                    { value: 12, suffix: "", label: "Tech stack" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="py-3 px-2 rounded-xl border border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
                    >
                      <StatCounter
                        value={s.value}
                        label={s.label}
                        suffix={s.suffix}
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Available badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 text-emerald-400"
                >
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-mono">Available for work</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
