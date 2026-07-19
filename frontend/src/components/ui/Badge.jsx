import { cn } from "../../utils/cn";

const variants = {
  default: "bg-white/5 text-text-muted border-white/10",
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
};

export default function Badge({ children, variant = "default", className, icon: Icon }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
