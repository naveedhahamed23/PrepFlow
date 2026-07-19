import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-10 right-1/4 h-64 w-64 rounded-full bg-secondary/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary"
        >
          <Sparkles size={13} />
          AI-powered revision scheduling, now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold leading-[1.1] tracking-tight text-text sm:text-6xl lg:text-7xl"
        >
          Placement prep,
          <br />
          <span className="text-gradient-blue">finally organized.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-muted"
        >
          PrepFlow tracks your DSA, aptitude, core subjects, and mock interviews in one place —
          then tells you exactly what to revise today. No more scattered spreadsheets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-white shadow-glow sm:w-auto"
          >
            Start Preparing Free <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-bg-border px-7 py-3.5 text-sm font-semibold text-text hover:bg-bg-card sm:w-auto"
          >
            <PlayCircle size={17} /> Watch Demo
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-strong shadow-card relative mx-auto mt-20 max-w-4xl rounded-2xl border border-bg-border p-2"
        >
          <div className="rounded-xl bg-bg-card p-6 sm:p-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Problems Solved", value: "284" },
                { label: "Study Streak", value: "23 days" },
                { label: "Mock Score Avg", value: "82%" },
                { label: "XP Earned", value: "8,420" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <p className="text-2xl font-bold text-text sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
