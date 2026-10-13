'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/lib/clerk-stub';
import { supabase } from '@/lib/supabase';

const products = [
  {
    id: 'pdf_part01',
    name: 'Esasy Bölüm',
    nameCn: '基础篇 PDF',
    description: '1-10 sapak — Pinyin ulgamy, 150+ sözlük',
    descriptionCn: '第1-10课 — 拼音系统、150+生词',
    price: '$9.99',
    emoji: '📘',
  },
  {
    id: 'pdf_part02',
    name: 'Başlangyç Bölüm',
    nameCn: '入门篇 PDF',
    description: '11-20 sapak — Gündelik söwba',
    descriptionCn: '第11-20课 — 日常会话',
    price: '$12.99',
    emoji: '📗',
  },
  {
    id: 'pdf_part01_02_bundle',
    name: 'Esasy + Başlangyç',
    nameCn: '基础+入门 套装',
    description: '1-20 sapak — Täsinlik bilen',
    descriptionCn: '第1-20课 — 超值套餐',
    price: '$19.99',
    emoji: '📚',
  },
];

export default function ShopPage() {
  const { user, isLoaded } = useUser();
  const [purchased, setPurchased] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('purchases')
      .select('product_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setPurchased(data.map((p: { product_id: string }) => p.product_id));
      });
  }, [user]);

  const handlePurchase = async (productId: string) => {
    if (!user) return;
    await supabase.from('purchases').insert({
      user_id: user.id,
      product_id: productId,
      purchased_at: new Date().toISOString(),
    });
    setPurchased(prev => [...prev, productId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className="w-5 h-5 text-duolingo-text" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-duolingo-text">Kitap Dükan · 教材商店</h1>
            <p className="text-xs text-duolingo-textLight">PDF kitaplary satyn alyň</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-4">
          {products.map((product, idx) => {
            const isPurchased = purchased.includes(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{product.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-duolingo-text">{product.name}</h3>
                    <p className="text-xs text-duoligo-blue">{product.nameCn}</p>
                    <p className="text-xs text-duolingo-textLight mt-1">{product.description}</p>
                    <p className="text-xs text-gray-400">{product.descriptionCn}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-duoligo-orange">{product.price}</div>
                  </div>
                </div>
                <div className="mt-4">
                  {isPurchased ? (
                    <div className="flex items-center gap-2 text-duoligo-green text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />Satyn alnan · 已购买
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePurchase(product.id)}
                      className="w-full py-3 bg-duoligo-orange text-white font-bold rounded-xl shadow-duo hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />Satyn al · 购买
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center"
        >
          <Lock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-400">Indikiler geler · 更多即将上线</p>
          <p className="text-xs text-gray-400 mt-1">Orta Bölüm, Iş Bölüm we başgalary gözläň</p>
        </motion.div>
      </main>
    </div>
  );
}
