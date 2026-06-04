'use client';

import { type ReactNode } from 'react';

interface StatusConfig {
  sending?: boolean;
  sent?: boolean;
  received?: boolean;
  read?: boolean;
}

function getStatusIndicator(status?: StatusConfig) {
  if (!status) return null;
  if (status.sending) return <span className='text-[10px] opacity-70'>...</span>;
  if (status.read) return <span className='text-[10px] text-[#53b3e8]'>&#10003;&#10003;</span>;
  if (status.received) return <span className='text-[10px] opacity-70'>&#10003;&#10003;</span>;
  if (status.sent) return <span className='text-[10px] opacity-70'>&#10003;</span>;
  return null;
}

interface Attachment {
  type?: string;
  image_url?: string;
  asset_url?: string;
  title?: string;
  file_size?: number;
  mime_type?: string;
  duration?: string;
}

export function ChatMessageBubble({
  isMine,
  children,
  timestamp,
  status,
  edited,
  views,
  attachments,
  className = '',
}: {
  isMine: boolean;
  children: ReactNode;
  timestamp?: string;
  status?: StatusConfig;
  edited?: boolean;
  views?: number;
  attachments?: Attachment[];
  className?: string;
}) {
  const renderAttachments = () => {
    if (!attachments || attachments.length === 0) return null;
    return attachments.map((att, i) => {
      const isVoice = att.type === 'voice';
      if (isVoice) {
        return (
          <div key={i} className='flex items-center gap-2 py-1'>
            <button
              onClick={() => {
                const audio = new Audio(att.asset_url);
                audio.play().catch(() => {});
              }}
              className='w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-black/20 dark:hover:bg-white/20 transition-colors'
            >
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M8 5v14l11-7z' />
              </svg>
            </button>
            <div className='flex-1 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden'>
              <div className='w-1/2 h-full bg-current opacity-40 rounded-full' />
            </div>
            <span className='text-[11px] opacity-70 tabular-nums'>{att.duration || '0:00'}</span>
          </div>
        );
      }

      const isImage = att.type === 'image' || att.image_url;
      if (isImage && (att.image_url || att.asset_url)) {
        const src = att.image_url || att.asset_url || '';
        return (
          <div key={i} className='-mx-3 -mt-[7px] mb-1 overflow-hidden rounded-t-[16px]'>
            <a href={src} target='_blank' rel='noopener noreferrer'>
              <img
                src={src}
                alt={att.title || 'Image'}
                className='w-full max-h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity'
              />
            </a>
            {att.title && (
              <p className='text-xs px-3 py-1 truncate border-t border-black/5 dark:border-white/5'>
                {att.title}
              </p>
            )}
          </div>
        );
      }

      if (att.asset_url) {
        const isVideo = att.mime_type?.startsWith('video/');
        const icon = isVideo ? '🎬' : '📄';
        return (
          <a
            key={i}
            href={att.asset_url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors'
          >
            <span className='text-lg'>{icon}</span>
            <div className='flex-1 min-w-0'>
              <p className='text-sm truncate'>{att.title || 'File'}</p>
              {att.file_size && (
                <p className='text-[11px] opacity-60'>
                  {att.file_size > 1048576
                    ? `${(att.file_size / 1048576).toFixed(1)} MB`
                    : `${Math.round(att.file_size / 1024)} KB`}
                </p>
              )}
            </div>
          </a>
        );
      }

      return null;
    });
  };

  const attachmentElements = renderAttachments();
  const hasAttachments = !!attachmentElements;

  return (
    <div
      className={`relative inline-block max-w-[85%] px-3 py-[7px] text-sm leading-relaxed break-words ${
        isMine
          ? 'bg-[#6AB3F9] dark:bg-[#2B5278] text-white rounded-[16px_16px_4px_16px]'
          : 'bg-[#f0f2f5] dark:bg-[#2c2c2e] text-black dark:text-white rounded-[16px_16px_16px_4px]'
      } ${className}`}
    >
      {hasAttachments && <div className='mb-1'>{attachmentElements}</div>}
      {children}
      <div className={`flex items-center gap-1 mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <span className={`text-[11px] ${isMine ? 'text-white/70' : 'text-[#8e8e93] dark:text-[#8e9299]'}`}>
          {edited && <span className='mr-0.5'>edited </span>}
          {timestamp}
          {views !== undefined && views > 0 && (
            <span className='ml-1 flex items-center gap-0.5 inline-flex'>
              <svg className='w-3 h-3' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                <circle cx='12' cy='12' r='3' />
              </svg>
              {views}
            </span>
          )}
        </span>
        {status && getStatusIndicator(status)}
      </div>
    </div>
  );
}
