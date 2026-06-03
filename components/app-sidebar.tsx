'use client';
import { useState, useEffect } from 'react';
import { useUser, useClerk, SignOutButton } from '@clerk/nextjs';
import { ChannelList, useChatContext } from 'stream-chat-react';
import type { ChannelFilters, ChannelSort } from 'stream-chat';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { ChatPreview } from './ChatPreview';
import { SavedMessages } from './chat/SavedMessages';
import { Search, MessageSquare, Radio, Moon, Sun, Settings, LogOut, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { useCreateNewChat } from '@/hooks/useCreateNewChat';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type TabType = 'all' | 'groups' | 'channels';

export function AppSidebar() {
  const { user } = useUser();
  const clerk = useClerk();
  const { setActiveChannel } = useChatContext();
  const router = useRouter();
  const createNewChat = useCreateNewChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const searchActive = debouncedSearch.trim().length > 0;

  const userResults = useQuery(api.users.searchUsers, searchActive ? { searchTerm: debouncedSearch } : 'skip');
  const users: Doc<'users'>[] = (userResults || []).filter((u) => u.userId !== user?.id);

  const userChannels = useQuery(api.channels.getChannelsByUser, user?.id ? { userId: user.id } : 'skip');
  const channelResults: (Doc<'channels'> & { role: 'admin' | 'subscriber' })[] = (userChannels || [])
    .filter((ch) => ch.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .slice(0, 5);

  const handleSelectUser = async (selectedUser: Doc<'users'>) => {
    if (!user) return;
    try {
      const channel = await createNewChat({
        members: [user.id, selectedUser.userId],
        createdBy: user.id,
      });
      setActiveChannel(channel);
      setSearchQuery('');
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(stored ? stored === 'dark' : prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

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
    <div className='w-[380px] h-full bg-white dark:bg-[#17212b] border-r border-[#e5e5ea] dark:border-[#1f2c38] flex flex-col flex-shrink-0 z-20 relative'>
      {/* Search Bar */}
      <div className='px-3 pt-3 pb-2'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='w-7 h-7 rounded-full bg-[#2AABEE] flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity'
            >
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt='' className='w-full h-full object-cover' />
              ) : (
                user?.firstName?.charAt(0) || '?'
              )}
            </button>
            {dropdownOpen && (
              <>
                <div className='fixed inset-0 z-40' onClick={() => setDropdownOpen(false)} />
                <div className='absolute left-0 top-full mt-1.5 z-50 w-60 bg-white dark:bg-[#17212b] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#1f2c38] py-2 overflow-hidden'>
                  <div className='px-4 py-2'>
                    <p className='text-sm font-medium text-[#000] dark:text-[#fff] truncate'>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className='text-xs text-[#8e8e93] dark:text-[#8e9299] truncate mt-0.5'>
                      {user?.primaryEmailAddress?.emailAddress || ''}
                    </p>
                  </div>
                  <div className='h-px bg-[#e5e5ea] dark:bg-[#1f2c38] my-1' />
                  <button
                    onClick={() => { toggleTheme(); setDropdownOpen(false); }}
                    className='w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
                  >
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    {isDark ? <Sun className='w-4 h-4 text-[#8e8e93] dark:text-[#8e9299]' /> : <Moon className='w-4 h-4 text-[#8e8e93] dark:text-[#8e9299]' />}
                  </button>
                  <div className='h-px bg-[#e5e5ea] dark:bg-[#1f2c38] my-1' />
                  <button
                    onClick={() => { (clerk as any).openUserProfile(); setDropdownOpen(false); }}
                    className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
                  >
                    <Settings className='w-4 h-4 text-[#8e8e93] dark:text-[#8e9299]' />
                    Manage Account
                  </button>
                  <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
                    >
                      <LogOut className='w-4 h-4' />
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </>
            )}
          </div>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] dark:text-[#8e9299] pointer-events-none' />
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full h-[38px] pl-9 pr-4 bg-[#f4f4f5] dark:bg-[#242f3d] rounded-[22px] text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] dark:placeholder:text-[#8e9299] outline-none transition-colors'
            />

            {searchActive && (users.length > 0 || channelResults.length > 0) && (
              <div className='absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-[#17212b] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#1f2c38] py-2 overflow-hidden'>
                {users.length > 0 && (
                  <div>
                    <div className='px-4 py-1.5 text-xs font-medium text-[#8e8e93] dark:text-[#8e9299] uppercase tracking-wider'>
                      People
                    </div>
                    {users.slice(0, 5).map((u) => (
                      <button
                        key={u._id}
                        onClick={() => {
                          setSearchQuery('');
                          handleSelectUser(u);
                        }}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
                      >
                        <div className='w-7 h-7 rounded-full bg-[#2AABEE] flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0 overflow-hidden'>
                          {u.imageUrl ? (
                            <img src={u.imageUrl} alt='' className='w-full h-full object-cover' />
                          ) : (
                            u.name.charAt(0)
                          )}
                        </div>
                        <div className='flex-1 min-w-0 text-left'>
                          <p className='text-sm font-medium truncate'>{u.name}</p>
                          <p className='text-xs text-[#8e8e93] dark:text-[#8e9299] truncate'>{u.email}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {channelResults.length > 0 && (
                  <div>
                    {users.length > 0 && <div className='h-px bg-[#e5e5ea] dark:bg-[#1f2c38] my-1' />}
                    <div className='px-4 py-1.5 text-xs font-medium text-[#8e8e93] dark:text-[#8e9299] uppercase tracking-wider'>
                      Channels
                    </div>
                    {channelResults.map((ch) => (
                      <Link
                        key={ch._id}
                        href={`/channels/${ch._id}`}
                        onClick={() => setSearchQuery('')}
                        className='flex items-center gap-3 px-4 py-2 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] transition-colors'
                      >
                        <div className='w-7 h-7 rounded-full bg-[#06D6A0] flex items-center justify-center text-white flex-shrink-0'>
                          <Radio className='w-3.5 h-3.5' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium truncate'>{ch.name}</p>
                          <p className='text-xs text-[#8e8e93] dark:text-[#8e9299] truncate'>
                            {ch.subscriberCount} subscriber{ch.subscriberCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
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

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto tg-scrollbar'>
        <div className='px-3 pt-2 pb-1'>
          <SavedMessages />
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
    </div>
  );
}
