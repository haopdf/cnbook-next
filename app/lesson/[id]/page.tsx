'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

// 课程数据接口
interface LessonData {
  id: number;
  title: string;
  titleCn: string;
  emoji: string;
  sections: {
    warmup?: { tm: string; cn: string; }[];
    vocab?: { hanzi: string; pinyin: string; tm: string; pos: string; }[];
    grammar?: { title: string; rule: string; examples: { cn: string; pinyin: string; tm: string; }[]; }[];
    exercise?: { type: string; question: string; options?: string[]; correct?: number; }[];
    culture?: { title: string; content: string; }[];
  };
}

// 课程数据
const lessonsData: Record<number, LessonData> = {
  1: {
    id: 1,
    title: 'Pinyin we 4 ses',
    titleCn: '拼音与四个声调',
    emoji: '🔤',
    sections: {
      warmup: [
        { tm: 'Pinyin — hýtaw sesleriň latyn ýazylyşy.', cn: '拼音是汉语音的拉丁写法。' },
        { tm: '4 ses bar: 1. ˉ 2. ˊ 3. ˇ 4. ˋ', cn: '有四个声调：一声、二声、三声、四声。' },
      ],
      vocab: [
        { hanzi: '妈', pinyin: 'mā', tm: 'eje', pos: 'n.' },
        { hanzi: '麻', pinyin: 'má', tm: 'keteni', pos: 'n.' },
        { hanzi: '马', pinyin: 'mǎ', tm: 'at', pos: 'n.' },
        { hanzi: '骂', pinyin: 'mà', tm: 'gargyş', pos: 'v.' },
      ],
      grammar: [
        {
          title: '1. Pinyin näme?',
          rule: 'Pinyin — hýtaw diliniň ses ulgamyň latyn harp bilen ýazylşy.',
          examples: [
            { cn: '你好', pinyin: 'nǐ hǎo', tm: 'Salam' },
            { cn: '谢谢', pinyin: 'xiè xie', tm: 'Sag boluň' },
          ],
        },
      ],
      exercise: [
        { type: 'select', question: 'mä näme?', options: ['妈 (eje)', '麻 (keteni)', '马 (at)', '骂 (gargyş)'], correct: 0 },
        { type: 'select', question: 'mán näme?', options: ['妈 (eje)', '麻 (keteni)', '马 (at)', '骂 (gargyş)'], correct: 1 },
      ],
      culture: [
        { title: '4 ses we 4 medeniýet', content: 'Hýtawň 4 sesi — 4 sany dürli söz. Türkmen dilinde ýok.' },
      ],
    },
  },
  2: {
    id: 2,
    title: 'B, P, M, F',
    titleCn: '声母 B, P, M, F',
    emoji: '👄',
    sections: {
      warmup: [
        { tm: 'B, P, M, F — diliň öňki bölegi bilen çykarylýar.', cn: 'B、P、M、F 用嘴唇发音。' },
      ],
      vocab: [
        { hanzi: '爸', pinyin: 'bà', tm: 'kaka', pos: 'n.' },
        { hanzi: '怕', pinyin: 'pà', tm: 'gorky', pos: 'v.' },
        { hanzi: '妈', pinyin: 'mā', tm: 'eje', pos: 'n.' },
        { hanzi: '发', pinyin: 'fā', tm: 'ugratmak', pos: 'v.' },
      ],
      grammar: [
        {
          title: 'Boňluk çykar/çykarma',
          rule: 'B we M — boňluk çykarmaýar. P we F — boňluk çykarýar.',
          examples: [
            { cn: '爸', pinyin: 'bà', tm: 'kaka' },
            { cn: '怕', pinyin: 'pà', tm: 'gorky' },
          ],
        },
      ],
      exercise: [
        { type: 'select', question: 'bá näme?', options: ['爸 (kaka)', '怕 (pɑ̀)', '八 (sekiz)', '爸 (kɑ̀)'], correct: 0 },
      ],
      culture: [],
    },
  },
};

// 默认/简化课数据
function getLessonData(id: number): LessonData {
  if (lessonsData[id]) return lessonsData[id];
  return {
    id,
    title: `Sapak ${id}`,
    titleCn: `第${id}课`,
    emoji: '📖',
    sections: {
      warmup: [
        { tm: `Sapak ${id} — Bu sapakda täze weçugalary öwrenersiňiz.`, cn: `第${id}课 — 在这课里你将学到新的声母和韵母。` },
      ],
      vocab: [],
      grammar: [],
      exercise: [],
      culture: [],
    },
  };
}

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = Number(params.id);
  const mode = (searchParams.get('mode') as 'tm2cn' | 'cn2tm') || 'tm2cn';

  const [currentSection, setCurrentSection] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [xp, setXp] = useState(0);

  const lesson = getLessonData(lessonId);

  const sections = [
    ...(lesson.sections.warmup ? [{ key: 'warmup', title: '🔥 Çyşgylar' }] : []),
    ...(lesson.sections.vocab?.length ? [{ key: 'vocab', title: '📝 Sözlük' }] : []),
    ...(lesson.sections.grammar?.length ? [{ key: 'grammar', title: '📐 Grammatika' }] : []),
    ...(lesson.sections.exercise?.length ? [{ key: 'exercise', title: '📋 Maşk' }] : []),
    ...(lesson.sections.culture?.length ? [{ key: 'culture', title: '🏮 Medeniýet' }] : []),
  ];

  const handleAnswer = (exIdx: number, optIdx: number, correct: boolean) => {
    setExerciseAnswers(prev => ({ ...prev, [exIdx]: optIdx }));
    if (correct) {
      setXp(prev => prev + 10);
    }
  };

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'tk' ? 'ru-RU' : 'zh-CN';
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  const cnText = mode === 'tm2cn';
  const ActiveSection = sections[currentSection];

  return (
    <div className={`min-h-screen pb-24 ${mode === 'cn2tm' ? 'bg-slate-900 text-white' : 'bg-white text-duolingo-text'}`}>
      {/* Top Bar */}
      <div className={`sticky top-0 z-50 ${mode === 'cn2tm' ? 'bg-slate-800' : 'bg-white'} border-b ${mode === 'cn2tm' ? 'border-slate-700' : 'border-gray-100'} px-4 py-3`}>
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className={`w-5 h-5 ${mode === 'cn2tm' ? 'text-white' : 'text-duolingo-text'}`} />
          </Link>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-duoligo-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-duoligo-yellow text-sm font-bold">
            +{xp} XP
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Section: Warmup */}
            {ActiveSection?.key === 'warmup' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold">{lesson.titleCn}</h2>
                {lesson.sections.warmup?.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl ${mode === 'cn2tm' ? 'bg-slate-800' : 'bg-gray-50'}`}>
                    {cnText && (
                      <p className="text-lg font-medium mb-1">{item.cn}</p>
                    )}
                    <p className={`text-sm ${cnText ? 'text-gray-500' : 'font-medium'}`}>
                      {!cnText && item.cn}
                      {cnText && item.tm}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Section: Vocab */}
            {ActiveSection?.key === 'vocab' && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold mb-4">Täze Sözlük · 生词</h2>
                {lesson.sections.vocab?.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl ${mode === 'cn2tm' ? 'bg-slate-800' : 'bg-gray-50'}`}>
                    <div className="text-3xl font-bold">{item.hanzi}</div>
                    <div className="flex-1">
                      <div className="text-xs text-duoligo-blue">{item.pinyin}</div>
                      <div className={`text-sm mt-0.5 ${mode === 'cn2tm' ? 'text-white' : ''}`}>
                        {cnText ? item.tm : item.hanzi}
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded mt-1 inline-block">{item.pos}</span>
                    </div>
                    <button
                      onClick={() => speak(cnText ? item.hanzi : item.hanzi, cnText ? 'zh-CN' : 'zh-CN')}
                      className="w-10 h-10 rounded-full bg-duoligo-green flex items-center justify-center hover:bg-duoligo-greenDark transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Section: Exercise */}
            {ActiveSection?.key === 'exercise' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-4">Maşk · 练习</h2>
                {lesson.sections.exercise?.map((ex, exIdx) => (
                  <div key={exIdx} className="space-y-3">
                    <p className={`font-medium text-sm ${mode === 'cn2tm' ? 'text-white' : ''}`}>
                      <span className="text-duoligo-green font-bold mr-2">{ex.type === 'select' ? 'A' : 'B'}</span>
                      {ex.question}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {ex.options?.map((opt, optIdx) => {
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
                                ? isCorrect
                                  ? 'bg-green-100 border-2 border-green-500 text-green-700'
                                  : isSelected
                                  ? 'bg-red-100 border-2 border-red-500 text-red-700'
                                  : `${mode === 'cn2tm' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} opacity-60`
                                : `${mode === 'cn2tm' ? 'bg-slate-800 border-slate-700 hover:border-duoligo-blue' : 'bg-white border-2 border-gray-200 hover:border-duoligo-blue'}`
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Culture */}
            {ActiveSection?.key === 'culture' && (
              <div className="space-y-3">
                {lesson.sections.culture?.map((item, idx) => (
                  <div key={idx} className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                    <h4 className="font-bold text-sm text-amber-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-amber-700">{item.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Grammar */}
            {ActiveSection?.key === 'grammar' && (
              <div className="space-y-4">
                {lesson.sections.grammar?.map((g, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl ${mode === 'cn2tm' ? 'bg-slate-800' : 'bg-gray-50'}`}>
                    <h4 className="font-bold text-sm mb-2">{g.title}</h4>
                    <p className={`text-sm mb-3 ${mode === 'cn2tm' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {cnText ? g.rule : g.rule}
                    </p>
                    <div className="border-l-4 border-duoligo-green pl-3 space-y-2">
                      {g.examples.map((ex, exIdx) => (
                        <div key={exIdx}>
                          <div className="font-medium text-sm">{ex.cn}</div>
                          <div className="text-xs text-duoligo-blue">{ex.pinyin}</div>
                          <div className="text-xs text-gray-500">{ex.tm}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className={`fixed bottom-0 left-0 right-0 ${mode === 'cn2tm' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} border-t px-4 py-3`}>
        <div className="max-w-lg mx-auto">
          {currentSection < sections.length - 1 ? (
            <button
              onClick={() => setCurrentSection(prev => prev + 1)}
              className="w-full py-4 bg-duoligo-green text-white font-bold rounded-2xl shadow-duo hover:bg-duoligo-greenDark transition-colors text-sm"
            >
              Indiki · 下一步
            </button>
          ) : (
            <button
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-duoligo-green text-white font-bold rounded-2xl shadow-duo hover:bg-duoligo-greenDark transition-colors text-sm"
            >
              Tamamla · 完成 +{xp} XP
            </button>
          )}
        </div>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-xl font-bold text-duolingo-text mb-2">Sapak tamamlandy!</h3>
              <p className="text-sm text-duolingo-textLight mb-4">第{lessonId}课已完成</p>
              <div className="inline-flex items-center gap-1.5 bg-duoligo-yellow/20 text-duoligo-yellow px-4 py-2 rounded-full font-bold">
                <Star className="w-4 h-4 fill-duoligo-yellow" />
                +{xp} XP
              </div>
              <Link
                href="/"
                className="block mt-6 py-3 bg-duoligo-green text-white font-bold rounded-xl shadow-duo hover:bg-duoligo-greenDark transition-colors text-sm"
              >
                Dowam et · 继续
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
