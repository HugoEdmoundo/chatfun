'use client';

import { SignedOut, SignUpButton } from '@clerk/nextjs';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

function CTASection() {
  return (
    <section className='relative py-24 sm:py-32'>
      <div className='orb orb-blue w-[500px] h-[500px] bottom-0 left-[-100px] opacity-20' />
      <div className='orb orb-pink w-[300px] h-[300px] top-0 right-[10%] opacity-15' />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='glass-strong rounded-3xl p-8 sm:p-12 md:p-16 text-center'
        >
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2AABEE] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20'>
            <CheckCircle2 className='w-8 h-8 text-white' />
          </div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
            Ready to transform your
            <br />
            <span className='gradient-text'>conversations?</span>
          </h2>
          <p className='text-lg text-muted-foreground mb-10 max-w-2xl mx-auto'>
            Join thousands of users who&apos;ve already discovered a better way to communicate.
            Start your journey with ChatFun today — it&apos;s completely free.
          </p>

          <SignedOut>
            <SignUpButton mode='modal' forceRedirectUrl='/dashboard' signUpForceRedirectUrl='/dashboard'>
              <Button size='lg' className='text-lg px-10 py-6 h-auto rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] hover:from-[#1E96C8] hover:to-[#7C3AED] text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all'>
                Get Started Free
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            </SignUpButton>
          </SignedOut>

          <div className='flex justify-center flex-col sm:flex-row items-center gap-6 mt-10 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-[#2AABEE] shadow-sm shadow-[#2AABEE]/50'></div>
              No credit card required
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-[#8B5CF6] shadow-sm shadow-[#8B5CF6]/50'></div>
              Free forever plan
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-[#06D6A0] shadow-sm shadow-[#06D6A0]/50'></div>
              Setup in 30 seconds
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
