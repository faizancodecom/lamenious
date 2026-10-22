import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Image scale down, blur out, and fade in
      tl.fromTo(
        imageRef.current,
        { scale: 1.4, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 0.8, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out', clearProps: 'filter' }
      )
      // Letters stagger in with 3D-like rotation, scale, and fade
      .fromTo(
        lettersRef.current,
        { y: 150, opacity: 0, rotateX: -90, scale: 0.5, transformPerspective: 1000 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          scale: 1, 
          duration: 1.8, 
          stagger: 0.1, 
          ease: 'back.out(1.2)' 
        },
        '-=2'
      )
      // Subtitle fade in with letter spacing expansion
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, letterSpacing: '0em' },
        { opacity: 1, y: 0, letterSpacing: '0.2em', duration: 1.5, ease: 'power2.out' },
        '>0.2'
      );

      // Continuous subtle floating animation for the title
      gsap.to(titleRef.current, {
        y: -15,
        rotation: 0.5,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Animation: Scroll-Reactive Tilt
      gsap.to(titleRef.current, {
        rotateX: 15,
        skewX: 5,
        scale: 0.9,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Character glitch effect on scroll
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*@";
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.progress > 0.1 && self.progress < 0.9) {
            lettersRef.current.forEach((el, i) => {
              if (el && Math.random() > 0.9) {
                const original = titleText[i];
                el.innerText = chars[Math.floor(Math.random() * chars.length)];
                setTimeout(() => { el.innerText = original; }, 100);
              }
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "EMANS";

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=2574&auto=format&fit=crop"
          alt="Hero Fashion"
          className="h-[120%] w-full object-cover object-center opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/90" />
        <div ref={overlayRef} className="absolute inset-0 bg-ink opacity-0" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Centered Massive Title */}
        <div className="flex flex-1 items-center justify-center px-4 mix-blend-difference">
          <div className="overflow-visible">
            <h1 ref={titleRef} className="flex font-serif text-[24vw] leading-none font-light tracking-tighter text-paper sm:text-[18vw]">
              {titleText.split('').map((char, i) => (
                <span 
                  key={i} 
                  ref={(el) => { lettersRef.current[i] = el; }}
                  className="inline-block origin-bottom"
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>
        
        {/* Subtitle & Scroll Indicator */}
        <div className="flex w-full flex-col items-center justify-end pb-12 px-4 h-32">
          <p ref={subtitleRef} className="max-w-lg text-center font-sans text-[10px] tracking-[0.2em] text-paper/80 uppercase leading-relaxed mb-8">
            Redefining the modern silhouette through<br />meticulous tailoring and uncompromising quality.
          </p>
          <div className="flex flex-col items-center gap-2 opacity-50">
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-paper to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
