import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Plus, Trash2, Check, Clock } from "lucide-react";
import { CATEGORIES } from "../../data/studyPlannerData";

export default function DeadlinesModal({
  open,
  onClose,
  deadlines = [],
  onAddDeadline,
  onToggleDeadlineComplete,
  onDeleteDeadline,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DSA");
  const [daysLeft, setDaysLeft] = useState(5);
  const [dueDate, setDueDate] = useState("2026-09-16");

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddDeadline({
      title: title.trim(),
      category,
      daysLeft: Number(daysLeft),
      dueDate,
    });

    setTitle("");
    setDaysLeft(5);
    setIsAdding(false);
  };

  return (
    <Modal open={open} onClose={onClose} title="Upcoming Deadlines" size="md">
      <div className="space-y-4 text-xs">
        {isAdding ? (
          <form onSubmit={handleSave} className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-4 space-y-3">
            <h4 className="font-bold text-white text-xs">Add New Deadline</h4>
            <div>
              <label className="mb-1 block font-semibold text-text-muted">Deadline Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete Dynamic Programming Sheet"
                className="w-full rounded-lg border border-[#1E2D45] bg-[#0D1424] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block font-semibold text-text-muted">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-[#1E2D45] bg-[#0D1424] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  {Object.keys(CATEGORIES).map((c) => (
                    <option key={c} value={c}>
                      {CATEGORIES[c].label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-semibold text-text-muted">Days Left</label>
                <input
                  type="number"
                  min="1"
                  value={daysLeft}
                  onChange={(e) => setDaysLeft(e.target.value)}
                  className="w-full rounded-lg border border-[#1E2D45] bg-[#0D1424] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-text-muted">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                Save Deadline
              </Button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#1E2D45] py-2.5 font-semibold text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            <Plus size={15} />
            <span>Add Deadline</span>
          </button>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {deadlines.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between rounded-xl border border-[#1E2D45] bg-[#0D1424] p-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => onToggleDeadlineComplete(d.id)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    d.completed
                      ? "bg-emerald-500 border-emerald-500 text-black font-bold"
                      : "border-text-muted/40 hover:border-emerald-400"
                  }`}
                >
                  {d.completed && <Check size={12} strokeWidth={3} />}
                </button>
                <div className="min-w-0">
                  <p className={`font-semibold truncate ${d.completed ? "line-through text-text-muted" : "text-white"}`}>
                    {d.title}
                  </p>
                  <span className="text-[11px] text-text-muted">{d.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-rose-400">{d.daysLeft} days left</span>
                <button onClick={() => onDeleteDeadline(d.id)} className="text-text-muted hover:text-rose-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
