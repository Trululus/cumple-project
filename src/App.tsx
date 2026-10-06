import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';
import { BackgroundEffects } from './components/common/BackgroundEffects';
import { BirthdayHeader } from './components/common/BirthdayHeader';
import { WelcomeWithAccessScreen } from './components/screens/WelcomeWithAccessScreen';
import { BirthdayMemories } from './components/screens/BirthdayMemories';
import { PrizeWheel } from './components/screens/PrizeWheel';
import { BirthdayCelebration } from './components/screens/BirthdayCelebration';

const BirthdayContent: React.FC = () => {
  const { currentLevel } = useBirthday();

  return (
    <div className="relative min-h-screen min-h-dvh flex flex-col text-slate-100 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Dynamic Ambient Festive Background */}
      <BackgroundEffects />

      {/* Persistent Level Header / Progress Navigation */}
      <BirthdayHeader />

      {/* Main Interactive Stage with Smooth Transitions */}
      <main className="relative z-10 flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentLevel === 0 && (
            <motion.div
              key="step-access-welcome"
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <WelcomeWithAccessScreen />
            </motion.div>
          )}

          {currentLevel === 1 && (
            <motion.div
              key="step-memories"
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <BirthdayMemories />
            </motion.div>
          )}

          {currentLevel === 2 && (
            <motion.div
              key="step-wheel"
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <PrizeWheel />
            </motion.div>
          )}

          {currentLevel === 3 && (
            <motion.div
              key="step-celebration"
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full"
            >
              <BirthdayCelebration />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-3.5 text-center text-[11px] text-slate-500 border-t border-amber-500/10" style={{ paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))' }}>
        Hecho con todo el Amor para Nikole celebrar tu día especial Loviu ✨
      </footer>
    </div>
  );
};

export function App() {
  return (
    <BirthdayProvider>
      <BirthdayContent />
    </BirthdayProvider>
  );
}

export default App;
