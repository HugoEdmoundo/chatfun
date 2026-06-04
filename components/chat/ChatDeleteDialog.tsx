'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useChat } from './ChatContext';

export function ChatDeleteDialog() {
  const { channel, client } = useChatContext();
  const chat = useChat();
  const [loading, setLoading] = useState(false);

  const isMulti = chat.deleteTargetIds.length > 0;
  const targetId = isMulti ? null : chat.deleteTarget?.id;
  const ids = isMulti ? chat.deleteTargetIds : (targetId ? [targetId] : []);

  const handleDeleteForMe = async () => {
    if (!client || ids.length === 0) return;
    setLoading(true);
    try {
      for (const id of ids) {
        await client.deleteMessage(id, { hardDelete: false });
      }
      chat.setShowDeleteDialog(false);
      chat.setDeleteTarget(null);
      chat.setDeleteTargetIds([]);
    } catch (err) {
      console.error('Failed to hide messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForEveryone = async () => {
    if (!client || ids.length === 0) return;
    setLoading(true);
    try {
      for (const id of ids) {
        await client.deleteMessage(id);
      }
      chat.setShowDeleteDialog(false);
      chat.setDeleteTarget(null);
      chat.setDeleteTargetIds([]);
    } catch (err) {
      console.error('Failed to delete messages:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!chat.showDeleteDialog || ids.length === 0) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white dark:bg-[#17212b] rounded-2xl w-full max-w-sm mx-4 overflow-hidden shadow-xl'>
        <div className='p-6 text-center'>
          <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4'>
            <Trash2 className='w-6 h-6 text-red-500' />
          </div>
          <h3 className='text-lg font-semibold text-[#000] dark:text-[#fff] mb-2'>
            {isMulti ? `Delete ${ids.length} messages?` : 'Delete message?'}
          </h3>
          <p className='text-sm text-[#8e8e93] dark:text-[#8e9299] mb-6'>
            {isMulti
              ? `The selected messages will be deleted for everyone.`
              : 'This message will be deleted for everyone.'}
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
              className='w-full py-3 px-4 rounded-xl bg-[#f4f4f5] dark:bg-[#242f3d] hover:bg-[#e8e8ea] dark:hover:bg-[#202e3c] text-[#000] dark:text-[#fff] font-medium text-sm transition-colors disabled:opacity-50'
            >
              Delete for me
            </button>
            <button
              onClick={() => {
                chat.setShowDeleteDialog(false);
                chat.setDeleteTarget(null);
                chat.setDeleteTargetIds([]);
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
