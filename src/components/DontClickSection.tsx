import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface DontClickSectionProps {
  onInteract: () => void;
}

export const DontClickSection: React.FC<DontClickSectionProps> = ({ onInteract }) => {
  const [clickCount, setClickCount] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const getReaction = () => {
    switch (clickCount) {
      case 1:
        return {
          title: "I TOLD YOU DON'T CLICK IT 😭😂",
          sub: 'Ab dobara mat dabana... 👀',
        };
      case 2:
        return {
          title: 'Oye! Sunte nahi ho kya?! 🚨😂',
          sub: 'Button ab bhaagne laga hai... pakad ke dikhao! 🏃💨',
        };
      case 3:
        return {
          title: 'Curiosity ne billi ko maara tha, par bestie ho toh maaf kiya 🐱👀',
          sub: 'Ab bas bhi karo, button ki feelings hurt ho rahi hain 🥺',
        };
      case 4:
        return {
          title: 'Self-destruct sequence in 3... 2... bas mazaak tha yaar 💥😂',
          sub: 'Itna stubbornness kahan se laate ho? Guinness World Record confirm 🥇',
        };
      default:
        return {
          title: 'Fine! Click karte raho. Lekin smile karke click karna padega! Deal? 🤝😂',
          sub: 'You have officially unlocked the "Ziddi Bestie of the Year" trophy 🏆',
        };
    }
  };

  const handleClick = () => {
    sounds.playBoing();
    onInteract();

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    // Generate random playful offset within container bounds
    const maxOffset = 50;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * 30;
    const randomRot = (Math.random() - 0.5) * 16;

    setOffset({ x: randomX, y: randomY });
    setRotation(randomRot);
  };

  const reaction = clickCount > 0 ? getReaction() : null;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            02
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
            Reverse Psychology
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400/80">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Restricted Zone</span>
        </div>
      </div>

      <div className="py-2 flex justify-center items-center relative min-h-[72px]">
        <motion.button
          animate={{
            x: offset.x,
            y: offset.y,
            rotate: rotation,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 18 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-rose-600 text-white font-display font-semibold text-lg sm:text-xl shadow-lg shadow-red-600/25 flex items-center justify-center gap-3 transition-colors cursor-pointer select-none border border-red-400/30"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-200 animate-pulse" />
          <span>😤 Don't Click This</span>
          {clickCount > 0 && <span className="text-xs bg-red-950/60 px-2 py-0.5 rounded-full font-mono">x{clickCount}</span>}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {reaction && (
          <motion.div
            key={clickCount}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            className="mt-4 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center backdrop-blur-sm"
          >
            <p className="text-amber-200 font-display font-semibold text-base sm:text-lg">
              {reaction.title}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 font-medium">
              {reaction.sub}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
