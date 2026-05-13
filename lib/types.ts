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
}

// 組み込みのプリセットニュースサイト
export const PRESET_SOURCES: NewsSource[] = [
  // 日本メディア
  { id: 'nhk', name: 'NHK', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml' },
  { id: 'asahi', name: '朝日新聞', url: 'https://www.asahi.com/rss/asahi/newsheadlines.rdf' },
  { id: 'itmedia', name: 'ITmedia', url: 'https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml' },
  { id: 'gigazine', name: 'Gigazine', url: 'https://gigazine.net/news/rss_2.0/' },
  { id: 'zenn', name: 'Zenn (トレンド)', url: 'https://zenn.dev/feed' },
  // 海外メディア
  { id: 'bbc', name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
  { id: 'reuters', name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { id: 'theverge', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { id: 'hackernews', name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
];
