import ScrollReveal from "./ScrollReveal";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Terminal,
} from "lucide-react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Typing animation for the terminal header ── */
const useTyping = (text: string, speed = 45, startDelay = 300) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

/* ── Floating particle ── */
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/30"
    animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
    transition={{
      duration: 4 + Math.random() * 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 4,
    }}
    style={style}
  />
);

/* ── Social links ── */
const socials = [
  { icon: Github, href: "https://github.com/Christofer0/", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/brillian-christofer-wiyoso-53190b2b9",
    label: "LinkedIn",
  },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, href: "mailto:brilliancw30@gmail.com", label: "Email" },
];

/* ── Contact form with terminal aesthetic ── */
const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-80px" });

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const { displayed: typedCmd, done: cmdDone } = useTyping(
    "./send_message.sh --interactive",
    40,
    600,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1800);
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${8 + i * 7.5}%`,
    top: `${20 + (i % 4) * 18}%`,
  }));

  return (
    <>
      <style>{`
        .glow-line {
          background: linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent);
        }
        .input-line {
          background: transparent;
          border: none;
          border-bottom: 1px solid hsl(var(--border));
          border-radius: 0;
          padding: 10px 0;
          width: 100%;
          color: hsl(var(--foreground));
          font-family: monospace;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-line::placeholder { color: hsl(var(--muted-foreground) / 0.4); }
        .input-line:focus { border-color: hsl(var(--primary)); }
        textarea.input-line { resize: none; border: 1px solid hsl(var(--border)); border-radius: 8px; padding: 10px 12px; }
        textarea.input-line:focus { border-color: hsl(var(--primary)); }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1s step-end infinite; }

        @keyframes scan {
          from { transform: translateY(-100%); }
          to   { transform: translateY(400%); }
        }
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, hsl(var(--primary)/0.15), transparent);
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        .success-glow {
          box-shadow: 0 0 40px hsl(var(--primary)/0.2), 0 0 80px hsl(var(--primary)/0.05);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="contact"
        className="section-padding relative overflow-hidden"
      >
        {/* ── Background particles ── */}
        {particles.map((p, i) => (
          <Particle key={i} style={{ left: p.left, top: p.top }} />
        ))}

        {/* ── Ambient glow blob ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* ── Header ── */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gradient font-mono text-sm mb-3 tracking-widest uppercase">
                05. What's Next?
              </p>
              <h2 className="heading-lg mb-4">Get In Touch</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                I'm currently open to new opportunities. Whether it's a project,
                a question, or just saying hi — my inbox is always open.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Main split layout ── */}
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 items-start">
            {/* LEFT — info panel */}
            <ScrollReveal delay={0.05}>
              <div className="space-y-6">
                {/* Terminal greeting card */}
                <div className="rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm overflow-hidden">
                  {/* Window bar */}
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/30 border-b border-border/40">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground/40 flex items-center gap-1">
                      <Terminal size={9} /> bash
                    </span>
                  </div>

                  {/* Terminal body */}
                  <div className="p-4 font-mono text-xs space-y-1 relative overflow-hidden min-h-[120px]">
                    <div className="scan-line" />
                    <p className="text-muted-foreground/40">
                      christofer@portfolio ~ %
                    </p>
                    <p className="text-primary/80">
                      {typedCmd}
                      {!cmdDone && (
                        <span className="cursor-blink text-primary ml-0.5">
                          ▋
                        </span>
                      )}
                    </p>
                    {cmdDone && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="pt-1 space-y-1"
                      >
                        <p className="text-muted-foreground/60">
                          <span className="text-emerald-400">✓</span> Ready to
                          receive messages
                        </p>
                        <p className="text-muted-foreground/60">
                          <span className="text-primary/60">→</span> Response
                          time: <span className="text-primary">~24h</span>
                        </p>
                        <p className="text-muted-foreground/40 flex items-center gap-1">
                          <span className="animate-pulse text-emerald-400">
                            ●
                          </span>{" "}
                          status: available
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border/40 bg-muted/20"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                      Location
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Jakarta, Indonesia
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[10px] font-mono text-muted-foreground/40">
                      GMT+7
                    </p>
                  </div>
                </motion.div>

                {/* Social links */}
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-3">
                    Find me on
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {socials.map(({ icon: Icon, label, href }, i) => (
                      <motion.a
                        key={label}
                        href={href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-border/50 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-muted-foreground transition-all duration-200 group"
                      >
                        <Icon size={14} className="shrink-0" />
                        <span className="text-xs font-mono">{label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT — contact form */}
            <ScrollReveal delay={0.15}>
              <div
                ref={formRef}
                className={`relative rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                  sent
                    ? "border-primary/30 bg-background/70 success-glow"
                    : "border-border/60 bg-background/60"
                }`}
              >
                {/* Top bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
                  <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground/40">
                    new_message.sh
                  </span>
                  {sent && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto font-mono text-[10px] text-emerald-400 flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      sent
                    </motion.span>
                  )}
                </div>

                {/* Form / Success state */}
                {!sent ? (
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        {
                          id: "name",
                          label: "your_name",
                          type: "text",
                          placeholder: "Christofer...",
                          required: true,
                        },
                        {
                          id: "email",
                          label: "your_email",
                          type: "email",
                          placeholder: "hi@mail.com",
                          required: true,
                        },
                      ].map(({ id, label, type, placeholder, required }) => (
                        <div key={id} className="relative">
                          <label className="block font-mono text-[10px] text-primary/50 uppercase tracking-widest mb-2">
                            <span className="text-muted-foreground/30">$ </span>
                            {label}
                          </label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            required={required}
                            value={fields[id as keyof typeof fields]}
                            onChange={(e) =>
                              setFields((f) => ({ ...f, [id]: e.target.value }))
                            }
                            onFocus={() => setFocused(id)}
                            onBlur={() => setFocused(null)}
                            className="input-line"
                          />
                          <motion.div
                            className="h-px bg-primary mt-0"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focused === id ? 1 : 0 }}
                            style={{ originX: 0 }}
                            transition={{ duration: 0.25 }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-[10px] text-primary/50 uppercase tracking-widest mb-2">
                        <span className="text-muted-foreground/30">$ </span>
                        message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Write your message here..."
                        required
                        value={fields.message}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, message: e.target.value }))
                        }
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className="input-line w-full"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-mono text-[10px] text-muted-foreground/30">
                        {fields.message.length > 0
                          ? `${fields.message.length} chars`
                          : "// fill all fields"}
                      </p>
                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-mono font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                      >
                        {sending ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                              className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full inline-block"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  /* ── Success state ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="p-10 text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
                    >
                      <Send size={24} className="text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Message sent!
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      <span className="text-primary">✓</span> I'll get back to
                      you within 24 hours.
                    </p>
                    <div className="pt-2 font-mono text-xs text-muted-foreground/40 space-y-1">
                      <p>
                        exit code: <span className="text-emerald-400">0</span>
                      </p>
                      <p>
                        status:{" "}
                        <span className="text-emerald-400">success</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Bottom glow line */}
                <div className="h-px w-full glow-line" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
