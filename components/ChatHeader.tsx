'use client';

import { useUser } from '@clerk/nextjs';
import { useChat } from '@/components/chat/ChatContext';
import {
  ArrowLeft,
  Eraser,
  MoreVertical,
  Phone,
  Search,
  Trash2,
  Ban,
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
  const { channel, setActiveChannel, client } = useChatContext();
  const chat = useChat();
  const [menuOpen, setMenuOpen] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

  if (!channel) return null;

  const channelData = channel.data as Record<string, any> | undefined;
  const displayName = channelData?.name || 'Unknown';
  const imageUrl = channelData?.image;
  const memberCount = channelData?.member_count ?? 0;
  const isGroup = memberCount > 2;

  const handleCall = async () => {
    if (!channel || !channel.id) return;
    const callUrl = `${window.location.origin}/dashboard/video-call/${encodeURIComponent(channel.id)}`;
    try {
      await channel.sendMessage({ text: `Join video call: ${callUrl}` });
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
    router.push(`/dashboard/video-call/${encodeURIComponent(channel.id)}`);
  };

  const handleClearHistory = async () => {
    if (!channel) return;
    setClearing(true);
    try {
      await channel.truncate({ hard_delete: true });
    } catch (error) {
      console.error('Error clearing history:', error);
    } finally {
      setClearing(false);
      setMenuOpen(false);
    }
  };

  const handleDeleteChat = async () => {
    if (!channel || !user?.id) return;
    try {
      await channel.hide(user.id);
      setActiveChannel(undefined);
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
    setShowDeleteConfirm(false);
  };

  const handleBlockUser = async () => {
    if (!channel || !user?.id || !client) return;
    try {
      const members = Object.values(channel.state?.members || {});
      const target = members.find((m: any) => m.user?.id !== user.id);
      if (target?.user?.id) {
        await client.banUser({ target_user_id: target.user.id, type: 'channel', id: channel.id });
        await channel.hide(user.id);
      }
      setActiveChannel(undefined);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
    setShowBlockConfirm(false);
  };

  return (
    <>
      <div className='flex items-center justify-between px-4 py-3 border-b border-[#e5e5ea] dark:border-[#1f2c38] bg-white dark:bg-[#17212b]'>
        <div className='flex items-center gap-3 min-w-0'>
          <button
            onClick={() => router.back()}
            className='md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors flex-shrink-0'
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
            <p className='text-[12px] text-[#8e8e93] dark:text-[#8e9299]'>
              {channelData?.member_count === 1
                ? 'Everyone else has left this chat'
                : isGroup
                  ? `${memberCount} members${channelData?.online_count ? `, ${channelData.online_count} online` : ''}`
                  : 'online'}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-1 flex-shrink-0'>
          <button
            onClick={() => chat.setShowSearch(!chat.showSearch)}
            className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors text-[#8e8e93] dark:text-[#8e9299]'
          >
            <Search className='w-5 h-5' />
          </button>
          <button
            onClick={handleCall}
            className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors text-[#2AABEE]'
          >
            <Phone className='w-5 h-5' />
          </button>
          <div className='relative'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors text-[#8e8e93] dark:text-[#8e9299]'
            >
              <MoreVertical className='w-5 h-5' />
            </button>
            {menuOpen && (
              <>
                <div className='fixed inset-0 z-40' onClick={() => setMenuOpen(false)} />
                <div className='absolute right-0 top-full mt-1 z-50 w-52 bg-white dark:bg-[#17212b] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#1f2c38] py-1 overflow-hidden'>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleClearHistory();
                    }}
                    disabled={clearing}
                    className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors disabled:opacity-50'
                  >
                    <Eraser className='w-4 h-4 text-[#8e8e93] dark:text-[#8e9299]' />
                    Clear History
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleCall();
                    }}
                    className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
                  >
                    <VideoIcon className='w-4 h-4 text-[#8e8e93] dark:text-[#8e9299]' />
                    Video Call
                  </button>
                  <div className='h-px bg-[#e5e5ea] dark:bg-[#1f2c38] my-1' />
                  <button
                    onClick={() => { setMenuOpen(false); setShowDeleteConfirm(true); }}
                    className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a] transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                    Delete Chat
                  </button>
                  {!isGroup && (
                    <button
                      onClick={() => { setMenuOpen(false); setShowBlockConfirm(true); }}
                      className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a] transition-colors'
                    >
                      <Ban className='w-4 h-4' />
                      Block User
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Chat Dialog */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40' onClick={() => setShowDeleteConfirm(false)}>
          <div className='bg-white dark:bg-[#17212b] rounded-2xl w-full max-w-sm mx-4 overflow-hidden shadow-xl' onClick={(e) => e.stopPropagation()}>
            <div className='p-6 text-center'>
              <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4'>
                <Trash2 className='w-6 h-6 text-red-500' />
              </div>
              <h3 className='text-lg font-semibold text-[#000] dark:text-[#fff] mb-2'>Delete chat?</h3>
              <p className='text-sm text-[#8e8e93] dark:text-[#8e9299] mb-6'>
                This chat will be deleted for you. Other participants will still have access.
              </p>
              <div className='space-y-2'>
                <button
                  onClick={handleDeleteChat}
                  className='w-full py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors'
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className='w-full py-3 px-4 rounded-xl bg-[#f4f4f5] dark:bg-[#242f3d] hover:bg-[#e8e8ea] dark:hover:bg-[#202e3c] text-[#000] dark:text-[#fff] font-medium text-sm transition-colors'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block User Dialog */}
      {showBlockConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40' onClick={() => setShowBlockConfirm(false)}>
          <div className='bg-white dark:bg-[#17212b] rounded-2xl w-full max-w-sm mx-4 overflow-hidden shadow-xl' onClick={(e) => e.stopPropagation()}>
            <div className='p-6 text-center'>
              <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4'>
                <Ban className='w-6 h-6 text-red-500' />
              </div>
              <h3 className='text-lg font-semibold text-[#000] dark:text-[#fff] mb-2'>Block user?</h3>
              <p className='text-sm text-[#8e8e93] dark:text-[#8e9299] mb-6'>
                They won't be able to send you messages or call you.
              </p>
              <div className='space-y-2'>
                <button
                  onClick={handleBlockUser}
                  className='w-full py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors'
                >
                  Block
                </button>
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className='w-full py-3 px-4 rounded-xl bg-[#f4f4f5] dark:bg-[#242f3d] hover:bg-[#e8e8ea] dark:hover:bg-[#202e3c] text-[#000] dark:text-[#fff] font-medium text-sm transition-colors'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
