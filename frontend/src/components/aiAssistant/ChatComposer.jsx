import { useEffect, useRef, useState } from "react";
import {
  Paperclip, Mic, MicOff, Send, Code2, Image, FileText, ExternalLink, X, ChevronDown
} from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { cn } from "../../utils/cn";

const LANGUAGES = ["JavaScript", "Python", "Java", "C++", "Go", "TypeScript", "Rust", "SQL", "Bash"];

// ============================================================
// Code Review Panel (inline composer expansion)
// ============================================================
function CodeReviewPanel({ onSubmit, onClose }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [problem, setProblem] = useState("");

  const handleSubmit = () => {
    if (!code.trim()) return;
    onSubmit(code, language, problem);
    onClose();
  };

  return (
    <div className="border-t border-bg-border/60 bg-[#070c16] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-text flex items-center gap-2"><Code2 size={14} className="text-primary" /> Code Review</span>
        <button onClick={onClose} className="text-text-muted hover:text-text"><X size={14} /></button>
      </div>
      <div className="flex gap-2">
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="rounded-lg border border-bg-border bg-transparent text-xs text-text px-3 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
        >
          {LANGUAGES.map(l => <option key={l} value={l} className="bg-bg">{l}</option>)}
        </select>
      </div>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={6}
        placeholder="Paste your code here..."
        className="w-full rounded-lg border border-bg-border bg-black/30 p-3 font-mono text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
      />
      <input
        value={problem}
        onChange={e => setProblem(e.target.value)}
        placeholder="Optional: Describe the problem or context..."
        className="w-full rounded-lg border border-bg-border bg-transparent px-3 py-2 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-primary"
      />
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-1.5 rounded-lg border border-bg-border text-xs text-text-muted hover:text-text">Cancel</button>
        <button
          onClick={handleSubmit}
          disabled={!code.trim()}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent text-xs font-semibold text-white disabled:opacity-40"
        >
          Review Code
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Image Attachment Panel
// ============================================================
function ImageAttachmentButton({ onAttach, attachment, onRemove }) {
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onAttach({ type: "image", name: file.name, url, file });
    e.target.value = "";
  };

  if (attachment) {
    return (
      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-bg-border group">
        <img src={attachment.url} alt={attachment.name} className="w-full h-full object-cover" />
        <button
          onClick={onRemove}
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
        >
          <X size={14} className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        title="Attach image"
        className="text-text-muted hover:text-text transition-colors"
      >
        <Paperclip size={18} />
      </button>
    </>
  );
}

// ============================================================
// Main Composer
// ============================================================
export default function ChatComposer() {
  const { sendMessage, sendCodeReview, inputRef, isTyping } = useAIAssistant();
  const [text, setText] = useState("");
  const [codeMode, setCodeMode] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [listening, setListening] = useState(false);
  const [speechSupported] = useState(() => "SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  // Merge inputRef from context with local ref
  useEffect(() => {
    if (inputRef) inputRef.current = textareaRef.current;
  }, [inputRef]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 128) + "px";
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || isTyping) return;
    const content = text + (attachment ? `\n\n[Image attached: ${attachment.name}]` : "");
    sendMessage(content);
    setText("");
    setAttachment(null);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMic = () => {
    if (!speechSupported) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join("");
      setText(prev => prev + transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const actionButtons = [
    { icon: Code2, label: "Code", action: () => setCodeMode(true), color: "text-cyan-400" },
    { icon: Image, label: "Image", action: null }, // handled by ImageAttachmentButton
    { icon: FileText, label: "Resume", action: () => sendMessage("I'd like you to analyze my resume."), color: "text-green-400" },
    { icon: ExternalLink, label: "LeetCode Problem", action: () => sendMessage("I want to discuss a LeetCode problem. Please help me understand the approach."), color: "text-orange-400" },
  ];

  return (
    <div className="border-t border-bg-border/60 bg-[#070c16]">
      {/* Code Review Panel */}
      {codeMode && (
        <CodeReviewPanel
          onSubmit={(code, lang, problem) => sendCodeReview(code, lang, problem)}
          onClose={() => setCodeMode(false)}
        />
      )}

      {/* Image preview */}
      {attachment && !codeMode && (
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-bg-border group">
              <img src={attachment.url} alt={attachment.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setAttachment(null)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
            <span className="text-xs text-text-muted truncate">{attachment.name}</span>
          </div>
        </div>
      )}

      {/* Main input row */}
      <div className="flex items-end gap-2 px-4 py-3">
        <ImageAttachmentButton
          onAttach={setAttachment}
          attachment={attachment}
          onRemove={() => setAttachment(null)}
        />

        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          placeholder="Ask anything about DSA, aptitude, interviews, or your preparation..."
          disabled={isTyping}
          className="flex-1 min-w-0 resize-none rounded-xl border border-bg-border/60 bg-[#0a1220] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors disabled:opacity-60"
          style={{ height: "42px", maxHeight: "128px" }}
        />

        {/* Mic button */}
        <button
          type="button"
          onClick={toggleMic}
          title={!speechSupported ? "Speech recognition not supported in this browser" : listening ? "Stop listening" : "Voice input"}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
            listening
              ? "bg-danger/20 border-danger/40 text-danger animate-pulse"
              : !speechSupported
              ? "border-bg-border/40 text-text-muted/30 cursor-not-allowed"
              : "border-bg-border/60 text-text-muted hover:text-text hover:border-primary/40"
          )}
        >
          {listening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim() || isTyping}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-glow disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between px-4 pb-3">
        <div className="flex items-center gap-1 flex-wrap">
          {actionButtons.map(({ icon: Icon, label, action, color }) =>
            label === "Image" ? (
              <div key={label} className="relative">
                <ImageAttachmentButton
                  onAttach={setAttachment}
                  attachment={null}
                  onRemove={() => {}}
                />
                {/* Render a styled button matching others */}
                <button
                  key={label}
                  onClick={action}
                  className="hidden"
                />
              </div>
            ) : (
              <button
                key={label}
                onClick={action}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border border-bg-border/50 px-3 py-1 text-[11px] font-medium text-text-muted hover:text-text hover:border-primary/30 transition-colors",
                  color
                )}
              >
                <Icon size={12} />
                {label}
              </button>
            )
          )}
        </div>
        <div className="text-[10px] text-text-muted/50 hidden sm:block">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
