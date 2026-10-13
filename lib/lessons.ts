// ============================================
// Course Data - Migrated from textbook/
// Part 1: lessons 1-10 (this file)
// Part 2: lessons 11-20 -> data/lessons/
// ============================================

import { part2Lessons } from '@/data/lessons';
import type { Dialogue } from '@/data/types';

export interface VocabItem {
  hanzi: string;
  pinyin: string;
  tm: string;
  pos: string;
}

export interface GrammarExample {
  cn: string;
  pinyin: string;
  tm: string;
}

export interface GrammarPoint {
  title: string;
  rule: string;
  examples: GrammarExample[];
}

export interface ExerciseItem {
  type: 'select' | 'translate' | 'listen';
  question: string;
  options?: string[];
  correct?: number;
  answer?: string;
}

export interface CultureNote {
  title: string;
  content: string;
}

export interface WarmupItem {
  tm: string;
  cn: string;
}

export interface LessonData {
  id: number;
  part: number;
  title: string;
  titleCn: string;
  emoji: string;
  objectives: string[];
  warmup: WarmupItem[];
  dialogue?: Dialogue[];
  vocab: VocabItem[];
  grammar: GrammarPoint[];
  exercises: ExerciseItem[];
  culture: CultureNote[];
  selfCheck: string[];
}

export const lessonsData: Record<number, LessonData> = {
  // ========================================
  // Lesson 1: Pinyin we 4 ses (拼音与四个声调)
  // ========================================
  1: {
    id: 1,
    part: 1,
    title: 'Pinyin we 4 ses',
    titleCn: '拼音与四个声调',
    emoji: '🔤',
    objectives: ['Pinyin', '4 ses', 'Ýazylyş'],
    warmup: [
      { tm: 'Siz hýtawň näçe sesini bilýärsiňiz?', cn: '你知道中文有几个声调吗？' },
      { tm: 'Türkmen dilinde sesler manysy üýtgedýärmi?', cn: '土库曼语中声调会改变词义吗？' },
      { tm: 'Hýtaw dilinde 4 sany esasy ses bar.', cn: '汉语中有四个基本声调。' },
    ],
    vocab: [
      { hanzi: '妈', pinyin: 'mā', tm: 'eje, mama', pos: 'n.' },
      { hanzi: '麻', pinyin: 'má', tm: 'kendir', pos: 'n.' },
      { hanzi: '马', pinyin: 'mǎ', tm: 'at', pos: 'n.' },
      { hanzi: '骂', pinyin: 'mà', tm: 'gargyş, känmek', pos: 'v.' },
      { hanzi: '八', pinyin: 'bā', tm: 'sekiz', pos: 'num.' },
      { hanzi: '发', pinyin: 'fā', tm: 'ugratmak', pos: 'v.' },
    ],
    grammar: [
      {
        title: '1. Pinyin näme? · 什么是拼音?',
        rule: 'Pinyin (拼音) — hýtawň romanizasiya ulgamy bolup, hýtaw sesleryň ýazylyşyny görkezýär. Her bir pinyin shengmu (声母) we yunmu (韵母) -den durýar.',
        examples: [
          { cn: '你好', pinyin: 'nǐ hǎo', tm: 'Salam' },
          { cn: '谢谢', pinyin: 'xiè xie', tm: 'Sag boluň' },
          { cn: '再见', pinyin: 'zài jiàn', tm: 'Sag boluň' },
        ],
      },
      {
        title: '2. Dört ses · 四个声调',
        rule: 'Hýtawň 4 sany esasy sesi bar: 1-nji ses (ˉ) beýik ýaýgyrady, 2-nji ses (ˊ) ýokary köpelýär, 3ünji ses (ˇ) öň aşak soň ýokary, 4ünji ses (ˋ) beýik düşýár.',
        examples: [
          { cn: 'mā 妈', pinyin: 'mā (1-nji)', tm: 'eje' },
          { cn: 'má 麻', pinyin: 'má (2-nji)', tm: 'kendir' },
          { cn: 'mǎ 马', pinyin: 'mǎ (3ünji)', tm: 'at' },
          { cn: 'mà 骂', pinyin: 'mà (4ünji)', tm: 'känmek' },
        ],
      },
      {
        title: '3. Alty danly ýunmu · 六个单元音韵母',
        rule: 'Pinyiniň esasy ýünleri: a, o, e, i, u, ü',
        examples: [
          { cn: 'a 啊', pinyin: 'ā á ǎ à', tm: 'Leblebi (叹词)' },
          { cn: 'o 哦', pinyin: 'ō ó ǒ ò', tm: '叹词' },
          { cn: 'e 鹅', pinyin: 'ē é ě è', tm: 'aqquş' },
          { cn: 'i 衣', pinyin: 'ī í ǐ ì', tm: 'eşik' },
          { cn: 'u 屋', pinyin: 'ū ú ǔ ù', tm: 'öý' },
          { cn: 'ü 鱼', pinyin: 'ǖ ǘ ǚ ǜ', tm: 'balyk' },
        ],
      },
    ],
    exercises: [
      { type: 'translate', question: 'mama = _____________', answer: '妈 (mā)' },
      { type: 'translate', question: 'at = _____________', answer: '马 (mǎ)' },
      { type: 'translate', question: 'sekiz = _____________', answer: '八 (bā)' },
    ],
    culture: [
      {
        title: 'Sesiň ähmiýeti · 声调的重要性',
        content: 'Hýtaw dilinde sesleriň ähmiýeti örän ulydyr. Mysal üçin: mā (ejelik), má (kendir), mǎ (at), mà (känmek). Dördüň birbirinden sesi tapawutlary dürli manysy berýär!',
      },
    ],
    selfCheck: [
      'Dörd sesiň nesini aýdip bilýärsiňiz? · 能说出四个声调',
      '"mā" we "mǎ" manynyň tapawutyny bilýärsiňiz · 知道 mā 和 mǎ 的意思不同',
      '1-5 arasyndaky harplary ýazyp bilýärsiňiz · 会写一至五的汉字',
      'Hýtawň a, o, e, i, u, ýünlerini okap bilýärsiňiz · 会读六个基本韵母',
    ],
  },

  // ========================================
  // Lesson 2: B, P, M, F (声母 B, P, M, F)
  // ========================================
  2: {
    id: 2,
    part: 1,
    title: 'B, P, M, F',
    titleCn: '声母 B, P, M, F',
    emoji: '👄',
    objectives: ['Shengmu', 'Boňluk', 'Okalmak'],
    warmup: [
      { tm: 'B, P, M, F — diliň öňki bölegi bilen çykarylýar.', cn: 'B、P、M、F 用嘴唇发音。' },
      { tm: 'Bu 4 sany shengmu B, P, M, F — labial sesleri.', cn: '这四个声母是唇音。' },
    ],
    vocab: [
      { hanzi: '爸', pinyin: 'bà', tm: 'kaka', pos: 'n.' },
      { hanzi: '怕', pinyin: 'pà', tm: 'gorky', pos: 'v.' },
      { hanzi: '妈', pinyin: 'mā', tm: 'eje', pos: 'n.' },
      { hanzi: '发', pinyin: 'fā', tm: 'ugratmak', pos: 'v.' },
      { hanzi: '吧', pinyin: 'ba', tm: 'partikul (me softened)', pos: 'part.' },
      { hanzi: '不', pinyin: 'bù', tm: 'däl', pos: 'adv.' },
    ],
    grammar: [
      {
        title: '1. Boňluk çykarmak · 送气与不送气',
        rule: 'B we M — boňluk çykarmaýar (unasyl ýumşak). P we F — boňluk çykarýar (gyzgyn)k. Elleriňizi aňyzyň öňüne goýup duýajiň!',
        examples: [
          { cn: '爸 bà', pinyin: 'bà', tm: 'kaka (boňluk ýok)' },
          { cn: '怕 pà', pinyin: 'pà', tm: 'gorky (boňluk bar)' },
          { cn: '妈 mā', pinyin: 'mā', tm: 'eje (boňluk ýok)' },
          { cn: '发 fā', pinyin: 'fā', tm: 'ugratmak (boňluk bar)' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'bá näme?', options: ['爸 (kaka)', '怕 (gorky)', '八 (sekiz)', '吧 (partikul)'], correct: 0 },
      { type: 'select', question: 'fā näme?', options: ['怕 (gorky)', '发 (ugratmak)', '爸 (kaka)', '吧 (partikul)'], correct: 1 },
      { type: 'translate', question: 'kaka = _____________', answer: '爸 (bà)' },
    ],
    culture: [
      {
        title: 'Türkmençe we Hýtawçadaky meňzeşlik · 土汉相似之处',
        content: 'Türkmen dilinde hem B, P, M, F sesleri bar. Emmaka türkmençe "baba" — hýtawçe "bà ba" (ata). Iki diliň arasyndaky meňzeşlik pinyin öwmekde kömek edýär!',
      },
    ],
    selfCheck: [
      'B we P-iň arasyndaky tapawutdy bilýärsiňiz (boňluk) · 能区分 B 和 P（送气与否）',
      'M we F-i dogry okap bilýärsiňiz · 能正确读 M 和 F',
      '"bà" we "pà" -i terjime edip bilýärsiňiz · 能翻译 bà 和 pà',
    ],
  },

  // ========================================
  // Lesson 3: D, T, N, L (舌尖中音)
  // ========================================
  3: {
    id: 3,
    part: 1,
    title: 'D, T, N, L',
    titleCn: '舌尖中音 D, T, N, L',
    emoji: '👅',
    objectives: ['Dil orta', 'Boňluk'],
    warmup: [
      { tm: 'D, T, N, L — diliniň orta bölegi bilen çykarylýar.', cn: 'D、T、N、L 用舌尖中部发音。' },
    ],
    vocab: [
      { hanzi: '大', pinyin: 'dà', tm: 'uly', pos: 'adj.' },
      { hanzi: '他', pinyin: 'tā', tm: 'ol (erkek)', pos: 'pron.' },
      { hanzi: '你', pinyin: 'nǐ', tm: 'sen', pos: 'pron.' },
      { hanzi: '了', pinyin: 'le', tm: 'partikul (öňki wakadan)', pos: 'part.' },
      { hanzi: '来', pinyin: 'lái', tm: 'gelmek', pos: 'v.' },
      { hanzi: '的', pinyin: 'de', tm: '-iň/-yň (ewnerlik)', pos: 'part.' },
    ],
    grammar: [
      {
        title: 'D, T, N, L — Diliniň orta bölegi',
        rule: 'Bu sesleriň diliňiz ortasynda dykyzlyp çykarylýar. D we T — boňluk tapawuty bar (T boňluk çykarýar). N — burundan çykýar. L — diliniň gapdalundan çykýar.',
        examples: [
          { cn: '大 dà', pinyin: 'dà', tm: 'uly' },
          { cn: '他 tā', pinyin: 'tā', tm: 'ol' },
          { cn: '你 nǐ', pinyin: 'nǐ', tm: 'sen' },
          { cn: '来 lái', pinyin: 'lái', tm: 'gelmek' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'dà näme?', options: ['他 (ol)', '大 (uly)', '你 (sen)', '来 (gelmek)'], correct: 1 },
      { type: 'select', question: 'nǐ näme?', options: ['你 (sen)', '他 (ol)', '大 (uly)', '来 (gelmek)'], correct: 0 },
      { type: 'translate', question: 'sen = _____________', answer: '你 (nǐ)' },
    ],
    culture: [
      {
        title: '"nǐ" (sen) · 称呼文化',
        content: 'Hýtawçeda "nǐ" adamlaryň arasyndaky ýönekeý hitap. Ata-enäňize "n" (sen) diýmek däl, ýöne "n" diýmek dogry däl — "n" diýmek uludan kiçä ýaly. Emmaka adaty "n" ulanyň.',
      },
    ],
    selfCheck: [
      'D, T, N, L-i dogry okap bilýärsiňiz · 能正确读 D, T, N, L',
      '"nǐ" we "t"-i dogry aýrat bilýärsiňiz · 能区分 nǐ 和 tā',
      '"de" partikuliniň işini bilýärsiňiz · 知道"的"的用法',
    ],
  },

  // ========================================
  // Lesson 4: G, K, H (舌根音)
  // ========================================
  4: {
    id: 4,
    part: 1,
    title: 'G, K, H',
    titleCn: '舌根音 G, K, H',
    emoji: '🗣️',
    objectives: ['Dil düşündiriş', 'Boňluk'],
    warmup: [
      { tm: 'G, K, H — diliniň arka bölegi (gat) bilen çykarylýar.', cn: 'G、K、H 用舌根（后部）发音。' },
    ],
    vocab: [
      { hanzi: '个', pinyin: 'gè', tm: 'sany (sanaw)', pos: 'classifier' },
      { hanzi: '看', pinyin: 'kàn', tm: 'görmek', pos: 'v.' },
      { hanzi: '好', pinyin: 'hǎo', tm: 'gowy', pos: 'adj.' },
      { hanzi: '喝', pinyin: 'hē', tm: 'içmek', pos: 'v.' },
      { hanzi: '哥', pinyin: 'gē', tm: 'ukka (kişi)', pos: 'n.' },
      { hanzi: '课', pinyin: 'kè', tm: 'sapak', pos: 'n.' },
    ],
    grammar: [
      {
        title: 'G, K, H — Diliniň arka bölegi',
        rule: 'G we K — dil gat bilen bogazyň arkasy bilen çykarylýar. K boňluk çykarýar, G çykarmaýar. H — gyzgyndan çykýan ses.',
        examples: [
          { cn: '个 gè', pinyin: 'gè', tm: 'sany (howl)' },
          { cn: '看 kàn', pinyin: 'kàn', tm: 'görmek' },
          { cn: '好 hǎo', pinyin: 'hǎo', tm: 'gowy' },
          { cn: '喝 hē', pinyin: 'hē', tm: 'içmek' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'kàn näme?', options: ['看 (görmek)', '个 (sany)', '好 (gowy)', '喝 (içmek)'], correct: 0 },
      { type: 'select', question: 'hǎo näme?', options: ['喝 (içmek)', '好 (gowy)', '看 (görmek)', '个 (sany)'], correct: 1 },
      { type: 'translate', question: 'gowy = _____________', answer: '好 (hǎo)' },
    ],
    culture: [
      {
        title: '"gè" (个) — Iň köp ulanylýan howl · 最常用的量词',
        content: 'Hýtawçeda "gè" iň köp ulanylýan howl (sany). Her bir söz üçin öz howly bar, emmaka başda "g" ulanyp bilersiňiz. Mysal: yī gè rén (bir adam), liǎ gè pingguǒ (iki alm).',
      },
    ],
    selfCheck: [
      'G, K, H-i dogry okap bilýärsiňiz · 能正确读 G, K, H',
      'K we G-iň boňluk tapawutyny bilýärsiňiz · 能区分 K 和 G 的送气',
      '"gè" (howl) ulanyp bilýärsiňiz · 会使用量词"个"',
    ],
  },

  // ========================================
  // Lesson 5: J, Q, X (舌面音)
  // ========================================
  5: {
    id: 5,
    part: 1,
    title: 'J, Q, X',
    titleCn: '舌面音 J, Q, X',
    emoji: '✨',
    objectives: ['Dil ýüz', 'Boňluk'],
    warmup: [
      { tm: 'J, Q, X — diliniň ýüzü (orta) bilen aňyzyň tüýeleň bilen çykarylýar.', cn: 'J、Q、X 用舌面接触上颚发音。' },
    ],
    vocab: [
      { hanzi: '几', pinyin: 'jǐ', tm: 'näçe', pos: 'num.' },
      { hanzi: '去', pinyin: 'qù', tm: 'gitmek', pos: 'v.' },
      { hanzi: '西', pinyin: 'xī', tm: 'günbatar', pos: 'n.' },
      { hanzi: '叫', pinyin: 'jiào', tm: 'andyrmak, atlandyrmak', pos: 'v.' },
      { hanzi: '请', pinyin: 'qǐng', tm: 'haýyş, çagyrmaz', pos: 'v.' },
      { hanzi: '学', pinyin: 'xué', tm: 'okumak, öwrenmek', pos: 'v.' },
    ],
    grammar: [
      {
        title: 'J, Q, X — Dil ýüzüniň sesleri',
        rule: 'Bu üç shengmy diliniň ýüzüniň aňyzyň tüýeleň bilen artyşykda çykarylýar. J — boňluk ýok, Q — boňluk az, X — boňluk ýok. Bu sesler diňe "i" we "ü" bilen birişip ýazylýar!',
        examples: [
          { cn: '几 jǐ', pinyin: 'jǐ', tm: 'näçe' },
          { cn: '去 qù', pinyin: 'qù', tm: 'gitmek' },
          { cn: '西 xī', pinyin: 'xī', tm: 'günbatar' },
          { cn: '学 xué', pinyin: 'xué', tm: 'öwrenmek' },
        ],
      },
      {
        title: 'J/Q/X + i/ü düzgüni · J/Q/X 拼合规则',
        rule: 'J, Q, X diňe "i" ýa-da "ü" bilen birişip ýazylýar. Mysal: ji, qi, xi — ýok; ja, qa, xa — ýalňyş!',
        examples: [
          { cn: '自己 zìjǐ', pinyin: 'zì jǐ', tm: 'özüň' },
          { cn: '谢谢 xièxie', pinyin: 'xiè xie', tm: 'sag boluň' },
          { cn: '前面 qiánmiàn', pinyin: 'qián miàn', tm: 'öň' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'jǐ näme?', options: ['几 (näçe)', '去 (gitmek)', '西 (günbatar)', '学 (öwrenmek)'], correct: 0 },
      { type: 'select', question: 'xué näme?', options: ['去 (gitmek)', '西 (günbatar)', '学 (öwrenmek)', '几 (näçe)'], correct: 2 },
      { type: 'translate', question: 'näçe = _____________', answer: '几 (jǐ)' },
    ],
    culture: [
      {
        title: 'J/Q/X — Hýtawň özelligi · 汉语特色',
        content: 'J, Q, X sesleri türki dillerinde täsdiňli, emmaka iň we Gündogar dillerinde täsdiň. Bu sesleri öwmek kyn bolýar, emmaka geregi ýerde mäşgala etmek gerek!',
      },
    ],
    selfCheck: [
      'J, Q, X-i dogry okap bilýärsiňiz · 能正确读 J, Q, X',
      'J/Q/X diňe "i/ü" bilen birişýär — düzgüni bilýärsiňiz · 知道 J/Q/X 只拼 i/ü',
      '"xué" we "qù" -i terjime edip bilýärsiňiz · 能翻译 xué 和 qù',
    ],
  },

  // ========================================
  // Lesson 6: Z, C, S (平舌音)
  // ========================================
  6: {
    id: 6,
    part: 1,
    title: 'Z, C, S',
    titleCn: '平舌音 Z, C, S',
    emoji: '💨',
    objectives: ['Dil kennyar', 'Boňluk'],
    warmup: [
      { tm: 'Z, C, S — diliniň kennyar bölegi bilen dişleriň arkasy bilen çykarylýar.', cn: 'Z、C、S 用舌尖抵住下齿背发音。' },
    ],
    vocab: [
      { hanzi: '三', pinyin: 'sān', tm: 'üç', pos: 'num.' },
      { hanzi: '四', pinyin: 'sì', tm: 'dört', pos: 'num.' },
      { hanzi: '五', pinyin: 'wǔ', tm: 'bäş', pos: 'num.' },
      { hanzi: '做', pinyin: 'zuò', tm: 'etmek', pos: 'v.' },
      { hanzi: '字', pinyin: 'zì', tm: 'harf', pos: 'n.' },
      { hanzi: '从', pinyin: 'cóng', tm: '-dan/-dän', pos: 'prep.' },
    ],
    grammar: [
      {
        title: 'Z, C, S — Dil kennyar sesleri',
        rule: 'Diliniň kennyar bölegi dişleriň arkasy bilen artyşýar. Z — boňluk ýok, C — boňluk gyzgyn, S — gyçyrdawuk. Bu sesler bilen ZH, CH, SH-i tapawutlandyrmak möhümdir!',
        examples: [
          { cn: '三 sān', pinyin: 'sān', tm: 'üç' },
          { cn: '做 zuò', pinyin: 'zuò', tm: 'etmek' },
          { cn: '字 zì', pinyin: 'zì', tm: 'harf' },
          { cn: '从 cóng', pinyin: 'cóng', tm: '-dan' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'sān näme?', options: ['三 (üç)', '四 (dört)', '五 (bäş)', '做 (etmek)'], correct: 0 },
      { type: 'select', question: 'zuò näme?', options: ['做 (etmek)', '字 (harf)', '从 (-dan)', '三 (üç)'], correct: 0 },
      { type: 'translate', question: 'üç = _____________', answer: '三 (sān)' },
    ],
    culture: [
      {
        title: 'Sanlaryň aýratynlygy · 数字的特殊含义',
        content: 'Hýtawçeda sanlaryň medeni ahhmiýeti bar: "bäş" (5) — baht, "sekiz" (8) — baht, "dört" (4) — ýaman (ölüm bilen meňzeş). Sanlary dogry okamak möhümdir!',
      },
    ],
    selfCheck: [
      'Z, C, S-i dogry okap bilýärsiňiz · 能正确读 Z, C, S',
      'Z we C-iň boňluk tapawutyny bilýärsiňiz · 能区分 Z 和 C 的送气',
      '1-10 sanlary okap bilýärsiňiz · 能读1-10的数字',
    ],
  },

  // ========================================
  // Lesson 7: ZH, CH, SH, R (翘舌音)
  // ========================================
  7: {
    id: 7,
    part: 1,
    title: 'ZH, CH, SH, R',
    titleCn: '翘舌音 ZH, CH, SH, R',
    emoji: '🔥',
    objectives: ['Dil köpeltmeli', 'Boňluk'],
    warmup: [
      { tm: 'ZH, CH, SH, R — diliniň ujy gatnaşýar (gaýtalaýar).', cn: 'ZH、CH、SH、R 舌尖翘起（卷舌）。' },
    ],
    vocab: [
      { hanzi: '是', pinyin: 'shì', tm: 'bolmak', pos: 'v.' },
      { hanzi: '吃', pinyin: 'chī', tm: 'iýmek', pos: 'v.' },
      { hanzi: '上', pinyin: 'shàng', tm: 'ýokary', pos: 'n.' },
      { hanzi: '人', pinyin: 'rén', tm: 'adam', pos: 'n.' },
      { hanzi: '中', pinyin: 'zhōng', tm: 'orta', pos: 'n.' },
      { hanzi: '出', pinyin: 'chū', tm: 'çykmak', pos: 'v.' },
    ],
    grammar: [
      {
        title: 'ZH, CH, SH, R — Gaýtalanýan sesler',
        rule: 'Bu seslerde diliniň ujy gatnaşýar (gaýtalaýar). ZH — boňluk ýok, CH — boňluk gyzgyn, SH — gyçyrdawukli, R — burunly. Z/C/S bilen tapawutlandyrzaha möhümdir!',
        examples: [
          { cn: '是 shì', pinyin: 'shì', tm: 'bolmak' },
          { cn: '吃 chī', pinyin: 'chī', tm: 'iýmek' },
          { cn: '人 rén', pinyin: 'rén', tm: 'adam' },
          { cn: '中 zhōng', pinyin: 'zhōng', tm: 'orta' },
        ],
      },
      {
        title: 'Z/C/S vs ZH/CH/SH · 平舌与翘舌对比',
        rule: 'Z — dil kennyar, ZH — dil gaýralar. Bu tapawut örän möhümdir: "sān" (üç) vs "shān" (dag); "zì" (harf) vs "zhì" (bilýär).',
        examples: [
          { cn: '三 sān vs 山 shān', pinyin: 'sān / shān', tm: 'üç / dag' },
          { cn: '字 zì vs 知 zhī', pinyin: 'zì / zhī', tm: 'harf / bilmek' },
          { cn: '从 cóng vs 虫 chóng', pinyin: 'cóng / chóng', tm: 'dan / möjek' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'shì näme?', options: ['是 (bolmak)', '吃 (iýmek)', '人 (adam)', '中 (orta)'], correct: 0 },
      { type: 'select', question: 'rén näme?', options: ['人 (adam)', '是 (bolmak)', '吃 (iýmek)', '中 (orta)'], correct: 0 },
      { type: 'select', question: 'chī näme?', options: ['中 (orta)', '人 (adam)', '吃 (iýmek)', '是 (bolmak)'], correct: 2 },
      { type: 'translate', question: 'adam = _____________', answer: '人 (rén)' },
    ],
    culture: [
      {
        title: 'Gaýralar we dialekt · 方言与卷舌音',
        content: 'Hýtawň dürli dialektlerinde ZH/CH/SH durmuş ýaly. Beýleki beýleki dialektde "shì" — "s" diýlip aýdylýar. Emmaka putauk dilinde ZH/CH/SH dogry okalýar!',
      },
    ],
    selfCheck: [
      'ZH, CH, SH, R-i dogry okap bilýärsiňiz · 能正确读 ZH, CH, SH, R',
      'Z/C/S we ZH/CH/SH-i tapawutlandyryp bilýärsiňiz · 能区分平舌和翘舌',
      '"shì" ("bolmak") düzümini bilýärsiňiz · 知道"是"的用法',
    ],
  },

  // ========================================
  // Lesson 8: Y, W + Gaýtalama (半元音与复习)
  // ========================================
  8: {
    id: 8,
    part: 1,
    title: 'Y, W + Gaýtalama',
    titleCn: '半元音 Y, W 与复习',
    emoji: '🔄',
    objectives: ['Ýarym ses', 'Gaýtalama'],
    warmup: [
      { tm: 'Y we W — ýarym sesleri (semi-vowel).', cn: 'Y 和 W 是半元音。' },
      { tm: 'Bu sapakda öňki 7 sapagy gaýtalars.', cn: '这节课复习前7课。' },
    ],
    vocab: [
      { hanzi: '一', pinyin: 'yī', tm: 'bir', pos: 'num.' },
      { hanzi: '五', pinyin: 'wǔ', tm: 'bäş', pos: 'num.' },
      { hanzi: '有', pinyin: 'yǒu', tm: 'ewnerlik', pos: 'v.' },
      { hanzi: '我', pinyin: 'wǒ', tm: 'men', pos: 'pron.' },
      { hanzi: '也', pinyin: 'yě', tm: 'hem', pos: 'adv.' },
      { hanzi: '为', pinyin: 'wèi', tm: 'üçin', pos: 'prep.' },
    ],
    grammar: [
      {
        title: 'Y we W — Ýarym sesleri',
        rule: 'Y we W — Shemy ýarym sesler. Olar ýönekeý shengma däl, ýöne yunmyň başlanyşyna göniýeten gök edýär: "yī" (i), "wū" (u), "yü" (ü).',
        examples: [
          { cn: '一 yī', pinyin: 'yī', tm: 'bir' },
          { cn: '五 wǔ', pinyin: 'wǔ', tm: 'bäş' },
          { cn: '有 yǒu', pinyin: 'yǒu', tm: 'bar' },
          { cn: '我 wǒ', pinyin: 'wǒ', tm: 'men' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'yī näme?', options: ['一 (bir)', '五 (bäş)', '我 (men)', '有 (bar)'], correct: 0 },
      { type: 'select', question: 'wǒ näme?', options: ['我 (men)', '一 (bir)', '五 (bäş)', '有 (bar)'], correct: 0 },
      { type: 'translate', question: 'men = _____________', answer: '我 (wǒ)' },
    ],
    culture: [
      {
        title: 'Hýtaw ses ulgamyň gysga gysga · 汉语语音系统总结',
        content: 'Esasy Bölümde 6 danly shengmu (b,p,m,f,d,t,n,l,g,k,h,j,q,x,z,c,s,zh,ch,sh,r,y,w) we 6 danly yunmu (a,o,e,i,u,ü) öwrendiňiz. Indi pinyin döredip bilýärsiňiz!',
      },
    ],
    selfCheck: [
      'Y we W-i dogry okap bilýärsiňiz · 能正确读 Y 和 W',
      '21 shengmyň esasy bölegini bilýärsiňiz · 知道21个声母的主要分类',
      'Pinyin döredip bilýärsiňiz · 能拼读音节',
    ],
  },

  // ========================================
  // Lesson 9: Ai, Ei, Ao, Ou (复韵母)
  // ========================================
  9: {
    id: 9,
    part: 1,
    title: 'Ai, Ei, Ao, Ou',
    titleCn: '复韵母：Ai, Ei, Ao, Ou',
    emoji: '🌊',
    objectives: ['Goşma yunmu', 'Boňluk'],
    warmup: [
      { tm: 'Goşma yunmu — 2 ýa 3 danly birikmesi.', cn: '复韵母 — 两个或三个元音的组合。' },
    ],
    vocab: [
      { hanzi: '爱', pinyin: 'ài', tm: 'söýmek', pos: 'v.' },
      { hanzi: '北', pinyin: 'běi', tm: 'demirgazyk', pos: 'n.' },
      { hanzi: '好', pinyin: 'hǎo', tm: 'gowy', pos: 'adj.' },
      { hanzi: '头', pinyin: 'tóu', tm: 'kelle', pos: 'n.' },
      { hanzi: '来', pinyin: 'lái', tm: 'gelmek', pos: 'v.' },
      { hanzi: '给', pinyin: 'gěi', tm: 'bermek', pos: 'v.' },
    ],
    grammar: [
      {
        title: '1. Ai, Ei, Ao, Ou · 复韵母',
        rule: 'Goşma yunmu — 2 ýa 3 danly birikmesi. Okalanda bir sözdän beýleke geçýär, ýöne bir ses hökmünde duýýar.',
        examples: [
          { cn: '爱 ài', pinyin: 'ài', tm: 'söýmek' },
          { cn: '北 běi', pinyin: 'běi', tm: 'demirgazyk' },
          { cn: '好 hǎo', pinyin: 'hǎo', tm: 'gowy' },
          { cn: '头 tóu', pinyin: 'tóu', tm: 'kelle' },
        ],
      },
      {
        title: '2. J/Q/X we goşma yunmu · 与复韵母的拼合',
        rule: 'J, Q, X hem goşma yunmu bilen birişip ýazylýar: jiā (öý), qù (gitmek), xiè (sag boluň).',
        examples: [
          { cn: '家 jiā', pinyin: 'jiā', tm: 'öý' },
          { cn: '写 xiě', pinyin: 'xiě', tm: 'ýazmak' },
          { cn: '六 liù', pinyin: 'liù', tm: 'alty' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'ài näme?', options: ['爱 (söýmek)', '北 (demirgazyk)', '好 (gowy)', '头 (kelle)'], correct: 0 },
      { type: 'select', question: 'hǎo näme?', options: ['头 (kelle)', '好 (gowy)', '爱 (söýmek)', '北 (demirgazyk)'], correct: 1 },
      { type: 'translate', question: 'gelmek = _____________', answer: '来 (lái)' },
    ],
    culture: [
      {
        title: '"ài" (爱) — Söýgi · "爱"——爱',
        content: '"ài" hýtawçeda iň wajyp sözlerden biri. "Wo ài ni" — "Meni seni söýýärin". Emmaka hýtawçeda bu söz köp ulanylýar: ài chī (iýmek), ài kàn (görmek), we ş.m.',
      },
    ],
    selfCheck: [
      'Ai, Ei, Ao, Ou-ny dogry okap bilýärsiňiz · 能正确读 Ai, Ei, Ao, Ou',
      'Goşma yunmu bilen pinyin döredip bilýärsiňiz · 能用复韵母拼读音节',
      '"ài" we "hǎo" -i terjime edip bilýärsiňiz · 能翻译 ài 和 hǎo',
    ],
  },

  // ========================================
  // Lesson 10: An, En, In, Ang, Eng (鼻韵母)
  // ========================================
  10: {
    id: 10,
    part: 1,
    title: 'An, En, In, Ang, Eng',
    titleCn: '鼻韵母：An, En, In, Ang, Eng',
    emoji: '👃',
    objectives: ['Burun yunmu', 'Esasy Bölüm gaýtalama'],
    warmup: [
      { tm: 'Burun yunmu — n we ng bilen gutarylan sesler.', cn: '鼻韵母 — 以 n 和 ng 结尾的音。' },
    ],
    vocab: [
      { hanzi: '安', pinyin: 'ān', tm: 'howpsuzlyk', pos: 'adj.' },
      { hanzi: '门', pinyin: 'mén', tm: 'gapy', pos: 'n.' },
      { hanzi: '金', pinyin: 'jīn', tm: 'altyn', pos: 'n.' },
      { hanzi: '忙', pinyin: 'máng', tm: 'iş', pos: 'adj.' },
      { hanzi: '等', pinyin: 'děng', tm: 'garaşmak', pos: 'v.' },
      { hanzi: '山', pinyin: 'shān', tm: 'dag', pos: 'n.' },
    ],
    grammar: [
      {
        title: '1. n bilen gutarylan yunmu · 前鼻音',
        rule: 'An, En, In, Un, Ün — dil kennyar bilen diş bilen artyşýar (n). Bu sesler "ýogyn" we "ýarym" bolmagy bilen gutarylýar.',
        examples: [
          { cn: '安 ān', pinyin: 'ān', tm: 'howpsuz' },
          { cn: '门 mén', pinyin: 'mén', tm: 'gapy' },
          { cn: '金 jīn', pinyin: 'jīn', tm: 'altyn' },
        ],
      },
      {
        title: '2. ng bilen gutarylan yunmu · 后鼻音',
        rule: 'Ang, Eng, Ing, Ong — dil gat bilen bogaz arkasy bilen artyşýar (ng). Bu sesler has uzyn we gaty.',
        examples: [
          { cn: '忙 máng', pinyin: 'máng', tm: 'işli' },
          { cn: '等 děng', pinyin: 'děng', tm: 'garaşmak' },
          { cn: '山 shān', pinyin: 'shān', tm: 'dag (n bilen)' },
          { cn: '上 shàng', pinyin: 'shàng', tm: 'ýokary (ng bilen)' },
        ],
      },
    ],
    exercises: [
      { type: 'select', question: 'mén näme?', options: ['门 (gapy)', '安 (howpsuz)', '金 (altyn)', '忙 (işli)'], correct: 0 },
      { type: 'select', question: 'máng näme?', options: ['忙 (işli)', '门 (gapy)', '安 (howpsuz)', '山 (dag)'], correct: 0 },
      { type: 'select', question: 'shān näme?', options: ['山 (dag)', '上 (ýokary)', '等 (garaşmak)', '金 (altyn)'], correct: 0 },
      { type: 'translate', question: 'gapy = _____________', answer: '门 (mén)' },
    ],
    culture: [
      {
        title: 'Esasy Bölüm tamamlandy! · 基础篇完成！',
        content: 'Gutarnyk — siz Esasy Bölümüni tamapladyňiz! 10 sapakda pinyin ulgamy, 21 shengmu, 6 danly yunmu, we 150+ sözlük öwrendiňiz. Indi Başlangyç Bölüme geçip bilersiňiz!',
      },
    ],
    selfCheck: [
      'n we ng bilen gutarylan yunmu dogry okap bilýärsiňiz · 能正确读 n 和 ng 结尾的韵母',
      'Esasy Bölüm (10 sapak) -yň mazmunyny bilýärsiňiz · 掌握基础篇（10课）的内容',
      'Pinyin bilen sözleri okap bilýärsiňiz · 能用拼认读生词',
    ],
  },
};

// Course structure metadata
export const courseStructure = {
  parts: [
    {
      id: 1,
      title: 'Esasy Bölüm',
      titleCn: '基础篇',
      subtitle: 'Pinyin ulgamy, sesler, ýazylyş · 拼音系统、声调、基础会话',
      lessonIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      level: 'HSK 1',
      color: 'from-duoligo-green to-emerald-500',
    },
    {
      id: 2,
      title: 'Başlangyç Bölüm',
      titleCn: '入门篇',
      subtitle: 'Gündelik söwda-saraýlar · 日常会话',
      lessonIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      level: 'HSK 1-2',
      color: 'from-duoligo-blue to-blue-500',
    },
    {
      id: 3,
      title: 'Başlangyç-dereje',
      titleCn: '初级篇',
      subtitle: 'Gündelik meseleler, okuma we ýazma · 生活场景、阅读写作',
      lessonIds: [],
      level: 'HSK 2-3',
      color: 'from-duoligo-purple to-purple-500',
    },
    {
      id: 4,
      title: 'Orta Bölüm',
      titleCn: '中级篇',
      subtitle: 'Kompleks başarnyk · 综合能力提升',
      lessonIds: [],
      level: 'HSK 3-4',
      color: 'from-duoligo-orange to-orange-500',
    },
    {
      id: 5,
      title: 'Iş Bölüm',
      titleCn: '商务篇',
      subtitle: 'Iş durumlary · 商务场景专项',
      lessonIds: [],
      level: 'HSK 4+',
      color: 'from-duoligo-red to-red-500',
    },
  ],
};

export function getLessonData(id: number): LessonData | undefined {
  return lessonsData[id] ?? part2Lessons[id];
}
