import { Code2, Clock, Flame, Award } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import TodayTasks from "../components/dashboard/TodayTasks";
import { ActivityTimeline, UpcomingSchedule, QuickActions } from "../components/dashboard/DashboardWidgets";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useFetch } from "../hooks/useFetch";
import plannerService from "../services/plannerService";
import dsaService from "../services/dsaService";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: todayTasks, loading: tasksLoading } = useFetch(() => plannerService.getTodayTasks(), []);
  const { data: upcoming, loading: upcomingLoading } = useFetch(() => plannerService.getUpcomingTasks(), []);
  const { data: weekly, loading: weeklyLoading } = useFetch(() => dsaService.getWeeklyActivity(), []);

  return (
    <div className="space-y-6">
      <WelcomeCard user={user} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Code2} label="Problems Solved" value={user?.problemsSolved ?? 0} delta="+12 this week" color="primary" />
        <StatCard icon={Clock} label="Hours Studied" value={user?.hoursStudied ?? 0} delta="+8h this week" color="success" />
        <StatCard icon={Flame} label="Study Streak" value={`${user?.streak ?? 0} days`} color="warning" />
        <StatCard icon={Award} label="XP Earned" value={user?.xp?.toLocaleString() ?? 0} delta="+340 today" color="primary" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {weeklyLoading ? <SkeletonCard /> : <WeeklyChart data={weekly || []} />}
        </div>
        {user && <ProgressOverview user={user} />}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {tasksLoading ? <SkeletonCard /> : <TodayTasks tasks={todayTasks || []} />}
        <ActivityTimeline />
        <div className="space-y-4">
          {upcomingLoading ? <SkeletonCard /> : <UpcomingSchedule items={upcoming || []} />}
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
