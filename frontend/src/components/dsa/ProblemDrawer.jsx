import { ExternalLink } from "lucide-react";
import { Drawer } from "../ui/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { difficultyColor, statusColor, formatDate } from "../../utils/format";

export default function ProblemDrawer({ problem, open, onClose }) {
  if (!problem) return null;

  return (
    <Drawer open={open} onClose={onClose} title={problem.title}>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Badge className={difficultyColor[problem.difficulty]}>{problem.difficulty}</Badge>
          <Badge className={statusColor[problem.status]}>{problem.status}</Badge>
          <Badge>{problem.topic}</Badge>
        </div>

        <div>
          <p className="text-xs font-medium text-text-muted">Companies</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {problem.companies.map((c) => (
              <Badge key={c} variant="primary">{c}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-text-muted">Revision Due</p>
            <p className="mt-1 text-sm text-text">{formatDate(problem.revisionDate)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted">Time Taken</p>
            <p className="mt-1 text-sm text-text">{problem.timeTaken} min</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-text-muted">Notes</p>
          <p className="mt-1 rounded-xl border border-bg-border bg-bg-card p-3 text-sm text-text-muted">
            {problem.notes || "No notes yet — add what tripped you up so future-you doesn't repeat it."}
          </p>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          icon={ExternalLink}
          onClick={() => window.open(problem.url, "_blank")}
        >
          Open on LeetCode
        </Button>
      </div>
    </Drawer>
  );
}
