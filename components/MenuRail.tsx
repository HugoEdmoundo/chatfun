'use client';

import { useEffect, useState } from 'react';
import { Home, MessageSquare, Radio, Settings, Bookmark, Moon, Sun, LogOut } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const railItems = [
  { icon: MessageSquare, label: 'All Chats', href: '/dashboard' },
  { icon: Radio, label: 'Channels', href: '/channels' },
];

export function MenuRail() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(stored ? stored === 'dark' : prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className='hidden md:flex flex-col items-center w-[60px] h-full bg-[#1a1a2e] dark:bg-[#0e1621] border-r border-[#2a2a3e] dark:border-[#17212b] flex-shrink-0 z-30'>
      <div className='relative'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='w-[60px] h-[54px] flex items-center justify-center hover:bg-[#2a2a3e] dark:hover:bg-[#17212b] transition-colors'
        >
          <div className='flex flex-col gap-[3px]'>
            <span className='block w-[18px] h-[2px] bg-white dark:bg-[#8e9299] rounded-full' />
            <span className='block w-[18px] h-[2px] bg-white dark:bg-[#8e9299] rounded-full' />
            <span className='block w-[18px] h-[2px] bg-white dark:bg-[#8e9299] rounded-full' />
          </div>
        </button>
        {menuOpen && (
          <>
            <div className='fixed inset-0 z-40' onClick={() => setMenuOpen(false)} />
            <div className='absolute left-full top-0 ml-1 z-50 w-56 bg-[#1c1c2e] dark:bg-[#17212b] rounded-xl shadow-lg border border-[#2a2a3e] dark:border-[#1f2c38] py-1 overflow-hidden'>
              <Link
                href='/dashboard'
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-white dark:text-[#fff] hover:bg-[#2a2a3e] dark:hover:bg-[#202e3c] transition-colors'
              >
                <MessageSquare className='w-4 h-4 text-[#8e9299]' />
                Chats
              </Link>
              <Link
                href='/channels'
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-white dark:text-[#fff] hover:bg-[#2a2a3e] dark:hover:bg-[#202e3c] transition-colors'
              >
                <Radio className='w-4 h-4 text-[#8e9299]' />
                Channels
              </Link>
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white dark:text-[#fff] hover:bg-[#2a2a3e] dark:hover:bg-[#202e3c] transition-colors'
              >
                {isDark ? <Sun className='w-4 h-4 text-[#8e9299]' /> : <Moon className='w-4 h-4 text-[#8e9299]' />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <Link
                href='/docs'
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-white dark:text-[#fff] hover:bg-[#2a2a3e] dark:hover:bg-[#202e3c] transition-colors'
              >
                <Bookmark className='w-4 h-4 text-[#8e9299]' />
                Saved Messages
              </Link>
              <div className='h-px bg-[#2a2a3e] dark:bg-[#1f2c38] my-1' />
              <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                <button
                  onClick={() => setMenuOpen(false)}
                  className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-[#3a1a1a] transition-colors'
                >
                  <LogOut className='w-4 h-4' />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </>
        )}
      </div>

      <div className='flex flex-col items-center gap-1 mt-4 w-full'>
        {railItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-[#2481cc] text-white'
                  : 'text-[#8e9299] hover:bg-[#2a2a3e] dark:hover:bg-[#17212b] hover:text-white'
              }`}
            >
              <item.icon className='w-5 h-5' />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
