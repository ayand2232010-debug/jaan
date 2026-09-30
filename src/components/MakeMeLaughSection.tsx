import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Laugh, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

const LAUGH_MESSAGES = [
  "Breaking News: Bestie ka mood abhi loading... 7% 😂",
  "Doctor ne kaha: 1 dose bakchodi immediately required 🤣",
  "System Error: Sadness.exe is not responding 💀",
  "Your smile has been requested by the government 😭😂",
  "Swiggy cart me biryani daal kar price dekhne ke baad rona cancel kar diya 🍛😂",
  "NASA walo ne confirm kiya hai: tumhari smile missing hone se galaxy me light cut ho gaya hai 🔭✨",
  "Agar 5 minute me mood theek nahi hua toh tumhari purani cringe photos group pe leak kar dunga 📸💀",
  "Rule 404: Sadness is strictly prohibited in this friendship jurisdiction 🚨🙅‍♀️",
  "Life is too short to be sad, waise bhi kal phir se uth ke sabka drama jhelna hai 💅😂",
  "Overthinking ka electricity bill itna aayega ki kidney bechni pad jayegi, chill karo! 💡🤣",
  "Ek plate golgappe aur do cup chai: Emergency mood recovery parcel is dispatched 🥟☕",
  "Aise udas mat baitho, lag raha hai phone ka internet pack khatam ho gaya ho 🛜😭",
  "Duniya me sabse mehengi cheez: Bestie ki smile. Toh chup-chaap daant dikhao! 🦷✨",
  "Tumhara mood theek karne ke liye Ambani ka job offer reject kiya hai maine 😂💼",
  "Alert: Excessive serious face detected. Initiating emergency tickle satellite 🛰️😆",
];

interface MakeMeLaughSectionProps {
  onInteract: () => void;
}

export const MakeMeLaughSection: React.FC<MakeMeLaughSectionProps> = ({ onInteract }) => {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [lastIndex, setLastIndex] = useState<number>(-1);
  const [count, setCount] = useState<number>(0);

  const handleMakeMeLaugh = () => {
    sounds.playPop();
    onInteract();

    // Pick random message different from last
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * LAUGH_MESSAGES.length);
    } while (nextIndex === lastIndex && LAUGH_MESSAGES.length > 1);

    setLastIndex(nextIndex);
    setCurrentMessage(LAUGH_MESSAGES[nextIndex]);
    setCount((prev) => prev + 1);

    if (Math.random() > 0.4) {
      triggerConfetti({ particleCount: 30, spread: 50 });
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-pink-500/20 p-5 shadow-lg relative overflow-hidden">
      {/* Decorative ambient aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
            01
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-pink-300">
            Dose of Bakchodi
          </span>
        </div>
        {count > 0 && (
          <span className="text-[11px] font-mono text-slate-400">
            Doses taken: <strong className="text-pink-300">{count}</strong>
          </span>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleMakeMeLaugh}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-display font-semibold text-lg sm:text-xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-3 transition-transform cursor-pointer"
      >
        <Laugh className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
        <span>😂 Make Me Laugh</span>
        <Sparkles className="w-5 h-5 text-amber-200" />
      </motion.button>

      {/* Message Display Area */}
      <AnimatePresence mode="wait">
        {currentMessage && (
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mt-4 p-4 rounded-xl bg-pink-950/30 border border-pink-500/30 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl select-none">💬</span>
              <div className="flex-1">
                <p className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed">
                  "{currentMessage}"
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-pink-500/20">
                  <span className="text-[11px] text-pink-400 font-mono">
                    ✦ Mood medicine delivered
                  </span>
                  <button
                    onClick={handleMakeMeLaugh}
                    className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Next Joke</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
