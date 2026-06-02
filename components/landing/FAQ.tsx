'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'Is ChatFun really free?',
    a: 'Yes! ChatFun is completely free with no hidden charges. We believe communication should be accessible to everyone. There\'s no credit card required, no trial period — just pure, unfettered messaging.',
  },
  {
    q: 'How is my data protected?',
    a: 'Your privacy is our priority. All messages are end-to-end encrypted by default. We don\'t read your messages, we don\'t sell your data, and we never will. Our encryption protocols are industry-standard and independently audited.',
  },
  {
    q: 'Can I use ChatFun on multiple devices?',
    a: 'Absolutely. ChatFun syncs seamlessly across all your devices — desktop, tablet, and phone. Your messages, contacts, and channels are always up to date, no matter which device you\'re using.',
  },
  {
    q: 'What\'s the difference between a chat and a channel?',
    a: 'Chats are for private conversations — one-on-one or group messaging with friends and colleagues. Channels are for broadcasting to a larger audience, where admins post updates and subscribers can engage in discussion threads.',
  },
  {
    q: 'Can I make video calls?',
    a: 'Yes! HD video calls are built directly into ChatFun. Start a call with one click from any chat. Features include screen sharing, adaptive streaming quality, and support for up to 10 participants.',
  },
  {
    q: 'How do I create a channel?',
    a: 'Once you\'re signed in, navigate to the Channels section and click "Create Channel". Set a name, description, and choose between public or private. You can customize your channel with a profile image and admin roles.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id='faq' className='relative py-24 sm:py-32'>
      <div className='orb orb-pink w-[300px] h-[300px] top-0 right-0 opacity-10' />

      <div className='max-w-3xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-4'>
            <span>Got questions?</span>
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold mb-4'>
            Frequently asked{' '}
            <span className='gradient-text'>questions</span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to know about ChatFun. Can&apos;t find what you&apos;re looking for? Check our{' '}
            <a href='/docs' className='text-[#2AABEE] hover:underline'>docs</a>.
          </p>
        </motion.div>

        <div className='space-y-3'>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className='glass rounded-2xl overflow-hidden'
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className='w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-muted/20 transition-colors'
                >
                  <span className='text-sm sm:text-base font-medium text-foreground pr-4'>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div className='px-5 sm:px-6 pb-5 sm:pb-6'>
                        <p className='text-sm text-muted-foreground leading-relaxed'>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
