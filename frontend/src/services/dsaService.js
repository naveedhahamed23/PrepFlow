import api from "./api";

function mapProblem(problem) {
  return {
    ...problem,
    company: problem.companies?.[0] || "Uncategorized",
    solvedAt: problem.solvedOn || null,
    revisionDueAt: problem.revisionDate || null,
    bookmarked: Boolean(problem.bookmarked),
  };
}

function buildProblemPayload(problemData) {
  const isSolved = (problemData.status || "Tracked") === "Solved";
  return {
    title: problemData.title,
    topic: problemData.topic || "Uncategorized",
    difficulty: problemData.difficulty || "Easy",
    status: problemData.status || "Tracked",
    companies: problemData.companies || (problemData.company ? [problemData.company] : []),
    revisionDate: problemData.revisionDueAt ?? problemData.revisionDate ?? null,
    solvedOn: problemData.solvedAt ?? problemData.solvedOn ?? (isSolved ? new Date().toISOString().slice(0, 10) : null),
    timeTaken: problemData.timeTaken ?? null,
    notes: problemData.notes || "",
    url: problemData.url || null,
    bookmarked: Boolean(problemData.bookmarked),
  };
}

const dsaService = {
  getProblems: async (filters = {}) => {
    const params = {};
    for (const key of ["search", "topic", "difficulty", "company"]) {
      if (filters[key] && filters[key] !== "All") params[key] = filters[key];
    }
    if (filters.status && filters.status !== "All" && filters.status !== "Revision Pending") {
      params.status = filters.status;
    }

    const { data } = await api.get("/dsa/problems", { params });
    let problems = data.map(mapProblem);

    if (filters.status === "Revision Pending" || filters.revisionOnly) {
      const today = new Date();
      problems = problems.filter((problem) =>
        problem.revisionDueAt && new Date(`${problem.revisionDueAt}T00:00:00`) <= today
      );
    }

    if (filters.bookmarkedOnly) problems = problems.filter((problem) => problem.bookmarked);
    return problems;
  },

  getCatalog: async ({ topic, search, difficulty, company } = {}) => {
    const path = topic && topic !== "All"
      ? `/dsa/catalog/topic/${encodeURIComponent(topic)}`
      : "/dsa/catalog";
    const { data } = await api.get(path);
    return data.filter((problem) =>
      (!search || problem.title.toLowerCase().includes(search.toLowerCase())) &&
      (!difficulty || difficulty === "All" || problem.difficulty === difficulty) &&
      (!company || company === "All" || problem.companies?.includes(company))
    );
  },

  getDSAStats: async () => {
    const { data } = await api.get("/dsa/stats");
    return {
      ...data,
      topicProgress: (data.topicProgress || []).map((item) => ({
        ...item,
        percentage: item.total > 0 ? Math.round((item.solved / item.total) * 100) : 0,
      })),
      companyDistribution: data.companyDistribution || [],
    };
  },

  addProblem: async (problemData) => {
    const { data } = await api.post("/dsa/problems", buildProblemPayload(problemData));
    return { problems: [mapProblem(data)], newProblem: mapProblem(data) };
  },

  trackCatalogProblem: async (catalogProblem) => dsaService.addProblem({
    ...catalogProblem,
    companies: catalogProblem.companies || [],
    status: "Tracked",
  }),

  updateProblem: async (id, updates) => {
    const payload = {};
    const fields = {
      title: updates.title,
      topic: updates.topic,
      difficulty: updates.difficulty,
      status: updates.status,
      companies: updates.companies ?? (updates.company ? [updates.company] : undefined),
      revisionDate: Object.hasOwn(updates, "revisionDueAt") ? updates.revisionDueAt : updates.revisionDate,
      solvedOn: Object.hasOwn(updates, "solvedAt") ? updates.solvedAt : updates.solvedOn,
      timeTaken: updates.timeTaken,
      notes: updates.notes,
      url: updates.url,
      bookmarked: updates.bookmarked,
    };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) payload[key] = value;
    }
    const { data } = await api.put(`/dsa/problems/${id}`, payload);
    return mapProblem(data);
  },

  deleteProblem: async (id) => {
    await api.delete(`/dsa/problems/${id}`);
    return true;
  },

  toggleBookmark: async (id, currentValue) => {
    let bookmarked = currentValue;
    if (bookmarked === undefined) {
      const { data } = await api.get(`/dsa/problems/${id}`);
      bookmarked = data.bookmarked;
    }
    return dsaService.updateProblem(id, { bookmarked: !bookmarked });
  },

  markRevised: async (id) => {
    const nextRevisionDate = new Date();
    nextRevisionDate.setDate(nextRevisionDate.getDate() + 14);
    return dsaService.updateProblem(id, {
      status: "Solved",
      solvedAt: new Date().toISOString().slice(0, 10),
      revisionDueAt: nextRevisionDate.toISOString().slice(0, 10),
    });
  },
};

export { mapProblem };
export default dsaService;
