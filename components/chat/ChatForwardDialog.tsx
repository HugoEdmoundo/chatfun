'use client';

import { useMemo, useState } from 'react';
import { Forward, Search, X, Check } from 'lucide-react';
import { useChatContext } from 'stream-chat-react';
import { useUser } from '@clerk/nextjs';
import { useChat } from './ChatContext';

export function ChatForwardDialog() {
  const { channel: activeChannel, client } = useChatContext();
  const { user } = useUser();
  const chat = useChat();
  const [searchTarget, setSearchTarget] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const channels = useMemo(() => {
    if (!client?.user || !activeChannel) return [];
    const state = (activeChannel as any).state;
    const chans = state?.channels || {};
    return Object.values(chans).filter((ch: any) => ch.cid !== activeChannel.cid);
  }, [client, activeChannel]);

  const filtered = useMemo(() => {
    if (!searchTarget) return channels;
    return channels.filter((ch: any) =>
      ch.data?.name?.toLowerCase().includes(searchTarget.toLowerCase())
    );
  }, [channels, searchTarget]);

  const handleForward = async () => {
    if (!selectedId || !client) return;
    const targetChannel = channels.find((ch: any) => ch.cid === selectedId);
    if (!targetChannel || chat.forwardMessages.length === 0) return;
    setSending(true);
    try {
      for (const msg of chat.forwardMessages) {
        await (targetChannel as any).sendMessage?.({
          text: msg.text || '',
          forwardedFrom: user?.firstName || user?.id || 'Unknown',
        });
      }
      chat.clearForwardMessages();
      chat.setShowForwardDialog(false);
    } catch (err) {
      console.error('Failed to forward messages:', err);
    } finally {
      setSending(false);
    }
  };

  if (!chat.showForwardDialog) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white dark:bg-[#2c2c2e] rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-xl'>
        <div className='p-4 border-b border-[#e5e5ea] dark:border-[#3a3a3c]'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg font-semibold text-[#000] dark:text-[#fff]'>
              Forward message
            </h3>
            <button
              onClick={() => { chat.setShowForwardDialog(false); chat.clearForwardMessages(); }}
              className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4f4f5] dark:hover:bg-[#3a3a3c] text-[#8e8e93]'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] pointer-events-none' />
            <input
              type='text'
              placeholder='Search chats...'
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              className='w-full h-10 pl-9 pr-3 bg-[#f4f4f5] dark:bg-[#2a2a3e] rounded-xl text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] outline-none'
              autoFocus
            />
          </div>
        </div>

        <div className='max-h-64 overflow-y-auto p-2'>
          {filtered.length === 0 ? (
            <div className='text-center py-8 text-sm text-[#8e8e93]'>
              {searchTarget ? 'No chats found' : 'No other chats available'}
            </div>
          ) : (
            filtered.map((ch: any) => {
              const cid = ch.cid;
              const name = ch.data?.name || 'Unknown';
              const isSelected = selectedId === cid;
              return (
                <button
                  key={cid}
                  onClick={() => setSelectedId(cid)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors ${
                    isSelected
                      ? 'bg-[#e8f4fd] dark:bg-[#2b5278]'
                      : 'hover:bg-[#f4f4f5] dark:hover:bg-[#2a2a3e]'
                  }`}
                >
                  <div className='w-10 h-10 rounded-full bg-[#2AABEE] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0'>
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <span className='flex-1 text-left truncate text-[#000] dark:text-[#fff] font-medium'>
                    {name}
                  </span>
                  {isSelected && (
                    <div className='w-5 h-5 rounded-full bg-[#2AABEE] flex items-center justify-center'>
                      <Check className='w-3 h-3 text-white' />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className='p-4 border-t border-[#e5e5ea] dark:border-[#3a3a3c] flex items-center justify-between'>
          <span className='text-sm text-[#8e8e93]'>
            {chat.forwardMessages.length} message{chat.forwardMessages.length !== 1 ? 's' : ''} selected
          </span>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => { chat.setShowForwardDialog(false); chat.clearForwardMessages(); }}
              className='px-4 py-2 text-sm text-[#8e8e93] hover:text-[#000] dark:hover:text-[#fff] transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleForward}
              disabled={!selectedId || sending}
              className='flex items-center gap-2 px-5 py-2 rounded-xl bg-[#2AABEE] hover:bg-[#1E96C8] text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Forward className='w-4 h-4' />
              {sending ? 'Forwarding...' : 'Forward'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
