'use client';

import { type ReactNode } from 'react';

export function ChatMessageBubble({
  isMine,
  children,
  className = '',
}: {
  isMine: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-block max-w-[85%] px-3 py-[7px] text-sm leading-relaxed break-words ${
        isMine
          ? 'bg-[#c8e6ff] dark:bg-[#1e3a5f] text-black dark:text-white rounded-[16px_16px_4px_16px]'
          : 'bg-[#f0f2f5] dark:bg-[#2c2c2e] text-black dark:text-white rounded-[16px_16px_16px_4px]'
      } ${className}`}
    >
      {children}
      <span
        className={`absolute bottom-0 w-0 h-0 border-[6px] ${
          isMine
            ? 'right-[-6px] border-l-[#c8e6ff] dark:border-l-[#1e3a5f] border-transparent border-l-[6px] border-r-0 border-b-0'
            : 'left-[-6px] border-r-[#f0f2f5] dark:border-r-[#2c2c2e] border-transparent border-r-[6px] border-l-0 border-b-0'
        }`}
        style={{ bottom: 0 }}
      />
    </div>
  );
}
