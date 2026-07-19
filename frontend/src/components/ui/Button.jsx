import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:brightness-110",
  secondary: "bg-bg-card border border-bg-border text-text hover:bg-bg-hover",
  ghost: "bg-transparent text-text-muted hover:text-text hover:bg-white/5",
  outline: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10",
  danger: "bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "p-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon size={16} />}
    </motion.button>
  );
}
