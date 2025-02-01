import { useEffect, useRef, useState } from 'react';

const MagneticComponent = () => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const strength = 0.08; // Magnetic effect strength

      if (distance < 800) {
        setPosition({
          x: position.x + deltaX * strength,
          y: position.y + deltaY * strength,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position]);

  return (
    <div
      ref={ref}
      className="w-40 h-40 -z-20 bg-teal-500 rounded-full flex items-center absolute top-[50%] left-[50%] translate-x[-50%] translate-y-[-50%] justify-center text-white font-bold cursor-pointer"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      Move Me
    </div>
  );
};

export default MagneticComponent;
