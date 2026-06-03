'use client';

import React from 'react';
import UserSyncWrapper from '@/components/UserSyncWrapper';
import { Chat } from 'stream-chat-react';
import streamClient from '@/lib/stream';
import { AppSidebar } from '@/components/app-sidebar';
import { MenuRail } from '@/components/MenuRail';
import { VideoCallOverlay } from '@/components/chat/VideoCallOverlay';
import 'stream-chat-react/dist/css/v2/index.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserSyncWrapper>
      <Chat client={streamClient} theme='messaging light'>
        <div className='flex h-screen w-full overflow-hidden bg-white dark:bg-[#0e1621]'>
          <MenuRail />
          <AppSidebar />
          <main className='flex-1 flex flex-col min-w-0 relative'>
            {children}
          </main>
        </div>
        <VideoCallOverlay />
      </Chat>
    </UserSyncWrapper>
  );
}

export default Layout;
