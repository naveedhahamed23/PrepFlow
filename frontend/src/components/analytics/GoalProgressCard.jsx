import { motion } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoalProgressCard({ goals = [] }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Goal Progress</h3>
          <button
            onClick={() => navigate("/app/planner")}
            className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        </div>
        <p className="text-xs text-text-muted">Track your goals and milestones</p>

        <div className="mt-4 space-y-3.5">
          {goals.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white truncate pr-2">
                  {item.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-text-muted text-[11px]">
                    {item.current} / {item.target}
                  </span>
                  <span className="font-bold text-white w-7 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
