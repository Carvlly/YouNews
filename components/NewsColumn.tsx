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
    <div className="flex flex-col h-full bg-[#0f0f0f]">
      {/* Column Header */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f]/90 backdrop-blur-md px-4 py-3 border-b border-[#2a2a2a] flex items-center justify-between">
        <h2 className="font-mono font-bold text-[#e8e8e8] text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
          {source.name}
        </h2>
        <button 
          onClick={fetchFeed} 
          disabled={loading}
          className="p-1.5 hover:bg-[#2a2a2a] rounded-md transition-colors text-gray-400 hover:text-white disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 custom-scrollbar">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-xl p-4 animate-pulse border border-[#2a2a2a]/50">
                <div className="h-5 bg-[#2a2a2a] rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-[#2a2a2a] rounded w-full mb-2"></div>
                <div className="h-4 bg-[#2a2a2a] rounded w-5/6 mb-4"></div>
                <div className="h-3 bg-[#2a2a2a] rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
            <p className="mb-2">{error}</p>
            <button onClick={fetchFeed} className="text-[#4ade80] hover:underline text-sm font-mono">Try again</button>
          </div>
        ) : feed?.items.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm font-mono">
            No articles found.
          </div>
        ) : (
          <div className="space-y-4">
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                    className="block group bg-[#1a1a1a] hover:bg-[#222222] rounded-xl p-5 transition-colors"
                  >
                    <h3 className="text-[#e8e8e8] font-bold leading-tight mb-2 group-hover:text-[#4ade80] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                      <span>{relativeTime}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
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
