import { motion } from "framer-motion";
import { Code2, Calculator, BookOpenCheck, FileText, Mic, Bot, TrendingUp, CalendarClock } from "lucide-react";
import Card from "../ui/Card";

const features = [
  { icon: Code2, title: "DSA Tracker", desc: "Log every problem with difficulty, company tags, and auto-scheduled revisions." },
  { icon: Calculator, title: "Aptitude Practice", desc: "Topic-wise quant, reasoning, and verbal sets with instant analytics." },
  { icon: BookOpenCheck, title: "Core Subjects", desc: "Structured revision paths for OS, DBMS, CN, and OOPs." },
  { icon: FileText, title: "Resume Builder", desc: "ATS scoring with actionable suggestions to pass automated screens." },
  { icon: Mic, title: "Mock Interviews", desc: "Technical, behavioral, and HR rounds with recorded performance history." },
  { icon: Bot, title: "AI Assistant", desc: "Ask doubts, get hints, and debug your approach in a focused chat." },
  { icon: TrendingUp, title: "Deep Analytics", desc: "Heatmaps, topic breakdowns, and progress trends across every subject." },
  { icon: CalendarClock, title: "Smart Planner", desc: "Daily and weekly plans that adapt to what's actually due for revision." },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Everything in one place</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Six prep tracks. <span className="text-text-muted">One dashboard.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full" hover>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
