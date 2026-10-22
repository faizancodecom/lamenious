import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        duration: 0.8,
        ease: 'power4.inOut',
      });
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  const navLinks = ['COLLECTION', 'ATELIER', 'MATERIALS', 'ARCHIVE', 'FLAGSHIPS'];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-500 sm:px-12 lg:px-24 ${
          scrolled ? 'bg-ink/95 backdrop-blur-md py-4 shadow-sm shadow-black/10' : 'bg-transparent'
        }`}
      >
        <a href="#home" className="text-paper font-serif text-2xl tracking-widest z-50">
          EMANS
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-12 text-paper/80 font-sans text-xs tracking-widest uppercase">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-paper transition-colors duration-300 relative group">
              {link}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-paper transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 text-paper md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink translate-y-[-100%]"
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link, i) => (
            <a
              key={link}
              ref={(el) => { linksRef.current[i] = el; }}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="font-serif text-4xl font-light tracking-widest text-paper hover:italic"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
