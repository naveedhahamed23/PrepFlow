import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function FloatingAssistant() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/app/assistant") return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => navigate("/app/assistant")}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-glow"
    >
      <Bot size={22} />
      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-success ring-2 ring-bg" />
    </motion.button>
  );
}
