import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — ChatFun',
};

export default function TermsPage() {
  return (
    <div className='min-h-screen pt-24 pb-16'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6'>
        <Link href='/' className='text-sm text-[#2AABEE] hover:underline mb-8 inline-block'>&larr; Back to Home</Link>
        <h1 className='text-4xl font-bold mb-8'>Terms of Service</h1>
        <div className='prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground'>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>These terms of service are for a demo application. By using ChatFun, you agree to these terms.</p>
          <h2 className='text-xl font-semibold text-foreground mt-8'>Use of Service</h2>
          <p>ChatFun is provided as a demonstration application. The service is provided &quot;as is&quot; without warranties of any kind.</p>
          <h2 className='text-xl font-semibold text-foreground mt-8'>User Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
          <h2 className='text-xl font-semibold text-foreground mt-8'>Contact</h2>
          <p>If you have any questions about these terms, please contact us through our support page.</p>
        </div>
      </div>
    </div>
  );
}
