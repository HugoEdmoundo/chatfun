import { ArrowRight, Bell, Edit3, Eye, MessageCircle, Radio, UserPlus, Users } from 'lucide-react';

export default function ChannelsDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Channels</h1>
        <p className='text-lg text-muted-foreground'>
          Channels are a powerful broadcast feature that lets you communicate with unlimited subscribers.
          ChatFun channels use a hybrid model — admins broadcast posts and subscribers can engage in
          attached discussion threads.
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
                  <td className='py-2 pr-4 text-foreground'>Thread-based</td>
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
          desc='Admins can write posts with rich text. Posts appear in the channel feed and subscribers receive notifications. Use posts to share updates, announcements, or curated content.'
          color='#2AABEE'
        />
        <FeatureCard
          icon={Eye}
          title='Viewing & Reacting'
          desc='Subscribers can view all channel posts and react with emojis. Each post shows the author, timestamp, and subscriber engagement.'
          color='#06D6A0'
        />
        <FeatureCard
          icon={UserPlus}
          title='Joining Channels'
          desc='Users can browse public channels and join with one click. Private channels require an invite or direct link from the admin.'
          color='#8B5CF6'
        />
        <FeatureCard
          icon={Bell}
          title='Notifications'
          desc='Subscribers receive notifications for new posts. Admins can control notification settings and pin important announcements.'
          color='#EC4899'
        />
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Channel Roles</h2>
        <ul className='space-y-3 text-sm'>
          <li className='flex items-start gap-3'>
            <Users className='w-4 h-4 text-[#2AABEE] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Admin</p>
              <p className='text-muted-foreground'>Channel creator or promoted admin. Can create posts, manage subscribers, edit channel settings, and delete content.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <Users className='w-4 h-4 text-[#06D6A0] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Subscriber</p>
              <p className='text-muted-foreground'>Channel follower. Can view posts, react with emojis, and leave the channel at any time.</p>
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
