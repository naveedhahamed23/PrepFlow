import { Bot, Sparkles } from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";

const QUICK_PROMPTS = [
  { label: "Explain a DSA concept", prompt: "Can you explain dynamic programming with a simple example?" },
  { label: "Review my code", prompt: "I'd like you to review my code. Please help me identify bugs and improvements." },
  { label: "Analyze my resume", prompt: "Please help me improve my resume for placement season." },
  { label: "Prepare me for an interview", prompt: "Help me prepare for a technical interview at a product company." },
  { label: "Create my study plan", prompt: "Create a 4-week study plan for campus placements starting from today." },
];

export default function EmptyState({ onPrompt }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      {/* Avatar glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
          <Bot size={28} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
          <Sparkles size={10} className="text-white" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-text mb-1">PrepFlow AI</h2>
      <p className="text-sm text-text-muted mb-8 max-w-xs">
        How can I help you prepare today?
      </p>

      {/* Quick action prompts */}
      <div className="w-full max-w-sm space-y-2">
        {QUICK_PROMPTS.map(({ label, prompt }) => (
          <button
            key={label}
            onClick={() => onPrompt(prompt)}
            className="w-full flex items-center gap-3 rounded-xl border border-bg-border/60 bg-white/[0.02] px-4 py-3 text-left text-sm text-text-muted hover:text-text hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <span className="flex-1">{label}</span>
            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
