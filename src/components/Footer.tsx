import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, letterSpacing: '-0.05em' },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.05em',
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative bg-ink pt-32 pb-12 text-paper overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="mb-24 flex flex-col items-start justify-between md:flex-row md:items-end">
          <div className="w-full md:w-[38.2%] flex md:justify-start mb-12 md:mb-0">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-paper/60 max-w-xs leading-relaxed">
              The architecture of confidence. <br/>Designed in Paris, tailored for the world.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 border-t border-paper/10 pt-12 md:grid-cols-3">
          <div>
            <h4 className="mb-6 font-sans text-[10px] tracking-[0.2em] uppercase text-paper/40">Contact</h4>
            <ul className="space-y-2 font-serif text-xl font-light">
              <li><a href="#" className="hover:italic transition-all duration-300">info@emans.com</a></li>
              <li><a href="#" className="hover:italic transition-all duration-300">+33 1 23 45 67 89</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-sans text-[10px] tracking-[0.2em] uppercase text-paper/40">Social</h4>
            <ul className="space-y-2 font-serif text-xl font-light">
              <li><a href="#" className="hover:italic transition-all duration-300">Instagram</a></li>
              <li><a href="#" className="hover:italic transition-all duration-300">Pinterest</a></li>
              <li><a href="#" className="hover:italic transition-all duration-300">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-sans text-[10px] tracking-[0.2em] uppercase text-paper/40">Newsletter</h4>
            <form className="flex border-b border-paper/20 pb-2 group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent font-serif text-xl font-light outline-none placeholder:text-paper/30 transition-all duration-300 focus:placeholder:text-paper/10"
              />
              <button type="submit" className="font-sans text-[10px] tracking-[0.2em] uppercase text-paper/60 hover:text-paper transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between border-t border-paper/10 pt-8 font-sans text-[10px] tracking-[0.2em] uppercase text-paper/40 sm:flex-row">
          <p>© 2026 EMANS. ALL RIGHTS RESERVED.</p>
          <div className="mt-4 flex space-x-8 sm:mt-0">
            <a href="#" className="hover:text-paper transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-paper transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Massive Bottom Text */}
      <div className="w-full overflow-hidden flex justify-center mt-24 pointer-events-none select-none">
        <h2 ref={titleRef} className="font-serif text-[28vw] leading-[0.75] font-light tracking-tighter text-paper/5">
          EMANS
        </h2>
      </div>
    </footer>
  );
}
