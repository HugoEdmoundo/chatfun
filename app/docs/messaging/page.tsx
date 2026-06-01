import { ArrowRight, FileText, Image, MessageCircle, Search, Smile } from 'lucide-react';

export default function MessagingDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Messaging</h1>
        <p className='text-lg text-muted-foreground'>
          ChatFun provides a rich real-time messaging experience with support for text, media, files,
          and more. Every message is delivered instantly with read receipts and typing indicators.
        </p>
      </div>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <MessageCircle className='w-6 h-6 text-[#2AABEE]' />
          Core Features
        </h2>

        <div className='grid gap-6 sm:grid-cols-2'>
          <FeatureCard
            icon={MessageCircle}
            title='Text Messaging'
            desc='Send and receive messages instantly. Supports rich text, emojis, and markdown formatting. Messages sync across all your devices in real-time.'
            color='#2AABEE'
          />
          <FeatureCard
            icon={Smile}
            title='Emoji & Reactions'
            desc='Express yourself with emojis and message reactions. React to any message with a wide selection of emojis.'
            color='#8B5CF6'
          />
          <FeatureCard
            icon={Image}
            title='Media Sharing'
            desc='Share images and files directly in chat. Media is uploaded via Stream CDN and displayed inline with thumbnails and previews.'
            color='#06D6A0'
          />
          <FeatureCard
            icon={Search}
            title='Message Search'
            desc='Search through your conversation history. Find specific messages, media, or links quickly with the built-in search.'
            color='#EC4899'
          />
        </div>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>How to Send a Message</h2>
        <ol className='space-y-3 list-decimal list-inside text-sm text-foreground'>
          <li>Select a conversation from the sidebar.</li>
          <li>Type your message in the input field at the bottom of the chat window.</li>
          <li>Press <kbd className='px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono'>Enter</kbd> to send, or <kbd className='px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono'>Shift + Enter</kbd> for a new line.</li>
          <li>Your message will appear instantly with a sent status, followed by a read receipt once the recipient views it.</li>
        </ol>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Typing Indicators</h2>
        <p className='text-sm text-muted-foreground'>
          When another user is typing, you&apos;ll see a &ldquo;User is typing...&rdquo; indicator at the top of the chat.
          This indicator disappears after 5 seconds of inactivity or when the message is sent.
        </p>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Read Receipts</h2>
        <p className='text-sm text-muted-foreground'>
          Each message shows its delivery status:
        </p>
        <ul className='space-y-2 text-sm'>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-muted-foreground/40' />
            <span><strong>Sent</strong> — Message has been sent to the server.</span>
          </li>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-muted-foreground/70' />
            <span><strong>Delivered</strong> — Message has been delivered to the recipient&apos;s device.</span>
          </li>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-[#2AABEE]' />
            <span><strong>Read</strong> — Recipient has opened and viewed the message.</span>
          </li>
        </ul>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>File & Media Sharing</h2>
        <p className='text-sm text-muted-foreground'>
          ChatFun supports sharing images and files directly in conversations. Uploaded files are stored
          securely via Stream&apos;s CDN and automatically optimized for fast delivery.
        </p>
        <div className='text-sm text-muted-foreground space-y-2'>
          <p><strong>Supported formats:</strong> Images (JPEG, PNG, GIF, WebP), Documents (PDF, DOC, TXT), and more.</p>
          <p><strong>File size limit:</strong> Determined by Stream Chat plan (typically 100MB for files, 10MB for images).</p>
        </div>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/getting-started'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Getting Started
        </a>
        <a
          href='/docs/groups'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Groups
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
