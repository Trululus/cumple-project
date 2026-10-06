import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LevelId, PrizeOption } from '../types';
import { birthdayData } from '../config/birthdayData';
import { soundManager } from '../utils/audio';

interface BirthdayContextType {
  isUnlocked: boolean;
  unlockedName: string;
  currentLevel: LevelId;
  maxUnlockedLevel: LevelId;
  selectedPrize: PrizeOption;
  isAudioMuted: boolean;
  tryUnlock: (passcode: string) => { success: boolean; name?: string; error?: string };
  goToLevel: (level: LevelId) => void;
  nextLevel: () => void;
  prevLevel: () => void;
  selectPrize: (prizeId: string) => void;
  toggleAudio: () => void;
  resetAdventure: () => void;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

const STORAGE_KEY = 'cumple_adventure_storage_v1';

const getInitialState = () => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch {
    // ignore
  }
  return null;
};

export const BirthdayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = getInitialState();

  const [isUnlocked, setIsUnlocked] = useState<boolean>(initial?.isUnlocked || false);
  const [unlockedName, setUnlockedName] = useState<string>(initial?.unlockedName || birthdayData.personName);
  const [currentLevel, setCurrentLevel] = useState<LevelId>(
    typeof initial?.currentLevel === 'number' ? (initial.currentLevel as LevelId) : 0
  );
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<LevelId>(
    typeof initial?.maxUnlockedLevel === 'number' ? (initial.maxUnlockedLevel as LevelId) : 0
  );
  const [selectedPrizeId, setSelectedPrizeId] = useState<string>(
    initial?.selectedPrizeId || birthdayData.wheel.prizes[0].id
  );
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isUnlocked,
          unlockedName,
          currentLevel,
          maxUnlockedLevel,
          selectedPrizeId,
        })
      );
    } catch {
      // ignore
    }
  }, [isUnlocked, unlockedName, currentLevel, maxUnlockedLevel, selectedPrizeId]);

  const tryUnlock = (rawPasscode: string) => {
    const cleaned = rawPasscode.trim().toLowerCase();
    const { access } = birthdayData;

    // Check valid keys or allow any non-empty input if desired, but here we validate against list
    const isValid = access.validKeys.some((k) => k.toLowerCase() === cleaned);

    if (isValid) {
      const resolvedName = access.nameMapping[cleaned] || rawPasscode.trim();
      setIsUnlocked(true);
      setUnlockedName(resolvedName);
      soundManager.playSuccess();
      return { success: true, name: resolvedName };
    } else {
      soundManager.playClick();
      return { success: false, error: access.errorMessage };
    }
  };

  const goToLevel = (level: LevelId) => {
    if (!isUnlocked && level > 0) return;
    soundManager.playClick();
    setCurrentLevel(level);
    if (level > maxUnlockedLevel) {
      setMaxUnlockedLevel(level);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextLevel = () => {
    const next = Math.min(3, currentLevel + 1) as LevelId;
    goToLevel(next);
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      const prev = (currentLevel - 1) as LevelId;
      goToLevel(prev);
    }
  };

  const selectPrize = (prizeId: string) => {
    setSelectedPrizeId(prizeId);
  };

  const toggleAudio = () => {
    const muted = soundManager.toggleMute();
    setIsAudioMuted(muted);
  };

  const resetAdventure = () => {
    soundManager.playClick();
    setCurrentLevel(0);
    setMaxUnlockedLevel(0);
    setIsUnlocked(false);
    setSelectedPrizeId(birthdayData.wheel.prizes[0].id);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const selectedPrize =
    birthdayData.wheel.prizes.find((p) => p.id === selectedPrizeId) || birthdayData.wheel.prizes[0];

  return (
    <BirthdayContext.Provider
      value={{
        isUnlocked,
        unlockedName,
        currentLevel,
        maxUnlockedLevel,
        selectedPrize,
        isAudioMuted,
        tryUnlock,
        goToLevel,
        nextLevel,
        prevLevel,
        selectPrize,
        toggleAudio,
        resetAdventure,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within a BirthdayProvider');
  }
  return context;
};
