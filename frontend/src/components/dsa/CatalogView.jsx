import { useMemo, useState } from "react";
import { BookmarkCheck, Plus, Search } from "lucide-react";

export default function CatalogView({ catalog = [], progress = [], loading, error, onTrack }) {
  const [search, setSearch] = useState("");
  const trackedByUrl = useMemo(() => new Map(
    progress.filter((problem) => problem.url).map((problem) => [problem.url.toLowerCase(), problem])
  ), [progress]);
  const trackedByTitle = useMemo(() => new Map(
    progress.map((problem) => [problem.title.toLowerCase(), problem])
  ), [progress]);
  const visible = catalog.filter((problem) => problem.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Problem Catalog</h2>
          <p className="text-xs text-text-muted">Browse the shared catalog and add problems to your tracker.</p>
        </div>
        <label className="relative block sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search catalog..." className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] py-2 pl-9 pr-3 text-xs text-white placeholder:text-text-muted focus:border-blue-500 focus:outline-none" />
        </label>
      </div>

      {error && <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">Unable to load the problem catalog.</p>}
      {loading && <p className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 text-sm text-text-muted">Loading the problem catalog...</p>}
      {!loading && !error && visible.length === 0 && <p className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 text-sm text-text-muted">No catalog problems found.</p>}

      {!loading && !error && visible.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((problem) => {
            const userProgress = (problem.url && trackedByUrl.get(problem.url.toLowerCase())) || trackedByTitle.get(problem.title.toLowerCase());
            return (
              <article key={problem.id} className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">{problem.title}</h3>
                    <p className="mt-1 text-xs text-text-muted">{problem.topic} · {problem.difficulty}</p>
                  </div>
                  {userProgress ? <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">{userProgress.status}</span> : null}
                </div>
                <div className="mt-3 flex min-h-5 flex-wrap gap-1.5">
                  {(problem.companies || []).map((company) => <span key={company} className="rounded-md border border-[#1E2D45] px-2 py-1 text-[10px] text-text-muted">{company}</span>)}
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  {problem.url ? <a href={problem.url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300">Open problem</a> : <span />}
                  <button disabled={Boolean(userProgress)} onClick={() => onTrack(problem)} className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 px-3 py-1.5 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-500/10 disabled:cursor-default disabled:border-emerald-500/20 disabled:text-emerald-400">
                    {userProgress ? <BookmarkCheck size={13} /> : <Plus size={13} />}
                    {userProgress ? "In tracker" : "Track"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
