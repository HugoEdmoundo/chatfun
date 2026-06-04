'use client';

import { useUser } from '@clerk/nextjs';
import { Loader2, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function CreateChannelDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const createChannel = useMutation(api.channels.createChannel);

  const resetForm = () => {
    setName('');
    setDescription('');
    setIsPublic(true);
  };

  const handleCreate = async () => {
    if (!name.trim() || !user) return;
    setLoading(true);
    try {
      const channelId = await createChannel({
        name: name.trim(),
        description: description.trim() || undefined,
        createdBy: user.id,
        isPublic,
      });
      setOpen(false);
      resetForm();
      router.push(`/channels/${channelId}`);
    } catch (error) {
      console.error('Failed to create channel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[460px] p-0'>
        <div className='glass-strong rounded-lg'>
          <div className='p-6 pb-0'>
            <DialogHeader>
              <div className='flex items-center gap-3 mb-1'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center'>
                  <Radio className='w-5 h-5 text-white' />
                </div>
                <div>
                  <DialogTitle className='text-lg'>Create Channel</DialogTitle>
                  <p className='text-sm text-muted-foreground'>
                    Broadcast to unlimited subscribers
                  </p>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className='p-6 space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-foreground'>Channel Name</label>
              <Input
                placeholder='e.g. Tech Updates, Daily News'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-foreground'>
                Description <span className='text-muted-foreground'>(optional)</span>
              </label>
              <textarea
                placeholder='What is this channel about?'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className='flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none'
              />
            </div>
            <div className='flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/40'>
              <div>
                <p className='text-sm font-medium text-foreground'>Public Channel</p>
                <p className='text-xs text-muted-foreground'>Anyone can find and join</p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`relative w-10 h-6 rounded-full transition-colors ${isPublic ? 'bg-[#2AABEE]' : 'bg-muted'}`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isPublic ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          </div>

          <div className='flex items-center justify-between gap-3 p-6 pt-0 border-t border-border/40 bg-muted/10 rounded-b-lg'>
            <p className='text-xs text-muted-foreground'>
              You will be the admin of this channel
            </p>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                size='sm'
                disabled={!name.trim() || loading}
                onClick={handleCreate}
                className='bg-gradient-to-r from-[#2AABEE] to-[#06D6A0] hover:from-[#1E96C8] hover:to-[#05B88E] text-white'
              >
                {loading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  'Create Channel'
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
