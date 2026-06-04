import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support — ChatFun',
};

export default function SupportPage() {
  return (
    <div className='min-h-screen pt-24 pb-16'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6'>
        <Link href='/' className='text-sm text-[#2AABEE] hover:underline mb-8 inline-block'>&larr; Back to Home</Link>
        <h1 className='text-4xl font-bold mb-8'>Support</h1>
        <div className='prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground'>
          <p>Need help with ChatFun? We&apos;re here to help.</p>
          <div className='glass rounded-2xl p-6 sm:p-8 space-y-4'>
            <h2 className='text-xl font-semibold text-foreground'>Frequently Asked Questions</h2>
            <div className='space-y-4'>
              <div>
                <h3 className='font-medium text-foreground'>Is ChatFun really free?</h3>
                <p className='mt-1'>Yes! ChatFun is completely free to use with no credit card required.</p>
              </div>
              <div>
                <h3 className='font-medium text-foreground'>How do I create a channel?</h3>
                <p className='mt-1'>After signing in, navigate to your dashboard and click the &quot;Create Channel&quot; button.</p>
              </div>
              <div>
                <h3 className='font-medium text-foreground'>Is my data secure?</h3>
                <p className='mt-1'>All messages are end-to-end encrypted. Your privacy is our priority.</p>
              </div>
            </div>
          </div>
          <div className='glass rounded-2xl p-6 sm:p-8'>
            <h2 className='text-xl font-semibold text-foreground mb-2'>Still need help?</h2>
            <p>Reach out to us at support@chatfun.demo and we&apos;ll get back to you as soon as possible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
