import ScrollReveal from "./ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Alfamart",
    period: "2025 — Present",
    type: "Internship",
    description:
      "Working on internal enterprise systems focusing on backend development, database architecture, and secure authentication workflows. Contributing to production-grade applications used in operational environments.",
    achievements: [
      "Enterprise system dev",
      "Secure API auth",
      "Database optimization",
    ],
    current: true,
  },
  {
    role: "Full Stack Developer",
    company: "Academic & Personal Projects",
    period: "2023 — 2025",
    type: "Project Experience",
    description:
      "Developed multiple full-stack applications including digital signature platforms, competition websites, and system-based solutions using modern frameworks and structured backend architecture.",
    achievements: ["Full-stack builds", "JWT auth", "System design"],
    current: false,
  },
  {
    role: "Backend Developer",
    company: "University Projects",
    period: "2022 — Present",
    type: "Academic",
    description:
      "Focused on backend fundamentals, REST API development, database design, and authentication systems while studying software engineering concepts at university.",
    achievements: ["API design", "SQL systems", "Auth logic"],
    current: true,
  },
  {
    role: "Independent System Developer",
    company: "Freelance / Self-Driven",
    period: "2023 — 2025",
    type: "Independent Work",
    description:
      "Independently designing and developing scalable web systems, focusing on backend architecture, authentication flows, and database performance optimization across multiple personal and client-style projects.",
    achievements: ["System architecture", "Auth systems", "Scalable backend"],
    current: false,
  },
];

const ExpCard = ({
  exp,
  index,
  isActive,
  onClick,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Connector line between cards */}
      {index < experiences.length - 1 && (
        <div className="absolute left-[19px] top-[44px] w-px h-[calc(100%+1.5rem)] bg-border/50 z-0" />
      )}

      <div
        className={`relative z-10 flex gap-4 p-4 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-primary/8 border border-primary/25"
            : "hover:bg-muted/40 border border-transparent"
        }`}
      >
        {/* Timeline node */}
        <div className="flex flex-col items-center shrink-0">
          <div
            className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              isActive
                ? "border-primary bg-primary/10 shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
                : exp.current
                  ? "border-primary/50 bg-background"
                  : "border-border bg-background"
            }`}
          >
            {exp.current && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </span>
            )}
            <span className="font-mono text-xs font-bold text-primary">
              {String(experiences.length - index).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3
                className={`font-semibold text-sm leading-tight transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground group-hover:text-primary/80"
                }`}
              >
                {exp.role}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {exp.company}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-mono text-[10px] text-primary/60">
                {exp.period}
              </p>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
                {exp.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experiences[activeIdx];

  return (
    <>
      <style>{`
        .glow-line {
          background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent);
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slide-up 0.35s ease forwards; }
      `}</style>

      <section id="experience" className="section-padding bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <h2 className="heading-lg mb-2">
              <span className="text-gradient font-mono text-lg block mb-3">
                04.
              </span>
              Experience
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-12" />
          </ScrollReveal>

          {/* ── Split layout ── */}
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 items-start">
            {/* LEFT — clickable timeline list */}
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <ExpCard
                  key={i}
                  exp={exp}
                  index={i}
                  isActive={activeIdx === i}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>

            {/* RIGHT — detail panel */}
            <ScrollReveal delay={0.2}>
              <div
                key={activeIdx}
                className="slide-up sticky top-24 rounded-2xl border border-primary/15 bg-background/60 backdrop-blur-sm overflow-hidden"
              >
                {/* Panel top bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-muted/20">
                  <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground/50">
                    experience.json
                  </span>
                  {active.current && (
                    <span className="ml-auto font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      current
                    </span>
                  )}
                </div>

                {/* Panel body */}
                <div className="p-6 space-y-6">
                  {/* Role + company */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] text-primary/50">
                        role:
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                      {active.role}
                    </h3>
                    <p className="text-primary font-mono text-sm mt-1">
                      @ {active.company}
                    </p>
                  </div>

                  {/* Period bar */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border/50" />
                    <span className="font-mono text-xs text-muted-foreground/60 whitespace-nowrap">
                      {active.period}
                    </span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-[11px] font-mono text-primary/40 mb-2">
                      // description
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <p className="text-[11px] font-mono text-primary/40 mb-3">
                      // highlights
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {active.achievements.map((a, i) => (
                        <motion.div
                          key={a}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: i * 0.07,
                            duration: 0.3,
                            ease: "backOut",
                          }}
                          className="flex flex-col items-center justify-center p-3 rounded-lg border border-primary/15 bg-primary/5 text-center hover:border-primary/35 hover:bg-primary/8 transition-colors duration-200"
                        >
                          <span className="text-primary text-[10px] font-mono leading-tight">
                            {a}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation hint */}
                  <p className="text-[10px] font-mono text-muted-foreground/30 text-center">
                    ← click a role to explore →
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="h-px w-full glow-line" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceSection;
