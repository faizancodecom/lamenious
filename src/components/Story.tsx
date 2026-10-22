import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Background image parallax and fade
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.1, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 0.4, filter: 'blur(0px)', duration: 2, ease: 'power2.out' },
        0
      );

      // Vertical line growing
      tl.fromTo(
        lineRef.current,
        { height: '0%' },
        { height: '100%', duration: 2, ease: 'none' },
        0
      );

      // Rotating badge
      gsap.to(badgeRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Words reveal with blur, y-shift, and 3D rotation
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 60, filter: 'blur(12px)', rotationX: -60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            rotationX: 0,
            scale: 1,
            stagger: 0.04,
            duration: 1.5,
            ease: 'power3.out',
          },
          0.2
        );
      }

      // Spotlight effect
      gsap.to(bgImageRef.current, {
        clipPath: 'circle(40% at 50% 50%)',
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

  const text = "A shirt is not merely a garment. It is the foundation of identity, the architecture of confidence, and the silent language of personal expression.";
  
  // Words to italicize for editorial flair
  const italicWords = ['garment.', 'identity,', 'confidence,', 'expression.'];

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-ink overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <img 
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop" 
          alt="Editorial Fashion" 
          className="w-full h-full object-cover opacity-0 grayscale mix-blend-luminosity"
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink" />
      </div>

      {/* Vertical Line Indicator */}
      <div className="absolute left-6 md:left-16 top-0 bottom-0 w-[1px] bg-paper/5 z-10">
        <div ref={lineRef} className="w-full bg-paper/40 origin-top" />
      </div>

      {/* Small Label */}
      <div className="absolute left-10 md:left-24 top-32 z-10 hidden sm:block">
        <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-paper/50 rotate-90 origin-left translate-y-full">
          Chapter 01 &mdash; The Origin
        </p>
      </div>

      {/* Rotating Circular Badge */}
      <div className="absolute right-8 md:right-16 bottom-16 z-10 hidden md:flex items-center justify-center opacity-60 mix-blend-difference">
        <div ref={badgeRef} className="relative w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text className="font-sans text-[9.5px] tracking-[0.25em] uppercase fill-paper">
              <textPath href="#circlePath" startOffset="0%">
                EMANS PARIS • EST 2026 • EMANS PARIS • EST 2026 •
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Main Text */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-8 sm:px-16 md:px-32" style={{ perspective: '1200px' }}>
        <p ref={textRef} className="font-serif text-4xl leading-[1.15] font-light text-paper sm:text-5xl md:text-6xl lg:text-[5.5rem] mix-blend-difference">
          {text.split(' ').map((word, index) => {
            const isItalic = italicWords.includes(word);
            return (
              <span 
                key={index} 
                className={`word inline-block mr-[0.22em] will-change-transform ${isItalic ? 'italic text-paper/70 font-normal' : ''}`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
