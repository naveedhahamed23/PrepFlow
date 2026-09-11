import { Download, MoreVertical, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

// Template style definitions
const templateStyles = {
  modern: {
    header: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white",
    accent: "bg-blue-600",
    accentText: "text-blue-700",
    sectionBorder: "border-blue-200",
    sectionTitle: "text-blue-700 border-b-2 border-blue-600",
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  minimal: {
    header: "border-b-2 border-slate-800 pb-4",
    accent: "bg-slate-800",
    accentText: "text-slate-800",
    sectionBorder: "border-slate-200",
    sectionTitle: "text-slate-800 border-b border-slate-300",
    badge: "bg-slate-100 text-slate-700 border border-slate-200",
  },
  professional: {
    header: "bg-slate-900 text-white",
    accent: "bg-slate-700",
    accentText: "text-slate-700",
    sectionBorder: "border-slate-200",
    sectionTitle: "text-slate-900 border-b border-slate-300",
    badge: "bg-slate-100 text-slate-700 border border-slate-200",
  },
  creative: {
    header: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    accent: "bg-purple-600",
    accentText: "text-purple-700",
    sectionBorder: "border-purple-200",
    sectionTitle: "text-purple-700 border-b-2 border-purple-500",
    badge: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  tech: {
    header: "bg-gradient-to-r from-cyan-600 to-teal-700 text-white",
    accent: "bg-cyan-600",
    accentText: "text-cyan-700",
    sectionBorder: "border-cyan-200",
    sectionTitle: "text-cyan-700 border-b-2 border-cyan-500",
    badge: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  },
  elegant: {
    header: "bg-gradient-to-r from-emerald-600 to-green-700 text-white",
    accent: "bg-emerald-600",
    accentText: "text-emerald-700",
    sectionBorder: "border-emerald-200",
    sectionTitle: "text-emerald-700 border-b-2 border-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

function HeaderSection({ personalInfo, styles, template }) {
  const isColored = ["modern", "professional", "creative", "tech", "elegant"].includes(template);
  const isMinimal = template === "minimal";

  if (isMinimal) {
    return (
      <div className={`${styles.header} mb-5`}>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">{personalInfo.name}</h1>
        <p className="text-base text-slate-600 mb-3">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={11} />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={11} />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={11} />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={11} />{personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="flex items-center gap-1"><Github size={11} />{personalInfo.github}</span>}
        </div>
      </div>
    );
  }

  if (isColored) {
    return (
      <div className={`${styles.header} rounded-lg px-6 py-5 mb-6`}>
        <h1 className="text-2xl font-bold mb-0.5">{personalInfo.name}</h1>
        <p className="text-sm opacity-90 mb-3">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-80">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={10} />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={10} />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={10} />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={10} />{personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="flex items-center gap-1"><Github size={10} />{personalInfo.github}</span>}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="border-b border-slate-200 pb-5 mb-5">
      <h1 className="text-2xl font-bold text-slate-900">{personalInfo.name}</h1>
      <p className="text-slate-600 mt-0.5">{personalInfo.title}</p>
    </div>
  );
}

export function ResumePreview({ data, hasResume, template = "modern" }) {
  if (!hasResume || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-start">
        <div className="w-full max-w-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text">Resume Preview</h2>
          </div>
          <Card className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-bg-border/60 bg-bg-card/30 aspect-[1/1.2]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-text font-medium mb-2">Your resume preview will appear here</h3>
            <p className="text-sm text-text-muted">
              Upload your resume to analyze and preview it.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const { personalInfo, summary, education, skills, experience, projects } = data;
  const styles = templateStyles[template] || templateStyles.modern;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-bold text-text">Resume Preview</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" icon={Download}>Download PDF</Button>
          <button className="w-8 h-8 rounded-lg border border-bg-border/60 bg-bg-card hover:bg-bg-hover flex items-center justify-center text-text-muted hover:text-text transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* A4 Document Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar rounded-xl border border-bg-border/60 bg-white shadow-2xl">
        <div className="p-7 text-slate-900 font-sans text-[13px] leading-relaxed">
          <HeaderSection personalInfo={personalInfo} styles={styles} template={template} />

          {/* Summary */}
          {summary && (
            <div className="mb-5">
              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-2 pb-1 ${styles.sectionTitle}`}>
                Summary
              </h2>
              <p className="text-slate-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div className="mb-5">
              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 pb-1 ${styles.sectionTitle}`}>
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} className="mt-2.5">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <span className="text-xs text-slate-500 font-medium shrink-0 ml-2">{edu.period}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-slate-700">{edu.institution}</p>
                    <span className="text-xs text-slate-600 shrink-0 ml-2">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mb-5">
              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 pb-1 ${styles.sectionTitle}`}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((skill) => (
                  <span key={skill} className={`px-2.5 py-1 text-xs rounded-full ${styles.badge}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <div className="mb-5">
              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 pb-1 ${styles.sectionTitle}`}>
                Experience
              </h2>
              {experience.map((exp, i) => (
                <div key={i} className="mt-3">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900">{exp.title}</h3>
                    <span className="text-xs text-slate-500 font-medium shrink-0 ml-2">{exp.period}</span>
                  </div>
                  <p className="text-slate-700 mb-1.5">{exp.company}</p>
                  {exp.bullets?.length > 0 && (
                    <ul className="list-disc list-inside text-slate-700 space-y-1 ml-1">
                      {exp.bullets.filter(Boolean).map((bullet, j) => (
                        <li key={j} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <div>
              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 pb-1 ${styles.sectionTitle}`}>
                Projects
              </h2>
              {projects.map((proj, i) => (
                <div key={i} className="mt-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{proj.title}</h3>
                    <span className="text-xs text-slate-500 font-medium shrink-0 ml-2">{proj.period}</span>
                  </div>
                  {proj.bullets?.length > 0 && (
                    <ul className="list-disc list-inside text-slate-700 space-y-1 ml-1">
                      {proj.bullets.filter(Boolean).map((bullet, j) => (
                        <li key={j} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
