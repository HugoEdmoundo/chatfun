'use client';

import { motion } from 'framer-motion';
import { UserPlus, MessageSquare, Globe } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Account',
    desc: 'Sign up in seconds with your email or Google account. No credit card required — ever.',
    color: '#2AABEE',
  },
  {
    icon: MessageSquare,
    title: 'Start a Chat or Channel',
    desc: 'Message friends one-on-one, create group chats, or launch a broadcast channel for your community.',
    color: '#8B5CF6',
  },
  {
    icon: Globe,
    title: 'Connect Anywhere',
    desc: 'Sync across all your devices with instant delivery. Crystal-clear calls and messages, always in sync.',
    color: '#06D6A0',
  },
];

function HowItWorks() {
  return (
    <section id='how-it-works' className='relative py-24 sm:py-32'>
      <div className='orb orb-purple w-[300px] h-[300px] top-0 left-[10%] opacity-10' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-4'>
            <span>Simple setup</span>
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold mb-4'>
            Get started in{' '}
            <span className='gradient-text'>minutes</span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            No complicated setup. No hidden fees. Just pure, seamless communication.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8 relative'>
          <div className='hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-[#2AABEE] via-[#8B5CF6] to-[#06D6A0] opacity-30' />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className='relative flex flex-col items-center text-center'
              >
                <div className='relative mb-6'>
                  <div className='w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg' style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}88)`
                  }}>
                    <Icon className='w-8 h-8 text-white' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-7 h-7 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center'>
                    {idx + 1}
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-3 text-foreground'>{step.title}</h3>
                <p className='text-muted-foreground leading-relaxed max-w-xs'>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
