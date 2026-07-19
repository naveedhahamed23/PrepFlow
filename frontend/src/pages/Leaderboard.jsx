import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Code2, Crown } from "lucide-react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Avatar from "../components/ui/Avatar";
import { useFetch } from "../hooks/useFetch";
import leaderboardService from "../services/leaderboardService";
import { cn } from "../utils/cn";

const ranges = ["weekly", "monthly", "allTime"];
const rangeLabels = { weekly: "This Week", monthly: "This Month", allTime: "All Time" };

function Podium({ top3 }) {
  const order = [top3[1], top3[0], top3[2]];
  const heights = ["h-28", "h-36", "h-20"];
  const medalColors = ["#A1A1AA", "#F59E0B", "#B45309"];

  return (
    <div className="flex items-end justify-center gap-4 pb-2 pt-8">
      {order.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-2">
            {p.rank === 1 && <Crown size={20} className="absolute -top-6 left-1/2 -translate-x-1/2 text-warning" />}
            <Avatar src={p.avatar} name={p.name} size={p.rank === 1 ? "lg" : "md"} />
          </div>
          <p className="max-w-[90px] truncate text-center text-xs font-medium text-text">{p.name}</p>
          <p className="text-[11px] text-text-muted">{p.xp.toLocaleString()} XP</p>
          <div
            className={cn("mt-2 flex w-20 items-start justify-center rounded-t-xl pt-2 text-lg font-bold text-white sm:w-24", heights[i])}
            style={{ background: `linear-gradient(180deg, ${medalColors[i]}55, ${medalColors[i]}22)`, border: `1px solid ${medalColors[i]}55` }}
          >
            #{p.rank}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const [range, setRange] = useState("weekly");
  const { data: leaderboard, loading } = useFetch(() => leaderboardService.getLeaderboard(range), [range]);

  const columns = [
    { key: "rank", header: "#", render: (r) => <span className="font-semibold text-text-muted">{r.rank}</span> },
    {
      key: "name",
      header: "Student",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar src={r.avatar} name={r.name} size="sm" />
          <div>
            <p className="text-sm font-medium text-text">{r.name}</p>
            <p className="text-xs text-text-muted">{r.college}</p>
          </div>
        </div>
      ),
    },
    { key: "xp", header: "XP", render: (r) => <span className="font-semibold text-primary">{r.xp.toLocaleString()}</span> },
    { key: "streak", header: "Streak", render: (r) => <span className="flex items-center gap-1"><Flame size={13} className="text-warning" />{r.streak}d</span> },
    { key: "solved", header: "Solved", render: (r) => <span className="flex items-center gap-1"><Code2 size={13} className="text-success" />{r.solved}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Leaderboard</h1>
          <p className="mt-1 text-sm text-text-muted">See how you stack up against the PrepFlow community.</p>
        </div>
        <div className="flex rounded-xl border border-bg-border p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-medium",
                range === r ? "bg-primary text-white" : "text-text-muted hover:text-text"
              )}
            >
              {rangeLabels[r]}
            </button>
          ))}
        </div>
      </div>

      {!loading && leaderboard && (
        <Card className="flex justify-center bg-gradient-to-b from-primary/5 to-transparent">
          <Podium top3={leaderboard.slice(0, 3)} />
        </Card>
      )}

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Trophy size={15} className="text-primary" />
          <h3 className="text-sm font-semibold text-text">Full Rankings</h3>
        </div>
        {loading ? (
          <div className="h-72 animate-pulse rounded-2xl bg-bg-card" />
        ) : (
          <Table columns={columns} data={leaderboard || []} />
        )}
      </div>
    </div>
  );
}
