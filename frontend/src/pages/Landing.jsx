import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import { Stats, Testimonials } from "../components/landing/StatsTestimonials";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";

function CTABanner() {
  const navigate = useNavigate();
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-bg-card to-bg-card p-10 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" />
          <h2 className="relative text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Your next placement cycle deserves a plan.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-text-muted">
            Set up your dashboard in under two minutes. No credit card required.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
          >
            Create Free Account <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
    </div>
  );
}
