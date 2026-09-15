const API_BASE_URL = "http://localhost:8081/api/dsa";

function getToken() {
  return localStorage.getItem("prepflow_token");
}

async function request(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const error = await response.json();
      message = error.message || error.error || message;
    } catch {
      // Response may not contain JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function mapProblem(problem) {
  return {
    ...problem,

    // Backend → frontend naming
    company:
      problem.companies?.length > 0
        ? problem.companies[0]
        : "Uncategorized",

    solvedAt: problem.solvedOn || null,

    revisionDueAt: problem.revisionDate || null,

    bookmarked: Boolean(problem.bookmarked),
  };
}

export const dsaService = {
  getProblems: async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.search) {
      params.set("search", filters.search);
    }

    if (filters.topic && filters.topic !== "All") {
      params.set("topic", filters.topic);
    }

    if (filters.difficulty && filters.difficulty !== "All") {
      params.set("difficulty", filters.difficulty);
    }

    if (
      filters.status &&
      filters.status !== "All" &&
      filters.status !== "Revision Pending"
    ) {
      params.set("status", filters.status);
    }

    if (filters.company && filters.company !== "All") {
      params.set("company", filters.company);
    }

    const query = params.toString();

    const data = await request(
      `/problems${query ? `?${query}` : ""}`
    );

    let problems = data.map(mapProblem);

    // These filters are not currently handled by the backend.
    if (filters.status === "Revision Pending" || filters.revisionOnly) {
      const today = new Date();

      problems = problems.filter(
        (problem) =>
          problem.revisionDueAt &&
          new Date(problem.revisionDueAt) <= today
      );
    }

    if (filters.bookmarkedOnly) {
      problems = problems.filter((problem) => problem.bookmarked);
    }

    return problems;
  },

  getDSAStats: async () => {
    const data = await request("/stats");

    return {
      ...data,

      topicProgress: (data.topicProgress || []).map((item) => ({
        ...item,
        percentage:
          item.total > 0
            ? Math.round((item.solved / item.total) * 100)
            : 0,
      })),

      companyDistribution: data.companyDistribution || [],
    };
  },

  addProblem: async (problemData) => {
    const payload = {
      title: problemData.title,
      topic: problemData.topic || "Uncategorized",
      difficulty: problemData.difficulty || "Easy",
      status: problemData.status || "Tracked",
      companies: problemData.company
        ? [problemData.company]
        : [],
      revisionDate: problemData.revisionDueAt || null,
      solvedOn: problemData.solvedAt || null,
      timeTaken: problemData.timeTaken || null,
      notes: problemData.notes || "",
      url: problemData.url || null,
      bookmarked: Boolean(problemData.bookmarked),
    };

    const created = await request("/problems", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      problems: [mapProblem(created)],
      newProblem: mapProblem(created),
    };
  },

  updateProblem: async (id, updates) => {
    const payload = {
      title: updates.title,
      topic: updates.topic,
      difficulty: updates.difficulty,
      status: updates.status,
      companies: updates.company
        ? [updates.company]
        : updates.companies,
      revisionDate:
        updates.revisionDueAt !== undefined
          ? updates.revisionDueAt
          : updates.revisionDate,
      solvedOn:
        updates.solvedAt !== undefined
          ? updates.solvedAt
          : updates.solvedOn,
      timeTaken: updates.timeTaken,
      notes: updates.notes,
      url: updates.url,
      bookmarked: updates.bookmarked,
    };

    // Remove undefined fields.
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    });

    const updated = await request(`/problems/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return mapProblem(updated);
  },

  deleteProblem: async (id) => {
    await request(`/problems/${id}`, {
      method: "DELETE",
    });

    return true;
  },

  toggleBookmark: async (id) => {
    const problems = await dsaService.getProblems();

    const target = problems.find((problem) => problem.id === id);

    if (!target) {
      throw new Error("Problem not found.");
    }

    return dsaService.updateProblem(id, {
      bookmarked: !target.bookmarked,
    });
  },

  markRevised: async (id) => {
    const nextRevisionDate = new Date();
    nextRevisionDate.setDate(
      nextRevisionDate.getDate() + 14
    );

    return dsaService.updateProblem(id, {
      status: "Solved",
      revisionDueAt: nextRevisionDate
        .toISOString()
        .split("T")[0],
    });
  },
};

export default dsaService;