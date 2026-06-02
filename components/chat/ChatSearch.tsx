'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useChat } from './ChatContext';

export function ChatSearch() {
  const chat = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<number>(0);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      chat.setSearchQuery(e.target.value);
    },
    [chat]
  );

  const handleClose = useCallback(() => {
    chat.setShowSearch(false);
    chat.setSearchQuery('');
  }, [chat]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (chat.showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chat.showSearch]);

  if (!chat.showSearch) return null;

  return (
    <div className='flex items-center gap-2 px-4 py-2 border-b border-[#e5e5ea] dark:border-[#3a3a3c] bg-white dark:bg-[#1c1c1e]'>
      <Search className='w-4 h-4 text-[#8e8e93] flex-shrink-0' />
      <input
        ref={inputRef}
        type='text'
        placeholder='Search in chat...'
        value={chat.searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='flex-1 bg-transparent border-none outline-none text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93]'
      />
      <button
        onClick={handleClose}
        className='w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] text-[#8e8e93]'
      >
        <X className='w-4 h-4' />
      </button>
    </div>
  );
}
