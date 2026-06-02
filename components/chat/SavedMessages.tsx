'use client';

import { Bookmark } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useUser } from '@clerk/nextjs';

export function SavedMessages() {
  const { channel: activeChannel, setActiveChannel } = useChatContext();
  const { user } = useUser();

  const handleClick = async () => {
    if (!user || !setActiveChannel) return;
    try {
      const client = (await import('@/lib/stream')).default;
      const saved = client.channel('messaging', `saved-${user.id}`, {
        name: 'Saved Messages',
        members: [user.id],
      } as any);
      await saved.watch();
      setActiveChannel(saved);
    } catch (err) {
      console.error('Failed to open saved messages:', err);
    }
  };

  const isActive = activeChannel?.id === `saved-${user?.id}`;

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-[10px] cursor-pointer transition-colors ${
        isActive
          ? 'bg-[#e8f4fd] dark:bg-[#2b5278]'
          : 'hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e]'
      }`}
    >
      <div className='w-12 h-12 rounded-full bg-[#2AABEE] flex items-center justify-center flex-shrink-0'>
        <Bookmark className='w-6 h-6 text-white' />
      </div>
      <div className='flex-1 min-w-0 text-left'>
        <span className='text-sm font-medium text-[#000] dark:text-[#fff]'>Saved Messages</span>
      </div>
    </button>
  );
}
