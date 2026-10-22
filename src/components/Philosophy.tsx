import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerLeftRef = useRef<HTMLDivElement>(null);
  const tickerRightRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Tickers
      gsap.to(tickerLeftRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(tickerRightRef.current, {
        xPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Staggered image reveals
      imagesRef.current.forEach((img, index) => {
        if (!img) return;
        gsap.fromTo(img, 
          { clipPath: 'inset(100% 0% 0% 0%)', y: 50 },
          { 
            clipPath: 'inset(0% 0% 0% 0%)', 
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-paper py-32 sm:py-64 overflow-hidden">
      {/* Background Tickers */}
      <div className="absolute inset-0 flex flex-col justify-center gap-12 pointer-events-none opacity-[0.03]">
        <div ref={tickerLeftRef} className="whitespace-nowrap font-serif text-[20vw] leading-none text-ink flex">
          <span>TIMELESS QUALITY — ETHICAL CRAFT — RADICAL HONESTY —&nbsp;</span>
          <span>TIMELESS QUALITY — ETHICAL CRAFT — RADICAL HONESTY —&nbsp;</span>
        </div>
        <div ref={tickerRightRef} className="whitespace-nowrap font-serif text-[20vw] leading-none text-ink flex -translate-x-1/2">
          <span>AUTHENTIC EXPRESSION — UNCOMPROMISED DESIGN —&nbsp;</span>
          <span>AUTHENTIC EXPRESSION — UNCOMPROMISED DESIGN —&nbsp;</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Main Text Content */}
          <div className="md:col-span-6 relative z-10">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-ink mb-12">
              THE ART OF <br />
              <span className="italic">RESTRAINT.</span>
            </h2>
            <p className="font-sans text-lg text-ink/60 max-w-md leading-relaxed">
              We believe in the power of the singular. In a world of fleeting trends, we find beauty in the enduring. Each stitch is a deliberate choice, each fabric a legacy of its own.
            </p>
            <div className="mt-12 flex items-center gap-6 group cursor-pointer">
              <div className="h-px w-12 bg-ink transition-all duration-500 group-hover:w-24" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-ink">Read our manifesto</span>
            </div>
          </div>

          {/* Staggered Images Grid */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <div 
              ref={(el) => { imagesRef.current[0] = el; }}
              className="aspect-[3/4] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1598554747436-c929a7566161?q=80&w=2574&auto=format&fit=crop" 
                alt="Craft detail"
                className="h-full w-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div 
              ref={(el) => { imagesRef.current[1] = el; }}
              className="aspect-[3/4] overflow-hidden translate-y-12"
            >
              <img 
                src="https://images.unsplash.com/photo-1618355286151-1551cbef7546?q=80&w=2574&auto=format&fit=crop" 
                alt="Fabric texture"
                className="h-full w-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
