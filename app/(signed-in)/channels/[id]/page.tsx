'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useMutation, usePaginatedQuery, useQuery } from 'convex/react';
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  Megaphone,
  Pencil,
  Reply,
  Send,
  Trash2,
  UserPlus,
  UserMinus,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

function relativeTime(ms: number) {
  const diff = Date.now() - ms;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const EMOJI_LIST = ['👍', '❤️', '😮'];

function CommentBubble({
  comment,
  parentComment,
  channelId,
  postId,
  userId,
  isAdmin,
  userName,
  userImage,
  parentUserName,
  onReply,
}: {
  comment: Doc<'channelComments'>;
  parentComment?: Doc<'channelComments'>;
  channelId: Id<'channels'>;
  postId: Id<'channelPosts'>;
  userId: string;
  isAdmin: boolean;
  userName: string;
  userImage?: string;
  parentUserName?: string;
  onReply: (comment: Doc<'channelComments'>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const updateComment = useMutation(api.channels.updateComment);
  const deleteComment = useMutation(api.channels.deleteComment);
  const toggleReaction = useMutation(api.channels.toggleReaction);

  const isOwn = comment.authorId === userId;
  const initials = userName.charAt(0).toUpperCase() || '?';

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    try {
      await updateComment({
        commentId: comment._id,
        userId,
        content: editContent.trim(),
      });
      setEditing(false);
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment({ commentId: comment._id, channelId, userId });
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleReact = async (emoji: string) => {
    try {
      await toggleReaction({ commentId: comment._id, postId, channelId, userId, emoji });
    } catch (err) {
      console.error('Failed to toggle reaction:', err);
    }
  };

  const reactionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of comment.reactions ?? []) {
      counts[r.emoji] = (counts[r.emoji] || 0) + 1;
    }
    return counts;
  }, [comment.reactions]);

  const hasReacted = (emoji: string) =>
    (comment.reactions ?? []).some((r) => r.emoji === emoji && r.userId === userId);

  return (
    <div className='flex items-start gap-2.5 group'>
      {/* Avatar */}
      <div
        className='w-8 h-8 rounded-full flex-shrink-0 bg-cover bg-center mt-0.5'
        style={{
          backgroundImage: userImage
            ? `url(${userImage})`
            : 'linear-gradient(135deg, #2AABEE, #8B5CF6)',
        }}
      >
        {!userImage && (
          <div className='w-full h-full flex items-center justify-center text-white text-xs font-semibold'>
            {initials}
          </div>
        )}
      </div>

      <div className='flex-1 min-w-0'>
        {/* Name row */}
        <div className='flex items-center gap-1.5 mb-0.5'>
          <span className='text-xs font-semibold text-foreground'>{userName}</span>
        </div>

        {/* Bubble */}
        <div className='bg-[#f0f2f5] dark:bg-zinc-800 rounded-lg rounded-tl-sm px-3 py-2 max-w-[85%] inline-block'>
          {/* Reply quote */}
          {parentComment && parentUserName && (
            <div className='border-l-2 border-[#2AABEE] pl-2 mb-1 text-xs text-muted-foreground'>
              <span className='font-medium text-[#2AABEE]'>@{parentUserName}</span>
              <p className='line-clamp-1'>{parentComment.content}</p>
            </div>
          )}

          {/* Content */}
          {editing ? (
            <div className='flex items-start gap-1'>
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className='flex-1 bg-white dark:bg-zinc-700 border border-border/40 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-[#2AABEE]'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleUpdate();
                  }
                  if (e.key === 'Escape') {
                    setEditing(false);
                    setEditContent(comment.content);
                  }
                }}
                autoFocus
              />
              <button onClick={handleUpdate}>
                <Check className='w-3.5 h-3.5 text-green-500 hover:text-green-600' />
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditContent(comment.content);
                }}
              >
                <X className='w-3.5 h-3.5 text-muted-foreground hover:text-foreground' />
              </button>
            </div>
          ) : (
            <p className='text-sm text-foreground whitespace-pre-wrap leading-relaxed'>
              {comment.content}
            </p>
          )}
        </div>

        {/* Bottom row: time + reactions + reply */}
        <div className='flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground'>
          <span>{relativeTime(comment.createdAt)}</span>

          {EMOJI_LIST.map((emoji) => {
            const count = reactionCounts[emoji] || 0;
            const active = hasReacted(emoji);
            return (
              <button
                key={emoji}
                onClick={() => handleReact(emoji)}
                className={`flex items-center gap-0.5 hover:text-foreground transition-colors ${
                  active ? 'text-[#2AABEE]' : ''
                }`}
              >
                <span className='text-sm'>{emoji}</span>
                {count > 0 && <span>{count}</span>}
              </button>
            );
          })}

          <button
            onClick={() => onReply(comment)}
            className='flex items-center gap-1 hover:text-foreground transition-colors'
          >
            <Reply className='w-3 h-3' />
            Reply
          </button>

          {/* Edit/Delete — only on hover */}
          <div className='hidden group-hover:flex items-center gap-1'>
            {isOwn && (
              <button
                onClick={() => {
                  setEditing(true);
                  setEditContent(comment.content);
                }}
                className='hover:text-foreground'
              >
                <Pencil className='w-3 h-3' />
              </button>
            )}
            {(isOwn || isAdmin) && (
              <button onClick={handleDelete} className='hover:text-red-500'>
                <Trash2 className='w-3 h-3' />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostWithComments({
  post,
  channelId,
  userId,
  isAdmin,
  isMember,
  editingPostId,
  editingPostContent,
  onStartEditPost,
  onEditPost,
  onCancelEditPost,
  onDeletePost,
  onEditingPostContentChange,
}: {
  post: Doc<'channelPosts'>;
  channelId: Id<'channels'>;
  userId: string;
  isAdmin: boolean;
  isMember: boolean;
  editingPostId: Id<'channelPosts'> | null;
  editingPostContent: string;
  onStartEditPost: (post: Doc<'channelPosts'>) => void;
  onEditPost: (postId: Id<'channelPosts'>) => Promise<void>;
  onCancelEditPost: () => void;
  onDeletePost: (postId: Id<'channelPosts'>) => Promise<void>;
  onEditingPostContentChange: (value: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<Doc<'channelComments'> | null>(null);

  const comments = useQuery(
    api.channels.getPostComments,
    showComments ? { postId: post._id, channelId, userId } : 'skip'
  );
  const commentCount = useQuery(
    api.channels.getPostCommentCount,
    { postId: post._id }
  );
  const createComment = useMutation(api.channels.createComment);
  const togglePostReaction = useMutation(api.channels.togglePostReaction);

  const topLevel = useMemo(
    () => (comments || []).filter((c) => !c.parentCommentId),
    [comments]
  );
  const repliesByParent = useMemo(() => {
    const map: Record<string, Doc<'channelComments'>[]> = {};
    for (const c of comments || []) {
      if (c.parentCommentId) {
        const key = c.parentCommentId;
        if (!map[key]) map[key] = [];
        map[key].push(c);
      }
    }
    return map;
  }, [comments]);

  const allAuthorIds = useMemo(() => {
    const ids = new Set<string>();
    ids.add(post.authorId);
    for (const c of comments || []) {
      ids.add(c.authorId);
    }
    return Array.from(ids);
  }, [comments, post.authorId]);

  const usersMap = useQuery(
    api.users.getUsersBatch,
    showComments ? { userIds: allAuthorIds } : 'skip'
  );

  const postAuthor = usersMap?.[post.authorId];
  const postAuthorName = post.authorId === userId ? 'You' : postAuthor?.name || post.authorId;

  const handleCreateComment = async () => {
    if (!newComment.trim()) return;
    try {
      await createComment({
        postId: post._id,
        channelId,
        authorId: userId,
        content: newComment.trim(),
        parentCommentId: replyingTo?._id,
      });
      setNewComment('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Failed to create comment:', err);
    }
  };

  const handleReply = (comment: Doc<'channelComments'>) => {
    setReplyingTo(comment);
  };

  const postReactionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of post.reactions ?? []) {
      counts[r.emoji] = (counts[r.emoji] || 0) + 1;
    }
    return counts;
  }, [post.reactions]);

  const hasPostReacted = (emoji: string) =>
    (post.reactions ?? []).some((r) => r.emoji === emoji && r.userId === userId);

  const handlePostReact = async (emoji: string) => {
    try {
      await togglePostReaction({ postId: post._id, channelId, userId, emoji });
    } catch (err) {
      console.error('Failed to react to post:', err);
    }
  };

  const totalComments = commentCount ?? 0;

  return (
    <div className='glass-card p-5 space-y-3'>
      {/* Post content */}
      <div className='flex items-start gap-3'>
        <div
          className='w-10 h-10 rounded-full flex-shrink-0 bg-cover bg-center'
          style={{
            backgroundImage: postAuthor?.imageUrl
              ? `url(${postAuthor.imageUrl})`
              : 'linear-gradient(135deg, #2AABEE, #8B5CF6)',
          }}
        >
          {!postAuthor?.imageUrl && (
            <div className='w-full h-full flex items-center justify-center text-white text-sm font-semibold'>
              {postAuthorName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='text-sm font-semibold text-foreground'>{postAuthorName}</span>
            <span className='text-xs text-muted-foreground'>
              {relativeTime(post.createdAt)}
            </span>
            {post.isPinned && (
              <span className='text-xs px-1.5 py-0.5 rounded bg-[#2AABEE]/10 text-[#2AABEE]'>
                Pinned
              </span>
            )}
          </div>
          {editingPostId === post._id ? (
            <div className='flex items-start gap-1'>
              <input
                value={editingPostContent}
                onChange={(e) => onEditingPostContentChange(e.target.value)}
                className='flex-1 bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#2AABEE]'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onEditPost(post._id);
                  }
                  if (e.key === 'Escape') {
                    onCancelEditPost();
                  }
                }}
                autoFocus
              />
              <button onClick={() => onEditPost(post._id)}>
                <Check className='w-4 h-4 text-green-500 hover:text-green-600' />
              </button>
              <button onClick={onCancelEditPost}>
                <X className='w-4 h-4 text-muted-foreground hover:text-foreground' />
              </button>
            </div>
          ) : (
            <p className='text-sm text-foreground whitespace-pre-wrap leading-relaxed'>
              {post.content}
            </p>
          )}
          {post.imageUrl && (
            <div className='mt-2 rounded-lg overflow-hidden border border-border/40'>
              <Image
                src={post.imageUrl}
                alt='Post image'
                width={600}
                height={400}
                className='w-full object-cover max-h-96'
                unoptimized
              />
            </div>
          )}
        </div>
        {isAdmin && editingPostId !== post._id && (
          <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
            <button
              onClick={() => onStartEditPost(post)}
              className='text-muted-foreground hover:text-foreground'
            >
              <Pencil className='w-3.5 h-3.5' />
            </button>
            <button
              onClick={() => onDeletePost(post._id)}
              className='text-muted-foreground hover:text-red-500'
            >
              <Trash2 className='w-3.5 h-3.5' />
            </button>
          </div>
        )}
      </div>

      {/* Post reactions */}
      {isMember && (
        <div className='flex items-center gap-3 text-xs text-muted-foreground pl-[52px]'>
          {EMOJI_LIST.map((emoji) => {
            const count = postReactionCounts[emoji] || 0;
            const active = hasPostReacted(emoji);
            return (
              <button
                key={emoji}
                onClick={() => handlePostReact(emoji)}
                className={`flex items-center gap-0.5 hover:text-foreground transition-colors ${
                  active ? 'text-[#2AABEE]' : ''
                }`}
              >
                <span className='text-sm'>{emoji}</span>
                {count > 0 && <span>{count}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Toggle comments */}
      {isMember && (
        <button
          onClick={() => setShowComments(!showComments)}
          className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pl-[52px]'
        >
          <MessageSquare className='w-3.5 h-3.5' />
          {totalComments > 0 ? `${totalComments} comments` : 'Comments'}
        </button>
      )}

      {/* Comments section */}
      {showComments && (
        <div className='space-y-4'>
          {/* Comment input */}
          <div className='flex items-start gap-2.5'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#06D6A0] to-[#2AABEE] flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold'>
              {userId ? userId.charAt(0).toUpperCase() : '?'}
            </div>
            <div className='flex-1 min-w-0'>
              {/* Reply indicator */}
              {replyingTo && (() => {
                const replyUser = usersMap?.[replyingTo.authorId];
                const replyName = replyUser?.name || replyingTo.authorId;
                return (
                  <div className='flex items-center gap-2 mb-1 px-1'>
                    <Reply className='w-3 h-3 text-[#2AABEE]' />
                    <span className='text-xs text-muted-foreground'>
                      Reply to <span className='font-medium text-[#2AABEE]'>@{replyName}</span>
                    </span>
                    <button onClick={() => { setReplyingTo(null); setNewComment(''); }}>
                      <X className='w-3 h-3 text-muted-foreground hover:text-foreground' />
                    </button>
                  </div>
                );
              })()}
              <div className='flex items-start gap-2'>
                <input
                  placeholder={
                    replyingTo ? 'Write a reply...' : 'Write a comment...'
                  }
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className='flex-1 bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#2AABEE] placeholder:text-muted-foreground'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCreateComment();
                    }
                    if (e.key === 'Escape') {
                      setReplyingTo(null);
                    }
                  }}
                />
                <Button
                  size='sm'
                  disabled={!newComment.trim()}
                  onClick={handleCreateComment}
                  className='bg-gradient-to-r from-[#2AABEE] to-[#06D6A0] hover:from-[#1E96C8] hover:to-[#05B88E] text-white'
                >
                  <Send className='w-3.5 h-3.5' />
                </Button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          {!comments ? (
            <div className='flex justify-center py-4'>
              <Loader2 className='w-5 h-5 animate-spin text-muted-foreground' />
            </div>
          ) : topLevel.length === 0 ? (
            <p className='text-xs text-muted-foreground text-center py-2'>No comments yet</p>
          ) : (
            <div className='space-y-4'>
              {topLevel.map((comment) => {
                const author = usersMap?.[comment.authorId];
                const name = author?.name || comment.authorId;
                const image = author?.imageUrl;
                const replies = repliesByParent[comment._id] || [];

                return (
                  <div key={comment._id}>
                    <CommentBubble
                      comment={comment}
                      channelId={channelId}
                      postId={post._id}
                      userId={userId}
                      isAdmin={isAdmin}
                      userName={name}
                      userImage={image}
                      onReply={handleReply}
                    />

                    {/* Replies */}
                    {replies.length > 0 && (
                      <div className='ml-10 mt-3 space-y-3 border-l-2 border-border/40 pl-4'>
                        {replies.map((reply) => {
                          const replyAuthor = usersMap?.[reply.authorId];
                          const replyName = replyAuthor?.name || reply.authorId;
                          const replyImage = replyAuthor?.imageUrl;

                          return (
                            <CommentBubble
                              key={reply._id}
                              comment={reply}
                              parentComment={comment}
                              channelId={channelId}
                              postId={post._id}
                              userId={userId}
                              isAdmin={isAdmin}
                              userName={replyName}
                              userImage={replyImage}
                              parentUserName={name}
                              onReply={handleReply}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChannelDetailPage() {
  const { id } = useParams();
  const channelId = id as Id<'channels'>;
  const router = useRouter();
  const { user } = useUser();
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postImagePreview, setPostImagePreview] = useState<string | null>(null);
  const [postUploading, setPostUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editChannelOpen, setEditChannelOpen] = useState(false);
  const [editChannelLoading, setEditChannelLoading] = useState(false);
  const [editChannelName, setEditChannelName] = useState('');
  const [editChannelDesc, setEditChannelDesc] = useState('');
  const [editChannelPublic, setEditChannelPublic] = useState(true);

  const channel = useQuery(
    api.channels.getChannel,
    user ? { channelId: channelId, userId: user.id } : { channelId: channelId }
  );
  const {
    results: posts,
    status: postsStatus,
    loadMore: loadMorePosts,
  } = usePaginatedQuery(
    api.channels.getChannelPosts,
    user ? { channelId: channelId, userId: user.id } : { channelId: channelId },
    { initialNumItems: 10 }
  );
  const isMember = useQuery(
    api.channels.isChannelMember,
    user ? { channelId: channelId, userId: user.id } : 'skip'
  );
  const userRole = useQuery(
    api.channels.getUserRoleInChannel,
    user ? { channelId: channelId, userId: user.id } : 'skip'
  );

  const joinChannel = useMutation(api.channels.joinChannel);
  const leaveChannel = useMutation(api.channels.leaveChannel);
  const createPost = useMutation(api.channels.createPost);
  const createPostWithImage = useMutation(api.channels.createPostWithImage);
  const generateUploadUrl = useMutation(api.channels.generateUploadUrl);
  const deleteChannelMutation = useMutation(api.channels.deleteChannelMutation);
  const updateChannelMutation = useMutation(api.channels.updateChannel);
  const updatePostMutation = useMutation(api.channels.updatePost);
  const deletePostMutation = useMutation(api.channels.deletePostMutation);
  const [editingPostId, setEditingPostId] = useState<Id<'channelPosts'> | null>(null);
  const [editingPostContent, setEditingPostContent] = useState('');

  const handleJoin = async () => {
    if (!user) return;
    try {
      await joinChannel({ channelId, userId: user.id });
    } catch (err) {
      console.error('Failed to join channel:', err);
    }
  };

  const handleLeave = async () => {
    if (!user) return;
    try {
      await leaveChannel({ channelId, userId: user.id });
    } catch (err) {
      console.error('Failed to leave channel:', err);
    }
  };

  const handleCreatePost = async () => {
    if ((!newPost.trim() && !postImage) || !user) return;
    try {
      setPostUploading(true)
      if (postImage) {
        const uploadUrl = await generateUploadUrl()
        const formData = new FormData()
        formData.append('file', postImage)
        const response = await fetch(uploadUrl, { method: 'POST', body: formData })
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
        }
        const { storageId } = await response.json()
        if (!storageId) throw new Error('No storage ID returned from upload')
        await createPostWithImage({
          channelId: channelId,
          authorId: user.id,
          content: newPost.trim() || ' ',
          storageId,
        })
      } else {
        await createPost({
          channelId: channelId,
          authorId: user.id,
          content: newPost.trim(),
        })
      }
      setNewPost('');
      setPostImage(null);
      setPostImagePreview(null);
    } catch (err) {
      console.error('Failed to create post:', err)
    } finally {
      setPostUploading(false)
    }
  };

  const handleDeleteChannel = async () => {
    if (!user) return;
    const confirm = window.confirm('Are you sure you want to delete this channel? All posts and comments will be permanently deleted.');
    if (!confirm) return;
    try {
      await deleteChannelMutation({ channelId: channelId, userId: user.id });
      router.push('/channels');
    } catch (err) {
      console.error('Failed to delete channel:', err);
    }
  };

  const handleEditChannel = async () => {
    if (!user || !editChannelName.trim()) return;
    setEditChannelLoading(true);
    try {
      await updateChannelMutation({
        channelId: channelId,
        userId: user.id,
        name: editChannelName.trim(),
        description: editChannelDesc.trim() || undefined,
        isPublic: editChannelPublic,
      });
      setEditChannelOpen(false);
    } catch (err) {
      console.error('Failed to update channel:', err);
    } finally {
      setEditChannelLoading(false);
    }
  };

  const openEditChannel = () => {
    if (!channel) return;
    setEditChannelName(channel.name);
    setEditChannelDesc(channel.description || '');
    setEditChannelPublic(channel.isPublic);
    setEditChannelOpen(true);
  };

  const handleEditPost = async (postId: Id<'channelPosts'>) => {
    if (!user || !editingPostContent.trim()) return;
    try {
      await updatePostMutation({
        postId,
        channelId,
        userId: user.id,
        content: editingPostContent.trim(),
      });
      setEditingPostId(null);
      setEditingPostContent('');
    } catch (err) {
      console.error('Failed to edit post:', err);
    }
  };

  const handleDeletePost = async (postId: Id<'channelPosts'>) => {
    if (!user) return;
    const confirm = window.confirm('Delete this post? All comments will also be deleted.');
    if (!confirm) return;
    try {
      await deletePostMutation({ postId, channelId: channelId, userId: user.id });
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const handlePostImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPostImage(file)
      const reader = new FileReader()
      reader.onload = (ev) => setPostImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  };

  if (!channel) {
    return (
      <div className='flex flex-col items-center justify-center h-full py-20 gap-4'>
        <Megaphone className='w-16 h-16 text-muted-foreground/40' />
        <div className='text-center'>
          <h2 className='text-lg font-semibold text-foreground mb-1'>Channel not found</h2>
          <p className='text-sm text-muted-foreground'>
            This channel may be private, or it doesn&apos;t exist.
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push('/channels')}
        >
          Back to Channels
        </Button>
      </div>
    );
  }

  const isAdmin = userRole === 'admin';
  const isMemberLoading = isMember === undefined;

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
            <Megaphone className='w-6 h-6 text-white' />
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
          {isMemberLoading ? (
            <Loader2 className='w-5 h-5 animate-spin text-muted-foreground' />
          ) : isMember ? (
            <div className='flex items-center gap-2'>
              {isAdmin && (
                <>
                  <span className='text-xs px-2 py-1 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] font-medium'>
                    Admin
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={openEditChannel}
                  >
                    <Pencil className='w-4 h-4 mr-1' />
                    Edit
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleDeleteChannel}
                    className='text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950'
                  >
                    <Trash2 className='w-4 h-4 mr-1' />
                    Delete
                  </Button>
                </>
              )}
              {!isAdmin && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleLeave}
                  className='text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950'
                >
                  <UserMinus className='w-4 h-4 mr-1' />
                  Leave
                </Button>
              )}
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
              {/* Image preview */}
              {postImagePreview && (
                <div className='relative mt-2 rounded-lg overflow-hidden border border-border/40 inline-block'>
                  <Image
                    src={postImagePreview}
                    alt='Preview'
                    width={200}
                    height={120}
                    className='object-cover max-h-32'
                    unoptimized
                  />
                  <button
                    onClick={() => { setPostImage(null); setPostImagePreview(null) }}
                    className='absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80'
                  >
                    <X className='w-3 h-3 text-white' />
                  </button>
                </div>
              )}
              {/* Bottom row: attach + send */}
              <div className='flex items-center justify-between mt-2'>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handlePostImageSelect}
                  className='hidden'
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  disabled={postUploading}
                >
                  <ImageIcon className='w-5 h-5' />
                </button>
                <Button
                  size='sm'
                  disabled={(!newPost.trim() && !postImage) || postUploading}
                  onClick={handleCreatePost}
                  className='bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white'
                >
                  {postUploading ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Send className='w-4 h-4' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className='space-y-4'>
        {postsStatus === 'LoadingFirstPage' ? (
          <div className='flex items-center justify-center py-10'>
            <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
          </div>
        ) : posts.length === 0 ? (
          <div className='glass rounded-xl p-12 text-center'>
            <Megaphone className='w-16 h-16 text-muted-foreground/30 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-foreground mb-1'>No posts yet</h3>
            <p className='text-sm text-muted-foreground'>
              {isAdmin
                ? 'Write your first post above'
                : 'Wait for the admin to publish something'}
            </p>
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <PostWithComments
                key={post._id}
                post={post}
                channelId={channelId}
                userId={user?.id ?? ''}
                isAdmin={isAdmin}
                isMember={!!isMember}
                editingPostId={editingPostId}
                editingPostContent={editingPostContent}
                onStartEditPost={(p) => {
                  setEditingPostId(p._id);
                  setEditingPostContent(p.content);
                }}
                onEditPost={handleEditPost}
                onCancelEditPost={() => {
                  setEditingPostId(null);
                  setEditingPostContent('');
                }}
                onDeletePost={handleDeletePost}
                onEditingPostContentChange={(v) => setEditingPostContent(v)}
              />
            ))}
            {postsStatus === 'CanLoadMore' && (
              <div className='flex justify-center pt-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => loadMorePosts(10)}
                  className='text-xs'
                >
                  Load more posts
                </Button>
              </div>
            )}
            {postsStatus === 'LoadingMore' && (
              <div className='flex justify-center pt-2'>
                <Loader2 className='w-5 h-5 animate-spin text-muted-foreground' />
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Channel Dialog */}
      {editChannelOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='glass-strong rounded-xl p-6 w-full max-w-md mx-4 space-y-4'>
            <h2 className='text-lg font-bold text-foreground'>Edit Channel</h2>
            <div className='space-y-3'>
              <div>
                <label className='text-sm font-medium text-foreground'>Channel Name</label>
                <Input
                  value={editChannelName}
                  onChange={(e) => setEditChannelName(e.target.value)}
                  placeholder='Channel name'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-foreground'>Description</label>
                <textarea
                  value={editChannelDesc}
                  onChange={(e) => setEditChannelDesc(e.target.value)}
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
                  onClick={() => setEditChannelPublic(!editChannelPublic)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${editChannelPublic ? 'bg-[#2AABEE]' : 'bg-muted'}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${editChannelPublic ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
                  />
                </button>
              </div>
            </div>
            <div className='flex items-center justify-end gap-2 pt-2'>
              <Button variant='outline' size='sm' onClick={() => setEditChannelOpen(false)}>
                Cancel
              </Button>
              <Button
                size='sm'
                disabled={!editChannelName.trim() || editChannelLoading}
                onClick={handleEditChannel}
                className='bg-gradient-to-r from-[#2AABEE] to-[#06D6A0] hover:from-[#1E96C8] hover:to-[#05B88E] text-white'
              >
                {editChannelLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChannelDetailPage;
