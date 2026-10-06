import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ArrowLeft, Cake, Sparkles, Image, Gift, PartyPopper } from 'lucide-react';
import { useBirthday } from '../../context/BirthdayContext';
import type { LevelId } from '../../types';

export const BirthdayHeader: React.FC = () => {
  const {
    currentLevel,
    maxUnlockedLevel,
    goToLevel,
    prevLevel,
    isAudioMuted,
    toggleAudio,
    isUnlocked,
    unlockedName,
  } = useBirthday();

  // If not unlocked yet, do not show full header
  if (!isUnlocked) {
    return null;
  }

  const levelSteps = [
    { id: 1 as LevelId, icon: Image, label: 'Recuerdos' },
    { id: 2 as LevelId, icon: Gift, label: 'Ruleta' },
    { id: 3 as LevelId, icon: PartyPopper, label: 'Sorpresa' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-4 py-2.5 backdrop-blur-md bg-[#0b0914]/85 border-b border-amber-500/15 transition-all" style={{ paddingTop: 'max(0.625rem, env(safe-area-inset-top))' }}>
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back button or personalized tag */}
        <div className="flex items-center gap-2">
          {currentLevel > 1 && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={prevLevel}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-full glass-pill hover:bg-amber-500/20 text-amber-200 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Volver al paso anterior"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Volver</span>
            </motion.button>
          )}

          <div className="min-w-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/25 text-amber-300 text-xs font-medium">
            <Cake className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="max-w-[calc(100vw-9rem)] truncate tracking-wide sm:max-w-none">
              {currentLevel === 0 && `Para ${unlockedName} ✨`}
              {currentLevel === 1 && 'Nivel 1: Recuerdos'}
              {currentLevel === 2 && 'Nivel 2: Ruleta de Premios'}
              {currentLevel === 3 && '¡Sorpresa Final! 🎂'}
            </span>
          </div>
        </div>

        {/* Center: Interactive Level Progress Steps (Levels 1 to 3) */}
        {currentLevel >= 1 && (
          <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
            {levelSteps.map((step, idx) => {
              const isCurrent = currentLevel === step.id;
              const isStepUnlocked = maxUnlockedLevel >= step.id;
              const isCompleted = currentLevel > step.id;
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    disabled={!isStepUnlocked}
                    onClick={() => goToLevel(step.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-sm shadow-amber-500/40'
                        : isCompleted
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20 hover:bg-amber-500/25 cursor-pointer'
                        : isStepUnlocked
                        ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 cursor-pointer'
                        : 'bg-slate-900/40 text-slate-600 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span>{step.label}</span>
                  </button>

                  {idx < levelSteps.length - 1 && (
                    <div
                      className={`w-3 sm:w-4 h-[1.5px] mx-1 transition-colors ${
                        maxUnlockedLevel > step.id ? 'bg-amber-500/40' : 'bg-slate-800'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Right: Audio sound toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleAudio}
            className="p-2 rounded-full glass-pill hover:bg-amber-500/20 text-amber-200 transition-colors cursor-pointer"
            title={isAudioMuted ? 'Activar sonido' : 'Silenciar sonido'}
            aria-label="Alternar sonido"
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </motion.button>

          {currentLevel === 3 && (
            <div className="flex items-center gap-1 text-xs text-amber-300 font-medium px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">Final</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile-only Progress Bar */}
      {currentLevel >= 1 && (
        <div className="mt-2 sm:hidden w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-amber-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentLevel / 3) * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      )}
    </header>
  );
};
