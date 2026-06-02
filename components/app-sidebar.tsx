'use client';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { ChannelList } from 'stream-chat-react';
import type { ChannelFilters, ChannelSort } from 'stream-chat';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { NewChatDialog } from './NewChatDialog';
import { ChatPreview } from './ChatPreview';
import { SavedMessages } from './chat/SavedMessages';
import { LogOut, Menu, MessageSquare, Plus, Radio, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filters: ChannelFilters = {
    members: { $in: user?.id ? [user.id] : [] },
    type: { $in: ['messaging', 'team'] },
    ...(searchQuery ? { name: { $autocomplete: searchQuery } } : {}),
  };

  const options = { presence: true, state: true };
  const sort: ChannelSort = { last_message_at: -1 };

  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader className='p-0'>
        <div className='flex items-center gap-2 px-3 py-2.5 border-b border-[#e5e5ea] dark:border-[#3a3a3c]'>
          <div className='relative'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] transition-colors flex-shrink-0'
            >
              <Menu className='w-5 h-5 text-[#000] dark:text-[#fff]' />
            </button>
            {menuOpen && (
              <>
                <div className='fixed inset-0 z-40' onClick={() => setMenuOpen(false)} />
                <div className='absolute left-0 top-full mt-1 z-50 w-56 bg-white dark:bg-[#2c2c2e] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#3a3a3c] py-1 overflow-hidden'>
                  <div className='px-4 py-3 border-b border-[#e5e5ea] dark:border-[#3a3a3c]'>
                    <p className='text-xs text-[#8e8e93]'>Signed in as</p>
                    <p className='text-sm font-medium text-[#000] dark:text-[#fff] truncate'>
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <Link
                    href='/dashboard'
                    onClick={() => setMenuOpen(false)}
                    className='flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c] transition-colors'
                  >
                    <MessageSquare className='w-4 h-4 text-[#8e8e93]' />
                    Chats
                  </Link>
                  <Link
                    href='/channels'
                    onClick={() => setMenuOpen(false)}
                    className='flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c] transition-colors'
                  >
                    <Radio className='w-4 h-4 text-[#8e8e93]' />
                    Channels
                  </Link>
                  <Link
                    href='/docs'
                    onClick={() => setMenuOpen(false)}
                    className='flex items-center gap-3 px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c] transition-colors'
                  >
                    <Search className='w-4 h-4 text-[#8e8e93]' />
                    Docs
                  </Link>
                  <div className='h-px bg-[#e5e5ea] dark:border-[#3a3a3c] my-1' />
                  <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#fff0f0] dark:hover:bg-[#3a1a1a] transition-colors'
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
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] pointer-events-none' />
            <input
              type='text'
              placeholder='Search messages or users...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full h-9 pl-9 pr-3 bg-[#f4f4f5] dark:bg-[#2a2a3e] rounded-lg text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] outline-none transition-colors focus:bg-[#e8e8ea] dark:focus:bg-[#333350]'
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='p-0'>
        <SidebarGroup className='p-0'>
          <SidebarMenu className='gap-0'>
            <SavedMessages />

            <div className='px-3 py-2'>
              <NewChatDialog>
                <Button className='w-full justify-start gap-2 h-10 rounded-lg bg-[#2AABEE] hover:bg-[#1E96C8] text-white text-sm font-medium shadow-none border-none'>
                  <Plus className='w-4 h-4' />
                  New Chat
                </Button>
              </NewChatDialog>
            </div>

            <ChannelList
              filters={filters}
              options={options}
              sort={sort}
              Preview={ChatPreview}
              EmptyStateIndicator={() => (
                <div className='flex flex-col items-center justify-center py-12 px-4'>
                  <ChatBubbleOvalLeftEllipsisIcon className='w-16 h-16 mb-6 text-[#8e8e93] opacity-20' />
                  <h2 className='text-xl font-medium text-[#000] dark:text-[#fff] mb-2'>
                    Ready to chat?
                  </h2>
                  <p className='text-sm text-[#8e8e93] text-center leading-relaxed max-w-[200px]'>
                    Your conversations will appear here once you start chatting with others.
                  </p>
                </div>
              )}
            />
          </SidebarMenu>
        </SidebarGroup>

        {pathname !== '/channels' && (
          <div className='border-t border-[#e5e5ea] dark:border-[#3a3a3c] px-3 py-2'>
            <Link
              href='/channels'
              className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8e8e93] hover:text-[#000] dark:hover:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e] transition-colors'
            >
              <Radio className='w-4 h-4' />
              Channels
            </Link>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
