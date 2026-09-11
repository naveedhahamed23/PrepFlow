import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, RotateCcw, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";

/**
 * AI States: idle, thinking, processing, speaking, listening
 */
export default function VoiceControls({ 
  aiState, 
  onStartListening, 
  onStopListening,
  onRepeatQuestion,
  interimTranscript,
  error
}) {
  const [isMuted, setIsMuted] = useState(false);

  const handleMicToggle = () => {
    if (aiState === "listening") {
      onStopListening();
      setIsMuted(true);
    } else if (aiState === "idle" || isMuted) {
      setIsMuted(false);
      onStartListening();
    }
  };

  const isListening = aiState === "listening" && !isMuted;
  const isSpeaking = aiState === "speaking";
  const isProcessing = aiState === "thinking" || aiState === "processing";

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6 border-t border-bg-border/30 bg-bg-card/40 backdrop-blur-lg rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      
      {/* Live Transcript Display */}
      <div className="h-12 w-full max-w-2xl flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-danger text-sm font-medium"
            >
              <AlertTriangle size={16} />
              {error}
            </motion.div>
          ) : isListening && interimTranscript ? (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-text-muted italic text-center max-w-xl truncate text-lg"
            >
              "{interimTranscript}"
            </motion.p>
          ) : isListening ? (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-text-muted/50 text-center animate-pulse"
            >
              Listening...
            </motion.p>
          ) : isProcessing ? (
             <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-purple-400/70 text-center animate-pulse"
            >
              Processing response...
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-8 w-full">
        
        {/* Repeat Question Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRepeatQuestion}
          disabled={isListening || isProcessing}
          className="w-12 h-12 rounded-full hover:bg-white/5"
          title="Repeat Question"
        >
          <RotateCcw size={20} />
        </Button>

        {/* Primary Mic Button */}
        <div className="relative">
          {/* Animated rings when listening */}
          {isListening && (
            <>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-danger/20"
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-0 rounded-full bg-danger/10"
              />
            </>
          )}
          
          <button
            onClick={handleMicToggle}
            disabled={isSpeaking || isProcessing}
            className={cn(
              "relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
              isListening 
                ? "bg-danger text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
                : isMuted
                  ? "bg-bg-card border-2 border-danger/50 text-danger hover:bg-danger/10"
                  : isSpeaking || isProcessing
                    ? "bg-bg-hover text-text-muted cursor-not-allowed opacity-50"
                    : "bg-gradient-to-tr from-primary to-accent text-white shadow-glow hover:scale-105"
            )}
          >
            {isMuted ? <MicOff size={32} /> : <Mic size={32} />}
          </button>
        </div>

        {/* Mute toggle (same as clicking mic, but explicit) */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleMicToggle}
          disabled={isSpeaking || isProcessing}
          className={cn("w-12 h-12 rounded-full", isMuted ? "text-danger hover:bg-danger/10" : "hover:bg-white/5")}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
      </div>
      
      <p className="text-xs text-text-muted mt-2">
        {isListening ? "Tap microphone to pause" : isMuted ? "Tap microphone to speak" : isSpeaking ? "Wait for AI to finish..." : "Tap microphone to speak"}
      </p>
    </div>
  );
}
