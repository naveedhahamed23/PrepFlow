import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    desc: "For students just getting started with structured prep.",
    features: ["DSA tracker (150 problems)", "Basic aptitude sets", "Weekly planner", "Community leaderboard"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    desc: "Full access for students actively targeting placements.",
    features: [
      "Unlimited DSA + aptitude tracking",
      "AI Assistant with unlimited chats",
      "Unlimited mock interviews",
      "Resume ATS scoring",
      "Advanced analytics & heatmaps",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Campus",
    price: "Custom",
    period: "per college",
    desc: "For training & placement cells managing entire batches.",
    features: ["Batch-wide dashboards", "Custom company-wise sheets", "Dedicated support", "Placement readiness reports"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Simple pricing</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">Start free, upgrade when ready</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border p-7",
                plan.highlighted
                  ? "border-primary/40 bg-gradient-to-b from-primary/10 to-transparent shadow-glow"
                  : "border-bg-border bg-bg-card"
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-text">{plan.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{plan.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-text">{plan.price}</span>
                <span className="text-sm text-text-muted">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/register")}
                className={cn(
                  "mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-transform hover:scale-[1.02]",
                  plan.highlighted
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow"
                    : "border border-bg-border text-text hover:bg-bg-hover"
                )}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
