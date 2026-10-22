import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Silhouette() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();
      
      gsap.set(path, { 
        strokeDasharray: pathLength, 
        strokeDashoffset: pathLength 
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
        }
      });

      // Background fade for section
      gsap.to(containerRef.current, {
        backgroundColor: '#0a0a0a',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-stone transition-colors duration-1000 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 400 600" 
          className="h-[80%] w-auto opacity-20"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        >
          <path 
            ref={pathRef}
            d="M200,50 L250,150 L350,200 L300,300 L330,550 L200,500 L70,550 L100,300 L50,200 L150,150 Z" 
            className="text-paper"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6">
        <h2 className="font-serif text-[12vw] leading-none tracking-tighter text-paper mix-blend-difference mb-8">
          PURE <br /> <span className="italic">FORM.</span>
        </h2>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-paper/40 max-w-sm mx-auto">
          The structural anatomy of a masterpiece. <br /> Every line is intentional.
        </p>
      </div>
    </section>
  );
}
