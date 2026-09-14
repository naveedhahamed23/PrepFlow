import { useState, useCallback } from "react";
import resumeService from "../services/resumeService";
import resumeAnalysisService from "../services/resumeAnalysisService";
import { useToast } from "../context/ToastContext";
import ResumeTabs from "../components/resume/ResumeTabs";
import { ActionCards } from "../components/resume/ActionCards";
import { ResumeAnalysis } from "../components/resume/ResumeAnalysis";
import { AISuggestions } from "../components/resume/AISuggestions";
import { TemplateSelector } from "../components/resume/TemplateSelector";
import { ResumePreview } from "../components/resume/ResumePreview";
import { ResumeEditor } from "../components/resume/ResumeEditor";
import { CoverLetter } from "../components/resume/CoverLetter";
import { MyResumes } from "../components/resume/MyResumes";
import { initialResumeState } from "../data/resumeData";
import Button from "../components/ui/Button";
import { Save, RefreshCw } from "lucide-react";

// Derive empty resume data shape
const emptyResumeData = {
  personalInfo: { name: "", title: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  summary: "",
  education: [],
  skills: [],
  experience: [],
  projects: [],
};

export default function ResumeBuilder() {
  const toast = useToast();

  // Active tab
  const [activeTab, setActiveTab] = useState("build");

  // Resume state
  const [resumeData, setResumeData] = useState(emptyResumeData);
  const [hasResume, setHasResume] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [fileName, setFileName] = useState(null);

  // UI states
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  // Analysis state (lazy — only loaded on Analyze tab)
  const [analysis, setAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // My Resumes list
  const [myResumes, setMyResumes] = useState([
    {
      id: "r_1",
      name: "Software Engineer Resume",
      template: "modern",
      lastUpdated: "2026-09-10",
      status: "Active",
      data: initialResumeState.data,
    },
  ]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files are accepted.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB.");
      return;
    }

    setUploading(true);
    setFileName(file.name);
    try {
      const res = await resumeService.uploadResume(file);
      const { data, id } = res.data;
      setResumeData(data || initialResumeState.data);
      setHasResume(true);
      if (id) setResumeId(id);
      toast.success("Resume uploaded and analyzed!");
      // Navigate to Build tab after upload
      setActiveTab("build");
    } catch {
      toast.error("Upload failed. Please try again.");
      setFileName(null);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateNew = () => {
    setResumeData(emptyResumeData);
    setHasResume(true);
    setResumeId(null);
    setFileName(null);
    setAnalysis(null);
    setSuggestions(null);
    setActiveTab("build");
    toast.success("New resume started. Fill in your details.");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (resumeId) {
        await resumeService.updateResume(resumeId, { data: resumeData, template: selectedTemplate });
      } else {
        const res = await resumeService.saveResume(resumeData, fileName || "My Resume", selectedTemplate);
        setResumeId(res.data.id);
        // Add to myResumes list
        setMyResumes((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: fileName || "My Resume",
            template: selectedTemplate,
            lastUpdated: new Date().toISOString().split("T")[0],
            status: "Active",
            data: resumeData,
          },
        ]);
      }
      toast.success("Resume saved successfully!");
    } catch {
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!hasResume) {
      toast.error("Please upload or create a resume first.");
      return;
    }
    setAnalyzing(true);
    try {
      const [analysisRes, suggestionsRes] = await Promise.all([
        resumeAnalysisService.analyzeResume(resumeId, resumeData),
        resumeAnalysisService.getSuggestions(resumeId, resumeData),
      ]);
      setAnalysis(analysisRes.data);
      setSuggestions(suggestionsRes.data);
    } catch {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }, [hasResume, resumeId, resumeData, toast]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Auto-trigger analysis when switching to Analyze tab
    if (tab === "analyze" && hasResume && !analysis && !analyzing) {
      handleAnalyze();
    }
  };

  const handleDeleteResume = (id) => {
    setMyResumes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resume deleted.");
  };

  const handleDuplicateResume = (resume) => {
    const duplicate = {
      ...resume,
      id: `r_${Date.now()}`,
      name: `${resume.name} (Copy)`,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "Draft",
    };
    setMyResumes((prev) => [...prev, duplicate]);
    toast.success("Resume duplicated.");
  };

  const handleEditResume = (resume) => {
    setResumeData(resume.data);
    setResumeId(resume.id);
    setHasResume(true);
    setSelectedTemplate(resume.template || "modern");
    setFileName(resume.name);
    setAnalysis(null);
    setSuggestions(null);
    setActiveTab("build");
    toast.success(`Editing "${resume.name}"`);
  };

  // ── Tab content renderer ────────────────────────────────────────────────────

  const renderTabContent = () => {
    switch (activeTab) {
      case "build":
        return (
          <div className="flex flex-col gap-6">
            <ActionCards onUpload={handleUpload} isUploading={uploading} onCreateNew={handleCreateNew} />
            {hasResume && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text">
                    {fileName || "Resume Details"}
                  </h3>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Save}
                    loading={saving}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
                <ResumeEditor data={resumeData} onChange={setResumeData} />
              </>
            )}
          </div>
        );

      case "analyze":
        if (!hasResume) {
          return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <RefreshCw size={28} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold text-text mb-2">No resume to analyze</h3>
              <p className="text-sm text-text-muted mb-4">Upload or create a resume first.</p>
              <Button onClick={() => setActiveTab("build")}>Go to Build & Edit</Button>
            </div>
          );
        }
        if (analyzing) {
          return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="relative w-14 h-14">
                <div className="w-14 h-14 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw size={18} className="text-primary" />
                </div>
              </div>
              <p className="text-sm text-text-muted">Analyzing your resume…</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            {analysis ? (
              <>
                <ResumeAnalysis analysis={analysis} />
                {suggestions && <AISuggestions suggestions={suggestions} onApplySuggestion={() => {}} />}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Button icon={RefreshCw} onClick={handleAnalyze}>Analyze My Resume</Button>
              </div>
            )}
          </div>
        );

      case "templates":
        return (
          <div>
            <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
          </div>
        );

      case "cover-letter":
        return (
          <CoverLetter resumeData={resumeData} resumeId={resumeId} />
        );

      case "my-resumes":
        return (
          <MyResumes
            resumes={myResumes}
            onCreateNew={handleCreateNew}
            onEdit={handleEditResume}
            onDelete={handleDeleteResume}
            onDuplicate={handleDuplicateResume}
          />
        );

      default:
        return null;
    }
  };

  const showPreview = ["build", "templates"].includes(activeTab);

return (
  <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] min-w-0">

    {/* Header */}
    <div className="mb-4 shrink-0">
      <h1 className="text-2xl font-bold text-text">
        Resume Builder
      </h1>

      <p className="mt-1 text-sm text-text-muted">
        Create, optimize, and land your dream job with AI.
      </p>
    </div>

    {/* Tabs */}
    <div className="shrink-0">
      <ResumeTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
    </div>

    {/* Main Content */}
    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">

      {showPreview ? (
        <div className="w-full max-w-[1180px] mx-auto pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.9fr)] gap-8 items-start">
            <div className="w-full min-w-0">
              {renderTabContent()}
            </div>

            <div className="w-full min-w-0">
              <ResumePreview
                data={resumeData}
                hasResume={hasResume}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[1100px] mx-auto pb-8">
          {renderTabContent()}
        </div>
      )}

    </div>

  </div>
);
}