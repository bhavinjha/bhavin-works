import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { CountUp, Magnetic, Photo, Reveal, useTypewriter } from "@/components/ui";

const links = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#legacy", label: "Legacy" },
  { href: "#plans", label: "Collab" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-saffron via-rose to-circuit"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:mt-4",
          scrolled ? "glass mx-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] sm:mx-auto" : "mx-3 bg-transparent sm:mx-auto"
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5 pl-1" aria-label="Bhavin Jha home">
          <img
            src="/images/logo.jpg"
            alt=""
            className="h-9 w-9 rounded-full ring-2 ring-rose/50 transition-transform duration-500 group-hover:rotate-[360deg]"
          />
          <span className="font-display text-lg font-extrabold tracking-tight">
            bhavin<span className="text-rose">.</span>jha
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm text-cream/75 transition-colors hover:bg-white/5 hover:text-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-cream px-5 py-2.5 font-display text-sm font-semibold text-night transition hover:bg-saffron sm:inline-flex"
          >
            Say hi 👋
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-cream transition", open && "top-1.5 rotate-45")} />
              <span className={cn("absolute left-0 top-3 h-0.5 w-5 bg-cream transition", open && "top-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>
      <div
        className={cn(
          "mx-3 mt-2 overflow-hidden rounded-3xl glass transition-all duration-500 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <ul className="p-3">
          {[...links, { href: "#contact", label: "Say hi 👋" }].map((l) => (
            <li key={l.href}>
              <a onClick={() => setOpen(false)} href={l.href} className="block rounded-2xl px-4 py-3 font-display text-lg hover:bg-white/5">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

const typeWords = [
  'robot.move("forward")',
  "print('Hello, world!')",
  "game.spawn(creeper)",
  "website.deploy()",
  "slides.make_it_epic()",
  "gulab_jamun.giggle()",
];

export function Hero() {
  const typed = useTypewriter(typeWords);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const on = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--px", String(x));
      el.style.setProperty("--py", String(y));
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);

  const par = (d: number) => ({ transform: `translate(calc(var(--px,0) * ${d}px), calc(var(--py,0) * ${d}px))` });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 md:pb-28">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-rose/25 blur-[120px] aurora" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-60 h-[420px] w-[420px] rounded-full bg-saffron/20 blur-[120px] aurora [animation-delay:-6s]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-circuit/10 blur-[100px] aurora [animation-delay:-10s]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-3 rounded-full glass py-1.5 pl-1.5 pr-4 text-xs text-cream/80">
              <span className="rounded-full bg-circuit/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-circuit">
                ● Online
              </span>
              Age 12 · Builder · Gamer · Giggler
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-[84px]">
              Hi, I'm <span className="text-syrup">Bhavin</span>.
              <br />
              I build{" "}
              <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-cream/95">robots,</span>
              <br />
              code &amp; <span className="relative whitespace-nowrap">
                giggles
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden>
                  <path
                    d="M2 9 C 50 2, 100 2, 198 7"
                    stroke="url(#ug)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="220"
                    strokeDashoffset="220"
                    style={{ animation: "dash 1.2s .9s ease-out forwards" }}
                  />
                  <defs>
                    <linearGradient id="ug" x1="0" x2="1">
                      <stop stopColor="#ffb547" />
                      <stop offset="1" stopColor="#ff4d8d" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              .
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              A 12-year-old maker who turns wires into robots, ideas into websites, and lunch breaks into game jams — powered by
              Python, curiosity, and the legendary <span className="text-rose-soft">Khilkhila Gulab Jamun</span>.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-7 flex max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm">
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2.5 w-2.5 rounded-full bg-rose" />
                <i className="h-2.5 w-2.5 rounded-full bg-saffron" />
                <i className="h-2.5 w-2.5 rounded-full bg-circuit" />
              </span>
              <span className="text-circuit">bhavin@lab</span>
              <span className="text-muted">~$</span>
              <span className="truncate text-cream" aria-live="polite">
                {typed}
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-saffron animate-blink" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic href="#projects">
                See my builds
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Magnetic>
              <Magnetic href="#legacy" variant="ghost">
                <img src="/images/logo.jpg" alt="" className="h-6 w-6 rounded-full" /> Meet the Gulab Jamun
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={440}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                { n: 15, s: "+", l: "Robotics builds" },
                { n: 6, s: "+", l: "Languages" },
                { n: 999, s: "+", l: "Hours in Minecraft" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-3xl font-extrabold sm:text-4xl">
                    <CountUp to={s.n} suffix={s.s} />
                  </dd>
                  <p className="mt-1 text-xs text-muted">{s.l}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Visual stage */}
        <Reveal delay={200}>
          <div ref={stage} className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-[-14%] rounded-full border border-dashed border-white/10 animate-spin-slow" aria-hidden />
            <div className="absolute inset-[-4%] rounded-full border border-rose/20" aria-hidden />

            <div className="absolute inset-0 transition-transform duration-300 ease-out" style={par(-14)}>
              <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-white/15 bg-cocoa shadow-[0_40px_100px_-30px_rgba(255,77,141,0.55)]">
                <Photo src="/images/bhavin.jpg" alt="Bhavin Jha sitting on steps in a blue jacket" className="h-full w-full object-[50%_30%]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="font-pixel text-[9px] text-saffron">PLAYER 1</p>
                    <p className="mt-1 font-display text-xl font-bold">Bhavin Jha</p>
                  </div>
                  <div className="w-28">
                    <p className="flex justify-between font-mono text-[10px] text-muted">
                      <span>LVL 12</span>
                      <span>XP</span>
                    </p>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-circuit to-saffron" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -left-6 top-10 sm:-left-12" style={par(26)}>
              <div className="glass animate-float rounded-2xl px-3.5 py-2.5 font-mono text-xs shadow-xl">
                <span className="text-saffron">🐍 python</span> <span className="text-muted">v3.12</span>
              </div>
            </div>
            <div className="absolute -right-4 top-1/3 sm:-right-10" style={par(34)}>
              <div className="glass animate-float rounded-2xl px-3.5 py-2.5 text-xs shadow-xl [animation-delay:-2s]">
                <span className="mr-1">🤖</span> Robot #15 <span className="text-circuit">online</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-6 w-28 sm:-right-14 sm:w-36" style={par(44)}>
              <a href="#legacy" aria-label="Go to the Khilkhila Gulab Jamun legacy" className="block animate-float [animation-delay:-4s]">
                <img
                  src="/images/logo.jpg"
                  alt="Khilkhila Gulab Jamun badge"
                  className="rounded-full ring-4 ring-night shadow-[0_0_60px_rgba(255,77,141,0.6)] transition-transform duration-500 hover:scale-110 hover:rotate-12"
                />
              </a>
            </div>
            <div className="absolute -left-4 bottom-20 sm:-left-10" style={par(20)}>
              <div className="pixel-shadow animate-float rounded-md bg-cream px-3 py-2 font-pixel text-[8px] text-night [animation-delay:-3s]">
                ⛏ MINECRAFT PRO
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const marqueeItems = [
  "Python", "Arduino", "C++", "Minecraft", "Java", "HTML/CSS", "GTA V", "C", "Scratch", "JavaScript", "PowerPoint wizardry", "Sensors & Servos", "Game Dev", "Khilkhila Energy",
];

export function SocialProof() {
  return (
    <section aria-label="Toolbox and highlights" className="relative border-y border-white/5 bg-cocoa/40 py-10">
      <Reveal>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Applauded by teachers · teammates · science-fair judges · one very cool gulab jamun
        </p>
      </Reveal>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 px-5 py-2.5 font-display text-lg font-semibold text-cream/70 transition-colors hover:border-rose/50 hover:text-cream"
            >
              <span className={cn("h-2 w-2 rotate-45", i % 3 === 0 ? "bg-rose" : i % 3 === 1 ? "bg-saffron" : "bg-circuit")} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
