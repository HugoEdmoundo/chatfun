'use client';

import { useCallback, useRef, useEffect } from 'react';

const EMOJIS = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
  '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗',
  '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
  '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
  '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤',
  '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🥴', '😵',
  '🤯', '🤠', '🥳', '🥺', '😢', '😭', '😤', '😠',
  '😡', '🤬', '🤡', '💩', '👻', '💀', '☠️', '👽',
  '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌',
  '👐', '🤲', '🤝', '🙏', '✌️', '🤞', '🤟', '🤘',
  '👌', '✅', '❌', '❤️', '🧡', '💛', '💚', '💙',
  '💜', '🖤', '🤍', '💔', '💯', '🔥', '⭐', '🎉',
  '🎊', '🎈', '🎁', '🎂', '🍕', '🍔', '🌮', '🍣',
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSelect = useCallback((emoji: string) => {
    onSelect(emoji);
    onClose();
  }, [onSelect, onClose]);

  return (
    <div
      ref={ref}
      className='absolute bottom-full left-0 mb-2 z-50 bg-white dark:bg-[#17212b] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#1f2c38] p-3'
    >
      <div className='grid grid-cols-8 gap-1 max-h-48 overflow-y-auto'>
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleSelect(emoji)}
            className='w-8 h-8 flex items-center justify-center text-lg hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] rounded-lg transition-colors'
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
