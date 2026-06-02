'use client';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import { Eraser, LogOutIcon, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Channel, ChannelHeader, MessageInput, MessageList, Thread, useChatContext, Window } from 'stream-chat-react';

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();
  const [clearing, setClearing] = useState(false);

  const handleCall = async () => {
    if (!channel || !channel.id) return;
    const callUrl = `${window.location.origin}/dashboard/video-call/${encodeURIComponent(channel.id)}`;
    try {
      await channel.sendMessage({
        text: `Join video call: ${callUrl}`,
      });
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
    router.push(`/dashboard/video-call/${encodeURIComponent(channel.id)}`);
    setOpen(false);
  };

  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (!channel?.data?.own_capabilities) return;
    const needed = ['update-own-message', 'delete-own-message'];
    const hasAll = needed.every(c => channel.data?.own_capabilities?.includes(c));
    if (!hasAll && channel.data) {
      channel.data.own_capabilities = [...channel.data.own_capabilities, ...needed.filter(c => !channel.data?.own_capabilities?.includes(c))];
      setForceUpdate(prev => prev + 1);
    }
  }, [channel]);

  const handleLeaveChat = async () => {
    if (!channel || !user?.id) return;
    const confirm = window.confirm('Are you sure you want to leave this chat?');
    if (!confirm) return;
    try {
      await channel.removeMembers([user.id]);
      setActiveChannel(undefined);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error leaving the chat:', error);
    }
  };

  const handleClearHistory = async () => {
    if (!channel) return;
    const confirm = window.confirm('Delete all messages in this chat? This cannot be undone.');
    if (!confirm) return;
    setClearing(true);
    try {
      await channel.truncate({ hard_delete: true });
    } catch (error) {
      console.error('Error clearing history:', error);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className='flex flex-col w-full flex-1'>
      {channel ? (
        <Channel>
          <Window>
            <div className='flex items-center justify-between'>
              {channel.data?.member_count === 1 ? (
                <ChannelHeader title='Everyone else has left this chat!' />
              ) : (
                <ChannelHeader />
              )}

              <div className='flex items-center gap-2'>
                {(channel.data?.member_count ?? 1) > 1 && (
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleClearHistory}
                    disabled={clearing}
                    className='text-muted-foreground hover:text-foreground'
                  >
                    <Eraser className='w-4 h-4' />
                    Clear
                  </Button>
                )}

                <Button variant='outline' size='sm' onClick={handleCall}>
                  <VideoIcon className='w-4 h-4' />
                  Video Call
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleLeaveChat}
                  className='text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950'
                >
                  <LogOutIcon className='w-4 h-4' />
                  Leave
                </Button>
              </div>
            </div>

            <MessageList messageActions={['edit', 'delete', 'react', 'reply', 'quote']} />

            <div className='sticky bottom-0 w-full'>
              <MessageInput />
            </div>
          </Window>
          <Thread />
        </Channel>
      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <h2 className='text-2xl font-semibold text-muted-foreground mb-4'>No chat selected</h2>
          <p className='text-muted-foreground'>
            Select a chat from the sidebar or start a new conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
