// ============================================
// Guest Progress Tracking (localStorage)
// Duolingo strategy: learn first, sign in later
// ============================================

export interface GuestProgress {
  completedLessons: number[];
  totalXp: number;
  streakDays: number;
  lastActivity: string | null;
  lessonProgress: Record<number, { currentSection: number; completed: boolean; score: number }>;
  exerciseAnswers: Record<string, { selected: number; correct: boolean }>;
  signInPrompted: boolean;
}

const STORAGE_KEY = 'cnbook_progress';

const defaultProgress: GuestProgress = {
  completedLessons: [],
  totalXp: 0,
  streakDays: 1,
  lastActivity: null,
  lessonProgress: {},
  exerciseAnswers: {},
  signInPrompted: false,
};

export function getGuestProgress(): GuestProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveGuestProgress(progress: GuestProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateLessonProgress(lessonId: number, section: number, completed: boolean, score: number): GuestProgress {
  const progress = getGuestProgress();
  progress.lessonProgress[lessonId] = { currentSection: section, completed, score };
  if (completed && !progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  // Update streak
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActivity !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (progress.lastActivity === yesterday) {
      progress.streakDays += 1;
    } else if (!progress.lastActivity) {
      progress.streakDays = 1;
    } else {
      progress.streakDays = 1;
    }
    progress.lastActivity = today;
  }
  saveGuestProgress(progress);
  return progress;
}

export function saveExerciseAnswer(lessonId: number, exerciseIndex: number, selected: number, correct: boolean): GuestProgress {
  const progress = getGuestProgress();
  progress.exerciseAnswers[`${lessonId}_${exerciseIndex}`] = { selected, correct };
  if (correct) {
    progress.totalXp += 10;
  }
  saveGuestProgress(progress);
  return progress;
}

export function setSignInPrompted(value: boolean): void {
  const progress = getGuestProgress();
  progress.signInPrompted = value;
  saveGuestProgress(progress);
}

// After completing 2 lessons, prompt to sign in
export function shouldPromptSignIn(): boolean {
  const progress = getGuestProgress();
  if (progress.signInPrompted) return false;
  return progress.completedLessons.length >= 2;
}

export function clearGuestProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
