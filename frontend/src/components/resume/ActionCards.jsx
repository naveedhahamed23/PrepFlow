import { Upload, FileText, Sparkles, Check, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useRef } from "react";

export function ActionCards({ onUpload, isUploading, onCreateNew }) {
  const fileInputRef = useRef(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.3fr] gap-5 mb-2">
      {/* Upload Card */}
      <Card className="flex flex-col h-full bg-gradient-to-br from-bg-card to-bg-card/50">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Upload className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-text mb-1">Upload Existing Resume</h3>
            <p className="text-xs text-text-muted mb-4">Get AI analysis and improvement suggestions</p>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={onUpload}
          />
          <Button
            size="sm"
            icon={Upload}
            loading={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1"
          >
            Upload PDF
          </Button>
          <span className="text-[11px] text-text-muted">PDF up to 10MB</span>
        </div>
      </Card>

      {/* Create New Card */}
      <Card className="flex flex-col h-full bg-gradient-to-br from-bg-card to-bg-card/50">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <FileText className="text-emerald-400" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-text mb-1">Create New Resume</h3>
            <p className="text-xs text-text-muted mb-4">Build a professional resume from scratch</p>
          </div>
        </div>
        <div className="mt-auto">
          <Button
            size="sm"
            variant="secondary"
            icon={ArrowRight}
            iconPosition="right"
            onClick={onCreateNew}
          >
            Start Building
          </Button>
        </div>
      </Card>

      {/* AI Powered Card */}
      <Card className="relative overflow-hidden bg-indigo-950/30 border-indigo-500/20">
        {/* Background Wave */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none w-1/2 h-full flex items-end">
          <svg viewBox="0 0 200 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path
              d="M0,50 Q25,25 50,50 T100,50 T150,50 T200,50 L200,100 L0,100 Z"
              fill="url(#wave-gradient)"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#312E81" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 flex gap-4 h-full">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <Sparkles className="text-indigo-400" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text mb-2">AI Powered</h3>
            <ul className="space-y-1.5">
              {[
                "ATS score and detailed analysis",
                "Smart suggestions and improvements",
                "Professional templates",
                "Tailored for your target roles"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-text-muted">
                  <Check className="text-indigo-400 shrink-0 mt-0.5" size={12} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
