'use client';

import { useUser } from '@clerk/nextjs';
import { useSidebar } from '@/components/ui/sidebar';
import { useChat } from '@/components/chat/ChatContext';
import {
  ArrowLeft,
  Eraser,
  LogOutIcon,
  MoreVertical,
  Phone,
  Search,
  VideoIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ChatHeader() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();
  const chat = useChat();
  const [menuOpen, setMenuOpen] = useState(false);
  const [clearing, setClearing] = useState(false);

  if (!channel) return null;

  const channelData = channel.data as Record<string, any> | undefined;
  const displayName = channelData?.name || 'Unknown';
  const imageUrl = channelData?.image;

  const handleCall = async () => {
    if (!channel || !channel.id) return;
    const callUrl = `${window.location.origin}/dashboard/video-call/${encodeURIComponent(channel.id)}`;
    try {
      await channel.sendMessage({ text: `Join video call: ${callUrl}` });
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
    router.push(`/dashboard/video-call/${encodeURIComponent(channel.id)}`);
    setOpen(false);
  };

  const handleLeaveChat = async () => {
    if (!channel || !user?.id) return;
    const confirm = window.confirm('Are you sure you want to leave this chat?');
    if (!confirm) return;
    try {
      await channel.removeMembers([user.id]);
      setActiveChannel(undefined);
    } catch (error) {
      console.error('Error leaving the chat:', error);
    }
  };

  const handleClearHistory = async () => {
    if (!channel) return;
    const confirm = window.confirm(
      'Delete all messages in this chat? This cannot be undone.'
    );
    if (!confirm) return;
    setClearing(true);
    try {
      await channel.truncate({ hard_delete: true });
    } catch (error) {
      console.error('Error clearing history:', error);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className='flex items-center justify-between px-4 py-3 border-b border-[#e5e5ea] dark:border-[#3a3a3c] bg-white dark:bg-[#1c1c1e]'>
      <div className='flex items-center gap-3 min-w-0'>
        <button
          onClick={() => setOpen(true)}
          className='md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] transition-colors flex-shrink-0'
        >
          <ArrowLeft className='w-5 h-5 text-[#000] dark:text-[#fff]' />
        </button>
        <div className='w-10 h-10 rounded-full overflow-hidden bg-[#2AABEE] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0'>
          {imageUrl ? (
            <img src={imageUrl} alt={displayName} className='w-full h-full object-cover' />
          ) : (
            getInitials(displayName)
          )}
        </div>
        <div className='min-w-0'>
          <h2 className='text-base font-semibold text-[#000] dark:text-[#fff] truncate'>
            {displayName}
          </h2>
          <p className='text-[12px] text-[#8e8e93]'>
            {channel.data?.member_count === 1
              ? 'Everyone else has left this chat'
              : 'online'}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-1 flex-shrink-0'>
        <button
          onClick={() => chat.setShowSearch(!chat.showSearch)}
          className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] transition-colors text-[#8e8e93]'
        >
          <Search className='w-5 h-5' />
        </button>
        <button
          onClick={handleCall}
          className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] transition-colors text-[#2AABEE]'
        >
          <Phone className='w-5 h-5' />
        </button>
        <div className='relative'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] transition-colors text-[#8e8e93]'
          >
            <MoreVertical className='w-5 h-5' />
          </button>
          {menuOpen && (
            <>
              <div className='fixed inset-0 z-40' onClick={() => setMenuOpen(false)} />
              <div className='absolute right-0 top-full mt-1 z-50 w-52 bg-white dark:bg-[#2c2c2e] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#3a3a3c] py-1 overflow-hidden'>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleClearHistory();
                  }}
                  disabled={clearing}
                  className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c] transition-colors disabled:opacity-50'
                >
                  <Eraser className='w-4 h-4 text-[#8e8e93]' />
                  Clear History
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleCall();
                  }}
                  className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c] transition-colors'
                >
                  <VideoIcon className='w-4 h-4 text-[#8e8e93]' />
                  Video Call
                </button>
                <div className='h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] my-1' />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLeaveChat();
                  }}
                  className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a] transition-colors'
                >
                  <LogOutIcon className='w-4 h-4' />
                  Leave Chat
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
