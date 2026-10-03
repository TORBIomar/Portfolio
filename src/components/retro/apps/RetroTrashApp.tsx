import React, { useState } from 'react';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

interface TrashItem {
  id: string;
  name: string;
  size: string;
  date: string;
}

const INITIAL_TRASH_ITEMS: TrashItem[] = [
  { id: '1', name: 'Legacy Monoliths.bak', size: '48.2 MB', date: 'Yesterday' },
  { id: '2', name: 'Manual Bash Deployments.sh', size: '12 KB', date: '3 days ago' },
  { id: '3', name: 'N+1 Database Queries.sql', size: '104 KB', date: 'Last week' },
  { id: '4', name: 'Hardcoded API Secrets.env', size: '2 KB', date: 'Purged' },
  { id: '5', name: 'Unindexed Slow Queries.log', size: '18.4 MB', date: 'Archived' },
];

export const RetroTrashApp: React.FC = () => {
  const [items, setItems] = useState<TrashItem[]>(INITIAL_TRASH_ITEMS);

  const handleEmpty = () => {
    retroSound.playPaperCrumple();
    setItems([]);
  };

  const handleRestore = () => {
    retroSound.playFloppySeek();
    setItems(INITIAL_TRASH_ITEMS);
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED] text-black font-screen text-xs p-3 overflow-hidden select-none">
      {/* Top Banner */}
      <div className="p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000] mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RetroIcon name={items.length > 0 ? 'trash' : 'trash'} size={24} />
          <div>
            <h1 className="font-bold text-xs">System Trash Can</h1>
            <p className="text-[10px] text-neutral-500">
              {items.length > 0 ? `${items.length} items awaiting deletion` : 'Trash is currently empty'}
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <button
            onClick={handleEmpty}
            className="px-4 py-2 my-1 bg-black text-white hover:bg-neutral-800 border-2 border-black font-bold text-xs shadow-[2px_2px_0px_#000] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            Empty Trash
          </button>
        ) : (
          <button
            onClick={handleRestore}
            className="px-4 py-2 my-1 bg-white hover:bg-neutral-100 border border-black font-bold text-xs cursor-pointer shadow-xs"
          >
            Restore Demo Items
          </button>
        )}
      </div>

      {/* Trash Contents Table */}
      <div className="flex-1 bg-white border-2 border-black overflow-y-auto">
        {items.length > 0 ? (
          <div className="divide-y divide-neutral-200">
            <div className="flex bg-[#F5F5F5] font-bold text-[10px] uppercase text-neutral-600 px-3 py-1.5 border-b border-black">
              <span className="flex-1">Discarded Artifact</span>
              <span className="w-24 text-right">Size</span>
              <span className="w-28 text-right">Date Dumped</span>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center px-3 py-2 hover:bg-[#F9F9F9] transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-neutral-400 font-mono">🗑</span>
                  <span className="font-mono text-xs text-neutral-800 truncate">{item.name}</span>
                </div>
                <span className="w-24 text-right font-mono text-[11px] text-neutral-500">
                  {item.size}
                </span>
                <span className="w-28 text-right font-mono text-[11px] text-neutral-500">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <RetroIcon name="trash" size={48} />
            <h3 className="font-bold text-sm mt-3 text-neutral-800">Trash is completely clean!</h3>
            <p className="text-[11px] text-neutral-500 max-w-sm mt-1">
              Zero anti-patterns, zero memory leaks, and zero legacy bugs in Omar Torbi's production architecture.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 text-[10px] text-neutral-600 font-mono flex justify-between">
        <span>Files deleted from Trash cannot be recovered.</span>
        <span>OmarOS Clean Storage Protocol</span>
      </div>
    </div>
  );
};
