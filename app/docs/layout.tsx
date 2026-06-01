'use client';

import { BookOpen, Code2, Cpu, FileQuestion, GitBranch, Globe, Lock, MessageCircle, Radio, Rocket, Users, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const docsNav = [
  {
    category: 'Getting Started',
    items: [
      { icon: BookOpen, label: 'Overview', href: '/docs' },
      { icon: Rocket, label: 'Getting Started', href: '/docs/getting-started' },
    ],
  },
  {
    category: 'Features',
    items: [
      { icon: MessageCircle, label: 'Messaging', href: '/docs/messaging' },
      { icon: Users, label: 'Groups', href: '/docs/groups' },
      { icon: Radio, label: 'Channels', href: '/docs/channels-docs' },
      { icon: Video, label: 'Video Calls', href: '/docs/video-calls' },
    ],
  },
  {
    category: 'Security',
    items: [
      { icon: Lock, label: 'Privacy & Security', href: '/docs/privacy' },
    ],
  },
  {
    category: 'Development',
    items: [
      { icon: Cpu, label: 'Architecture', href: '/docs/architecture' },
      { icon: Code2, label: 'API Reference', href: '/docs/api' },
      { icon: Globe, label: 'Deployment', href: '/docs/deployment' },
      { icon: GitBranch, label: 'Contributing', href: '/docs/contributing' },
    ],
  },
  {
    category: 'Support',
    items: [
      { icon: FileQuestion, label: 'FAQ', href: '/docs/faq' },
    ],
  },
];

function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 flex-shrink-0 border-r border-border/40 bg-muted/10 overflow-y-auto z-40 transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className='p-6'>
          <Link href='/' className='flex items-center gap-2 group mb-8'>
            <Image src='/71c607ae-be83-407c-af29-a74ecbaa9e1f.png' alt='ChatFun' width={32} height={32} className='rounded-xl' />
            <span className='text-lg font-bold tracking-tight'>ChatFun</span>
            <span className='text-xs text-muted-foreground ml-1'>Docs</span>
          </Link>

          <nav className='space-y-6'>
            {docsNav.map((section) => (
              <div key={section.category}>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2'>
                  {section.category}
                </h4>
                <ul className='space-y-1'>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? 'bg-[#2AABEE]/10 text-[#2AABEE] font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <Icon className='w-4 h-4 flex-shrink-0' />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/20 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className='flex-1 min-w-0'>
        {/* Mobile header */}
        <header className='sticky top-0 z-20 glass-nav md:hidden'>
          <div className='flex items-center justify-between px-4 h-14'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='text-muted-foreground hover:text-foreground'
            >
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
            <span className='text-sm font-semibold'>ChatFun Docs</span>
            <div className='w-6' />
          </div>
        </header>

        <main className='max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12'>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DocsLayout;
