import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DepthScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const fg2Ref = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background moves slower (further away)
      gsap.to(bgRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Foreground 1 moves faster (closer)
      gsap.to(fgRef.current, {
        yPercent: -30,
        xPercent: -10,
        rotation: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Foreground 2 moves even faster (closest)
      gsap.to(fg2Ref.current, {
        yPercent: -50,
        xPercent: 10,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text moves at a different speed
      gsap.to(textRef.current, {
        yPercent: -40,
        skewX: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Atmosphere thinning effect
      gsap.to('.depth-overlay', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full overflow-hidden bg-stone">
      {/* Atmosphere Overlay */}
      <div className="depth-overlay absolute inset-0 z-[15] bg-paper opacity-30 pointer-events-none" />

      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
          alt="Texture Background"
          className="h-[120%] w-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Text Layer */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="font-serif text-6xl font-light tracking-tighter text-paper sm:text-8xl md:text-[12rem] leading-[0.85] mix-blend-difference">
          FORM & <br /> <span className="italic">FUNCTION</span>
        </h2>
      </div>

      {/* Foreground Layer 1 - 38.2% width (Golden Ratio) */}
      <div className="absolute bottom-[-10%] left-[-5%] z-20 h-[80vh] w-[80%] md:w-[50%] lg:w-[38.2%]">
        <img
          ref={fgRef}
          src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=2525&auto=format&fit=crop"
          alt="Shirt Detail Foreground"
          className="h-[130%] w-full object-cover object-left-top shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Foreground Layer 2 - 61.8% width (Golden Ratio) */}
      <div className="absolute bottom-[-20%] right-[-5%] z-30 h-[90vh] w-[70%] md:w-[45%] lg:w-[61.8%]">
        <img
          ref={fg2Ref}
          src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2670&auto=format&fit=crop"
          alt="Shirt Detail Foreground 2"
          className="h-[130%] w-full object-cover object-right-top shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
