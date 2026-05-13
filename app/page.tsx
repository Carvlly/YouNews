'use client';

import { useState, useEffect } from 'react';
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

  let gridColsClass = "grid-cols-1";
  if (selectedSources.length === 2) gridColsClass = "sm:grid-cols-2";
  else if (selectedSources.length >= 3) gridColsClass = "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex flex-col h-screen bg-bg-base overflow-hidden">
      {/* App Header */}
      <header className="h-[64px] shrink-0 border-b border-border-base bg-bg-base px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-[12px] text-text-primary">
          <div className="w-[32px] h-[32px] bg-accent rounded flex items-center justify-center text-accent-fg font-bold">
            Y
          </div>
          <div className="font-mono text-[20px] font-bold text-text-primary">
            YouNews <span className="font-normal opacity-50 text-[14px]">/ v1.0.4</span>
          </div>
        </div>
        
        <div className="flex gap-[20px] items-center">
          <ThemeToggle />
          <SourceSelector 
            selectedSourceIds={selectedIds}
            onChange={handleSourceChange}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-x-auto overflow-y-hidden`}>
        <div className={`h-full min-w-full grid ${gridColsClass} divide-y sm:divide-y-0 sm:divide-x divide-border-base`}>
          {selectedSources.map((source) => (
            <div key={source.id} className="h-full min-w-[320px]">
              <NewsColumn source={source} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
