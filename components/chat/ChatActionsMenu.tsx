'use client';

import { useCallback, useRef, useEffect } from 'react';
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

interface ActionItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  show: boolean;
  danger?: boolean;
}

export function ChatActionsMenu({
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
  position: { top: number; left: number } | null;
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
    setTimeout(() => document.addEventListener('click', handleClick), 0);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [position, onClose]);

  if (!position) return null;

  const actions: ActionItem[] = [
    {
      icon: <MessageSquare className='w-4 h-4' />,
      label: 'Reply',
      onClick: onReply,
      show: true,
    },
    {
      icon: <Pencil className='w-4 h-4' />,
      label: 'Edit',
      onClick: onEdit,
      show: isOwn,
    },
    {
      icon: <Forward className='w-4 h-4' />,
      label: 'Forward',
      onClick: onForward,
      show: true,
    },
    {
      icon: <CheckSquare className='w-4 h-4' />,
      label: 'Select',
      onClick: onSelect,
      show: true,
    },
    {
      icon: <Copy className='w-4 h-4' />,
      label: 'Copy',
      onClick: onCopy,
      show: true,
    },
    {
      icon: <Pin className='w-4 h-4' />,
      label: 'Pin',
      onClick: onPin,
      show: canPin,
    },
    {
      icon: <Trash2 className='w-4 h-4' />,
      label: 'Delete',
      onClick: onDelete,
      show: canDelete,
      danger: true,
    },
  ];

  return (
    <div
      ref={ref}
      className='fixed z-50 min-w-[180px] bg-white dark:bg-[#2c2c2e] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#3a3a3c] py-1 overflow-hidden'
      style={{ top: position.top, left: position.left }}
    >
      {actions
        .filter((a) => a.show)
        .map((action) => (
          <button
            key={action.label}
            onClick={() => {
              action.onClick();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
              action.danger
                ? 'text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a]'
                : 'text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c]'
            }`}
          >
            <span className='text-[#8e8e93]'>{action.icon}</span>
            {action.label}
          </button>
        ))}
    </div>
  );
}
