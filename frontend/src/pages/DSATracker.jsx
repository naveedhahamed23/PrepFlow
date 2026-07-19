import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { CheckCircle2, Circle, Code2, TrendingUp } from "lucide-react";
import Search from "../components/ui/Search";
import Dropdown from "../components/ui/Dropdown";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { ChartCard } from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import Pagination from "../components/ui/Pagination";
import { SkeletonTable } from "../components/ui/Skeleton";
import ProblemDrawer from "../components/dsa/ProblemDrawer";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import dsaService from "../services/dsaService";
import { difficultyColor, statusColor, formatDate } from "../utils/format";

const PAGE_SIZE = 8;

export default function DSATracker() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const debouncedSearch = useDebounce(search, 300);
  const filters = useMemo(
    () => ({ search: debouncedSearch, difficulty, status }),
    [debouncedSearch, difficulty, status]
  );

  const { data: problems, loading } = useFetch(() => dsaService.getProblems(filters), [JSON.stringify(filters)]);
  const { data: topicStats } = useFetch(() => dsaService.getTopicStats(), []);

  const paged = (problems || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil((problems?.length || 0) / PAGE_SIZE);

  const solvedCount = (problems || []).filter((p) => p.status === "Solved").length;

  const columns = [
    {
      key: "title",
      header: "Problem",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          {row.status === "Solved" ? (
            <CheckCircle2 size={16} className="shrink-0 text-success" />
          ) : (
            <Circle size={16} className="shrink-0 text-text-muted" />
          )}
          <span className="font-medium text-text">{row.title}</span>
        </div>
      ),
    },
    { key: "topic", header: "Topic", render: (row) => <Badge>{row.topic}</Badge> },
    {
      key: "difficulty",
      header: "Difficulty",
      render: (row) => <Badge className={difficultyColor[row.difficulty]}>{row.difficulty}</Badge>,
    },
    {
      key: "companies",
      header: "Companies",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.companies.slice(0, 2).map((c) => (
            <Badge key={c} variant="primary">{c}</Badge>
          ))}
        </div>
      ),
    },
    { key: "status", header: "Status", render: (row) => <Badge className={statusColor[row.status]}>{row.status}</Badge> },
    { key: "revisionDate", header: "Revision Date", render: (row) => formatDate(row.revisionDate) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">DSA Tracker</h1>
        <p className="mt-1 text-sm text-text-muted">Log, filter, and revise every problem you've attempted.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={CheckCircle2} label="Solved" value={solvedCount} color="success" />
        <StatCard icon={Code2} label="Total Tracked" value={problems?.length ?? 0} color="primary" />
        <StatCard icon={TrendingUp} label="This Week" value="12 solved" color="warning" />
      </div>

      <ChartCard title="Progress by Topic" subtitle="Solved vs total per topic">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={topicStats || []} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
            <XAxis dataKey="topic" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#18181B", border: "1px solid #27272A", borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="solved" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" fill="#27272A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Search value={search} onChange={setSearch} placeholder="Search problems..." className="flex-1" />
        <Dropdown label="Difficulty" value={difficulty} onChange={(v) => { setDifficulty(v); setPage(1); }} options={["All", "Easy", "Medium", "Hard"]} className="sm:w-48" />
        <Dropdown label="Status" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={["All", "Solved", "Attempted", "Not Started", "Revision"]} className="sm:w-48" />
      </div>

      {loading ? (
        <SkeletonTable rows={6} />
      ) : (
        <>
          <Table columns={columns} data={paged} onRowClick={setSelected} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <ProblemDrawer problem={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
}
