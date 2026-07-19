import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Bot, User, Plus, MessageSquare, Trash2 } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import MarkdownMessage from "../components/ai/MarkdownMessage";
import TypingIndicator from "../components/ai/TypingIndicator";
import { useAuth } from "../context/AuthContext";
import aiAssistantService from "../services/aiAssistantService";
import { cn } from "../utils/cn";

const suggestedPrompts = [
  "Explain the sliding window technique with an example",
  "Review my approach to Two Sum",
  "How should I answer 'Tell me about yourself'?",
  "Give me a `Java` snippet for BFS on a graph",
];

const conversationHistory = [
  { id: "c1", title: "Sliding window explained" },
  { id: "c2", title: "System design basics" },
  { id: "c3", title: "Resume bullet points review" },
  { id: "c4", title: "HR round prep tips" },
];

export default function AIAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm your PrepFlow assistant. Ask me about DSA, aptitude, resumes, or interview prep — I'm happy to help." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text) => {
    const content = text ?? input;
    if (!content.trim()) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setTyping(true);
    try {
      const { data } = await aiAssistantService.sendMessage(content);
      setMessages((m) => [...m, data]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar history */}
      <div className={cn("hidden w-64 shrink-0 flex-col rounded-2xl border border-bg-border bg-bg-card lg:flex")}>
        <div className="border-b border-bg-border p-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-2.5 text-sm font-semibold text-white">
            <Plus size={15} /> New Chat
          </button>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-2">
          {conversationHistory.map((c) => (
            <button
              key={c.id}
              className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-text-muted hover:bg-white/5 hover:text-text"
            >
              <MessageSquare size={14} className="shrink-0" />
              <span className="flex-1 truncate">{c.title}</span>
              <Trash2 size={13} className="shrink-0 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col rounded-2xl border border-bg-border bg-bg-card">
        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              {m.role === "assistant" ? (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <Bot size={15} className="text-white" />
                </div>
              ) : (
                <Avatar src={user?.avatar} name={user?.name} size="sm" />
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  m.role === "assistant" ? "bg-bg-hover text-text" : "bg-gradient-to-r from-primary to-accent text-white"
                )}
              >
                <MarkdownMessage content={m.content} />
              </div>
            </motion.div>
          ))}

          {typing && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Bot size={15} className="text-white" />
              </div>
              <div className="rounded-2xl bg-bg-hover px-2">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full border border-bg-border px-3.5 py-1.5 text-xs text-text-muted hover:border-primary/40 hover:text-primary"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-bg-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask PrepFlow AI anything..."
              className="max-h-32 flex-1 resize-none rounded-xl border border-bg-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-glow disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
