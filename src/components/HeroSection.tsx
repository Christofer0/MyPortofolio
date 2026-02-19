import { motion, useAnimationControls, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useEffect, useState, useRef } from "react";

/* ── Typewriter hook ── */
const useTypewriter = (words: string[], typingSpeed = 80, pause = 1800) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, typingSpeed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, typingSpeed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, pause]);

  return displayed;
};

/* ── Floating grid lines ── */
const GridLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" className="opacity-[0.035]">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Diagonal accent line */}
    <motion.div
      className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-0 right-[40%] w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"
      animate={{ opacity: [0.2, 0.6, 0.2] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
  </div>
);

/* ── Animated counter ── */
const Counter = ({
  to,
  suffix = "",
  delay = 0,
}: {
  to: number;
  suffix?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let start: number;
      const duration = 1500;
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(eased * to));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, to, delay]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

/* ── Orbiting dot decoration ── */
const OrbitDot = ({
  radius,
  duration,
  delay,
  size = 3,
}: {
  radius: number;
  duration: number;
  delay: number;
  size?: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary/60"
    style={{
      width: size,
      height: size,
      left: "50%",
      top: "50%",
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    animate={{
      x: [radius, 0, -radius, 0, radius],
      y: [0, radius, 0, -radius, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
  />
);

/* ── Main Hero ── */
const HeroSection = () => {
  const roles = [
    "Full-Stack Developer",
    "Backend Engineer",
    "Frontend Craftsman",
    "API Architect",
  ];
  const typed = useTypewriter(roles, 75, 2000);

  const socials = [
    { icon: Github, href: "https://github.com/Christofer0/", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/brillian-christofer-wiyoso-53190b2b9",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:brilliancw30@gmail.com", label: "Email" },
  ];

  const stats = [
    { value: 3, suffix: "+", label: "Years exp." },
    { value: 20, suffix: "+", label: "Projects" },
    { value: 12, suffix: "", label: "Technologies" },
  ];

  // Stagger container
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
        .pulse-ring {
          animation: pulse-ring 2.5s ease-out infinite;
        }
        .pulse-ring-2 {
          animation: pulse-ring 2.5s ease-out infinite 0.8s;
        }

        @keyframes shimmer-text {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            hsl(var(--foreground)) 30%,
            hsl(var(--primary))    50%,
            hsl(var(--foreground)) 70%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-text 4s linear infinite 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .float-card { animation: float 5s ease-in-out infinite; }

        .cursor-blink::after {
          content: '▋';
          animation: blink 1s step-end infinite;
          color: hsl(var(--primary));
          margin-left: 1px;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <section className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
        {/* ── Grid background ── */}
        <GridLines />

        {/* ── Ambient glows ── */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
            {/* ══ LEFT — main content ══ */}
            <motion.div variants={container} initial="hidden" animate="show">
              {/* Terminal badge */}
              <motion.div variants={item} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/5 font-mono text-xs text-primary">
                  <Terminal size={11} />
                  <span className="text-muted-foreground/60">~$</span>
                  <span>Available for work</span>
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="pulse-ring-2 absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                  </span>
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.p
                variants={item}
                className="font-mono text-primary text-sm mb-3 tracking-widest"
              >
                Hi, my name is
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={item}
                className="font-bold leading-none mb-2"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
              >
                <span className="shimmer">Brillian Christofer</span>
                <span className="text-primary">.</span>
              </motion.h1>

              {/* Typewriter role */}
              <motion.h2
                variants={item}
                className="font-semibold text-muted-foreground mb-6 cursor-blink"
                style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
              >
                {typed || "\u00A0"}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={item}
                className="text-muted-foreground text-sm leading-relaxed max-w-lg mb-10"
              >
                Full-stack developer specializing in building exceptional
                digital experiences. From pixel-perfect frontends to robust
                backend systems — I craft software that scales and delights.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={item}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                >
                  View My Work
                  <ArrowDown size={14} />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary text-sm font-medium hover:bg-primary/8 hover:border-primary/70 transition-all"
                >
                  Get in Touch
                </motion.a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={item} className="flex items-center gap-1">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 border border-transparent hover:border-primary/20 transition-all duration-200"
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
                <div className="w-px h-5 bg-border/50 mx-3" />
                <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                  find me on
                </span>
              </motion.div>
            </motion.div>

            {/* ══ RIGHT — decorative panel ══ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden md:flex flex-col gap-4"
            >
              {/* Main visual card */}
              <div className="float-card relative rounded-2xl border border-primary/15 bg-background/60 backdrop-blur-sm p-6 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 font-mono text-[10px] text-muted-foreground/40">
                    christofer.config.ts
                  </span>
                </div>

                {/* Fake code block */}
                <div className="font-mono text-[12px] space-y-1 leading-relaxed">
                  <p>
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-blue-400">developer</span>{" "}
                    <span className="text-foreground/50">=</span> {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="text-emerald-400">name</span>
                    <span className="text-foreground/50">:</span>{" "}
                    <span className="text-amber-300">
                      "Brillian Christofer"
                    </span>
                    <span className="text-foreground/50">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-emerald-400">role</span>
                    <span className="text-foreground/50">:</span>{" "}
                    <span className="text-amber-300">"Full-Stack Dev"</span>
                    <span className="text-foreground/50">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-emerald-400">location</span>
                    <span className="text-foreground/50">:</span>{" "}
                    <span className="text-amber-300">"Jakarta, ID"</span>
                    <span className="text-foreground/50">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-emerald-400">available</span>
                    <span className="text-foreground/50">:</span>{" "}
                    <span className="text-emerald-400">true</span>
                    <span className="text-foreground/50">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-emerald-400">passion</span>
                    <span className="text-foreground/50">:</span>{" "}
                    <span className="text-amber-300">"clean code"</span>
                    <span className="text-foreground/50">,</span>
                  </p>
                  <p>
                    {"}"}
                    <span className="text-foreground/30">;</span>
                  </p>
                  <p className="mt-2 text-muted-foreground/30">
                    {"// currently building cool stuff"}
                  </p>
                </div>

                {/* Orbit decoration */}
                <div className="absolute right-6 bottom-6 w-16 h-16">
                  <OrbitDot radius={28} duration={5} delay={0} size={3} />
                  <OrbitDot radius={20} duration={3.5} delay={0.5} size={2} />
                  <OrbitDot radius={35} duration={7} delay={1} size={2} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_10px_hsl(var(--primary)/0.4)]" />
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ value, suffix, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8 + i * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-4 text-center hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 cursor-default"
                  >
                    <p className="text-xl font-bold font-mono text-primary tabular-nums">
                      <Counter
                        to={value}
                        suffix={suffix}
                        delay={(0.8 + i * 0.1) * 1000}
                      />
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground/50 mt-0.5 uppercase tracking-wider">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Skill tags strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-1.5"
              >
                {[
                  "Spring Boot",
                  "Vue",
                  "TypeScript",
                  "PostgreSQL",
                  "Docker",
                  "Python",
                ].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.07, ease: "backOut" }}
                    className="px-2.5 py-1 rounded-md border border-border/40 bg-muted/30 font-mono text-[10px] text-muted-foreground/60 hover:border-primary/30 hover:text-primary/70 transition-colors cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">
            scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
