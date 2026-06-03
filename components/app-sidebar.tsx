'use client';
import { useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { ChannelList } from 'stream-chat-react';
import type { ChannelFilters, ChannelSort } from 'stream-chat';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { NewChatDialog } from './NewChatDialog';
import { ChatPreview } from './ChatPreview';
import { SavedMessages } from './chat/SavedMessages';
import { Plus, Search, MessageSquare, Radio } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TabType = 'all' | 'groups' | 'channels';

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const baseFilters: ChannelFilters = {
    members: { $in: user?.id ? [user.id] : [] },
  };

  const tabFilters: Record<TabType, ChannelFilters> = {
    all: { ...baseFilters, type: { $in: ['messaging', 'team'] } },
    groups: { ...baseFilters, type: { $eq: 'team' } },
    channels: { ...baseFilters, type: { $eq: 'messaging' } },
  };

  const filters: ChannelFilters = {
    ...tabFilters[activeTab],
    ...(searchQuery ? { name: { $autocomplete: searchQuery } } : {}),
  };

  const options = { presence: true, state: true };
  const sort: ChannelSort = { last_message_at: -1 };

  const tabs: { key: TabType; label: string; icon: typeof MessageSquare }[] = [
    { key: 'all', label: 'All', icon: MessageSquare },
    { key: 'groups', label: 'Groups', icon: MessageSquare },
    { key: 'channels', label: 'Channels', icon: Radio },
  ];

  return (
    <div className='w-[380px] h-full bg-white dark:bg-[#17212b] border-r border-[#e5e5ea] dark:border-[#1f2c38] flex flex-col flex-shrink-0 z-20'>
      {/* Search Bar */}
      <div className='px-3 pt-3 pb-2'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] dark:text-[#8e9299] pointer-events-none' />
          <input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full h-[42px] pl-10 pr-4 bg-[#f4f4f5] dark:bg-[#242f3d] rounded-[22px] text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] dark:placeholder:text-[#8e9299] outline-none transition-colors'
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='flex items-center gap-0 px-3 pb-2'>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-[#2AABEE]'
                : 'text-[#8e8e93] dark:text-[#8e9299] hover:text-[#000] dark:hover:text-[#fff]'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-[2px] bg-[#2AABEE] rounded-full' />
            )}
          </button>
        ))}
      </div>

      {/* User Profile Bar */}
      <div className='flex items-center justify-between px-3 py-2 border-b border-[#e5e5ea] dark:border-[#1f2c38]'>
        <div className='flex items-center gap-2.5 min-w-0'>
          <div className='w-8 h-8 rounded-full bg-[#2AABEE] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 overflow-hidden'>
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt='' className='w-full h-full object-cover' />
            ) : (
              user?.firstName?.charAt(0) || '?'
            )}
          </div>
          <div className='min-w-0'>
            <p className='text-sm font-medium text-[#000] dark:text-[#fff] truncate leading-tight'>
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-[11px] text-[#8e8e93] dark:text-[#8e9299] truncate leading-tight'>
              {user?.primaryEmailAddress?.emailAddress || ''}
            </p>
          </div>
        </div>
        <UserButton afterSignOutUrl='/sign-in' />
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto tg-scrollbar'>
        <div className='px-3 pt-2 pb-1'>
          <SavedMessages />
        </div>

        <div className='px-3 pb-2'>
          <NewChatDialog>
            <button className='w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'>
              <Plus className='w-4 h-4 text-[#2AABEE]' />
              <span>New Chat</span>
            </button>
          </NewChatDialog>
        </div>

        <ChannelList
          filters={filters}
          options={options}
          sort={sort}
          Preview={ChatPreview}
          EmptyStateIndicator={() => (
            <div className='flex flex-col items-center justify-center py-12 px-4'>
              <ChatBubbleOvalLeftEllipsisIcon className='w-16 h-16 mb-6 text-[#8e8e93] dark:text-[#8e9299] opacity-20' />
              <h2 className='text-xl font-medium text-[#000] dark:text-[#fff] mb-2'>
                Ready to chat?
              </h2>
              <p className='text-sm text-[#8e8e93] dark:text-[#8e9299] text-center leading-relaxed max-w-[200px]'>
                Your conversations will appear here once you start chatting with others.
              </p>
            </div>
          )}
        />
      </div>

      {/* Bottom Channels Link */}
      {pathname !== '/channels' && (
        <div className='border-t border-[#e5e5ea] dark:border-[#1f2c38] px-3 py-2'>
          <Link
            href='/channels'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8e8e93] dark:text-[#8e9299] hover:text-[#000] dark:hover:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
          >
            <Radio className='w-4 h-4' />
            Channels
          </Link>
        </div>
      )}
    </div>
  );
}
