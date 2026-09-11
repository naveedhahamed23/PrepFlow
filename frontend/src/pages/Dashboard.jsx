import { Code2, Calculator, Mic, FileText, Clock } from "lucide-react";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import LevelCard from "../components/dashboard/LevelCard";
import MetricCard from "../components/dashboard/MetricCard";
import ActivityBarChart from "../components/dashboard/ActivityBarChart";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import { QuickActionsStrip, RecentActivityList, StrengthsWeaknesses } from "../components/dashboard/BottomWidgets";
import { TodaysProgress, NextBestAction, UpcomingGoals, PromoCard } from "../components/dashboard/RightSidebarWidgets";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useFetch } from "../hooks/useFetch";
import dashboardService from "../services/dashboardService";

export default function Dashboard() {
  const { data, loading, error } = useFetch(() => dashboardService.getDashboard(), []);

  if (loading) return <div className="space-y-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>;
  if (error) return <div className="rounded-xl border border-danger/30 bg-danger/5 p-6 text-sm text-danger">Your session expired. Please log in again.</div>;

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      {/* Main Content Column */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        
        {/* Row 1: Hero */}
        <WelcomeCard userName={data.userName} />

        {/* Row 2: Dense Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <MetricCard delay={0.05} icon={Code2} title="DSA" value={data.metrics.dsa.value} detail={data.metrics.dsa.label} delta={data.metrics.dsa.delta} progress={data.metrics.dsa.progress} goal={data.metrics.dsa.goal} colorClass="bg-[#3B82F6]" iconClass="bg-[#3B82F6]/20 text-[#3B82F6]" />
          <MetricCard delay={0.1} icon={Calculator} title="Aptitude" value={data.metrics.aptitude.value} detail={data.metrics.aptitude.label} delta={data.metrics.aptitude.delta} progress={data.metrics.aptitude.progress} goal={data.metrics.aptitude.goal} colorClass="bg-[#F59E0B]" iconClass="bg-[#F59E0B]/20 text-[#F59E0B]" />
          <MetricCard delay={0.15} icon={Mic} title="Mock Interviews" value={data.metrics.interviews.value} detail={data.metrics.interviews.label} delta={data.metrics.interviews.delta} progress={data.metrics.interviews.progress} goal={data.metrics.interviews.goal} colorClass="bg-[#EC4899]" iconClass="bg-[#EC4899]/20 text-[#EC4899]" />
          <MetricCard delay={0.2} icon={FileText} title="Resume" value={data.metrics.resume.value} detail={data.metrics.resume.label} delta={data.metrics.resume.delta} progress={data.metrics.resume.progress} goal={data.metrics.resume.goal} colorClass="bg-[#10B981]" iconClass="bg-[#10B981]/20 text-[#10B981]" />
          <MetricCard delay={0.25} icon={Clock} title="Study Time" value={data.metrics.studyTime.value} detail={data.metrics.studyTime.label} delta={data.metrics.studyTime.delta} progress={data.metrics.studyTime.progress} goal={data.metrics.studyTime.goal} colorClass="bg-[#8B5CF6]" iconClass="bg-[#8B5CF6]/20 text-[#8B5CF6]" />
        </div>

        {/* Row 3: Activity & Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] gap-4 sm:gap-5">
          <ActivityBarChart data={data.activityTimeline} />
          <ProgressOverview data={data.preparationProgress} />
        </div>

        {/* Row 4: Quick Actions */}
        <QuickActionsStrip />

        {/* Row 5: Recent Activity & Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="md:col-span-1">
            <RecentActivityList activities={data.recentActivity} />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <StrengthsWeaknesses strengths={data.strengths} areasToImprove={data.areasToImprove} />
          </div>
        </div>
      </div>

      {/* Right Sidebar Column */}
      <div className="w-full xl:w-[300px] shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-col gap-4 sm:gap-5">
        <LevelCard 
          level={data.level} 
          xp={data.xp} 
          maxXp={data.maxXp} 
          streak={data.studyStreak} 
          goalsActive={data.goalsActive} 
          rank={data.globalRank} 
        />
        <TodaysProgress data={data.todaysProgress} />
        <NextBestAction />
        <UpcomingGoals goals={data.upcomingGoals} />
        <PromoCard />
      </div>
    </div>
  );
}
