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
        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg transition-colors border border-[#2a2a2a] text-sm font-mono text-[#e8e8e8]"
      >
        <Settings className="w-4 h-4 text-[#4ade80]" />
        Sources
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
              <h2 className="text-lg font-mono font-medium text-[#e8e8e8]">Select Sources</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#2a2a2a] rounded-md transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Japan</h3>
                <div className="space-y-2">
                  {PRESET_SOURCES.slice(0, 5).map((source) => (
                    <label key={source.id} className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={localSelection.includes(source.id)}
                        onChange={() => handleToggle(source.id)}
                        className="w-4 h-4 rounded border-[#4ade80] text-[#4ade80] focus:ring-[#4ade80]/50 bg-[#0f0f0f]"
                      />
                      <span className="text-sm font-medium text-[#e8e8e8]">{source.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Global</h3>
                <div className="space-y-2">
                  {PRESET_SOURCES.slice(5).map((source) => (
                    <label key={source.id} className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={localSelection.includes(source.id)}
                        onChange={() => handleToggle(source.id)}
                        className="w-4 h-4 rounded border-[#4ade80] text-[#4ade80] focus:ring-[#4ade80]/50 bg-[#0f0f0f]"
                      />
                      <span className="text-sm font-medium text-[#e8e8e8]">{source.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#0f0f0f] border-t border-[#2a2a2a] flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#4ade80] hover:bg-[#3bca6b] text-[#0f0f0f] font-mono font-medium rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
