import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Bot, User } from "lucide-react";

export default function ConversationTranscript({ conversation }) {
  const containerRef = useRef(null);

  // Auto-scroll to bottom whenever conversation updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation]);

  if (!conversation || conversation.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center border-t border-bg-border/50 bg-bg-card/20 min-h-[150px]">
        <p className="text-text-muted text-sm">Conversation will appear here...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 md:px-8 border-t border-bg-border/50 bg-gradient-to-b from-bg to-bg-card/30 scroll-smooth custom-scrollbar"
      style={{ maxHeight: "40vh" }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {conversation.map((msg, index) => {
          const isAI = msg.role === "ai";
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={index}
              className={cn(
                "flex gap-4",
                isAI ? "justify-start" : "justify-end"
              )}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <Bot size={16} />
                </div>
              )}
              
              <div 
                className={cn(
                  "p-4 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm",
                  isAI 
                    ? "bg-bg-card border border-primary/20 text-text rounded-tl-sm" 
                    : "bg-primary text-white rounded-tr-sm"
                )}
              >
                {msg.text}
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-1">
                  <User size={16} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
