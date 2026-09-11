import { CheckCircle2, Code, BarChart2, Target, ArrowUpRight } from "lucide-react";

export default function DSAStatCards({ stats }) {
  const solvedCount = stats?.solvedCount ?? 142;
  const totalTracked = stats?.totalTracked ?? 180;
  const thisWeekCount = stats?.thisWeekCount ?? 12;
  const revisionPendingCount = stats?.revisionPendingCount ?? 23;

  const cards = [
    {
      id: "solved",
      title: "Solved",
      value: solvedCount,
      change: "↑ 12%",
      subtitle: "Keep going!",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      iconBg: "bg-emerald-500/20 text-emerald-400",
      hoverBorder: "hover:border-emerald-500/40",
    },
    {
      id: "tracked",
      title: "Total Tracked",
      value: totalTracked,
      change: "↑ 15%",
      subtitle: "Problems in your list",
      icon: Code,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      iconBg: "bg-blue-500/20 text-blue-400",
      hoverBorder: "hover:border-blue-500/40",
    },
    {
      id: "week",
      title: "This Week",
      value: thisWeekCount,
      change: "↑ 50%",
      subtitle: "Problems solved",
      icon: BarChart2,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      iconBg: "bg-blue-500/20 text-blue-400",
      hoverBorder: "hover:border-blue-500/40",
    },
    {
      id: "revision",
      title: "Revision Pending",
      value: revisionPendingCount,
      change: null,
      subtitle: "Review and strengthen",
      icon: Target,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      iconBg: "bg-amber-500/20 text-amber-400",
      hoverBorder: "hover:border-amber-500/40",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
      {cards.map((card) => {
        const IconComp = card.icon;
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all ${card.hoverBorder}`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-text-muted">{card.title}</p>
                <h3 className="text-2xl font-extrabold text-white">{card.value}</h3>
              </div>

              <div className="flex items-center gap-2">
                {card.change && (
                  <span className="flex items-center text-xs font-bold text-emerald-400">
                    <ArrowUpRight size={13} className="mr-0.5" />
                    {card.change}
                  </span>
                )}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${card.iconBg}`}
                >
                  <IconComp size={20} />
                </div>
              </div>
            </div>

            <p className="mt-2 text-[11px] font-medium text-text-muted">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
