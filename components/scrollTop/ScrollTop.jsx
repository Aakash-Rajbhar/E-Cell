'use client';

import { useState, useEffect, useRef } from 'react';

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsVisible(heroBottom < 0); // Show when hero is out of view
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 500; // Adjust this value to control the magnetic effect range

      if (distance < maxDistance) {
        const translateX = (deltaX / maxDistance) * 30; // Adjust the multiplier for sensitivity
        const translateY = (deltaY / maxDistance) * 30;

        button.style.transform = `translate(${translateX}px, ${translateY}px)`;
      } else {
        button.style.transform = 'translate(0, 0)';
      }
    };

    const handleMouseLeave = () => {
      if (button) {
        button.style.transform = 'translate(0, 0)';
      }
    };

    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={`${isVisible ? 'block' : 'hidden'} fixed right-4 bottom-4`}>
      <button
        ref={buttonRef}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center justify-center w-16 h-16 p-4 bg-yellow-400 text-neutral-900 rounded-full shadow-lg focus:outline-none group transition-transform hover:scale-110  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 transition-transform duration-300 ease-in-out group-hover:-translate-y-2 "
          fill="none "
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollTop;
