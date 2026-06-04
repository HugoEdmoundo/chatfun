import { ArrowRight, BookOpen, Code2, Database, Key, Link, Webhook } from 'lucide-react';

export default function APIDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>API Reference</h1>
        <p className='text-lg text-muted-foreground'>
          ChatFun exposes its backend functionality through Convex serverless functions. These functions
          are automatically type-safe and can be called from the frontend using auto-generated hooks.
        </p>
      </div>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Database className='w-6 h-6 text-[#2AABEE]' />
          Convex Functions
        </h2>

        <div className='space-y-6'>
          <ApiSection
            title='User Functions'
            icon={Database}
            color='#2AABEE'
            endpoints={[
              {
                name: 'users.upsertUser',
                type: 'mutation',
                description: 'Create or update a user in the database.',
                args: '{ userId: string, name: string, email: string, imageUrl: string }',
              },
              {
                name: 'users.getUserByClerkUserId',
                type: 'query',
                description: 'Get a user by their Clerk user ID.',
                args: '{ userId: string }',
                returns: 'User | null',
              },
              {
                name: 'users.searchUsers',
                type: 'query',
                description: 'Search users by name or email. Returns up to 20 results.',
                args: '{ searchTerm: string }',
                returns: 'User[]',
              },
              {
                name: 'users.getUsersBatch',
                type: 'query',
                description: 'Batch fetch multiple users by their Clerk user IDs.',
                args: '{ userIds: string[] }',
                returns: '(User | null)[]',
              },
            ]}
          />

          <ApiSection
            title='Call History Functions'
            icon={Database}
            color='#F59E0B'
            endpoints={[
              {
                name: 'callHistory.startCall',
                type: 'mutation',
                description: 'Record the start of a video call. Inserts a new call record with channel ID, caller info, and timestamp.',
                args: '{ channelId: string, startedBy: string, startedByName: string, callId: string }',
              },
              {
                name: 'callHistory.endCall',
                type: 'mutation',
                description: 'Record the end of a video call. Updates the call record with endedAt timestamp and duration in seconds.',
                args: '{ channelId: string }',
              },
            ]}
          />

          <ApiSection
            title='Channel Functions'
            icon={Link}
            color='#06D6A0'
            endpoints={[
              {
                name: 'channels.createChannel',
                type: 'mutation',
                description: 'Create a new channel. Creator becomes admin.',
                args: '{ name: string, description?: string, createdBy: string, isPublic: boolean }',
                returns: 'Id<"channels">',
              },
              {
                name: 'channels.updateChannel',
                type: 'mutation',
                description: 'Update channel name, description, or visibility (admin only).',
                args: '{ channelId: Id<"channels">, name?: string, description?: string, isPublic?: boolean }',
              },
              {
                name: 'channels.deleteChannelMutation',
                type: 'mutation',
                description: 'Delete a channel and all its posts/comments/memberships (admin only).',
                args: '{ channelId: Id<"channels"> }',
              },
              {
                name: 'channels.getChannel',
                type: 'query',
                description: 'Get a single channel by ID. Returns null if private and not a member.',
                args: '{ channelId: Id<"channels">, userId: string }',
                returns: 'Channel | null',
              },
              {
                name: 'channels.getChannelsByUser',
                type: 'query',
                description: 'Get all channels a user belongs to, with their role.',
                args: '{ userId: string }',
                returns: '(Channel & { role: string })[]',
              },
              {
                name: 'channels.getPublicChannels',
                type: 'query',
                description: 'Get all public channels for discovery.',
                args: '{}',
                returns: 'Channel[]',
              },
              {
                name: 'channels.joinChannel',
                type: 'mutation',
                description: 'Join a channel as a subscriber.',
                args: '{ channelId: Id<"channels">, userId: string }',
              },
              {
                name: 'channels.leaveChannel',
                type: 'mutation',
                description: 'Leave a channel. Throws if user is admin (admins must delete instead).',
                args: '{ channelId: Id<"channels">, userId: string }',
              },
              {
                name: 'channels.isChannelMember',
                type: 'query',
                description: 'Check if a user is a member of a channel.',
                args: '{ channelId: Id<"channels">, userId: string }',
                returns: 'boolean',
              },
              {
                name: 'channels.getUserRoleInChannel',
                type: 'query',
                description: "Get a user's role in a channel.",
                args: '{ channelId: Id<"channels">, userId: string }',
                returns: '"admin" | "subscriber" | null',
              },
              {
                name: 'channels.createPost',
                type: 'mutation',
                description: 'Create a text post in a channel (admin only).',
                args: '{ channelId: Id<"channels">, authorId: string, content: string }',
              },
              {
                name: 'channels.createPostWithImage',
                type: 'mutation',
                description: 'Create a post with an uploaded image (admin only).',
                args: '{ channelId: Id<"channels">, authorId: string, content: string, imageStorageId: Id<"_storage"> }',
              },
              {
                name: 'channels.updatePost',
                type: 'mutation',
                description: 'Edit a post content (admin only).',
                args: '{ postId: Id<"channelPosts">, content: string }',
              },
              {
                name: 'channels.deletePostMutation',
                type: 'mutation',
                description: 'Delete a post and its comments (admin only).',
                args: '{ postId: Id<"channelPosts"> }',
              },
              {
                name: 'channels.getChannelPosts',
                type: 'query',
                description: 'Get paginated posts for a channel, newest first. Requires membership for private channels.',
                args: '{ channelId: Id<"channels">, userId: string, paginationOpts: PaginationOpts }',
                returns: 'PaginatedResult<ChannelPost>',
              },
              {
                name: 'channels.generateUploadUrl',
                type: 'mutation',
                description: 'Generate a URL for uploading an image to Convex storage.',
                args: '{}',
                returns: 'string',
              },
              {
                name: 'channels.createComment',
                type: 'mutation',
                description: 'Add a comment to a post. Optional parentCommentId for replies.',
                args: '{ postId: Id<"channelPosts">, authorId: string, content: string, channelId: Id<"channels">, parentCommentId?: Id<"channelComments"> }',
              },
              {
                name: 'channels.getPostComments',
                type: 'query',
                description: 'Get all comments for a post with author info. Requires channel membership.',
                args: '{ postId: Id<"channelPosts">, channelId: Id<"channels">, userId: string }',
                returns: 'CommentWithAuthor[]',
              },
              {
                name: 'channels.getPostCommentCount',
                type: 'query',
                description: 'Get the total number of comments on a post.',
                args: '{ postId: Id<"channelPosts"> }',
                returns: 'number',
              },
              {
                name: 'channels.updateComment',
                type: 'mutation',
                description: 'Edit a comment (author or admin only).',
                args: '{ commentId: Id<"channelComments">, content: string }',
              },
              {
                name: 'channels.deleteComment',
                type: 'mutation',
                description: 'Delete a comment and its replies (author or admin only).',
                args: '{ commentId: Id<"channelComments"> }',
              },
              {
                name: 'channels.toggleReaction',
                type: 'mutation',
                description: 'Toggle an emoji reaction on a comment.',
                args: '{ commentId: Id<"channelComments">, emoji: string, userId: string }',
              },
              {
                name: 'channels.togglePostReaction',
                type: 'mutation',
                description: 'Toggle an emoji reaction on a post.',
                args: '{ postId: Id<"channelPosts">, emoji: string, userId: string }',
              },
            ]}
          />
        </div>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground flex items-center gap-2'>
          <Code2 className='w-5 h-5 text-[#8B5CF6]' />
          Usage Example
        </h2>
        <pre className='text-xs bg-muted/30 p-4 rounded-xl overflow-x-auto border border-border/20 leading-relaxed'>
{`import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

function MyComponent() {
  // Query: reactive — updates in real-time
  const channels = useQuery(api.channels.getPublicChannels);

  // Mutation: call to modify data
  const createChannel = useMutation(api.channels.createChannel);

  const handleCreate = async () => {
    const id = await createChannel({
      name: 'My Channel',
      description: 'A cool channel',
      createdBy: userId,
      isPublic: true,
    });
  };

  return <div>{/* your UI */}</div>;
}`}
        </pre>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground flex items-center gap-2'>
          <Key className='w-5 h-5 text-[#EC4899]' />
          Environment Variables
        </h2>
        <p className='text-sm text-muted-foreground'>
          These environment variables are required for the application to function:
        </p>
        <pre className='text-xs bg-muted/30 p-4 rounded-xl overflow-x-auto border border-border/20 leading-relaxed'>
{`# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_****
CLERK_SECRET_KEY=sk_****
CLERK_JWT_ISSUER_DOMAIN=https://clerk.****

# Stream Chat & Video
NEXT_PUBLIC_STREAM_API_KEY=XXXX
STREAM_API_SECRET_KEY=YYYY
STREAM_APP_ID=1234567

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=dev:local`}
        </pre>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/architecture'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Architecture
        </a>
        <a
          href='/docs/deployment'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Deployment
          <ArrowRight className='w-4 h-4' />
        </a>
      </div>
    </div>
  );
}

function ApiSection({
  title,
  icon: Icon,
  color,
  endpoints,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  endpoints: { name: string; type: string; description: string; args: string; returns?: string }[];
}) {
  return (
    <div>
      <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
        <Icon className='w-5 h-5' style={{ color }} />
        {title}
      </h3>
      <div className='space-y-3'>
        {endpoints.map((ep) => (
          <div key={ep.name} className='glass rounded-xl p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                  ep.type === 'mutation'
                    ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                    : 'bg-[#2AABEE]/10 text-[#2AABEE]'
                }`}
              >
                {ep.type}
              </span>
              <code className='text-sm font-mono font-semibold text-foreground'>{ep.name}</code>
            </div>
            <p className='text-xs text-muted-foreground mb-2'>{ep.description}</p>
            <div className='text-xs font-mono text-muted-foreground bg-muted/20 p-2 rounded-lg'>
              <span className='text-foreground'>args:</span> {ep.args}
              {ep.returns && (
                <>
                  <br />
                  <span className='text-foreground'>returns:</span> {ep.returns}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
