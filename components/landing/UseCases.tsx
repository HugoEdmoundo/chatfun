'use client';

import { motion } from 'framer-motion';
import { Heart, Briefcase, Users } from 'lucide-react';

const cases = [
  {
    icon: Heart,
    title: 'For Friends & Family',
    desc: 'Stay close with the people who matter. Group chats, shared media, and video calls keep everyone connected.',
    gradient: 'from-[#EC4899] to-[#F59E0B]',
    points: ['Private group chats', 'HD video calls', 'Photo & video sharing', 'Message reactions'],
  },
  {
    icon: Briefcase,
    title: 'For Teams & Work',
    desc: 'Replace Slack and Zoom with one seamless platform. Real-time collaboration without the clutter.',
    gradient: 'from-[#2AABEE] to-[#8B5CF6]',
    points: ['Team channels with threads', 'Screen sharing & calls', 'File sharing & search', 'Cross-device sync'],
  },
  {
    icon: Users,
    title: 'For Creators & Communities',
    desc: 'Build and engage your audience with broadcast channels. Share updates, host discussions, and grow your community.',
    gradient: 'from-[#06D6A0] to-[#2AABEE]',
    points: ['Unlimited subscribers', 'Discussion threads', 'Admin moderation', 'Engagement analytics'],
  },
];

function UseCases() {
  return (
    <section id='use-cases' className='relative py-24 sm:py-32 bg-muted/20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-4'>
            <span>Built for everyone</span>
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold mb-4'>
            One platform.{' '}
            <span className='gradient-text'>Endless possibilities</span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Whether you&apos;re catching up with friends, shipping code with your team, or growing a community — ChatFun fits.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-6'>
          {cases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='glass group p-6 sm:p-8 rounded-2xl hover:translate-y-[-4px] transition-all duration-300'
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className='w-7 h-7 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-3 text-foreground'>{item.title}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed mb-5'>{item.desc}</p>
                <ul className='space-y-2.5'>
                  {item.points.map((point) => (
                    <li key={point} className='flex items-center gap-2.5 text-sm'>
                      <div className='w-1.5 h-1.5 rounded-full bg-[#2AABEE] shrink-0' />
                      <span className='text-muted-foreground'>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UseCases;
