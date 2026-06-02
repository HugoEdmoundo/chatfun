'use client';

import {
  MessageCircle,
  Video,
  Shield,
  Users,
  Zap,
  Radio,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: MessageCircle,
    title: 'Instant Messaging',
    desc: 'Lightning-fast messages with real-time delivery, read receipts, and typing indicators. Chat with anyone, anywhere.',
    gradient: 'from-[#2AABEE] to-[#8B5CF6]',
  },
  {
    icon: Video,
    title: 'HD Video Calls',
    desc: 'Crystal-clear video calls with one click. Perfect quality for personal chats and team meetings with screen sharing.',
    gradient: 'from-[#8B5CF6] to-[#EC4899]',
  },
  {
    icon: Radio,
    title: 'Channels',
    desc: 'Create broadcast channels with discussion threads. Share updates with unlimited subscribers in hybrid channel mode.',
    gradient: 'from-[#2AABEE] to-[#06D6A0]',
  },
  {
    icon: Users,
    title: 'Group Chats',
    desc: 'Create groups with friends, family, or colleagues. Manage conversations with advanced admin controls and permissions.',
    gradient: 'from-[#EC4899] to-[#F59E0B]',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'End-to-end encryption keeps your conversations private. Your data belongs to you, always. No tracking, no compromise.',
    gradient: 'from-[#06D6A0] to-[#2AABEE]',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Optimized for speed and performance. Works seamlessly across all your devices with instant sync and zero lag.',
    gradient: 'from-[#F59E0B] to-[#EC4899]',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function FeaturesGrid() {
  return (
    <section id='features' className='relative py-24 sm:py-32'>
      <div className='orb orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium mb-4'>
            <Zap className='w-4 h-4' />
            <span>Powerful features</span>
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold mb-4'>
            Everything you need to
            <br />
            <span className='gradient-text'>stay connected</span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Powerful features designed for seamless communication, whether you&apos;re chatting
            with friends or broadcasting to your community.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className='glass-card group p-6 sm:p-8 text-center hover:translate-y-[-4px] transition-all duration-300'>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 mx-auto shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        <Icon className='w-7 h-7 text-white' />
      </div>
      <h3 className='text-xl font-semibold mb-3 text-foreground'>{feature.title}</h3>
      <p className='text-muted-foreground leading-relaxed'>{feature.desc}</p>
    </div>
  );
}

export default FeaturesGrid;
