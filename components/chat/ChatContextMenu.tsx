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
import type { MessageResponse } from 'stream-chat';

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
  message: MessageResponse;
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

  useEffect(() => {
    if (!position) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    setTimeout(() => document.addEventListener('mousedown', handleClick), 0);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [position, onClose]);

  if (!position) return null;

  const items = [
    { icon: <MessageSquare className='w-4 h-4' />, label: 'Reply', onClick: onReply, show: true },
    { icon: <Pencil className='w-4 h-4' />, label: 'Edit', onClick: onEdit, show: isOwn },
    { icon: <Forward className='w-4 h-4' />, label: 'Forward', onClick: onForward, show: true },
    { icon: <CheckSquare className='w-4 h-4' />, label: 'Select', onClick: onSelect, show: true },
    { icon: <Copy className='w-4 h-4' />, label: 'Copy Text', onClick: onCopy, show: true },
    { icon: <Pin className='w-4 h-4' />, label: 'Pin', onClick: onPin, show: canPin },
    { icon: <Trash2 className='w-4 h-4' />, label: 'Delete', onClick: onDelete, show: canDelete, danger: true },
  ];

  const menuW = 180;
  const menuH = items.filter((i) => i.show).length * 41;
  const x = position.x + menuW > window.innerWidth ? position.x - menuW : position.x;
  const y = position.y + menuH > window.innerHeight ? position.y - menuH : position.y;

  return (
    <div
      ref={ref}
      className='fixed z-[60] min-w-[180px] bg-white dark:bg-[#2c2c2e] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#3a3a3c] py-1 overflow-hidden'
      style={{ top: y, left: x }}
    >
      {items
        .filter((i) => i.show)
        .map((item) => (
          <button
            key={item.label}
            onClick={() => { item.onClick(); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
              (item as any).danger
                ? 'text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a]'
                : 'text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c]'
            }`}
          >
            <span className='text-[#8e8e93]'>{item.icon}</span>
            {item.label}
          </button>
        ))}
    </div>
  );
}
