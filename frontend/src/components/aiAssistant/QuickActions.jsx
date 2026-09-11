import { useState } from "react";
import { BookOpen, Code2, FileText, Calendar, ChevronRight, ExternalLink } from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { cn } from "../../utils/cn";

const QUICK_ACTIONS = [
  {
    id: "explain",
    label: "Explain a Concept",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    prompt: "Explain a core DSA concept to me. What topic should we cover?",
  },
  {
    id: "code",
    label: "Review My Code",
    icon: Code2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    prompt: "__CODE_MODE__",
  },
  {
    id: "resume",
    label: "Analyze My Resume",
    icon: FileText,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    prompt: "Please analyze my resume for placement season. I'll share my resume details.",
  },
  {
    id: "study",
    label: "Generate Study Plan",
    icon: Calendar,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    prompt: "Generate a personalized study plan for placement preparation. I'm targeting product companies.",
  },
];

export default function QuickActions({ onTriggerCodeMode }) {
  const { sendMessage } = useAIAssistant();
  const [clicked, setClicked] = useState(null);

  const handleAction = (action) => {
    setClicked(action.id);
    setTimeout(() => setClicked(null), 600);

    if (action.prompt === "__CODE_MODE__") {
      onTriggerCodeMode?.();
      return;
    }
    sendMessage(action.prompt);
  };

  return (
    <div className="rounded-xl border border-bg-border/60 bg-bg-card/60 p-4">
      <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map(action => {
          const Icon = action.icon;
          const isClicked = clicked === action.id;
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all hover:scale-[1.02] active:scale-95",
                action.bg,
                isClicked && "scale-95 opacity-80"
              )}
            >
              <Icon size={18} className={action.color} />
              <span className="text-[11px] font-medium text-text leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
