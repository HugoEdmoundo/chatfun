import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — ChatFun',
};

export default function PrivacyPage() {
  return (
    <div className='min-h-screen pt-24 pb-16'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6'>
        <Link href='/' className='text-sm text-[#2AABEE] hover:underline mb-8 inline-block'>&larr; Back to Home</Link>
        <h1 className='text-4xl font-bold mb-8'>Privacy Policy</h1>
        <div className='prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground'>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>ChatFun is a demo application. This is a sample privacy policy for demonstration purposes only.</p>
          <h2 className='text-xl font-semibold text-foreground mt-8'>Information We Collect</h2>
          <p>We collect information you provide when creating an account, including your email address and display name. We also collect basic usage data to improve the service.</p>
          <h2 className='text-xl font-semibold text-foreground mt-8'>How We Use Your Information</h2>
          <p>Your information is used solely to provide and improve the ChatFun messaging service. We do not sell your personal data to third parties.</p>
          <h2 className='text-xl font-semibold text-foreground mt-8'>Contact</h2>
          <p>If you have any questions about this privacy policy, please contact us through our support page.</p>
        </div>
      </div>
    </div>
  );
}
