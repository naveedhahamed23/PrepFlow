import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { TOPIC_PERFORMANCE_DATA } from "../../data/analyticsData";

export default function DetailedTopicModal({ open, onClose, category = "DSA", onNavigateToCategory }) {
  const topics = TOPIC_PERFORMANCE_DATA[category] || TOPIC_PERFORMANCE_DATA.DSA;

  return (
    <Modal open={open} onClose={onClose} title={`${category} Topic Analysis`} size="md">
      <div className="space-y-4 text-xs text-text">
        <p className="text-text-muted">
          Comprehensive breakdown of your performance, accuracy, and confidence across {category} topics.
        </p>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {topics.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between rounded-xl border border-[#1E2D45] bg-[#070C16] p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs"
                  style={{
                    backgroundColor: `${t.color}20`,
                    color: t.color,
                  }}
                >
                  {t.score}%
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{t.name}</h4>
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: t.color }}
                  >
                    {t.status} Topic
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  if (onNavigateToCategory) onNavigateToCategory(category);
                }}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Practice Topic <ArrowRight size={13} className="ml-1 inline" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
