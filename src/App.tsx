/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { AmbientBackground } from './components/AmbientBackground';
import { SoundToggle } from './components/SoundToggle';
import { MoodMeter } from './components/MoodMeter';
import { MakeMeLaughSection } from './components/MakeMeLaughSection';
import { DontClickSection } from './components/DontClickSection';
import { SmileUpdateSection } from './components/SmileUpdateSection';
import { MysteryBoxSection } from './components/MysteryBoxSection';
import { AnnoySequenceSection } from './components/AnnoySequenceSection';
import { BestieLetterSection } from './components/BestieLetterSection';
import { EmojiBlast } from './components/EmojiBlast';
import { sounds } from './utils/sound';
import { triggerConfetti } from './utils/confetti';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [moodLevel, setMoodLevel] = useState(15);
  const [interactionsCount, setInteractionsCount] = useState(0);

  // FX states
  const [shakeCount, setShakeCount] = useState(0);
  const [emojiBlastKey, setEmojiBlastKey] = useState(0);
  const [isShower, setIsShower] = useState(false);

  const handleStart = () => {
    sounds.playFanfare();
    triggerConfetti({ particleCount: 50, spread: 60 });
    setHasStarted(true);
    setMoodLevel(25);
  };

  const handleInteraction = () => {
    setInteractionsCount((prev) => prev + 1);
    setMoodLevel((prev) => Math.min(100, prev + 17));
  };

  const handleTriggerShake = () => {
    setShakeCount((prev) => prev + 1);
  };

  const handleTriggerEmojiBlast = () => {
    setIsShower(false);
    setEmojiBlastKey((prev) => prev + 1);
  };

  const handleTriggerEmojiShower = () => {
    setIsShower(true);
    setEmojiBlastKey((prev) => prev + 1);
    setMoodLevel(100);
  };

  const handleReset = () => {
    sounds.playPop();
    setHasStarted(false);
    setMoodLevel(15);
    setInteractionsCount(0);
  };

  // Requirements: unlock after several interactions (e.g. 3 or 4)
  const isFinalUnlocked = interactionsCount >= 4 || moodLevel >= 75;
  const interactionsNeeded = Math.max(0, 4 - interactionsCount);

  return (
    <div className="min-h-screen bg-[#0b0c16] text-slate-100 flex flex-col justify-between selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      <AmbientBackground />
      <EmojiBlast
        triggerKey={emojiBlastKey}
        isFullScreenShower={isShower}
        count={isShower ? 42 : 28}
        emojis={['😂', '❤️', '✨', '🫶', '😭', '🤣', '🎉', '💖', '🍿', '🧁', '🌟']}
      />

      {/* Top Bar: Clean 3-zone standard header */}
      <header className="sticky top-0 z-40 bg-[#0b0c16]/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5">
              <span>Bestie Mood-Fix</span>
              <span className="text-pink-400">✨</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SoundToggle />
            {hasStarted && (
              <button
                onClick={handleReset}
                title="Restart Mood Fix"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Replay</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8 w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            /* HOME SCREEN */
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full text-center space-y-6 my-auto"
            >
              {/* Alert Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Emergency Broadcast</span>
              </div>

              {/* Home Screen Titles Required by Prompt */}
              <div className="space-y-3">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-rose-400 tracking-tight leading-tight">
                  ⚠️ MOOD DETECTED: LOW 😭
                </h1>
                <p className="font-display font-semibold text-lg sm:text-2xl text-slate-200">
                  Emergency Bestie Mood-Fix System Activated 🚨😂
                </p>
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed pt-1">
                  Kuch toh gadbad hai bestie! Chinta mat karo, backup bakchodi protocols activate ho chuke hain.
                </p>
              </div>

              {/* Start Button Required by Prompt */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleStart}
                  className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-display font-bold text-xl shadow-2xl shadow-pink-500/30 transition-all cursor-pointer flex items-center justify-center gap-3 mx-auto"
                >
                  <span>START MOOD FIX 🚀</span>
                </motion.button>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span>Made specially for you</span>
                <span>·</span>
                <span>100% Guaranteed Smile Return</span>
                <span>·</span>
                <span>No Ads, Just Love</span>
              </div>
            </motion.div>
          ) : (
            /* INTERACTIVE HUB */
            <motion.div
              key="interactive-hub"
              initial={{ opacity: 0, y: 25 }}
              animate={
                shakeCount > 0
                  ? {
                      opacity: 1,
                      y: 0,
                      x: [-12, 12, -10, 10, -5, 5, 0],
                    }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: shakeCount > 0 ? 0.45 : 0.4,
                ease: 'easeOut',
              }}
              className="w-full space-y-6"
            >
              {/* Mood Meter Component */}
              <MoodMeter level={moodLevel} />

              {/* Section Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="font-display font-bold text-lg text-white">
                    Emergency Cheer-Up Deck 🎮
                  </h2>
                  <p className="text-xs text-slate-400">
                    Dabao buttons aur dekho magic. Har button me ek naya drama!
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400">
                    Interactions: <strong className="text-pink-400">{interactionsCount}</strong>
                  </span>
                </div>
              </div>

              {/* 5 Interactive Buttons Stack */}
              <div className="space-y-4">
                {/* Button 1: Make Me Laugh */}
                <MakeMeLaughSection onInteract={handleInteraction} />

                {/* Button 2: Don't Click This */}
                <DontClickSection onInteract={handleInteraction} />

                {/* Button 3: Press For Surprise */}
                <SmileUpdateSection onInteract={handleInteraction} />

                {/* Button 4: Mystery Button */}
                <MysteryBoxSection
                  onInteract={handleInteraction}
                  onTriggerShake={handleTriggerShake}
                  onTriggerEmojiBlast={handleTriggerEmojiBlast}
                />

                {/* Button 5: Annoy Me */}
                <AnnoySequenceSection onInteract={handleInteraction} />
              </div>

              {/* Final Surprise: Unlocks after interacting */}
              <div className="pt-2">
                <BestieLetterSection
                  unlocked={isFinalUnlocked}
                  interactionsNeeded={interactionsNeeded}
                  onTriggerEmojiShower={handleTriggerEmojiShower}
                />
              </div>

              {/* Bottom Replay Action */}
              <div className="pt-4 pb-8 text-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
                  <span>Start from beginning (Replay) 🔄</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-600 px-4">
        <p className="flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for the world’s best friend</span>
        </p>
      </footer>
    </div>
  );
}
