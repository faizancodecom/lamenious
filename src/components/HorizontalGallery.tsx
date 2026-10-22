import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2576&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=2525&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2574&auto=format&fit=crop"
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const containersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Add a skew effect based on scroll velocity
          const velocity = self.getVelocity();
          const skewAmount = Math.max(Math.min(velocity / 100, 5), -5);
          gsap.to(containersRef.current, {
            skewX: skewAmount,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
          });

          // Dynamic background shift based on velocity
          const intensity = Math.min(Math.abs(velocity) / 2000, 1);
          gsap.to(sectionRef.current, {
            backgroundColor: intensity > 0.5 ? '#000000' : '#d6d3d1', // Stone to Ink
            color: intensity > 0.5 ? '#f5f5f4' : '#0a0a0a', // Paper to Ink
            duration: 0.3,
            overwrite: "auto"
          });
        }
      });

      // Background text moves opposite to the scroll
      gsap.to(bgTextRef.current, {
        x: () => window.innerWidth * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Animate images scaling and colorizing as they move through the center of the screen
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img, 
          { scale: 1.4, filter: 'grayscale(100%) brightness(0.7)' },
          {
            scale: 1,
            filter: 'grayscale(0%) brightness(1)',
            ease: "power2.out",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "left center+=20%",
              end: "right center-=20%",
              containerAnimation: tween,
              scrub: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="archive" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-stone text-ink">
      
      {/* Massive Background Text */}
      <div className="absolute inset-0 z-0 flex items-center overflow-hidden pointer-events-none opacity-5">
        <h2 ref={bgTextRef} className="font-serif text-[30vw] leading-none font-light tracking-tighter whitespace-nowrap -ml-[50vw]">
          THE ARCHIVE <span className="italic">COLLECTION</span>
        </h2>
      </div>

      <div className="absolute top-12 left-6 z-20 sm:left-12 lg:left-24">
        <h2 className="font-serif text-4xl font-light tracking-tighter sm:text-5xl md:text-6xl mix-blend-difference text-paper">
          THE <span className="italic">ARCHIVE</span>
        </h2>
      </div>

      <div ref={wrapperRef} className="flex h-full w-max items-center px-6 sm:px-12 lg:px-24 pt-20 z-10 relative">
        {images.map((src, index) => (
          <div 
            key={index} 
            ref={(el) => { containersRef.current[index] = el; }}
            className="relative h-[65vh] w-[85vw] shrink-0 pr-12 sm:w-[61.8vw] md:w-[45vw] lg:w-[38.2vw] will-change-transform"
          >
            <div className="h-full w-full overflow-hidden bg-ink shadow-2xl">
              <img
                ref={(el) => { imagesRef.current[index] = el; }}
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="h-full w-full object-cover origin-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-6 flex justify-between font-sans text-[10px] tracking-[0.3em] uppercase text-ink/80">
              <span>0{index + 1}</span>
              <span>SS / 26</span>
            </div>
          </div>
        ))}
        {/* Extra space at the end */}
        <div className="w-[20vw] shrink-0" />
      </div>
    </section>
  );
}
