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

export function ChatMessageBubble({
  isMine,
  children,
  timestamp,
  status,
  edited,
  views,
  className = '',
}: {
  isMine: boolean;
  children: ReactNode;
  timestamp?: string;
  status?: StatusConfig;
  edited?: boolean;
  views?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-block max-w-[85%] px-3 py-[7px] text-sm leading-relaxed break-words ${
        isMine
          ? 'bg-[#6AB3F9] dark:bg-[#2B5278] text-white rounded-[16px_16px_4px_16px]'
          : 'bg-[#f0f2f5] dark:bg-[#2c2c2e] text-black dark:text-white rounded-[16px_16px_16px_4px]'
      } ${className}`}
    >
      {children}
      <div className={`flex items-center gap-1 mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <span className={`text-[11px] ${isMine ? 'text-white/70' : 'text-[#8e8e93] dark:text-[#8e9299]'}`}>
          {edited && <span className='mr-0.5'>edited </span>}
          {timestamp}
          {views !== undefined && (
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
