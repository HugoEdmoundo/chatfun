'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pencil, Send, X } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useChat } from './ChatContext';

export function ChatInput() {
  const { channel } = useChatContext();
  const chat = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');

  const isEditing = !!chat.editingMessage;

  useEffect(() => {
    if (isEditing && chat.editingMessage) {
      setText(chat.editingMessage.text || '');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [chat.editingMessage]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleSend = useCallback(async () => {
    if (!text.trim() || !channel) return;

    if (isEditing && chat.editingMessage) {
      try {
        await (channel as any).updateMessage(
          chat.editingMessage.id,
          text.trim(),
          { updated_at: new Date().toISOString() } as any
        );
        chat.setEditingMessage(null);
      } catch (err) {
        console.error('Failed to edit message:', err);
        return;
      }
    } else {
      try {
        await channel.sendMessage({ text: text.trim() });
      } catch (err) {
        console.error('Failed to send message:', err);
        return;
      }
    }

    setText('');
  }, [text, isEditing, chat, channel]);

  const handleCancelEdit = useCallback(() => {
    chat.setEditingMessage(null);
    setText('');
  }, [chat]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
      if (e.key === 'Escape' && isEditing) {
        handleCancelEdit();
      }
    },
    [handleSend, handleCancelEdit, isEditing]
  );

  return (
    <div className='sticky bottom-0 z-20 px-4 py-3 border-t border-[#e5e5ea] dark:border-[#3a3a3c] bg-white dark:bg-[#1c1c1e]'>
      {isEditing && (
        <div className='flex items-center gap-2 mb-2 px-1'>
          <Pencil className='w-4 h-4 text-[#2AABEE]' />
          <span className='text-xs text-[#2AABEE] font-medium'>Edit message</span>
          <button
            onClick={handleCancelEdit}
            className='ml-auto w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] text-[#8e8e93]'
          >
            <X className='w-3.5 h-3.5' />
          </button>
        </div>
      )}
      <div
        className={`flex items-end gap-2 bg-[#f0f2f5] dark:bg-[#2c2c2e] rounded-2xl px-4 py-2 ${
          isEditing ? 'ring-2 ring-[#2AABEE]' : ''
        }`}
      >
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='Message...'
          rows={1}
          className='flex-1 bg-transparent border-none outline-none resize-none text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] max-h-[120px] py-1 leading-5'
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-[#2AABEE] hover:bg-[#1E96C8] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
        >
          <Send className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}
