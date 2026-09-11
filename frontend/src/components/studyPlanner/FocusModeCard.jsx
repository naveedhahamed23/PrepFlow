import { useState, useEffect } from "react";
import { Target, Play, Pause, RotateCcw, X, CheckCircle2 } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

export default function FocusModeCard({ onFocusSessionComplete }) {
  const [selectedDuration, setSelectedDuration] = useState(25); // mins
  const [timerModalOpen, setTimerModalOpen] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync selectedDuration to timeLeft when modal opens or preset changes
  const handleSelectPreset = (mins) => {
    setSelectedDuration(mins);
    setTimeLeft(mins * 60);
    setIsCompleted(false);
  };

  const handleStartSession = () => {
    setTimeLeft(selectedDuration * 60);
    setIsRunning(true);
    setIsCompleted(false);
    setTimerModalOpen(true);
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      if (onFocusSessionComplete) {
        onFocusSessionComplete(selectedDuration);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedDuration, onFocusSessionComplete]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalSecs = selectedDuration * 60;
  const progressPct = ((totalSecs - timeLeft) / totalSecs) * 100;

  return (
    <>
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Target size={18} />
          </div>
          <h3 className="text-base font-bold text-white">Focus Mode</h3>
        </div>

        <p className="mt-2 text-xs text-text-muted">
          Eliminate distractions and boost productivity.
        </p>

        {/* Action Button & Options matching screenshot */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={handleStartSession}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 transition-all"
          >
            <Play size={14} fill="currentColor" />
            <span>Start Focus Session</span>
          </button>

          {/* Duration pills */}
          {[25, 50].map((mins) => (
            <button
              key={mins}
              onClick={() => handleSelectPreset(mins)}
              className={cn(
                "rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                selectedDuration === mins
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-300 font-bold"
                  : "border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white"
              )}
            >
              {mins} min
            </button>
          ))}
        </div>
      </div>

      {/* Timer Modal */}
      <Modal
        open={timerModalOpen}
        onClose={() => setTimerModalOpen(false)}
        title="Focus Session"
        size="sm"
      >
        <div className="flex flex-col items-center justify-center py-6 text-center">
          {/* Progress Ring */}
          <div className="relative flex h-48 w-48 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#162238]"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-500 transition-all duration-1000 ease-linear"
                strokeDasharray={`${progressPct}, 100`}
                strokeWidth="2.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black tracking-tight text-white font-mono">
                {formatTime(timeLeft)}
              </span>
              <span className="mt-1 text-xs text-purple-300 font-semibold">
                {isCompleted
                  ? "Session Completed!"
                  : isRunning
                  ? "Focusing..."
                  : "Paused"}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {!isCompleted ? (
              <>
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6"
                >
                  {isRunning ? (
                    <>
                      <Pause size={16} className="mr-1.5 inline" /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-1.5 inline" /> Resume
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(selectedDuration * 60);
                  }}
                  className="text-text-muted hover:text-white"
                >
                  <RotateCcw size={16} />
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setTimerModalOpen(false)}
                className="bg-emerald-600 text-black font-bold px-6"
              >
                <CheckCircle2 size={16} className="mr-1.5 inline" /> Done
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
