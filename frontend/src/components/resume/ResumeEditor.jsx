import { useState } from "react";
import { User, FileText, GraduationCap, Wrench, Briefcase, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

function Accordion({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="p-0 overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-bg-card hover:bg-bg-hover transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={16} />
          </div>
          <span className="font-semibold text-text">{title}</span>
        </div>
        {isOpen ? <ChevronDown size={18} className="text-text-muted" /> : <ChevronRight size={18} className="text-text-muted" />}
      </button>
      {isOpen && <div className="p-4 border-t border-bg-border/60">{children}</div>}
    </Card>
  );
}

export function ResumeEditor({ data, onChange }) {
  const handleChange = (section, field, value) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value,
      },
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...data[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [section]: newArray });
  };

  const addArrayItem = (section, emptyItem) => {
    onChange({ ...data, [section]: [...data[section], emptyItem] });
  };

  const removeArrayItem = (section, index) => {
    const newArray = data[section].filter((_, i) => i !== index);
    onChange({ ...data, [section]: newArray });
  };

  return (
    <div className="space-y-4">
      <Accordion title="Personal Information" icon={User} defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" value={data.personalInfo.name} onChange={(e) => handleChange("personalInfo", "name", e.target.value)} />
          <Input label="Professional Title" value={data.personalInfo.title} onChange={(e) => handleChange("personalInfo", "title", e.target.value)} />
          <Input label="Email" type="email" value={data.personalInfo.email} onChange={(e) => handleChange("personalInfo", "email", e.target.value)} />
          <Input label="Phone" value={data.personalInfo.phone} onChange={(e) => handleChange("personalInfo", "phone", e.target.value)} />
          <Input label="Location" value={data.personalInfo.location} onChange={(e) => handleChange("personalInfo", "location", e.target.value)} />
          <Input label="LinkedIn (Optional)" value={data.personalInfo.linkedin} onChange={(e) => handleChange("personalInfo", "linkedin", e.target.value)} />
          <Input label="GitHub (Optional)" value={data.personalInfo.github} onChange={(e) => handleChange("personalInfo", "github", e.target.value)} />
        </div>
      </Accordion>

      <Accordion title="Professional Summary" icon={FileText}>
        <textarea
          className="w-full h-32 rounded-lg border border-bg-border bg-bg-card/50 p-3 text-sm text-text placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
          placeholder="Briefly describe your background, skills, and goals..."
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
        />
      </Accordion>

      <Accordion title="Education" icon={GraduationCap}>
        {data.education.map((edu, index) => (
          <div key={index} className="relative p-4 border border-bg-border/60 rounded-xl mb-4 bg-bg-card/30">
            <button type="button" onClick={() => removeArrayItem("education", index)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 p-1">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <Input label="Degree / Field" value={edu.degree} onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)} />
              <Input label="Institution" value={edu.institution} onChange={(e) => handleArrayChange("education", index, "institution", e.target.value)} />
              <Input label="Period (e.g. 2022 - 2026)" value={edu.period} onChange={(e) => handleArrayChange("education", index, "period", e.target.value)} />
              <Input label="Score (CGPA/%)" value={edu.score} onChange={(e) => handleArrayChange("education", index, "score", e.target.value)} />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          icon={Plus}
          className="w-full"
          onClick={() => addArrayItem("education", { degree: "", institution: "", period: "", score: "" })}
        >
          Add Education
        </Button>
      </Accordion>

      <Accordion title="Experience" icon={Briefcase}>
        {data.experience.map((exp, index) => (
          <div key={index} className="relative p-4 border border-bg-border/60 rounded-xl mb-4 bg-bg-card/30">
            <button type="button" onClick={() => removeArrayItem("experience", index)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 p-1">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-4">
              <Input label="Job Title" value={exp.title} onChange={(e) => handleArrayChange("experience", index, "title", e.target.value)} />
              <Input label="Company" value={exp.company} onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)} />
              <Input label="Period" value={exp.period} onChange={(e) => handleArrayChange("experience", index, "period", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Description Bullets (one per line)</label>
              <textarea
                className="w-full h-24 rounded-lg border border-bg-border bg-bg-card/50 p-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                value={exp.bullets ? exp.bullets.join("\n") : ""}
                onChange={(e) => handleArrayChange("experience", index, "bullets", e.target.value.split("\n"))}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          icon={Plus}
          className="w-full"
          onClick={() => addArrayItem("experience", { title: "", company: "", period: "", bullets: [] })}
        >
          Add Experience
        </Button>
      </Accordion>

      <Accordion title="Projects" icon={Wrench}>
        {data.projects.map((proj, index) => (
          <div key={index} className="relative p-4 border border-bg-border/60 rounded-xl mb-4 bg-bg-card/30">
            <button type="button" onClick={() => removeArrayItem("projects", index)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 p-1">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-4">
              <Input label="Project Title" value={proj.title} onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)} />
              <Input label="Period" value={proj.period} onChange={(e) => handleArrayChange("projects", index, "period", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Description Bullets (one per line)</label>
              <textarea
                className="w-full h-24 rounded-lg border border-bg-border bg-bg-card/50 p-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                value={proj.bullets ? proj.bullets.join("\n") : ""}
                onChange={(e) => handleArrayChange("projects", index, "bullets", e.target.value.split("\n"))}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          icon={Plus}
          className="w-full"
          onClick={() => addArrayItem("projects", { title: "", period: "", bullets: [] })}
        >
          Add Project
        </Button>
      </Accordion>

      <Accordion title="Skills" icon={Wrench}>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">Comma separated skills</label>
          <textarea
            className="w-full h-24 rounded-lg border border-bg-border bg-bg-card/50 p-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
            value={data.skills.join(", ")}
            onChange={(e) => onChange({ ...data, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            placeholder="Java, Python, React, AWS..."
          />
        </div>
      </Accordion>
    </div>
  );
}
