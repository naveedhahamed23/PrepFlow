import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Card from "../ui/Card";

const stats = [
  { value: "42,000+", label: "Students preparing" },
  { value: "1.8M", label: "Problems tracked" },
  { value: "94%", label: "Report better consistency" },
  { value: "310+", label: "Colleges represented" },
];

export function Stats() {
  return (
    <section className="border-y border-bg-border bg-bg-card/30 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:grid-cols-4 sm:px-6 lg:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="text-3xl font-extrabold text-gradient-blue sm:text-4xl">{s.value}</p>
            <p className="mt-2 text-sm text-text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Priya Menon",
    role: "SDE-1, placed via campus drive",
    text: "The revision scheduling alone saved me. I stopped forgetting topics I'd solved three weeks ago.",
  },
  {
    name: "Rohit Bansal",
    role: "Incoming Intern, product-based startup",
    text: "Mock interviews with real feedback made the actual HR round feel like a formality.",
  },
  {
    name: "Sneha Kulkarni",
    role: "3rd Year, NIT Surathkal",
    text: "Analytics showed me I was ignoring Graphs entirely. Fixed that in two weeks.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Loved by students</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">What preppers are saying</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
