'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import {
  ArrowLeft,
  Loader2,
  Radio,
  SendHorizonal,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function ChannelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const [newPost, setNewPost] = useState('');

  const channel = useQuery(api.channels.getChannel, { channelId: id as Id<'channels'> });
  const posts = useQuery(api.channels.getChannelPosts, { channelId: id as Id<'channels'> });
  const isMember = useQuery(
    api.channels.isChannelMember,
    user ? { channelId: id as Id<'channels'>, userId: user.id } : 'skip'
  );
  const userRole = useQuery(
    api.channels.getUserRoleInChannel,
    user ? { channelId: id as Id<'channels'>, userId: user.id } : 'skip'
  );

  const joinChannel = useMutation(api.channels.joinChannel);
  const leaveChannel = useMutation(api.channels.leaveChannel);
  const createPost = useMutation(api.channels.createPost);

  const handleJoin = async () => {
    if (!user) return;
    await joinChannel({ channelId: id as Id<'channels'>, userId: user.id });
  };

  const handleLeave = async () => {
    if (!user) return;
    await leaveChannel({ channelId: id as Id<'channels'>, userId: user.id });
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !user) return;
    await createPost({
      channelId: id as Id<'channels'>,
      authorId: user.id,
      content: newPost.trim(),
    });
    setNewPost('');
  };

  if (!channel) {
    return (
      <div className='flex items-center justify-center h-full py-20'>
        <Loader2 className='w-8 h-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const isAdmin = userRole === 'admin';

  return (
    <div className='max-w-3xl mx-auto w-full py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => router.push('/channels')}
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center shadow-lg'>
            <Radio className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-xl font-bold text-foreground'>{channel.name}</h1>
            <p className='text-sm text-muted-foreground'>
              {channel.subscriberCount || 0} subscribers
              {channel.description && ` · ${channel.description}`}
            </p>
          </div>
        </div>
        <div>
          {isMember ? (
            <div className='flex items-center gap-2'>
              {isAdmin && (
                <span className='text-xs px-2 py-1 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] font-medium'>
                  Admin
                </span>
              )}
              <Button
                variant='outline'
                size='sm'
                onClick={handleLeave}
                className='text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950'
              >
                <UserMinus className='w-4 h-4 mr-1' />
                Leave
              </Button>
            </div>
          ) : (
            <Button
              size='sm'
              onClick={handleJoin}
              className='bg-gradient-to-r from-[#2AABEE] to-[#06D6A0] hover:from-[#1E96C8] hover:to-[#05B88E] text-white'
            >
              <UserPlus className='w-4 h-4 mr-1' />
              Join Channel
            </Button>
          )}
        </div>
      </div>

      {/* Admin: Create Post */}
      {isAdmin && (
        <div className='glass rounded-xl p-4'>
          <div className='flex items-start gap-3'>
            <div className='flex-1'>
              <textarea
                placeholder='Write a post to your channel...'
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
                className='w-full bg-transparent border-none outline-none resize-none text-sm placeholder:text-muted-foreground'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCreatePost();
                  }
                }}
              />
            </div>
            <Button
              size='sm'
              disabled={!newPost.trim()}
              onClick={handleCreatePost}
              className='bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white'
            >
              <SendHorizonal className='w-4 h-4' />
            </Button>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className='space-y-4'>
        {!posts ? (
          <div className='flex items-center justify-center py-10'>
            <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
          </div>
        ) : posts.length === 0 ? (
          <div className='glass rounded-xl p-12 text-center'>
            <Radio className='w-16 h-16 text-muted-foreground/30 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-foreground mb-1'>No posts yet</h3>
            <p className='text-sm text-muted-foreground'>
              {isAdmin
                ? 'Write your first post above'
                : 'Wait for the admin to publish something'}
            </p>
          </div>
        ) : (
          posts.map((post) => {
            const authorName = post.authorId === user?.id ? 'You' : post.authorId;
            return (
              <div key={post._id} className='glass-card p-5'>
                <div className='flex items-start gap-3'>
                  <div className='w-9 h-9 rounded-full bg-gradient-to-br from-[#2AABEE] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0'>
                    {authorName?.charAt(0).toUpperCase() ?? '?'}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='text-sm font-semibold text-foreground'>{authorName}</span>
                      <span className='text-xs text-muted-foreground'>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {post.isPinned && (
                        <span className='text-xs px-1.5 py-0.5 rounded bg-[#2AABEE]/10 text-[#2AABEE]'>
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-foreground whitespace-pre-wrap leading-relaxed'>
                      {post.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChannelDetailPage;
