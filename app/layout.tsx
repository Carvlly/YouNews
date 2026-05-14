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
  title: {
    default: 'YouNews - High Density News Reader',
    template: '%s | YouNews',
  },
  description: 'パーソナルマルチニューススペース。あなたのお気に入りの様々なニュースソースやRSSフィードをまとめて、高密度なレイアウトで読みやすく提供します。',
  keywords: ['news', 'rss', 'feed', 'reader', 'YouNews', 'ニュースリーダー', 'テクノロジー'],
  authors: [{ name: 'YouNews Team' }],
  creator: 'YouNews Team',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://younews.example.com',
    title: 'YouNews - High Density News Reader',
    description: 'パーソナルマルチニューススペース。あなたのお気に入りの様々なニュースソースやRSSフィードをまとめて、高密度なレイアウトで読みやすく提供します。',
    siteName: 'YouNews',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'YouNews Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'YouNews - High Density News Reader',
    description: 'パーソナルマルチニューススペース。お気に入りのニュースソースを一つの画面にまとめて表示します。',
    images: ['/logo.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YouNews',
    url: 'https://younews.example.com',
    description: 'パーソナルマルチニューススペース。あなたのお気に入りの様々なニュースソースやRSSフィードをまとめて、高密度なレイアウトで読みやすく提供します。',
    publisher: {
      '@type': 'Organization',
      name: 'YouNews Team',
      logo: {
        '@type': 'ImageObject',
        url: 'https://younews.example.com/logo.png'
      }
    }
  };

  return (
    <html lang="ja" className={`${jetbrainsMono.variable} ${notoSansJP.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-bg-base text-text-primary min-h-screen antialiased selection:bg-accent selection:text-accent-fg" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
