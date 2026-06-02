'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import { Button } from '../ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Docs', href: '/docs' },
];

function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='glass-nav fixed top-0 left-0 right-0 z-50 h-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 group'>
          <Image src='/71c607ae-be83-407c-af29-a74ecbaa9e1f.png' alt='ChatFun' width={32} height={32} className='rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow' />
          <span className='text-lg font-bold tracking-tight text-foreground'>ChatFun</span>
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <div className='hidden md:flex items-center gap-3'>
            <Authenticated>
              {!isDashboard && (
                <Link href='/dashboard'>
                  <Button size='sm' className='bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white shadow-md shadow-blue-500/20'>
                    Dashboard
                  </Button>
                </Link>
              )}
              <UserButton />
            </Authenticated>
            <Unauthenticated>
              <SignInButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
                <Button variant='outline' size='sm' className='glass'>
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
                <Button size='sm' className='bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white shadow-md shadow-blue-500/20'>
                  Get Started
                </Button>
              </SignUpButton>
            </Unauthenticated>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors'
            aria-label='Toggle menu'
          >
            {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='md:hidden overflow-hidden glass-nav border-t border-border/40'
          >
            <div className='px-4 py-4 space-y-3'>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className='block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2'
                >
                  {link.label}
                </Link>
              ))}
              <div className='pt-3 border-t border-border/40 flex flex-col gap-2'>
                <Authenticated>
                  {!isDashboard && (
                    <Link href='/dashboard' onClick={() => setIsOpen(false)}>
                      <Button className='w-full bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white'>
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <div className='flex justify-center'>
                    <UserButton />
                  </div>
                </Authenticated>
                <Unauthenticated>
                  <SignInButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
                    <Button variant='outline' className='w-full glass'>
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
                    <Button className='w-full bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white'>
                      Get Started
                    </Button>
                  </SignUpButton>
                </Unauthenticated>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
