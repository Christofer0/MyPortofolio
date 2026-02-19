import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, Terminal } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/Christofer0/", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/brillian-christofer-wiyoso-53190b2b9",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:brilliancw30@gmail.com", label: "Email" },
];

/* ── Typing animation for status line ── */
const useTyped = (text: string, delay = 800) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setOut(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(iv);
      }, 45);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return out;
};

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const typed = useTyped("echo 'Thanks for visiting!'", 400);
  const [year] = useState(new Date().getFullYear());

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        .footer-grid-bg {
          background-image: radial-gradient(circle, hsl(var(--primary)/0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .glow-line-h {
          background: linear-gradient(90deg, transparent, hsl(var(--primary)/0.35), transparent);
        }
        @keyframes hbeat {
          0%,100% { transform: scale(1);   }
          30%      { transform: scale(1.3); }
          60%      { transform: scale(1.1); }
        }
        .heartbeat { animation: hbeat 1.6s ease-in-out infinite; display:inline-block; }
        .cursor-blink::after {
          content:'▋';
          animation: cblink 1s step-end infinite;
          color: hsl(var(--primary));
        }
        @keyframes cblink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <footer
        ref={ref}
        className="relative border-t border-border/40 footer-grid-bg overflow-hidden"
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px glow-line-h" />

        {/* Ambient blob */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-primary/4 blur-[80px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-8 z-10">
          {/* ── Top row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand col */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/8 flex items-center justify-center">
                  <Terminal size={13} className="text-primary" />
                </div>
                <span className="font-mono text-sm font-bold">
                  <span className="text-muted-foreground/50">{"<"}</span>
                  <span className="text-foreground">bcw</span>
                  <span className="text-primary"> /</span>
                  <span className="text-muted-foreground/50">{">"}</span>
                </span>
              </div>

              {/* Terminal line */}
              <div className="rounded-lg border border-border/40 bg-background/50 px-3 py-2 font-mono text-[11px]">
                <span className="text-muted-foreground/40">~$ </span>
                <span className="text-primary/80 cursor-blink">{typed}</span>
              </div>

              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                Building digital products with clean code and thoughtful design.
                Open to new opportunities.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 pt-1">
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, ease: "backOut" }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-lg border border-border/50 bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <Icon size={13} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Nav links col */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="font-mono text-[10px] text-primary/50 uppercase tracking-widest mb-4">
                Navigation
              </p>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 group w-fit"
                >
                  <span className="font-mono text-[9px] text-primary/30 group-hover:text-primary/60 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* Status col */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="font-mono text-[10px] text-primary/50 uppercase tracking-widest mb-4">
                Status
              </p>

              {/* Status card */}
              <div className="rounded-xl border border-border/40 bg-background/50 p-4 space-y-3">
                {[
                  {
                    label: "Availability",
                    value: "Open",
                    dot: "bg-emerald-400",
                    pulse: true,
                  },
                  {
                    label: "Location",
                    value: "Jakarta, ID",
                    dot: "bg-blue-400",
                    pulse: false,
                  },
                  {
                    label: "Response",
                    value: "~24 hours",
                    dot: "bg-amber-400",
                    pulse: false,
                  },
                ].map(({ label, value, dot, pulse }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground/50">
                      {label}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-foreground/70">
                      <span className={`relative flex w-1.5 h-1.5 shrink-0`}>
                        {pulse && (
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-50`}
                          />
                        )}
                        <span
                          className={`relative inline-flex w-1.5 h-1.5 rounded-full ${dot}`}
                        />
                      </span>
                      {value}
                    </span>
                  </div>
                ))}

                <div className="pt-2 border-t border-border/30">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] hover:bg-primary/15 hover:border-primary/40 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Let's work together
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px w-full glow-line-h mb-6" />

          {/* ── Bottom row ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/50">
              <span>© {year}</span>
              <span className="text-border/60">·</span>
              <span>Brillian Christofer</span>
              <span className="text-border/60">·</span>
              <span className="flex items-center gap-1">
                Built with
                <span className="heartbeat mx-0.5">
                  <Heart
                    size={10}
                    className="text-rose-400 fill-rose-400 inline"
                  />
                </span>
                & <span className="text-primary">{"</>"}</span>
              </span>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-muted/20 hover:border-primary/30 hover:bg-primary/5 hover:text-primary text-muted-foreground/50 transition-all duration-200 font-mono text-[10px] group"
            >
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowUp size={11} />
              </motion.span>
              back to top
            </motion.button>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
