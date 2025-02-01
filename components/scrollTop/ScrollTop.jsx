'use client';

import { useState } from 'react';

const ScrollTop = () => {
  // button appears when user scrolls down
  // and when user clicks on the button
  // window scrolls to top with smooth animation

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener('scroll', toggleVisibility);

  return (
    <div
      className={` ${
        isVisible ? 'block' : 'hidden'
      } fixed right-4 bottom-4 p-4 bg-yellow-400 text-neutral-900 rounded-full shadow-lg focus:outline-none`}
    >
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed flex items-center justify-center w-14 h-14 right-4 bottom-4 p-4 bg-yellow-400 text-neutral-900 rounded-full shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
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
