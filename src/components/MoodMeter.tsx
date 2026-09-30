import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';

interface MoodMeterProps {
  level: number;
}

export const MoodMeter: React.FC<MoodMeterProps> = ({ level }) => {
  const clamped = Math.min(100, Math.max(0, level));

  const getStatus = () => {
    if (clamped >= 100) {
      return {
        label: 'MOOD LEVEL: LEGENDARY 🔥😂',
        emoji: '🔥',
        desc: 'Maximum Bakchodi & Happiness Achieved!',
        color: 'from-amber-400 via-pink-500 to-rose-500',
        textColor: 'text-amber-300',
        borderColor: 'border-amber-400/40',
        glow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]',
      };
    }
    if (clamped >= 80) {
      return {
        label: 'MOOD: ALMOST UNSTOPPABLE 🚀',
        emoji: '🚀',
        desc: 'Bestie is entering her main character phase',
        color: 'from-cyan-400 to-violet-500',
        textColor: 'text-cyan-300',
        borderColor: 'border-cyan-500/30',
        glow: 'shadow-[0_0_16px_rgba(6,182,212,0.25)]',
      };
    }
    if (clamped >= 60) {
      return {
        label: 'MOOD: VIBES RETURNING 💃',
        emoji: '💃',
        desc: 'Smile frequency increasing significantly',
        color: 'from-purple-400 to-pink-500',
        textColor: 'text-purple-300',
        borderColor: 'border-purple-500/30',
        glow: 'shadow-[0_0_16px_rgba(168,85,247,0.2)]',
      };
    }
    if (clamped >= 40) {
      return {
        label: 'MOOD: CHUCKLE DETECTED 🤭',
        emoji: '🤭',
        desc: 'Overthinking protocols successfully paused',
        color: 'from-emerald-400 to-teal-500',
        textColor: 'text-emerald-300',
        borderColor: 'border-emerald-500/30',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.2)]',
      };
    }
    if (clamped >= 25) {
      return {
        label: 'MOOD: DEFROSTING... ❄️',
        emoji: '❄️',
        desc: 'Emergency bestie jokes taking effect',
        color: 'from-blue-400 to-indigo-500',
        textColor: 'text-blue-300',
        borderColor: 'border-blue-500/30',
        glow: 'shadow-[0_0_10px_rgba(59,130,246,0.15)]',
      };
    }
    return {
      label: 'MOOD DETECTED: LOW 😭',
      emoji: '😭',
      desc: 'Immediate emergency cheering protocol active',
      color: 'from-rose-500 to-amber-500',
      textColor: 'text-rose-300',
      borderColor: 'border-rose-500/30',
      glow: 'shadow-[0_0_10px_rgba(244,63,94,0.15)]',
    };
  };

  const status = getStatus();

  return (
    <div
      className={`w-full rounded-2xl p-4 bg-slate-900/80 backdrop-blur-md border ${status.borderColor} ${status.glow} transition-all duration-500`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {clamped >= 100 ? (
            <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
          ) : (
            <TrendingUp className="w-4 h-4 text-pink-400" />
          )}
          <span className={`text-xs font-bold uppercase tracking-wider font-display ${status.textColor}`}>
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm font-bold text-white tabular-nums">
            {clamped}%
          </span>
          {clamped >= 100 && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-3.5 rounded-full bg-slate-800/90 overflow-hidden p-0.5 border border-slate-700/50">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${status.color} shadow-sm relative`}
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        >
          {/* Shimmer light stripe */}
          <div className="absolute inset-0 bg-white/20 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>{status.desc}</span>
        <span className="text-slate-500 font-mono">
          {clamped < 100 ? `${100 - clamped}% to Legendary` : '🎉 Level Maxed!'}
        </span>
      </div>
    </div>
  );
};
