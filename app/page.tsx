'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Trophy, Flame, Star, ChevronRight, LogIn, ShoppingBag, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useUser, SignInButton, SignUpButton, UserButton } from '@/lib/clerk-stub';
import { supabase } from '@/lib/supabase';
import { courseStructure, getLessonData } from '@/lib/lessons';
import { getGuestProgress } from '@/lib/progress';

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const [mode, setMode] = useState<'tm2cn' | 'cn2tm'>('tm2cn');
  const [showModePicker, setShowModePicker] = useState(false);
  const [stats, setStats] = useState({ totalXp: 0, streakDays: 0, completedLessons: 0, league: 'bronze' });

  // Load stats (from localStorage for guests, Supabase for logged-in)
  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      const loadStats = async () => {
        const { data: xpData } = await supabase.from('user_xp').select('*').eq('user_id', user.id).single();
        const { data: progressData } = await supabase.from('lesson_progress').select('lesson_id').eq('user_id', user.id).eq('completed', true);
        setStats({
          totalXp: xpData?.total_xp || 0,
          streakDays: xpData?.streak_days || 0,
          completedLessons: progressData?.length || 0,
          league: xpData?.league || 'bronze',
        });
      };
      loadStats();
    } else {
      const progress = getGuestProgress();
      setStats({
        totalXp: progress.totalXp,
        streakDays: progress.streakDays,
        completedLessons: progress.completedLessons.length,
        league: 'bronze',
      });
    }
  }, [user, isLoaded]);

  const part1 = courseStructure.parts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-duoligo-green to-emerald-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-duolingo-text">CN · BOOK</h1>
              <p className="text-xs text-duolingo-textLight">学汉语的拉丁转写</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-orange-500">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span className="text-sm font-bold">{stats.streakDays}</span>
            </div>
            <div className="flex items-center gap-1 text-duoligo-yellow">
              <Star className="w-4 h-4 fill-duoligo-yellow" />
              <span className="text-sm font-bold">{stats.totalXp}</span>
            </div>
            {user ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="w-8 h-8 rounded-lg bg-duoligo-green/10 flex items-center justify-center">
                  <LogIn className="w-4 h-4 text-duoligo-green" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </header>

      {/* Mode Picker Modal */}
      {showModePicker && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setShowModePicker(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-center mb-4">Öwreniş ugru · 学习方向</h3>
            <div className="space-y-3">
              <button onClick={() => { setMode('tm2cn'); setShowModePicker(false); }} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${mode === 'tm2cn' ? 'border-duoligo-green bg-green-50' : 'border-gray-200'}`}>
                <div className="font-bold text-sm">🇹🇲 土库曼语 → 🇨🇳 中文</div>
                <div className="text-xs text-gray-500 mt-1">学中文 · 从土语出发学习汉语</div>
              </button>
              <button onClick={() => { setMode('cn2tm'); setShowModePicker(false); }} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${mode === 'cn2tm' ? 'border-duoligo-red bg-red-50' : 'border-gray-200'}`}>
                <div className="font-bold text-sm">🇨🇳 中文 → 🇹🇲 土库曼语</div>
                <div className="text-xs text-gray-500 mt-1">学土语 · 从汉语出发学习土语</div>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Guest Progress Banner */}
      {!user && isLoaded && stats.completedLessons > 0 && (
        <div className="max-w-lg mx-auto px-4 pt-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-duoligo-green/10 rounded-2xl p-3 border border-duoligo-green/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-duoligo-green flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-duolingo-text">
                  {stats.completedLessons} sapak tamamlandy · 已完成{stats.completedLessons}课
                </p>
                <p className="text-[10px] text-duolingo-textLight">Progress ýatda saklanýar · 进度保存中</p>
              </div>
            </div>
            {stats.completedLessons >= 2 && (
              <SignUpButton mode="modal">
                <button className="px-2.5 py-1 bg-duoligo-green text-white text-[10px] font-bold rounded-lg">
                  Ýatda sakla · 保存
                </button>
              </SignUpButton>
            )}
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-duoligo-yellow/20 text-duoligo-yellow px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Trophy className="w-3.5 h-3.5" />{stats.league} League
          </div>
          <h2 className="text-xl font-bold text-duolingo-text">
            {mode === 'tm2cn' ? 'Hoş gelmiňiz!' : '欢迎！'}
          </h2>
          <p className="text-sm text-duolingo-textLight mt-1">
            {mode === 'tm2cn' ? 'Pinyin-den başlap hýtaw dilini öwrenersiňiz.' : '从拼音开始学习土库曼语。'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        {(stats.completedLessons > 0 || user) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-3 mb-8">
            <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
              <div className="text-lg font-bold text-duoligo-green">{stats.completedLessons}</div>
              <div className="text-[10px] text-gray-500">Sapak · 已完成</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
              <div className="text-lg font-bold text-duoligo-yellow">{stats.totalXp}</div>
              <div className="text-[10px] text-gray-500">Jemi XP · 总经验</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
              <div className="text-lg font-bold text-orange-500">{stats.streakDays}</div>
              <div className="text-[10px] text-gray-500">Gün · 连续天数</div>
            </div>
          </motion.div>
        )}

        {/* Course Parts */}
        {courseStructure.parts.map((part) => (
          <div key={part.id} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-duoligo-green to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                {part.id}
              </div>
              <div>
                <h3 className="text-sm font-bold text-duolingo-text">{part.title}</h3>
                <p className="text-xs text-duolingo-textLight">{part.subtitle}</p>
              </div>
              <span className="ml-auto text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{part.level}</span>
            </div>

            {part.lessonIds.length > 0 ? (
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-3">
                  {part.lessonIds.map((lessonId, idx) => {
                    const isCompleted = user
                      ? false // Will be updated when we properly track this
                      : getGuestProgress().completedLessons.includes(lessonId);
                    const meta = getLessonData(lessonId);
                    return (
                      <motion.div
                        key={lessonId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative flex items-center"
                      >
                        <Link href={`/lesson/${lessonId}?mode=${mode}`} className="flex items-center gap-4 w-full group">
                          <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-duo group-hover:scale-110 transition-transform bg-gradient-to-br ${part.color} ${isCompleted ? 'opacity-80' : ''}`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            ) : (
                              <span className="text-white">{meta?.emoji ?? '📖'}</span>
                            )}
                          </div>
                          <div className="flex-1 bg-white rounded-2xl p-4 shadow-duo hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-0.5">Sapak {lessonId}</div>
                                <div className="font-bold text-sm text-duolingo-text">{meta?.title ?? `Sapak ${lessonId}`}</div>
                                <div className="text-xs text-duolingo-textLight">{meta?.titleCn ?? ''}</div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-duoligo-green transition-colors" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <span className="text-2xl">🚧</span>
                <p className="text-xs text-gray-400 mt-2">Taýýar däl · 即将开放</p>
              </div>
            )}
          </div>
        ))}

        {/* Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">📚</div>
            <div>
              <h4 className="font-bold text-sm text-duolingo-text">PDF Kitap Satyn Al · 购买教材</h4>
              <p className="text-xs text-duolingo-textLight mt-1">Esasy Bölüm (1-10 sapak) PDF formatynda</p>
              <Link href={user ? "/shop" : "/"}>
                <button className="mt-3 px-4 py-2 bg-duoligo-orange text-white text-xs font-bold rounded-xl shadow-duo hover:bg-orange-600 transition-colors flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />Satyn al · 购买 — $9.99
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-around">
          <button className="flex flex-col items-center gap-0.5 py-1 px-3">
            <BookOpen className="w-5 h-5 text-duoligo-green" />
            <span className="text-[10px] font-bold text-duoligo-green">Sapak</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 py-1 px-3">
            <Play className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400">Maşk</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 py-1 px-3">
            <Trophy className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400">Reýting</span>
          </button>
          <Link href={user ? "/shop" : "/"} className="flex flex-col items-center gap-0.5 py-1 px-3">
            <ShoppingBag className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400">Dükan</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
