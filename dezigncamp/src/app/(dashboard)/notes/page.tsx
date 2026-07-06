"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { FileText, Plus, Search, Trash2, Edit3, Tag, BookOpen, Clock, MoreHorizontal } from "lucide-react";

const mockNotes = [
  {
    id: "n001",
    title: "React Hooks Deep Dive",
    content: "useState manages local component state. useEffect handles side effects and lifecycle. useCallback memoizes functions to prevent unnecessary re-renders. useMemo caches expensive computations. useRef persists mutable values without triggering re-renders.",
    courseId: "c002",
    courseName: "React & Next.js Development",
    tags: ["hooks", "react", "performance"],
    createdAt: "2024-07-01T10:00:00",
    updatedAt: "2024-07-02T14:30:00",
    color: "#0099ff",
  },
  {
    id: "n002",
    title: "UI/UX Design Principles",
    content: "Hierarchy guides the eye. Contrast creates emphasis. Proximity groups related elements. Alignment creates order. Repetition builds unity. White space is not wasted space — it is a design element that provides breathing room and clarity.",
    courseId: "c001",
    courseName: "Advanced UI/UX Design",
    tags: ["design", "principles", "ux"],
    createdAt: "2024-06-28T09:00:00",
    updatedAt: "2024-06-29T11:00:00",
    color: "#a855f7",
  },
  {
    id: "n003",
    title: "Gradient Descent Algorithm",
    content: "Gradient descent minimizes a loss function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient. Learning rate controls the step size. Too high = overshooting. Too low = slow convergence.",
    courseId: "c004",
    courseName: "Machine Learning with Python",
    tags: ["ml", "optimization", "math"],
    createdAt: "2024-06-25T15:00:00",
    updatedAt: "2024-06-25T16:30:00",
    color: "#f97316",
  },
  {
    id: "n004",
    title: "Big O Notation Summary",
    content: "O(1) - constant. O(log n) - logarithmic (binary search). O(n) - linear (single loop). O(n log n) - linearithmic (merge sort). O(n²) - quadratic (nested loops). O(2ⁿ) - exponential. Always aim for the most efficient complexity possible.",
    courseId: "c003",
    courseName: "Data Structures & Algorithms",
    tags: ["complexity", "algorithms", "dsa"],
    createdAt: "2024-06-20T12:00:00",
    updatedAt: "2024-06-20T12:00:00",
    color: "#22c55e",
  },
  {
    id: "n005",
    title: "Figma Components Best Practices",
    content: "Use Auto Layout for responsive components. Create proper variants with properties. Use component properties for content swapping. Publish styles to the team library. Maintain consistent naming conventions. Always use 8px grid for spacing.",
    courseId: "c001",
    courseName: "Advanced UI/UX Design",
    tags: ["figma", "components", "design-system"],
    createdAt: "2024-07-03T08:00:00",
    updatedAt: "2024-07-03T08:00:00",
    color: "#ec4899",
  },
  {
    id: "n006",
    title: "Next.js App Router Overview",
    content: "App Router uses React Server Components by default. 'use client' directive for client components. Layout files wrap children routes. Loading.tsx for loading states. Error.tsx for error boundaries. Route groups with (folder) syntax.",
    courseId: "c002",
    courseName: "React & Next.js Development",
    tags: ["nextjs", "routing", "server-components"],
    createdAt: "2024-07-02T11:00:00",
    updatedAt: "2024-07-03T09:00:00",
    color: "#0099ff",
  },
];

const tagColors: Record<string, string> = {
  hooks: "#0099ff",
  react: "#61dafb",
  performance: "#22c55e",
  design: "#a855f7",
  principles: "#ec4899",
  ux: "#f59e0b",
  ml: "#f97316",
  optimization: "#ef4444",
  math: "#8b5cf6",
  complexity: "#22c55e",
  algorithms: "#0099ff",
  dsa: "#f59e0b",
  figma: "#ec4899",
  components: "#a855f7",
  "design-system": "#0099ff",
  nextjs: "#fff",
  routing: "#22c55e",
  "server-components": "#f97316",
};

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<typeof mockNotes[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" });

  const courses = Array.from(new Set(mockNotes.map((n) => n.courseName)));

  const filtered = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.includes(searchQuery.toLowerCase()));
    const matchesFilter =
      activeFilter === "all" || note.courseName === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const handleCreate = () => {
    if (!newNote.title.trim()) return;
    const created = {
      id: `n${Date.now()}`,
      title: newNote.title,
      content: newNote.content,
      courseId: "c001",
      courseName: "General",
      tags: newNote.tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color: "#0099ff",
    };
    setNotes((prev) => [created, ...prev]);
    setNewNote({ title: "", content: "", tags: "" });
    setIsCreating(false);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Notes" subtitle="Your personal knowledge base" />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Note List */}
        <div className="w-[340px] border-r border-[#1c1c1c] flex flex-col">
          {/* Search + New */}
          <div className="p-4 border-b border-[#1c1c1c] space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-[#141414] rounded-[10px] px-3 h-10">
                <Search size={14} className="text-[#666]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="bg-transparent flex-1 text-[14px] text-[#fff] placeholder-[#666] outline-none"
                />
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="w-10 h-10 bg-[#0099ff] hover:bg-[#0080dd] rounded-[10px] flex items-center justify-center transition-colors"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {["all", ...courses].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-[100px] text-[12px] font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter
                      ? "bg-[#0099ff] text-white"
                      : "bg-[#1c1c1c] text-[#999] hover:text-white"
                  }`}
                >
                  {filter === "all" ? "All Notes" : filter.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
          </div>

          {/* Notes list */}
          <div className="flex-1 overflow-y-auto">
            {isCreating && (
              <div className="p-4 border-b border-[#1c1c1c] bg-[#141414]">
                <p className="text-[12px] text-[#0099ff] font-medium mb-3">New Note</p>
                <input
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full bg-[#1c1c1c] rounded-[8px] px-3 py-2 text-[13px] text-white placeholder-[#666] outline-none mb-2"
                />
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Write your note..."
                  rows={3}
                  className="w-full bg-[#1c1c1c] rounded-[8px] px-3 py-2 text-[13px] text-white placeholder-[#666] outline-none resize-none mb-2"
                />
                <input
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  placeholder="Tags (comma separated)"
                  className="w-full bg-[#1c1c1c] rounded-[8px] px-3 py-2 text-[13px] text-white placeholder-[#666] outline-none mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreate}
                    className="flex-1 h-8 bg-[#0099ff] hover:bg-[#0080dd] rounded-[8px] text-[12px] font-medium text-white transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="flex-1 h-8 bg-[#1c1c1c] hover:bg-[#252525] rounded-[8px] text-[12px] font-medium text-[#999] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <p className="px-4 py-3 text-[12px] text-[#666]">
              {filtered.length} note{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`px-4 py-3 cursor-pointer border-b border-[#1c1c1c] transition-colors hover:bg-[#141414] ${
                  selectedNote?.id === note.id ? "bg-[#141414]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: note.color }}
                    />
                    <p className="text-[14px] font-medium text-white truncate">{note.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    className="text-[#555] hover:text-[#ef4444] transition-colors flex-shrink-0"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <p className="text-[12px] text-[#666] line-clamp-2 mb-2 ml-4">{note.content}</p>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-[11px] text-[#555]">{formatDate(note.updatedAt)}</span>
                  <span className="text-[11px] text-[#333]">·</span>
                  <span className="text-[11px] text-[#555] truncate">{note.courseName.split(" ").slice(0, 2).join(" ")}</span>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <FileText size={32} className="text-[#333] mb-3" />
                <p className="text-[14px] text-[#666]">No notes found</p>
                <p className="text-[12px] text-[#555] mt-1">Try a different search or create a new note</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel — Note Detail */}
        <div className="flex-1 flex flex-col">
          {selectedNote ? (
            <div className="flex flex-col h-full">
              {/* Note header */}
              <div className="p-6 border-b border-[#1c1c1c]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: selectedNote.color }}
                      />
                      <span className="text-[12px] text-[#666] flex items-center gap-1">
                        <BookOpen size={11} />
                        {selectedNote.courseName}
                      </span>
                    </div>
                    <h2 className="text-[24px] font-bold text-white">{selectedNote.title}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-[#141414] hover:bg-[#1c1c1c] rounded-[8px] flex items-center justify-center transition-colors">
                      <Edit3 size={14} className="text-[#999]" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedNote.id)}
                      className="w-8 h-8 bg-[#141414] hover:bg-[#2a0a0a] rounded-[8px] flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={14} className="text-[#ef4444]" />
                    </button>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666]">
                    <Clock size={12} />
                    <span>Updated {formatDate(selectedNote.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666]">
                    <Tag size={12} />
                    <span>Created {formatDate(selectedNote.createdAt)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-[100px] text-[11px] font-medium"
                      style={{
                        backgroundColor: `${tagColors[tag] || "#0099ff"}20`,
                        color: tagColors[tag] || "#0099ff",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Note content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-2xl">
                  <p className="text-[16px] text-[#ccc] leading-relaxed whitespace-pre-wrap">
                    {selectedNote.content}
                  </p>
                </div>
              </div>

              {/* AI Summary button */}
              <div className="p-6 border-t border-[#1c1c1c]">
                <div className="flex items-center gap-3 p-4 bg-[#141414] rounded-[12px] border border-[#1c1c1c]">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#a855f7] to-[#0099ff] rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[12px] font-bold">AI</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-white">AI Summary</p>
                    <p className="text-[12px] text-[#666]">Generate a concise summary of this note</p>
                  </div>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-[#a855f7] to-[#0099ff] rounded-[8px] text-[12px] font-medium text-white">
                    Summarize
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-[#141414] rounded-[20px] flex items-center justify-center mb-4">
                <FileText size={28} className="text-[#444]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#666] mb-2">Select a note to read</h3>
              <p className="text-[14px] text-[#444] mb-6">
                Choose a note from the list or create a new one
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0099ff] hover:bg-[#0080dd] rounded-[100px] text-[13px] font-medium text-white transition-colors"
              >
                <Plus size={14} />
                New Note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="border-t border-[#1c1c1c] px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-[#0099ff]" />
          <span className="text-[12px] text-[#666]">{notes.length} total notes</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-[#a855f7]" />
          <span className="text-[12px] text-[#666]">{courses.length} courses covered</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-[#f97316]" />
          <span className="text-[12px] text-[#666]">
            {Array.from(new Set(notes.flatMap((n) => n.tags))).length} unique tags
          </span>
        </div>
      </div>
    </div>
  );
}
