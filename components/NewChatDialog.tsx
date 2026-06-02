'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { useCreateNewChat } from '@/hooks/useCreateNewChat';
import { useUser } from '@clerk/nextjs';
import { ImageIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UserSearch from './UserSearch';

export function NewChatDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Doc<'users'>[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const { user } = useUser();
  const { setActiveChannel } = useChatContext();
  const createNewChat = useCreateNewChat();

  const isGroup = selectedUsers.length > 1;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedUsers([]);
      setGroupName('');
      setGroupDesc('');
    }
  };

  const handleSelectUser = (user: Doc<'users'>) => {
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const removeUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleCreateChat = async () => {
    if (!user) return;
    const totalMembers = selectedUsers.length + 1;
    const isGroupChat = totalMembers > 2;
    const channel = await createNewChat({
      members: [user.id, ...selectedUsers.map((u) => u.userId)],
      createdBy: user.id,
      groupName: isGroupChat ? groupName.trim() || undefined : undefined,
      groupDescription: isGroupChat ? groupDesc.trim() || undefined : undefined,
    });
    setActiveChannel(channel);
    setSelectedUsers([]);
    setGroupName('');
    setGroupDesc('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[520px] max-h-[85vh] overflow-y-auto p-0'>
        <div className='glass-strong rounded-lg'>
          <div className='p-6 pb-0'>
            <DialogHeader>
              <div className='flex items-center gap-3 mb-1'>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden'>
                  <Image src='/71c607ae-be83-407c-af29-a74ecbaa9e1f.png' alt='ChatFun' width={40} height={40} className='object-cover' />
                </div>
                <div>
                  <DialogTitle className='text-lg'>
                    {isGroup ? 'New Group Chat' : 'New Chat'}
                  </DialogTitle>
                  <p className='text-sm text-muted-foreground'>
                    {isGroup
                      ? `Add members to your group`
                      : 'Search and select a user to start chatting'}
                  </p>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className='p-6 space-y-4'>
            <UserSearch onSelectUser={handleSelectUser} className='w-full' />

            {selectedUsers.length > 0 && (
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-sm font-medium text-foreground'>
                    Selected ({selectedUsers.length})
                  </h4>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {selectedUsers.map((u) => (
                    <div
                      key={u._id}
                      className='glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm group'
                    >
                      <Image
                        src={u.imageUrl}
                        alt={u.name}
                        width={20}
                        height={20}
                        className='h-5 w-5 rounded-full object-cover'
                      />
                      <span className='text-foreground text-xs font-medium truncate max-w-[100px]'>
                        {u.name}
                      </span>
                      <button
                        onClick={() => removeUser(u._id)}
                        className='text-muted-foreground hover:text-destructive transition-colors'
                      >
                        <XIcon className='h-3 w-3' />
                      </button>
                    </div>
                  ))}
                </div>

                {isGroup && (
                  <div className='space-y-3 pt-2 border-t border-border/40'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-foreground'>Group Name</label>
                      <Input
                        type='text'
                        placeholder='Enter a name for your group...'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-foreground'>
                        Description <span className='text-muted-foreground'>(optional)</span>
                      </label>
                      <textarea
                        placeholder='What is this group about?'
                        value={groupDesc}
                        onChange={(e) => setGroupDesc(e.target.value)}
                        rows={2}
                        className='flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none'
                      />
                    </div>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <ImageIcon className='w-3.5 h-3.5' />
                      <span>Group photo can be added after creation</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='flex items-center justify-between gap-3 p-6 pt-0 border-t border-border/40 bg-muted/10 rounded-b-lg'>
            <p className='text-xs text-muted-foreground'>
              {selectedUsers.length === 0
                ? 'Search for users above'
                : isGroup
                  ? `${selectedUsers.length + 1} members total`
                  : '1-on-1 chat'}
            </p>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                size='sm'
                disabled={selectedUsers.length === 0}
                onClick={handleCreateChat}
                className='bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white'
              >
                {isGroup ? 'Create Group' : selectedUsers.length === 1 ? 'Start Chat' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
