import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Craftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  const image1ContainerRef = useRef<HTMLDivElement>(null);
  const image2ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text fade up
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );

      // Image 1 Reveal
      gsap.fromTo(
        image1ContainerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: image1ContainerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Image 2 Reveal
      gsap.fromTo(
        image2ContainerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: image2ContainerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Image 1 parallax
      gsap.to(image1Ref.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Image 2 parallax (moves in opposite direction slightly)
      gsap.to(image2Ref.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="atelier" ref={containerRef} className="relative bg-paper py-32 text-ink sm:py-48 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          
          {/* Left: Text & Small Image */}
          <div className="w-full md:w-[38.2%] flex flex-col">
            <div ref={textRef}>
              <h2 className="font-serif text-5xl font-light tracking-tighter sm:text-6xl mb-8">
                THE <br/><span className="italic">CRAFT</span>
              </h2>
              <p className="font-sans text-sm tracking-widest uppercase text-ink/60 leading-relaxed mb-12">
                Every stitch is a testament to our dedication. We source only the finest Egyptian cotton, woven in century-old mills, ensuring a drape that feels as architectural as it does organic.
              </p>
            </div>
            
            <div ref={image1ContainerRef} className="relative h-[40vh] w-full overflow-hidden mt-8">
              <img
                ref={image1Ref}
                src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=2670&auto=format&fit=crop"
                alt="Fabric Detail"
                className="absolute inset-0 h-[130%] w-full object-cover grayscale opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Large Image */}
          <div ref={image2ContainerRef} className="w-full md:w-[61.8%] relative h-[70vh] md:h-[90vh] overflow-hidden">
            <img
              ref={image2Ref}
              src="https://images.unsplash.com/photo-1594938298596-03ef94f92288?q=80&w=2680&auto=format&fit=crop"
              alt="Tailoring Process"
              className="absolute inset-0 h-[130%] w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
