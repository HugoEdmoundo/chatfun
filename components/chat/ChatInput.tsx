'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pencil, Send, X, Smile, Paperclip, Mic, Square } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useChat } from './ChatContext';
import TextareaAutosize from 'react-textarea-autosize';
import { EmojiPicker } from './EmojiPicker';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

export function ChatInput() {
  const { channel, client } = useChatContext();
  const chat = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const isEditing = !!chat.editingMessage;

  const {
    recording,
    elapsedFormatted,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useAudioRecorder();

  const audioBlobRef = useRef<Blob | null>(null);
  useEffect(() => { audioBlobRef.current = audioBlob; }, [audioBlob]);

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
    if (!channel) return;

    if (recording) {
      await new Promise<void>((resolve) => {
        const check = () => {
          if (audioBlobRef.current) {
            resolve();
          } else {
            setTimeout(check, 10);
          }
        };
        stopRecording();
        setTimeout(check, 50);
      });
    }

    const blob = audioBlobRef.current || audioBlob;
    const hasText = text.trim().length > 0;
    if (!hasText && !pendingFile && !blob) return;

    if (isEditing && chat.editingMessage) {
      try {
        await client?.updateMessage({
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
        const msgData: Record<string, any> = {};
        if (hasText) msgData.text = text.trim();

        if (blob) {
          const audioFile = new File([blob], 'voice-message.webm', { type: 'audio/webm;codecs=opus' });
          const response = await channel.sendFile(audioFile);
          msgData.attachments = [{
            type: 'voice',
            asset_url: response.file,
            mime_type: 'audio/webm;codecs=opus',
            file_size: blob!.size,
            duration: elapsedFormatted,
          }];
        } else if (pendingFile) {
          const isImage = pendingFile.type.startsWith('image/');
          if (isImage) {
            const response = await channel.sendImage(pendingFile);
            msgData.attachments = [{
              type: 'image',
              image_url: response.file,
              title: pendingFile.name,
              file_size: pendingFile.size,
            }];
          } else {
            const response = await channel.sendFile(pendingFile);
            msgData.attachments = [{
              type: 'file',
              asset_url: response.file,
              title: pendingFile.name,
              file_size: pendingFile.size,
              mime_type: pendingFile.type,
            }];
          }
        }

        if (hasText || msgData.attachments) {
          await channel.sendMessage(msgData);
        }
      } catch (err) {
        console.error('Failed to send message:', err);
        return;
      }
    }

    setText('');
    setPendingFile(null);
  }, [text, isEditing, chat, channel, client, pendingFile, recording, stopRecording, audioBlob, elapsedFormatted]);

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

  const handleEmojiSelect = useCallback((emoji: string) => {
    const el = inputRef.current;
    if (!el) {
      setText((prev) => prev + emoji);
      return;
    }
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    setText(newText);
    requestAnimationFrame(() => {
      el.setSelectionRange(start + emoji.length, start + emoji.length);
      el.focus();
    });
  }, [text]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
    }
    e.target.value = '';
  }, []);

  const handleVoiceToggle = useCallback(async () => {
    if (recording) {
      stopRecording();
    } else {
      await startRecording();
    }
  }, [recording, startRecording, stopRecording]);

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

      {pendingFile && (
        <div className='flex items-center gap-2 px-4 py-2 border-t border-[#e5e5ea] dark:border-[#1f2c38] bg-white dark:bg-[#17212b]'>
          <Paperclip className='w-4 h-4 text-[#2AABEE]' />
          <span className='text-xs text-[#000] dark:text-[#fff] truncate flex-1'>{pendingFile.name}</span>
          <button
            onClick={() => setPendingFile(null)}
            className='w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299]'
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
            <div className='relative'>
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors'
                aria-label='Emoji'
              >
                <Smile className='w-5 h-5' />
              </button>
              {showEmoji && (
                <EmojiPicker
                  onSelect={handleEmojiSelect}
                  onClose={() => setShowEmoji(false)}
                />
              )}
            </div>

            {recording ? (
              <div className='flex-1 flex items-center gap-2 py-[10px] px-1'>
                <span className='w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse' />
                <span className='text-sm text-red-500 font-medium tabular-nums'>{elapsedFormatted}</span>
                <div className='flex-1 h-8 flex items-end gap-0.5'>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className='w-1 bg-red-400/50 rounded-full'
                      style={{
                        height: `${Math.random() * 100}%`,
                        animation: `pulse ${0.3 + Math.random() * 0.4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
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
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.txt,.csv'
                  className='hidden'
                  onChange={handleFileSelect}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors'
                  aria-label='Attach file'
                >
                  <Paperclip className='w-5 h-5' />
                </button>
              </>
            )}

            {recording ? (
              <div className='flex items-center gap-1'>
                <button
                  onClick={cancelRecording}
                  className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors'
                  aria-label='Cancel recording'
                >
                  <X className='w-5 h-5' />
                </button>
                <button
                  onClick={handleSend}
                  className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-[#2AABEE] hover:bg-[#1E96C8] text-white transition-colors'
                  aria-label='Send voice message'
                >
                  <Send className='w-4 h-4' />
                </button>
              </div>
            ) : text.trim() || pendingFile ? (
              <button
                onClick={handleSend}
                className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-[#2AABEE] hover:bg-[#1E96C8] text-white transition-colors'
                aria-label='Send'
              >
                <Send className='w-4 h-4' />
              </button>
            ) : (
              <button
                onClick={handleVoiceToggle}
                className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#e8eaed] dark:hover:bg-[#202e3c] text-[#8e8e93] dark:text-[#8e9299] transition-colors'
                aria-label='Voice message'
              >
                {recording ? <Square className='w-4 h-4' /> : <Mic className='w-5 h-5' />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
