import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import leaderboardService from "../services/leaderboardService";
import followService from "../services/followService";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import LeaderboardFilters from "../components/leaderboard/LeaderboardFilters";
import PodiumCard from "../components/leaderboard/PodiumCard";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import YourRankCard from "../components/leaderboard/YourRankCard";
import WeeklyProgressCard from "../components/leaderboard/WeeklyProgressCard";
import AchievementsCard from "../components/leaderboard/AchievementsCard";
import FindFriendsCard from "../components/leaderboard/FindFriendsCard";
import UserProfileModal from "../components/leaderboard/UserProfileModal";
import { Users, UserPlus } from "lucide-react";
import Button from "../components/ui/Button";

export default function Leaderboard() {
  const { user: authUser } = useAuth();

  // Active filter states
  const [activeFilter, setActiveFilter] = useState("global"); // "global" | "friends" | "college"
  const [activePeriod, setActivePeriod] = useState("allTime"); // "weekly" | "monthly" | "allTime"
  const [sortBy, setSortBy] = useState("xp");
  const [currentPage, setCurrentPage] = useState(1);

  // Data states
  const [leaderboardData, setLeaderboardData] = useState({
    users: [],
    allSortedUsers: [],
    totalUsers: 1248,
    totalPages: 125,
    currentUserRank: 4,
  });
  const [loading, setLoading] = useState(true);

  // Modal profile state
  const [selectedUser, setSelectedUser] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // User profile derived
  const currentUserId = authUser?.id || "user-current";
  const currentUserCollege = authUser?.college || "VIT Chennai";

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await leaderboardService.getLeaderboard({
        filter: activeFilter,
        period: activePeriod,
        sortBy,
        currentUserId,
        currentUserCollege,
        page: currentPage,
        pageSize: 10,
      });
      setLeaderboardData(data);
    } catch (e) {
      console.error("Failed to fetch leaderboard:", e);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, activePeriod, sortBy, currentUserId, currentUserCollege, currentPage]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleFollowChange = () => {
    fetchLeaderboard();
  };

  const handleOpenProfile = (userObj) => {
    setSelectedUser(userObj);
    setProfileModalOpen(true);
  };

  // Find user data for current logged-in user
  const currentUserObj =
    leaderboardData.allSortedUsers.find((u) => u.id === currentUserId) || {
      id: "user-current",
      username: authUser?.name || "Naveedh",
      displayName: authUser?.name || "Naveedh Ahamed",
      avatar: authUser?.avatar || "/avatars/superhero_avatar.jpg",
      college: currentUserCollege,
      level: 14,
      xp: 1980,
      nextLevelXp: 2200,
      problemsSolved: 142,
      studyHours: 64,
      interviews: 8,
      streak: 12,
    };

  // Extract top 3 users for podium
  const top3Users = leaderboardData.allSortedUsers.slice(0, 3);
  // Table users (ranks 4 onwards or all paginated users)
  const tableUsers = leaderboardData.users;

  return (
    <div className="w-full min-w-0 px-2 sm:px-4 py-4 space-y-6">
      {/* 1. Header with Breadcrumb & Motivational Banner */}
      <LeaderboardHeader />

      {/* 2. Main Workspace Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
        {/* Left Main Content Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
          {/* Filters Bar: Global / Friends / College | Weekly / Monthly / All Time | Sort */}
          <LeaderboardFilters
            activeFilter={activeFilter}
            setActiveFilter={(f) => {
              setActiveFilter(f);
              setCurrentPage(1);
            }}
            activePeriod={activePeriod}
            setActivePeriod={setActivePeriod}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Empty State for Friends tab if 0 friends */}
          {activeFilter === "friends" && leaderboardData.allSortedUsers.length <= 1 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E2D45] bg-[#0D1424]/50 p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Users size={28} />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">
                No friends yet.
              </h3>
              <p className="mt-1.5 max-w-sm text-xs text-text-muted">
                Follow people from the leaderboard to connect with other PrepFlow learners and compare progress!
              </p>
              <Button
                onClick={() => setActiveFilter("global")}
                className="mt-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/20"
              >
                <UserPlus size={16} className="mr-1.5 inline" />
                Find People
              </Button>
            </div>
          ) : (
            <>
              {/* Top 3 Podium Cards */}
              <PodiumCard
                top3={top3Users}
                currentUserId={currentUserId}
                onFollowChange={handleFollowChange}
                onOpenProfile={handleOpenProfile}
              />

              {/* Full Leaderboard Table */}
              <LeaderboardTable
                users={tableUsers}
                currentUserId={currentUserId}
                totalUsers={leaderboardData.totalUsers}
                totalPages={leaderboardData.totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onFollowChange={handleFollowChange}
                onOpenProfile={handleOpenProfile}
              />
            </>
          )}
        </div>

        {/* Right Sidebar Column (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6 min-w-0">
          {/* Card 1: Your Rank */}
          <YourRankCard currentUser={currentUserObj} />

          {/* Card 2: Weekly Progress */}
          <WeeklyProgressCard />

          {/* Card 3: Achievements */}
          <AchievementsCard />

          {/* Card 4: Find Friends with Search */}
          <FindFriendsCard
            users={leaderboardData.allSortedUsers}
            currentUserId={currentUserId}
            onFollowChange={handleFollowChange}
            onOpenProfile={handleOpenProfile}
          />
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedUser}
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentUserId={currentUserId}
        onFollowChange={handleFollowChange}
      />
    </div>
  );
}
