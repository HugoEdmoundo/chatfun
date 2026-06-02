'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, MessageCircle, Video, Radio } from 'lucide-react';

const features = [
  {
    id: 'messaging',
    icon: MessageCircle,
    title: 'Instant Messaging',
    subtitle: 'Real-time conversations at your fingertips',
    desc: 'Lightning-fast messages with delivery receipts, typing indicators, and full rich-media support. Every message arrives instantly, no matter where you are.',
    bullets: [
      'End-to-end encrypted by default',
      'Send text, images, files, and voice messages',
      'Read receipts and typing indicators',
      'Message reactions, replies, and quotes',
    ],
    gradient: 'from-[#2AABEE] to-[#8B5CF6]',
    image: 'left',
  },
  {
    id: 'video',
    icon: Video,
    title: 'HD Video Calls',
    subtitle: 'Face-to-face from anywhere',
    desc: 'Crystal-clear video calls with adaptive quality. Whether it\'s a quick catch-up or a team standup — you\'ll look and sound great.',
    bullets: [
      'One-click calls from any chat',
      'Screen sharing with presentation mode',
      'Adaptive streaming for any connection',
      'Works seamlessly on desktop and mobile',
    ],
    gradient: 'from-[#8B5CF6] to-[#EC4899]',
    image: 'right',
  },
  {
    id: 'channels',
    icon: Radio,
    title: 'Broadcast Channels',
    subtitle: 'Connect with your entire audience',
    desc: 'Create broadcast channels with hybrid discussion threads. Reach unlimited subscribers while keeping conversations organized.',
    bullets: [
      'Unlimited subscribers per channel',
      'Admin controls and moderation tools',
      'Comment threads for community discussion',
      'Analytics and subscriber insights',
    ],
    gradient: 'from-[#06D6A0] to-[#2AABEE]',
    image: 'left',
  },
];

function ChatMockup() {
  return (
    <div className='glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10'>
      <div className='h-8 bg-muted/50 backdrop-blur-sm flex items-center px-4 gap-1.5 border-b border-border/40'>
        <div className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
        <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
        <div className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
        <div className='ml-3 text-[11px] font-medium text-muted-foreground/60'>alice@chatfun.app</div>
      </div>
      <div className='p-4 space-y-3 min-h-[240px] flex flex-col justify-end'>
        <div className='flex justify-start'>
          <div className='bg-[#f0f2f5] dark:bg-[#2c2c2e] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[75%]'>
            <p className='text-sm text-foreground dark:text-white'>Hey! Ready for the meeting?</p>
          </div>
        </div>
        <div className='flex justify-end'>
          <div className='bg-gradient-to-r from-[#2AABEE] to-[#8B5CF6] text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[75%]'>
            <p className='text-sm'>Yep, logging in now!</p>
          </div>
        </div>
        <div className='flex justify-start'>
          <div className='bg-[#f0f2f5] dark:bg-[#2c2c2e] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[75%]'>
            <p className='text-sm text-foreground dark:text-white'>Great, I&apos;ll share the screen in a sec</p>
          </div>
        </div>
        <div className='flex items-center gap-2 text-muted-foreground/40 text-xs pl-1'>
          <div className='w-1.5 h-1.5 rounded-full bg-green-500' />
          Alice is typing...
        </div>
      </div>
    </div>
  );
}

function VideoMockup() {
  return (
    <div className='glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10'>
      <div className='h-8 bg-muted/50 backdrop-blur-sm flex items-center px-4 gap-1.5 border-b border-border/40'>
        <div className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
        <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
        <div className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
        <div className='ml-3 text-[11px] font-medium text-muted-foreground/60'>Video Call</div>
      </div>
      <Image
        src='/screenshot3.png'
        alt='Video Call Interface'
        width={560}
        height={380}
        className='w-full h-auto'
      />
    </div>
  );
}

function ChannelMockup() {
  return (
    <div className='glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10'>
      <div className='h-8 bg-muted/50 backdrop-blur-sm flex items-center px-4 gap-1.5 border-b border-border/40'>
        <div className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
        <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
        <div className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
        <div className='ml-3 text-[11px] font-medium text-muted-foreground/60'>Channels — Discover</div>
      </div>
      <div className='p-4 space-y-3'>
        {[
          { name: 'Tech Talks', members: '12.4K', gradient: 'from-[#2AABEE] to-[#8B5CF6]' },
          { name: 'Design Daily', members: '8.7K', gradient: 'from-[#EC4899] to-[#F59E0B]' },
          { name: 'DevOps Hub', members: '5.2K', gradient: 'from-[#06D6A0] to-[#2AABEE]' },
        ].map((ch) => (
          <div key={ch.name} className='flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-white/5 hover:bg-muted/50 transition-colors'>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch.gradient} flex items-center justify-center shrink-0`}>
              <Radio className='w-5 h-5 text-white' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-foreground'>{ch.name}</p>
              <p className='text-xs text-muted-foreground'>{ch.members} subscribers</p>
            </div>
            <div className='text-xs font-medium text-[#2AABEE]'>Join →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockups: Record<string, React.ReactNode> = {
  messaging: <ChatMockup />,
  video: <VideoMockup />,
  channels: <ChannelMockup />,
};

function FeaturesDeepDive() {
  return (
    <section id='features' className='relative py-24 sm:py-32'>
      <div className='orb orb-blue w-[400px] h-[400px] top-[20%] right-[-100px] opacity-10' />
      <div className='orb orb-pink w-[300px] h-[300px] bottom-[10%] left-[-50px] opacity-10' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-20'
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-4'>
            <span>Everything you need</span>
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold mb-4'>
            Powerful features for{' '}
            <span className='gradient-text'>modern communication</span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Built for speed, designed for clarity. Every feature ships with privacy and performance in mind.
          </p>
        </motion.div>

        <div className='space-y-28'>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const content = (
              <div className='space-y-6'>
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className='w-7 h-7 text-white' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold mb-2 text-foreground'>{feature.title}</h3>
                  <p className='text-lg text-[#2AABEE] font-medium'>{feature.subtitle}</p>
                </div>
                <p className='text-muted-foreground leading-relaxed text-base'>{feature.desc}</p>
                <ul className='space-y-3'>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className='flex items-start gap-3'>
                      <CheckCircle2 className='w-5 h-5 text-[#06D6A0] shrink-0 mt-0.5' />
                      <span className='text-sm text-foreground'>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            const mockup = (
              <motion.div
                initial={{ opacity: 0, x: feature.image === 'left' ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {mockups[feature.id]}
              </motion.div>
            );

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  feature.image === 'right' ? '' : ''
                }`}
              >
                {feature.image === 'left' ? (
                  <>
                    <div>{content}</div>
                    <div>{mockup}</div>
                  </>
                ) : (
                  <>
                    <div className='order-last lg:order-first'>{mockup}</div>
                    <div>{content}</div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesDeepDive;
