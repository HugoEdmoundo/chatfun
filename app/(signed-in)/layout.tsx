'use client';

import React from 'react';
import UserSyncWrapper from '@/components/UserSyncWrapper';
import { Chat } from 'stream-chat-react';
import streamClient from '@/lib/stream';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import 'stream-chat-react/dist/css/v2/index.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserSyncWrapper>
      <Chat client={streamClient} theme='messaging light'>
        <SidebarProvider
          style={{ '--sidebar-width': '23rem' } as React.CSSProperties}
        >
          <AppSidebar />
          <SidebarInset className='bg-white dark:bg-[#0f0f1a]'>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </Chat>
    </UserSyncWrapper>
  );
}

export default Layout;
