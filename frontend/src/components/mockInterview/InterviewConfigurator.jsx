import { useState } from "react";
import { Users, Code2, Clock, Video, Globe, Play, Search, CheckCircle2, Trophy, Mic, TrendingUp } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Table from "../ui/Table";
import { cn } from "../../utils/cn";

import {
  interviewTypes,
  topicsByType,
  difficulties,
  durations,
  interviewModes,
  languages,
  quickPresets,
  mockInterviewHistory
} from "../../data/interviewData";

export default function InterviewConfigurator({ onStartInterview }) {
  // Config state
  const [type, setType] = useState(interviewTypes[0].value);
  const [topic, setTopic] = useState(topicsByType["technical"][0].value);
  const [difficulty, setDifficulty] = useState(difficulties[1].value);
  const [duration, setDuration] = useState(durations[1].value);
  const [mode, setMode] = useState(interviewModes[0].value);
  const [language, setLanguage] = useState(languages[0].value);

  const handleTypeChange = (newType) => {
    setType(newType);
    setTopic(topicsByType[newType][0].value); // Reset topic to first available for this type
  };

  const applyPreset = (preset) => {
    setType(preset.config.type);
    setTopic(preset.config.topic);
    setDifficulty(preset.config.difficulty);
    setDuration(preset.config.duration);
    setMode(preset.config.mode);
    setLanguage(preset.config.language);
  };

  const handleStart = () => {
    onStartInterview({ type, topic, difficulty, duration, mode, language });
  };

  // Selectable Block Component
  const SelectBlock = ({ icon: Icon, title, description, value, options, onChange }) => (
    <div className="flex gap-4 p-4 rounded-xl border border-bg-border/60 bg-bg-card/30 hover:bg-bg-card/50 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text">{title}</h4>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1.5 bg-transparent border-b border-bg-border text-sm text-text pb-1 focus:outline-none focus:border-primary cursor-pointer appearance-none"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-bg">
              {opt.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-text-muted mt-2 truncate">
          {options.find(o => o.value === (typeof value === 'number' ? Number(value) : value))?.description || description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full min-w-0">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between min-w-0">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-text">Mock Interview</h1>
          <p className="mt-1 text-sm text-text-muted">Practice real conversations. Build confidence. Ace your interviews.</p>
        </div>
        <div className="flex gap-1 border-b border-bg-border/50 shrink-0 overflow-x-auto">
          <button className="px-3 py-2 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">Start Interview</button>
          <button className="px-3 py-2 text-text-muted font-medium text-sm hover:text-text whitespace-nowrap">Past Interviews</button>
          <button className="px-3 py-2 text-text-muted font-medium text-sm hover:text-text whitespace-nowrap">My Progress</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6">
        
        {/* Left Col: Configuration (2/3 width) */}
        <Card className="p-6 flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 min-w-0">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-text">Configure Your Interview</h2>
              <p className="text-sm text-text-muted">Customize your interview experience based on your goals.</p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap shrink-0">
              <span className="text-xs text-text-muted">Presets:</span>
              {quickPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="px-2.5 py-1 rounded-full border border-bg-border text-xs text-text-muted hover:text-text hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            <SelectBlock
              icon={Users}
              title="Interview Type"
              value={type}
              options={interviewTypes}
              onChange={handleTypeChange}
            />
            <SelectBlock
              icon={Code2}
              title="Topic / Domain"
              value={topic}
              options={topicsByType[type]}
              onChange={setTopic}
            />
            <SelectBlock
              icon={Clock}
              title="Duration"
              value={Number(duration)}
              options={durations.map(d => ({ ...d, value: Number(d.value) }))}
              onChange={val => setDuration(Number(val))}
            />
            <SelectBlock
              icon={Video}
              title="Difficulty Level"
              value={difficulty}
              options={difficulties}
              onChange={setDifficulty}
            />
            <SelectBlock
              icon={Mic}
              title="Interview Mode"
              value={mode}
              options={interviewModes}
              onChange={setMode}
            />
            <SelectBlock
              icon={Globe}
              title="Language"
              value={language}
              options={languages}
              onChange={setLanguage}
              description="Choose your preferred language"
            />
          </div>

          <div className="mt-6">
            <Button size="lg" className="w-full text-base" onClick={handleStart}>
              <Play size={18} /> Start Interview
            </Button>
            <div className="flex justify-between items-center mt-3 text-xs text-text-muted px-2">
              <span>AI interviewer is ready when you are!</span>
              <button className="hover:text-text flex items-center gap-1">⚙️ Interview Settings</button>
            </div>
          </div>
        </Card>

        {/* Right Col: AI Interviewer Promo */}
        <div className="flex flex-col min-w-0">
          <Card className="p-6 flex-1 dashboard-hero min-w-0">
            <h2 className="text-lg font-bold text-white">Meet Your AI Interviewer</h2>
            <p className="text-sm text-blue-200/70 mb-6">A realistic, conversational interview experience.</p>
            
            <div className="flex flex-col items-center mb-6 gap-3">
              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full border border-primary/40 bg-bg/50 backdrop-blur-sm flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent shadow-glow flex flex-col items-center justify-center gap-1">
                   <div className="flex gap-2">
                     <div className="w-2.5 h-1.5 bg-white/90 rounded-full" />
                     <div className="w-2.5 h-1.5 bg-white/90 rounded-full" />
                   </div>
                   <div className="w-6 h-1 mt-2 bg-white/60 rounded-full" />
                </div>
              </div>
              {/* Chat Bubble — now inline, never overflows */}
              <div className="glass-strong px-3 py-2 rounded-xl border-primary/30 w-full shadow-lg">
                <p className="text-[11px] text-blue-100 text-center">Hi! I'm your AI interviewer. Let's build your confidence together.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "Natural, human-like conversation",
                "Real-time voice interaction (speak & listen)",
                "In-depth feedback and suggestions",
                "Tailored questions for your target roles",
                "Track your progress over time"
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-100/90">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10">
               <p className="text-sm italic text-blue-200/60 text-center">"The best way to predict your future is to practice it."</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section: History and Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6">
        <Card className="p-0 overflow-hidden min-w-0">
          <div className="p-5 flex items-center justify-between border-b border-bg-border/50">
            <div>
              <h3 className="font-semibold text-text">Previous Interviews</h3>
              <p className="text-sm text-text-muted">Track your progress and revisit your sessions.</p>
            </div>
            <Button variant="ghost" size="sm">View All →</Button>
          </div>
          <Table 
            data={mockInterviewHistory}
            columns={[
              { key: "date", header: "Date" },
              { key: "type", header: "Type", render: (r) => (
                <Badge className="bg-primary/10 text-primary border-primary/20"><Code2 size={12} className="mr-1"/>{r.type}</Badge>
              )},
              { key: "topic", header: "Topic" },
              { key: "duration", header: "Duration" },
              { key: "score", header: "Score", render: (r) => (
                <span className={cn("font-medium", r.score >= 80 ? "text-success" : r.score >= 60 ? "text-warning" : "text-danger")}>
                  {r.score}%
                </span>
              )},
              { key: "feedback", header: "Feedback", render: () => (
                <button className="flex items-center text-xs text-text-muted hover:text-text">
                  <Search size={14} className="mr-1"/> View
                </button>
              )}
            ]}
          />
        </Card>

        <div className="space-y-4 min-w-0">
          <h3 className="font-semibold text-text">Why Take Mock Interviews?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 bg-bg-card/50 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3 shrink-0"><Search size={16}/></div>
              <h4 className="text-xs font-semibold text-text truncate">Identify Weak Areas</h4>
              <p className="text-[11px] text-text-muted mt-1">Get detailed feedback</p>
            </Card>
            <Card className="p-3 bg-bg-card/50 min-w-0">
              <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center mb-3 shrink-0"><TrendingUp size={16}/></div>
              <h4 className="text-xs font-semibold text-text truncate">Build Confidence</h4>
              <p className="text-[11px] text-text-muted mt-1">Practice safely</p>
            </Card>
            <Card className="p-3 bg-bg-card/50 min-w-0">
              <div className="w-8 h-8 rounded-full bg-danger/20 text-danger flex items-center justify-center mb-3 shrink-0"><Mic size={16}/></div>
              <h4 className="text-xs font-semibold text-text truncate">Improve Communication</h4>
              <p className="text-[11px] text-text-muted mt-1">Enhance speaking skills</p>
            </Card>
            <Card className="p-3 bg-bg-card/50 min-w-0">
              <div className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center mb-3 shrink-0"><Trophy size={16}/></div>
              <h4 className="text-xs font-semibold text-text truncate">Be Interview Ready</h4>
              <p className="text-[11px] text-text-muted mt-1">Perform better in real interviews</p>
            </Card>
          </div>
          
          <Card className="p-4 bg-primary/10 border-primary/20 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-warning mb-1">
              <span className="text-xl">💡</span>
              <h4 className="font-semibold text-sm text-text">Recommended for You</h4>
            </div>
            <p className="text-xs text-text-muted">Based on your recent activity</p>
            <div className="mt-2 p-3 bg-bg-card rounded-lg border border-bg-border flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
              <div>
                <h5 className="text-sm font-medium text-text">Practice Linked List questions</h5>
                <p className="text-xs text-text-muted mt-1">You solved 3 linked list problems this week.</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-bg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Play size={12} className="ml-0.5" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
