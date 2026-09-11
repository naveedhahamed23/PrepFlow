import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, AlertCircle, RefreshCw } from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { useAuth } from "../../context/AuthContext";
import MarkdownMessage from "../ai/MarkdownMessage";
import TypingIndicator from "../ai/TypingIndicator";
import ChatComposer from "./ChatComposer";
import EmptyState from "./EmptyState";
import { cn } from "../../utils/cn";

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch { return ""; }
}

function AIAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-glow">
      <Bot size={14} className="text-white" />
    </div>
  );
}

function UserAvatar({ name }) {
  const initials = name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-xs font-bold text-white">
      {initials}
    </div>
  );
}

export default function ChatWorkspace() {
  const { activeConversation, isTyping, error, retryLastMessage, sendMessage } = useAIAssistant();
  const { user } = useAuth();
  const scrollRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const messages = activeConversation?.messages || [];

  // Auto-scroll when new messages arrive, but only if user is near bottom
  useEffect(() => {
    if (!autoScroll) return;
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, autoScroll]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setAutoScroll(isNearBottom);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full min-w-0">
      {/* Messages area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        {isEmpty ? (
          <EmptyState onPrompt={sendMessage} />
        ) : (
          <div className="px-4 py-5 space-y-5 max-w-full">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn("flex gap-3 min-w-0", msg.role === "user" && "flex-row-reverse")}
                >
                  {msg.role === "assistant" ? <AIAvatar /> : <UserAvatar name={user?.name} />}

                  <div className={cn("flex flex-col gap-1 max-w-[80%] min-w-0", msg.role === "user" && "items-end")}>
                    <div className={cn(
                      "rounded-2xl px-4 py-3 min-w-0",
                      msg.role === "assistant"
                        ? "bg-[#0d1a2e] border border-bg-border/60 text-text"
                        : "bg-gradient-to-r from-primary to-accent text-white"
                    )}>
                      {msg.role === "assistant"
                        ? <MarkdownMessage content={msg.content} />
                        : <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      }
                    </div>
                    {msg.timestamp && (
                      <span className="text-[10px] text-text-muted/60 px-1">{formatTime(msg.timestamp)}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <AIAvatar />
                <div className="rounded-2xl bg-[#0d1a2e] border border-bg-border/60 px-3">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <AIAvatar />
                <div className="rounded-2xl bg-danger/10 border border-danger/30 px-4 py-3 flex items-center gap-3">
                  <AlertCircle size={16} className="text-danger shrink-0" />
                  <p className="text-sm text-danger">{error}</p>
                  <button
                    onClick={retryLastMessage}
                    className="ml-auto flex items-center gap-1.5 text-xs text-danger border border-danger/30 rounded-lg px-2.5 py-1 hover:bg-danger/10 transition-colors"
                  >
                    <RefreshCw size={12} /> Retry
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <ChatComposer />
    </div>
  );
}
