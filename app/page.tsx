"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PRESET_SOURCES } from "@/lib/types";
import { SourceSelector } from "@/components/SourceSelector";
import { NewsColumn } from "@/components/NewsColumn";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import Cookies from "js-cookie";

const COOKIE_KEY = "younews_sources";
const DEFAULT_SOURCES = ["nhk", "techcrunch"];

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = Cookies.get(COOKIE_KEY);
    if (saved !== undefined) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedIds(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cookie", e);
      }
    }
    // Default fallback
    setSelectedIds(DEFAULT_SOURCES);
  }, []);

  const handleSourceChange = (newIds: string[]) => {
    setSelectedIds(newIds);
    Cookies.set(COOKIE_KEY, JSON.stringify(newIds), {
      expires: 365,
      path: "/",
    });
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-t-2 border-accent animate-spin"></div>
      </div>
    );
  }

  const selectedSources = PRESET_SOURCES.filter((s) =>
    selectedIds.includes(s.id),
  );

  return (
    <div className="flex flex-col h-screen bg-bg-base overflow-hidden">
      {/* App Header */}
      <header className="h-[64px] shrink-0 border-b border-border-base bg-bg-base px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="relative flex items-center min-w-0">
          <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 mix-blend-multiply dark:mix-blend-lighten opacity-80 z-0 -ml-2 sm:-ml-1">
            <Image
              src="/logo.png"
              alt="YouNews Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain dark:invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-mono text-[16px] sm:text-[20px] font-bold text-text-primary z-10 truncate">
            YouNews{" "}
            <span className="hidden sm:inline font-normal opacity-50 text-[14px]">
              / v1.1.0
            </span>
          </h1>
        </div>

        <div className="flex gap-[8px] sm:gap-[20px] items-center shrink-0">
          <Link
            href="/about"
            className="text-[10px] sm:text-[12px] font-mono text-text-secondary hover:text-accent uppercase transition-colors"
          >
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
          const isScrollableColumn = (e.target as HTMLElement).closest(
            ".custom-scrollbar",
          );
          if (!isScrollableColumn) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
      >
        {selectedSources.length === 0 ? (
          <div className="h-full w-full flex flex-col items-center justify-center px-4">
            <Image
              src="/logo.png"
              alt="YouNews Logo"
              width={192}
              height={192}
              className="w-32 h-32 sm:w-48 sm:h-48 object-contain opacity-50 mb-6 mix-blend-multiply dark:mix-blend-lighten dark:invert"
              referrerPolicy="no-referrer"
            />
            <p className="text-text-secondary font-mono text-xs sm:text-sm uppercase tracking-widest text-center">
              Select sources to start reading
            </p>
          </div>
        ) : (
          <div className="flex h-full min-w-full w-max divide-x divide-border-base">
            {selectedSources.map((source) => (
              <div
                key={source.id}
                className="w-[100vw] sm:w-[320px] sm:flex-1 sm:min-w-[320px] sm:max-w-none h-full flex-shrink-0 snap-start"
              >
                <NewsColumn source={source} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
