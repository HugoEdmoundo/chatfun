'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Channels', href: '/channels' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/docs/api' },
    { label: 'FAQ', href: '/docs/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Support', href: '/support' },
  ],
};

function Footer() {
  return (
    <footer className='border-t border-border/40 bg-muted/20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div className='col-span-2 md:col-span-1'>
            <Link href='/' className='flex items-center gap-2 group mb-4'>
              <Image src='/71c607ae-be83-407c-af29-a74ecbaa9e1f.png' alt='ChatFun' width={32} height={32} className='rounded-xl' />
              <span className='text-lg font-bold tracking-tight'>ChatFun</span>
            </Link>
            <p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
              Modern messaging platform for everyone. Real-time chat, video calls, and channels —
              all in one place.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='text-sm font-semibold text-foreground mb-4'>{category}</h4>
              <ul className='space-y-3'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-[#2AABEE] transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-t border-border/40 mt-12 pt-8 text-center'>
          <p className='text-xs text-muted-foreground'>
            &copy; {new Date().getFullYear()} ChatFun. This is a demo application. We have no
            affiliation with any of the brands mentioned. Any usage is purely educational. In the
            event of any infringement, please contact us and we will remove/alter the content
            immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
