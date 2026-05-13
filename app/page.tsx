'use client';

import { useState, useEffect } from 'react';
import { PRESET_SOURCES } from '@/lib/types';
import { SourceSelector } from '@/components/SourceSelector';
import { NewsColumn } from '@/components/NewsColumn';
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
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center">
         <div className="w-8 h-8 rounded-full border-t-2 border-[#4ade80] animate-spin"></div>
      </div>
    );
  }

  const selectedSources = PRESET_SOURCES.filter(s => selectedIds.includes(s.id));

  let gridColsClass = "grid-cols-1";
  if (selectedSources.length === 2) gridColsClass = "sm:grid-cols-2";
  else if (selectedSources.length >= 3) gridColsClass = "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex flex-col h-screen bg-[#0f0f0f] overflow-hidden">
      {/* App Header */}
      <header className="h-[64px] shrink-0 border-b border-[#2a2a2a] bg-[#0f0f0f] px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-[12px] text-[#e8e8e8]">
          <div className="w-[32px] h-[32px] bg-[#4ade80] rounded flex items-center justify-center text-[#0f0f0f] font-bold">
            Y
          </div>
          <div className="font-mono text-[20px] font-bold">
            YouNews <span className="font-normal opacity-50 text-[14px]">/ v1.0.4</span>
          </div>
        </div>
        
        <div className="flex gap-[20px] items-center">
          <div className="font-mono text-[#4ade80] text-[12px]">SYNCING: 0ms ago</div>
          <SourceSelector 
            selectedSourceIds={selectedIds}
            onChange={handleSourceChange}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-x-auto overflow-y-hidden`}>
        <div className={`h-full min-w-full grid ${gridColsClass} divide-y sm:divide-y-0 sm:divide-x divide-[#2a2a2a]`}>
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
