import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidFilter from './LiquidFilter';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedShirt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Liquid Filter Animation (Velocity/Scroll based)
      const filter = document.querySelector('#liquid feDisplacementMap');
      
      gsap.to(filter, {
        attr: { scale: 100 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Long pin for dramatic effect
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Image slit expands to full width
      tl.fromTo(imageContainerRef.current, 
        { clipPath: 'polygon(48% 0%, 52% 0%, 52% 100%, 48% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 2, ease: 'power4.inOut' },
        0
      );

      // 2. Image scales down slightly as it reveals
      tl.fromTo(imageRef.current,
        { scale: 1.6, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.inOut' },
        0
      );

      // 3. Massive text slides in from sides (parallax)
      tl.fromTo(leftTextRef.current,
        { xPercent: -50, opacity: 0, filter: 'blur(10px)' },
        { xPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' },
        0.5
      );
      
      tl.fromTo(rightTextRef.current,
        { xPercent: 50, opacity: 0, filter: 'blur(10px)' },
        { xPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' },
        0.5
      );

      // 4. Image scales up massively, text fades out, specs fade in
      tl.to(imageContainerRef.current, {
        scale: 1.05,
        duration: 2,
        ease: 'power2.inOut'
      }, 2.5);

      tl.to([leftTextRef.current, rightTextRef.current], {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.9,
        duration: 1.5,
      }, 2.5);

      // 5. Specs reveal with a growing line
      tl.fromTo(lineRef.current, {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut'
      }, 3);

      tl.fromTo(specsRef.current?.children || [], {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out'
      }, 3.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-ink text-paper flex items-center justify-center">
      <LiquidFilter />
      
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-0 overflow-hidden pointer-events-none">
        <h2 ref={leftTextRef} className="font-serif text-[18vw] leading-[0.75] font-light tracking-tighter whitespace-nowrap -ml-[10vw] text-paper/90">
          THE <span className="italic text-paper/50">SIGNATURE</span>
        </h2>
        <h2 ref={rightTextRef} className="font-serif text-[18vw] leading-[0.75] font-light tracking-tighter whitespace-nowrap ml-[10vw] mt-4 text-paper/90">
          OXFORD <span className="italic text-paper/50">WEAVE</span>
        </h2>
      </div>

      {/* Center Image Reveal */}
      <div 
        ref={imageContainerRef} 
        className="relative z-10 w-full max-w-[28rem] md:max-w-4xl h-[60vh] md:h-[80vh] shadow-2xl overflow-hidden will-change-transform"
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2525&auto=format&fit=crop"
          alt="Signature Shirt"
          className="h-full w-full object-cover object-center"
          style={{ filter: 'url(#liquid)' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/10 mix-blend-overlay" />
        {/* Inner border for premium feel */}
        <div className="absolute inset-4 border border-paper/20 pointer-events-none" />
      </div>

      {/* Specs Overlay */}
      <div className="absolute bottom-8 md:bottom-16 left-0 right-0 z-20 flex flex-col items-center px-6">
        <div ref={lineRef} className="w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-paper/50 to-transparent mb-8 origin-center" />
        
        <div ref={specsRef} className="grid grid-cols-3 gap-4 md:gap-24 text-center w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-paper/50 mb-3">Fabric</span>
            <span className="font-serif text-lg md:text-3xl font-light">100% Cotton</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-paper/50 mb-3">Origin</span>
            <span className="font-serif text-lg md:text-3xl font-light italic">Milan, Italy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-paper/50 mb-3">Weight</span>
            <span className="font-serif text-lg md:text-3xl font-light">180 GSM</span>
          </div>
        </div>
      </div>

    </section>
  );
}
