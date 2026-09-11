import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import analyticsService from "../services/analyticsService";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import TopMetricCards from "../components/analytics/TopMetricCards";
import ActivityOverviewCard from "../components/analytics/ActivityOverviewCard";
import TopicStrengthCard from "../components/analytics/TopicStrengthCard";
import StudyTimeAnalysisCard from "../components/analytics/StudyTimeAnalysisCard";
import ConsistencyHeatmapCard from "../components/analytics/ConsistencyHeatmapCard";
import AIInsightsCard from "../components/analytics/AIInsightsCard";
import RecentActivityCard from "../components/analytics/RecentActivityCard";
import GoalProgressCard from "../components/analytics/GoalProgressCard";
import LeaderboardComparisonCard from "../components/analytics/LeaderboardComparisonCard";

export default function Analytics() {
  const navigate = useNavigate();

  // State
  const [timeRange, setTimeRange] = useState("30d"); // "7d" | "30d" | "90d" | "year" | "all"
  const [metrics, setMetrics] = useState(null);
  const [activityOverview, setActivityOverview] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load analytics data asynchronously based on timeRange
  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const [m, act, hm, ins, rec, g] = await Promise.all([
        analyticsService.getOverviewMetrics(timeRange),
        analyticsService.getActivityOverview(timeRange),
        analyticsService.getHeatmapData(timeRange),
        analyticsService.getAIInsights(),
        analyticsService.getRecentActivity(),
        analyticsService.getGoalProgress(),
      ]);

      setMetrics(m);
      setActivityOverview(act);
      setHeatmapData(hm);
      setInsights(ins);
      setRecentActivities(rec);
      setGoals(g);
    } catch (e) {
      console.error("Failed to load analytics:", e);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleNavigateToCategory = (cat) => {
    const routeMap = {
      DSA: "/app/dsa",
      Aptitude: "/app/aptitude",
      Interview: "/app/interview",
      Resume: "/app/resume",
      Study: "/app/planner",
    };
    if (routeMap[cat]) navigate(routeMap[cat]);
  };

  return (
    <div className="w-full min-w-0 px-2 sm:px-4 py-4 space-y-6">
      {/* 1. Header with Breadcrumbs, Time Range Selector & Motivational Banner */}
      <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* 2. Top Summary Metric Cards (6 compact cards) */}
      <TopMetricCards metrics={metrics} />

      {/* 3. Middle Section - Row 1: Activity Overview + Topic Strength vs Weakness */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
        <div className="lg:col-span-7 min-w-0">
          <ActivityOverviewCard
            data={activityOverview}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
        <div className="lg:col-span-5 min-w-0">
          <TopicStrengthCard onNavigateToCategory={handleNavigateToCategory} />
        </div>
      </div>

      {/* 4. Middle Section - Row 2: Study Time Analysis + Consistency Heatmap + AI Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
        <div className="lg:col-span-4 min-w-0 flex">
          <StudyTimeAnalysisCard totalStudyTime={metrics?.totalStudyTime || "24h 30m"} />
        </div>
        <div className="lg:col-span-4 min-w-0 flex">
          <ConsistencyHeatmapCard heatmapData={heatmapData} />
        </div>
        <div className="lg:col-span-4 min-w-0 flex">
          <AIInsightsCard insights={insights} />
        </div>
      </div>

      {/* 5. Bottom Section - Row 3: Recent Activity + Goal Progress + Leaderboard Comparison */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
        <div className="lg:col-span-4 min-w-0 flex">
          <RecentActivityCard activities={recentActivities} />
        </div>
        <div className="lg:col-span-4 min-w-0 flex">
          <GoalProgressCard goals={goals} />
        </div>
        <div className="lg:col-span-4 min-w-0 flex">
          <LeaderboardComparisonCard percentile={metrics?.overallPercentile || 68} />
        </div>
      </div>
    </div>
  );
}
