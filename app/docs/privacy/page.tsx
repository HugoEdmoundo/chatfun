import { ArrowRight, FileText, KeyRound, Lock, Shield, Eye } from 'lucide-react';

export default function PrivacyDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Privacy & Security</h1>
        <p className='text-lg text-muted-foreground'>
          At ChatFun, your privacy and security are our top priorities. We implement industry-standard
          security practices to keep your conversations safe and your data protected.
        </p>
      </div>

      <section className='grid gap-6 sm:grid-cols-2'>
        <FeatureCard
          icon={Lock}
          title='End-to-End Encryption'
          desc='All messages are encrypted in transit using TLS/SSL. Stream Chat handles message encryption at the transport level, ensuring your messages are secure between your device and our servers.'
          color='#2AABEE'
        />
        <FeatureCard
          icon={KeyRound}
          title='Authentication'
          desc='We use Clerk for authentication — a secure, SOC 2 compliant platform. We support email/password, Google SSO, GitHub SSO, and magic link authentication.'
          color='#8B5CF6'
        />
        <FeatureCard
          icon={Shield}
          title='Data Protection'
          desc='Your data is stored securely in Convex and Stream Cloud infrastructure. Both providers implement enterprise-grade security measures including encryption at rest.'
          color='#06D6A0'
        />
        <FeatureCard
          icon={Eye}
          title='Privacy Controls'
          desc='Control who can see your online status, profile information, and messages. You can leave any conversation or channel at any time.'
          color='#EC4899'
        />
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>How We Protect Your Data</h2>
        <ul className='space-y-3 text-sm'>
          <li className='flex items-start gap-3'>
            <Lock className='w-4 h-4 text-[#2AABEE] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Encryption in Transit</p>
              <p className='text-muted-foreground'>All data transferred between your browser and our servers is encrypted using TLS 1.3. This prevents eavesdropping and man-in-the-middle attacks.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <FileText className='w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Secure Authentication</p>
              <p className='text-muted-foreground'>Clerk handles authentication securely with session management, CSRF protection, and secure cookie handling. Passwords are never stored in our database.</p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <Shield className='w-4 h-4 text-[#06D6A0] mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-foreground'>Infrastructure Security</p>
              <p className='text-muted-foreground'>Our backend runs on Convex (SOC 2 compliant) and Stream (ISO 27001 certified). Both platforms implement physical, network, and application-level security controls.</p>
            </div>
          </li>
        </ul>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Data We Collect</h2>
        <ul className='space-y-2 text-sm text-muted-foreground list-disc list-inside'>
          <li><strong>Account Information:</strong> Name, email address, and profile picture (from Clerk).</li>
          <li><strong>Message Content:</strong> Messages, files, and media you send through the platform.</li>
          <li><strong>Usage Data:</strong> Basic analytics about feature usage to improve the service.</li>
        </ul>
        <p className='text-sm text-muted-foreground mt-2'>
          We do <strong>not</strong> sell your data, show ads, or share your personal information with third parties.
          Your conversations are private and belong to you.
        </p>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/video-calls'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Video Calls
        </a>
        <a
          href='/docs/architecture'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Architecture
          <ArrowRight className='w-4 h-4' />
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className='glass-card p-6'>
      <div
        className='w-10 h-10 rounded-xl flex items-center justify-center mb-4'
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className='w-5 h-5' style={{ color }} />
      </div>
      <h3 className='font-semibold text-foreground mb-2'>{title}</h3>
      <p className='text-sm text-muted-foreground leading-relaxed'>{desc}</p>
    </div>
  );
}
