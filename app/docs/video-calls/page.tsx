import { ArrowRight, Monitor, PhoneOff, Video, VideoOff } from 'lucide-react';

export default function VideoCallsDocs() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Video Calls</h1>
        <p className='text-lg text-muted-foreground'>
          ChatFun integrates Stream Video for high-quality, WebRTC-based video calls. Start a call
          with one click from any conversation — perfect for personal chats and team meetings.
        </p>
      </div>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
          <Video className='w-6 h-6 text-[#8B5CF6]' />
          Starting a Video Call
        </h2>

        <div className='glass rounded-2xl p-8 space-y-4'>
          <ol className='space-y-3'>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>1</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Open a Conversation</p>
                <p className='text-sm text-muted-foreground'>Select any 1-on-1 or group chat from your sidebar.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>2</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Click &ldquo;Video Call&rdquo;</p>
                <p className='text-sm text-muted-foreground'>Click the &ldquo;Video Call&rdquo; button in the chat header.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>3</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Wait for Connection</p>
                <p className='text-sm text-muted-foreground'>You&apos;ll see a &ldquo;Joining call...&rdquo; status while the system connects.</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>4</span>
              <div>
                <p className='text-sm font-medium text-foreground'>Share the Invite Link</p>
                <p className='text-sm text-muted-foreground'>Share the call link with others so they can join. The link is auto-generated and unique for each call.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className='grid gap-6 sm:grid-cols-2'>
        <FeatureCard
          icon={Video}
          title='HD Video Quality'
          desc='Crystal-clear video with adaptive quality that adjusts to your network conditions. Supports resolutions up to 1080p.'
          color='#8B5CF6'
        />
        <FeatureCard
          icon={Monitor}
          title='Screen Sharing'
          desc='Share your screen during calls for presentations, demos, or collaboration. Toggle between your camera and screen with one click.'
          color='#2AABEE'
        />
        <FeatureCard
          icon={VideoOff}
          title='Camera Controls'
          desc='Toggle your camera on/off during calls. Mute your microphone independently.'
          color='#EC4899'
        />
        <FeatureCard
          icon={PhoneOff}
          title='Leave Call'
          desc='Click the call controls to leave at any time. You&apos;ll be redirected back to the dashboard automatically.'
          color='#06D6A0'
        />
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Call Controls</h2>
        <p className='text-sm text-muted-foreground'>
          During a call, you&apos;ll see a control bar at the bottom of the screen with the following options:
        </p>
        <ul className='space-y-2 text-sm'>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-muted-foreground/40' />
            <span><strong>Microphone:</strong> Mute/unmute your audio.</span>
          </li>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-muted-foreground/40' />
            <span><strong>Camera:</strong> Turn your video on/off.</span>
          </li>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-muted-foreground/40' />
            <span><strong>Screen Share:</strong> Start/stop sharing your screen.</span>
          </li>
          <li className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-red-500' />
            <span><strong>Leave Call:</strong> End the call and return to dashboard (red button).</span>
          </li>
        </ul>
      </section>

      <section className='glass rounded-2xl p-8 space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Speaker Layout</h2>
        <p className='text-sm text-muted-foreground'>
          ChatFun uses Stream&apos;s SpeakerLayout which automatically highlights the active speaker
          in the main view while showing other participants as thumbnails. This provides a natural
          meeting experience similar to professional video conferencing tools.
        </p>
      </section>

      <section className='glass rounded-2xl p-8 border-l-4 border-l-[#8B5CF6]'>
        <h3 className='font-semibold text-foreground mb-1'>⚠️ Requirements</h3>
        <ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
          <li>A stable internet connection (minimum 2 Mbps recommended).</li>
          <li>A working camera and microphone (check browser permissions).</li>
          <li>A modern browser (Chrome, Firefox, Safari, or Edge — latest versions).</li>
          <li>Camera and microphone permissions must be granted in your browser settings.</li>
        </ul>
      </section>

      <div className='flex justify-between items-center pt-4 border-t border-border/40'>
        <a
          href='/docs/channels-docs'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          ← Channels
        </a>
        <a
          href='/docs/privacy'
          className='inline-flex items-center gap-2 text-sm text-[#2AABEE] hover:text-[#1E96C8] font-medium'
        >
          Next: Privacy & Security
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
