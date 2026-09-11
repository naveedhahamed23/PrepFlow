import {
  TrendingUp,
  TrendingDown,
  Info,
  Sparkles,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ICON_MAP = {
  TrendingUp: { icon: TrendingUp, bg: "bg-emerald-500/10", text: "text-emerald-400" },
  TrendingDown: { icon: TrendingDown, bg: "bg-rose-500/10", text: "text-rose-400" },
  Info: { icon: Info, bg: "bg-blue-500/10", text: "text-blue-400" },
  Sparkles: { icon: Sparkles, bg: "bg-purple-500/10", text: "text-purple-400" },
  Lightbulb: { icon: Lightbulb, bg: "bg-amber-500/10", text: "text-amber-400" },
};

export default function AIInsightsCard({ insights = [] }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Insights from AI</h3>
        <span className="flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
          <Sparkles size={11} /> AI Powered
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {insights.map((item) => {
          const cfg = ICON_MAP[item.icon] || ICON_MAP.Info;
          const IconComp = cfg.icon;

          return (
            <div
              key={item.id}
              onClick={() => item.actionRoute && navigate(item.actionRoute)}
              className="group flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-[#1E2D45] bg-[#070C16]/60 p-3 transition-all hover:border-blue-500/40 hover:bg-[#111A2E]"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.text}`}
                >
                  <IconComp size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-xs truncate group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={16}
                className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-white mt-1"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
