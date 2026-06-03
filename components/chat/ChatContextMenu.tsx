'use client';

import { useEffect, useRef } from 'react';
import {
  MessageSquare,
  Pencil,
  Trash2,
  Forward,
  CheckSquare,
  Copy,
  Pin,
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  show: boolean;
  danger?: boolean;
}

function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, onClose: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);
    document.addEventListener('keydown', handleEsc);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [active, onClose, ref]);
}

export function ChatContextMenu({
  message,
  isOwn,
  canDelete,
  canPin,
  position,
  onClose,
  onReply,
  onEdit,
  onDelete,
  onForward,
  onSelect,
  onCopy,
  onPin,
}: {
  message: any;
  isOwn: boolean;
  canDelete: boolean;
  canPin: boolean;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onForward: () => void;
  onSelect: () => void;
  onCopy: () => void;
  onPin: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, onClose, !!position);

  if (!position) return null;

  const items: (MenuItem & { danger?: boolean })[] = [
    { icon: <MessageSquare className='w-4 h-4' />, label: 'Reply', onClick: onReply, show: true },
    { icon: <Pencil className='w-4 h-4' />, label: 'Edit', onClick: onEdit, show: isOwn },
    { icon: <Forward className='w-4 h-4' />, label: 'Forward', onClick: onForward, show: true },
    { icon: <CheckSquare className='w-4 h-4' />, label: 'Select', onClick: onSelect, show: true },
    { icon: <Copy className='w-4 h-4' />, label: 'Copy Text', onClick: onCopy, show: true },
    { icon: <Pin className='w-4 h-4' />, label: 'Pin', onClick: onPin, show: canPin },
    { icon: <Trash2 className='w-4 h-4' />, label: 'Delete', onClick: onDelete, show: canDelete, danger: true },
  ];

  const visibleItems = items.filter((i) => i.show);
  const menuW = 180;
  const menuH = visibleItems.length * 41;
  const left = position.x + menuW > window.innerWidth ? position.x - menuW : position.x;
  const top = position.y + menuH > window.innerHeight ? position.y - menuH : position.y;

  return (
    <div
      ref={ref}
      className='fixed z-[60] min-w-[180px] bg-white dark:bg-[#17212b] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#1f2c38] py-1 overflow-hidden'
      style={{ top, left }}
    >
      {visibleItems.map((item) => (
        <button
          key={item.label}
          onClick={() => { item.onClick(); onClose(); }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
            item.danger
              ? 'text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a]'
              : 'text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c]'
          }`}
        >
          <span className='text-[#8e8e93] dark:text-[#8e9299]'>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
