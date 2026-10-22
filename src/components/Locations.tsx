import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { 
    city: 'PARIS', 
    address: 'Rue Saint-Honoré, 75001',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop'
  },
  { 
    city: 'TOKYO', 
    address: 'Omotesando, Minato City',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop'
  },
  { 
    city: 'NEW YORK', 
    address: 'SoHo, Manhattan 10012',
    img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop'
  },
  { 
    city: 'LONDON', 
    address: 'Mayfair, W1K 2AL',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop'
  },
];

export default function Locations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 100, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      // Subtle parallax for each location background
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const bg = bgRefs.current[index];
        
        gsap.to(bg, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="flagships" ref={containerRef} className="relative bg-ink py-32 text-paper sm:py-48 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="mb-24 flex flex-col justify-between border-b border-paper/10 pb-12 md:flex-row md:items-end">
          <div className="w-full md:w-[61.8%]">
            <h2 className="font-serif text-6xl font-light tracking-tighter sm:text-8xl md:text-9xl">
              FLAGSHIPS
            </h2>
          </div>
          <div className="w-full md:w-[38.2%] flex md:justify-end">
            <p className="mt-8 font-sans text-[10px] tracking-[0.3em] uppercase text-paper/40 leading-relaxed md:mt-0 md:text-right">
              Immersive spaces designed <br /> for personal discovery.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc, index) => (
            <li 
              key={index} 
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group relative cursor-pointer overflow-hidden aspect-[4/5] bg-stone/50"
            >
              {/* Background Image with Hover Reveal */}
              <div 
                ref={(el) => { bgRefs.current[index] = el; }}
                className="absolute inset-0 z-0 h-[120%] w-full"
              >
                <img 
                  src={loc.img} 
                  alt={loc.city}
                  className="h-full w-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-60 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-3xl font-light tracking-tight sm:text-4xl">
                  {loc.city}
                </h3>
                <div className="h-px w-0 bg-paper/30 transition-all duration-500 group-hover:w-full mt-4" />
                <p className="mt-4 font-sans text-[10px] tracking-[0.2em] text-paper/40 uppercase">
                  {loc.address}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative Large Background Label */}
      <div className="absolute bottom-10 right-0 pointer-events-none select-none opacity-[0.02]">
        <span className="font-serif text-[30vw] leading-none text-paper whitespace-nowrap">EXTERIOR</span>
      </div>
    </section>
  );
}
