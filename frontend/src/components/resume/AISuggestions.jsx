import { Sparkles, Search, Edit3, Wrench } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const iconMap = {
  Sparkles: Sparkles,
  Search: Search,
  Edit3: Edit3,
  Wrench: Wrench
};

const colorMap = {
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    buttonVariant: "primary"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    buttonVariant: "primary" // They all use primary blue buttons in reference
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    buttonVariant: "primary"
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
    buttonVariant: "primary"
  }
};

export function AISuggestions({ suggestions, onApplySuggestion }) {
  if (!suggestions?.length) return null;

  return (
    <Card className="mb-6 p-4">
      {/* Inner tabs for suggestions */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/20 text-primary border border-primary/30 shrink-0">
          AI Suggestions
        </button>
        <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-bg-card border border-bg-border/60 text-text-muted hover:text-text shrink-0">
          Missing Keywords
        </button>
        <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-bg-card border border-bg-border/60 text-text-muted hover:text-text shrink-0">
          Role Match
        </button>
        <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-bg-card border border-bg-border/60 text-text-muted hover:text-text shrink-0">
          Improvement Tips
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestions.map((item) => {
          const Icon = iconMap[item.icon] || Sparkles;
          const style = colorMap[item.color] || colorMap.blue;

          return (
            <div key={item.id} className="flex flex-col h-full rounded-xl border border-bg-border/60 p-4 bg-bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${style.bg} ${style.border}`}>
                  <Icon size={12} className={style.text} />
                </div>
                <h4 className="text-xs font-semibold text-text line-clamp-1">{item.title}</h4>
              </div>
              <p className="text-[11px] text-text-muted mb-4 flex-1">{item.description}</p>
              <Button size="sm" className="w-full text-[11px] py-1.5 h-auto" onClick={() => onApplySuggestion(item)}>
                {item.action}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
