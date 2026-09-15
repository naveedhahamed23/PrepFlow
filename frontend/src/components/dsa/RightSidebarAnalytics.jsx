import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const TOPIC_DONUT_COLORS = [
  "#3B82F6",
  "#10B981",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
  "#64748B",
];

export default function RightSidebarAnalytics({ stats }) {
  const solvedCount = stats?.solvedCount ?? 0;

  const easyCount = stats?.difficultyBreakdown?.easy ?? 0;
  const mediumCount = stats?.difficultyBreakdown?.medium ?? 0;
  const hardCount = stats?.difficultyBreakdown?.hard ?? 0;

  const topicStats = stats?.topicProgress ?? [];
  const companies = stats?.companyDistribution ?? [];

  // Convert topic solved counts into percentages of all solved problems.
  const topicData = topicStats
    .filter((topic) => topic.solved > 0)
    .map((topic) => ({
      name: topic.topic,
      value:
        solvedCount > 0
          ? Math.round((topic.solved / solvedCount) * 100)
          : 0,
      solved: topic.solved,
    }));

  const difficultyTotal = easyCount + mediumCount + hardCount;

  const getDifficultyPercentage = (count) => {
    if (difficultyTotal === 0) return 0;
    return Math.min(100, (count / difficultyTotal) * 100);
  };

  const maxCompanyCount =
    companies.length > 0
      ? Math.max(...companies.map((company) => company.count), 1)
      : 1;

  return (
    <div className="space-y-6 min-w-0">

      {/* 1. Topic Distribution */}
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
        <div>
          <h3 className="text-base font-bold text-white">
            Topic Distribution
          </h3>

          <p className="text-xs text-text-muted">
            Your solved problems by topic
          </p>
        </div>

        {topicData.length === 0 ? (
          <div className="flex min-h-[180px] items-center justify-center text-center">
            <div>
              <p className="text-sm font-semibold text-white">
                No solved problems yet
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Solve a problem to see your topic distribution.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between gap-2 min-w-0">

            {/* Donut */}
            <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={3}
                  >
                    {topicData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          TOPIC_DONUT_COLORS[
                            index % TOPIC_DONUT_COLORS.length
                          ]
                        }
                        stroke="#0D1424"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#070C16",
                      borderColor: "#1E2D45",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-white">
                  {solvedCount}
                </span>

                <span className="text-[10px] font-semibold text-text-muted">
                  Solved
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 min-w-0 space-y-1.5 pl-2 text-[11px]">
              {topicData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          TOPIC_DONUT_COLORS[
                            index % TOPIC_DONUT_COLORS.length
                          ],
                      }}
                    />

                    <span className="truncate text-text-muted">
                      {item.name}
                    </span>
                  </div>

                  <span className="ml-2 font-bold text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Difficulty Breakdown */}
      <div className="min-w-0 space-y-3 rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-white">
            Difficulty Breakdown
          </h3>
        </div>

        <div className="space-y-2.5 text-xs">

          {/* Easy */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-emerald-400">Easy</span>
              <span className="text-white">{easyCount}</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${getDifficultyPercentage(easyCount)}%`,
                }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-amber-400">Medium</span>
              <span className="text-white">{mediumCount}</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${getDifficultyPercentage(mediumCount)}%`,
                }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-amber-500"
              />
            </div>
          </div>

          {/* Hard */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-rose-400">Hard</span>
              <span className="text-white">{hardCount}</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${getDifficultyPercentage(hardCount)}%`,
                }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-rose-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Company Distribution */}
      <div className="min-w-0 space-y-3 rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-white">
            Company Distribution
          </h3>
        </div>

        {companies.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm font-semibold text-white">
              No company data yet
            </p>

            <p className="mt-1 text-xs text-text-muted">
              Company statistics will appear as your problems are tracked.
            </p>
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            {companies.slice(0, 5).map((comp) => {
              const companyColors = {
                Google: "bg-rose-500",
                Amazon: "bg-amber-500",
                Microsoft: "bg-blue-500",
                Meta: "bg-purple-500",
                Others: "bg-[#162238]",
              };

              const barBg =
                companyColors[comp.company] || "bg-blue-600";

              return (
                <div
                  key={comp.company}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="w-20 truncate font-semibold text-text-muted">
                    {comp.company}
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#162238]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          100,
                          (comp.count / maxCompanyCount) * 100
                        )}%`,
                      }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${barBg}`}
                    />
                  </div>

                  <span className="w-8 text-right font-bold text-white">
                    {comp.count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}