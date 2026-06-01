import { ArrowRight, Bug, Code2, GitBranch, GitPullRequest, MessageCircle, Star } from 'lucide-react';

export default function ContributingDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Contributing</h1>
        <p className='text-lg text-muted-foreground'>
          We welcome contributions from the community! Whether you&apos;re fixing bugs, adding features,
          or improving documentation, your help makes ChatFun better for everyone.
        </p>
      </div>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground flex items-center gap-2'>
          <GitBranch className='w-5 h-5 text-[#2AABEE]' />
          Getting Started
        </h2>
        <ol className='space-y-3 text-sm list-decimal list-inside'>
          <li>
            <span className='font-medium text-foreground'>Fork the repository</span>
            <p className='text-muted-foreground ml-4'>Click the &ldquo;Fork&rdquo; button on the GitHub repository page.</p>
          </li>
          <li>
            <span className='font-medium text-foreground'>Clone your fork</span>
            <pre className='text-xs bg-muted/30 p-2 rounded-lg mt-1 ml-4'>git clone https://github.com/your-username/chatfun.git
cd chatfun</pre>
          </li>
          <li>
            <span className='font-medium text-foreground'>Set up upstream</span>
            <pre className='text-xs bg-muted/30 p-2 rounded-lg mt-1 ml-4'>git remote add upstream https://github.com/ragini-pandey/telegram-clone.git</pre>
          </li>
          <li>
            <span className='font-medium text-foreground'>Create a branch</span>
            <pre className='text-xs bg-muted/30 p-2 rounded-lg mt-1 ml-4'>git checkout -b feature/your-feature-name</pre>
          </li>
        </ol>
      </section>

      <section className='grid gap-6 sm:grid-cols-2'>
        <FeatureCard
          icon={Code2}
          title='Code Style'
          desc='We use ESLint with Next.js config. Run `npm run lint` before committing. Follow existing patterns for components, hooks, and types.'
          color='#2AABEE'
        />
        <FeatureCard
          icon={Bug}
          title='Reporting Bugs'
          desc='Open a GitHub issue with a clear description, steps to reproduce, expected vs actual behavior, and screenshots if applicable.'
          color='#EC4899'
        />
        <FeatureCard
          icon={GitPullRequest}
          title='Pull Requests'
          desc='Keep PRs focused on a single change. Write a clear description of what and why. Link related issues. Ensure all checks pass.'
          color='#8B5CF6'
        />
        <FeatureCard
          icon={Star}
          title='Feature Requests'
          desc='Open a discussion or issue to propose new features. We value community input and will review suggestions regularly.'
          color='#06D6A0'
        />
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Development Workflow</h2>
        <div className='space-y-3 text-sm'>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>1. Pull latest changes</p>
            <pre className='text-xs bg-muted/20 p-2 rounded-lg mt-1'>git checkout main
git pull upstream main</pre>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>2. Create feature branch</p>
            <pre className='text-xs bg-muted/20 p-2 rounded-lg mt-1'>git checkout -b feature/awesome-feature</pre>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>3. Make changes & commit</p>
            <pre className='text-xs bg-muted/20 p-2 rounded-lg mt-1'>git add .
git commit -m "feat: add awesome feature"</pre>
            <p className='text-xs text-muted-foreground mt-1'>Use conventional commit messages: feat:, fix:, docs:, refactor:, chore:</p>
          </div>
          <div className='p-3 rounded-lg bg-muted/30 border border-border/20'>
            <p className='font-medium text-foreground'>4. Push and create PR</p>
            <pre className='text-xs bg-muted/20 p-2 rounded-lg mt-1'>git push origin feature/awesome-feature</pre>
            <p className='text-xs text-muted-foreground mt-1'>Then open a pull request on GitHub from your fork.</p>
          </div>
        </div>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Code Guidelines</h2>
        <ul className='space-y-2 text-sm text-muted-foreground list-disc list-inside'>
          <li>Use TypeScript for all new code — strict mode enabled.</li>
          <li>Follow the existing component structure and naming conventions.</li>
          <li>Use TailwindCSS for styling — avoid inline styles and CSS modules.</li>
          <li>Keep components focused and modular — one responsibility per component.</li>
          <li>Add proper TypeScript types for all props, state, and function parameters.</li>
          <li>Use Convex for backend logic — avoid creating separate API routes.</li>
          <li>Run <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>npm run lint</code> before committing.</li>
          <li>Test your changes locally before submitting a PR.</li>
        </ul>
      </section>

      <section className='glass rounded-2xl p-8 border-l-4 border-l-[#2AABEE]'>
        <h3 className='font-semibold text-foreground mb-1 flex items-center gap-2'>
          <MessageCircle className='w-4 h-4 text-[#2AABEE]' />
          Need Help?
        </h3>
        <p className='text-sm text-muted-foreground'>
          Join our community! Open a GitHub discussion or issue for questions, suggestions, or help
          with contributing. We&apos;re here to help you get started.
        </p>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/deployment'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Deployment
        </a>
        <a
          href='/docs/faq'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: FAQ
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
