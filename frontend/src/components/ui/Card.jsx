import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function Card({ children, className, hover = true, glass = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-bg-border p-5",
        glass ? "glass" : "bg-bg-card",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ChartCard({ title, subtitle, action, children, className }) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex-1">{children}</div>
    </Card>
  );
}
