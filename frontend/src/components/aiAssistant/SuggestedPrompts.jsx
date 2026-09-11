import { useState } from "react";
import { ChevronRight, RefreshCw } from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";

const ALL_PROMPTS = [
  "Explain binary search step by step",
  "Give me DSA questions on arrays",
  "Review my resume and suggest improvements",
  "Prepare me for a Java interview",
  "Explain this error in my code",
  "Create a 4-week study plan for placements",
  "What is the difference between BFS and DFS?",
  "How do I solve Two Sum optimally?",
  "Explain dynamic programming with an example",
  "How to approach system design interviews?",
  "What are the most important Java collections?",
  "How do I optimize my LinkedIn for placements?",
  "Explain recursion vs iteration with examples",
  "What questions are asked in FAANG HR rounds?",
  "How to prepare for aptitude tests in 2 weeks?",
  "What is the STAR method for behavioral interviews?",
  "Explain time and space complexity with examples",
  "How do I write a strong project description for my resume?",
];

function pickRandom(arr, n = 6, exclude = []) {
  const pool = arr.filter(p => !exclude.includes(p));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function SuggestedPrompts() {
  const { sendMessage } = useAIAssistant();
  const [prompts, setPrompts] = useState(() => pickRandom(ALL_PROMPTS));
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPrompts(prev => pickRandom(ALL_PROMPTS, 6, prev));
      setRefreshing(false);
    }, 300);
  };

  return (
    <div className="rounded-xl border border-bg-border/60 bg-bg-card/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Suggested Prompts
        </h3>
        <button
          onClick={refresh}
          title="Refresh suggestions"
          className={`text-text-muted hover:text-text transition-all ${refreshing ? "animate-spin" : ""}`}
        >
          <RefreshCw size={13} />
        </button>
      </div>

      <div className="space-y-1.5">
        {prompts.map(prompt => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-text-muted hover:text-text hover:bg-white/[0.04] border border-transparent hover:border-bg-border/40 transition-all group"
          >
            <span className="flex-1 leading-snug">{prompt}</span>
            <ChevronRight size={12} className="shrink-0 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
