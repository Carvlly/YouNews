'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRESET_SOURCES } from '@/lib/types';
import { SourceSelector } from '@/components/SourceSelector';
import { NewsColumn } from '@/components/NewsColumn';
import { ThemeToggle } from '@/components/ThemeToggle';
import Cookies from 'js-cookie';

const COOKIE_KEY = 'younews_sources';
const DEFAULT_SOURCES = ['nhk', 'techcrunch'];

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = Cookies.get(COOKIE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedIds(parsed);
          return;
        }
      } catch (e) {
        console.error('Failed to parse cookie', e);
      }
    }
    // Default fallback
    setSelectedIds(DEFAULT_SOURCES);
  }, []);

  const handleSourceChange = (newIds: string[]) => {
    const idsToSave = newIds.length > 0 ? newIds : DEFAULT_SOURCES;
    setSelectedIds(idsToSave);
    Cookies.set(COOKIE_KEY, JSON.stringify(idsToSave), { expires: 365, path: '/' });
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center">
         <div className="w-8 h-8 rounded-full border-t-2 border-accent animate-spin"></div>
      </div>
    );
  }

  const selectedSources = PRESET_SOURCES.filter(s => selectedIds.includes(s.id));

  return (
    <div className="flex flex-col h-screen bg-bg-base overflow-hidden">
      {/* App Header */}
      <header className="h-[64px] shrink-0 border-b border-border-base bg-bg-base px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-[8px] sm:gap-[12px] text-text-primary min-w-0">
          <div className="w-[28px] h-[28px] min-w-[28px] sm:w-[32px] sm:h-[32px] sm:min-w-[32px] bg-accent rounded flex items-center justify-center text-accent-fg font-bold text-sm sm:text-base">
            Y
          </div>
          <div className="font-mono text-[16px] sm:text-[20px] font-bold text-text-primary truncate">
            YouNews <span className="hidden sm:inline font-normal opacity-50 text-[14px]">/ v1.0.4</span>
          </div>
        </div>
        
        <div className="flex gap-[8px] sm:gap-[20px] items-center shrink-0">
          <Link href="/about" className="text-[10px] sm:text-[12px] font-mono text-text-secondary hover:text-accent uppercase transition-colors">
            About
          </Link>
          <ThemeToggle />
          <SourceSelector 
            selectedSourceIds={selectedIds}
            onChange={handleSourceChange}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        onWheel={(e) => {
          // Allow horizontal scrolling using vertical mouse wheel,
          // but don't interfere if the user is scrolling vertically inside a column
          const isScrollableColumn = (e.target as HTMLElement).closest('.custom-scrollbar');
          if (!isScrollableColumn) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
      >
        <div className="flex h-full min-w-full w-max divide-x divide-border-base">
          {selectedSources.map((source) => (
            <div key={source.id} className="w-[100vw] sm:w-[320px] sm:flex-1 sm:min-w-[320px] sm:max-w-none h-full flex-shrink-0 snap-start">
              <NewsColumn source={source} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
