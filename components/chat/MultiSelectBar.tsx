'use client';

import { Forward, Trash2, X } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useChat } from './ChatContext';

export function MultiSelectBar() {
  const { channel } = useChatContext();
  const chat = useChat();

  if (!chat.multiSelectMode) return null;

  const count = chat.selectedMessages.size;

  const handleForward = () => {
    chat.setShowForwardDialog(true);
  };

  const handleDeleteSelected = () => {
    const ids = Array.from(chat.selectedMessages);
    if (ids.length > 0) {
      chat.setDeleteTargetIds(ids);
      chat.setShowDeleteDialog(true);
    }
  };

  return (
    <div className='sticky bottom-0 z-30 px-4 py-3 border-t border-[#e5e5ea] dark:border-[#1f2c38] bg-white dark:bg-[#17212b]'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-[#000] dark:text-[#fff]'>
          {count} message{count !== 1 ? 's' : ''} selected
        </span>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleForward}
            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2AABEE] hover:bg-[#1E96C8] text-white text-sm font-medium transition-colors'
          >
            <Forward className='w-4 h-4' />
            Forward
          </button>
          <button
            onClick={handleDeleteSelected}
            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            Delete
          </button>
          <button
            onClick={chat.exitMultiSelect}
            className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299]'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  );
}
