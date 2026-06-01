import { ArrowRight, Cloud, Globe, Package, Rocket, Settings, Terminal } from 'lucide-react';

export default function DeploymentDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Deployment</h1>
        <p className='text-lg text-muted-foreground'>
          Deploy ChatFun to production using Vercel for the Next.js frontend and Convex Cloud for
          the backend. This guide covers both local development setup and production deployment.
        </p>
      </div>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Terminal className='w-6 h-6 text-[#2AABEE]' />
          Local Development
        </h2>

        <div className='glass rounded-2xl p-8 space-y-4'>
          <h3 className='font-semibold text-foreground'>Prerequisites</h3>
          <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
            <li>Node.js 18+ installed</li>
            <li>npm or yarn package manager</li>
            <li>A Clerk account with API keys</li>
            <li>A Stream Chat account with API keys</li>
            <li>Convex CLI installed</li>
          </ul>
        </div>

        <div className='glass rounded-2xl p-8 space-y-4'>
          <h3 className='font-semibold text-foreground'>Setup Steps</h3>
          <ol className='space-y-2 text-sm'>
            <li className='flex items-start gap-2'>
              <Package className='w-4 h-4 text-[#2AABEE] mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-foreground'>Clone & Install</p>
                <pre className='text-xs bg-muted/30 p-2 rounded-lg mt-1'>git clone &lt;repo-url&gt;
cd chatfun
npm install</pre>
              </div>
            </li>
            <li className='flex items-start gap-2'>
              <Settings className='w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-foreground'>Configure Environment</p>
                <p className='text-xs text-muted-foreground'>Copy .env.local and fill in your API keys from Clerk, Stream, and Convex.</p>
              </div>
            </li>
            <li className='flex items-start gap-2'>
              <Globe className='w-4 h-4 text-[#06D6A0] mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-foreground'>Run Development Server</p>
                <pre className='text-xs bg-muted/30 p-2 rounded-lg mt-1'>npm run dev</pre>
                <p className='text-xs text-muted-foreground'>This runs both Next.js dev server and Convex dev server concurrently.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Rocket className='w-6 h-6 text-[#EC4899]' />
          Production Deployment
        </h2>

        <div className='grid gap-6 sm:grid-cols-2'>
          <FeatureCard
            icon={Globe}
            title='Vercel (Frontend)'
            desc='Deploy the Next.js app to Vercel for optimal performance. Vercel provides automatic SSL, CDN, and edge functions. Connect your GitHub repo for automatic deployments on every push.'
            color='#2AABEE'
          />
          <FeatureCard
            icon={Cloud}
            title='Convex Cloud (Backend)'
            desc='Deploy the Convex backend to Convex Cloud for production. Run `npx convex deploy` to push your schema and functions. Convex handles scaling, replication, and real-time subscriptions.'
            color='#06D6A0'
          />
        </div>

        <div className='glass rounded-2xl p-8 space-y-4'>
          <h3 className='font-semibold text-foreground'>Step-by-Step Deployment</h3>
          <ol className='space-y-3 text-sm list-decimal list-inside'>
            <li>
              <span className='font-medium text-foreground'>Push Convex backend:</span>
              <pre className='text-xs bg-muted/30 p-2 rounded-lg mt-1 ml-4'>npx convex deploy</pre>
            </li>
            <li>
              <span className='font-medium text-foreground'>Connect Vercel to your GitHub repo.</span>
            </li>
            <li>
              <span className='font-medium text-foreground'>Add environment variables</span> in Vercel project settings (all variables from .env.local).
            </li>
            <li>
              <span className='font-medium text-foreground'>Set production Convex URL:</span> Set <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>CONVEX_URL</code> to your production Convex deployment URL.
            </li>
            <li>
              <span className='font-medium text-foreground'>Deploy:</span> Push to GitHub or trigger a manual deploy in Vercel.
            </li>
          </ol>
        </div>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Environment Variables Checklist</h2>
        <p className='text-sm text-muted-foreground'>Ensure these are set in your production environment:</p>
        <div className='text-xs font-mono bg-muted/30 p-4 rounded-xl border border-border/20'>
          <p className='text-foreground'>NEXT_PUBLIC_APP_URL</p>
          <p className='text-foreground'>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</p>
          <p className='text-foreground'>CLERK_SECRET_KEY</p>
          <p className='text-foreground'>NEXT_PUBLIC_CLERK_JWT_ISSUER_DOMAIN</p>
          <p className='text-foreground'>NEXT_PUBLIC_STREAM_API_KEY</p>
          <p className='text-foreground'>STREAM_API_SECRET_KEY</p>
          <p className='text-foreground'>STREAM_APP_ID</p>
          <p className='text-foreground'>CONVEX_URL</p>
          <p className='text-foreground'>CONVEX_DEPLOYMENT</p>
        </div>
        <p className='text-xs text-muted-foreground'>
          Note: <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>CONVEX_URL</code> is set automatically by Convex when you run <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>npx convex deploy</code>.
        </p>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/api'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← API Reference
        </a>
        <a
          href='/docs/contributing'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Contributing
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
