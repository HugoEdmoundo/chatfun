'use client';

import React from 'react';
import UserSyncWrapper from '@/components/UserSyncWrapper';
import { Chat } from 'stream-chat-react';
import streamClient from '@/lib/stream';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { AppSidebar } from '@/components/app-sidebar';
import 'stream-chat-react/dist/css/v2/index.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserSyncWrapper>
      <Chat client={streamClient} theme='messaging light'>

        <SidebarProvider
          style={
            {
              '--sidebar-width': '19rem',
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 px-4 border-b border-border/40'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
              <Link href='/dashboard' className='flex items-center gap-2'>
                <Image src='/71c607ae-be83-407c-af29-a74ecbaa9e1f.png' alt='ChatFun' width={28} height={28} className='rounded-lg' />
                <h1 className='text-lg font-bold tracking-wider uppercase'>ChatFun</h1>
              </Link>
              <nav className='hidden md:flex items-center gap-6 ml-8'>
                <Link
                  href='/dashboard'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Chats
                </Link>
                <Link
                  href='/channels'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Channels
                </Link>
                <Link
                  href='/docs'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Docs
                </Link>
              </nav>
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </Chat>
    </UserSyncWrapper>
  );
}

export default Layout;
