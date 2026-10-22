import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrubText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLSpanElement>(null);
  const textRightRef = useRef<HTMLSpanElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        }
      });

      tl.to(textLeftRef.current, { xPercent: -100, color: '#f5f5f4', ease: 'none' }, 0)
        .to(textRightRef.current, { xPercent: 100, color: '#f5f5f4', ease: 'none' }, 0)
        .fromTo(bgImageRef.current, 
          { scale: 1.2, filter: 'blur(20px)', opacity: 0 },
          { scale: 1, filter: 'blur(0px)', opacity: 0.6, ease: 'power2.out' }, 
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-ink flex items-center justify-center">
      {/* Background Reveal */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2670&auto=format&fit=crop" 
          alt="Atmospheric"
          className="h-full w-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 flex text-[10vw] font-serif tracking-tighter leading-none text-paper whitespace-nowrap overflow-visible">
        <span ref={textLeftRef} className="inline-block transition-opacity duration-300">MODERN&nbsp;</span>
        <span ref={textRightRef} className="inline-block transition-opacity duration-300">SARTORIAL</span>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="h-24 w-px bg-paper/20 mb-4" />
        <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-paper/40">Continuum</span>
      </div>
    </section>
  );
}
