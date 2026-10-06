import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, CheckCircle, Flame, Cake, Gift, Heart } from 'lucide-react';
import { useBirthday } from '../../context/BirthdayContext';
import { birthdayData } from '../../config/birthdayData';
import { soundManager } from '../../utils/audio';

export const BirthdayCelebration: React.FC = () => {
  const { selectedPrize, resetAdventure, unlockedName } = useBirthday();
  const { celebration, memories } = birthdayData;

  const [hasAnsweredYes, setHasAnsweredYes] = useState<boolean>(false);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [evasiveAttempt, setEvasiveAttempt] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Trigger high-intensity birthday confetti fireworks
  const triggerConfettiStorm = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 999 };

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#fbbf24', '#8b5cf6', '#ec4899', '#10b981', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#fbbf24', '#8b5cf6', '#ec4899', '#10b981', '#ffffff'],
      });
    }, 220);
  };

  const handleYes = () => {
    setHasAnsweredYes(true);
    soundManager.playCelebration();
    triggerConfettiStorm();
  };

  // Evasive "NO" button behavior
  const handleEvadeNo = () => {
    soundManager.playClick();
    setEvasiveAttempt((prev) => prev + 1);

    // Keep the playful button reachable on compact touch screens.
    const maxOffset = window.innerWidth < 640 ? 36 : 110;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset * 1.5;

    setNoButtonPosition({
      x: Math.round(randomX),
      y: Math.round(randomY),
    });
  };

  const currentEvasiveMessage =
    evasiveAttempt > 0
      ? celebration.evasiveMessages[(evasiveAttempt - 1) % celebration.evasiveMessages.length]
      : null;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100dvh-80px)] py-6 sm:py-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!hasAnsweredYes ? (
          /* =========================================================================
             STAGE 1: THE BIG QUESTION WITH EVASIVE NO BUTTON
             ========================================================================= */
          <motion.div
            key="celebration-question"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl glass-card-elevated rounded-3xl p-6 sm:p-12 border-2 border-amber-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Top Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-gradient-to-r from-amber-500 via-purple-400 to-pink-500" />

            {/* Glowing Gift Icon */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.12, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-purple-600 flex items-center justify-center shadow-xl shadow-amber-500/40"
            >
              <Gift className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-lg" />
            </motion.div>

            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{celebration.preTitle}</span>
            </motion.div>

            {/* Main Question */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-romantic text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-md"
            >
              {celebration.mainQuestion}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-300 text-sm sm:text-base font-light max-w-md mx-auto mb-8 leading-relaxed"
            >
              {celebration.subText}
            </motion.p>

            {/* Dynamic Playful Hint when NO escapes */}
            <div className="min-h-[28px] mb-4">
              <AnimatePresence mode="wait">
                {currentEvasiveMessage && (
                  <motion.div
                    key={currentEvasiveMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs sm:text-sm text-amber-300 font-romantic font-semibold"
                  >
                    {currentEvasiveMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Two Buttons: SÍ and Playful Evasive NO */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto min-h-[90px]">
              {/* SÍ Button */}
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(245, 158, 11, 0.7)' }}
                whileTap={{ scale: 0.94 }}
                onClick={handleYes}
                className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white font-bold text-lg sm:text-xl shadow-xl shadow-amber-600/40 flex items-center justify-center gap-2 cursor-pointer pulse-glow-button z-10"
              >
                <span>{celebration.yesButtonText}</span>
              </motion.button>

              {/* Evasive NO Button */}
              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={handleEvadeNo}
                onTouchStart={handleEvadeNo}
                onClick={handleEvadeNo}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 font-medium text-sm sm:text-base border border-slate-700 cursor-pointer select-none transition-colors"
              >
                <span>{celebration.noButtonText}</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 2: GRAND FINALE CELEBRATION & LETTER REVEAL
             ========================================================================= */
          <motion.div
            key="celebration-reveal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-3xl glass-card-elevated rounded-3xl p-5 sm:p-10 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold mb-4 tracking-wider"
            >
              <Cake className="w-4 h-4 text-amber-400" />
              <span>{celebration.revealed.badge}</span>
            </motion.div>

            {/* Title with personalized name */}
            <h1 className="font-romantic text-3xl sm:text-5xl font-extrabold text-white mb-2 leading-tight">
              ¡FELIZ CUMPLEAÑOS, {unlockedName.toUpperCase()}! 🎉🥳
            </h1>

            {/* Subtitle */}
            <p className="font-romantic text-xl sm:text-2xl font-semibold text-amber-300 italic mb-6">
              "{celebration.revealed.subtitle}"
            </p>

            {/* Narrative Letter Box */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 mb-6 text-center text-slate-200 border border-amber-500/20 max-w-2xl mx-auto space-y-4">
              <p className="text-sm sm:text-base font-light leading-relaxed">
                {celebration.revealed.letterParagraph1}
              </p>
              <p className="text-sm sm:text-base font-light leading-relaxed">
                {celebration.revealed.letterParagraph2}
              </p>
              <div className="font-romantic text-xl sm:text-2xl font-extrabold text-amber-400 tracking-wide pt-2 border-t border-amber-500/20">
                {celebration.revealed.letterSign}
              </div>
            </div>

            {/* Chosen Prize Banner from the Wheel */}
            {selectedPrize && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900/80 to-purple-950/70 border border-amber-500/30 mb-8 max-w-xl mx-auto flex items-center gap-4 text-left shadow-lg"
              >
                <div className="text-4xl p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex-shrink-0">
                  {selectedPrize.emoji}
                </div>
                <div className="flex-grow">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                    {celebration.revealed.prizePrefix}
                  </span>
                  <h4 className="font-romantic text-lg sm:text-xl font-bold text-white leading-tight">
                    {selectedPrize.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {selectedPrize.description}
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              </motion.div>
            )}

            {/* Photo Memories Strip */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                <span>Nuestros Recuerdos Juntos</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {memories.items.map((mem) => (
                  <div
                    key={mem.id}
                    className="polaroid-frame rounded-xl p-1.5 bg-white shadow-md transform hover:scale-105 transition-transform"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 mb-1">
                      <img
                        src={mem.image}
                        alt={mem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-slate-800 truncate px-0.5">
                      {mem.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={triggerConfettiStorm}
                className="px-6 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{celebration.revealed.moreConfettiButtonText}</span>
              </button>

              <button
                onClick={resetAdventure}
                className="px-6 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{celebration.revealed.restartButtonText}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
