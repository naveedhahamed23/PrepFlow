import { useState, useEffect, useCallback } from "react";
import dsaService from "../services/dsaService";
import DSAHeader from "../components/dsa/DSAHeader";
import DSAStatCards from "../components/dsa/DSAStatCards";
import ProgressByTopicCard from "../components/dsa/ProgressByTopicCard";
import RightSidebarAnalytics from "../components/dsa/RightSidebarAnalytics";
import DSAFilterBar from "../components/dsa/DSAFilterBar";
import DSATable from "../components/dsa/DSATable";
import AddProblemModal from "../components/dsa/AddProblemModal";
import ViewProblemModal from "../components/dsa/ViewProblemModal";
import EditProblemModal from "../components/dsa/EditProblemModal";
import TopicsView from "../components/dsa/TopicsView";
import CompaniesView from "../components/dsa/CompaniesView";
import RevisionView from "../components/dsa/RevisionView";
import BookmarksView from "../components/dsa/BookmarksView";
import CatalogView from "../components/dsa/CatalogView";

export default function DSATracker() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "topics" | "companies" | "revision" | "bookmarks"
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter States
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");
  const [company, setCompany] = useState("All");

  // Data States
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [catalogProgress, setCatalogProgress] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState(false);
  const [actionError, setActionError] = useState("");

  // Modal States
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const [fetchedProblems, fetchedStats] = await Promise.all([
        dsaService.getProblems({
          search,
          topic,
          difficulty,
          status,
          company,
        }),
        dsaService.getDSAStats(),
      ]);

      setProblems(fetchedProblems);
      setStats(fetchedStats);
    } catch (e) {
      console.error("Error loading DSA tracker data:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [search, topic, difficulty, status, company]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchCatalog = useCallback(async () => {
    setCatalogLoading(true);
    setCatalogError(false);
    try {
      const [catalogProblems, userProgress] = await Promise.all([
        dsaService.getCatalog(),
        dsaService.getProblems(),
      ]);
      setCatalog(catalogProblems);
      setCatalogProgress(userProgress);
    } catch (e) {
      console.error("Error loading DSA catalog:", e);
      setCatalogError(true);
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "catalog") fetchCatalog();
  }, [activeTab, fetchCatalog]);

  // Handlers
  const handleResetFilters = () => {
    setSearch("");
    setTopic("All");
    setDifficulty("All");
    setStatus("All");
    setCompany("All");
    setCurrentPage(1);
  };

  const handleAddProblem = async (problemData) => {
    try {
      setActionError("");
      await dsaService.addProblem(problemData);
      await fetchData();
    } catch (e) {
      setActionError(e.message || "Unable to add the problem.");
      throw e;
    }
  };

  const handleTrackCatalogProblem = async (problem) => {
    try {
      setActionError("");
      await dsaService.trackCatalogProblem(problem);
      await Promise.all([fetchData(), fetchCatalog()]);
    } catch (e) {
      setActionError(e.message || "Unable to track the problem.");
    }
  };

  const handleUpdateProblem = async (id, updates) => {
    await dsaService.updateProblem(id, updates);
    fetchData();
  };

  const handleDeleteProblem = async (id) => {
    if (window.confirm("Are you sure you want to delete this problem from tracker?")) {
      await dsaService.deleteProblem(id);
      fetchData();
    }
  };

  const handleToggleSolve = async (id) => {
    const target = problems.find((p) => p.id === id);
    if (!target) return;
    const nextStatus = target.status === "Solved" ? "Tracked" : "Solved";
    await dsaService.updateProblem(id, {
      status: nextStatus,
      ...(nextStatus === "Solved" ? { solvedAt: new Date().toISOString().slice(0, 10) } : {}),
    });
    fetchData();
  };

  const handleToggleBookmark = async (id) => {
    await dsaService.toggleBookmark(id);
    fetchData();
  };

  const handleMarkRevised = async (id) => {
    await dsaService.markRevised(id);
    fetchData();
  };

  const handleSelectTopicFromCard = (topicName) => {
    setTopic(topicName);
    setActiveTab("overview");
    setCurrentPage(1);
  };

  const handleSelectCompanyFromCard = (companyName) => {
    setCompany(companyName);
    setActiveTab("overview");
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-w-0 px-2 sm:px-4 py-4 space-y-6">
      {/* 1. Header with Breadcrumbs, Tabs, Motivational Banner & Add Problem CTA */}
      <DSAHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setAddModalOpen(true)}
      />

      {actionError && <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">{actionError}</p>}
      {loadError && <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">Unable to load your DSA progress. Please try again.</p>}
      {loading && activeTab !== "catalog" && <p aria-live="polite" className="text-xs text-text-muted">Loading your DSA progress...</p>}

      {activeTab === "catalog" ? (
        <CatalogView catalog={catalog} progress={catalogProgress} loading={catalogLoading} error={catalogError} onTrack={handleTrackCatalogProblem} />
      ) : (
      activeTab === "topics" ? (
        <TopicsView
          topicStats={stats?.topicProgress || []}
          onSelectTopic={handleSelectTopicFromCard}
        />
      ) : activeTab === "companies" ? (
        <CompaniesView
          companyDistribution={stats?.companyDistribution || []}
          onSelectCompany={handleSelectCompanyFromCard}
        />
      ) : activeTab === "revision" ? (
        <RevisionView
          problems={problems}
          onMarkRevised={handleMarkRevised}
          onViewProblem={(p) => {
            setSelectedProblem(p);
            setViewModalOpen(true);
          }}
        />
      ) : activeTab === "bookmarks" ? (
        <BookmarksView
          problems={problems}
          onToggleBookmark={handleToggleBookmark}
          onViewProblem={(p) => {
            setSelectedProblem(p);
            setViewModalOpen(true);
          }}
        />
      ) : (
        /* Overview Tab (Default) matching DSATracker.png */
        <div className="space-y-6">
          {/* 2. Top Summary Stat Cards */}
          <DSAStatCards stats={stats} />

          {/* 3. Middle Section: Progress by Topic + Right Sidebar Analytics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
            {/* Left: Progress by Topic Bar List (lg:col-span-7) */}
            <div className="lg:col-span-7 min-w-0">
              <ProgressByTopicCard
                topicStats={stats?.topicProgress || []}
                onSelectTopic={handleSelectTopicFromCard}
              />
            </div>

            {/* Right: Topic Distribution Donut + Difficulty & Company Breakdown (lg:col-span-5) */}
            <div className="lg:col-span-5 min-w-0">
              <RightSidebarAnalytics stats={stats} />
            </div>
          </div>

          {/* 4. Search and Filter Bar */}
          <DSAFilterBar
            search={search}
            setSearch={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            topic={topic}
            setTopic={(val) => {
              setTopic(val);
              setCurrentPage(1);
            }}
            difficulty={difficulty}
            setDifficulty={(val) => {
              setDifficulty(val);
              setCurrentPage(1);
            }}
            status={status}
            setStatus={(val) => {
              setStatus(val);
              setCurrentPage(1);
            }}
            company={company}
            setCompany={(val) => {
              setCompany(val);
              setCurrentPage(1);
            }}
            onReset={handleResetFilters}
          />

          {/* 5. Problem Table */}
          <DSATable
            problems={problems}
            totalCount={problems.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onViewProblem={(p) => {
              setSelectedProblem(p);
              setViewModalOpen(true);
            }}
            onEditProblem={(p) => {
              setSelectedProblem(p);
              setEditModalOpen(true);
            }}
            onDeleteProblem={handleDeleteProblem}
            onToggleSolve={handleToggleSolve}
            onToggleBookmark={handleToggleBookmark}
          />
        </div>
      )
      )}

      {/* Add Problem Modal */}
      <AddProblemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddProblem={handleAddProblem}
      />

      {/* View Problem Modal */}
      <ViewProblemModal
        problem={selectedProblem}
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        onToggleSolve={handleToggleSolve}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Edit Problem Modal */}
      <EditProblemModal
        problem={selectedProblem}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdateProblem={handleUpdateProblem}
      />
    </div>
  );
}
