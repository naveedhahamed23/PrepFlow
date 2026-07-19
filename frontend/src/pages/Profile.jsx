import { useState } from "react";
import { Award, Flame, Code2, Clock, Moon, Bell, Camera } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { resumeData } from "../data/notifications";

const certificates = [
  { name: "DSA Mastery — 200 Problems", issuer: "PrepFlow", date: "Jun 2026" },
  { name: "Mock Interview Pro", issuer: "PrepFlow", date: "May 2026" },
  { name: "100 Day Consistency Streak", issuer: "PrepFlow", date: "Apr 2026" },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-bg-border"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  if (!user) return null;

  const stats = [
    { icon: Code2, label: "Problems Solved", value: user.problemsSolved },
    { icon: Clock, label: "Hours Studied", value: user.hoursStudied },
    { icon: Flame, label: "Longest Streak", value: `${user.longestStreak} days` },
    { icon: Award, label: "XP", value: user.xp.toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
        <div className="relative">
          <Avatar src={user.avatar} name={user.name} size="xl" />
          <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-glow">
            <Camera size={13} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-text">{user.name}</h1>
          <p className="text-sm text-text-muted">{user.email}</p>
          <p className="mt-1 text-sm text-text-muted">{user.branch} · {user.college} · {user.year}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="primary">Level {user.level}</Badge>
            <Badge variant="warning">Rank #{user.rank}</Badge>
            <Badge variant="success">{user.streak}-day streak</Badge>
          </div>
        </div>
        <Button variant="secondary">Edit Profile</Button>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-lg font-bold text-text">{s.value}</p>
              <p className="text-xs text-text-muted">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-text">Achievements & Badges</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((b) => (
              <Badge key={b} variant="primary" icon={Award}>{b}</Badge>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-text">Certificates</h3>
          <div className="space-y-3">
            {certificates.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-xl border border-bg-border/60 px-3.5 py-2.5">
                <div>
                  <p className="text-sm text-text">{c.name}</p>
                  <p className="text-xs text-text-muted">{c.issuer} · {c.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 text-sm font-semibold text-text">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-sm font-semibold text-text">Preferences</h3>
        <div className="divide-y divide-bg-border">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2.5 text-sm text-text">
              <Moon size={16} className="text-text-muted" /> Dark Mode
            </div>
            <Toggle checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2.5 text-sm text-text">
              <Bell size={16} className="text-text-muted" /> Push Notifications
            </div>
            <Toggle checked={notifications} onChange={setNotifications} />
          </div>
        </div>
      </Card>
    </div>
  );
}
