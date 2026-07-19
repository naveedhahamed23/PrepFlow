import { cn } from "../../utils/cn";

/**
 * Lightweight markdown renderer — handles the subset of markdown the AI
 * assistant's mock replies use (paragraphs, `inline code`, and ```code
 * blocks```). Swapped for a full markdown lib easily if needed later.
 */
export default function MarkdownMessage({ content, className }) {
  const blocks = content.split(/```/);

  return (
    <div className={cn("space-y-2 text-sm leading-relaxed", className)}>
      {blocks.map((block, i) =>
        i % 2 === 1 ? (
          <pre key={i} className="overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-xs text-text">
            <code>{block.trim()}</code>
          </pre>
        ) : (
          block.split("\n").filter(Boolean).map((line, j) => (
            <p key={`${i}-${j}`}>
              {line.split(/(`[^`]+`)/g).map((part, k) =>
                part.startsWith("`") && part.endsWith("`") ? (
                  <code key={k} className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-xs text-primary">
                    {part.slice(1, -1)}
                  </code>
                ) : (
                  <span key={k}>{part}</span>
                )
              )}
            </p>
          ))
        )
      )}
    </div>
  );
}
