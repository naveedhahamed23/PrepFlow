import { useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { Clock } from "lucide-react";

export default function InterviewTimer({ durationMinutes, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const formattedTime = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

  // Change color based on urgency
  let colorClass = "text-text-muted";
  if (timeLeft <= 120) colorClass = "text-danger animate-pulse"; // Last 2 minutes
  else if (timeLeft <= 300) colorClass = "text-warning"; // Last 5 minutes

  return (
    <div className={cn("flex items-center gap-2 font-mono text-lg font-medium", colorClass)}>
      <Clock size={20} className={timeLeft <= 120 ? "text-danger" : "text-text-muted"} />
      <span>{formattedTime}</span>
    </div>
  );
}
