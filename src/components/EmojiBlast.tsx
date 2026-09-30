import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface FloatingParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
  rotate: number;
  duration: number;
}

interface EmojiBlastProps {
  triggerKey: number;
  emojis?: string[];
  count?: number;
  isFullScreenShower?: boolean;
}

export const EmojiBlast: React.FC<EmojiBlastProps> = ({
  triggerKey,
  emojis = ['😂', '❤️', '✨', '🫶', '😭', '🤣', '🎉', '💖', '🍿', '🔥'],
  count = 28,
  isFullScreenShower = false,
}) => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    if (triggerKey === 0) return;

    const newParticles: FloatingParticle[] = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      if (isFullScreenShower) {
        // Shower falling from top of screen down
        const startX = Math.random() * w;
        const startY = -40 - Math.random() * 150;
        const endX = startX + (Math.random() - 0.5) * 160;
        const endY = h + 60 + Math.random() * 100;
        newParticles.push({
          id: Date.now() + i + Math.random(),
          emoji,
          x: startX,
          y: startY,
          targetX: endX,
          targetY: endY,
          scale: 1 + Math.random() * 1.4,
          rotate: (Math.random() - 0.5) * 360,
          duration: 1.8 + Math.random() * 1.4,
        });
      } else {
        // Burst out from center
        const centerX = w / 2;
        const centerY = h / 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = 140 + Math.random() * (Math.min(w, h) * 0.45);
        newParticles.push({
          id: Date.now() + i + Math.random(),
          emoji,
          x: centerX + (Math.random() - 0.5) * 40,
          y: centerY + (Math.random() - 0.5) * 40,
          targetX: centerX + Math.cos(angle) * distance,
          targetY: centerY + Math.sin(angle) * distance,
          scale: 0.9 + Math.random() * 1.5,
          rotate: (Math.random() - 0.5) * 720,
          duration: 1.2 + Math.random() * 0.9,
        });
      }
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 3500);

    return () => clearTimeout(timer);
  }, [triggerKey, count, emojis, isFullScreenShower]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              scale: 0.4,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              scale: p.scale,
              opacity: [1, 1, 0.9, 0],
              rotate: p.rotate,
            }}
            transition={{
              duration: p.duration,
              ease: isFullScreenShower ? 'linear' : [0.18, 0.89, 0.32, 1.28],
            }}
            className="absolute text-3xl select-none"
            style={{
              left: 0,
              top: 0,
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
