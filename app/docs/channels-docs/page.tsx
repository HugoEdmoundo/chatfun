import { ArrowRight, Bell, Edit3, Heart, Image, MessageCircle, Radio, UserPlus, Users } from 'lucide-react';

export default function ChannelsDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Channels</h1>
        <p className='text-lg text-muted-foreground'>
          Channels are a powerful broadcast feature that lets you communicate with unlimited subscribers.
          ChatFun channels use a post-based model — admins broadcast posts and subscribers can engage
          with emoji reactions and threaded comments.
        </p>
      </div>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Radio className='w-6 h-6 text-[#06D6A0]' />
          What are Channels?
        </h2>
        <p className='text-sm text-muted-foreground'>
          Think of channels like Telegram channels — a one-to-many broadcast medium where admins post
          updates and subscribers read them. Unlike groups, channels have unlimited members and are
          designed for broadcasting information rather than conversation.
        </p>
        <div className='glass rounded-2xl p-6'>
          <h3 className='font-semibold text-foreground mb-3'>Channel vs Group</h3>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border/40'>
                  <th className='text-left py-2 pr-4 text-muted-foreground font-medium'>Feature</th>
                  <th className='text-left py-2 pr-4 text-muted-foreground font-medium'>Channel</th>
                  <th className='text-left py-2 text-muted-foreground font-medium'>Group</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-border/20'>
                  <td className='py-2 pr-4 text-foreground'>Member Limit</td>
                  <td className='py-2 pr-4 text-foreground'>Unlimited</td>
                  <td className='py-2 text-foreground'>Limited by platform</td>
                </tr>
                <tr className='border-b border-border/20'>
                  <td className='py-2 pr-4 text-foreground'>Who Can Post</td>
                  <td className='py-2 pr-4 text-foreground'>Admins only</td>
                  <td className='py-2 text-foreground'>All members</td>
                </tr>
                <tr className='border-b border-border/20'>
                  <td className='py-2 pr-4 text-foreground'>Discussion</td>
                  <td className='py-2 pr-4 text-foreground'>Comments on posts</td>
                  <td className='py-2 text-foreground'>Open chat</td>
                </tr>
                <tr>
                  <td className='py-2 pr-4 text-foreground'>Visibility</td>
                  <td className='py-2 pr-4 text-foreground'>Public or Private</td>
                  <td className='py-2 text-foreground'>By invitation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Radio className='w-6 h-6 text-[#06D6A0]' />
          Creating a Channel
        </h2>

        <div className='glass rounded-2xl p-8 space-y-4'>
          <ol className='space-y-3'>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>1</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Navigate to Channels</p>
                <p className='text-sm text-muted-foreground'>Click on &ldquo;Channels&rdquo; in the navigation bar.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>2</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Click &ldquo;Create Channel&rdquo;</p>
                <p className='text-sm text-muted-foreground'>Opens the channel creation dialog.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>3</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Fill in Details</p>
                <p className='text-sm text-muted-foreground'>Enter a channel name, optional description, and choose whether it&apos;s public or private.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#2AABEE] to-[#06D6A0] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>4</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Create and Manage</p>
                <p className='text-sm text-muted-foreground'>You&apos;ll become the admin and can start posting immediately.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className='grid gap-6 sm:grid-cols-2'>
        <FeatureCard
          icon={Edit3}
          title='Creating Posts'
          desc='Admins can write posts with text and optional image uploads (via Convex storage). Posts appear in the channel feed with author, relative timestamp, comment count, and emoji reaction bar. Posts can be edited or deleted inline by the admin on hover.'
          color='#2AABEE'
        />
        <FeatureCard
          icon={Heart}
          title='Reactions on Posts'
          desc='Subscribers can react to posts with 👍❤️😮. Each reaction shows a live count and who reacted. Toggle reactions on/off freely.'
          color='#EC4899'
        />
        <FeatureCard
          icon={MessageCircle}
          title='Comments with Reactions & Replies'
          desc='Each post has a threaded comment section. Comments support 1-level replies (with quoted parent), emoji reactions (👍❤️😮), and inline edit/delete by the author or admin. Comment count displayed on the toggle button.'
          color='#06D6A0'
        />
        <FeatureCard
          icon={Image}
          title='Image Uploads'
          desc='Admins can attach images to posts via Convex storage. Images are uploaded with a preview before posting and rendered inline in the post feed.'
          color='#8B5CF6'
        />
        <FeatureCard
          icon={UserPlus}
          title='Joining Channels'
          desc='Users can browse public channels and join with one click. Private channels require membership. Channel detail view checks access control and shows "Not Found" for non-members.'
          color='#F59E0B'
        />
        <FeatureCard
          icon={Bell}
          title='Notifications & Pagination'
          desc='Posts are loaded 10 at a time with a "Load more" button. The channel list on the sidebar shows channels the user belongs to with their role.'
          color='#2AABEE'
        />
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground flex items-center gap-2'>
          <Edit3 className='w-5 h-5 text-[#06D6A0]' />
          Managing Channels & Posts
        </h2>
        <ul className='space-y-3 text-sm'>
          <li className='flex items-start gap-3'>
            <span className='w-5 h-5 rounded-full bg-[#2AABEE]/15 flex items-center justify-center flex-shrink-0 mt-0.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#2AABEE]' />
            </span>
            <div>
              <p className='font-medium text-foreground'>Edit Channel</p>
              <p className='text-muted-foreground'>Admins can edit channel name, description, and public/private visibility from the channel detail page. Shows a loading state while saving.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <span className='w-5 h-5 rounded-full bg-[#06D6A0]/15 flex items-center justify-center flex-shrink-0 mt-0.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#06D6A0]' />
            </span>
            <div>
              <p className='font-medium text-foreground'>Delete Channel</p>
              <p className='text-muted-foreground'>Admins can delete the entire channel (with confirmation). This is the only way an admin can "leave" — leaving is blocked for admins with an error message.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <span className='w-5 h-5 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center flex-shrink-0 mt-0.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#8B5CF6]' />
            </span>
            <div>
              <p className='font-medium text-foreground'>Edit / Delete Posts</p>
              <p className='text-muted-foreground'>Hover over a post as admin to reveal edit and delete buttons. Edit opens an inline textarea; delete shows a confirmation. Comments can also be edited/deleted by their author or the channel admin.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <span className='w-5 h-5 rounded-full bg-[#F59E0B]/15 flex items-center justify-center flex-shrink-0 mt-0.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#F59E0B]' />
            </span>
            <div>
              <p className='font-medium text-foreground'>Rate Limiting</p>
              <p className='text-muted-foreground'>All mutation functions (create, edit, delete, react, comment) are rate-limited to 1 request per second per user to prevent spam.</p>
            </div>
          </li>
        </ul>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Channel Roles</h2>
        <ul className='space-y-3 text-sm'>
          <li className='flex items-start gap-3'>
            <Users className='w-4 h-4 text-[#2AABEE] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Admin</p>
              <p className='text-muted-foreground'>Channel creator. Can create/edit/delete posts, upload images, manage channel settings (name, description, visibility), view and moderate comments, and delete the channel. Cannot leave — must delete instead.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <Users className='w-4 h-4 text-[#06D6A0] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Subscriber</p>
              <p className='text-muted-foreground'>Channel follower. Can view posts, react with 👍❤️😮, post and edit/delete own comments, reply to comments, and leave the channel at any time.</p>
            </div>
          </li>
        </ul>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/groups'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Groups
        </a>
        <a
          href='/docs/video-calls'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Video Calls
          <ArrowRight className='w-4 h-4' />
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className='glass-card p-6'>
      <div
        className='w-10 h-10 rounded-xl flex items-center justify-center mb-4'
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className='w-5 h-5' style={{ color }} />
      </div>
      <h3 className='font-semibold text-foreground mb-2'>{title}</h3>
      <p className='text-sm text-muted-foreground leading-relaxed'>{desc}</p>
    </div>
  );
}
