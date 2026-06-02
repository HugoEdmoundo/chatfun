'use client';

import { MessageCircle, Radio, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Active Users', color: '#2AABEE' },
  { icon: MessageCircle, value: 1000000, suffix: '+', label: 'Messages Sent', color: '#8B5CF6' },
  { icon: Radio, value: 5000, suffix: '+', label: 'Channels Created', color: '#06D6A0' },
  { icon: Zap, value: 99.9, suffix: '%', label: 'Uptime', color: '#F59E0B', divide: true },
];

function formatCount(value: number, suffix: string, divide?: boolean) {
  if (divide && value < 1000) return value.toFixed(1) + suffix;
  if (value >= 1000000) return (value / 1000000).toFixed(0) + 'M' + suffix;
  if (value >= 1000) return (value / 1000).toFixed(0) + 'K' + suffix;
  return value + suffix;
}

function StatCard({ stat, idx }: { stat: typeof stats[number]; idx: number }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className='text-center'
    >
      <div
        className='w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3'
        style={{ backgroundColor: `${stat.color}15` }}
      >
        <Icon className='w-6 h-6' style={{ color: stat.color }} />
      </div>
      <div ref={ref} className='text-2xl sm:text-3xl font-bold text-foreground'>
        {formatCount(count, stat.suffix, stat.divide)}
      </div>
      <div className='text-sm text-muted-foreground mt-1'>{stat.label}</div>
    </motion.div>
  );
}

function StatsBar() {
  return (
    <section className='relative py-16'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6'>
        <div className='glass rounded-2xl p-8 sm:p-10'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, idx) => (
              <StatCard key={stat.label} stat={stat} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
