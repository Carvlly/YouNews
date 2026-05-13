'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { NewsSource, Feed } from '@/lib/types';

interface NewsColumnProps {
  source: NewsSource;
}

export function NewsColumn({ source }: NewsColumnProps) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/rss?url=${encodeURIComponent(source.url)}`);
      if (!res.ok) throw new Error('Failed to fetch feed');
      const data = await res.json();
      setFeed(data);
    } catch (err) {
      console.error(err);
      setError('Error loading feed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [source.url]);

  return (
    <div className="flex flex-col h-full bg-bg-base">
      {/* Column Header */}
      <div className="sticky top-0 z-10 bg-bg-header px-4 py-3 border-b border-border-base flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-mono font-bold text-accent text-xs flex items-center uppercase tracking-wider">
            {source.name}
          </h2>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-hover text-accent uppercase">Feed Active</span>
        </div>
        <button 
          onClick={fetchFeed} 
          disabled={loading}
          className="p-1 hover:bg-bg-hover rounded transition-colors text-text-tertiary hover:text-text-primary disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-0 py-0 flex flex-col min-h-0 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border-b border-border-base">
                <div className="h-3 w-2/5 mb-2 hd-skeleton"></div>
                <div className="h-[18px] w-11/12 mb-2 hd-skeleton"></div>
                <div className="h-3.5 w-full mb-1 hd-skeleton"></div>
                <div className="h-3.5 w-4/5 hd-skeleton"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-secondary">
            <p className="mb-2">{error}</p>
            <button onClick={fetchFeed} className="text-accent hover:underline text-sm font-mono">Try again</button>
          </div>
        ) : feed?.items.length === 0 ? (
          <div className="h-full flex items-center justify-center text-text-secondary text-sm font-mono">
            No articles found.
          </div>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence>
              {feed?.items.map((item, index) => {
                // Determine relative time
                let relativeTime = '';
                try {
                  const date = new Date(item.pubDate);
                  if (!isNaN(date.getTime())) {
                    relativeTime = formatDistanceToNow(date, { addSuffix: true, locale: ja });
                  }
                } catch (e) {
                  // Fallback if parsing fails
                  relativeTime = item.pubDate;
                }

                return (
                  <motion.a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                    className="block group p-4 border-b border-border-base hover:bg-bg-hover transition-colors"
                  >
                    <div className="flex items-center text-[11px] font-mono text-text-tertiary mb-2 gap-2">
                       <span>{relativeTime}</span>
                       <span>•</span>
                       <span>{new URL(item.link || 'http://localhost').hostname.replace('www.', '')}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold leading-[1.4] mb-1.5 group-hover:text-text-primary text-text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[12px] text-text-secondary leading-[1.5] line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
