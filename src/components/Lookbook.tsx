import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2576&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620012253295-c159f60abce9?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=2634&auto=format&fit=crop"
];

export default function Lookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = imagesRef.current;

      // Initial state for all images
      gsap.set(imgs, { 
        opacity: 0, 
        scale: 0.85, 
        rotation: -4, 
        yPercent: 20,
        filter: 'blur(10px)',
        transformOrigin: 'center center'
      });
      
      // First image is visible immediately
      gsap.set(imgs[0], { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        yPercent: 0,
        filter: 'blur(0px)',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Increased scroll distance for smoother transitions
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      imgs.forEach((img, i) => {
        if (i > 0) {
          // The crossfade transition
          // Previous image leaves (moves up, fades out, zooms in slightly, rotates right slightly, blurs)
          tl.to(imgs[i - 1], {
            yPercent: -20,
            opacity: 0,
            scale: 1.15,
            rotation: 4,
            filter: 'blur(10px)',
            duration: 1,
            ease: 'sine.inOut'
          }, i);

          // Current image enters (moves from bottom to center, fades in, zooms to 1, rotates to 0, unblurs)
          tl.to(img, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'sine.inOut'
          }, i);
        }
      });
      
      // Subtle parallax on the text while pinned
      gsap.to(textRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="collection" ref={containerRef} className="relative h-screen w-full bg-paper text-ink overflow-hidden flex items-center">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-24">
        
        {/* Text Section - 38.2% of width (Golden Ratio) */}
        <div ref={textRef} className="w-full md:w-[38.2%] flex flex-col justify-center z-20 pt-24 md:pt-0">
          <h2 className="font-serif text-6xl font-light tracking-tighter sm:text-7xl md:text-[7.5rem] leading-[0.85]">
            THE <br /> <span className="italic">ATELIER</span>
          </h2>
          <div className="mt-10 h-px w-16 bg-ink/20" />
          <p className="mt-10 max-w-sm font-sans text-xs tracking-widest uppercase text-ink/60 leading-relaxed">
            Crafted with precision. Worn with intention. Discover the silhouettes that define the season.
          </p>
        </div>

        {/* Images Section - 61.8% of width (Golden Ratio) */}
        <div className="relative w-full md:w-[61.8%] h-[50vh] md:h-[75vh] mt-12 md:mt-0 flex items-center justify-center pl-0 md:pl-12">
          {images.map((src, index) => (
            <div 
              key={index}
              ref={(el) => { imagesRef.current[index] = el; }}
              className="absolute w-full h-full overflow-hidden shadow-2xl will-change-transform"
            >
              <img
                src={src}
                alt={`Lookbook ${index + 1}`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ink/5" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
