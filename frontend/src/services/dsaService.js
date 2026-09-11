import {
  INITIAL_DSA_PROBLEMS,
  generateFullProblemsList,
  TOPICS_LIST,
  COMPANIES_LIST,
} from "../data/dsaProblemsData";

const STORAGE_KEY = "prepflow_dsa_problems_v1";

/**
 * Service Layer for DSA Tracker.
 * Manages problems, derived statistics, filters, bookmarks, and revision items.
 * Prepared for future Spring Boot REST endpoints & LeetCode browser extension sync:
 * GET /api/dsa/problems
 * POST /api/dsa/problems
 * PUT /api/dsa/problems/{id}
 * DELETE /api/dsa/problems/{id}
 */
export const dsaService = {
  getProblemsData: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading DSA problems from storage:", e);
    }
    const initialList = generateFullProblemsList();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
    return initialList;
  },

  saveProblemsData: (problems) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
    } catch (e) {
      console.error("Error saving DSA problems:", e);
    }
  },

  getProblems: async (filters = {}) => {
    await new Promise((res) => setTimeout(res, 80));
    const allProblems = dsaService.getProblemsData();

    let filtered = [...allProblems];

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    if (filters.topic && filters.topic !== "All") {
      filtered = filtered.filter((p) => p.topic === filters.topic);
    }

    if (filters.difficulty && filters.difficulty !== "All") {
      filtered = filtered.filter((p) => p.difficulty === filters.difficulty);
    }

    if (filters.status && filters.status !== "All") {
      if (filters.status === "Revision Pending") {
        filtered = filtered.filter(
          (p) =>
            p.revisionDueAt &&
            new Date(p.revisionDueAt) <= new Date("2026-09-11")
        );
      } else {
        filtered = filtered.filter((p) => p.status === filters.status);
      }
    }

    if (filters.company && filters.company !== "All") {
      filtered = filtered.filter((p) => p.company === filters.company);
    }

    if (filters.bookmarkedOnly) {
      filtered = filtered.filter((p) => p.bookmarked);
    }

    if (filters.revisionOnly) {
      filtered = filtered.filter(
        (p) =>
          p.revisionDueAt &&
          new Date(p.revisionDueAt) <= new Date("2026-09-11T23:59:59")
      );
    }

    return filtered;
  },

  getDSAStats: async () => {
    await new Promise((res) => setTimeout(res, 60));
    const problems = dsaService.getProblemsData();

    const totalTracked = problems.length;
    const solvedList = problems.filter((p) => p.status === "Solved");
    const solvedCount = solvedList.length;

    // This week (solved in last 7 days)
    const thisWeekCount = solvedList.filter((p) => {
      if (!p.solvedAt) return false;
      const solvedDate = new Date(p.solvedAt);
      const today = new Date("2026-09-11");
      const diffDays = (today - solvedDate) / (1000 * 60 * 60 * 24);
      return diffDays <= 7 && diffDays >= 0;
    }).length;

    // Revision pending (due today or earlier)
    const revisionPendingCount = problems.filter(
      (p) =>
        p.revisionDueAt &&
        new Date(p.revisionDueAt) <= new Date("2026-09-11T23:59:59")
    ).length;

    // Topic progress
    const topicProgress = TOPICS_LIST.map((topicName) => {
      const topicProblems = problems.filter((p) => p.topic === topicName);
      const total = topicProblems.length || 1;
      const solved = topicProblems.filter((p) => p.status === "Solved").length;
      const percentage = Math.round((solved / total) * 100);
      return {
        topic: topicName,
        solved,
        total,
        percentage,
      };
    });

    // Difficulty breakdown
    const easyCount = solvedList.filter((p) => p.difficulty === "Easy").length;
    const mediumCount = solvedList.filter((p) => p.difficulty === "Medium").length;
    const hardCount = solvedList.filter((p) => p.difficulty === "Hard").length;

    // Company distribution
    const companyDistribution = COMPANIES_LIST.map((comp) => {
      const count = solvedList.filter((p) => p.company === comp).length;
      return { company: comp, count };
    });

    return {
      totalTracked,
      solvedCount,
      thisWeekCount,
      revisionPendingCount,
      topicProgress,
      difficultyBreakdown: {
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount,
      },
      companyDistribution,
    };
  },

  addProblem: async (problemData) => {
    await new Promise((res) => setTimeout(res, 120));
    const problems = dsaService.getProblemsData();

    // Check for duplicate platform + externalProblemId
    const platform = problemData.platform || "leetcode";
    const externalId = problemData.externalProblemId || String(Date.now());

    const duplicate = problems.find(
      (p) => p.platform === platform && p.externalProblemId === externalId
    );

    if (duplicate) {
      throw new Error(`Problem #${externalId} on ${platform} is already tracked.`);
    }

    const newProblem = {
      id: `p-${Date.now()}`,
      userId: "user-current",
      platform,
      externalProblemId: externalId,
      slug: problemData.slug || problemData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: problemData.title,
      topic: problemData.topic || "Arrays",
      difficulty: problemData.difficulty || "Easy",
      company: problemData.company || "LeetCode",
      status: problemData.status || "Tracked",
      bookmarked: !!problemData.bookmarked,
      addedAt: new Date().toISOString().split("T")[0],
      solvedAt: problemData.status === "Solved" ? new Date().toISOString().split("T")[0] : null,
      revisionDueAt: problemData.revisionDueAt || null,
      notes: problemData.notes || "",
    };

    const updated = [newProblem, ...problems];
    dsaService.saveProblemsData(updated);
    return { problems: updated, newProblem };
  },

  updateProblem: async (id, updates) => {
    await new Promise((res) => setTimeout(res, 100));
    const problems = dsaService.getProblemsData();

    const updated = problems.map((p) => {
      if (p.id === id) {
        const nextStatus = updates.status !== undefined ? updates.status : p.status;
        const newlySolved = p.status !== "Solved" && nextStatus === "Solved";

        return {
          ...p,
          ...updates,
          status: nextStatus,
          solvedAt: newlySolved
            ? new Date().toISOString().split("T")[0]
            : p.solvedAt,
        };
      }
      return p;
    });

    dsaService.saveProblemsData(updated);
    return updated;
  },

  deleteProblem: async (id) => {
    await new Promise((res) => setTimeout(res, 100));
    const problems = dsaService.getProblemsData();
    const updated = problems.filter((p) => p.id !== id);
    dsaService.saveProblemsData(updated);
    return updated;
  },

  toggleBookmark: async (id) => {
    const problems = dsaService.getProblemsData();
    const updated = problems.map((p) =>
      p.id === id ? { ...p, bookmarked: !p.bookmarked } : p
    );
    dsaService.saveProblemsData(updated);
    return updated;
  },

  markRevised: async (id) => {
    const problems = dsaService.getProblemsData();
    const nextRevisionDate = new Date();
    nextRevisionDate.setDate(nextRevisionDate.getDate() + 14); // 2 weeks later

    const updated = problems.map((p) =>
      p.id === id
        ? {
            ...p,
            status: "Solved",
            lastRevisedAt: new Date().toISOString().split("T")[0],
            revisionDueAt: nextRevisionDate.toISOString().split("T")[0],
          }
        : p
    );
    dsaService.saveProblemsData(updated);
    return updated;
  },
};

export default dsaService;
