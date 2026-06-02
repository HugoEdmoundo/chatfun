import { ArrowRight, FileQuestion, Heart, Mail, MessageCircle, Shield, UserPlus, Video } from 'lucide-react';

export default function FAQDocs() {
  const faqs = [
    {
      icon: UserPlus,
      title: 'How do I create an account?',
      answer:
        'Click the "Get Started" button on the homepage. You can sign up with your email address or use single sign-on with Google or GitHub accounts. Verification is handled securely by Clerk.',
    },
    {
      icon: MessageCircle,
      title: 'Is ChatFun free to use?',
      answer:
        'Yes! ChatFun is completely free to use with no credit card required. There is a free forever plan that includes unlimited messaging, file sharing, and video calls. Premium features may be added in the future.',
    },
    {
      icon: Video,
      title: 'How do I start a video call?',
      answer:
        'Open any conversation and click the "Video Call" button in the chat header. A unique call link will be generated that you can share with others. Make sure your browser has camera and microphone permissions enabled.',
    },
    {
      icon: UserPlus,
      title: 'How do I create a group chat?',
      answer:
        'Click "Start New Chat" in the sidebar, search for and select multiple users (2+), then provide a group name. The system will automatically create a group chat and add all selected members.',
    },
    {
      icon: FileQuestion,
      title: 'How do channels work?',
      answer:
        'Channels are broadcast-style communication where admins post messages and subscribers read them. You can create public or private channels. Admins create/edit/delete posts (with optional image uploads), and subscribers can join with one click, react to posts with 👍❤️😮, post comments with emoji reactions and 1-level replies, and edit/delete their own comments.',
    },
    {
      icon: Shield,
      title: 'Is my data safe?',
      answer:
        'Yes. All data is encrypted in transit using TLS 1.3. Authentication is handled by Clerk (SOC 2 compliant). Your messages are stored securely on Stream and Convex infrastructure, both of which implement enterprise-grade security measures.',
    },
    {
      icon: Mail,
      title: 'Can I share files in chat?',
      answer:
        'Yes! You can share images and files directly in conversations via the Stream Chat attach button. Uploaded files are stored securely via Stream CDN. Note: file upload must be enabled in the Stream Dashboard settings.',
    },
    {
      icon: Heart,
      title: 'How do reactions work on posts and comments?',
      answer:
        'Posts and comments support emoji reactions (👍❤️😮). Click a reaction emoji to toggle it on/off — each shows a live count of who reacted. Reactions are stored per-user so you can toggle freely.',
    },
    {
      icon: MessageCircle,
      title: 'How do I search for users?',
      answer:
        'Use the search bar in the "New Chat" dialog or the user search feature. You can search by name or email address. Results update in real-time as you type.',
    },
    {
      icon: Shield,
      title: 'Can I leave a chat or channel?',
      answer:
        'Yes for groups — click "Leave Chat" in the header. For channels, subscribers can use the "Leave" button on the channel page. Admins cannot leave a channel; they must delete it instead (with confirmation).',
    },
    {
      icon: Video,
      title: 'What are the requirements for video calls?',
      answer:
        'You need a stable internet connection (2 Mbps+ recommended), a working camera and microphone, and a modern browser (Chrome, Firefox, Safari, or Edge latest version). Grant camera and microphone permissions when prompted.',
    },
  ];

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Frequently Asked Questions</h1>
        <p className='text-lg text-muted-foreground'>
          Find answers to common questions about ChatFun. Can&apos;t find what you&apos;re looking for?
          Reach out to our support team.
        </p>
      </div>

      <div className='space-y-4'>
        {faqs.map((faq, i) => (
          <details
            key={i}
            className='glass rounded-xl group open:glass-strong transition-all'
          >
            <summary className='flex items-center gap-3 p-5 cursor-pointer list-none'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-[#2AABEE] to-[#8B5CF6] flex items-center justify-center flex-shrink-0'>
                <faq.icon className='w-5 h-5 text-white' />
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold text-foreground text-sm'>{faq.title}</h3>
              </div>
              <div className='text-muted-foreground transition-transform group-open:rotate-180'>
                <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </div>
            </summary>
            <div className='px-5 pb-5 pt-0'>
              <div className='pl-13'>
                <p className='text-sm text-muted-foreground leading-relaxed'>{faq.answer}</p>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className='glass rounded-2xl p-8 text-center'>
        <h2 className='text-xl font-bold text-foreground mb-2'>Still have questions?</h2>
        <p className='text-sm text-muted-foreground mb-6'>
          We&apos;re here to help. Reach out to us anytime.
        </p>
        <div className='flex justify-center gap-4'>
          <a
            href='#'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] text-white font-medium text-sm hover:from-[#1E96C8] hover:to-[#7C3AED] transition-all shadow-lg shadow-blue-500/20'
          >
            <Mail className='w-4 h-4' />
            Contact Support
          </a>
          <a
            href='https://github.com/ragini-pandey/telegram-clone/issues'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 text-foreground font-medium text-sm hover:bg-muted/50 transition-all'
          >
            GitHub Issues
          </a>
        </div>
      </div>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/contributing'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Contributing
        </a>
        <div />
      </div>
    </div>
  );
}
