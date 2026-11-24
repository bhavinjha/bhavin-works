import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";
import { cn } from "@/utils/cn";

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref} className={cn("reveal", inView && "in", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

export function useTypewriter(words: string[], speed = 70, pause = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), pause);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (!next) {
            setDel(false);
            setI((n) => n + 1);
          }
        }
      },
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

export function Magnetic({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold text-[15px] transition-[transform,background,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron cursor-pointer select-none",
        variant === "primary"
          ? "bg-gradient-to-r from-saffron to-rose text-night shadow-[0_10px_40px_-10px_rgba(255,77,141,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(255,77,141,0.9)]"
          : "glass text-cream hover:bg-white/10",
        className
      )}
    >
      {children}
    </a>
  );
}

export function SpotCard({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={style}
      className={cn("spot glass rounded-3xl transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, color = "text-saffron" }: { children: ReactNode; color?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em]", color)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Photo with graceful fallback if the file isn't there yet */
export function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,#3a2025,#1f1114_70%)] text-center",
          className
        )}
      >
        <span className="font-display text-7xl font-extrabold text-syrup">BJ</span>
        <span className="px-6 font-mono text-[10px] uppercase tracking-widest text-muted">Add photo → public/images/bhavin.jpg</span>
      </div>
    );
  return <img src={src} alt={alt} onError={() => setErr(true)} className={cn("object-cover", className)} loading="eager" />;
}
