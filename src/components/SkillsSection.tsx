import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

/* =======================
   DATA
======================= */
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
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              {cat.items.length} tools
            </span>
          </div>

          {/* Badge cloud */}
          <div className="p-4 flex flex-wrap gap-2 min-h-[140px] content-start">
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

          {/* Bottom spacing or minimalist footer */}
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
                {cat.items.length} items
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
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="heading-lg mb-2 flex flex-col items-center gap-2 justify-center">
                <span className="text-gradient font-mono text-lg block">
                  02.
                </span>
                Skills & Tools
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Berikut adalah rangkaian teknologi, bahasa pemrograman, dan framework yang saya gunakan untuk membangun solusi perangkat lunak yang tangguh dan terukur.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Tech Ecosystem ── */}
          <ScrollReveal delay={0.1}>
            <div className="relative rounded-2xl border border-primary/10 bg-background/40 p-8 backdrop-blur-sm">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
              <p className="text-[10px] font-mono text-primary/50 uppercase tracking-widest text-center mb-6">
                Core Stack & Ecosystem
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
