'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { MessageResponse } from 'stream-chat';

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
  showDeleteDialog: boolean;
  setShowDeleteDialog: (v: boolean) => void;
  deleteTarget: MessageResponse | null;
  setDeleteTarget: (msg: MessageResponse | null) => void;
  deleteTargetIds: string[];
  setDeleteTargetIds: (ids: string[]) => void;
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MessageResponse | null>(null);
  const [deleteTargetIds, setDeleteTargetIds] = useState<string[]>([]);

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
    pinnedMessageIds: new Set(pinnedMessageIds),
    setPinnedMessageIds,
    forwardMessages,
    addForwardMessage,
    removeForwardMessage,
    clearForwardMessages,
    showForwardDialog,
    setShowForwardDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    deleteTarget,
    setDeleteTarget,
    deleteTargetIds,
    setDeleteTargetIds,
  };

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
