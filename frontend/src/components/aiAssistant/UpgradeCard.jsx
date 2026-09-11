import { Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UpgradeCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/5 to-purple-500/10 p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
          <Crown size={15} className="text-warning" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text leading-snug">Upgrade Your Preparation</h3>
        </div>
      </div>

      <p className="text-[12px] text-text-muted leading-relaxed mb-4">
        Get personalized study plans, in-depth analysis, and more with PrepFlow AI.
      </p>

      <button
        onClick={() => navigate("/app/settings")}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent py-2 text-[12px] font-semibold text-white hover:opacity-90 transition-opacity"
      >
        Learn More <ArrowRight size={13} />
      </button>
    </div>
  );
}
