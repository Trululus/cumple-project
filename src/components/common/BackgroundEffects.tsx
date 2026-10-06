import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateStaticStars = () => {
  return Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    x: (i * 37 + 13) % 100,
    y: (i * 53 + 7) % 100,
    size: (i % 3) + 1.2,
    duration: (i % 3) + 2.5,
    delay: (i % 4) * 0.5,
    opacity: 0.4 + (i % 5) * 0.12,
  }));
};

export const BackgroundEffects: React.FC = () => {
  const [stars] = useState(generateStaticStars);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0b0914]">
      {/* Dynamic Ambient Glowing Festive Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 25, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="ambient-glow-gold -top-20 -left-20 w-[360px] h-[360px] md:w-[620px] md:h-[620px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="ambient-glow-purple top-1/3 -right-20 w-[320px] h-[320px] md:w-[580px] md:h-[580px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 15, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="ambient-glow-pink -bottom-20 left-1/4 w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
      />

      {/* Subtle Starry Night Particles */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-100 animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(251, 191, 36, 0.85)`,
          }}
        />
      ))}

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
