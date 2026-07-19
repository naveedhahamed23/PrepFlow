import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, TrendingUp, Users } from "lucide-react";

const highlights = [
  { icon: TrendingUp, text: "Track DSA, aptitude & core subjects in one dashboard" },
  { icon: ShieldCheck, text: "AI-generated revision schedules that adapt to you" },
  { icon: Users, text: "Join 42,000+ students prepping smarter, not longer" },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-text">PrepFlow</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-text sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>

      {/* Right: visual */}
      <div className="relative hidden overflow-hidden bg-bg-card lg:block">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <motion.div
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-primary/25 blur-[100px]"
        />

        <div className="relative flex h-full flex-col justify-center px-16">
          <h2 className="max-w-md text-3xl font-bold leading-tight text-text">
            Everything your placement prep was missing.
          </h2>
          <div className="mt-10 space-y-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3.5"
              >
                <h.icon size={18} className="shrink-0 text-primary" />
                <span className="text-sm text-text">{h.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
