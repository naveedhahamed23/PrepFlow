import { Code2, Clock, Flame, Award, Mic, Target } from "lucide-react";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import TodayTasks from "../components/dashboard/TodayTasks";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import { ActivityTimeline, UpcomingSchedule, QuickActions } from "../components/dashboard/DashboardWidgets";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useFetch } from "../hooks/useFetch";
import plannerService from "../services/plannerService";
import dashboardService from "../services/dashboardService";

export default function Dashboard() {
  const { data, loading, error, refetch } = useFetch(() => dashboardService.getDashboard(), []);

  const toggleTask = async (task) => {
    await plannerService.updateTask(task.id, {
      title: task.title,
      subject: task.subject,
      duration: task.duration,
      dueDate: task.dueDate,
      done: !task.done,
    });
    await refetch();
  };

  if (loading) return <div className="space-y-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>;
  if (error) return <div className="rounded-xl border border-danger/30 bg-danger/5 p-6 text-sm text-danger">Unable to load your dashboard. Please try again.</div>;

  return (
    <div className="space-y-6">
      <WelcomeCard userName={data.userName} streak={data.studyStreak} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Code2} label="Problems Solved" value={data.dsaProblemsSolved} color="primary" />
        <StatCard icon={Clock} label="Study Time" value={`${Math.floor(data.studyMinutes / 60)}h ${data.studyMinutes % 60}m`} color="success" />
        <StatCard icon={Flame} label="Study Streak" value={`${data.studyStreak} days`} color="warning" />
        <StatCard icon={Award} label="XP Earned" value={data.xp.toLocaleString()} color="primary" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyChart data={data.weeklyActivity} />
        </div>
        <ProgressOverview data={data} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TodayTasks tasks={data.todaysTasks} onToggle={toggleTask} />
        <ActivityTimeline items={data.recentActivity} />
        <div className="space-y-4">
          <UpcomingSchedule items={data.upcomingSchedule} />
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatCard icon={Mic} label="Interviews Completed" value={data.interviewCount} color="danger" />
        <StatCard icon={Target} label="Aptitude Average" value={data.aptitudeAverage == null ? "No data yet" : `${Math.round(data.aptitudeAverage)}%`} color="success" />
      </div>

      <DashboardInsights data={data} />
    </div>
  );
}
