import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current?.querySelectorAll('.char');
      
      if (chars) {
        gsap.fromTo(chars, 
          { 
            opacity: 0, 
            y: 50, 
            rotateX: -45, 
            filter: 'blur(10px)' 
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            stagger: 0.05,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Parallax for the background accent
      gsap.to('.manifesto-accent', {
        yPercent: -20,
        rotate: 5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "WE BELIEVE IN THE POWER OF SILENCE. IN THE BEAUTY OF THE SINGULAR. IN THE ARCHITECTURE OF A SEAM. EMANS IS NOT A TREND; IT IS A TESTAMENT TO THE ENDURING.";

  return (
    <section ref={containerRef} className="relative min-h-screen bg-ink py-48 flex items-center justify-center overflow-hidden">
      {/* Background Accent */}
      <div className="manifesto-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border-paper/5 border-2 rounded-full pointer-events-none select-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 ref={textRef} className="font-serif text-3xl sm:text-5xl md:text-7xl leading-[1.1] tracking-tighter text-paper">
          {text.split('').map((char, i) => (
            <span key={i} className="char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </h2>
        
        <div className="mt-24 flex items-center justify-center gap-8">
          <div className="h-px w-24 bg-paper/20" />
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-paper/40">Our Manifesto</span>
          <div className="h-px w-24 bg-paper/20" />
        </div>
      </div>
    </section>
  );
}
