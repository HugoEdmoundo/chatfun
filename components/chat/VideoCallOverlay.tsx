'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoCall } from '@/hooks/useVideoCall';

export function VideoCallOverlay() {
  const { isActive, isMinimized, endCall, minimize, maximize } = useVideoCall();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
  }, []);

  const startLocalStream = useCallback(async () => {
    stopStream();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Failed to get media:', err);
    }
  }, [stopStream]);

  useEffect(() => {
    if (isActive && !isMinimized) {
      startLocalStream();
    }
    return () => {
      stopStream();
    };
  }, [isActive, isMinimized, startLocalStream, stopStream]);

  const toggleMic = () => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setMicOn((prev) => !prev);
    }
  };

  const toggleCam = () => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setCamOn((prev) => !prev);
    }
  };

  const handleEndCall = () => {
    stopStream();
    endCall();
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={false}
          animate={isMinimized ? 'minimized' : 'full'}
          exit={{ opacity: 0, scale: 0.8 }}
          className='fixed inset-0 z-[100] flex items-center justify-center'
        >
          {isMinimized ? (
            <motion.div
              key='minimized'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className='fixed bottom-6 right-6 w-[240px] h-[180px] rounded-2xl overflow-hidden shadow-2xl border border-[#1f2c38] cursor-pointer'
              onClick={maximize}
            >
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className='w-full h-full object-cover bg-[#0e1621]'
              />
              <div className='absolute top-2 right-2'>
                <button
                  onClick={(e) => { e.stopPropagation(); maximize(); }}
                  className='w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors'
                >
                  <Maximize2 className='w-3.5 h-3.5' />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='full'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className='fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6'
            >
              <div className='relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-[#0e1621] border border-[#1f2c38] shadow-2xl'>
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className='w-full h-full object-cover'
                />

                <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent'>
                  <div className='flex items-center justify-center gap-4'>
                    <button
                      onClick={toggleMic}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        micOn
                          ? 'bg-white/20 hover:bg-white/30 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {micOn ? <Mic className='w-5 h-5' /> : <MicOff className='w-5 h-5' />}
                    </button>
                    <button
                      onClick={toggleCam}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        camOn
                          ? 'bg-white/20 hover:bg-white/30 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {camOn ? <Video className='w-5 h-5' /> : <VideoOff className='w-5 h-5' />}
                    </button>
                    <button
                      onClick={handleEndCall}
                      className='w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors'
                    >
                      <PhoneOff className='w-6 h-6' />
                    </button>
                    <button
                      onClick={minimize}
                      className='w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors'
                    >
                      <Minimize2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
