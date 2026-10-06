export type LevelId = 0 | 1 | 2 | 3;

export interface AccessConfig {
  badge: string;
  preTitle: string;
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  unlockButtonText: string;
  validKeys: string[];
  nameMapping: Record<string, string>;
  errorMessage: string;
  unlockedGreeting: string; // e.g. "¡Hola, {nombre}! 🎂"
  unlockedDescription: string;
  startButtonText: string;
}

export interface MemoryItem {
  id: string;
  memoryNumber: number;
  image: string;
  fallbackGradient?: string;
  date: string;
  location?: string;
  title: string;
  note: string;
  tag?: string;
}

export interface PrizeOption {
  id: string;
  title: string;
  emoji: string;
  category: string;
  description: string;
  highlights: string[];
  vibe: string;
  color?: string;
  badge?: string;
}

export interface BirthdayConfig {
  personName: string;
  birthdayDate: string;
  access: AccessConfig;
  memories: {
    levelNumber: number;
    badge: string;
    title: string;
    subtitle: string;
    items: MemoryItem[];
    completionMessage: string;
    buttonText: string;
  };
  wheel: {
    levelNumber: number;
    badge: string;
    title: string;
    subtitle: string;
    spinButtonText: string;
    spinningText: string;
    resultIntro: string;
    resultSubtitle: string;
    acceptButtonText: string;
    prizes: PrizeOption[];
  };
  celebration: {
    badge: string;
    preTitle: string;
    mainQuestion: string;
    subText: string;
    yesButtonText: string;
    noButtonText: string;
    evasiveMessages: string[];
    revealed: {
      badge: string;
      title: string;
      subtitle: string;
      prizePrefix: string;
      letterParagraph1: string;
      letterParagraph2: string;
      letterSign: string;
      moreConfettiButtonText: string;
      restartButtonText: string;
    };
  };
}
