import { motion } from "framer-motion";
import Card from "../ui/Card";
import { cn } from "../../utils/cn";

export default function StatCard({ icon: Icon, label, value, delta, color = "primary" }) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
  };

  return (
    <Card className="flex items-center gap-4">
      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", colors[color])}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <div className="flex items-baseline gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-text"
          >
            {value}
          </motion.p>
          {delta && <span className="text-xs font-medium text-success">{delta}</span>}
        </div>
      </div>
    </Card>
  );
}
