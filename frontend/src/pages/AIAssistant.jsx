import { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { AIAssistantProvider } from "../context/AIAssistantContext";
import ChatSidebar from "../components/aiAssistant/ChatSidebar";
import ChatWorkspace from "../components/aiAssistant/ChatWorkspace";
import QuickActions from "../components/aiAssistant/QuickActions";
import SuggestedPrompts from "../components/aiAssistant/SuggestedPrompts";
import UpgradeCard from "../components/aiAssistant/UpgradeCard";

function AIAssistantInner() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] min-w-0 -mt-1">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-3 gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-text">PrepFlow AI</h1>
            <span className="flex items-center gap-1.5 rounded-full bg-success/15 border border-success/30 px-2.5 py-0.5 text-[11px] font-medium text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Online
            </span>
          </div>
          <p className="mt-1 text-sm text-text-muted">
            Your personal AI mentor for DSA, aptitude, interviews, and more.
          </p>
        </div>

        <div className="flex items-start gap-3">
          {/* Toggle panel buttons — mobile */}
          <div className="flex gap-1 lg:hidden">
            <button
              onClick={() => setLeftOpen(o => !o)}
              className="p-2 rounded-lg border border-bg-border/60 text-text-muted hover:text-text"
              title="Toggle recent chats"
            >
              {leftOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
            </button>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
              <Sparkles size={13} className="text-primary" />
              Powered by advanced AI
            </div>
            <p className="text-[11px] text-text-muted mt-0.5">
              Get instant, accurate and detailed solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Three-column workspace */}
      <div className="flex flex-1 gap-3 min-h-0 min-w-0 overflow-hidden">

        {/* LEFT — Recent Chats */}
        <div className={`
          flex-col rounded-xl border border-bg-border/60 bg-[#070c16] overflow-hidden transition-all duration-200
          ${leftOpen ? "flex w-60 shrink-0" : "hidden"}
          lg:flex lg:w-60 lg:shrink-0
        `}>
          <ChatSidebar className="h-full" />
        </div>

        {/* CENTER — Chat workspace */}
        <div className="flex-1 flex flex-col rounded-xl border border-bg-border/60 bg-[#070c16] overflow-hidden min-w-0">
          <ChatWorkspace />
        </div>

        {/* RIGHT — Tools */}
        <div className={`
          flex-col gap-3 w-64 shrink-0 overflow-y-auto custom-scrollbar
          ${rightOpen ? "flex" : "hidden"}
          xl:flex xl:w-64 xl:shrink-0
        `}>
          <QuickActions />
          <SuggestedPrompts />
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  return (
    <AIAssistantProvider>
      <AIAssistantInner />
    </AIAssistantProvider>
  );
}
