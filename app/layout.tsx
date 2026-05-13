import type {Metadata} from 'next';
import { JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
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
    <html lang="ja" className={`${jetbrainsMono.variable} ${notoSansJP.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-bg-base text-text-primary min-h-screen antialiased selection:bg-accent selection:text-accent-fg" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
