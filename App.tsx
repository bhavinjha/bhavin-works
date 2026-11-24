import { useEffect, useRef, useState } from "react";
import { Hero, Navbar, SocialProof } from "@/sections/Top";
import { Benefits, Features, Showcase } from "@/sections/Middle";
import { CTA, FAQ, Footer, Legacy, Pricing, Testimonials } from "@/sections/Bottom";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      if (ref.current) ref.current.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.12),transparent_60%)] md:block"
    />
  );
}

function JamunRain({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <img
          key={i}
          src="/images/logo.jpg"
          alt=""
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-80px",
            width: `${28 + Math.random() * 40}px`,
            animation: `fall ${2 + Math.random() * 2}s ${Math.random() * 1.2}s linear forwards`,
          }}
        />
      ))}
      <style>{`@keyframes fall{to{transform:translateY(115vh) rotate(720deg)}}`}</style>
      <div className="absolute left-1/2 top-24 -translate-x-1/2 rounded-full bg-cream px-6 py-3 font-pixel text-[10px] text-night shadow-2xl">
        🏆 SECRET UNLOCKED: JAMUN RAIN
      </div>
    </div>
  );
}

export default function App() {
  const [rain, setRain] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let seq: string[] = [];
    const key = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join(",").toLowerCase() === KONAMI.join(",").toLowerCase()) {
        setRain(true);
        setTimeout(() => setRain(false), 4500);
      }
    };
    const scroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("keydown", key);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-night">
        Skip to content
      </a>
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <SocialProof />
        <Features />
        <Showcase />
        <Benefits />
        <Legacy />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <JamunRain show={rain} />
      <a
        href="#top"
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full glass text-lg transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        ↑
      </a>
    </>
  );
}
