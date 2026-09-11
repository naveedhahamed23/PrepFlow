import { useState } from "react";
import { Lightbulb, RefreshCw } from "lucide-react";
import { STUDY_TIPS } from "../../data/studyPlannerData";

export default function StudyTipCard() {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % STUDY_TIPS.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Lightbulb size={16} />
          </div>
          <h3 className="text-xs font-bold text-white">Study Tip</h3>
          <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
            New
          </span>
        </div>

        <button
          onClick={handleNextTip}
          className="text-text-muted hover:text-white transition-colors"
          title="Next Tip"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      <p className="mt-3 text-xs italic text-text-muted leading-relaxed">
        &ldquo;{STUDY_TIPS[tipIndex]}&rdquo;
      </p>
    </div>
  );
}
