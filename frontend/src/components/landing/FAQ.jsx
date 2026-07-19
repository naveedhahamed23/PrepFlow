import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is PrepFlow free to use?",
    a: "Yes. The Starter plan is free forever and covers DSA tracking, aptitude sets, and a weekly planner. Pro unlocks unlimited tracking, AI assistance, and mock interviews.",
  },
  {
    q: "Do I need to connect a backend to try it?",
    a: "No — the product works fully on realistic mock data out of the box so you can explore every screen immediately.",
  },
  {
    q: "Can I track company-specific problem sets?",
    a: "Yes, every DSA problem can be tagged with the companies that have asked it, and you can filter your tracker by company.",
  },
  {
    q: "How does the revision scheduler work?",
    a: "PrepFlow uses spaced repetition principles — problems you mark as solved get automatically queued for revision at increasing intervals.",
  },
  {
    q: "Can placement cells use this for an entire batch?",
    a: "Yes, the Campus plan is built for TnP cells to track batch-wide readiness with aggregated dashboards.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Questions</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">Frequently asked</h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-bg-border bg-bg-card">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-text">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus size={16} className="text-text-muted" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
