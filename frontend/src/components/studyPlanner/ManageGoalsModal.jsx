import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Plus, Trash2, Edit2, Check } from "lucide-react";
import { CATEGORIES } from "../../data/studyPlannerData";

export default function ManageGoalsModal({
  open,
  onClose,
  goals = [],
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(5);
  const [unit, setUnit] = useState("problems");
  const [category, setCategory] = useState("DSA");

  const resetForm = () => {
    setTitle("");
    setTarget(5);
    setUnit("problems");
    setCategory("DSA");
    setIsAdding(false);
    setEditingGoalId(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingGoalId) {
      onUpdateGoal(editingGoalId, {
        title: title.trim(),
        target: Number(target),
        unit,
        category,
      });
    } else {
      onAddGoal({
        title: title.trim(),
        target: Number(target),
        current: 0,
        unit,
        category,
      });
    }
    resetForm();
  };

  const handleStartEdit = (goal) => {
    setTitle(goal.title);
    setTarget(goal.target);
    setUnit(goal.unit || "items");
    setCategory(goal.category || "DSA");
    setEditingGoalId(goal.id);
    setIsAdding(true);
  };

  return (
    <Modal open={open} onClose={onClose} title="Manage Today's Goals" size="md">
      <div className="space-y-4 text-xs">
        {/* Goal Form */}
        {isAdding ? (
          <form onSubmit={handleSave} className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-4 space-y-3">
            <h4 className="font-bold text-white text-xs">
              {editingGoalId ? "Edit Goal" : "Create New Goal"}
            </h4>
            <div>
              <label className="mb-1 block font-semibold text-text-muted">Goal Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Solve 5 DSA problems"
                className="w-full rounded-lg border border-[#1E2D45] bg-[#0D1424] px-3 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block font-semibold text-text-muted">Target Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-lg border border-[#1E2D45] bg-[#0D1424] px-3 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block font-semibold text-text-muted">Unit</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. problems, hours, tests"
                  className="w-full rounded-lg border border-[#1E2D45] bg-[#0D1424] px-3 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={resetForm} className="text-text-muted">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                Save Goal
              </Button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#1E2D45] py-2.5 font-semibold text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            <Plus size={15} />
            <span>Create Goal</span>
          </button>
        )}

        {/* Existing Goals List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pt-2">
          {goals.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between rounded-xl border border-[#1E2D45] bg-[#0D1424] p-3"
            >
              <div>
                <span className="font-semibold text-white">{g.title}</span>
                <span className="ml-2 text-text-muted text-[11px]">
                  ({g.current} / {g.target} {g.unit})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(g)}
                  className="text-text-muted hover:text-white"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => onDeleteGoal(g.id)}
                  className="text-rose-400 hover:text-rose-300"
                >
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
