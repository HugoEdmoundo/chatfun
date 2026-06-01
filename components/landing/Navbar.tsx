'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className='glass-nav fixed top-0 left-0 right-0 z-50 h-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 group'>
          <Image src='/71c607ae-be83-407c-af29-a74ecbaa9e1f.png' alt='ChatFun' width={32} height={32} className='rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow' />
          <span className='text-lg font-bold tracking-tight text-foreground'>ChatFun</span>
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          <Link href='/' className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            Home
          </Link>
          <Link href='/#features' className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            Features
          </Link>
          <Link href='/docs' className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            Docs
          </Link>
        </nav>

        <div className='flex items-center gap-3'>
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
      </div>
    </header>
  );
}

export default Navbar;
