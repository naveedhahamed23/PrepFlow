import { useState } from "react";
import { Sparkles, ArrowRight, Check, RefreshCw, Loader2, Calendar, Target, Clock, AlertTriangle } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import studyPlanService from "../../services/studyPlanService";

export default function AIPlanGeneratorCard({ onApplyGeneratedPlan }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "generating" | "preview"
  const [generatingStatus, setGeneratingStatus] = useState("Analyzing target role & weak areas...");

  // Form inputs
  const [targetCompany, setTargetCompany] = useState("Amazon & Google");
  const [examDate, setExamDate] = useState("2026-10-15");
  const [availableHours, setAvailableHours] = useState(6);
  const [weakAreas, setWeakAreas] = useState("Dynamic Programming, System Design");
  const [skillLevel, setSkillLevel] = useState("Intermediate");

  // Result state
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleStartGeneration = async () => {
    setStep("generating");
    setGeneratingStatus("Analyzing your skill level and weak areas...");

    setTimeout(() => {
      setGeneratingStatus("Optimizing daily study blocks & revision cycles...");
    }, 500);

    setTimeout(() => {
      setGeneratingStatus("Structuring high-impact practice tasks...");
    }, 900);

    try {
      const plan = await studyPlanService.generateStudyPlan({
        targetCompany,
        examDate,
        availableHours,
        weakAreas,
        skillLevel,
      });
      setGeneratedPlan(plan);
      setStep("preview");
    } catch (e) {
      console.error("Failed to generate plan:", e);
      setStep("form");
    }
  };

  const handleAcceptPlan = () => {
    if (generatedPlan) {
      onApplyGeneratedPlan(generatedPlan);
    }
    setModalOpen(false);
    setStep("form");
  };

  return (
    <>
      {/* Prominent Card matching screenshot reference */}
      <div className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-[#0F1932] via-[#0E172C] to-[#15132F] p-5 shadow-lg shadow-blue-900/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
            <Sparkles size={18} />
          </div>
          <h3 className="text-base font-bold text-white">
            AI Study Plan Generator
          </h3>
        </div>

        <p className="mt-2 text-xs text-text-muted">
          Get a personalized study plan based on your target company, exam date, and goals.
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            setStep("form");
            setModalOpen(true);
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:from-blue-500 hover:to-purple-500 transition-all"
        >
          <span>Generate My Study Plan</span>
          <ArrowRight size={16} />
        </button>

        {/* Feature Tags matching screenshot */}
        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {["Target Company", "Exam Date", "Available Hours", "Weak Areas"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#1E2D45] bg-[#070C16]/80 px-2 py-1 text-[11px] font-medium text-blue-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Generation Flow Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          step === "preview"
            ? "Your AI Study Plan is Ready!"
            : "AI Study Plan Generator"
        }
        size="lg"
      >
        {step === "form" && (
          <div className="space-y-4 text-xs text-text">
            <p className="text-text-muted">
              Configure your preparation target and parameters below. Our AI service will structure an optimized daily plan.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-text-muted">
                  Target Company / Role
                </label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. Amazon, Google, TCS Digital"
                  className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-text-muted">
                  Target Exam / Placement Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-text-muted">
                  Daily Available Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-text-muted">
                  Current Skill Level
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="Beginner">Beginner (Foundations)</option>
                  <option value="Intermediate">Intermediate (Core Practice)</option>
                  <option value="Advanced">Advanced (Company Focused)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-text-muted">
                Weak Areas & Focus Subjects
              </label>
              <input
                type="text"
                value={weakAreas}
                onChange={(e) => setWeakAreas(e.target.value)}
                placeholder="e.g. Dynamic Programming, Graph Traversals, Time & Work"
                className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                onClick={() => setModalOpen(false)}
                className="text-text-muted"
              >
                Cancel
              </Button>
              <Button
                onClick={handleStartGeneration}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-5"
              >
                Generate Study Plan
              </Button>
            </div>
          </div>
        )}

        {step === "generating" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader2 size={40} className="animate-spin text-blue-500" />
            <h4 className="mt-4 text-base font-bold text-white">
              Generating Personalized Study Plan...
            </h4>
            <p className="mt-1.5 text-xs text-blue-300 animate-pulse">
              {generatingStatus}
            </p>
          </div>
        )}

        {step === "preview" && generatedPlan && (
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 flex items-center justify-between text-white">
              <div>
                <span className="font-semibold text-blue-400">Target Company: </span>
                {generatedPlan.targetCompany}
              </div>
              <div>
                <span className="font-semibold text-blue-400">Daily Hours: </span>
                {generatedPlan.availableHours}h
              </div>
            </div>

            <h4 className="font-bold text-white text-sm">Generated Tasks Schedule</h4>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {generatedPlan.tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border border-[#1E2D45] bg-[#070C16] p-2.5"
                >
                  <div>
                    <span className="font-bold text-white">{t.title}</span>
                    <p className="text-text-muted text-[11px]">{t.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-400 font-semibold">{t.startTime}</span>
                    <span className="block text-text-muted text-[11px]">{t.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1E2D45]">
              <button
                onClick={handleStartGeneration}
                className="flex items-center gap-1.5 text-text-muted hover:text-white font-semibold text-xs"
              >
                <RefreshCw size={14} />
                <span>Regenerate</span>
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setModalOpen(false)}
                  className="text-text-muted"
                >
                  Discard
                </Button>
                <Button
                  onClick={handleAcceptPlan}
                  className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold px-5"
                >
                  <Check size={16} className="mr-1 inline" />
                  Accept Plan
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
