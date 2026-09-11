import { useState, useEffect } from "react";
import studyPlannerService from "../services/studyPlannerService";
import PlannerHeader from "../components/studyPlanner/PlannerHeader";
import TopStats from "../components/studyPlanner/TopStats";
import ViewAndDateBar from "../components/studyPlanner/ViewAndDateBar";
import TimelineSchedule from "../components/studyPlanner/TimelineSchedule";
import AddTaskModal from "../components/studyPlanner/AddTaskModal";
import AIPlanGeneratorCard from "../components/studyPlanner/AIPlanGeneratorCard";
import TodaysGoalsCard from "../components/studyPlanner/TodaysGoalsCard";
import FocusModeCard from "../components/studyPlanner/FocusModeCard";
import MiniCalendar from "../components/studyPlanner/MiniCalendar";
import UpcomingDeadlinesCard from "../components/studyPlanner/UpcomingDeadlinesCard";
import StudyTipCard from "../components/studyPlanner/StudyTipCard";
import WeekView from "../components/studyPlanner/WeekView";
import MonthView from "../components/studyPlanner/MonthView";

export default function StudyPlanner() {
  // Global State
  const [selectedDate, setSelectedDate] = useState("2026-09-11");
  const [viewMode, setViewMode] = useState("today"); // "today" | "week" | "month"

  // Data State
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  // Modal State
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load initial data from service
  useEffect(() => {
    setTasks(studyPlannerService.getTasks());
    setGoals(studyPlannerService.getGoals());
    setDeadlines(studyPlannerService.getDeadlines());
  }, []);

  // Task Handlers
  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      // Edit existing task
      const updated = studyPlannerService.updateTask(taskData.id, taskData);
      setTasks(updated);
    } else {
      // Add new task
      const { tasks: updated } = studyPlannerService.addTask(taskData);
      setTasks(updated);
    }
  };

  const handleToggleTaskComplete = (taskId) => {
    const updated = studyPlannerService.toggleTaskComplete(taskId);
    setTasks(updated);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updated = studyPlannerService.deleteTask(taskId);
      setTasks(updated);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setAddTaskModalOpen(true);
  };

  const handleOpenNewTaskModal = () => {
    setEditingTask(null);
    setAddTaskModalOpen(true);
  };

  // Goals Handlers
  const handleToggleGoalComplete = (goalId) => {
    const updated = studyPlannerService.toggleGoalComplete(goalId);
    setGoals(updated);
  };

  const handleAddGoal = (goalData) => {
    const { goals: updated } = studyPlannerService.addGoal(goalData);
    setGoals(updated);
  };

  const handleUpdateGoal = (goalId, updates) => {
    const updated = studyPlannerService.updateGoal(goalId, updates);
    setGoals(updated);
  };

  const handleDeleteGoal = (goalId) => {
    const updated = studyPlannerService.deleteGoal(goalId);
    setGoals(updated);
  };

  // Deadlines Handlers
  const handleAddDeadline = (deadlineData) => {
    const { deadlines: updated } = studyPlannerService.addDeadline(deadlineData);
    setDeadlines(updated);
  };

  const handleToggleDeadlineComplete = (deadlineId) => {
    const updated = studyPlannerService.toggleDeadlineComplete(deadlineId);
    setDeadlines(updated);
  };

  const handleDeleteDeadline = (deadlineId) => {
    const updated = studyPlannerService.deleteDeadline(deadlineId);
    setDeadlines(updated);
  };

  // AI Plan Generator Handler
  const handleApplyGeneratedPlan = (generatedPlan) => {
    if (!generatedPlan || !generatedPlan.tasks) return;

    // Save generated tasks and goals to current state & persistence
    const existingTasks = studyPlannerService.getTasks();
    const updatedTasks = [...generatedPlan.tasks, ...existingTasks];
    studyPlannerService.saveTasks(updatedTasks);
    setTasks(updatedTasks);

    if (generatedPlan.goals && generatedPlan.goals.length > 0) {
      const existingGoals = studyPlannerService.getGoals();
      const updatedGoals = [...generatedPlan.goals, ...existingGoals];
      studyPlannerService.saveGoals(updatedGoals);
      setGoals(updatedGoals);
    }
  };

  // Focus Session Complete Handler
  const handleFocusSessionComplete = (minutes) => {
    // Add completed minutes to study goal progress
    const updatedGoals = goals.map((g) => {
      if (g.category === "Study") {
        const addedHours = Number((minutes / 60).toFixed(2));
        const nextCurrent = Number((g.current + addedHours).toFixed(2));
        return {
          ...g,
          current: nextCurrent,
          completed: nextCurrent >= g.target,
        };
      }
      return g;
    });
    studyPlannerService.saveGoals(updatedGoals);
    setGoals(updatedGoals);
  };

  return (
    <div className="w-full min-w-0 px-2 sm:px-4 py-4 space-y-6">
      {/* 1. Top Header with Breadcrumbs & Motivational Banner */}
      <PlannerHeader />

      {/* 2. Top Summary Statistics Cards */}
      <TopStats tasks={tasks} goals={goals} streakDays={12} />

      {/* 3. View Switcher (Today/Week/Month) & Date Navigation Controls */}
      <ViewAndDateBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onOpenAddTask={handleOpenNewTaskModal}
      />

      {/* 4. Main Workspace Layout */}
      {viewMode === "week" ? (
        <WeekView
          tasks={tasks}
          onOpenAddTask={handleOpenNewTaskModal}
          onSelectDate={setSelectedDate}
        />
      ) : viewMode === "month" ? (
        <MonthView
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          tasks={tasks}
        />
      ) : (
        /* Today's View: 3 Columns matching reference screenshot */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
          {/* Column 1: Today's Schedule (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm">
              <h3 className="mb-4 text-base font-bold text-white">Today&apos;s Schedule</h3>
              <TimelineSchedule
                tasks={tasks}
                selectedDate={selectedDate}
                onToggleComplete={handleToggleTaskComplete}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onOpenAddTask={handleOpenNewTaskModal}
              />
            </div>
          </div>

          {/* Column 2: AI Study Plan Generator + Today's Goals + Focus Mode (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <AIPlanGeneratorCard
              onApplyGeneratedPlan={handleApplyGeneratedPlan}
            />

            <TodaysGoalsCard
              goals={goals}
              onToggleGoalComplete={handleToggleGoalComplete}
              onAddGoal={handleAddGoal}
              onUpdateGoal={handleUpdateGoal}
              onDeleteGoal={handleDeleteGoal}
            />

            <FocusModeCard
              onFocusSessionComplete={handleFocusSessionComplete}
            />
          </div>

          {/* Column 3: Calendar + Deadlines + Study Tip (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6 min-w-0">
            <MiniCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              tasks={tasks}
            />

            <UpcomingDeadlinesCard
              deadlines={deadlines}
              onAddDeadline={handleAddDeadline}
              onToggleDeadlineComplete={handleToggleDeadlineComplete}
              onDeleteDeadline={handleDeleteDeadline}
            />

            <StudyTipCard />
          </div>
        </div>
      )}

      {/* Add / Edit Task Modal */}
      <AddTaskModal
        open={addTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
        onSaveTask={handleSaveTask}
        editingTask={editingTask}
        initialDate={selectedDate}
      />
    </div>
  );
}
