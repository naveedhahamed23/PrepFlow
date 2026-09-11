import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Visual states:
 * - idle: Wait state. Slow pulse, low opacity.
 * - thinking: Processing user input. Faster pulse, slightly higher opacity.
 * - speaking: AI is talking. Dynamic waveform ring, bright.
 * - listening: User is talking. Wide receptive ring, cyan tint.
 * - processing: Finalizing.
 */
export default function AIInterviewer({ state = "idle", message = "" }) {
  
  const stateConfigs = {
    idle: {
      color: "bg-primary/20",
      ringColor: "border-primary/20",
      label: "Waiting...",
      animation: { scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    thinking: {
      color: "bg-purple-500/30",
      ringColor: "border-purple-500/40",
      label: "Thinking...",
      animation: { scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    processing: {
      color: "bg-purple-500/30",
      ringColor: "border-purple-500/40",
      label: "Processing...",
      animation: { scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    speaking: {
      color: "bg-primary/50",
      ringColor: "border-primary/60",
      label: "Speaking...",
      animation: { 
        scale: [1, 1.2, 1.05, 1.25, 1], 
        opacity: [0.8, 1, 0.7, 1, 0.8],
      },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    listening: {
      color: "bg-cyan-500/30",
      ringColor: "border-cyan-500/50",
      label: "Listening...",
      animation: { scale: [1.1, 1.15, 1.1], opacity: [0.8, 1, 0.8] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const config = stateConfigs[state] || stateConfigs.idle;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-2xl mx-auto mt-12 mb-8">
      
      {/* Avatar Orb */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        
        {/* Outer animated ring */}
        <motion.div
          animate={config.animation}
          transition={config.transition}
          className={cn("absolute inset-0 rounded-full border-2", config.ringColor)}
        />
        
        {/* Inner solid orb */}
        <div className={cn("relative z-10 w-32 h-32 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-md flex items-center justify-center", config.color)}>
           {/* Eyes (Subtle faces) */}
           <div className="flex gap-4">
             <motion.div 
                animate={state === "listening" ? { height: ["8px", "12px", "8px"] } : { height: "8px" }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 bg-white/80 rounded-full" 
              />
             <motion.div 
                animate={state === "listening" ? { height: ["8px", "12px", "8px"] } : { height: "8px" }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
                className="w-3 bg-white/80 rounded-full" 
              />
           </div>
           
           {/* Speaking waveform overlay */}
           {state === 'speaking' && (
             <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["10px", `${20 + Math.random() * 40}px`, "10px"] }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                    className="w-1 bg-white rounded-full"
                  />
                ))}
             </div>
           )}
        </div>
      </div>

      {/* State Label */}
      <div className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-primary">
        <span className={cn("w-2 h-2 rounded-full animate-pulse", 
          state === "listening" ? "bg-cyan-500" : 
          state === "speaking" ? "bg-primary" : 
          state === "thinking" || state === "processing" ? "bg-purple-500" : "bg-text-muted"
        )} />
        {config.label}
      </div>

      {/* Current AI Message Box */}
      <div className="min-h-[100px] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl text-center font-medium text-text max-w-xl leading-relaxed"
            >
              "{message}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
