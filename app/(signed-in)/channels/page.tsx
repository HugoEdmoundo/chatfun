'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { Loader2, Plus, Radio, Users } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { CreateChannelDialog } from '@/components/channel/CreateChannelDialog';

function ChannelsPage() {
  const { user } = useUser();
  const myChannels = useQuery(api.channels.getChannelsByUser, user ? { userId: user.id } : 'skip');
  const publicChannels = useQuery(api.channels.getPublicChannels);

  if (!myChannels || !publicChannels) {
    return (
      <div className='flex items-center justify-center h-full py-20'>
        <Loader2 className='w-8 h-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto w-full space-y-10 py-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>Channels</h1>
          <p className='text-muted-foreground text-sm'>Discover and join channels</p>
        </div>
        <CreateChannelDialog>
          <Button className='bg-gradient-to-r from-[#2AABEE] to-[#06D6A0] hover:from-[#1E96C8] hover:to-[#05B88E] text-white shadow-md'>
            <Plus className='w-4 h-4 mr-2' />
            Create Channel
          </Button>
        </CreateChannelDialog>
      </div>

      {myChannels.length > 0 && (
        <section>
          <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
            <Radio className='w-4 h-4 text-[#2AABEE]' />
            Your Channels
          </h2>
          <div className='grid gap-3'>
            {myChannels.map((channel) => (
              <ChannelCard key={channel._id} channel={channel} isMember />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Users className='w-4 h-4 text-[#2AABEE]' />
          Discover Public Channels
        </h2>
        <div className='grid gap-3'>
          {publicChannels
            .filter((ch) => !myChannels.find((mc) => mc._id === ch._id))
            .map((channel) => (
              <ChannelCard key={channel._id} channel={channel} />
            ))}
          {publicChannels.filter((ch) => !myChannels.find((mc) => mc._id === ch._id)).length ===
            0 && (
            <div className='glass rounded-xl p-8 text-center'>
              <Radio className='w-12 h-12 text-muted-foreground/40 mx-auto mb-3' />
              <p className='text-muted-foreground'>No public channels yet</p>
              <p className='text-sm text-muted-foreground/60 mt-1'>
                Be the first to create one!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ChannelCard({
  channel,
  isMember,
}: {
  channel: Doc<'channels'> & { role?: string };
  isMember?: boolean;
}) {
  return (
    <Link href={`/channels/${channel._id}`}>
      <div className='glass-card p-5 flex items-center justify-between group cursor-pointer'>
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center shadow-lg flex-shrink-0'>
            <Radio className='w-6 h-6 text-white' />
          </div>
          <div>
            <h3 className='font-semibold text-foreground group-hover:text-[#2AABEE] transition-colors'>
              {channel.name}
            </h3>
            <p className='text-sm text-muted-foreground line-clamp-1'>
              {channel.description || 'No description'}
            </p>
            <div className='flex items-center gap-3 mt-1'>
              <span className='text-xs text-muted-foreground'>
                {channel.subscriberCount || 0} subscribers
              </span>
              {isMember && (
                <span className='text-xs px-2 py-0.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] font-medium'>
                  {channel.role === 'admin' ? 'Admin' : 'Member'}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='text-sm text-muted-foreground group-hover:text-[#2AABEE] transition-colors'>
          {isMember ? 'Open →' : 'Join →'}
        </div>
      </div>
    </Link>
  );
}

export default ChannelsPage;
