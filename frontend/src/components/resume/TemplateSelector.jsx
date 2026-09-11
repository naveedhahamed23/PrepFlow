import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

const templates = [
  { id: "modern", name: "Modern", type: "blue" },
  { id: "minimal", name: "Minimal", type: "gray" },
  { id: "professional", name: "Professional", type: "dark" },
  { id: "creative", name: "Creative", type: "purple" },
  { id: "tech", name: "Tech", type: "cyan" },
  { id: "elegant", name: "Elegant", type: "emerald" },
];

export function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-text">Templates</h2>
          <span className="text-xs text-text-muted">Choose a template that fits your style.</span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-primary hover:text-primary-hover transition-colors font-medium group">
          View All
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {templates.map((tpl) => {
          const isActive = selectedTemplate === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className={cn(
                "group cursor-pointer rounded-xl overflow-hidden border p-1 transition-all",
                isActive
                  ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "border-bg-border/60 bg-bg-card hover:border-bg-border hover:bg-bg-hover"
              )}
            >
              {/* Mock Template Preview */}
              <div className="aspect-[1/1.2] bg-white rounded-lg p-2 mb-1.5 opacity-90 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5">
                {/* Header */}
                <div className="flex items-start gap-1">
                  <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1">
                    <div className="w-12 h-1.5 rounded-full bg-slate-800 mb-0.5" />
                    <div className="w-8 h-1 rounded-full bg-slate-400" />
                  </div>
                </div>
                {/* Content blocks */}
                <div className="w-full h-1 rounded-full bg-slate-200" />
                <div className="w-3/4 h-1 rounded-full bg-slate-200" />
                
                <div className="mt-1 flex gap-1">
                  <div className="flex-1 space-y-1">
                    <div className="w-full h-1 rounded-full bg-slate-200" />
                    <div className="w-full h-1 rounded-full bg-slate-200" />
                  </div>
                  <div className="w-1/3 space-y-1 border-l border-slate-100 pl-1">
                     <div className="w-full h-1 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
              <p className={cn(
                "text-[11px] text-center font-medium transition-colors",
                isActive ? "text-primary" : "text-text-muted group-hover:text-text"
              )}>
                {tpl.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
