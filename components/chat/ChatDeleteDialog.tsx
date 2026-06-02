'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useChat } from './ChatContext';

export function ChatDeleteDialog() {
  const { channel } = useChatContext();
  const ch = channel as any;
  const chat = useChat();
  const [loading, setLoading] = useState(false);

  const handleDeleteForMe = async () => {
    if (!ch || !chat.deleteTarget) return;
    setLoading(true);
    try {
      await ch.hideMessage?.(chat.deleteTarget.id);
      chat.setShowDeleteDialog(false);
      chat.setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to hide message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForEveryone = async () => {
    if (!ch || !chat.deleteTarget) return;
    setLoading(true);
    try {
      await ch.deleteMessage(chat.deleteTarget.id);
      chat.setShowDeleteDialog(false);
      chat.setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete message:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!chat.showDeleteDialog || !chat.deleteTarget) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white dark:bg-[#2c2c2e] rounded-2xl w-full max-w-sm mx-4 overflow-hidden shadow-xl'>
        <div className='p-6 text-center'>
          <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4'>
            <Trash2 className='w-6 h-6 text-red-500' />
          </div>
          <h3 className='text-lg font-semibold text-[#000] dark:text-[#fff] mb-2'>
            Delete message?
          </h3>
          <p className='text-sm text-[#8e8e93] mb-6'>
            This action cannot be undone.
          </p>
          <div className='space-y-2'>
            <button
              onClick={handleDeleteForEveryone}
              disabled={loading}
              className='w-full py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors disabled:opacity-50'
            >
              {loading ? 'Deleting...' : 'Delete for everyone'}
            </button>
            <button
              onClick={handleDeleteForMe}
              disabled={loading}
              className='w-full py-3 px-4 rounded-xl bg-[#f4f4f5] dark:bg-[#3a3a3c] hover:bg-[#e8e8ea] dark:hover:bg-[#4a4a4c] text-[#000] dark:text-[#fff] font-medium text-sm transition-colors disabled:opacity-50'
            >
              Delete for me
            </button>
            <button
              onClick={() => {
                chat.setShowDeleteDialog(false);
                chat.setDeleteTarget(null);
              }}
              disabled={loading}
              className='w-full py-3 px-4 rounded-xl text-[#8e8e93] hover:text-[#000] dark:hover:text-[#fff] text-sm transition-colors'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
