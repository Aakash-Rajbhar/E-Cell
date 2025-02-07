import { useEffect, useRef, useState } from 'react';
import { motion, spring } from 'framer-motion';

const MagneticComponent = ({ containerRef, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef?.current) return; // Ensure ref exists

    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const strength = 0.09;

      if (distance < 1000) {
        setPosition({
          x: position.x + deltaX * strength,
          y: position.y + deltaY * strength,
        });
      }
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position, containerRef]);

  return (
    <motion.div
      ref={ref}
      className="w-64 h-64 -z-90 bg-yellow-500/50 rounded-full items-center absolute top-[10%] left-[10%] translate-x[-10%] translate-y-[-10%] justify-center text-white font-bold cursor-pointer blur-[100px] hidden md:flex"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s easeOut',
        type: 'spring',
      }}
    ></motion.div>
  );
};

export default MagneticComponent;
