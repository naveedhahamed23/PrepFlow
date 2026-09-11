import { Layers, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TopicsView({ topicStats = [], onSelectTopic }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">DSA Topics Preparation</h2>
          <p className="text-xs text-text-muted">Master DSA domain by domain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicStats.map((item) => (
          <div
            key={item.topic}
            onClick={() => onSelectTopic(item.topic)}
            className="group cursor-pointer rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm transition-all hover:border-blue-500/50 hover:bg-[#111A2E]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Layers size={18} />
                </div>
                <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                  {item.topic}
                </h3>
              </div>

              <span className="text-xs font-bold text-blue-400">
                {item.percentage}%
              </span>
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-text-muted">
                <span>Solved Progress</span>
                <span className="font-semibold text-white">
                  {item.solved} / {item.total}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-xs font-semibold text-blue-400">
              <span>View Problems</span>
              <ArrowRight size={13} className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
