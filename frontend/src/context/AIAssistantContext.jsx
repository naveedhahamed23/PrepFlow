// ============================================================
// AIAssistantContext.jsx
// Manages conversations, messages, and persistence (localStorage).
// Replace localStorage with backend API calls when Spring Boot is ready.
// ============================================================

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import aiAssistantService from "../services/aiAssistantService";

const STORAGE_KEY = "prepflow_ai_conversations";
const ACTIVE_KEY = "prepflow_ai_active";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(conversations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch { /* quota exceeded */ }
}

const DEFAULT_CONVERSATIONS = [
  {
    id: "c1",
    title: "Explain dynamic programming",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    messages: [
      { id: "m1", role: "user", content: "Can you explain dynamic programming with an example?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    ],
  },
  {
    id: "c2",
    title: "Resume review suggestions",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    messages: [],
  },
  {
    id: "c3",
    title: "Binary search intuition",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    messages: [],
  },
  {
    id: "c4",
    title: "System design basics",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 76).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 76).toISOString(),
    messages: [],
  },
  {
    id: "c5",
    title: "Behavioral interview questions",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    messages: [],
  },
  {
    id: "c6",
    title: "Best resources for DSA",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 124).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 124).toISOString(),
    messages: [],
  },
  {
    id: "c7",
    title: "Time complexity doubt",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 148).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 148).toISOString(),
    messages: [],
  },
];

const AIAssistantContext = createContext(null);

export function AIAssistantProvider({ children }) {
  const [conversations, setConversations] = useState(() => {
    return loadFromStorage() || DEFAULT_CONVERSATIONS;
  });
  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem(ACTIVE_KEY) || "c1";
  });
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Persist to localStorage whenever conversations change
  useEffect(() => {
    saveToStorage(conversations);
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_KEY, activeId);
  }, [activeId]);

  const activeConversation = conversations.find(c => c.id === activeId) || conversations[0];

  // ---- Conversation actions ----

  const newChat = useCallback(() => {
    const id = generateId();
    const conv = {
      id,
      title: "New conversation",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    setConversations(prev => [conv, ...prev]);
    setActiveId(id);
    setTimeout(() => inputRef.current?.focus(), 100);
    return id;
  }, []);

  const selectConversation = useCallback((id) => {
    setActiveId(id);
    setError(null);
  }, []);

  const renameConversation = useCallback((id, newTitle) => {
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, title: newTitle } : c)
    );
  }, []);

  const deleteConversation = useCallback((id) => {
    setConversations(prev => {
      const next = prev.filter(c => c.id !== id);
      if (activeId === id) {
        setActiveId(next[0]?.id || null);
      }
      return next.length ? next : DEFAULT_CONVERSATIONS;
    });
  }, [activeId]);

  // ---- Messaging ----

  const sendMessage = useCallback(async (content, context = {}) => {
    if (!content.trim()) return;
    setError(null);

    const userMsg = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Optimistically add user message; auto-title if first message
    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      const isFirst = c.messages.length === 0;
      return {
        ...c,
        title: isFirst ? content.slice(0, 50) : c.title,
        updatedAt: new Date().toISOString(),
        messages: [...c.messages, userMsg],
      };
    }));

    setIsTyping(true);
    try {
      const { data } = await aiAssistantService.sendMessage(content, activeId, context);
      const aiMsg = {
        id: generateId(),
        role: "assistant",
        content: data.content,
        timestamp: new Date().toISOString(),
      };
      setConversations(prev => prev.map(c =>
        c.id === activeId
          ? { ...c, updatedAt: new Date().toISOString(), messages: [...c.messages, aiMsg] }
          : c
      ));
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [activeId]);

  const sendCodeReview = useCallback(async (code, language, problem) => {
    const userContent = `Review my ${language} code:\n\`\`\`${language}\n${code}\n\`\`\`${problem ? `\n\nContext: ${problem}` : ""}`;
    const userMsg = {
      id: generateId(), role: "user", content: userContent, timestamp: new Date().toISOString(),
    };
    setConversations(prev => prev.map(c =>
      c.id === activeId ? { ...c, updatedAt: new Date().toISOString(), messages: [...c.messages, userMsg] } : c
    ));
    setIsTyping(true);
    try {
      const { data } = await aiAssistantService.reviewCode(code, language, problem);
      const aiMsg = { id: generateId(), role: "assistant", content: data.content, timestamp: new Date().toISOString() };
      setConversations(prev => prev.map(c =>
        c.id === activeId ? { ...c, messages: [...c.messages, aiMsg] } : c
      ));
    } catch {
      setError("Code review failed. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [activeId]);

  const retryLastMessage = useCallback(() => {
    if (!activeConversation) return;
    const msgs = activeConversation.messages;
    const lastUser = [...msgs].reverse().find(m => m.role === "user");
    if (!lastUser) return;
    setError(null);
    // Remove last AI error placeholder if any, then resend
    sendMessage(lastUser.content);
  }, [activeConversation, sendMessage]);

  return (
    <AIAssistantContext.Provider value={{
      conversations,
      activeId,
      activeConversation,
      isTyping,
      error,
      inputRef,
      newChat,
      selectConversation,
      renameConversation,
      deleteConversation,
      sendMessage,
      sendCodeReview,
      retryLastMessage,
      clearError: () => setError(null),
    }}>
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const ctx = useContext(AIAssistantContext);
  if (!ctx) throw new Error("useAIAssistant must be used within AIAssistantProvider");
  return ctx;
}
