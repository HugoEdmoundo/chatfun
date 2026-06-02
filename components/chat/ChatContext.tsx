'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { MessageResponse } from 'stream-chat';

interface ForwardTarget {
  id: string;
  name: string;
  image?: string;
}

interface ChatContextValue {
  editingMessage: MessageResponse | null;
  setEditingMessage: (msg: MessageResponse | null) => void;
  multiSelectMode: boolean;
  selectedMessages: Set<string>;
  toggleSelectMessage: (id: string) => void;
  exitMultiSelect: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  pinnedMessageIds: Set<string>;
  setPinnedMessageIds: (ids: Set<string>) => void;
  forwardMessages: MessageResponse[];
  addForwardMessage: (msg: MessageResponse) => void;
  removeForwardMessage: (id: string) => void;
  clearForwardMessages: () => void;
  showForwardDialog: boolean;
  setShowForwardDialog: (v: boolean) => void;
  forwardTargets: ForwardTarget[];
  setForwardTargets: (targets: ForwardTarget[]) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (v: boolean) => void;
  deleteTarget: MessageResponse | null;
  setDeleteTarget: (msg: MessageResponse | null) => void;
}

const ChatCtx = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [editingMessage, setEditingMessage] = useState<MessageResponse | null>(null);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [pinnedMessageIds, setPinnedMessageIds] = useState<Set<string>>(new Set());
  const [forwardMessages, setForwardMessages] = useState<MessageResponse[]>([]);
  const [showForwardDialog, setShowForwardDialog] = useState(false);
  const [forwardTargets, setForwardTargets] = useState<ForwardTarget[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MessageResponse | null>(null);

  const toggleSelectMessage = useCallback((id: string) => {
    setSelectedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (next.size === 0) setMultiSelectMode(false);
      return next;
    });
  }, []);

  const exitMultiSelect = useCallback(() => {
    setSelectedMessages(new Set());
    setMultiSelectMode(false);
  }, []);

  const enterMultiSelect = useCallback((msg: MessageResponse) => {
    setSelectedMessages(new Set([msg.id]));
    setMultiSelectMode(true);
  }, []);

  const addForwardMessage = useCallback((msg: MessageResponse) => {
    setForwardMessages((prev) => [...prev, msg]);
  }, []);

  const removeForwardMessage = useCallback((id: string) => {
    setForwardMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const clearForwardMessages = useCallback(() => {
    setForwardMessages([]);
  }, []);

  const value: ChatContextValue = {
    editingMessage,
    setEditingMessage,
    multiSelectMode,
    selectedMessages,
    toggleSelectMessage,
    exitMultiSelect,
    searchQuery,
    setSearchQuery,
    showSearch,
    setShowSearch,
    pinnedMessageIds,
    setPinnedMessageIds,
    forwardMessages,
    addForwardMessage,
    removeForwardMessage,
    clearForwardMessages,
    showForwardDialog,
    setShowForwardDialog,
    forwardTargets,
    setForwardTargets,
    showDeleteDialog,
    setShowDeleteDialog,
    deleteTarget,
    setDeleteTarget,
  };

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
