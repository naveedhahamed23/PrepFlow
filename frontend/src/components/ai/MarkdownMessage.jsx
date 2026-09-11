import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Enhanced markdown renderer for AI responses.
 * Supports: paragraphs, headings (#/##/###), bold, inline code,
 * fenced code blocks (with language + copy button), bullet lists, numbered lists, tables.
 */

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-bg-border/60 bg-black/50">
      <div className="flex items-center justify-between border-b border-bg-border/40 px-3 py-1.5">
        <span className="text-[11px] font-medium text-text-muted/80 uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-text-muted hover:text-text hover:bg-white/5 transition-colors"
        >
          {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-xs text-text leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

function TableBlock({ rows }) {
  if (rows.length < 2) return null;
  const headers = rows[0].split("|").map(c => c.trim()).filter(Boolean);
  const dataRows = rows.slice(2).map(r => r.split("|").map(c => c.trim()).filter(Boolean));
  return (
    <div className="my-2 overflow-x-auto rounded-lg border border-bg-border/60">
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="border-b border-bg-border/60 bg-white/[0.03]">
            {headers.map((h, i) => <th key={i} className="px-3 py-2 font-semibold text-text">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, i) => (
            <tr key={i} className="border-b border-bg-border/30 last:border-0">
              {row.map((cell, j) => <td key={j} className="px-3 py-2 text-text-muted">{renderInline(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="font-semibold text-text">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[11px] text-primary">{part.slice(1, -1)}</code>;
    return <span key={i}>{part}</span>;
  });
}

export default function MarkdownMessage({ content, className }) {
  if (!content) return null;

  // Split into segments: code blocks vs text
  const segments = [];
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) segments.push({ type: "text", value: content.slice(lastIndex, match.index) });
    segments.push({ type: "code", lang: match[1], value: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) segments.push({ type: "text", value: content.slice(lastIndex) });

  return (
    <div className={cn("space-y-2 text-sm leading-relaxed min-w-0", className)}>
      {segments.map((seg, si) => {
        if (seg.type === "code") return <CodeBlock key={si} language={seg.lang} code={seg.value} />;

        // Parse text blocks: headings, lists, tables, paragraphs
        const lines = seg.value.split("\n");
        const elements = [];
        let listItems = [];
        let orderedItems = [];
        let tableRows = [];
        let inTable = false;

        const flushList = () => {
          if (listItems.length) {
            elements.push(
              <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 text-text-muted">
                {listItems.map((item, k) => <li key={k} className="text-[13px]">{renderInline(item)}</li>)}
              </ul>
            );
            listItems = [];
          }
          if (orderedItems.length) {
            elements.push(
              <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1 text-text-muted">
                {orderedItems.map((item, k) => <li key={k} className="text-[13px]">{renderInline(item)}</li>)}
              </ol>
            );
            orderedItems = [];
          }
        };

        const flushTable = () => {
          if (tableRows.length) {
            elements.push(<TableBlock key={`tbl-${elements.length}`} rows={tableRows} />);
            tableRows = [];
            inTable = false;
          }
        };

        lines.forEach((line, li) => {
          // Headings
          if (line.startsWith("### ")) { flushList(); flushTable(); elements.push(<h4 key={li} className="text-sm font-bold text-text mt-3 mb-1">{line.slice(4)}</h4>); return; }
          if (line.startsWith("## ")) { flushList(); flushTable(); elements.push(<h3 key={li} className="text-base font-bold text-text mt-4 mb-1">{line.slice(3)}</h3>); return; }
          if (line.startsWith("# ")) { flushList(); flushTable(); elements.push(<h2 key={li} className="text-lg font-bold text-text mt-4 mb-1">{line.slice(2)}</h2>); return; }

          // Table
          if (line.includes("|")) {
            flushList();
            inTable = true;
            tableRows.push(line);
            return;
          } else if (inTable) { flushTable(); }

          // Bullet list
          if (/^[-*] /.test(line)) { flushList(); listItems.push(line.slice(2)); return; }
          if (/^\d+\. /.test(line)) { flushList(); orderedItems.push(line.replace(/^\d+\. /, "")); return; }

          // Horizontal rule
          if (/^-{3,}$/.test(line.trim())) { flushList(); elements.push(<hr key={li} className="border-bg-border/40 my-2" />); return; }

          // Empty line
          if (!line.trim()) { flushList(); return; }

          // Regular paragraph
          flushList(); flushTable();
          elements.push(<p key={li} className="text-[13px] text-text-muted/90 leading-relaxed">{renderInline(line)}</p>);
        });

        flushList();
        flushTable();
        return <div key={si} className="space-y-1.5">{elements}</div>;
      })}
    </div>
  );
}
