export function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const difficultyColor = {
  Easy: "text-success bg-success/10 border-success/20",
  Medium: "text-warning bg-warning/10 border-warning/20",
  Hard: "text-danger bg-danger/10 border-danger/20",
};

export const statusColor = {
  Solved: "text-success bg-success/10 border-success/20",
  Attempted: "text-warning bg-warning/10 border-warning/20",
  "Not Started": "text-text-muted bg-white/5 border-white/10",
  Revision: "text-primary bg-primary/10 border-primary/20",
};
