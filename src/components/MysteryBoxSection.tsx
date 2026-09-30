import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, RefreshCw, Award, BellRing, Zap } from 'lucide-react';
import { sounds } from '../utils/sound';
import { triggerConfetti, triggerPrideConfetti } from '../utils/confetti';

interface MysteryBoxSectionProps {
  onInteract: () => void;
  onTriggerShake: () => void;
  onTriggerEmojiBlast: () => void;
}

interface SurpriseResult {
  type: 'compliment' | 'explosion' | 'confetti' | 'shake' | 'funny' | 'system';
  badge: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SURPRISES: SurpriseResult[] = [
  {
    type: 'compliment',
    badge: '🏆 TROPHY UNLOCKED',
    icon: <Award className="w-5 h-5 text-amber-400" />,
    title: 'Achievement Unlocked: You survived another dramatic day 🏆😂',
    description: 'You handle life’s chaos like an absolute rockstar. Keep shining!',
  },
  {
    type: 'compliment',
    badge: '✨ OFFICIAL CERTIFICATE',
    icon: <Sparkles className="w-5 h-5 text-pink-400" />,
    title: 'Congratulations! You are officially 100% awesome.',
    description: 'This is a legally binding statement verified by the Bestie High Council.',
  },
  {
    type: 'compliment',
    badge: '⚠️ RADAR WARNING',
    icon: <Zap className="w-5 h-5 text-rose-400" />,
    title: 'Warning: Excessive cuteness detected ⚠️😂',
    description: 'Please reduce cuteness levels by 20% to prevent neighborhood overload.',
  },
  {
    type: 'explosion',
    badge: '💥 EMOJI BLITZ',
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    title: 'BOOM! 💥 Incoming Emoji Air-Drop!',
    description: 'A direct missile of hugs, laughs and chaotic energy just hit your screen.',
  },
  {
    type: 'confetti',
    badge: '🎉 PARTY PROTOCOL',
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    title: 'RAINBOW CELEBRATION UNLEASHED 🌈',
    description: 'Even on a grey day, here is a shower of bright colors specially for you!',
  },
  {
    type: 'shake',
    badge: '🫨 RUMBLE MODE',
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    title: 'WHOA! Screen Shake Triggered 🫨😂',
    description: 'That mystery box had so much power it shook the entire website foundation!',
  },
  {
    type: 'funny',
    badge: '🕵️‍♀️ CURIOSITY CAUGHT',
    icon: <Gift className="w-5 h-5 text-indigo-400" />,
    title: 'Mujhe pata tha tum mystery button zaroor dabaogi! 😂',
    description: 'Bestie radar never fails. Secrets explore karne ka shauk bachpan se hai na?',
  },
  {
    type: 'system',
    badge: '🚨 FAKE NOTIFICATION',
    icon: <BellRing className="w-5 h-5 text-cyan-400" />,
    title: 'ALERT: Main Character Energy Detected ✨',
    description: 'You are reminded that you are the protagonist of this life. Side characters can wait.',
  },
];

export const MysteryBoxSection: React.FC<MysteryBoxSectionProps> = ({
  onInteract,
  onTriggerShake,
  onTriggerEmojiBlast,
}) => {
  const [surprise, setSurprise] = useState<SurpriseResult | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [lastIndex, setLastIndex] = useState(-1);

  const handleOpenMystery = () => {
    setIsOpening(true);
    sounds.playPop();
    onInteract();

    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * SURPRISES.length);
    } while (nextIndex === lastIndex && SURPRISES.length > 1);

    setLastIndex(nextIndex);
    const chosen = SURPRISES[nextIndex];

    setTimeout(() => {
      setSurprise(chosen);
      setIsOpening(false);

      if (chosen.type === 'explosion') {
        sounds.playFanfare();
        onTriggerEmojiBlast();
      } else if (chosen.type === 'confetti') {
        sounds.playSuccess();
        triggerPrideConfetti();
      } else if (chosen.type === 'shake') {
        sounds.playBoing();
        onTriggerShake();
      } else {
        sounds.playDing();
        triggerConfetti({ particleCount: 35, spread: 55 });
      }
    }, 450);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-purple-500/20 p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            04
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-purple-300">
            Random Wonders
          </span>
        </div>
        <span className="text-[11px] font-mono text-purple-400/80">
          6+ Wild Surprises
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleOpenMystery}
        disabled={isOpening}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-display font-semibold text-lg sm:text-xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-3 transition-transform cursor-pointer"
      >
        <Gift className={`w-6 h-6 text-white ${isOpening ? 'animate-bounce' : ''}`} />
        <span>{isOpening ? 'Unboxing Magic...' : '🎁 Mystery Button'}</span>
        <Sparkles className="w-5 h-5 text-amber-200" />
      </motion.button>

      <AnimatePresence mode="wait">
        {surprise && !isOpening && (
          <motion.div
            key={surprise.title}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-semibold text-purple-300">
              {surprise.icon}
              <span>{surprise.badge}</span>
            </div>
            <p className="text-slate-100 font-display font-bold text-sm sm:text-base leading-snug">
              {surprise.title}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              {surprise.description}
            </p>

            <div className="mt-3 pt-2 border-t border-purple-500/20 flex justify-end">
              <button
                onClick={handleOpenMystery}
                className="inline-flex items-center gap-1 text-xs text-fuchsia-300 hover:text-fuchsia-200 font-medium cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Pull Mystery Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
