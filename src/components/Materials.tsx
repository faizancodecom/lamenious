import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    title: 'Egyptian Cotton',
    desc: 'Woven from the finest extra-long staple fibers for unparalleled softness and durability.',
    img: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'Mother of Pearl',
    desc: 'Each button is carved from authentic Trochus shells, providing a subtle, natural iridescence.',
    img: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2525&auto=format&fit=crop',
  },
  {
    title: 'Silk Thread',
    desc: 'Stitched with high-tensile silk thread, ensuring seams that flex and endure.',
    img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2638&auto=format&fit=crop',
  },
];

export default function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="materials" className="bg-paper text-ink py-24 md:py-32 px-6 sm:px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 md:w-[61.8%]">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-6">
            The Raw Elements
          </h2>
          <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl">
            True luxury begins at the source. We scour the globe for materials that meet our exacting standards, refusing to compromise on the tactile experience of our garments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {materials.map((mat, i) => (
            <div 
              key={i} 
              ref={(el) => (cardsRef.current[i] = el)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <img 
                  src={mat.img} 
                  alt={mat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-serif text-2xl mb-3">{mat.title}</h3>
              <p className="font-light opacity-70 leading-relaxed">{mat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
