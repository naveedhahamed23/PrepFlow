import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { TOPICS_LIST, COMPANIES_LIST } from "../../data/dsaProblemsData";

export default function AddProblemModal({ open, onClose, onAddProblem }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("leetcode");
  const [externalProblemId, setExternalProblemId] = useState("");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const [company, setCompany] = useState("LeetCode");
  const [status, setStatus] = useState("Tracked");
  const [bookmarked, setBookmarked] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Problem title is required.");
      return;
    }

    try {
      await onAddProblem({
        title: title.trim(),
        platform,
        externalProblemId: externalProblemId.trim() || String(Date.now()),
        topic,
        difficulty,
        company,
        status,
        bookmarked,
        notes: notes.trim(),
      });

      setTitle("");
      setExternalProblemId("");
      setNotes("");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add problem.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New DSA Problem" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-rose-300 font-semibold">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1 block font-semibold text-text-muted">Problem Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Two Sum"
            className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white placeholder-text-muted focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-semibold text-text-muted">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="leetcode">LeetCode</option>
              <option value="codechef">CodeChef</option>
              <option value="hackerrank">HackerRank</option>
              <option value="gfg">GeeksForGeeks</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-text-muted">Problem ID / Number</label>
            <input
              type="text"
              value={externalProblemId}
              onChange={(e) => setExternalProblemId(e.target.value)}
              placeholder="e.g. 1"
              className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
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
            <label className="mb-1 block font-semibold text-text-muted">Company Tag</label>
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

          <div className="flex items-center pt-5">
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
        </div>

        <div>
          <label className="mb-1 block font-semibold text-text-muted">Notes / Key Learnings</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Space complexity O(1), watch out for edge cases"
            className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose} className="text-text-muted">
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5">
            Add to Tracker
          </Button>
        </div>
      </form>
    </Modal>
  );
}
