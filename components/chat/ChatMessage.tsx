'use client';

import { useCallback, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import type { MessageResponse } from 'stream-chat';
import { useChatContext, useMessageContext } from 'stream-chat-react';
import { ChevronDown } from 'lucide-react';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatActionsMenu } from './ChatActionsMenu';
import { useChat } from './ChatContext';
import { ChatContextMenu } from './ChatContextMenu';
import { getGroupColor } from '@/lib/hashColor';

function formatTimestamp(date: Date): string {
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

export function ChatMessage() {
  const { message, isMyMessage } = useMessageContext('ChatMessage');
  const { channel, client } = useChatContext();
  const chat = useChat();
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const [ctxMenuPos, setCtxMenuPos] = useState<{ x: number; y: number } | null>(null);

  const isMine = isMyMessage();

  const isEdited = useMemo(() => {
    if (!message.created_at || !message.updated_at) return false;
    const created = new Date(message.created_at).getTime();
    const updated = new Date(message.updated_at).getTime();
    return updated - created > 2000;
  }, [message]);

  const forwardedFrom = (message as any).forwardedFrom as string | undefined;
  const showCheckbox = chat.multiSelectMode;
  const isSelected = chat.selectedMessages.has(message.id);

  const channelData = channel?.data as Record<string, any> | undefined;
  const isGroup = (channelData?.member_count ?? 0) > 2;
  const senderName = (message.user?.name || message.user?.id || 'Unknown');
  const canDelete = isMine || channelData?.created_by?.id === client.user?.id;

  const senderColor = useMemo(() => {
    if (message.user?.id) return getGroupColor(message.user.id);
    return '#2AABEE';
  }, [message.user?.id]);

  const timestamp = useMemo(() => {
    if (!message.created_at) return '';
    return formatTimestamp(new Date(message.created_at));
  }, [message.created_at]);

  const handleReply = useCallback(() => {
    if (!channel) return;
    channel.sendMessage({
      text: message.text ? `@${message.user?.name || ''} ${message.text}` : '',
      quoted_message_id: message.id,
    }).catch(console.error);
  }, [channel, message]);

  const handleEdit = useCallback(() => {
    chat.setEditingMessage(message as any);
  }, [message, chat]);

  const handleDelete = useCallback(() => {
    chat.setDeleteTarget(message as any);
    chat.setShowDeleteDialog(true);
  }, [message, chat]);

  const handleForward = useCallback(() => {
    chat.addForwardMessage(message as any);
    chat.setShowForwardDialog(true);
  }, [message, chat]);

  const handleSelect = useCallback(() => {
    chat.toggleSelectMessage(message.id);
  }, [message, chat]);

  const handleCopy = useCallback(() => {
    const msg = message as any;
    if (message.text || message.html) {
      navigator.clipboard.writeText(message.text || message.html || '').catch(console.error);
      return;
    }
    const att = msg.attachments?.[0];
    if (att) {
      if (att.type === 'voice') {
        navigator.clipboard.writeText(`Voice message (${att.duration || '0:00'})`).catch(console.error);
      } else if (att.image_url || att.type === 'image') {
        navigator.clipboard.writeText(att.image_url || att.asset_url || '').catch(console.error);
      } else if (att.asset_url) {
        navigator.clipboard.writeText(`${att.title || 'File'}: ${att.asset_url}`).catch(console.error);
      }
    }
  }, [message]);

  const handlePin = useCallback(async () => {
    if (!channel || !client) return;
    try {
      const isPinned = chat.pinnedMessageIds.has(message.id);
      if (isPinned) {
        await client.unpinMessage(message.id);
        const next = new Set(chat.pinnedMessageIds);
        next.delete(message.id);
        chat.setPinnedMessageIds(next);
      } else {
        await client.pinMessage(message.id, null);
        const next = new Set(chat.pinnedMessageIds);
        next.add(message.id);
        chat.setPinnedMessageIds(next);
      }
    } catch (err) {
      console.error('Failed to pin/unpin:', err);
    }
  }, [channel, client, message, chat]);

  const handleActionsClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuPos({ top: rect.top, left: Math.max(8, rect.right - 180) });
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenuPos({ x: e.clientX, y: e.clientY });
  }, []);

  const renderReactions = useMemo(() => {
    const msg = message as any;
    const reactions = msg.reactions;
    if (!reactions || reactions.length === 0) return null;

    const grouped: Record<string, number> = {};
    reactions.forEach((r: any) => {
      grouped[r.type] = (grouped[r.type] || 0) + 1;
    });

    return (
      <div className='flex items-center gap-1 bg-white dark:bg-[#17212b] rounded-full px-2 py-0.5 border border-[#e5e5ea] dark:border-[#1f2c38] shadow-sm'>
        {Object.entries(grouped).map(([emoji, count]) => (
          <span key={emoji} className='flex items-center gap-0.5 text-sm cursor-pointer hover:opacity-80'>
            {emoji}
            {count > 1 && <span className='text-[11px] text-[#8e9299]'>{count}</span>}
          </span>
        ))}
      </div>
    );
  }, [message]);

  const bubbleStatus = useMemo(() => ({
    sending: message.status === 'sending',
    sent: message.status === 'sent',
    received: message.status === 'received',
    read: message.status === 'read',
  }), [message.status]);

  return (
    <>
      <div
        className={`flex items-end gap-2 px-4 py-[2px] group ${
          isMine ? 'justify-end' : 'justify-start'
        } ${isSelected ? 'bg-[#e8f4fd]/50 dark:bg-[#2b5278]/30' : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'}`}
        onContextMenu={handleContextMenu}
      >
        {showCheckbox && (
          <button
            onClick={() => chat.toggleSelectMessage(message.id)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-3 ${
              isSelected
                ? 'bg-[#2AABEE] border-[#2AABEE]'
                : 'border-[#8e8e93] dark:border-[#8e9299] hover:border-[#2AABEE]'
            }`}
          >
            {isSelected && (
              <svg className='w-3 h-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
              </svg>
            )}
          </button>
        )}

        <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[85%] min-w-0`}>
          {isGroup && !isMine && (
            <span className='text-xs font-semibold mb-0.5 ml-1' style={{ color: senderColor }}>
              {senderName}
            </span>
          )}
          {forwardedFrom && (
            <span className='text-[11px] italic text-[#8e8e93] dark:text-[#8e9299] mb-0.5 ml-1'>
              Forwarded from {forwardedFrom}
            </span>
          )}

          <div className='flex items-end gap-1.5'>
            <button
              onClick={handleActionsClick}
              className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] mb-1 ${
                isMine ? '' : 'order-first'
              }`}
            >
              <ChevronDown className='w-4 h-4' />
            </button>

            <ChatMessageBubble
              isMine={isMine}
              timestamp={timestamp}
              status={bubbleStatus}
              edited={isEdited}
              views={(message as any).viewCount}
              attachments={(message as any).attachments}
            >
              {message.text && <p className='whitespace-pre-wrap break-words'>{message.text}</p>}
              {message.html && !message.text && (
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.html) }} />
              )}
            </ChatMessageBubble>
          </div>

          {renderReactions && (
            <div className={`mt-0.5 ${isMine ? 'ml-auto' : 'mr-auto'}`}>
              {renderReactions}
            </div>
          )}
        </div>
      </div>

      <ChatActionsMenu
        message={message as any}
        isOwn={isMine}
        canDelete={canDelete}
        canPin={true}
        position={menuPos}
        onClose={() => setMenuPos(null)}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onForward={handleForward}
        onSelect={handleSelect}
        onCopy={handleCopy}
        onPin={handlePin}
      />

      <ChatContextMenu
        message={message as any}
        isOwn={isMine}
        canDelete={canDelete}
        canPin={true}
        position={ctxMenuPos}
        onClose={() => setCtxMenuPos(null)}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onForward={handleForward}
        onSelect={handleSelect}
        onCopy={handleCopy}
        onPin={handlePin}
      />
    </>
  );
}
