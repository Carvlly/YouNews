'use client';

import { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { PRESET_SOURCES, NewsSource } from '@/lib/types';
import Cookies from 'js-cookie';

interface SourceSelectorProps {
  selectedSourceIds: string[];
  onChange: (newIds: string[]) => void;
}

export function SourceSelector({ selectedSourceIds, onChange }: SourceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelection, setLocalSelection] = useState<string[]>([]);

  useEffect(() => {
    setLocalSelection(selectedSourceIds);
  }, [selectedSourceIds]);

  const handleToggle = (id: string) => {
    setLocalSelection((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onChange(localSelection);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-bg-card border border-accent text-accent px-[16px] py-[6px] text-[12px] rounded uppercase font-mono hover:bg-bg-hover transition-colors cursor-pointer"
      >
        Settings
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-bg-base border border-border-base w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-base bg-bg-header">
              <h2 className="text-[12px] font-mono font-bold text-text-primary uppercase">Source Selection</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-bg-hover transition-colors text-text-tertiary hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <div className="mb-[24px]">
                <h3 className="text-[11px] font-mono text-text-secondary uppercase mb-[20px]">Japan</h3>
                <div className="flex flex-col">
                  {PRESET_SOURCES.slice(0, 5).map((source) => (
                    <label key={source.id} className="flex items-center gap-[10px] mb-[12px] text-[13px] text-text-primary cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={localSelection.includes(source.id)}
                          onChange={() => handleToggle(source.id)}
                          className="peer appearance-none w-[16px] h-[16px] border border-accent bg-bg-base rounded-[2px] cursor-pointer"
                        />
                        <svg className="absolute w-[12px] h-[12px] text-accent pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="group-hover:text-accent transition-colors">{source.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] font-mono text-text-secondary uppercase mb-[20px]">International</h3>
                <div className="flex flex-col">
                  {PRESET_SOURCES.slice(5).map((source) => (
                    <label key={source.id} className="flex items-center gap-[10px] mb-[12px] text-[13px] text-text-primary cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={localSelection.includes(source.id)}
                          onChange={() => handleToggle(source.id)}
                          className="peer appearance-none w-[16px] h-[16px] border border-accent bg-bg-base rounded-[2px] cursor-pointer"
                        />
                        <svg className="absolute w-[12px] h-[12px] text-accent pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="group-hover:text-accent transition-colors">{source.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-border-base flex justify-between items-center bg-bg-base">
              <div className="text-[10px] text-text-secondary font-mono">
                Cookies stored: {localSelection.length} sources<br/>
              </div>
              <button
                onClick={handleSave}
                className="bg-bg-card border border-accent text-accent px-[16px] py-[6px] text-[12px] rounded uppercase font-mono hover:bg-bg-hover transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
