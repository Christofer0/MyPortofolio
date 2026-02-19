import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Experience", href: "#experience", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

/* ── Active section tracker ── */
const useActiveSection = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
};

/* ── Scroll progress bar ── */
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary origin-left"
      style={{ scaleX }}
    />
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        .nav-link-hover::before {
          content: attr(data-num);
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          font-family: monospace;
          font-size: 9px;
          color: hsl(var(--primary));
          opacity: 0;
          transition: opacity 0.2s, top 0.2s;
        }
        .nav-link-hover:hover::before {
          opacity: 1;
          top: -14px;
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_30px_hsl(var(--background)/0.8)]"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        {scrolled && <ScrollBar />}

        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2"
          >
            <div className="relative w-8 h-8 rounded-lg border border-primary/30 bg-primary/8 flex items-center justify-center overflow-hidden group-hover:border-primary/60 transition-colors duration-300">
              <Terminal size={13} className="text-primary relative z-10" />
              {/* Glow sweep on hover */}
              <motion.div
                className="absolute inset-0 bg-primary/15"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="font-mono text-sm font-bold">
              <span className="text-muted-foreground/50">{"<"}</span>
              <span className="text-foreground">bcw</span>
              <span className="text-primary"> /</span>
              <span className="text-muted-foreground/50">{">"}</span>
            </span>
          </motion.a>

          {/* ── Desktop nav ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-num={item.num}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="nav-link-hover relative inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 group"
                    style={{ position: "relative" }}
                  >
                    {/* Active / hover background pill */}
                    {(isActive || hoveredItem === item.href) && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-lg ${
                          isActive
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted/60"
                        }`}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={`relative font-mono text-[10px] transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground/40 group-hover:text-primary/60"
                      }`}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`relative transition-colors duration-200 ${
                        isActive
                          ? "text-primary font-medium"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right side ── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <div className="w-px h-5 bg-border/50" />

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-medium overflow-hidden group"
            >
              {/* Shimmer on hover */}
              <motion.span className="absolute inset-0 bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-500" />
              <span className="relative flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70 animate-pulse" />
                Hire Me
              </span>
            </motion.a>
          </div>

          {/* ── Mobile toggle ── */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center text-foreground hover:border-primary/30 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
                {navItems.map((item, i) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.06,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 border border-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-primary/50 w-6">
                        {item.num}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </motion.a>
                  );
                })}

                <div className="pt-3 border-t border-border/30">
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-mono font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70 animate-pulse" />
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
