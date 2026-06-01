import { ArrowRight, Shield, Users, UserPlus, Settings, MessageCircle } from 'lucide-react';

export default function GroupsDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Group Chats</h1>
        <p className='text-lg text-muted-foreground'>
          Groups bring multiple people together in a single conversation. ChatFun supports groups with
          advanced admin controls, member management, and rich collaboration features.
        </p>
      </div>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Users className='w-6 h-6 text-[#8B5CF6]' />
          Creating a Group
        </h2>

        <div className='glass rounded-2xl p-8 space-y-4'>
          <ol className='space-y-4'>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>1</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Open New Chat</p>
                <p className='text-sm text-muted-foreground'>Click &ldquo;Start New Chat&rdquo; in the sidebar to open the dialog.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>2</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Add Members</p>
                <p className='text-sm text-muted-foreground'>Search for users by name or email and select them. Add at least 2 users (total 3+ members including yourself).</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>3</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Name Your Group</p>
                <p className='text-sm text-muted-foreground'>Enter a group name and optional description. The name helps members identify the group in their conversation list.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>4</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Create Group</p>
                <p className='text-sm text-muted-foreground'>Click &ldquo;Create Group&rdquo; to finalize. All selected members will be added to the group automatically.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Settings className='w-6 h-6 text-[#EC4899]' />
          Group Management
        </h2>

        <div className='grid gap-6 sm:grid-cols-2'>
          <FeatureCard
            icon={UserPlus}
            title='Add Members'
            desc='Group creators can add new members at any time. Members can also invite others depending on group settings.'
            color='#8B5CF6'
          />
          <FeatureCard
            icon={Shield}
            title='Admin Controls'
            desc='Group admins can manage members, change group settings, and moderate content. Admins can also promote other members to admin.'
            color='#EC4899'
          />
          <FeatureCard
            icon={Users}
            title='Member Roles'
            desc='Groups support multiple roles: Owner (creator), Admin (full management), and Member (standard participant).'
            color='#2AABEE'
          />
          <FeatureCard
            icon={MessageCircle}
            title='Group Messaging'
            desc='All group members can send messages, share media, and react to messages. Mentions (@username) notify specific members.'
            color='#06D6A0'
          />
        </div>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Leaving a Group</h2>
        <p className='text-sm text-muted-foreground'>
          Any member can leave a group at any time. Click the &ldquo;Leave Chat&rdquo; button in the chat header.
          Once you leave:
        </p>
        <ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
          <li>You will be removed from the member list.</li>
          <li>The group will disappear from your conversation list.</li>
          <li>If everyone leaves, the group remains but shows &ldquo;Everyone else has left this chat!&rdquo;</li>
        </ul>
      </section>

      <section className='glass rounded-2xl p-8 border-l-4 border-l-[#8B5CF6]'>
        <h3 className='font-semibold text-foreground mb-1'>💡 Pro Tips</h3>
        <ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
          <li>Use descriptive group names so members can easily identify the conversation.</li>
          <li>Add a group description to explain the purpose of the group.</li>
          <li>Use mentions (@name) to get specific members&apos; attention in busy groups.</li>
        </ul>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/messaging'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Messaging
        </a>
        <a
          href='/docs/channels-docs'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Channels
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
