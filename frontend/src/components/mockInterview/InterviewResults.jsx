import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, MessageCircle, TrendingUp, AlertTriangle } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function InterviewResults({ session, evaluation, onFinish }) {
  if (!evaluation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <h2 className="text-xl font-semibold text-text">Analyzing Interview...</h2>
        <p className="text-text-muted">The AI is evaluating your responses.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success mb-2">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-3xl font-bold text-text">Interview Complete</h1>
        <p className="text-text-muted max-w-xl">
          Great job! Here is your AI-generated feedback and performance breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Overall Score & Dimensions */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="flex flex-col items-center text-center p-8 border-primary/20 bg-gradient-to-b from-bg-card to-primary/5">
            <h3 className="text-lg font-semibold text-text mb-6">Overall Score</h3>
            
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-bg-border" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                  strokeLinecap="round"
                  className={evaluation.overallScore >= 80 ? "text-success" : evaluation.overallScore >= 60 ? "text-warning" : "text-danger"}
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: (2 * Math.PI * 45) * (1 - evaluation.overallScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-text">{evaluation.overallScore}</span>
                <span className="text-sm text-text-muted">/ 100</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h3 className="font-semibold text-text flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              Detailed Breakdown
            </h3>
            
            <div className="space-y-4">
              {Object.entries(evaluation.dimensions).map(([key, data]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">{key}</span>
                    <span className="font-medium text-text">{data.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-bg-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.score}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${data.score >= 80 ? 'bg-success' : data.score >= 60 ? 'bg-warning' : 'bg-danger'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Feedback & Summary */}
        <div className="space-y-6 lg:col-span-2">
          
          <Card className="p-6 border-l-4 border-l-primary bg-primary/5">
            <h3 className="text-lg font-semibold text-text flex items-center gap-2 mb-3">
              <MessageCircle size={20} className="text-primary" />
              AI Interviewer Feedback
            </h3>
            <p className="text-text-muted leading-relaxed">
              {evaluation.aiFeedback}
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-text flex items-center gap-2 mb-4 text-success">
                <CheckCircle2 size={18} /> Strengths
              </h3>
              <ul className="space-y-3">
                {evaluation.strengths.map((str, i) => (
                  <li key={i} className="text-sm text-text-muted flex gap-2">
                    <ChevronRight size={16} className="text-success shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-text flex items-center gap-2 mb-4 text-warning">
                <AlertTriangle size={18} /> Areas to Improve
              </h3>
              <ul className="space-y-3">
                {evaluation.improvements.map((imp, i) => (
                  <li key={i} className="text-sm text-text-muted flex gap-2">
                    <ChevronRight size={16} className="text-warning shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={onFinish}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
