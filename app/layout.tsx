import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hýtay Dili Okuw Kitaby | 土库曼语中文学习教材',
  description: '从拼音到 HSK 4 级，土库曼语讲解的中文学习教材。Duolingo 风格互动学习。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tk">
      <body>{children}</body>
    </html>
  );
}
