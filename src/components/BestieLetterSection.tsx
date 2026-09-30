import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Sparkles, Trophy, Droplets, Smile } from 'lucide-react';
import { sounds } from '../utils/sound';
import { triggerGrandFinaleConfetti } from '../utils/confetti';

interface BestieLetterSectionProps {
  unlocked: boolean;
  onTriggerEmojiShower: () => void;
  interactionsNeeded: number;
}

export const BestieLetterSection: React.FC<BestieLetterSectionProps> = ({
  unlocked,
  onTriggerEmojiShower,
  interactionsNeeded,
}) => {
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);

  const handleLastSurprise = () => {
    sounds.playFanfare();
    triggerGrandFinaleConfetti();
    onTriggerEmojiShower();
    setSurpriseRevealed(true);
  };

  if (!unlocked) {
    return (
      <div className="w-full rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 text-center relative overflow-hidden backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-2">
          <Lock className="w-5 h-5" />
        </div>
        <p className="text-slate-400 font-display font-semibold text-sm">
          🔒 Secret Bestie Message Locked
        </p>
        <p className="text-slate-500 text-xs mt-1">
          Interact with {interactionsNeeded} more mood buttons above to decrypt the final surprise!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="w-full rounded-3xl bg-gradient-to-b from-rose-950/40 via-purple-950/40 to-slate-950/80 border-2 border-rose-500/40 p-6 shadow-2xl relative overflow-hidden"
    >
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            💌
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white tracking-wide">
              BESTIE MESSAGE
            </h3>
            <span className="text-[11px] text-rose-300 font-mono">
              Direct from the heart
            </span>
          </div>
        </div>
        <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full font-medium">
          Unlocked ✨
        </span>
      </div>

      {/* Heartfelt Note */}
      <div className="p-5 rounded-2xl bg-black/40 border border-rose-500/20 relative backdrop-blur-md">
        <Heart className="absolute -top-3 -right-2 w-8 h-8 text-rose-400/40 fill-rose-500/20" />

        <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
          "Whatever kind of day you're having, you don't have to force yourself to be happy. Take it easy, drink some water, rest, and remember that someone is always cheering for you. ❤️"
        </p>

        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-3">
          <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="text-xs text-slate-300 italic">
            Reminder: Hydrate, breathe, and cut yourself some slack today.
          </p>
        </div>

        <p className="mt-4 text-amber-300 font-display font-semibold text-sm sm:text-base">
          Okay enough emotional stuff... now go smile 😂
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-5">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLastSurprise}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-display font-bold text-lg sm:text-xl shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 cursor-pointer select-none"
        >
          <Sparkles className="w-6 h-6 text-amber-200 animate-spin" style={{ animationDuration: '3s' }} />
          <span>😂 One Last Surprise</span>
          <Smile className="w-6 h-6 text-yellow-200" />
        </motion.button>
      </div>

      {/* Unfurled Final Award */}
      <AnimatePresence>
        {surpriseRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-center"
          >
            <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-bounce" />
            <h4 className="font-display font-bold text-base text-amber-300">
              MISSION ACCOMPLISHED: BESTIE IS SMILING! 🎉
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              You are certified 100% loved, appreciated, and irreplaceable. Now go conquer the day! 🫶✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
