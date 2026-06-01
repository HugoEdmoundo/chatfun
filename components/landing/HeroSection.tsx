'use client';

import { SignedOut, SignInButton } from '@clerk/nextjs';
import { ArrowRight, MessageCircle, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/button';

function HeroSection() {
  return (
    <section className='relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden'>
      <div className='orb orb-blue w-[500px] h-[500px] top-[-100px] left-[-100px]' />
      <div className='orb orb-purple w-[400px] h-[400px] bottom-[-50px] right-[-50px]' />
      <div className='orb orb-pink w-[300px] h-[300px] top-[40%] right-[20%]' />

      <div className='max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10'>
        <div className='glass-strong rounded-3xl p-8 sm:p-12 md:p-16 mb-8'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-8'>
            <Zap className='w-4 h-4' />
            <span>Lightning-fast messaging</span>
          </div>

          <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight'>
            Connect
            <span className='gradient-text'> instantly.</span>
            <br />
            <span className='gradient-text-pink'>Chat smarter.</span>
          </h1>

          <p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10'>
            The modern messaging platform that combines real-time chat, crystal-clear video calls,
            and powerful channels in one seamless experience.
          </p>

          <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
            <SignedOut>
              <SignInButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
                <Button size='lg' className='text-lg px-8 py-6 h-auto rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all'>
                  Start Chatting Free
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>
              </SignInButton>
            </SignedOut>
            <a href='/#features' className='text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4'>
              Explore features
            </a>
          </div>
        </div>

        <div className='flex justify-center items-center gap-6 sm:gap-10 text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50' />
            <span className='text-sm'>End-to-end encrypted</span>
          </div>
          <div className='flex items-center gap-2'>
            <Shield className='w-4 h-4 text-[#2AABEE]' />
            <span className='text-sm'>Privacy first</span>
          </div>
          <div className='flex items-center gap-2'>
            <MessageCircle className='w-4 h-4 text-[#2AABEE]' />
            <span className='text-sm'>Free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
