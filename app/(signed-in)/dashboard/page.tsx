'use client';

import { ChatProvider, useChat } from '@/components/chat/ChatContext';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatSearch } from '@/components/chat/ChatSearch';
import { ChatDeleteDialog } from '@/components/chat/ChatDeleteDialog';
import { ChatForwardDialog } from '@/components/chat/ChatForwardDialog';
import { MultiSelectBar } from '@/components/chat/MultiSelectBar';
import { PinnedMessages } from '@/components/chat/PinnedMessages';
import { ChatHeader } from '@/components/ChatHeader';
import { MessageSquare } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { Channel, MessageList, Thread, Window } from 'stream-chat-react';

function DashboardInner() {
  const { channel } = useChatContext();
  const chat = useChat();
  const { multiSelectMode } = chat;

  if (!channel) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='w-20 h-20 rounded-full bg-[#f4f4f5] dark:bg-[#2a2a3e] flex items-center justify-center mb-6'>
          <MessageSquare className='w-10 h-10 text-[#8e8e93]' />
        </div>
        <h2 className='text-xl font-medium text-[#000] dark:text-[#fff] mb-2'>Select a chat</h2>
        <p className='text-sm text-[#8e8e93] text-center max-w-[250px]'>
          Choose a conversation from the sidebar or start a new one
        </p>
      </div>
    );
  }

  return (
    <Channel Message={ChatMessage}>
      <Window>
        <ChatHeader />
        <ChatSearch />
        <PinnedMessages />
        <MessageList messageActions={[]} />
        {multiSelectMode && <MultiSelectBar />}
        <ChatInput />
      </Window>
      <Thread />
    </Channel>
  );
}

function Dashboard() {
  return (
    <ChatProvider>
      <div className='flex flex-col w-full h-full bg-white dark:bg-[#0f0f1a]'>
        <DashboardInner />
        <ChatDeleteDialog />
        <ChatForwardDialog />
      </div>
    </ChatProvider>
  );
}

export default Dashboard;
