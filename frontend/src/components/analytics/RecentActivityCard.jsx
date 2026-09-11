import { Code, Calculator, Mic, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";

const ICON_MAP = {
  Code: { icon: Code, bg: "bg-blue-500/10", text: "text-blue-400" },
  Calculator: { icon: Calculator, bg: "bg-amber-500/10", text: "text-amber-400" },
  Mic: { icon: Mic, bg: "bg-pink-500/10", text: "text-pink-400" },
  FileText: { icon: FileText, bg: "bg-purple-500/10", text: "text-purple-400" },
};

export default function RecentActivityCard({ activities = [] }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Activity</h3>
          <button
            onClick={() => navigate("/app/dsa")}
            className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        </div>
        <p className="text-xs text-text-muted">Your latest preparation activity</p>

        <div className="mt-4 space-y-3">
          {activities.map((item) => {
            const cfg = ICON_MAP[item.iconType] || ICON_MAP.Code;
            const IconComp = cfg.icon;

            return (
              <div
                key={item.id}
                onClick={() => item.route && navigate(item.route)}
                className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#1E2D45] bg-[#070C16]/60 p-2.5 transition-all hover:bg-[#111A2E]"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.text}`}
                  >
                    <IconComp size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-xs truncate group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                      <span className="truncate">{item.subtitle}</span>
                      <span>•</span>
                      <span className="shrink-0">{item.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <Badge variant={item.badgeVariant || "default"} className="shrink-0 text-[10px]">
                  {item.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
