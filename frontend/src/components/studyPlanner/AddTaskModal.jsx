import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CATEGORIES } from "../../data/studyPlannerData";

export default function AddTaskModal({
  open,
  onClose,
  onSaveTask,
  editingTask = null,
  initialDate = "2026-09-11",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(initialDate);
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState("1h");
  const [category, setCategory] = useState("DSA");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setDate(editingTask.date || initialDate);
      setStartTime(editingTask.startTime || "09:00");
      setDuration(editingTask.duration || "1h");
      setCategory(editingTask.category || "DSA");
      setPriority(editingTask.priority || "Medium");
    } else {
      setTitle("");
      setDescription("");
      setDate(initialDate);
      setStartTime("09:00");
      setDuration("1h");
      setCategory("DSA");
      setPriority("Medium");
    }
  }, [editingTask, initialDate, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveTask({
      id: editingTask?.id,
      title: title.trim(),
      description: description.trim(),
      date,
      startTime,
      duration,
      category,
      priority,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingTask ? "Edit Task" : "Add New Task"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-text">
        {/* Title */}
        <div>
          <label className="mb-1 block font-semibold text-text-muted">
            Task Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. DSA – Arrays Practice"
            className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white placeholder-text-muted focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block font-semibold text-text-muted">
            Description / Notes
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Solve 5 medium problems on LeetCode"
            className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white placeholder-text-muted focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Date & Start Time & Duration */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block font-semibold text-text-muted">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">
              Start Time
            </label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="09:00"
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="15m">15 mins</option>
              <option value="30m">30 mins</option>
              <option value="45m">45 mins</option>
              <option value="1h">1 hour</option>
              <option value="1h 30m">1.5 hours</option>
              <option value="2h">2 hours</option>
              <option value="3h">3 hours</option>
            </select>
          </div>
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-semibold text-text-muted">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {Object.keys(CATEGORIES).map((catKey) => (
                <option key={catKey} value={catKey}>
                  {CATEGORIES[catKey].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-text-muted hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5"
          >
            {editingTask ? "Update Task" : "Save Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
