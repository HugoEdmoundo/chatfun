'use client';

import { MessageCircle, Radio, Users, Zap } from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Users', color: '#2AABEE' },
  { icon: MessageCircle, value: '1M+', label: 'Messages Sent', color: '#8B5CF6' },
  { icon: Radio, value: '5K+', label: 'Channels Created', color: '#06D6A0' },
  { icon: Zap, value: '99.9%', label: 'Uptime', color: '#F59E0B' },
];

function StatsBar() {
  return (
    <section className='relative py-16'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6'>
        <div className='glass rounded-2xl p-8 sm:p-10'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div
                  className='w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3'
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className='w-6 h-6' style={{ color: stat.color }} />
                </div>
                <div className='text-2xl sm:text-3xl font-bold text-foreground'>{stat.value}</div>
                <div className='text-sm text-muted-foreground mt-1'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
