import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Download, Sparkles, GraduationCap, Briefcase, Wrench } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useFetch } from "../hooks/useFetch";
import resumeService from "../services/resumeService";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/format";

export default function ResumeBuilder() {
  const { data: resume, loading, refetch } = useFetch(() => resumeService.getResume(), []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await resumeService.uploadResume(file);
      toast.success("Resume analyzed successfully.");
      refetch();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !resume) {
    return <div className="h-64 animate-pulse rounded-2xl bg-bg-card" />;
  }

  const scoreColor = resume.atsScore >= 80 ? "#22C55E" : resume.atsScore >= 60 ? "#F59E0B" : "#EF4444";
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (resume.atsScore / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Resume Builder</h1>
          <p className="mt-1 text-sm text-text-muted">Upload your resume for an instant ATS score and suggestions.</p>
        </div>
        <div className="flex gap-3">
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} />
          <Button variant="secondary" icon={Upload} loading={uploading} onClick={() => fileInputRef.current?.click()}>
            Upload Resume
          </Button>
          <Button icon={Download}>Download</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center text-center">
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#27272A" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none" stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-text">{resume.atsScore}</span>
              <span className="text-[10px] text-text-muted">ATS Score</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-text-muted">{resume.fileName}</p>
          <p className="text-[11px] text-text-muted">Last updated {formatDate(resume.lastUpdated)}</p>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-text">Suggestions to improve your score</h3>
          </div>
          <ul className="space-y-2.5">
            {resume.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2.5 rounded-xl border border-bg-border/60 px-3.5 py-2.5 text-sm text-text-muted">
                <span className="mt-0.5 shrink-0 text-primary">•</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Wrench size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-text">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s) => (
              <Badge key={s} variant="primary">{s}</Badge>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-text">Education</h3>
          </div>
          {resume.education.map((e, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-text">{e.degree}</p>
              <p className="text-xs text-text-muted">{e.institution} · {e.year} · {e.score}</p>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center gap-2">
          <Briefcase size={15} className="text-primary" />
          <h3 className="text-sm font-semibold text-text">Projects</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resume.projects.map((p) => (
            <div key={p.name} className="rounded-xl border border-bg-border/60 p-4">
              <p className="text-sm font-semibold text-text">{p.name}</p>
              <p className="mt-1 text-xs text-text-muted">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
