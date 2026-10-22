import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [flavor, setFlavor] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = target.closest('button, a, .group, .clickable');
      
      if (isSelectable) {
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: 'white',
          mixBlendMode: 'difference',
          duration: 0.3,
        });
        setFlavor('EXPLORE');
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          mixBlendMode: 'normal',
          duration: 0.3,
        });
        setFlavor('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/50 md:flex"
    >
      <span className="font-sans text-[3px] tracking-[0.2em] text-ink opacity-0 transition-opacity duration-300">
        {flavor}
      </span>
    </div>
  );
}
