import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '学汉语的拉丁转写 | Hýtay Dili Okuw Kitaby',
  description: '土库曼语-中文双向学习教材 | TM↔CN Textbook - Duolingo-style learning experience',
  keywords: ['中文', '土库曼语', '汉语', 'Turkmen', 'Chinese', 'textbook', 'pinyin'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tk">
      <body className="bg-white text-duolingo-text min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
