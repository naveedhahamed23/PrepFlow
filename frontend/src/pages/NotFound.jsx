import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gradient-blue text-8xl font-extrabold"
      >
        404
      </motion.h1>
      <p className="mt-4 text-lg text-text">This page wandered off the revision schedule.</p>
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-glow"
      >
        <Home size={16} /> Back to Home
      </Link>
    </div>
  );
}
