import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Lock, Palette, Bell, Trash2, AlertTriangle } from "lucide-react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import userService from "../services/userService";
import { cn } from "../utils/cn";

const tabs = [
  { key: "account", label: "Account", icon: User },
  { key: "security", label: "Security", icon: Lock },
  { key: "privacy", label: "Privacy", icon: Shield },
  { key: "theme", label: "Theme", icon: Palette },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "danger", label: "Delete Account", icon: Trash2 },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-bg-border"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState("account");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [prefs, setPrefs] = useState({
    profileVisible: true,
    showOnLeaderboard: true,
    emailDigest: true,
    revisionReminders: true,
    interviewReminders: true,
  });

  const save = async () => {
    setSaving(true);
    try {
      await userService.updatePreferences(prefs);
      toast.success("Settings saved.");
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    await userService.deleteAccount();
    toast.success("Account deleted.");
    setConfirmOpen(false);
    logout();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="mt-1 text-sm text-text-muted">Manage your account, security, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active === t.key ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-white/5 hover:text-text",
                t.key === "danger" && active !== t.key && "text-danger/80"
              )}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {active === "account" && (
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold text-text">Account Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Full name" defaultValue={user?.name} />
                <Input label="Email" defaultValue={user?.email} type="email" />
                <Input label="College" defaultValue={user?.college} />
                <Input label="Branch" defaultValue={user?.branch} />
              </div>
              <Button onClick={save} loading={saving}>Save Changes</Button>
            </Card>
          )}

          {active === "security" && (
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold text-text">Change Password</h3>
              <Input label="Current password" type="password" />
              <Input label="New password" type="password" />
              <Input label="Confirm new password" type="password" />
              <Button onClick={save} loading={saving}>Update Password</Button>
            </Card>
          )}

          {active === "privacy" && (
            <Card className="space-y-1 divide-y divide-bg-border">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm text-text">Public profile</p>
                  <p className="text-xs text-text-muted">Allow others to view your profile page.</p>
                </div>
                <Toggle checked={prefs.profileVisible} onChange={(v) => setPrefs((p) => ({ ...p, profileVisible: v }))} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm text-text">Show on leaderboard</p>
                  <p className="text-xs text-text-muted">Display your rank and XP publicly.</p>
                </div>
                <Toggle checked={prefs.showOnLeaderboard} onChange={(v) => setPrefs((p) => ({ ...p, showOnLeaderboard: v }))} />
              </div>
              <div className="pt-4">
                <Button onClick={save} loading={saving}>Save Changes</Button>
              </div>
            </Card>
          )}

          {active === "theme" && (
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-text">Appearance</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="rounded-xl border-2 border-primary bg-bg p-4 text-left">
                  <div className="mb-3 h-16 rounded-lg bg-gradient-to-br from-bg-card to-bg" />
                  <p className="text-sm font-medium text-text">Dark (default)</p>
                </button>
                <button className="rounded-xl border border-bg-border p-4 text-left opacity-60">
                  <div className="mb-3 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-white" />
                  <p className="text-sm font-medium text-text">Light (coming soon)</p>
                </button>
              </div>
            </Card>
          )}

          {active === "notifications" && (
            <Card className="space-y-1 divide-y divide-bg-border">
              {[
                { key: "emailDigest", label: "Weekly email digest", desc: "Summary of your progress every Monday." },
                { key: "revisionReminders", label: "Revision reminders", desc: "Get notified when problems are due for revision." },
                { key: "interviewReminders", label: "Interview reminders", desc: "Reminders before scheduled mock interviews." },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-text">{n.label}</p>
                    <p className="text-xs text-text-muted">{n.desc}</p>
                  </div>
                  <Toggle checked={prefs[n.key]} onChange={(v) => setPrefs((p) => ({ ...p, [n.key]: v }))} />
                </div>
              ))}
              <div className="pt-4">
                <Button onClick={save} loading={saving}>Save Changes</Button>
              </div>
            </Card>
          )}

          {active === "danger" && (
            <Card className="border-danger/30">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger" />
                <div>
                  <h3 className="text-sm font-semibold text-text">Delete your account</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    This permanently removes your progress, streaks, and saved data. This action cannot be undone.
                  </p>
                  <Button variant="danger" className="mt-4" onClick={() => setConfirmOpen(true)}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete account?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={deleteAccount}>Yes, delete it</Button>
          </>
        }
      >
        <p className="text-sm text-text-muted">
          This will permanently delete your PrepFlow account and all associated progress. Type your email to confirm you understand this is irreversible.
        </p>
      </Modal>
    </div>
  );
}
