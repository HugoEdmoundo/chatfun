'use client';

import { useCallback, useEffect, useState } from 'react';
import { Pin, X } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';

export function PinnedMessages() {
  const { channel } = useChatContext();
  const [pinned, setPinned] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!channel) return;
    channel.getPinnedMessages({ limit: 1 }).then((res) => {
      setPinned(res.messages || []);
    }).catch(console.error);
  }, [channel]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (dismissed || pinned.length === 0) return null;

  const msg = pinned[0];

  return (
    <div className='flex items-center gap-3 px-4 py-2.5 bg-[#f4f4f5] dark:bg-[#2a2a3e] border-b border-[#e5e5ea] dark:border-[#3a3a3c]'>
      <Pin className='w-4 h-4 text-[#8e8e93] flex-shrink-0' />
      <div className='flex-1 min-w-0'>
        <span className='text-xs font-semibold text-[#2AABEE]'>Pinned message</span>
        <p className='text-sm text-[#000] dark:text-[#fff] truncate'>
          {msg.text || 'No text'}
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className='w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#e8e8ea] dark:hover:bg-[#3a3a3c] text-[#8e8e93] flex-shrink-0'
      >
        <X className='w-4 h-4' />
      </button>
    </div>
  );
}
