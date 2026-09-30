import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DownloadCloud, CheckCircle2, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

interface SmileUpdateSectionProps {
  onInteract: () => void;
}

export const SmileUpdateSection: React.FC<SmileUpdateSectionProps> = ({ onInteract }) => {
  const [status, setStatus] = useState<'idle' | 'installing' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('');

  const runInstallation = () => {
    if (status === 'installing') return;

    setStatus('installing');
    setProgress(0);
    sounds.playPop();
    onInteract();

    const stages = [
      { text: 'Calculating happiness...', progress: 24, delay: 650 },
      { text: 'Searching for bakchodi...', progress: 54, delay: 1400 },
      { text: 'Installing smile update...', progress: 78, delay: 2200 },
      { text: '99%... (Please hold your cute face steady)', progress: 99, delay: 3000 },
      { text: '✨ SMILE UPDATE INSTALLED SUCCESSFULLY 😂', progress: 100, delay: 3800 },
    ];

    setStageText(stages[0].text);
    setProgress(stages[0].progress);

    stages.slice(1).forEach((stage, idx) => {
      setTimeout(() => {
        setStageText(stage.text);
        setProgress(stage.progress);
        if (stage.progress === 100) {
          setStatus('completed');
          sounds.playSuccess();
          triggerConfetti({ particleCount: 75, spread: 70 });
        } else {
          sounds.playDing();
        }
      }, stage.delay);
    });
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            03
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300">
            System Upgrade
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
          <DownloadCloud className="w-3.5 h-3.5" />
          <span>v4.20 Smile OS</span>
        </div>
      </div>

      {status === 'idle' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={runInstallation}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-display font-semibold text-lg sm:text-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-3 transition-transform cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-cyan-200" />
          <span>🫵 Press For Surprise</span>
        </motion.button>
      )}

      {status === 'installing' && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center">
          <div className="flex items-center justify-center gap-2 text-cyan-300 font-display font-semibold text-base mb-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>{stageText}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-cyan-500/20 mt-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs font-mono text-cyan-400/80">
            <span>Updating core neurotransmitters</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {status === 'completed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/40 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <p className="text-emerald-300 font-display font-bold text-base sm:text-lg">
            ✨ SMILE UPDATE INSTALLED SUCCESSFULLY 😂
          </p>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 font-medium">
            Warranty active: Valid for all kinds of dramatic moods forever ❤️
          </p>

          <button
            onClick={runInstallation}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-run Update Protocol</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
