import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, ArrowRight, Eye, X, Cake, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBirthday } from '../../context/BirthdayContext';
import { birthdayData } from '../../config/birthdayData';
import type { MemoryItem } from '../../types';
import { soundManager } from '../../utils/audio';

export const BirthdayMemories: React.FC = () => {
  const { nextLevel } = useBirthday();
  const { memories } = birthdayData;
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');

  const handleOpenMemory = (memory: MemoryItem) => {
    soundManager.playClick();
    setActiveMemory(memory);
  };

  const handleCloseMemory = () => {
    soundManager.playClick();
    setActiveMemory(null);
  };

  const handleNextSlide = () => {
    soundManager.playClick();
    setCurrentSlideIndex((prev) => (prev + 1) % memories.items.length);
  };

  const handlePrevSlide = () => {
    soundManager.playClick();
    setCurrentSlideIndex((prev) => (prev - 1 + memories.items.length) % memories.items.length);
  };

  return (
    <div className="relative min-h-[calc(100dvh-80px)] py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3 tracking-wide uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{memories.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-romantic text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
        >
          {memories.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base font-light leading-relaxed"
        >
          {memories.subtitle}
        </motion.p>

        {/* View Toggle on Mobile */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1 text-xs rounded-full transition-colors ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800/80 text-slate-400'
            }`}
          >
            Mosaico
          </button>
          <button
            onClick={() => setViewMode('slideshow')}
            className={`px-3.5 py-1 text-xs rounded-full transition-colors ${
              viewMode === 'slideshow'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800/80 text-slate-400'
            }`}
          >
            Paso a Paso
          </button>
        </div>
      </div>

      {/* Grid or Slideshow of Polaroid Memories */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5 mb-10 sm:mb-12">
          {memories.items.map((mem, index) => {
            const formattedNumber = String(mem.memoryNumber).padStart(2, '0');

            return (
              <motion.div
                key={mem.id}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  transition: { duration: 0.2 },
                }}
                onClick={() => handleOpenMemory(mem)}
                className="polaroid-frame rounded-2xl p-3.5 cursor-pointer flex flex-col bg-white shadow-xl group relative overflow-hidden"
              >
                {/* Memory Number Badge */}
                <div className="absolute top-5 right-5 z-10 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1 shadow">
                  <Cake className="w-3 h-3 text-amber-400" />
                  <span>Memoria {formattedNumber}</span>
                </div>

                {/* Photo Container */}
                <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-3 group-hover:brightness-105 transition-all">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback Container */}
                  <div
                    style={{ display: 'none' }}
                    className={`w-full h-full bg-gradient-to-br ${
                      mem.fallbackGradient || 'from-amber-500/30 to-purple-600/30'
                    } flex flex-col items-center justify-center p-4 text-center text-white`}
                  >
                    <Cake className="w-8 h-8 text-amber-300 mb-2 animate-pulse" />
                    <span className="text-xs font-semibold text-amber-100">{mem.title}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-full bg-white/90 text-slate-900 shadow-md">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Polaroid Note Content */}
                <div className="flex flex-col flex-grow justify-between text-left px-1">
                  <div>
                    <div className="flex items-center justify-between gap-1 text-[11px] font-medium text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        {mem.date}
                      </span>
                      {mem.location && (
                        <span className="flex items-center gap-0.5 truncate max-w-[110px]">
                          <MapPin className="w-3 h-3 text-purple-600 flex-shrink-0" />
                          {mem.location}
                        </span>
                      )}
                    </div>
                    <h3 className="font-romantic text-base font-bold text-slate-800 leading-snug line-clamp-1">
                      {mem.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-normal line-clamp-2 mt-1 leading-relaxed">
                      {mem.note}
                    </p>
                  </div>

                  {mem.tag && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                      <span className="font-bold text-amber-600 uppercase tracking-wider">
                        {mem.tag}
                      </span>
                      <span className="text-slate-400 group-hover:text-amber-600 flex items-center gap-0.5 font-medium transition-colors">
                        Ver recuerdo 
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Mobile Slideshow Mode */
        <div className="sm:hidden mb-10">
          <div className="relative">
            {(() => {
              const mem = memories.items[currentSlideIndex];
              const formattedNumber = String(mem.memoryNumber).padStart(2, '0');

              return (
                <motion.div
                  key={mem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="polaroid-frame rounded-2xl p-4 bg-white shadow-2xl mx-auto w-full max-w-xs"
                  onClick={() => handleOpenMemory(mem)}
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-3">
                    <img
                      src={mem.image}
                      alt={mem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Memoria {formattedNumber}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        {mem.date}
                      </span>
                      {mem.location && <span>{mem.location}</span>}
                    </div>
                    <h3 className="font-romantic text-lg font-bold text-slate-800">
                      {mem.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {mem.note}
                    </p>
                  </div>
                </motion.div>
              );
            })()}

            {/* Slide Navigation Buttons */}
            <div className="flex justify-between items-center mt-4 px-4">
              <button
                onClick={handlePrevSlide}
                className="p-2 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {memories.items.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlideIndex ? 'w-5 bg-amber-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextSlide}
                className="p-2 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto border border-amber-500/20 shadow-xl"
      >
        <p className="font-romantic text-base sm:text-lg font-medium text-amber-200 italic mb-5 leading-relaxed">
          "{memories.completionMessage}"
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={nextLevel}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white font-bold text-base shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 mx-auto cursor-pointer pulse-glow-button"
        >
          <span>{memories.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Lightbox / Expanded Polaroid Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseMemory}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="polaroid-frame rounded-3xl p-4 sm:p-6 bg-white max-w-md w-full max-h-[calc(100dvh-2rem)] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={handleCloseMemory}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-900/80 text-white hover:bg-amber-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-4 shadow-inner">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left text-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-1.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {activeMemory.date}
                  </span>
                  {activeMemory.location && (
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      {activeMemory.location}
                    </span>
                  )}
                </div>

                <h3 className="font-romantic text-2xl font-bold text-slate-900 mb-2">
                  {activeMemory.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeMemory.note}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-amber-600">
                  Memoria {String(activeMemory.memoryNumber).padStart(2, '0')}
                </span>
                <span className="italic">Toca fuera para cerrar</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
