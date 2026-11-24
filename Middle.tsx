import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, SectionHead, SpotCard, useInView } from "@/components/ui";

const langs = [
  {
    id: "python",
    name: "Python",
    level: 90,
    color: "#ffb547",
    code: [
      ["kw", "def "], ["fn", "drive"], ["p", "(robot, speed=80):"],
      ["nl"], ["p", "    "], ["kw", "while "], ["p", "robot.sensor.distance() > "], ["num", "10"], ["p", ":"],
      ["nl"], ["p", "        robot.motors.forward(speed)"],
      ["nl"], ["p", "    robot.say("], ["str", '"Obstacle! Turning 🤖"'], ["p", ")"],
      ["nl"], ["p", "    robot.turn("], ["num", "90"], ["p", ")"],
    ],
  },
  {
    id: "cpp",
    name: "C / C++",
    level: 62,
    color: "#4fe3c1",
    code: [
      ["kw", "void "], ["fn", "loop"], ["p", "() {"],
      ["nl"], ["p", "  "], ["kw", "int "], ["p", "d = sonar.ping_cm();"],
      ["nl"], ["p", "  "], ["kw", "if "], ["p", "(d < "], ["num", "15"], ["p", ") servo.write("], ["num", "180"], ["p", ");"],
      ["nl"], ["p", "  "], ["kw", "else "], ["p", "servo.write("], ["num", "0"], ["p", ");"],
      ["nl"], ["p", "}"],
    ],
  },
  {
    id: "java",
    name: "Java",
    level: 40,
    color: "#ff4d8d",
    code: [
      ["kw", "public class "], ["fn", "Hello "], ["p", "{"],
      ["nl"], ["p", "  "], ["kw", "public static void "], ["fn", "main"], ["p", "(String[] a) {"],
      ["nl"], ["p", "    System.out.println("], ["str", '"Still learning, already shipping!"'], ["p", ");"],
      ["nl"], ["p", "  }"],
      ["nl"], ["p", "}"],
    ],
  },
  {
    id: "web",
    name: "HTML / CSS",
    level: 78,
    color: "#ff8fb6",
    code: [
      ["p", "<"], ["kw", "section "], ["fn", "class"], ["p", "="], ["str", '"hero glow"'], ["p", ">"],
      ["nl"], ["p", "  <"], ["kw", "h1"], ["p", ">Built by a 12-year-old</"], ["kw", "h1"], ["p", ">"],
      ["nl"], ["p", "  <"], ["kw", "button"], ["p", ">Press for giggles</"], ["kw", "button"], ["p", ">"],
      ["nl"], ["p", "</"], ["kw", "section"], ["p", ">"],
    ],
  },
] as const;

const tone: Record<string, string> = {
  kw: "text-rose-soft",
  fn: "text-saffron",
  str: "text-circuit",
  num: "text-[#9db7ff]",
  p: "text-cream/85",
};

function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-muted">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8 bg-white/10">
        <div
          className="h-full rounded-full transition-[width] duration-[1400ms] ease-out"
          style={{ width: inView ? `${value}%` : "0%", background: `linear-gradient(90deg, ${color}, #ff4d8d)` }}
        />
      </div>
    </div>
  );
}

export function Features() {
  const [active, setActive] = useState(0);
  const lang = langs[active];
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHead
        eyebrow="Skill tree"
        title={
          <>
            One kid. <span className="font-serif font-normal italic text-syrup">Many</span> superpowers.
          </>
        }
        sub="From soldering servos to designing slides that make teachers say 'wow' — here's the toolkit Bhavin levels up every single day."
      />

      <div className="mt-16 grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
        {/* Code switcher */}
        <Reveal className="md:col-span-4 md:row-span-2">
          <SpotCard className="h-full p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-circuit">// languages</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Speaks fluent code</h3>
              </div>
              <div role="tablist" aria-label="Programming languages" className="flex flex-wrap gap-1 rounded-full bg-black/30 p-1">
                {langs.map((l, i) => (
                  <button
                    key={l.id}
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                      i === active ? "bg-cream text-night" : "text-cream/60 hover:text-cream"
                    )}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0608]">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                <span className="font-mono text-[11px] text-muted">
                  bhavin/{lang.id === "web" ? "index.html" : lang.id === "python" ? "robot.py" : lang.id === "cpp" ? "sonar.ino" : "Hello.java"}
                </span>
                <span className="font-mono text-[11px]" style={{ color: lang.color }}>
                  ● {lang.level}% mastery
                </span>
              </div>
              <pre key={lang.id} className="reveal in min-h-[170px] overflow-x-auto p-5 font-mono text-[13px] leading-7">
                <code>
                  {lang.code.map((t, i) =>
                    t[0] === "nl" ? <br key={i} /> : (
                      <span key={i} className={tone[t[0]]}>
                        {t[1]}
                      </span>
                    )
                  )}
                </code>
              </pre>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {langs.map((l) => (
                <SkillBar key={l.id} label={l.name} value={l.level} color={l.color} />
              ))}
            </div>
          </SpotCard>
        </Reveal>

        <Reveal delay={100} className="md:col-span-2">
          <SpotCard className="h-full p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-circuit/15 text-2xl">🤖</div>
            <h3 className="mt-5 font-display text-xl font-bold">Robotics</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Sensors, motors, Arduino brains. Line-followers, obstacle-dodgers & bots that wave back.
            </p>
            <svg viewBox="0 0 200 40" className="mt-5 w-full text-circuit/60" aria-hidden>
              <path d="M0 20 H40 L50 5 L60 35 L70 20 H110 L118 10 L126 30 L134 20 H200" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </SpotCard>
        </Reveal>

        <Reveal delay={180} className="md:col-span-2">
          <SpotCard className="h-full p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron/15 text-2xl">🎮</div>
            <h3 className="mt-5 font-display text-xl font-bold">Game making</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Plays Minecraft & GTA V like a pro — then goes home and builds his own games, levels and mods.
            </p>
            <div className="mt-5 flex gap-1" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={cn("h-3 w-3", i < 8 ? "bg-rose" : "bg-white/10")} style={{ clipPath: "polygon(50% 100%, 0 35%, 25% 0, 50% 20%, 75% 0, 100% 35%)" }} />
              ))}
            </div>
          </SpotCard>
        </Reveal>

        {[
          { e: "🌐", t: "Website building", d: "Clean layouts, smooth hovers, and pages that actually load fast.", c: "bg-rose/15" },
          { e: "🎤", t: "Presentations", d: "Slides with story, animation and punchlines. No boring bullet walls.", c: "bg-[#9db7ff]/15" },
          { e: "🧠", t: "Problem solving", d: "Breaks big scary problems into tiny, debuggable pieces.", c: "bg-circuit/15" },
        ].map((f, i) => (
          <Reveal key={f.t} delay={100 + i * 80} className="md:col-span-2">
            <SpotCard className="h-full p-6">
              <div className={cn("grid h-12 w-12 place-items-center rounded-2xl text-2xl", f.c)}>{f.e}</div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
            </SpotCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type Cat = "All" | "Robotics" | "Games" | "Web" | "Slides";
const projects: { t: string; c: Exclude<Cat, "All">; d: string; tags: string[]; grad: string; icon: string; stat: string }[] = [
  { t: "Obstacle-Dodger Bot", c: "Robotics", d: "Ultrasonic eyes + servo neck. Sees a wall, says 'nope', turns politely.", tags: ["Arduino", "C++", "Sensors"], grad: "from-circuit/40 to-[#0d3b33]", icon: "🛞", stat: "0 crashes*" },
  { t: "Line-Follower Racer", c: "Robotics", d: "IR sensors tracking a black line at full speed. Tuned like an F1 car.", tags: ["IR", "PID-ish", "Motors"], grad: "from-saffron/40 to-[#3b2408]", icon: "🏁", stat: "Lap: 7.2s" },
  { t: "Smart Waving Hand", c: "Robotics", d: "A robotic hand that waves when someone walks by. Instant friend.", tags: ["Servos", "PIR", "Python"], grad: "from-rose/40 to-[#3b0b1d]", icon: "🖐️", stat: "5 fingers" },
  { t: "Jamun Jump", c: "Games", d: "A platformer starring a certain giggling sweet. Dodge spoons, collect syrup.", tags: ["Python", "Pygame"], grad: "from-rose/50 to-saffron/20", icon: "🍡", stat: "12 levels" },
  { t: "Minecraft Redstone City", c: "Games", d: "Automatic doors, hidden bases, working elevators — engineering in blocks.", tags: ["Redstone", "Logic"], grad: "from-[#5fbf4a]/40 to-[#13300d]", icon: "⛏️", stat: "4k blocks" },
  { t: "Quiz Blaster", c: "Games", d: "A rapid-fire terminal quiz game with streaks, timers and a leaderboard.", tags: ["Python", "CLI"], grad: "from-[#9db7ff]/40 to-[#121a3b]", icon: "❓", stat: "100+ Qs" },
  { t: "This very website", c: "Web", d: "You're looking at it. Animations, glass, and one sunglasses-wearing mascot.", tags: ["React", "Tailwind"], grad: "from-saffron/30 to-rose/30", icon: "✨", stat: "Meta!" },
  { t: "Class Science Hub", c: "Web", d: "A mini site with notes, experiments and quizzes for classmates.", tags: ["HTML", "CSS", "JS"], grad: "from-circuit/30 to-[#9db7ff]/20", icon: "🔬", stat: "30 users" },
  { t: "Solar System Deck", c: "Slides", d: "A presentation with planets zooming in — the class actually stayed awake.", tags: ["Animations", "Storytelling"], grad: "from-[#9db7ff]/40 to-night", icon: "🪐", stat: "A+ grade" },
];
const cats: Cat[] = ["All", "Robotics", "Games", "Web", "Slides"];

export function Showcase() {
  const [cat, setCat] = useState<Cat>("All");
  const list = projects.filter((p) => cat === "All" || p.c === cat);
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[400px] max-w-3xl rounded-full bg-rose/10 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            center={false}
            eyebrow="Project showcase"
            title={
              <>
                Built, broken, <br />
                <span className="font-serif font-normal italic text-syrup">rebuilt better.</span>
              </>
            }
          />
          <Reveal delay={200}>
            <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                    cat === c ? "border-transparent bg-gradient-to-r from-saffron to-rose text-night" : "border-white/10 text-cream/70 hover:border-white/30 hover:text-cream"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={cat + p.t} delay={i * 70}>
              <SpotCard className="group h-full overflow-hidden">
                <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br", p.grad)}>
                  <div className="absolute inset-0 grid-bg opacity-60" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
                    {p.icon}
                  </span>
                  <span className="absolute left-4 top-4 rounded-full bg-night/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
                    {p.c}
                  </span>
                  <span className="absolute right-4 top-4 font-pixel text-[8px] text-cream/90">{p.stat}</span>
                </div>
                <div className="p-6">
                  <h3 className="flex items-center justify-between font-display text-xl font-bold">
                    {p.t}
                    <span className="text-rose opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">↗</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-cream/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-muted">*crashes during testing not included</p>
      </div>
    </section>
  );
}

export function Benefits() {
  const items = [
    { n: "01", t: "Curious by default", d: "Asks 'how does it work?' then opens it up to find out. (Mostly puts it back together.)" },
    { n: "02", t: "Learns at warp speed", d: "Python to C++ to Java — picks up new tools like new Minecraft recipes." },
    { n: "03", t: "Team player", d: "Robotics clubs, group projects, multiplayer raids — better together." },
    { n: "04", t: "Ships, not just dreams", d: "Ideas become prototypes in days. Done beats perfect, then perfect follows." },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <SectionHead
            center={false}
            eyebrow="Why it matters"
            title={
              <>
                Not just a hobby. <span className="font-serif font-normal italic text-syrup">A habit</span> of building.
              </>
            }
            sub="Every project teaches something new — patience from robots, logic from code, creativity from games, and confidence from presenting."
          />
          <Reveal delay={240}>
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-cream p-6">
              <div className="flex items-center gap-5">
                <img src="/images/mascot.jpg" alt="Khilkhila Gulab Jamun mascot wearing pixel sunglasses" className="h-28 w-28 shrink-0 object-contain mix-blend-multiply animate-float" />
                <blockquote className="font-serif text-2xl italic leading-snug text-night">
                  "Stay sweet, stay curious, and never stop giggling."
                  <footer className="mt-2 font-mono text-[11px] not-italic uppercase tracking-widest text-rose">— the Gulab Jamun code</footer>
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
        <ol className="grid gap-4">
          {items.map((it, i) => (
            <Reveal as="li" key={it.n} delay={i * 100}>
              <div className="group flex gap-5 rounded-3xl border border-white/5 p-6 transition-all duration-300 hover:border-rose/30 hover:bg-white/[0.03]">
                <span className="font-pixel text-xs text-saffron transition-transform group-hover:scale-125">{it.n}</span>
                <div>
                  <h3 className="font-display text-xl font-bold">{it.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
