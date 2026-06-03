'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pencil, Send, X, Smile, Paperclip, Mic } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useChat } from './ChatContext';
import TextareaAutosize from 'react-textarea-autosize';

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
        await channel.updateMessage({
          id: chat.editingMessage.id,
          text: text.trim(),
          updated_at: new Date().toISOString(),
        });
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
    <div className='sticky bottom-0 z-20 bg-white dark:bg-[#0e1621]'>
      {isEditing && (
        <div className='flex items-center gap-2 px-4 py-2 border-t border-[#e5e5ea] dark:border-[#1f2c38] bg-white dark:bg-[#17212b]'>
          <Pencil className='w-4 h-4 text-[#2AABEE]' />
          <span className='text-xs text-[#2AABEE] font-medium'>Edit message</span>
          <button
            onClick={handleCancelEdit}
            className='ml-auto w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299]'
          >
            <X className='w-3.5 h-3.5' />
          </button>
        </div>
      )}
      <div className='px-4 py-3 border-t border-[#e5e5ea] dark:border-[#1f2c38]'>
        <div className='max-w-3xl mx-auto'>
          <div
            className={`flex items-end gap-1 bg-[#f0f2f5] dark:bg-[#242f3d] rounded-2xl px-2 py-1 ${
              isEditing ? 'ring-2 ring-[#2AABEE]' : ''
            }`}
          >
            <button className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors' aria-label='Emoji'>
              <Smile className='w-5 h-5' />
            </button>
            <TextareaAutosize
              ref={inputRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='Message...'
              minRows={1}
              maxRows={4}
              className='flex-1 bg-transparent border-none outline-none resize-none text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] dark:placeholder:text-[#8e9299] py-[10px] px-1 leading-5'
            />
            <button className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors' aria-label='Attach file'>
              <Paperclip className='w-5 h-5' />
            </button>
            {text.trim() ? (
              <button
                onClick={handleSend}
                className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-[#2AABEE] hover:bg-[#1E96C8] text-white transition-colors'
                aria-label='Send'
              >
                <Send className='w-4 h-4' />
              </button>
            ) : (
              <button className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors' aria-label='Voice message'>
                <Mic className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
