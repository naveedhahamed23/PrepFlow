import { Search, RotateCcw, ChevronDown } from "lucide-react";
import { TOPICS_LIST, COMPANIES_LIST } from "../../data/dsaProblemsData";

export default function DSAFilterBar({
  search,
  setSearch,
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  status,
  setStatus,
  company,
  setCompany,
  onReset,
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2.5 min-w-0">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems..."
          className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] pl-9 pr-3.5 py-2 text-xs text-white placeholder-text-muted focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Topic Filter */}
      <div className="relative w-full sm:w-[130px]">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 pr-7 text-xs font-medium text-white focus:border-blue-500 focus:outline-none cursor-pointer"
        >
          <option value="All">Topic: All</option>
          {TOPICS_LIST.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>

      {/* Difficulty Filter */}
      <div className="relative w-full sm:w-[130px]">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 pr-7 text-xs font-medium text-white focus:border-blue-500 focus:outline-none cursor-pointer"
        >
          <option value="All">Difficulty: All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>

      {/* Status Filter */}
      <div className="relative w-full sm:w-[130px]">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 pr-7 text-xs font-medium text-white focus:border-blue-500 focus:outline-none cursor-pointer"
        >
          <option value="All">Status: All</option>
          <option value="Solved">Solved</option>
          <option value="Tracked">Tracked</option>
          <option value="Revision Pending">Revision Pending</option>
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>

      {/* Company Filter */}
      <div className="relative w-full sm:w-[130px]">
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 pr-7 text-xs font-medium text-white focus:border-blue-500 focus:outline-none cursor-pointer"
        >
          <option value="All">Company: All</option>
          {COMPANIES_LIST.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-xs font-semibold text-text-muted hover:text-white hover:bg-white/5 transition-colors"
      >
        <RotateCcw size={13} />
        <span>Reset</span>
      </button>
    </div>
  );
}
