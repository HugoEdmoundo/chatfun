import { BookOpen, Heart, Image, MessageCircle, Radio, Shield, Users, Video, Zap } from 'lucide-react';

export default function DocsOverview() {
  return (
    <div className='space-y-12'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>
          Welcome to <span className='gradient-text'>ChatFun</span>
        </h1>
        <p className='text-lg text-muted-foreground leading-relaxed'>
          ChatFun is a modern messaging platform inspired by Telegram — combining real-time chat,
          HD video calls, broadcast channels with CRUD posts, threaded comments with emoji reactions,
          and image uploads into one seamless experience.
        </p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2'>
        {[
          {
            icon: MessageCircle,
            title: 'Telegram-style Chat',
            desc: 'Real-time messaging with blue/gray bubbles, reactions, replies, quotes, file uploads, and typing indicators via Stream Chat.',
            color: '#2AABEE',
          },
          {
            icon: Video,
            title: 'HD Video Calls',
            desc: 'Crystal-clear video calls with screen sharing. Start a call with one click from any conversation.',
            color: '#8B5CF6',
          },
          {
            icon: Radio,
            title: 'Broadcast Channels',
            desc: 'Create public or private channels with unlimited subscribers. Admins create/edit/delete posts with image uploads. Subscribers join with one click.',
            color: '#06D6A0',
          },
          {
            icon: Heart,
            title: 'Reactions & Comments',
            desc: 'React to posts and comments with 👍❤️😮. Threaded replies with 1-level nesting. Inline edit and delete for authors and admins.',
            color: '#EC4899',
          },
          {
            icon: Shield,
            title: 'Access Control',
            desc: 'Private channels require membership. Admin-only post creation. Comments require channel membership. Rate-limited mutations prevent spam.',
            color: '#2AABEE',
          },
          {
            icon: Zap,
            title: 'Paginated & Optimized',
            desc: 'Paginated posts (10 per load) with efficient user batching. Convex real-time sync with zero-query deduplication.',
            color: '#F59E0B',
          },
        ].map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className='glass-card p-6'>
              <div
                className='w-10 h-10 rounded-xl flex items-center justify-center mb-4'
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <Icon className='w-5 h-5' style={{ color: feature.color }} />
              </div>
              <h3 className='font-semibold text-foreground mb-2'>{feature.title}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>{feature.desc}</p>
            </div>
          );
        })}
      </div>

      <div className='glass rounded-2xl p-8'>
        <h2 className='text-xl font-bold text-foreground mb-4'>Tech Stack Overview</h2>
        <div className='grid gap-4 sm:grid-cols-2'>
          {[
            { label: 'Frontend', value: 'Next.js 16 (App Router) + React 19 + TypeScript' },
            { label: 'Styling', value: 'TailwindCSS v4 + shadcn/ui + Framer Motion + Liquid Glass' },
            { label: 'Authentication', value: 'Clerk (email, SSO, magic links)' },
            { label: 'Backend / DB', value: 'Convex (serverless functions + real-time DB)' },
            { label: 'Messaging', value: 'Stream Chat (real-time messaging API)' },
            { label: 'Video Calls', value: 'Stream Video (WebRTC-based SDK)' },
          ].map((item) => (
            <div key={item.label}>
              <dt className='text-xs font-semibold uppercase text-muted-foreground'>{item.label}</dt>
              <dd className='text-sm text-foreground mt-0.5'>{item.value}</dd>
            </div>
          ))}
        </div>
      </div>

      <div className='glass rounded-2xl p-8 text-center'>
        <h2 className='text-xl font-bold text-foreground mb-2'>Ready to jump in?</h2>
        <p className='text-muted-foreground mb-6'>
          Start with our getting started guide or explore the documentation sections.
        </p>
        <div className='flex justify-center gap-4'>
          <a
            href='/docs/getting-started'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] text-white font-medium text-sm hover:from-[#1E96C8] hover:to-[#7C3AED] transition-all shadow-lg shadow-blue-500/20'
          >
            <BookOpen className='w-4 h-4' />
            Getting Started
          </a>
          <a
            href='https://github.com/HugoEdmoundo/chatfun'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 text-foreground font-medium text-sm hover:bg-muted/50 transition-all'
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
