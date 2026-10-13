'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, Star, CheckCircle2, XCircle, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useUser, SignUpButton } from '@/lib/clerk-stub';
import { supabase } from '@/lib/supabase';
import { getLessonData, type LessonData } from '@/lib/lessons';
import {
  getGuestProgress,
  updateLessonProgress,
  saveExerciseAnswer,
  shouldPromptSignIn,
  setSignInPrompted,
  type GuestProgress,
} from '@/lib/progress';

export default function LessonPage() {
  const params = useParams();
  const { user, isLoaded } = useUser();
  const lessonId = Number(params.id);

  const [currentSection, setCurrentSection] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number>>({});
  const [xp, setXp] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [loading, setLoading] = useState(true);

  const lessonData = getLessonData(lessonId);
  const isGuest = isLoaded && !user;

  // Load progress (localStorage for guests, Supabase for logged-in)
  useEffect(() => {
    if (!lessonData) return;
    const loadProgress = async () => {
      if (user) {
        // Load from Supabase
        const { data } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .single();
        if (data) {
          setCurrentSection(data.current_section || 0);
          if (data.completed) setXp(data.score || 0);
        }
        // Load exercise answers
        const { data: answers } = await supabase
          .from('exercise_answers')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId);
        if (answers) {
          const answerMap: Record<number, number> = {};
          answers.forEach((a: { exercise_index: number; selected_option: number }) => {
            answerMap[a.exercise_index] = a.selected_option;
          });
          setExerciseAnswers(answerMap);
        }
      } else {
        // Load from localStorage
        const progress = getGuestProgress();
        const lp = progress.lessonProgress[lessonId];
        if (lp) {
          setCurrentSection(lp.currentSection);
          if (lp.completed) setXp(lp.score);
        }
        // Load exercise answers
        const answerMap: Record<number, number> = {};
        Object.entries(progress.exerciseAnswers).forEach(([key, val]) => {
          const [lId, exIdx] = key.split('_').map(Number);
          if (lId === lessonId) answerMap[exIdx] = val.selected;
        });
        setExerciseAnswers(answerMap);
      }
      setLoading(false);
    };
    if (isLoaded) loadProgress();
  }, [user, isLoaded, lessonId, lessonData]);

  // Save progress
  const saveProgress = useCallback(async (section: number, completed: boolean, score: number) => {
    if (!lessonData) return;
    if (user) {
      await supabase.from('lesson_progress').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        current_section: section,
        completed,
        score,
        completed_at: completed ? new Date().toISOString() : null,
      });
      if (completed && score > 0) {
        await supabase.rpc('add_xp', { user_id: user.id, xp_amount: score });
      }
    } else {
      updateLessonProgress(lessonId, section, completed, score);
    }
  }, [user, lessonId, lessonData]);

  // Check if we should show sign-in prompt after completing a lesson
  useEffect(() => {
    if (showResult && isGuest && shouldPromptSignIn()) {
      setSignInPrompted(true);
      setTimeout(() => setShowSignInPrompt(true), 1500);
    }
  }, [showResult, isGuest]);

  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-duolingo-text text-lg">Sapak tapylmady · 课程未找到</p>
      </div>
    );
  }

  const sections = [
    ...(lessonData.warmup.length ? [{ key: 'warmup', title: '🔥 Çyşgylar · 热身' }] : []),
    ...(lessonData.vocab.length ? [{ key: 'vocab', title: '📝 Täze Sözlük · 生词' }] : []),
    ...(lessonData.grammar.length ? [{ key: 'grammar', title: '📐 Grammatika · 语法' }] : []),
    ...(lessonData.exercises.length ? [{ key: 'exercise', title: '📋 Maşk · 练习' }] : []),
    ...(lessonData.culture.length ? [{ key: 'culture', title: '🏮 Medeniýet · 文化角' }] : []),
    ...(lessonData.selfCheck.length ? [{ key: 'selfCheck', title: '✅ Barlag · 自我检测' }] : []),
  ];

  const handleAnswer = async (exIdx: number, optIdx: number, correct: boolean) => {
    setExerciseAnswers(prev => ({ ...prev, [exIdx]: optIdx }));
    if (correct) setXp(prev => prev + 10);

    if (user) {
      await supabase.from('exercise_answers').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        exercise_index: exIdx,
        selected_option: optIdx,
        is_correct: correct,
      });
    } else {
      saveExerciseAnswer(lessonId, exIdx, optIdx, correct);
    }
  };

  const handleNext = async () => {
    if (currentSection < sections.length - 1) {
      const next = currentSection + 1;
      setCurrentSection(next);
      await saveProgress(next, false, xp);
    } else {
      setShowResult(true);
      await saveProgress(currentSection, true, xp);
    }
  };

  const speak = (text: string) => {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-3 border-duoligo-green border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalSections = sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-sky-50 to-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className="w-5 h-5 text-duolingo-text" />
          </Link>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-duoligo-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-duoligo-yellow font-bold text-sm">
            <Star className="w-4 h-4 fill-duoligo-yellow" />+{xp}
          </div>
        </div>
      </div>

      {/* Guest Banner */}
      {isGuest && (
        <div className="bg-duoligo-green/5 border-b border-duoligo-green/10 px-4 py-2">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <span className="text-xs text-duolingo-textLight">
              {getGuestProgress().completedLessons.length >= 2
                ? '⏰ Progress ýatda saklanmady — hasap açyň!'
                : '👋 Myhman hökminde okaýsyňiz'}
            </span>
            <SignUpButton mode="modal">
              <button className="px-2.5 py-1 bg-duoligo-green text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                <LogIn className="w-3 h-3" />Hasap aç · 注册
              </button>
            </SignUpButton>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {sections[currentSection]?.key === 'warmup' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-duolingo-text">{lessonData.titleCn}</h2>
                <p className="text-sm text-duolingo-textLight">{lessonData.title}</p>
                <div className="space-y-3 mt-6">
                  {lessonData.warmup.map((item, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <p className="text-base font-medium text-duolingo-text">{item.cn}</p>
                      <p className="text-sm text-duoligo-blue mt-1">{item.tm}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sections[currentSection]?.key === 'vocab' && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold mb-4">Täze Sözlük · 生词</h2>
                {lessonData.vocab.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-duolingo-text">{item.hanzi}</div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-duoligo-blue">{item.pinyin}</div>
                      <div className="text-sm mt-0.5 text-duolingo-text">{item.tm}</div>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mt-1 inline-block">{item.pos}</span>
                    </div>
                    <button onClick={() => speak(item.hanzi)} className="w-10 h-10 rounded-full bg-duoligo-green/10 flex items-center justify-center hover:bg-duoligo-green/20 transition-colors">
                      <Volume2 className="w-4 h-4 text-duoligo-green" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {sections[currentSection]?.key === 'grammar' && (
              <div className="space-y-4">
                {lessonData.grammar.map((g, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-sm text-duolingo-text mb-2">{g.title}</h4>
                    <p className="text-sm text-duolingo-textLight mb-3 leading-relaxed">{g.rule}</p>
                    <div className="border-l-4 border-duoligo-green pl-3 space-y-2">
                      {g.examples.map((ex, exIdx) => (
                        <div key={exIdx}>
                          <span className="font-medium text-sm">{ex.cn}</span>
                          <span className="text-xs text-duoligo-blue ml-2">{ex.pinyin}</span>
                          <span className="text-xs text-gray-500 ml-2">— {ex.tm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sections[currentSection]?.key === 'exercise' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold">Maşk · 练习</h2>
                {lessonData.exercises.map((ex, exIdx) => (
                  <div key={exIdx} className="space-y-2">
                    <p className="font-medium text-sm text-duolingo-text">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-duoligo-green/10 text-duoligo-green text-xs font-bold mr-2">{exIdx + 1}</span>
                      {ex.question}
                    </p>
                    {ex.options && (
                      <div className="grid grid-cols-2 gap-2">
                        {ex.options.map((opt, optIdx) => {
                          const isSelected = exerciseAnswers[exIdx] === optIdx;
                          const isCorrect = optIdx === ex.correct;
                          const answered = exerciseAnswers[exIdx] !== undefined;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => !answered && handleAnswer(exIdx, optIdx, isCorrect)}
                              disabled={answered}
                              className={`p-3 rounded-xl text-xs font-medium text-left transition-all ${
                                answered
                                  ? isCorrect ? 'bg-green-50 border-2 border-green-500 text-green-700'
                                    : isSelected ? 'bg-red-50 border-2 border-red-500 text-red-700'
                                    : 'bg-gray-50 border-2 border-gray-200 text-gray-400'
                                  : 'bg-white border-2 border-gray-200 hover:border-duoligo-green text-duolingo-text'
                              }`}
                            >
                              <span className="flex items-center gap-1">
                                {answered && isCorrect && <CheckCircle2 className="w-3.5 h-3.5" />}
                                {answered && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5" />}
                                {opt}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {ex.type === 'translate' && (
                      <div className="mt-1 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500">Jogaby:</span>
                        <span className="text-sm font-medium text-duoligo-blue ml-2">{ex.answer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {sections[currentSection]?.key === 'culture' && (
              <div className="space-y-3">
                {lessonData.culture.map((item, idx) => (
                  <div key={idx} className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                    <h4 className="font-bold text-sm text-amber-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            )}

            {sections[currentSection]?.key === 'selfCheck' && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold mb-2">Barlag · 自我检测</h2>
                <p className="text-sm text-duolingo-textLight mb-4">Aşakdaky degişlilere göz gezdiriň · 自查以下项目</p>
                {lessonData.selfCheck.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100">
                    <div className="w-5 h-5 rounded-full border-2 border-duoligo-green flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-duoligo-green" />
                    </div>
                    <span className="text-sm text-duolingo-text">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button onClick={handleNext} className="w-full py-4 bg-duoligo-green text-white font-bold rounded-2xl shadow-duo hover:bg-duoligo-greenDark active:translate-y-0.5 transition-all text-sm">
            {currentSection < sections.length - 1 ? 'Indiki · 下一步' : `Tamamla · 完成 +${xp} XP`}
          </button>
        </div>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="text-6xl mb-4">🎉</motion.div>
              <h3 className="text-xl font-bold text-duolingo-text mb-2">Sapak tamamlandy!</h3>
              <p className="text-sm text-duolingo-textLight mb-4">第{lessonId}课已完成</p>
              <div className="inline-flex items-center gap-1.5 bg-duoligo-yellow/20 text-duoligo-yellow px-4 py-2 rounded-full font-bold">
                <Star className="w-4 h-4 fill-duoligo-yellow" />+{xp} XP
              </div>
              <Link href="/" className="block mt-6 py-3 bg-duoligo-green text-white font-bold rounded-xl shadow-duo hover:bg-duoligo-greenDark transition-colors text-sm">
                Dowam et · 继续
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign-In Prompt Modal (Duolingo strategy: after 2 lessons) */}
      <AnimatePresence>
        {showSignInPrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl">
              <div className="text-5xl mb-3">💾</div>
              <h3 className="text-lg font-bold text-duolingo-text mb-2">Progress ýatda saklaň!</h3>
              <p className="text-sm text-duolingo-textLight mb-4">
                Siz 2 sapak tamapladyňiz — gowy iş! Hasap açsaňyz progress barybly goralar we synkronlaşdyrylmyşsynlar.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                您已完成2课——很棒！注册账号可保存进度，跨设备同步。
              </p>
              <SignUpButton mode="modal">
                <button className="w-full py-3 bg-duoligo-green text-white font-bold rounded-xl shadow-duo hover:bg-duoligo-greenDark transition-colors text-sm">
                  Hasap aç · 免费注册
                </button>
              </SignUpButton>
              <button onClick={() => setShowSignInPrompt(false)} className="mt-2 text-xs text-gray-400 hover:text-gray-600">
                Soňrak · 稍后再说
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
