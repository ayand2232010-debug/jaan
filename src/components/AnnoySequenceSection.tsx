import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull, RotateCcw, Flame } from 'lucide-react';
import { sounds } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

interface AnnoySequenceSectionProps {
  onInteract: () => void;
}

const ANNOY_STEPS = [
  { text: 'Okay.', sub: 'So you have chosen violence today...', emoji: '😐' },
  { text: 'Are you sure?', sub: 'There is still time to turn back...', emoji: '🤨' },
  { text: 'Really?', sub: 'Website engineers worked hard on this you know...', emoji: '🙄' },
  { text: 'Last chance...', sub: 'Do not test my patience bestie!', emoji: '😤' },
  { text: 'Fine 😭', sub: 'I cannot stop you anyway...', emoji: '😭' },
];

export const AnnoySequenceSection: React.FC<AnnoySequenceSectionProps> = ({ onInteract }) => {
  const [step, setStep] = useState(0); // 0 = not started, 1 to 5 = steps, 6 = annoyed climax

  const handleNextStep = () => {
    onInteract();

    if (step < 5) {
      const next = step + 1;
      setStep(next);
      if (next === 5) {
        sounds.playBuzzer();
      } else {
        sounds.playBoing();
      }
    } else {
      // Step 6: Final annoyed state
      setStep(6);
      sounds.playFanfare();
      triggerConfetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setStep(0);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-orange-500/20 p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            05
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-orange-300">
            Patience Test
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-orange-400">
          <Flame className="w-3.5 h-3.5" />
          <span>Stage {step}/6</span>
        </div>
      </div>

      {step === 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleNextStep}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-display font-semibold text-lg sm:text-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 transition-transform cursor-pointer"
        >
          <span>😈 Annoy Me</span>
        </motion.button>
      )}

      {step > 0 && step <= 5 && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-500/30 text-center">
            <span className="text-4xl block mb-2">{ANNOY_STEPS[step - 1].emoji}</span>
            <p className="text-orange-200 font-display font-bold text-xl">
              "{ANNOY_STEPS[step - 1].text}"
            </p>
            <p className="text-slate-300 text-xs mt-1">
              {ANNOY_STEPS[step - 1].sub}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextStep}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-display font-semibold text-base shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Click to Annoy Further 👉</span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-xl bg-gradient-to-br from-red-950/60 to-orange-950/60 border border-red-500/40 text-center space-y-3"
          >
            <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto text-2xl">
              <Skull className="w-8 h-8 text-red-400 animate-pulse" />
            </div>

            <p className="text-white font-display font-extrabold text-lg sm:text-xl leading-tight">
              YOU HAVE SUCCESSFULLY ANNOYED THE WEBSITE 😂
            </p>

            <p className="text-slate-300 text-xs sm:text-sm">
              The website admits complete defeat against your stubborn bestie powers. Well played! 🏆💀
            </p>

            <button
              onClick={handleReset}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
              <span>Annoy again? 🔄</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
