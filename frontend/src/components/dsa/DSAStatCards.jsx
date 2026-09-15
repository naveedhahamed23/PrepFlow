import { CheckCircle2, Code, BarChart2, Target } from "lucide-react";

export default function DSAStatCards({ stats }) {
  const solvedCount = stats?.solvedCount ?? 0;
  const totalTracked = stats?.totalTracked ?? 0;
  const thisWeekCount = stats?.thisWeekCount ?? 0;
  const revisionPendingCount = stats?.revisionPendingCount ?? 0;

  const cards = [
    {
      id: "solved",
      title: "Solved",
      value: solvedCount,
      subtitle: "Problems solved",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/20 text-emerald-400",
      hoverBorder: "hover:border-emerald-500/40",
    },
    {
      id: "tracked",
      title: "Total Tracked",
      value: totalTracked,
      subtitle: "Problems in your list",
      icon: Code,
      iconBg: "bg-blue-500/20 text-blue-400",
      hoverBorder: "hover:border-blue-500/40",
    },
    {
      id: "week",
      title: "This Week",
      value: thisWeekCount,
      subtitle: "Problems solved",
      icon: BarChart2,
      iconBg: "bg-blue-500/20 text-blue-400",
      hoverBorder: "hover:border-blue-500/40",
    },
    {
      id: "revision",
      title: "Revision Pending",
      value: revisionPendingCount,
      subtitle: "Review and strengthen",
      icon: Target,
      iconBg: "bg-amber-500/20 text-amber-400",
      hoverBorder: "hover:border-amber-500/40",
    },
  ];

  return (
    <div className="mb-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const IconComp = card.icon;

        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all ${card.hoverBorder}`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-text-muted">
                  {card.title}
                </p>

                <h3 className="text-2xl font-extrabold text-white">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${card.iconBg}`}
              >
                <IconComp size={20} />
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