import { create } from 'zustand';

interface VideoCallState {
  isActive: boolean;
  isMinimized: boolean;
  channelId: string | null;
  callId: string | null;
  participants: { id: string; name: string; image?: string }[];
  startCall: (channelId: string, callId?: string) => void;
  endCall: () => void;
  minimize: () => void;
  maximize: () => void;
  setParticipants: (participants: { id: string; name: string; image?: string }[]) => void;
}

export const useVideoCall = create<VideoCallState>((set) => ({
  isActive: false,
  isMinimized: false,
  channelId: null,
  callId: null,
  participants: [],
  startCall: (channelId, callId) =>
    set({ isActive: true, isMinimized: false, channelId, callId: callId || null, participants: [] }),
  endCall: () =>
    set({ isActive: false, isMinimized: false, channelId: null, callId: null, participants: [] }),
  minimize: () => set({ isMinimized: true }),
  maximize: () => set({ isMinimized: false }),
  setParticipants: (participants) => set({ participants }),
}));
