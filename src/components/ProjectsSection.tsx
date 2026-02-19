import ScrollReveal from "./ScrollReveal";
import { ExternalLink, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Digital Signature System(FTI-Service)",
    description:
      "A secure web-based digital signature platform built with Flask and Vue (TypeScript) featuring JWT authentication, document verification, and database-backed signature validation.",
    tags: ["Flask", "Vue", "TypeScript", "PostgreSQL", "JWT"],
    github: "https://github.com/Christofer0/TTU-02-PROJECT",
    live: "#",
    status: "active",
    year: "2026",
    lines: "12.4k",
  },
  {
    title: "Restaurant Website",
    description:
      "A competition project: a responsive restaurant website with dynamic menu management, database integration, and optimized performance.",
    tags: ["Laravel", "MySQL", "Blade", "Tailwind", "Redis"],
    github: "#",
    live: "https://next-gen-k-mentality.fly.dev/",
    status: "active",
    year: "2025",
    lines: "8.7k",
  },
  {
    title: "Enterprise Digital Signature Platform",
    description:
      "A production-grade digital signature system with multi-level approval workflow, secure JWT authentication, and role-based authorization built using Spring Boot and PostgreSQL.",
    tags: [
      "Spring Boot",
      "Java",
      "PostgreSQL",
      "JWT",
      "RBAC",
      "Workflow Engine",
    ],
    github: "#",
    live: "#",
    status: "production",
    year: "2025",
    lines: "15.2k",
  },

  {
    title: "Finance Dashboard",
    description:
      "Interactive financial dashboard with data visualization, portfolio tracking, and predictive analytics.",
    tags: ["TypeScript", "D3.js", "Python", "FastAPI"],
    github: "#",
    live: "#",
    status: "active",
    year: "2023",
    lines: "9.1k",
  },
];

const statusConfig = {
  production: {
    label: "PROD",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_6px_rgba(52,211,153,0.6)]",
  },
  active: {
    label: "DEV",
    color: "text-amber-400",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_6px_rgba(251,191,36,0.6)]",
  },
  error: {
    label: "ERR",
    color: "text-rose-400",
    dot: "bg-rose-400",
    glow: "shadow-[0_0_6px_rgba(244,63,94,0.6)]",
  },
};

/* ── Animated line counter ── */
const LineCount = ({ lines, inView }: { lines: string; inView: boolean }) => {
  return (
    <span className="font-mono text-[10px] text-muted-foreground/50 tabular-nums">
      {inView ? lines : "0.0k"} LOC
    </span>
  );
};

/* ── Single project card — "code file" aesthetic ── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const st = statusConfig[project.status as keyof typeof statusConfig];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-border/60 bg-background/70 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300 cursor-default"
      style={{
        boxShadow: hovered
          ? "0 0 0 1px hsl(var(--primary) / 0.15), 0 20px 40px -12px hsl(var(--primary) / 0.12)"
          : "none",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* ── Top bar: "window chrome" ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-muted/30">
        {/* Traffic-light dots */}
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />

        {/* Fake "file path" */}
        <span className="ml-2 font-mono text-[11px] text-muted-foreground/50 truncate">
          ~/projects/
          <span className="text-muted-foreground/80">
            {project.title.toLowerCase().replace(/ /g, "-")}
          </span>
          <span className="text-primary/60">.tsx</span>
        </span>

        {/* Status pill — right side */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className={`relative flex w-1.5 h-1.5`}>
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${st.dot}`}
            />
            <span
              className={`relative inline-flex rounded-full w-1.5 h-1.5 ${st.dot} ${st.glow}`}
            />
          </span>
          <span
            className={`font-mono text-[10px] font-bold tracking-widest ${st.color}`}
          >
            {st.label}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Line numbers gutter */}
        <div className="flex flex-col gap-0 pt-5 pb-5 pl-3 pr-3 select-none border-r border-border/30 bg-muted/10">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-mono text-[10px] leading-[1.85rem] text-muted-foreground/25 text-right w-4"
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 pl-4">
          {/* Project number + title */}
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-mono text-[11px] text-primary/50 shrink-0">
              {String(index + 1).padStart(2, "0")}.
            </span>
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-[13px] leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-primary/70 bg-primary/8 border border-primary/15 px-2 py-0.5 rounded-md hover:border-primary/40 hover:text-primary transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: meta + links */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-muted-foreground/40">
                {project.year}
              </span>
              <span className="text-border/60">·</span>
              <LineCount lines={project.lines} inView={isInView} />
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href={project.github}
                aria-label="GitHub"
                whileHover={{ scale: 1.15, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground/50 hover:text-primary transition-colors duration-200"
              >
                <Github size={15} />
              </motion.a>
              <motion.a
                href={project.live}
                aria-label="Live demo"
                whileHover={{ scale: 1.15, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground/50 hover:text-primary transition-colors duration-200"
              >
                <ExternalLink size={15} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Animated bottom accent line ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ originX: 0.5 }}
      />
    </motion.div>
  );
};

/* ── Main section ── */
const ProjectsSection = () => {
  return (
    <>
      <style>{`
        .glow-line {
          background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent);
        }
        /* subtle scan-line texture on cards */
        .scanline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--primary) / 0.012) 2px,
            hsl(var(--primary) / 0.012) 4px
          );
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>

      <section id="projects" className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <ScrollReveal>
            <h2 className="heading-lg mb-2">
              <span className="text-gradient font-mono text-lg block mb-3">
                03.
              </span>
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-12" />
          </ScrollReveal>

          {/* ── Grid ── */}
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          {/* ── Footer CTA ── */}
          <ScrollReveal delay={0.3}>
            <div className="mt-14 text-center">
              <p className="text-sm text-muted-foreground/60 font-mono mb-4">
                <span className="text-primary">{"// "}</span>
                more repos on GitHub
              </p>
              <motion.a
                href="https://github.com/Christofer0?tab=repositories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary/30 text-sm font-mono text-primary hover:bg-primary/5 hover:border-primary/60 transition-colors duration-200"
              >
                <Github size={14} />
                View all projects
                <ExternalLink size={12} className="opacity-60" />
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
