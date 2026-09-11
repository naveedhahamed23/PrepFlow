import { useState } from "react";
import { Plus, MessageSquare, Search, MoreHorizontal, Pencil, Trash2, Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { cn } from "../../utils/cn";

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function ChatSidebar({ className }) {
  const { conversations, activeId, newChat, selectConversation, renameConversation, deleteConversation } = useAIAssistant();
  const [search, setSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.messages.some(m => m.content?.toLowerCase().includes(search.toLowerCase()))
  );

  const startRename = (c) => {
    setRenamingId(c.id);
    setRenameValue(c.title);
    setMenuOpenId(null);
  };

  const commitRename = () => {
    if (renameValue.trim()) renameConversation(renamingId, renameValue.trim());
    setRenamingId(null);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(null);
    setMenuOpenId(null);
    deleteConversation(id);
  };

  return (
    <div className={cn("flex flex-col h-full min-w-0", className)}>
      {/* New Chat button */}
      <div className="p-3 border-b border-bg-border/60">
        <button
          onClick={newChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-bg-border/60 bg-black/20 px-3 py-1.5">
          <Search size={13} className="text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-text placeholder:text-text-muted focus:outline-none min-w-0"
          />
          {search && <button onClick={() => setSearch("")}><X size={12} className="text-text-muted hover:text-text" /></button>}
        </div>
      </div>

      {/* Label */}
      <div className="px-4 pb-1">
        <p className="text-[10px] font-semibold text-text-muted/60 uppercase tracking-wider">Recent Chats</p>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-text-muted">No conversations found.</div>
        )}
        <AnimatePresence>
          {filtered.map(c => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className={cn(
                "group relative rounded-xl px-3 py-2.5 cursor-pointer transition-colors",
                c.id === activeId
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-white/[0.04] border border-transparent"
              )}
              onClick={() => {
                if (renamingId !== c.id && confirmDeleteId !== c.id) {
                  selectConversation(c.id);
                  setMenuOpenId(null);
                }
              }}
            >
              {renamingId === c.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={e => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setRenamingId(null); }}
                  onClick={e => e.stopPropagation()}
                  className="w-full bg-transparent border-b border-primary text-xs text-text focus:outline-none"
                />
              ) : (
                <div className="flex items-start gap-2 min-w-0">
                  <MessageSquare size={13} className={cn("shrink-0 mt-0.5", c.id === activeId ? "text-primary" : "text-text-muted")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text truncate leading-5">{c.title}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{timeAgo(c.updatedAt)}</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setMenuOpenId(menuOpenId === c.id ? null : c.id); }}
                    className="shrink-0 opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 transition-all"
                  >
                    <MoreHorizontal size={13} className="text-text-muted" />
                  </button>
                </div>
              )}

              {/* Context menu */}
              {menuOpenId === c.id && (
                <div
                  onClick={e => e.stopPropagation()}
                  className="absolute right-1 top-8 z-20 w-36 rounded-lg border border-bg-border bg-[#0d1424] shadow-xl py-1"
                >
                  <button
                    onClick={() => startRename(c)}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-text hover:bg-white/5"
                  >
                    <Pencil size={12} /> Rename
                  </button>
                  <button
                    onClick={() => { setConfirmDeleteId(c.id); setMenuOpenId(null); }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-danger hover:bg-white/5"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              )}

              {/* Delete confirmation */}
              {confirmDeleteId === c.id && (
                <div
                  onClick={e => e.stopPropagation()}
                  className="absolute inset-x-1 top-0 z-20 rounded-xl border border-danger/30 bg-[#0d1424] p-3 shadow-xl"
                >
                  <p className="text-[11px] text-text mb-2">Delete this conversation?</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(c.id)} className="flex-1 rounded-lg bg-danger py-1 text-[11px] text-white font-medium">Delete</button>
                    <button onClick={() => setConfirmDeleteId(null)} className="flex-1 rounded-lg border border-bg-border py-1 text-[11px] text-text-muted">Cancel</button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom branding */}
      <div className="p-3 border-t border-bg-border/40">
        <div className="flex items-center gap-2 rounded-xl bg-black/20 p-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <Bot size={14} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-text truncate">Your AI study buddy</p>
            <p className="text-[10px] text-text-muted">Always here to help.</p>
          </div>
        </div>
        <p className="text-[10px] text-text-muted/50 text-center mt-2 italic">"Ask. Learn. Improve."</p>
      </div>
    </div>
  );
}
