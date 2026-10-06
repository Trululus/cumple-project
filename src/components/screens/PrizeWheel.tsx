import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBirthday } from '../../context/BirthdayContext';
import { birthdayData } from '../../config/birthdayData';
import { soundManager } from '../../utils/audio';

export const PrizeWheel: React.FC = () => {
  const { nextLevel, selectPrize, selectedPrize } = useBirthday();
  const { wheel } = birthdayData;

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [wonPrizeIndex, setWonPrizeIndex] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState<boolean>(false);

  const prizes = wheel.prizes;
  const numSegments = prizes.length;
  const segmentAngle = 360 / numSegments;

  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const segmentColors = [
    '#f59e0b', // Amber / Gold
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f43f5e', // Rose
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrizeIndex(null);
    soundManager.playClick();

    // 1. Pick a random winning index
    const randomIndex = Math.floor(Math.random() * numSegments);
    const winningPrize = prizes[randomIndex];

    // 2. Calculate target rotation:
    // Wheel pointer is at top (0 deg).
    const segmentCenter = (randomIndex + 0.5) * segmentAngle;
    const fullSpins = 360 * (5 + Math.floor(Math.random() * 2)); // 5 to 6 full spins
    const targetOffset = 360 - segmentCenter;
    const newRotation = rotation + fullSpins + (targetOffset - (rotation % 360));

    setRotation(newRotation);

    // 3. Play tick sounds as it spins
    let tickCount = 0;
    const maxTicks = 28;
    if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);

    tickIntervalRef.current = setInterval(() => {
      soundManager.playWheelTick();
      tickCount++;
      if (tickCount >= maxTicks) {
        if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      }
    }, 140);

    // 4. On spin completion (matches CSS transition duration 4.5s)
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrizeIndex(randomIndex);
      setHasSpun(true);
      selectPrize(winningPrize.id);
      soundManager.playSuccess();

      // Confetti burst for winning prize
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#8b5cf6', '#ec4899', '#ffffff'],
      });
    }, 4600);
  };

  const chosenPrize =
    wonPrizeIndex !== null ? prizes[wonPrizeIndex] : selectedPrize || prizes[0];

  return (
    <div className="relative min-h-[calc(100dvh-80px)] py-5 sm:py-6 px-3 sm:px-6 max-w-4xl mx-auto flex flex-col justify-between items-center text-center overflow-x-hidden">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2 tracking-wide uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{wheel.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-romantic text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1.5"
        >
          {wheel.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-xs sm:text-sm font-light"
        >
          {wheel.subtitle}
        </motion.p>
      </div>

      {/* Main Roulette Arena */}
      <div className="relative my-auto flex flex-col items-center justify-center w-full max-w-md">
        {/* Top Pointer Arrow */}
        <div className="relative z-30 -mb-4 drop-shadow-[0_4px_10px_rgba(245,158,11,0.7)]">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-amber-400 filter drop-shadow-md" />
          <div className="w-2.5 h-2.5 rounded-full bg-white mx-auto -mt-6 shadow" />
        </div>

        {/* Wheel Container */}
        <div className="relative w-[min(78vw,290px)] h-[min(78vw,290px)] sm:w-[350px] sm:h-[350px] rounded-full p-2.5 glass-card border-4 border-amber-400/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] flex items-center justify-center">
          {/* Outer Glowing Studs */}
          <div className="absolute inset-1 rounded-full border border-amber-300/30 pointer-events-none" />

          {/* Rotating Wheel Disk */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden shadow-inner"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.25, 1.0)'
                : 'none',
            }}
          >
            {/* SVG Wheel Segments */}
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full transform -rotate-90 origin-center"
            >
              {prizes.map((prize, i) => {
                const startAngle = (i * 360) / numSegments;
                const endAngle = ((i + 1) * 360) / numSegments;
                const color = prize.color || segmentColors[i % segmentColors.length];

                // Coordinates on circle
                const x1 = 150 + 150 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 150 + 150 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 150 + 150 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 150 + 150 * Math.sin((Math.PI * endAngle) / 180);

                const pathData = `M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`;

                // Mid angle for text & emoji
                const midAngle = startAngle + segmentAngle / 2;
                const textRadius = 100;
                const tx = 150 + textRadius * Math.cos((Math.PI * midAngle) / 180);
                const ty = 150 + textRadius * Math.sin((Math.PI * midAngle) / 180);

                return (
                  <g key={prize.id}>
                    <path
                      d={pathData}
                      fill={color}
                      stroke="#0f0c1b"
                      strokeWidth="2.5"
                    />
                    <g
                      transform={`translate(${tx}, ${ty}) rotate(${midAngle + 90})`}
                    >
                      <text
                        x="0"
                        y="-10"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        {prize.emoji}
                      </text>
                      <text
                        x="0"
                        y="10"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9.5"
                        fontWeight="600"
                        letterSpacing="0.2"
                      >
                        {prize.title.length > 15 ? prize.title.slice(0, 13) + '...' : prize.title}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Hub Button */}
          <motion.button
            whileHover={!isSpinning ? { scale: 1.08 } : {}}
            whileTap={!isSpinning ? { scale: 0.92 } : {}}
            disabled={isSpinning}
            onClick={spinWheel}
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-purple-600 text-white font-bold text-xs sm:text-sm flex flex-col items-center justify-center shadow-xl shadow-amber-600/50 border-4 border-slate-950 cursor-pointer disabled:cursor-not-allowed"
          >
            <Sparkles className={`w-4 h-4 text-white mb-0.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span className="text-[10px] sm:text-xs tracking-wider uppercase font-extrabold leading-tight">
              {isSpinning ? '...' : 'GIRAR'}
            </span>
          </motion.button>
        </div>

        {/* Spin CTA Button */}
        {!hasSpun && !isSpinning && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={spinWheel}
            className="mt-5 sm:mt-6 w-full max-w-xs sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer pulse-glow-button"
          >
            <span>{wheel.spinButtonText}</span>
          </motion.button>
        )}

        {isSpinning && (
          <div className="mt-6 text-xs text-amber-300 font-romantic font-semibold animate-pulse flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{wheel.spinningText}</span>
          </div>
        )}
      </div>

      {/* Result Card & Advance Button */}
      <AnimatePresence>
        {hasSpun && !isSpinning && chosenPrize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-lg glass-card-elevated rounded-3xl p-5 sm:p-6 border border-amber-500/30 shadow-2xl mt-4 text-center"
          >
            <div className="text-xs text-amber-300 font-romantic font-semibold mb-1">
              {wheel.resultIntro}
            </div>

            <div className="flex items-center justify-center gap-2 text-xl sm:text-3xl font-romantic font-bold text-white mb-2">
              <span className="text-3xl sm:text-4xl">{chosenPrize.emoji}</span>
              <span>{chosenPrize.title}</span>
            </div>

            <p className="text-xs text-slate-300 mb-3 max-w-md mx-auto leading-relaxed">
              {chosenPrize.description}
            </p>

            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-romantic font-semibold italic mb-5">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>{wheel.resultSubtitle}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={spinWheel}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Girar de nuevo</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextLevel}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer pulse-glow-button"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{wheel.acceptButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
