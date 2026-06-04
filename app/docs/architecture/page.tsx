import { ArrowRight, Cpu, Database, Globe, Layers, Link, Server } from 'lucide-react';

export default function ArchitectureDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Architecture</h1>
        <p className='text-lg text-muted-foreground'>
          ChatFun is built with a modern, scalable architecture that separates concerns across
          multiple specialized services. This document explains the technical architecture,
          data flow, and design decisions.
        </p>
      </div>

      <section className='glass rounded-2xl p-8'>
        <h2 className='text-xl font-semibold text-foreground mb-6 flex items-center gap-2'>
          <Layers className='w-5 h-5 text-[#2AABEE]' />
          High-Level Architecture
        </h2>
        <div className='space-y-4'>
          <div className='flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#2AABEE] to-[#8B5CF6] flex items-center justify-center flex-shrink-0'>
              <Globe className='w-6 h-6 text-white' />
            </div>
            <div>
              <p className='font-semibold text-foreground text-sm'>Frontend (Next.js + React)</p>
              <p className='text-xs text-muted-foreground'>Server-side rendered React app with App Router. Handles UI, routing, and client-side state.</p>
            </div>
          </div>
          <div className='flex justify-center text-muted-foreground'>
            <ArrowRight className='w-5 h-5' />
          </div>
          <div className='flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center flex-shrink-0'>
              <Server className='w-6 h-6 text-white' />
            </div>
            <div>
              <p className='font-semibold text-foreground text-sm'>Authentication (Clerk)</p>
              <p className='text-xs text-muted-foreground'>Handles user authentication, session management, and user profile data.</p>
            </div>
          </div>
          <div className='flex justify-center text-muted-foreground'>
            <ArrowRight className='w-5 h-5' />
          </div>
          <div className='flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#06D6A0] to-[#2AABEE] flex items-center justify-center flex-shrink-0'>
              <Database className='w-6 h-6 text-white' />
            </div>
            <div>
              <p className='font-semibold text-foreground text-sm'>Backend + Database (Convex)</p>
              <p className='text-xs text-muted-foreground'>Serverless functions, real-time database, and schema for custom data (users, channels, posts).</p>
            </div>
          </div>
          <div className='flex justify-center text-muted-foreground'>
            <ArrowRight className='w-5 h-5' />
          </div>
          <div className='flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#F59E0B] flex items-center justify-center flex-shrink-0'>
              <Link className='w-6 h-6 text-white' />
            </div>
            <div>
              <p className='font-semibold text-foreground text-sm'>Real-time Messaging (Stream)</p>
              <p className='text-xs text-muted-foreground'>Stream Chat for 1-on-1/group messaging. Stream Video for WebRTC video calls.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-6 sm:grid-cols-2'>
        <FeatureCard
          icon={Cpu}
          title='Next.js App Router'
          desc='Server-side rendering for fast initial loads. The App Router provides nested layouts, server components, and streaming. API routes can run server-side logic without additional infrastructure.'
          color='#2AABEE'
        />
        <FeatureCard
          icon={Database}
          title='Convex Backend'
          desc='Serverless functions that run close to your database. Convex provides reactive queries, mutations, and real-time subscriptions. Schema is defined in TypeScript with full type safety.'
          color='#06D6A0'
        />
        <FeatureCard
          icon={Server}
          title='Clerk Auth'
          desc='Drop-in authentication with pre-built UI components. Handles session management, MFA, social login, and user profiles. JWT tokens authenticate with Convex and Stream.'
          color='#8B5CF6'
        />
        <FeatureCard
          icon={Link}
          title='Stream SDK'
          desc='Two SDKs integrated: stream-chat-react for messaging UI components and @stream-io/video-react-sdk for video calls. Both handle real-time state synchronization.'
          color='#EC4899'
        />
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Data Flow</h2>
        <div className='space-y-3 text-sm'>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>1. User Authenticates</p>
            <p className='text-muted-foreground text-xs mt-1'>User signs in via Clerk modal → Clerk creates session → JWT token generated for Convex + Stream.</p>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>2. User Syncs</p>
            <p className='text-muted-foreground text-xs mt-1'>UserSyncWrapper runs → Convex upserts user → Stream Chat token created via Server Action → Stream client connects.</p>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>3. User Sends Message</p>
            <p className='text-muted-foreground text-xs mt-1'>Message sent via Stream Chat SDK → Stream servers distribute to recipients in real-time via WebSocket.</p>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>4. User Creates/Browses Channel</p>
            <p className='text-muted-foreground text-xs mt-1'>Channel data stored in Convex → Access control checks (isPublic or membership) → Posts fetched via paginated query → UI updates reactively.</p>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>5. User Mutates Data</p>
            <p className='text-muted-foreground text-xs mt-1'>Mutation runs → rateLimiter checks 1s interval → action performed (create/edit/delete/react/comment) → UI updates instantly via Convex reactivity.</p>
          </div>
        </div>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Project Structure</h2>
        <pre className='text-xs text-muted-foreground bg-muted/30 p-4 rounded-xl overflow-x-auto border border-border/20 leading-relaxed'>
{`📦 chatfun
├── app/              # Next.js App Router
│   ├── page.tsx      # Landing page
│   ├── layout.tsx    # Root layout (Clerk + Convex)
│   ├── (signed-in)/  # Authenticated routes
│   │   ├── dashboard/ # Chat interface (Stream Chat + Video)
│   │   └── channels/  # Channel pages (CRUD posts, comments, reactions)
│   └── docs/         # Documentation pages
├── components/       # React components
│   ├── landing/      # Landing page components
│   ├── channel/      # Channel feature components
│   └── ui/           # shadcn/ui + shared UI components
├── convex/           # Convex backend
│   ├── schema.ts     # Database schema (5 tables: users, channels, channelMembers, channelPosts, channelComments, callHistory)
│   ├── users.ts      # User functions (upsert, search, getUsersBatch)
│   ├── channels.ts   # Channel functions (CRUD, posts, comments, reactions, upload)
│   ├── callHistory.ts # Call tracking (startCall, endCall)
│   └── rateLimiter.ts # In-memory rate limiter (1s interval per user)
├── hooks/            # Custom React hooks (useCountUp, useCreateNewChat, useUserSearch)
├── lib/              # Utility libraries (Stream client, utils)
├── actions/          # Next.js Server Actions (createToken)
├── public/           # Static assets (screenshots, favicon)
└── types/            # TypeScript type declarations (clerk.d.ts)`}
        </pre>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/privacy'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Privacy & Security
        </a>
        <a
          href='/docs/api'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: API Reference
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
