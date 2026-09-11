import {
  INITIAL_TASKS,
  INITIAL_GOALS,
  INITIAL_DEADLINES,
} from "../data/studyPlannerData";

const STORAGE_KEYS = {
  TASKS: "prepflow_planner_tasks_v1",
  GOALS: "prepflow_planner_goals_v1",
  DEADLINES: "prepflow_planner_deadlines_v1",
  PLANS: "prepflow_planner_plans_v1",
};

/**
 * Frontend Service Layer for Study Planner.
 * Isolated persistence layer (localStorage) ready to be wired to Spring Boot backend endpoints:
 * GET/POST/PUT/DELETE /api/study-planner/tasks
 * GET/POST/PUT/DELETE /api/study-planner/goals
 * GET/POST/PUT/DELETE /api/study-planner/deadlines
 */
export const studyPlannerService = {
  // --- TASKS ---
  getTasks: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading tasks from storage:", e);
    }
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  },

  saveTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error("Error saving tasks:", e);
    }
  },

  addTask: (taskData) => {
    const tasks = studyPlannerService.getTasks();
    const newTask = {
      id: `task-${Date.now()}`,
      completed: false,
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      duration: "1h",
      priority: "Medium",
      category: "DSA",
      ...taskData,
    };
    const updated = [newTask, ...tasks];
    studyPlannerService.saveTasks(updated);
    return { tasks: updated, newTask };
  },

  updateTask: (taskId, updates) => {
    const tasks = studyPlannerService.getTasks();
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t));
    studyPlannerService.saveTasks(updated);
    return updated;
  },

  deleteTask: (taskId) => {
    const tasks = studyPlannerService.getTasks();
    const updated = tasks.filter((t) => t.id !== taskId);
    studyPlannerService.saveTasks(updated);
    return updated;
  },

  toggleTaskComplete: (taskId) => {
    const tasks = studyPlannerService.getTasks();
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    studyPlannerService.saveTasks(updated);
    return updated;
  },

  // --- GOALS ---
  getGoals: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading goals:", e);
    }
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(INITIAL_GOALS));
    return INITIAL_GOALS;
  },

  saveGoals: (goals) => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch (e) {
      console.error("Error saving goals:", e);
    }
  },

  addGoal: (goalData) => {
    const goals = studyPlannerService.getGoals();
    const newGoal = {
      id: `goal-${Date.now()}`,
      title: goalData.title || "New Goal",
      target: Number(goalData.target) || 1,
      current: Number(goalData.current) || 0,
      unit: goalData.unit || "tasks",
      category: goalData.category || "DSA",
      completed: false,
    };
    const updated = [...goals, newGoal];
    studyPlannerService.saveGoals(updated);
    return { goals: updated, newGoal };
  },

  updateGoal: (goalId, updates) => {
    const goals = studyPlannerService.getGoals();
    const updated = goals.map((g) => (g.id === goalId ? { ...g, ...updates } : g));
    studyPlannerService.saveGoals(updated);
    return updated;
  },

  deleteGoal: (goalId) => {
    const goals = studyPlannerService.getGoals();
    const updated = goals.filter((g) => g.id !== goalId);
    studyPlannerService.saveGoals(updated);
    return updated;
  },

  toggleGoalComplete: (goalId) => {
    const goals = studyPlannerService.getGoals();
    const updated = goals.map((g) => {
      if (g.id === goalId) {
        const nextCompleted = !g.completed;
        return {
          ...g,
          completed: nextCompleted,
          current: nextCompleted ? g.target : 0,
        };
      }
      return g;
    });
    studyPlannerService.saveGoals(updated);
    return updated;
  },

  // --- DEADLINES ---
  getDeadlines: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEADLINES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading deadlines:", e);
    }
    localStorage.setItem(STORAGE_KEYS.DEADLINES, JSON.stringify(INITIAL_DEADLINES));
    return INITIAL_DEADLINES;
  },

  saveDeadlines: (deadlines) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEADLINES, JSON.stringify(deadlines));
    } catch (e) {
      console.error("Error saving deadlines:", e);
    }
  },

  addDeadline: (deadlineData) => {
    const deadlines = studyPlannerService.getDeadlines();
    const newDeadline = {
      id: `dead-${Date.now()}`,
      title: deadlineData.title || "New Deadline",
      category: deadlineData.category || "DSA",
      dueDate: deadlineData.dueDate || new Date().toISOString().split("T")[0],
      daysLeft: Number(deadlineData.daysLeft) || 5,
      completed: false,
    };
    const updated = [...deadlines, newDeadline];
    studyPlannerService.saveDeadlines(updated);
    return { deadlines: updated, newDeadline };
  },

  deleteDeadline: (deadlineId) => {
    const deadlines = studyPlannerService.getDeadlines();
    const updated = deadlines.filter((d) => d.id !== deadlineId);
    studyPlannerService.saveDeadlines(updated);
    return updated;
  },

  toggleDeadlineComplete: (deadlineId) => {
    const deadlines = studyPlannerService.getDeadlines();
    const updated = deadlines.map((d) =>
      d.id === deadlineId ? { ...d, completed: !d.completed } : d
    );
    studyPlannerService.saveDeadlines(updated);
    return updated;
  },
};

export default studyPlannerService;
