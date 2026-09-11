import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame } from "lucide-react";

export default function WelcomeCard({ userName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-hero relative min-h-[118px] overflow-hidden rounded-xl p-4 sm:px-6 sm:py-5"
    >
      {/* Atmospheric glow overlay */}
      <div className="dashboard-hero__glow pointer-events-none absolute inset-0" />

      {/* Mountain / atmospheric SVG — matches reference visual */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        {/* Moon glow */}
        <div className="absolute right-[18%] top-[12%] h-12 w-12 rounded-full bg-[#fef3c7] opacity-70 blur-[2px] shadow-[0_0_24px_8px_rgba(251,191,36,0.4)]" />
        {/* Mountain silhouettes */}
        <svg
          className="absolute bottom-0 right-0 w-full opacity-90"
          viewBox="0 0 400 120"
          preserveAspectRatio="xMaxYMax meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back mountains — purple-blue */}
          <path d="M0 120L80 40L140 80L210 20L280 70L340 30L400 60L400 120Z" fill="#1e1b4b" opacity="0.9" />
          {/* Mid mountains — deeper blue */}
          <path d="M0 120L60 65L100 90L160 35L220 75L280 45L340 70L400 50L400 120Z" fill="#1e3a8a" opacity="0.95" />
          {/* Front mountains — darkest */}
          <path d="M0 120L40 85L90 105L130 60L180 95L240 50L300 80L360 55L400 75L400 120Z" fill="#0f172a" />
          {/* Slight gradient at base */}
          <rect x="0" y="100" width="400" height="20" fill="url(#baseGrad)" />
          <defs>
            <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
              <stop offset="100%" stopColor="#080E1E" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between sm:flex-row sm:items-center">
        <div className="space-y-2.5">
          <div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#F0F4FF] sm:text-2xl">
              Welcome Back, {userName?.split(" ")[0] || "Student"}&nbsp;<span aria-hidden="true"></span>
            </h2>
            <p className="mt-1 text-xs text-[#7B91B0]">
              &quot;Consistency today creates opportunities tomorrow.&quot;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#22C55E]">
              <CheckCircle2 size={10} /> On Track            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#F59E0B]">
              <Flame size={10} /> Keep Going
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-col items-start gap-2 sm:mt-0 sm:items-end">
          <p className="max-w-[190px] text-left text-[11px] italic leading-snug text-[#7B91B0] sm:text-right">
            &quot;Discipline is the bridge between goals and success.&quot;
          </p>
          <button className="group flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-[#C8D8F0] transition-all hover:bg-white/10 hover:text-white">
            Make it happen <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
