import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', title: 'IDEATION', desc: 'The architectural blueprint of a silhouette.' },
  { id: '02', title: 'SOURCING', desc: 'Identifying rare fibers from ethical origins.' },
  { id: '03', title: 'CONSTRUCTION', desc: '120 hours of manual craftsmanship per piece.' },
  { id: '04', title: 'REFINEMENT', desc: 'Iterative fitting until absolute perfection.' },
];

export default function TheProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the container and move steps vertically
      gsap.to(stepsBoxRef.current, {
        yPercent: -75, // Moves from 0 to -75% to show all 4 steps (25% each)
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-paper overflow-hidden flex items-center">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        
        <div className="relative">
          <h2 className="font-serif text-6xl md:text-9xl text-ink leading-none tracking-tighter">
            THE <br />
            <span className="italic">PROCESS</span>
          </h2>
          <div className="mt-12 w-24 h-[1px] bg-ink/20" />
        </div>

        <div className="relative h-[200px] overflow-hidden">
          <div ref={stepsBoxRef} className="flex flex-col">
            {steps.map((step, i) => (
              <div key={i} className="h-[200px] flex flex-col justify-center">
                <span className="font-mono text-[10px] text-ink/30 mb-4">{step.id} ———</span>
                <h3 className="font-serif text-4xl text-ink mb-4">{step.title}</h3>
                <p className="font-sans text-xs tracking-widest text-ink/60 uppercase max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Background large numbers */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none">
        <span className="font-serif text-[100vh] leading-none text-ink select-none">GENESIS</span>
      </div>
    </section>
  );
}
