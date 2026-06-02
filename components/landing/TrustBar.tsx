'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, Radio, Zap } from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Users', color: '#2AABEE' },
  { icon: MessageCircle, value: '1M+', label: 'Messages Daily', color: '#8B5CF6' },
  { icon: Radio, value: '5K+', label: 'Channels', color: '#06D6A0' },
  { icon: Zap, value: '99.9%', label: 'Uptime', color: '#F59E0B' },
];

const logos = [
  { name: 'TechFlow', gradient: 'from-[#2AABEE] to-[#8B5CF6]' },
  { name: 'DevCrew', gradient: 'from-[#EC4899] to-[#F59E0B]' },
  { name: 'StartupX', gradient: 'from-[#06D6A0] to-[#2AABEE]' },
  { name: 'CloudNine', gradient: 'from-[#8B5CF6] to-[#EC4899]' },
  { name: 'ProtoHub', gradient: 'from-[#F59E0B] to-[#06D6A0]' },
];

function TrustBar() {
  return (
    <section className='relative py-16 sm:py-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-10'
        >
          <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Trusted by teams and communities worldwide
          </p>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12'>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className='text-center'
              >
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2'
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className='w-5 h-5' style={{ color: stat.color }} />
                </div>
                <div className='text-xl sm:text-2xl font-bold text-foreground'>{stat.value}</div>
                <div className='text-xs sm:text-sm text-muted-foreground'>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex flex-wrap items-center justify-center gap-x-10 gap-y-4'
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className='flex items-center gap-2 text-muted-foreground/50'
            >
              <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${logo.gradient} opacity-60`} />
              <span className='text-sm font-semibold tracking-tight'>{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TrustBar;
