"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { Clock, BookOpen, Video, FileText, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface ScheduleEvent {
  id: string;
  title: string;
  course: string;
  type: "lecture" | "assignment" | "exam" | "study" | "gdb";
  day: number; // 0=Mon ... 6=Sun
  startSlot: number; // index in timeSlots
  duration: number; // number of slots
  color: string;
}

const mockSchedule: ScheduleEvent[] = [
  { id: "s1", title: "React Hooks Lecture", course: "React & Next.js", type: "lecture", day: 0, startSlot: 1, duration: 2, color: "#0099ff" },
  { id: "s2", title: "ML Study Session", course: "Machine Learning", type: "study", day: 0, startSlot: 6, duration: 1, color: "#f97316" },
  { id: "s3", title: "UI/UX Design Lab", course: "UI/UX Design", type: "lecture", day: 1, startSlot: 2, duration: 2, color: "#a855f7" },
  { id: "s4", title: "ML Gradient Descent", course: "Machine Learning", type: "study", day: 1, startSlot: 7, duration: 1, color: "#f97316" },
  { id: "s5", title: "Next.js App Router", course: "React & Next.js", type: "lecture", day: 2, startSlot: 1, duration: 2, color: "#0099ff" },
  { id: "s6", title: "Usability Testing", course: "UI/UX Design", type: "study", day: 2, startSlot: 6, duration: 1, color: "#a855f7" },
  { id: "s7", title: "Neural Networks Deep Dive", course: "Machine Learning", type: "lecture", day: 3, startSlot: 1, duration: 3, color: "#f97316" },
  { id: "s8", title: "Performance Optimization", course: "React & Next.js", type: "study", day: 3, startSlot: 7, duration: 1, color: "#0099ff" },
  { id: "s9", title: "Design System Workshop", course: "UI/UX Design", type: "lecture", day: 4, startSlot: 2, duration: 2, color: "#a855f7" },
  { id: "s10", title: "ML Evaluation Metrics", course: "Machine Learning", type: "study", day: 4, startSlot: 6, duration: 1, color: "#f97316" },
  { id: "s11", title: "React Project Work", course: "React & Next.js", type: "assignment", day: 5, startSlot: 2, duration: 3, color: "#0099ff" },
  { id: "s12", title: "Mid-Term Quiz", course: "React & Next.js", type: "exam", day: 6, startSlot: 2, duration: 2, color: "#ef4444" },
];

const typeIcons: Record<string, React.ElementType> = {
  lecture: Video,
  study: BookOpen,
  assignment: FileText,
  exam: Clock,
  gdb: MessageSquare,
};

const typeLabels: Record<string, string> = {
  lecture: "Lecture",
  study: "Study",
  assignment: "Assignment",
  exam: "Exam",
  gdb: "GDB",
};

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [view, setView] = useState<"week" | "day">("week");

  const getWeekLabel = () => {
    const now = new Date();
    now.setDate(now.getDate() + weekOffset * 7);
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay() + 1);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Schedule" subtitle="Your weekly class and study timetable" />

      <div className="flex-1 overflow-hidden flex flex-col p-6 gap-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="w-8 h-8 bg-[#141414] hover:bg-[#1c1c1c] rounded-[8px] flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={14} className="text-[#999]" />
            </button>
            <span className="text-[14px] font-medium text-white min-w-[200px] text-center">
              {getWeekLabel()}
            </span>
            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="w-8 h-8 bg-[#141414] hover:bg-[#1c1c1c] rounded-[8px] flex items-center justify-center transition-colors"
            >
              <ChevronRight size={14} className="text-[#999]" />
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              className="px-3 py-1.5 bg-[#141414] hover:bg-[#1c1c1c] rounded-[8px] text-[12px] text-[#999] hover:text-white transition-colors"
            >
              Today
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3">
            {[
              { type: "lecture", color: "#0099ff" },
              { type: "study", color: "#22c55e" },
              { type: "assignment", color: "#f59e0b" },
              { type: "exam", color: "#ef4444" },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-[#666] capitalize">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="flex-1 bg-[#141414] rounded-[20px] overflow-hidden">
          <div className="flex h-full">
            {/* Time column */}
            <div className="w-16 flex-shrink-0 border-r border-[#1c1c1c]">
              <div className="h-10 border-b border-[#1c1c1c]" />
              {timeSlots.map((t, i) => (
                <div key={i} className="h-14 border-b border-[#1c1c1c] flex items-start justify-end pr-2 pt-1">
                  <span className="text-[10px] text-[#555]">{t}</span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex min-w-0">
                {weekDays.map((day, dayIdx) => (
                  <div key={day} className="flex-1 min-w-[100px] border-r border-[#1c1c1c] last:border-r-0">
                    {/* Day header */}
                    <div className="h-10 border-b border-[#1c1c1c] flex items-center justify-center">
                      <span className="text-[12px] font-medium text-[#999]">{day}</span>
                    </div>

                    {/* Slots */}
                    <div className="relative">
                      {timeSlots.map((_, slotIdx) => (
                        <div
                          key={slotIdx}
                          className="h-14 border-b border-[#1a1a1a]"
                        />
                      ))}

                      {/* Events overlaid */}
                      {mockSchedule
                        .filter((e) => e.day === dayIdx)
                        .map((event) => {
                          const Icon = typeIcons[event.type] || BookOpen;
                          return (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className="absolute left-0.5 right-0.5 rounded-[6px] px-1.5 pt-1 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                              style={{
                                top: `${event.startSlot * 56}px`,
                                height: `${event.duration * 56 - 2}px`,
                                backgroundColor: `${event.color}25`,
                                borderLeft: `3px solid ${event.color}`,
                              }}
                            >
                              <div className="flex items-center gap-1 mb-0.5">
                                <Icon size={9} style={{ color: event.color }} />
                                <span className="text-[9px] font-medium" style={{ color: event.color }}>
                                  {typeLabels[event.type]}
                                </span>
                              </div>
                              <p className="text-[10px] font-semibold text-white leading-tight line-clamp-2">
                                {event.title}
                              </p>
                              {event.duration > 1 && (
                                <p className="text-[9px] text-[#666] mt-0.5 truncate">{event.course}</p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Event Detail */}
        {selectedEvent && (
          <div
            className="fixed bottom-6 right-6 w-72 rounded-[16px] p-4 shadow-2xl border"
            style={{
              backgroundColor: "#141414",
              borderColor: `${selectedEvent.color}40`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={{ backgroundColor: `${selectedEvent.color}25` }}
              >
                {(() => {
                  const Icon = typeIcons[selectedEvent.type] || BookOpen;
                  return <Icon size={14} style={{ color: selectedEvent.color }} />;
                })()}
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[#555] hover:text-white text-[18px] leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-[15px] font-bold text-white mb-1">{selectedEvent.title}</p>
            <p className="text-[12px] text-[#666] mb-3">{selectedEvent.course}</p>
            <div className="flex items-center gap-3">
              <span
                className="px-2 py-0.5 rounded-[100px] text-[11px] font-medium capitalize"
                style={{
                  backgroundColor: `${selectedEvent.color}20`,
                  color: selectedEvent.color,
                }}
              >
                {typeLabels[selectedEvent.type]}
              </span>
              <span className="text-[11px] text-[#666]">
                {timeSlots[selectedEvent.startSlot]} – {timeSlots[Math.min(selectedEvent.startSlot + selectedEvent.duration, timeSlots.length - 1)]}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
