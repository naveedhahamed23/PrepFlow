import { useState } from "react";
import { Sparkles, Copy, Download, RefreshCw, Building2, Briefcase, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import coverLetterService from "../../services/coverLetterService";
import { useToast } from "../../context/ToastContext";

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "confident", label: "Confident" },
  { value: "friendly", label: "Friendly" },
];

function ToneSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = toneOptions.find((t) => t.value === value) || toneOptions[0];

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-text-muted mb-1.5">Tone</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-text bg-bg-card border border-bg-border rounded-lg hover:border-primary/50 transition-colors"
      >
        <span>{selected.label}</span>
        <ChevronDown size={16} className={`text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 top-full mt-1 w-full bg-bg-card border border-bg-border rounded-lg shadow-xl overflow-hidden"
          >
            {toneOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  opt.value === value
                    ? "text-primary bg-primary/10"
                    : "text-text hover:bg-bg-hover"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CoverLetter({ resumeData, resumeId }) {
  const toast = useToast();
  const [form, setForm] = useState({ role: "", company: "", tone: "professional" });
  const [generating, setGenerating] = useState(false);
  const [letter, setLetter] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleGenerate = async () => {
    if (!form.role.trim() || !form.company.trim()) {
      toast.error("Please enter the target role and company name.");
      return;
    }
    setGenerating(true);
    try {
      const res = await coverLetterService.generateCoverLetter(resumeId || "new", {
        role: form.role,
        company: form.company,
        tone: form.tone,
        resumeData,
      });
      setLetter(res.data.content);
    } catch {
      toast.error("Failed to generate cover letter. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!letter) return;
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
      {/* Left – Job Details Form */}
      <div className="space-y-4">
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.15)]">
              <Sparkles size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text">AI Cover Letter</h2>
              <p className="text-xs text-text-muted">Tailored to your resume & role</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Target Role"
              placeholder="e.g. Software Engineer"
              icon={Briefcase}
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
            <Input
              label="Company Name"
              placeholder="e.g. Google"
              icon={Building2}
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />
            <ToneSelector value={form.tone} onChange={(v) => handleChange("tone", v)} />

            {resumeData?.personalInfo?.name && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                <User size={13} className="text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-300/80">
                  Writing for <span className="font-semibold text-emerald-400">{resumeData.personalInfo.name}</span>
                </span>
              </div>
            )}

            <Button
              className="w-full"
              icon={Sparkles}
              loading={generating}
              onClick={handleGenerate}
            >
              {generating ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </div>
        </Card>

        {/* Tips */}
        <Card className="bg-indigo-950/20 border-indigo-500/15">
          <h3 className="text-xs font-semibold text-indigo-300 mb-3 uppercase tracking-wider">Tips</h3>
          <ul className="space-y-2">
            {[
              "Upload your resume first for best results.",
              "Be specific about the role and company.",
              "Choose a tone that matches the company culture.",
              "Always personalize the generated letter.",
            ].map((tip, i) => (
              <li key={i} className="flex gap-2 text-xs text-text-muted">
                <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Right – Generated Letter */}
      <Card className="flex flex-col min-h-[480px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-text">Generated Letter</h2>
          {letter && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" icon={RefreshCw} onClick={handleGenerate} loading={generating}>
                Regenerate
              </Button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-bg-border bg-bg-card hover:bg-bg-hover text-text-muted hover:text-text transition-colors"
              >
                <Copy size={13} />
                {copied ? "Copied!" : "Copy"}
              </button>
              <Button size="sm" icon={Download}>
                Download
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!letter && !generating && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-indigo-400" />
              </div>
              <h3 className="text-text font-medium mb-2">No cover letter yet</h3>
              <p className="text-sm text-text-muted max-w-xs">
                Fill in the job details and click "Generate" to create a personalized cover letter.
              </p>
            </motion.div>
          )}

          {generating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center gap-4"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={18} className="text-indigo-400" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-text mb-1">Crafting your letter…</p>
                <p className="text-xs text-text-muted">AI is analyzing your resume and job details</p>
              </div>
              {/* Shimmer lines */}
              <div className="w-full max-w-sm space-y-2 mt-2">
                {[80, 100, 90, 75, 100, 85, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-full bg-bg-hover animate-pulse"
                    style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {letter && !generating && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="h-full bg-bg-card/40 rounded-xl border border-bg-border/60 p-6 overflow-y-auto custom-scrollbar">
                <pre className="text-sm text-text-muted whitespace-pre-wrap leading-relaxed font-sans">{letter}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
