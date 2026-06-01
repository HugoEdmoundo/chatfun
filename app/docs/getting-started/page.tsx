import { ArrowRight, BookOpen, Mail, UserPlus, KeyRound } from 'lucide-react';

export default function GettingStarted() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Getting Started</h1>
        <p className='text-lg text-muted-foreground'>
          Get started with ChatFun in under 2 minutes. Follow this guide to create your account,
          set up your profile, and start chatting.
        </p>
      </div>

      <div className='space-y-8'>
        <Step
          number={1}
          icon={Mail}
          title='Create Your Account'
          color='#2AABEE'
        >
          <p>Click the &ldquo;Get Started&rdquo; button on the homepage to open the sign-up modal.</p>
          <ul className='space-y-2'>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#2AABEE] mt-0.5'>•</span>
              <span><strong>Email:</strong> Enter your email address and create a password, or use single sign-on with Google or GitHub.</span>
            </li>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#2AABEE] mt-0.5'>•</span>
              <span><strong>Verification:</strong> Verify your email via the magic link sent to your inbox (if using email).</span>
            </li>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#2AABEE] mt-0.5'>•</span>
              <span><strong>Profile:</strong> Once verified, you&apos;ll be redirected to the dashboard where you can set up your profile.</span>
            </li>
          </ul>
        </Step>

        <Step
          number={2}
          icon={UserPlus}
          title='Complete Your Profile'
          color='#8B5CF6'
        >
          <p>Your profile is automatically created from your Clerk account details (name, email, avatar).</p>
          <ul className='space-y-2'>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#8B5CF6] mt-0.5'>•</span>
              <span><strong>Display Name:</strong> Your full name from your account is used as your display name.</span>
            </li>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#8B5CF6] mt-0.5'>•</span>
              <span><strong>Avatar:</strong> Your profile picture syncs automatically from your Clerk account.</span>
            </li>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#8B5CF6] mt-0.5'>•</span>
              <span><strong>Sync:</strong> The system automatically syncs your profile to Convex and Stream Chat in the background.</span>
            </li>
          </ul>
        </Step>

        <Step
          number={3}
          icon={KeyRound}
          title='Dashboard Overview'
          color='#06D6A0'
        >
          <p>After signing in, you&apos;ll land on the dashboard. Here&apos;s what you&apos;ll find:</p>
          <ul className='space-y-2'>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#06D6A0] mt-0.5'>•</span>
              <span><strong>Sidebar (left):</strong> Shows your conversations list. Use &ldquo;Start New Chat&rdquo; to begin a new conversation.</span>
            </li>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#06D6A0] mt-0.5'>•</span>
              <span><strong>Header:</strong> Navigate between Chats, Channels, and Docs.</span>
            </li>
            <li className='flex items-start gap-2 text-sm'>
              <span className='text-[#06D6A0] mt-0.5'>•</span>
              <span><strong>Main Area:</strong> Displays the selected conversation or channel.</span>
            </li>
          </ul>
        </Step>

        <Step
          number={4}
          icon={ArrowRight}
          title='Start Your First Chat'
          color='#EC4899'
        >
          <p>Ready to send your first message? Here&apos;s how:</p>
          <ol className='space-y-3 list-decimal list-inside text-sm text-foreground'>
            <li>Click &ldquo;Start New Chat&rdquo; in the sidebar.</li>
            <li>Search for a user by name or email in the search dialog.</li>
            <li>Select the user to add them to the conversation.</li>
            <li>Click &ldquo;Start Chat&rdquo; to create the conversation.</li>
            <li>Type your message in the input box at the bottom and press Enter to send.</li>
          </ol>
        </Step>
      </div>

      <div className='glass rounded-xl p-6 border-l-4 border-l-[#2AABEE]'>
        <h3 className='font-semibold text-foreground mb-1'>💡 Pro Tip</h3>
        <p className='text-sm text-muted-foreground'>
          You can also start a group chat by selecting multiple users in the &ldquo;New Chat&rdquo; dialog.
          ChatFun will automatically detect it&apos;s a group and prompt you for a group name.
        </p>
      </div>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <div />
        <a
          href='/docs/messaging'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Messaging
          <ArrowRight className='w-4 h-4' />
        </a>
      </div>
    </div>
  );
}

function Step({
  number,
  icon: Icon,
  title,
  color,
  children,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center'>
        <div
          className='w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0'
          style={{ backgroundColor: color }}
        >
          {number}
        </div>
        <div className='w-px flex-1 bg-border/40 mt-2' />
      </div>
      <div className='flex-1 pb-8'>
        <h2 className='text-xl font-semibold text-foreground mb-3 flex items-center gap-2'>
          <Icon className='w-5 h-5' style={{ color }} />
          {title}
        </h2>
        <div className='text-sm text-muted-foreground space-y-3 leading-relaxed'>{children}</div>
      </div>
    </div>
  );
}
