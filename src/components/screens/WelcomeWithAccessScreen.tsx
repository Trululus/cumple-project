import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, ArrowRight, ShieldAlert, Sparkles, Cake, Gift, Image, Heart } from 'lucide-react';
import { useBirthday } from '../../context/BirthdayContext';
import { birthdayData } from '../../config/birthdayData';

export const WelcomeWithAccessScreen: React.FC = () => {
  const { isUnlocked, unlockedName, tryUnlock, nextLevel } = useBirthday();
  const { access } = birthdayData;

  const [passcode, setPasscode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || isUnlocking) return;

    const result = tryUnlock(passcode);
    if (result.success) {
      setIsUnlocking(true);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.error || access.errorMessage);
    }
  };

  const greeting = access.unlockedGreeting.replace('{nombre}', unlockedName || 'Cumpleañero/a');

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>{access.badge}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* =========================================================
               STEP 1: VIP ACCESS / PASSCODE INPUT
               ========================================================= */
            <motion.div
              key="passcode-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full glass-card-elevated rounded-3xl p-6 sm:p-8 border border-amber-500/25 shadow-2xl relative overflow-hidden text-center"
            >
              {/* Subtle Top Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-purple-400 to-pink-500" />

              {/* Glowing Gift / Lock Icon */}
              <motion.div
                animate={{
                  scale: isUnlocking ? [1, 1.25, 0.9, 1.1] : [1, 1.08, 1],
                  rotate: isUnlocking ? [0, -10, 10, 0] : [0, 0, 0],
                }}
                transition={{
                  duration: isUnlocking ? 0.6 : 3,
                  repeat: isUnlocking ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-amber-500/30 text-white"
              >
                {isUnlocking ? (
                  <KeyRound className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin-slow" />
                ) : (
                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                )}
              </motion.div>

              {/* Pretitle & Main Title */}
              <div className="text-[11px] font-bold tracking-widest text-amber-400 uppercase mb-1">
                {access.preTitle}
              </div>
              <h1 className="font-romantic text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-snug">
                {access.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm mx-auto mb-6">
                {access.subtitle}
              </p>

              {/* Passcode Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={access.inputPlaceholder}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-white placeholder-slate-500 text-center text-base sm:text-lg font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition-all shadow-inner"
                  />
                </div>

                {/* Error Shake Animation */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, x: 0 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        x: [-4, 4, -4, 4, 0],
                      }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isUnlocking || !passcode.trim()}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all pulse-glow-button"
                >
                  <span>{isUnlocking ? 'Desbloqueando...' : access.unlockButtonText}</span>
                  {!isUnlocking && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>

              {/* Hint Info */}
              <div className="mt-5 text-[11px] text-slate-500 font-light">
                💡 Pista: Escribe tu nombre, apodo o la palabra <span className="text-amber-400 font-semibold">cumple</span>
              </div>
            </motion.div>
          ) : (
            /* =========================================================
               STEP 2: UNLOCKED WELCOME & BRIEFING
               ========================================================= */
            <motion.div
              key="welcome-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full glass-card-elevated rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden text-center"
            >
              {/* Subtle top decoration light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              {/* Glowing Birthday Cake Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  rotate: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-amber-500/40 text-white"
              >
                <Cake className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md" />
              </motion.div>

              {/* Personalized Greeting */}
              <h1 className="font-romantic text-2xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                {greeting}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-md mx-auto mb-8">
                {access.unlockedDescription}
              </p>

              {/* Mission Roadmap Badges */}
              <div className="grid grid-cols-3 gap-2.5 mb-8 text-xs text-slate-300">
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-amber-500/20 flex flex-col items-center gap-1.5 shadow-inner">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Image className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-white">1. Recuerdos</span>
                  <span className="text-[10px] text-slate-400">Nuestra historia</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/70 border border-purple-500/20 flex flex-col items-center gap-1.5 shadow-inner">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Gift className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-white">2. Ruleta</span>
                  <span className="text-[10px] text-slate-400">Gana un premio</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/70 border border-pink-500/20 flex flex-col items-center gap-1.5 shadow-inner">
                  <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-white">3. Sorpresa</span>
                  <span className="text-[10px] text-slate-400">El gran final</span>
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(245, 158, 11, 0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={nextLevel}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white font-bold text-base sm:text-lg tracking-wide shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 mx-auto transition-all cursor-pointer group pulse-glow-button"
              >
                <span>{access.startButtonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
