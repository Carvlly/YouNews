import type {Metadata} from 'next';
import { JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import './globals.css'; // Global styles

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'YouNews',
  description: 'パーソナルマルチニューススペース',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja" className={`${jetbrainsMono.variable} ${notoSansJP.variable}`}>
      <body className="font-sans bg-[#0f0f0f] text-[#e8e8e8] min-h-screen antialiased selection:bg-[#4ade80] selection:text-[#0f0f0f]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
