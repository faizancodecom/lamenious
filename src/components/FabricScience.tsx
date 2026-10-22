import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dataPoints = [
  { label: 'E-01', text: 'Tension Resistance', top: '20%', left: '15%' },
  { label: 'S-04', text: 'Fiber Breatheability', top: '60%', left: '80%' },
  { label: 'M-09', text: 'Atomic Softness', top: '35%', left: '70%' },
  { label: 'D-12', text: 'Architecture of Drape', top: '80%', left: '25%' },
];

export default function FabricScience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale and blur transition
      gsap.fromTo(imageRef.current,
        { scale: 1.2, filter: 'grayscale(100%)' },
        { 
          scale: 1, 
          filter: 'grayscale(0%)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          }
        }
      );

      // Parallax labels
      labelsRef.current.forEach((label, i) => {
        if (!label) return;
        gsap.to(label, {
          y: (i + 1) * -50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
        
        // Appear with stagger
        gsap.fromTo(label,
          { opacity: 0, scale: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-ink py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="relative aspect-video w-full overflow-hidden rounded-sm">
          <div ref={imageRef} className="h-full w-full">
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop" 
              alt="Microscopic Fabric"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-ink/30" />

          {/* Floating Data Points */}
          {dataPoints.map((point, i) => (
            <div 
              key={i}
              ref={(el) => { labelsRef.current[i] = el; }}
              className="absolute z-10 flex flex-col pointer-events-none"
              style={{ top: point.top, left: point.left }}
            >
              <span className="font-mono text-[8px] text-paper/40 mb-1">{point.label}</span>
              <div className="h-[1px] w-8 bg-paper/20 mb-2" />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-paper">{point.text}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-12">
          <h2 className="font-serif text-5xl md:text-7xl text-paper max-w-lg leading-tight">
            THE <span className="italic">MICROSCOPIC</span> STANDARD.
          </h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-paper/40 text-right leading-relaxed">
            Data-driven design meets <br /> ancestral expertise.
          </p>
        </div>
      </div>
    </section>
  );
}
