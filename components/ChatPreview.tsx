'use client';

import { useUser } from '@clerk/nextjs';
import { useMemo } from 'react';
import type { ChannelPreviewUIComponentProps } from 'stream-chat-react';

interface Attachment {
  type?: string;
  image_url?: string;
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);

  if (days === 0) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  if (days === 1) return 'Yesterday';
  if (days < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ChatPreview(props: ChannelPreviewUIComponentProps) {
  const { channel, activeChannel, setActiveChannel, unread, latestMessage, lastMessage } = props;
  const { user } = useUser();

  const isActive = activeChannel?.id === channel.id;

  const channelData = channel.data as Record<string, any> | undefined;

  const displayName = useMemo(() => {
    if (channelData?.name) return channelData.name;
    try {
      const members = channel.state?.members || {};
      const otherMembers = Object.values(members).filter(
        (m: any) => m.user?.id !== user?.id
      );
      if (otherMembers.length === 1) {
        return otherMembers[0].user?.name || otherMembers[0].user?.id || 'Unknown';
      }
      if (otherMembers.length > 1) {
        return otherMembers.map((m: any) => m.user?.name || m.user?.id).join(', ');
      }
    } catch {}
    return 'Unknown';
  }, [channel, user, channelData]);

  const imageUrl = channelData?.image;

  const memberCount = channelData?.member_count ?? 0;
  const isGroup = memberCount > 2;

  const messageTime = useMemo(() => {
    if (!lastMessage?.created_at) return '';
    return formatTime(new Date(lastMessage.created_at));
  }, [lastMessage]);

  const lastMsgAttachments = (lastMessage as any)?.attachments as Attachment[] | undefined;
  const hasAttachment = lastMsgAttachments && lastMsgAttachments.length > 0;

  const previewText = useMemo(() => {
    if (!latestMessage && !hasAttachment) return 'No messages yet';
    const previewStr = latestMessage || '';
    const fallbackPreview = hasAttachment
      ? lastMsgAttachments!.some((a) => a.type === 'voice')
        ? '🎤 Voice message'
        : lastMsgAttachments!.some((a) => a.type === 'image' || a.image_url)
          ? '📷 Photo'
          : '📄 File'
      : '';
    const displayPreview = previewStr || fallbackPreview;
    if (!displayPreview) return 'No messages yet';
    if (isGroup && lastMessage?.user?.id !== user?.id) {
      const senderName = lastMessage?.user?.name || lastMessage?.user?.id || '';
      return <>{senderName}: {displayPreview}</>;
    }
    if (lastMessage?.user?.id === user?.id) {
      return <>You: {displayPreview}</>;
    }
    return displayPreview;
  }, [latestMessage, hasAttachment, isGroup, lastMessage, user]);

  const handleClick = () => {
    setActiveChannel?.(channel);
  };

  const unreadCount = unread ?? 0;
  const isMuted = channelData?.muted;

  return (
    <div
      onClick={handleClick}
      className={
        `flex items-center gap-3 px-4 py-[14px] cursor-pointer transition-colors duration-150 ` +
        (isActive
          ? 'bg-[#2481cc] text-white'
          : 'hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c]')
      }
    >
      <div className='relative flex-shrink-0'>
        <div className='w-[48px] h-[48px] rounded-full overflow-hidden bg-[#2AABEE] flex items-center justify-center text-white font-semibold text-sm'>
          {imageUrl ? (
            <img src={imageUrl} alt={displayName} className='w-full h-full object-cover' />
          ) : (
            getInitials(displayName)
          )}
        </div>
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between'>
          <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-[#000] dark:text-[#fff]'}`}>
            {displayName}
          </span>
          {messageTime && (
            <span className={`text-[11px] flex-shrink-0 ml-2 ${isActive ? 'text-white/70' : 'text-[#8e8e93] dark:text-[#8e9299]'}`}>
              {messageTime}
            </span>
          )}
        </div>
        <div className='flex items-center justify-between mt-0.5'>
          <span className={`text-[13px] truncate ${isActive ? 'text-white/70' : 'text-[#8e8e93] dark:text-[#8e9299]'}`}>
            {previewText}
          </span>
          {unreadCount > 0 && (
            <span className={`flex-shrink-0 ml-2 min-w-[20px] h-[20px] rounded-full flex items-center justify-center ${
              isMuted ? 'bg-[#555]' : 'bg-[#31B545]'
            }`}>
              <span className='text-[11px] font-semibold text-white px-1'>
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
