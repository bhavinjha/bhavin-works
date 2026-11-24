import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Magnetic, Reveal, SectionHead, SpotCard } from "@/components/ui";

const giggles = ["hehe!", "khi khi khi 😆", "HAHA stop!", "tickles!", "sweet!", "😎 deal with it", "khilkhila!!"];
const achievements = [
  { at: 5, label: "Syrup Starter" },
  { at: 15, label: "Giggle Grinder" },
  { at: 30, label: "Jamun Legend" },
  { at: 60, label: "Khilkhila Overlord" },
];

export function Legacy() {
  const [count, setCount] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [anim, setAnim] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; dx: number; rot: number; e: string }[]>([]);
  const idRef = useRef(0);
  const unlocked = achievements.filter((a) => count >= a.at);
  const next = achievements.find((a) => count < a.at);

  const tickle = () => {
    const c = count + 1;
    setCount(c);
    setAnim((a) => a + 1);
    setBubble(giggles[Math.floor(Math.random() * giggles.length)]);
    const newB = Array.from({ length: 5 }).map(() => ({
      id: idRef.current++,
      dx: (Math.random() - 0.5) * 260,
      rot: (Math.random() - 0.5) * 120,
      e: ["😂", "🌹", "✨", "🍯", "😎", "💖"][Math.floor(Math.random() * 6)],
    }));
    setBursts((b) => [...b, ...newB]);
    const ids = newB.map((b) => b.id);
    setTimeout(() => setBursts((b) => b.filter((x) => !ids.includes(x.id))), 950);
  };

  const lore = [
    { e: "😎", t: "The Shades", d: "Pixel sunglasses = permanent 'deal with it' mode. Confidence, even when the code doesn't compile." },
    { e: "⛓️", t: "The Gold Chain", d: "Every bug fixed adds a link. It's getting pretty long now." },
    { e: "😆", t: "The Khilkhila Laugh", d: "Khilkhila means a giggle that won't stop. That's Bhavin when a robot finally works." },
    { e: "🌹", t: "The Gulab Touch", d: "Sweet to everyone, a little extra in syrup. Kind first, clever always." },
  ];

  return (
    <section id="legacy" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-[150px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHead
          eyebrow="The legacy"
          title={
            <>
              Meet the <span className="text-syrup">Khilkhila</span>
              <br />
              <span className="font-serif font-normal italic">Gulab Jamun.</span>
            </>
          }
          sub="Every legend needs a mascot. Bhavin's is a sweet, giggly, sunglasses-wearing gulab jamun — a symbol of his personality: warm, funny, and impossible to forget."
        />

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* interactive plate */}
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-square overflow-visible rounded-[2.5rem] bg-cream shadow-[0_50px_120px_-40px_rgba(255,77,141,0.7)]">
                <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,#fff,#ffe6d6_70%)]" />
                <button
                  onClick={tickle}
                  aria-label="Tickle the gulab jamun"
                  className="absolute inset-6 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-rose"
                >
                  <img
                    key={anim}
                    src="/images/mascot.jpg"
                    alt="Khilkhila Gulab Jamun with pixel sunglasses and gold chain"
                    className={cn("h-full w-full object-contain mix-blend-multiply select-none", anim > 0 ? "animate-giggle" : "")}
                    draggable={false}
                  />
                </button>
                {bursts.map((b) => (
                  <span
                    key={b.id}
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/3 text-3xl animate-pop"
                    style={{ ["--dx" as string]: `${b.dx}px`, ["--rot" as string]: `${b.rot}deg` }}
                  >
                    {b.e}
                  </span>
                ))}
                {bubble && (
                  <div key={anim} className="reveal in absolute -top-5 right-2 rounded-2xl rounded-br-sm bg-night px-4 py-2 font-display text-sm font-bold text-cream shadow-xl sm:-right-6">
                    {bubble}
                  </div>
                )}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-night px-5 py-2.5 font-mono text-xs text-cream ring-1 ring-white/10">
                  <span className="text-rose">♥</span> Giggles: <span className="font-bold text-saffron" aria-live="polite">{count}</span>
                  {count === 0 && <span className="ml-2 text-muted">· tap me!</span>}
                </div>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-2">
                {achievements.map((a) => {
                  const on = unlocked.includes(a);
                  return (
                    <span
                      key={a.label}
                      className={cn(
                        "rounded-md px-3 py-2 font-pixel text-[8px] transition-all duration-500",
                        on ? "bg-saffron text-night pixel-shadow scale-105" : "border border-white/10 text-muted"
                      )}
                    >
                      {on ? "🏆 " : "🔒 "}
                      {a.label}
                    </span>
                  );
                })}
              </div>
              {next && <p className="mt-3 text-center font-mono text-[11px] text-muted">{next.at - count} more giggles to unlock “{next.label}”</p>}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-5 rounded-3xl glass p-5">
                <img src="/images/logo.jpg" alt="Khilkhila Gulab Jamun neon logo" className="h-24 w-24 shrink-0 rounded-full shadow-[0_0_40px_rgba(255,77,141,0.6)] animate-spin-slow [animation-duration:40s]" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-rose-soft">Official emblem</p>
                  <p className="mt-1 font-display text-lg font-bold leading-snug">The neon badge that marks every Bhavin original.</p>
                </div>
              </div>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {lore.map((l, i) => (
                <Reveal key={l.t} delay={i * 90}>
                  <SpotCard className="h-full p-6">
                    <span className="text-3xl">{l.e}</span>
                    <h3 className="mt-3 font-display text-lg font-bold">{l.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{l.d}</p>
                  </SpotCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { q: "Bhavin's robot presentation was the only one where the whole class clapped before he finished. And the robot actually worked!", n: "Computer Science Teacher", r: "School mentor", e: "👩‍🏫" },
  { q: "He explained loops to me using Minecraft redstone. I finally get it. Also he never lets me win.", n: "Best Friend", r: "Co-op squad", e: "🎮" },
  { q: "We said 'no screens after 9'. He said 'it's a robot, not a screen'. Hard to argue — it was a good robot.", n: "Mom & Dad", r: "Chief funding officers", e: "🏠" },
  { q: "Questions were sharp, the build was clean, and the mascot was… unforgettable.", n: "Science Fair Judge", r: "Robotics category", e: "🏅" },
  { q: "Asked me how a compiler works. I'm still recovering. Brilliant kid.", n: "Robotics Club Coach", r: "Weekend workshop", e: "🔧" },
  { q: "hehe.", n: "Khilkhila Gulab Jamun", r: "Official mascot", e: "😎" },
];

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHead
        eyebrow="Kind words"
        title={
          <>
            People say <span className="font-serif font-normal italic text-syrup">nice things.</span>
          </>
        }
        sub="Teachers, teammates, judges — and one notoriously talkative dessert."
      />
      <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.n} delay={(i % 3) * 100} className="mb-5 break-inside-avoid">
            <SpotCard className="p-6">
              <div className="flex gap-0.5 text-saffron" aria-label="5 out of 5 stars">
                {"★★★★★"}
              </div>
              <p className="mt-4 font-serif text-xl leading-snug text-cream/95">“{t.q}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-xl">{t.e}</span>
                <div>
                  <p className="font-display text-sm font-bold">{t.n}</p>
                  <p className="text-xs text-muted">{t.r}</p>
                </div>
              </div>
            </SpotCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  const [mode, setMode] = useState<"sweets" | "fives">("sweets");
  const plans = [
    {
      n: "Player Two",
      p: mode === "sweets" ? "0" : "1",
      u: mode === "sweets" ? "gulab jamuns" : "high-five",
      d: "For friends who want to game, chat tech, or swap ideas.",
      f: ["Minecraft co-op sessions", "Tech talk & tips", "Honest game reviews", "Unlimited memes"],
      cta: "Join the party",
    },
    {
      n: "Project Buddy",
      p: mode === "sweets" ? "1" : "3",
      u: mode === "sweets" ? "gulab jamun" : "high-fives",
      d: "Team up on a school project, presentation or coding challenge.",
      f: ["Slide design that wows", "Python helper scripts", "Brainstorm sessions", "Debugging together", "Bonus giggles"],
      cta: "Start a project",
      hot: true,
    },
    {
      n: "Mega Build",
      p: mode === "sweets" ? "12" : "∞",
      u: mode === "sweets" ? "box of jamuns" : "high-fives",
      d: "Robotics, websites, games — the big, ambitious stuff.",
      f: ["Robot prototype collab", "Website from scratch", "Mini game design", "Demo-day ready", "Official Jamun badge"],
      cta: "Let's build big",
    },
  ];
  return (
    <section id="plans" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          eyebrow="Collab plans"
          title={
            <>
              Team up with <span className="font-serif font-normal italic text-syrup">Bhavin.</span>
            </>
          }
          sub="Transparent pricing. Payment accepted strictly in sweets or high-fives. No hidden syrup fees."
        />
        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <div role="radiogroup" aria-label="Currency" className="relative flex rounded-full glass p-1">
              <span
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-cream transition-transform duration-500 ease-[cubic-bezier(.6,.2,.2,1.3)]",
                  mode === "fives" ? "translate-x-full" : "translate-x-0"
                )}
                aria-hidden
              />
              {(["sweets", "fives"] as const).map((m) => (
                <button
                  key={m}
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  className={cn("relative z-10 w-36 rounded-full py-2 text-sm font-semibold transition-colors", mode === m ? "text-night" : "text-cream/70")}
                >
                  {m === "sweets" ? "🍡 Gulab Jamuns" : "✋ High-fives"}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div
                className={cn(
                  "relative h-full rounded-3xl p-[1px] transition-transform duration-300 hover:-translate-y-1.5",
                  p.hot ? "bg-gradient-to-b from-saffron via-rose to-rose/20" : "bg-white/10"
                )}
              >
                <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-cocoa p-7">
                  {p.hot && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-saffron to-rose px-3 py-1 font-pixel text-[8px] text-night">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold">{p.n}</h3>
                  <p className="mt-1 text-sm text-muted">{p.d}</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span key={p.p} className="reveal in font-display text-5xl font-extrabold">{p.p}</span>
                    <span className="text-sm text-muted">{p.u}</span>
                  </p>
                  <ul className="mt-6 grid gap-3 text-sm">
                    {p.f.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-circuit/15 text-[10px] text-circuit">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={cn(
                      "mt-8 inline-flex justify-center rounded-full py-3 font-display text-sm font-semibold transition-all",
                      p.hot ? "bg-gradient-to-r from-saffron to-rose text-night hover:shadow-[0_10px_40px_-10px_rgba(255,77,141,0.8)]" : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Is Bhavin really 12?", a: "Yep! 12 years old and already juggling Python, a little Java, C, C++, robotics kits and more. Age is just a variable." },
  { q: "What's the Khilkhila Gulab Jamun?", a: "Bhavin's legendary mascot — a giggling gulab jamun with pixel sunglasses and a gold chain. 'Khilkhila' means bursting with laughter, which sums up his vibe." },
  { q: "What was his first robot?", a: "A small car that was supposed to drive straight. It drove in circles. He fixed it. Then he built fifteen more." },
  { q: "Favourite games?", a: "Minecraft (redstone engineer at heart) and GTA V, plus plenty of others. Gaming is research for game making, obviously." },
  { q: "Can he help with my school project?", a: "Check out the 'Project Buddy' plan. Payment: one (1) gulab jamun. Messages go through a parent first." },
  { q: "What's he learning next?", a: "Deeper C++, AI basics, and building a robot that can fetch gulab jamuns autonomously. Priorities." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 py-24 md:py-32">
      <SectionHead eyebrow="FAQ" title={<>Questions? <span className="font-serif font-normal italic text-syrup">Answered.</span></>} />
      <div className="mt-12 grid gap-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 60}>
              <div className={cn("rounded-2xl border transition-colors duration-300", isOpen ? "border-rose/30 bg-white/[0.04]" : "border-white/10 hover:border-white/20")}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-semibold"
                  >
                    {f.q}
                    <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-rose transition-transform duration-300", isOpen && "rotate-45")}>+</span>
                  </button>
                </h3>
                <div id={`faq-${i}`} className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function CTA() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="contact" className="relative px-5 py-24 md:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#3a0f20] via-cocoa to-[#2d1a08] p-8 sm:p-14">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" aria-hidden />
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rose/30 blur-[100px] aurora" aria-hidden />
          <img src="/images/logo.jpg" alt="" aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 hidden h-72 w-72 rounded-full opacity-25 animate-spin-slow [animation-duration:60s] md:block" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-pixel text-[10px] text-saffron">▶ PRESS START</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1] tracking-tight sm:text-6xl">
                Got an idea? <br />
                <span className="font-serif font-normal italic text-syrup">Let's build it.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted">
                Robots, games, websites or a presentation that slaps — drop a message and the Khilkhila crew will giggle back soon.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic href="#projects" variant="ghost">Browse builds</Magnetic>
              </div>
            </div>
            <form onSubmit={submit} className="grid gap-3 rounded-3xl glass p-5 sm:p-6" aria-label="Contact form">
              <label className="grid gap-1.5 text-sm">
                <span className="text-cream/80">Your name</span>
                <input required name="name" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition placeholder:text-muted/60 focus:border-rose/60 focus:ring-4 focus:ring-rose/15" placeholder="Steve from Minecraft" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-cream/80">Email</span>
                <input required type="email" name="email" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition placeholder:text-muted/60 focus:border-rose/60 focus:ring-4 focus:ring-rose/15" placeholder="you@example.com" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-cream/80">What should we build?</span>
                <textarea required name="msg" rows={3} className="resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition placeholder:text-muted/60 focus:border-rose/60 focus:ring-4 focus:ring-rose/15" placeholder="A robot that serves gulab jamuns…" />
              </label>
              <button type="submit" className="mt-2 rounded-full bg-gradient-to-r from-saffron to-rose py-3.5 font-display font-semibold text-night transition hover:shadow-[0_10px_40px_-10px_rgba(255,77,141,0.9)] active:scale-[0.98]">
                {sent ? "Sent! Khi khi khi 😆" : "Send message →"}
              </button>
              <p className="text-center text-[11px] text-muted">🔒 Messages are reviewed by a parent/guardian first.</p>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt="" className="h-11 w-11 rounded-full" />
            <span className="font-display text-xl font-extrabold">
              bhavin<span className="text-rose">.</span>jha
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted">Robotics · Code · Games · Giggles. Crafted with curiosity and a little bit of syrup.</p>
        </div>
        {[
          { h: "Explore", l: [["Skills", "#skills"], ["Projects", "#projects"], ["Legacy", "#legacy"]] },
          { h: "Collab", l: [["Plans", "#plans"], ["FAQ", "#faq"], ["Contact", "#contact"]] },
          { h: "Play", l: [["Minecraft", "#projects"], ["GTA V", "#projects"], ["Jamun Jump", "#projects"]] },
        ].map((c) => (
          <div key={c.h}>
            <p className="font-mono text-[11px] uppercase tracking-widest text-saffron">{c.h}</p>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {c.l.map(([t, h]) => (
                <li key={t}>
                  <a href={h} className="text-cream/70 transition hover:text-cream">{t}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Bhavin Jha. All giggles reserved.</p>
        <p className="font-mono">
          Psst… try the <span className="text-saffron">↑↑↓↓←→←→BA</span> code 🎮
        </p>
      </div>
    </footer>
  );
}
