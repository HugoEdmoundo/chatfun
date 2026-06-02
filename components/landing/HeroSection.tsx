'use client';

import { SignedOut, SignUpButton } from '@clerk/nextjs';
import { ArrowRight, MessageCircle, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

function HeroSection() {
  return (
    <section className='relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden'>
      <div className='orb orb-blue w-[500px] h-[500px] top-[-100px] left-[-100px]' />
      <div className='orb orb-purple w-[400px] h-[400px] bottom-[-50px] right-[-50px]' />
      <div className='orb orb-pink w-[300px] h-[300px] top-[40%] right-[20%]' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='text-center lg:text-left'
          >
            <motion.div variants={itemVariants} className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-8'>
              <Zap className='w-4 h-4' />
              <span>Lightning-fast messaging</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className='text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight'>
              Connect
              <span className='gradient-text'> instantly.</span>
              <br />
              <span className='gradient-text-pink'>Chat smarter.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10'>
              The modern messaging platform that combines real-time chat, crystal-clear video calls,
              and powerful channels in one seamless experience.
            </motion.p>

            <motion.div variants={itemVariants} className='flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4'>
              <SignedOut>
                <SignUpButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
                  <Button size='lg' className='text-lg px-8 py-6 h-auto rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all'>
                    Start Chatting Free
                    <ArrowRight className='ml-2 w-5 h-5' />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <a href='/#features' className='text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4'>
                Explore features
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className='flex justify-center lg:justify-start items-center gap-6 sm:gap-10 text-muted-foreground mt-10'>
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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className='hidden lg:block relative'
          >
            <div className='animate-float relative'>
              <div className='relative mx-auto w-full max-w-[560px]'>
                <div className='relative rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/20 dark:border-white/10'>
                  <div className='h-7 bg-muted/80 backdrop-blur-sm flex items-center px-3 gap-1.5 border-b border-border/40'>
                    <div className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
                    <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
                    <div className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
                    <div className='ml-3 h-3.5 flex-1 max-w-[180px] rounded bg-muted-foreground/10' />
                  </div>
                  <Image
                    src='/screenshot2.png'
                    alt='ChatFun Dashboard'
                    width={560}
                    height={380}
                    className='w-full h-auto'
                    priority
                  />
                </div>
                <div className='absolute -bottom-3 -right-3 w-full h-full rounded-xl border border-[#2AABEE]/20 -z-10' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
