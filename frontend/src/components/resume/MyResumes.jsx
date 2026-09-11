import { useState } from "react";
import {
  FileText, Plus, MoreVertical, Trash2, Edit3, Eye, Clock, CheckCircle2, Star, Copy, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

const statusConfig = {
  Active: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CheckCircle2 },
  Draft: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: Clock },
  Archived: { color: "text-text-muted", bg: "bg-bg-card", border: "border-bg-border/60", icon: FileText },
};

const templateColors = {
  modern: "from-blue-600 to-indigo-700",
  minimal: "from-slate-500 to-slate-700",
  professional: "from-slate-700 to-slate-900",
  creative: "from-purple-600 to-pink-700",
  tech: "from-cyan-600 to-teal-700",
  elegant: "from-emerald-600 to-green-700",
};

function ResumeCard({ resume, onEdit, onPreview, onDelete, onDuplicate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = statusConfig[resume.status] || statusConfig.Draft;
  const StatusIcon = status.icon;
  const gradientClass = templateColors[resume.template] || templateColors.modern;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)]">
        {/* Mini Document Preview */}
        <div className={`relative h-24 rounded-lg bg-gradient-to-br ${gradientClass} mb-4 overflow-hidden flex items-center justify-center`}>
          <div className="w-3/4 space-y-1.5 opacity-60">
            <div className="h-1.5 bg-white/50 rounded-full w-1/2 mx-auto" />
            <div className="h-1 bg-white/30 rounded-full" />
            <div className="h-1 bg-white/30 rounded-full w-5/6" />
            <div className="h-1 bg-white/20 rounded-full w-3/4" />
            <div className="h-1 bg-white/20 rounded-full w-4/5" />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <button
              onClick={() => onPreview(resume)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Preview"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(resume)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Edit"
            >
              <Edit3 size={16} />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-text truncate mb-1">{resume.name}</h3>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border", status.bg, status.color, status.border)}>
                <StatusIcon size={10} />
                {resume.status}
              </span>
              <span className="text-[11px] text-text-muted capitalize">{resume.template}</span>
            </div>
          </div>

          {/* Menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 rounded-lg border border-bg-border/60 bg-bg-card hover:bg-bg-hover flex items-center justify-center text-text-muted hover:text-text transition-colors"
            >
              <MoreVertical size={14} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 right-0 top-8 w-44 bg-bg-card border border-bg-border rounded-xl shadow-xl overflow-hidden"
                  >
                    {[
                      { icon: Edit3, label: "Edit", action: () => { onEdit(resume); setMenuOpen(false); } },
                      { icon: Eye, label: "Preview", action: () => { onPreview(resume); setMenuOpen(false); } },
                      { icon: Copy, label: "Duplicate", action: () => { onDuplicate(resume); setMenuOpen(false); } },
                      { icon: Trash2, label: "Delete", action: () => { onDelete(resume.id); setMenuOpen(false); }, danger: true },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors",
                          item.danger
                            ? "text-rose-400 hover:bg-rose-500/10"
                            : "text-text-muted hover:bg-bg-hover hover:text-text"
                        )}
                      >
                        <item.icon size={13} />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-bg-border/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
            <Clock size={11} />
            <span>Updated {resume.lastUpdated}</span>
          </div>
          <button className="text-text-muted hover:text-amber-400 transition-colors">
            <Star size={13} />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

export function MyResumes({ resumes, onCreateNew, onEdit, onDelete, onDuplicate }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = ["All", "Active", "Draft", "Archived"];

  const filteredResumes = resumes.filter((r) => {
    const matchesFilter = filter === "All" || r.status === filter;
    const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-text">My Resumes</h2>
          <p className="text-xs text-text-muted mt-0.5">
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Button icon={Plus} onClick={onCreateNew}>
          New Resume
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-bg-card border border-bg-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
                filter === f
                  ? "bg-primary/10 text-primary border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                  : "text-text-muted border-bg-border/60 bg-bg-card hover:bg-bg-hover hover:text-text"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredResumes.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {/* Create New Card */}
            <motion.div layout key="create-new">
              <button
                onClick={onCreateNew}
                className="group w-full h-full min-h-[210px] rounded-2xl border-2 border-dashed border-bg-border/60 hover:border-primary/50 bg-bg-card/30 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-center p-6"
              >
                <div className="w-10 h-10 rounded-xl border border-dashed border-bg-border/60 group-hover:border-primary/50 flex items-center justify-center text-text-muted group-hover:text-primary transition-all">
                  <Plus size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">
                    New Resume
                  </p>
                  <p className="text-xs text-text-muted/60 mt-0.5">Start from scratch or template</p>
                </div>
              </button>
            </motion.div>

            {filteredResumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onEdit={onEdit}
                onPreview={() => {}}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-bg-card border border-bg-border/60 flex items-center justify-center mb-4">
              <FileText size={24} className="text-text-muted" />
            </div>
            <h3 className="text-sm font-medium text-text mb-1">No resumes found</h3>
            <p className="text-xs text-text-muted mb-4">
              {search ? "Try a different search term." : "Create your first resume to get started."}
            </p>
            {!search && (
              <Button icon={Plus} size="sm" onClick={onCreateNew}>
                Create Resume
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
