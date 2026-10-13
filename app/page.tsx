'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Trophy, Flame, Settings, ChevronRight, Star } from 'lucide-react';

// 课程数据
const units = [
  {
    id: 1,
    title: 'Esasy Bölüm',
    titleCn: '基础篇',
    subtitle: 'Pinyin ulgamy, sesler, ýazylyş · 拼音系统、声调、基础会话',
    lessons: [
      { id: 1, title: 'Pinyin we 4 ses', titleCn: '拼音与四个声调', emoji: '🔤', status: 'available', progress: 0 },
      { id: 2, title: 'B, P, M, F', titleCn: '声母 B, P, M, F', emoji: '👄', status: 'available', progress: 0 },
      { id: 3, title: 'D, T, N, L', titleCn: '舌尖中音 D, T, N, L', emoji: '👅', status: 'available', progress: 0 },
      { id: 4, title: 'G, K, H', titleCn: '舌根音 G, K, H', emoji: '🗣️', status: 'available', progress: 0 },
      { id: 5, title: 'J, Q, X', titleCn: '舌面音 J, Q, X', emoji: '✨', status: 'available', progress: 0 },
      { id: 6, title: 'ZH, CH, SH, R', titleCn: '翘舌音 ZH, CH, SH, R', emoji: '🔥', status: 'available', progress: 0 },
      { id: 7, title: 'Z, C, S', titleCn: '平舌音 Z, C, S', emoji: '💨', status: 'available', progress: 0 },
      { id: 8, title: 'Y, W + Gaýtalama', titleCn: '半元音 Y, W 与复习', emoji: '🔄', status: 'available', progress: 0 },
      { id: 9, title: 'Ai, Ei, Ao, Ou', titleCn: '复韵母', emoji: '🌊', status: 'available', progress: 0 },
      { id: 10, title: 'An, En, In, Ang, Eng', titleCn: '鼻韵母', emoji: '👃', status: 'available', progress: 0 },
    ],
    color: 'from-duoligo-green to-emerald-500',
    icon: '🔤',
  },
];

const fakeUser = {
  name: 'Söwda',
  xp: 245,
  streak: 7,
  league: 'Bronze',
  hearts: 5,
  currentMode: 'tm2cn' as 'tm2cn' | 'cn2tm',
};

export default function HomePage() {
  const [mode, setMode] = useState<'tm2cn' | 'cn2tm'>('tm2cn');
  const [showModePicker, setShowModePicker] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
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
              <span className="text-sm font-bold">7</span>
            </div>
            <div className="flex items-center gap-1 text-duoligo-yellow">
              <Star className="w-4 h-4 fill-duoligo-yellow" />
              <span className="text-sm font-bold">245</span>
            </div>
            <button
              onClick={() => setShowModePicker(!showModePicker)}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Mode Picker Modal */}
      {showModePicker && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setShowModePicker(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-center mb-4">Öwreniş ugru · 学习方向</h3>
            <div className="space-y-3">
              <button
                onClick={() => { setMode('tm2cn'); setShowModePicker(false); }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  mode === 'tm2cn' ? 'border-duoligo-green bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="font-bold text-sm">🇹🇲 土库曼语 → 🇨🇳 中文</div>
                <div className="text-xs text-gray-500 mt-1">学中文 · 从土语出发学习汉语</div>
              </button>
              <button
                onClick={() => { setMode('cn2tm'); setShowModePicker(false); }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  mode === 'cn2tm' ? 'border-duoligo-red bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="font-bold text-sm">🇨🇳 中文 → 🇹🇲 土库曼语</div>
                <div className="text-xs text-gray-500 mt-1">学土语 · 从汉语出发学习土语</div>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Course Path - Duolingo Style */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-1.5 bg-duoligo-yellow/20 text-duoligo-yellow px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Bronze League
          </div>
          <h2 className="text-xl font-bold text-duolingo-text">
            {mode === 'tm2cn' ? 'Hoş gelmiňiz!' : '欢迎！'}
          </h2>
          <p className="text-sm text-duolingo-textLight mt-1">
            {mode === 'tm2cn'
              ? 'Pinyin-den başlap hýtaw dilini öwrenersiňiz.'
              : '从拼音开始学习土库曼语。'
            }
          </p>
        </motion.div>

        {/* Units & Lessons */}
        {units.map((unit, unitIdx) => (
          <div key={unit.id} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-duoligo-green to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                {unit.id}
              </div>
              <div>
                <h3 className="text-sm font-bold text-duolingo-text">{unit.title}</h3>
                <p className="text-xs text-duolingo-textLight">{unit.subtitle}</p>
              </div>
            </div>

            {/* Lesson Nodes */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-3">
                {unit.lessons.map((lesson, lessonIdx) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lessonIdx * 0.05 }}
                    className="relative flex items-center"
                  >
                    <a
                      href={`/lesson/${lesson.id}?mode=${mode}`}
                      className="flex items-center gap-4 w-full group"
                    >
                      {/* Node Circle */}
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-duo group-hover:scale-110 transition-transform ${
                        lesson.status === 'available'
                          ? 'bg-gradient-to-br from-duoligo-green to-emerald-500'
                          : lesson.status === 'completed'
                          ? 'bg-duoligo-green'
                          : 'bg-gray-200'
                      }`}>
                        {lesson.status === 'completed' ? (
                          <span className="text-white text-lg">✓</span>
                        ) : (
                          lesson.emoji
                        )}
                      </div>

                      {/* Lesson Card */}
                      <div className="flex-1 bg-white rounded-2xl p-4 shadow-duo hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-400 mb-0.5">Sapak {lesson.id}</div>
                            <div className="font-bold text-sm text-duolingo-text">{lesson.title}</div>
                            <div className="text-xs text-duoligo-textLight">{lesson.titleCn}</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-duoligo-green transition-colors" />
                        </div>
                        {lesson.progress > 0 && (
                          <div className="mt-2">
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-duoligo-green rounded-full progress-animate"
                                style={{ width: `${lesson.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* PDF Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">📚</div>
            <div>
              <h4 className="font-bold text-sm text-duolingo-text">PDF Kitap Satyn Al</h4>
              <p className="text-xs text-duolingo-textLight mt-1">
                Esasy Bölüm (1-10 sapak) PDF formatynda satyn almak isleýärsiňizmi?
              </p>
              <button className="mt-3 px-4 py-2 bg-duoligo-orange text-white text-xs font-bold rounded-xl shadow-duo hover:bg-orange-600 transition-colors">
                Satyn al · 购买 — $9.99
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
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
          <button className="flex flex-col items-center gap-0.5 py-1 px-3">
            <Star className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400">Dükan</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
