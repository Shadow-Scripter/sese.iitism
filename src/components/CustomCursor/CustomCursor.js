'use client';
import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  if (!isClient) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '55px',
        height: '55px',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${position.x - 27.5}px, ${position.y - 27.5}px)`,
        backgroundImage: "url('/logo_nobg.png')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 15px rgba(74, 222, 128, 1)) drop-shadow(0 0 25px rgba(74, 222, 128, 0.8))'
      }}
    />
  );
}
