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

export type FeedCategory = 'general' | 'tech' | 'business' | 'developer';

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  region: 'japan' | 'international';
  category: FeedCategory;
}

// 組み込みのプリセットニュースサイト
export const PRESET_SOURCES: NewsSource[] = [
  // 日本メディア
  { id: 'nhk', name: 'NHK', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml', region: 'japan', category: 'general' },
  { id: 'asahi', name: '朝日新聞', url: 'https://www.asahi.com/rss/asahi/newsheadlines.rdf', region: 'japan', category: 'general' },
  { id: 'mainichi', name: '毎日新聞', url: 'https://mainichi.jp/rss/etc/mainichi-flash.rss', region: 'japan', category: 'general' },
  { id: 'cnnjp', name: 'CNN.co.jp', url: 'https://feeds.cnn.co.jp/rss/cnn/cnn.rdf', region: 'japan', category: 'general' },
  
  { id: 'itmedia', name: 'ITmedia', url: 'https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml', region: 'japan', category: 'tech' },
  { id: 'gigazine', name: 'Gigazine', url: 'https://gigazine.net/news/rss_2.0/', region: 'japan', category: 'tech' },
  { id: 'impress', name: 'Impress Watch', url: 'https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf', region: 'japan', category: 'tech' },
  { id: 'pcwatch', name: 'PC Watch', url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf', region: 'japan', category: 'tech' },
  { id: 'avwatch', name: 'AV Watch', url: 'https://av.watch.impress.co.jp/data/rss/1.0/avw/feed.rdf', region: 'japan', category: 'tech' },
  { id: 'internetwatch', name: 'INTERNET Watch', url: 'https://internet.watch.impress.co.jp/data/rss/1.0/iw/feed.rdf', region: 'japan', category: 'tech' },
  { id: 'xtech', name: '日経クロステック', url: 'https://xtech.nikkei.com/rss/xtech-it.rdf', region: 'japan', category: 'tech' },
  
  { id: 'toyokeizai', name: '東洋経済オンライン', url: 'https://toyokeizai.net/list/feed/rss', region: 'japan', category: 'business' },
  { id: 'nikkeibusiness', name: '日経ビジネス', url: 'https://business.nikkei.com/rss/sns/nb.rdf', region: 'japan', category: 'business' },
  
  { id: 'zenn', name: 'Zenn (トレンド)', url: 'https://zenn.dev/feed', region: 'japan', category: 'developer' },
  { id: 'qiita', name: 'Qiita (人気)', url: 'https://qiita.com/popular-items/feed.atom', region: 'japan', category: 'developer' },
  { id: 'publickey', name: 'Publickey', url: 'https://www.publickey1.jp/atom.xml', region: 'japan', category: 'developer' },
  
  // 海外メディア
  { id: 'bbc', name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', region: 'international', category: 'general' },
  { id: 'reuters', name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', region: 'international', category: 'general' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', region: 'international', category: 'tech' },
  { id: 'theverge', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', region: 'international', category: 'tech' },
  { id: 'hackernews', name: 'Hacker News', url: 'https://hnrss.org/frontpage', region: 'international', category: 'developer' },
];
