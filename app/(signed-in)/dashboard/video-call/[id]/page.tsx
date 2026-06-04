'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { StatusCard } from '@/components/StatusCard';
import { InlineSpinner } from '@/components/LoadingSpinner';
import { Check, Copy, UserPlus, X } from 'lucide-react';

function VideoCall() {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showInviteOverlay, setShowInviteOverlay] = useState(true);
  const [pageUrl, setPageUrl] = useState('');
  const { setOpen } = useSidebar();

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleLeave = () => {
    router.push('/dashboard');
    setOpen(true);
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  if (callingState === CallingState.JOINING) {
    return (
      <StatusCard
        title='Joining call...'
        description='Please wait while we connect you to the call.'
        className='bg-gray-50 rounded-lg'
      >
        <InlineSpinner size='lg' />
      </StatusCard>
    );
  }
  if (callingState === CallingState.RECONNECTING) {
    return (
      <StatusCard
        title='Reconnecting...'
        description='Connection lost, attempting to reconnect.'
        className='bg-yellow-50 rounded-lg border border-yellow-200'
      >
        <div className='animate-pulse rounded-full h-12 w-12 bg-yellow-400 mx-auto'></div>
      </StatusCard>
    );
  }
  if (callingState !== CallingState.JOINED) {
    return (
      <StatusCard
        title='Loading call...'
        description={`Status: ${callingState}`}
        className='bg-gray-50 rounded-lg'
      >
        <div className='animate-pulse rounded-full h-12 w-12 bg-gray-400 mx-auto'></div>
      </StatusCard>
    );
  }

  return (
    <div className='flex flex-col'>
      {/* Video layout */}
      <div className='flex-1 relative'>
        <SpeakerLayout />
      </div>

      {/* Call controls */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10'>
        <CallControls onLeave={handleLeave} />
      </div>

      {/* Invite toggle button - visible when overlay is closed */}
      {!showInviteOverlay && (
        <button
          onClick={() => setShowInviteOverlay(true)}
          className='absolute top-4 right-4 z-20 p-2.5 bg-gray-900/80 hover:bg-gray-900 rounded-full transition-colors border border-gray-700'
          title='Show invite link'
        >
          <UserPlus className='w-5 h-5 text-white' />
        </button>
      )}

      {/* Waiting overlay */}
      {showInviteOverlay && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10'>
          <div className='bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl relative'>
            {/* Close button */}
            <button
              onClick={() => setShowInviteOverlay(false)}
              className='absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors'
              title='Close'
            >
              <X className='w-5 h-5 text-gray-500' />
            </button>

            <div className='text-center space-y-6'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto'>
                <Copy className='w-8 h-8 text-blue-600' />
              </div>
              <div className='space-y-2'>
                <h2 className='text-2xl font-bold text-gray-900'>Waiting for others to join</h2>
                <p className='text-gray-600'>
                  Share this link with others to invite them to the call
                </p>
              </div>
              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <div className='flex items-center gap-3'>
                  <div className='flex-1 text-sm text-gray-700 font-mono break-all'>
                    {pageUrl}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap'
                  >
                    {copied ? (
                      <>
                        <Check className='w-4 h-4' />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className='w-4 h-4' />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className='text-sm text-gray-500'>Others will be able to join this link</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default VideoCall;
