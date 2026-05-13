export interface FeedItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export interface Feed {
  title: string;
  items: FeedItem[];
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  region: 'japan' | 'international';
}

// 組み込みのプリセットニュースサイト
export const PRESET_SOURCES: NewsSource[] = [
  // 日本メディア
  { id: 'nhk', name: 'NHK', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml', region: 'japan' },
  { id: 'asahi', name: '朝日新聞', url: 'https://www.asahi.com/rss/asahi/newsheadlines.rdf', region: 'japan' },
  { id: 'itmedia', name: 'ITmedia', url: 'https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml', region: 'japan' },
  { id: 'gigazine', name: 'Gigazine', url: 'https://gigazine.net/news/rss_2.0/', region: 'japan' },
  { id: 'zenn', name: 'Zenn (トレンド)', url: 'https://zenn.dev/feed', region: 'japan' },
  { id: 'impress', name: 'Impress Watch', url: 'https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf', region: 'japan' },
  { id: 'pcwatch', name: 'PC Watch', url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf', region: 'japan' },
  { id: 'avwatch', name: 'AV Watch', url: 'https://av.watch.impress.co.jp/data/rss/1.0/avw/feed.rdf', region: 'japan' },
  { id: 'internetwatch', name: 'INTERNET Watch', url: 'https://internet.watch.impress.co.jp/data/rss/1.0/iw/feed.rdf', region: 'japan' },
  { id: 'publickey', name: 'Publickey', url: 'https://www.publickey1.jp/atom.xml', region: 'japan' },
  // 海外メディア
  { id: 'bbc', name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', region: 'international' },
  { id: 'reuters', name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', region: 'international' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', region: 'international' },
  { id: 'theverge', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', region: 'international' },
  { id: 'hackernews', name: 'Hacker News', url: 'https://hnrss.org/frontpage', region: 'international' },
];
