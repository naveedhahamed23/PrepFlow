import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { TOPICS_LIST, COMPANIES_LIST } from "../../data/dsaProblemsData";

export default function EditProblemModal({ problem, open, onClose, onUpdateProblem }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const [company, setCompany] = useState("LeetCode");
  const [status, setStatus] = useState("Tracked");
  const [bookmarked, setBookmarked] = useState(false);
  const [revisionDueAt, setRevisionDueAt] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (problem) {
      setTitle(problem.title || "");
      setTopic(problem.topic || "Arrays");
      setDifficulty(problem.difficulty || "Easy");
      setCompany(problem.company || "LeetCode");
      setStatus(problem.status || "Tracked");
      setBookmarked(!!problem.bookmarked);
      setRevisionDueAt(problem.revisionDueAt || "");
      setNotes(problem.notes || "");
    }
  }, [problem, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!problem) return;

    await onUpdateProblem(problem.id, {
      title: title.trim(),
      topic,
      difficulty,
      company,
      status,
      bookmarked,
      revisionDueAt: revisionDueAt || null,
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Problem Details" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-white">
        <div>
          <label className="mb-1 block font-semibold text-text-muted">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block font-semibold text-text-muted">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {TOPICS_LIST.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {COMPANIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-semibold text-text-muted">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="Tracked">Tracked</option>
              <option value="Solved">Solved</option>
              <option value="Revision Pending">Revision Pending</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">Revision Due Date</label>
            <input
              type="date"
              value={revisionDueAt}
              onChange={(e) => setRevisionDueAt(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center pt-2">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-white">
            <input
              type="checkbox"
              checked={bookmarked}
              onChange={(e) => setBookmarked(e.target.checked)}
              className="rounded border-[#1E2D45] bg-[#070C16] text-blue-600 focus:ring-0"
            />
            <span>Bookmark Problem</span>
          </label>
        </div>

        <div>
          <label className="mb-1 block font-semibold text-text-muted">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose} className="text-text-muted">
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
