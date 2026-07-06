"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { mockTodos } from "@/lib/mock-data";
import type { Todo } from "@/types";
import { Plus, CheckCircle, Circle, Trash2, Flag, Calendar, BookOpen, Filter } from "lucide-react";

const priorityConfig = {
  high: { color: "#ef4444", bg: "#ef444420", label: "High" },
  medium: { color: "#f59e0b", bg: "#f59e0b20", label: "Medium" },
  low: { color: "#22c55e", bg: "#22c55e20", label: "Low" },
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");
  const [newDue, setNewDue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const addTodo = () => {
    if (!newTitle.trim()) return;
    const todo: Todo = {
      id: `t${Date.now()}`,
      title: newTitle,
      priority: newPriority,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: newDue || undefined,
    };
    setTodos((prev) => [todo, ...prev]);
    setNewTitle("");
    setNewDue("");
    setShowAddForm(false);
  };

  const filtered = todos.filter((t) => {
    const statusMatch =
      filter === "all" ? true : filter === "active" ? !t.completed : t.completed;
    const priorityMatch = priorityFilter === "all" ? true : t.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPct = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="To-Do List" subtitle="Track your daily tasks and goals" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Progress Overview */}
        <div className="bg-[#141414] rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[18px] font-bold text-white">Today's Progress</h3>
              <p className="text-[13px] text-[#666] mt-0.5">
                {completedCount} of {todos.length} tasks completed
              </p>
            </div>
            <div className="w-14 h-14 relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#1c1c1c" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="22" fill="none" stroke="#0099ff" strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${2 * Math.PI * 22 * (1 - progressPct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[13px] font-bold text-white">{progressPct}%</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Pending", count: todos.filter((t) => !t.completed).length, color: "#f59e0b" },
              { label: "Completed", count: completedCount, color: "#22c55e" },
              { label: "Overdue", count: todos.filter((t) => !t.completed && isOverdue(t.dueDate)).length, color: "#ef4444" },
            ].map((s) => (
              <div key={s.label} className="bg-[#1c1c1c] rounded-[12px] px-3 py-2.5 text-center">
                <p className="text-[20px] font-bold" style={{ color: s.color }}>{s.count}</p>
                <p className="text-[11px] text-[#666] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add new + Filters */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0099ff] hover:bg-[#0080dd] rounded-[100px] text-[13px] font-medium text-white transition-colors"
          >
            <Plus size={14} />
            Add Task
          </button>

          <div className="flex items-center gap-1 bg-[#141414] rounded-[100px] p-1">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-[100px] text-[12px] font-medium capitalize transition-colors ${
                  filter === f ? "bg-[#1c1c1c] text-white" : "text-[#666] hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#141414] rounded-[100px] p-1">
            <Filter size={12} className="text-[#666] ml-2" />
            {(["all", "high", "medium", "low"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1 rounded-[100px] text-[12px] font-medium capitalize transition-colors ${
                  priorityFilter === p ? "bg-[#1c1c1c] text-white" : "text-[#666] hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-[#141414] rounded-[16px] p-4 border border-[#0099ff40]">
            <p className="text-[13px] font-semibold text-[#0099ff] mb-3">New Task</p>
            <div className="flex gap-3 mb-3">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task title..."
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                className="flex-1 bg-[#1c1c1c] rounded-[10px] px-3 h-10 text-[14px] text-white placeholder-[#666] outline-none"
              />
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as "high" | "medium" | "low")}
                className="bg-[#1c1c1c] rounded-[10px] px-3 h-10 text-[13px] text-white outline-none"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input
                type="date"
                value={newDue}
                onChange={(e) => setNewDue(e.target.value)}
                className="bg-[#1c1c1c] rounded-[10px] px-3 h-10 text-[13px] text-white outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addTodo}
                className="px-4 py-2 bg-[#0099ff] hover:bg-[#0080dd] rounded-[8px] text-[13px] font-medium text-white transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#252525] rounded-[8px] text-[13px] font-medium text-[#999] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle size={32} className="text-[#333] mx-auto mb-3" />
              <p className="text-[15px] text-[#666]">No tasks match your filter</p>
            </div>
          )}

          {/* Priority groups */}
          {(["high", "medium", "low"] as const).map((priority) => {
            const group = filtered.filter((t) => t.priority === priority);
            if (group.length === 0) return null;
            const cfg = priorityConfig[priority];

            return (
              <div key={priority}>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <Flag size={12} style={{ color: cfg.color }} />
                  <span className="text-[12px] font-medium" style={{ color: cfg.color }}>
                    {cfg.label} Priority
                  </span>
                  <span className="text-[11px] text-[#555]">({group.length})</span>
                </div>

                <div className="space-y-2 mb-4">
                  {group.map((todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-center gap-4 p-4 rounded-[14px] border transition-all ${
                        todo.completed
                          ? "bg-[#0a0a0a] border-[#1a1a1a] opacity-60"
                          : "bg-[#141414] border-[#1c1c1c] hover:border-[#2a2a2a]"
                      }`}
                    >
                      <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0">
                        {todo.completed ? (
                          <CheckCircle size={20} className="text-[#22c55e]" />
                        ) : (
                          <Circle size={20} className="text-[#555] hover:text-[#999] transition-colors" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[14px] font-medium ${
                            todo.completed ? "text-[#666] line-through" : "text-white"
                          }`}
                        >
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className="text-[12px] text-[#666] mt-0.5 truncate">{todo.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5">
                          {todo.dueDate && (
                            <span
                              className={`flex items-center gap-1 text-[11px] ${
                                isOverdue(todo.dueDate) && !todo.completed
                                  ? "text-[#ef4444]"
                                  : "text-[#666]"
                              }`}
                            >
                              <Calendar size={10} />
                              {formatDate(todo.dueDate)}
                              {isOverdue(todo.dueDate) && !todo.completed && " (Overdue)"}
                            </span>
                          )}
                          {todo.courseId && (
                            <span className="flex items-center gap-1 text-[11px] text-[#555]">
                              <BookOpen size={10} />
                              Course task
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className="px-2 py-0.5 rounded-[100px] text-[10px] font-medium"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-[#444] hover:text-[#ef4444] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
