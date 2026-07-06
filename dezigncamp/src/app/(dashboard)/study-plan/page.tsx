"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { mockStudyPlan, mockAnalytics } from "@/lib/mock-data";
import { Brain, Clock, Target, Zap, CheckCircle, Play, RefreshCw, TrendingUp, BookOpen } from "lucide-react";

const courseColors: Record<string, { bg: string; text: string; border: string }> = {
  "React & Next.js": { bg: "#0099ff20", text: "#0099ff", border: "#0099ff40" },
  "UI/UX Design": { bg: "#a855f720", text: "#a855f7", border: "#a855f740" },
  "Machine Learning": { bg: "#f9731620", text: "#f97316", border: "#f9731640" },
  "Data Structures": { bg: "#22c55e20", text: "#22c55e", border: "#22c55e40" },
};

function getCourseStyle(name: string) {
  for (const key of Object.keys(courseColors)) {
    if (name.includes(key)) return courseColors[key];
  }
  return { bg: "#99999920", text: "#999", border: "#99999940" };
}

export default function StudyPlanPage() {
  const [generating, setGenerating] = useState(false);
  const [activeDay, setActiveDay] = useState("Monday");
  const plan = mockStudyPlan;

  const totalMinutes = plan.dailySchedule
    .flatMap((d) => d.sessions)
    .reduce((acc, s) => acc + s.duration, 0);

  const handleRegenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const days = plan.dailySchedule.map((d) => d.day);
  const activeSchedule = plan.dailySchedule.find((d) => d.day === activeDay);

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Study Plan" subtitle="AI-generated weekly learning schedule" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* AI Header Card */}
        <div
          className="relative rounded-[20px] overflow-hidden p-6"
          style={{
            background: "linear-gradient(135deg, #1a0a2e 0%, #0a1628 50%, #001a33 100%)",
            border: "1px solid #a855f730",
          }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#a855f7] opacity-10 rounded-full translate-x-16 -translate-y-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0099ff] opacity-10 rounded-full -translate-x-8 translate-y-8 pointer-events-none" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#a855f7] to-[#0099ff] rounded-[16px] flex items-center justify-center">
                <Brain size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-white mb-1">AI Study Plan</h2>
                <p className="text-[14px] text-[#999]">
                  Generated on {new Date(plan.generatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                  <span className="text-[12px] text-[#22c55e] font-medium">Active & Optimized</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleRegenerate}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-[#ffffff15] hover:bg-[#ffffff20] rounded-[100px] text-[13px] font-medium text-white transition-colors disabled:opacity-60"
            >
              <RefreshCw size={14} className={generating ? "animate-spin" : ""} />
              {generating ? "Generating..." : "Regenerate"}
            </button>
          </div>

          {/* Stats row */}
          <div className="relative grid grid-cols-4 gap-4 mt-6">
            {[
              { label: "Weekly Goal", value: `${plan.weeklyGoalHours}h`, icon: Target, color: "#0099ff" },
              { label: "Planned Sessions", value: `${plan.dailySchedule.flatMap((d) => d.sessions).length}`, icon: Play, color: "#a855f7" },
              { label: "Study Days", value: `${plan.dailySchedule.length}`, icon: Clock, color: "#f97316" },
              { label: "Avg/Day", value: `${Math.round(totalMinutes / plan.dailySchedule.length)}m`, icon: TrendingUp, color: "#22c55e" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#ffffff08] rounded-[12px] p-3">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon size={14} style={{ color: stat.color }} />
                  <span className="text-[11px] text-[#666]">{stat.label}</span>
                </div>
                <p className="text-[20px] font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Weekly Schedule */}
          <div className="col-span-2 space-y-4">
            {/* Day selector */}
            <div className="flex gap-2">
              {days.map((day) => {
                const dayData = plan.dailySchedule.find((d) => d.day === day);
                const mins = dayData?.sessions.reduce((a, s) => a + s.duration, 0) || 0;
                return (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`flex-1 py-3 rounded-[12px] transition-colors text-center ${
                      activeDay === day
                        ? "bg-[#0099ff] text-white"
                        : "bg-[#141414] text-[#666] hover:text-white"
                    }`}
                  >
                    <p className="text-[11px] font-medium">{day.slice(0, 3)}</p>
                    <p className={`text-[13px] font-bold mt-0.5 ${activeDay === day ? "text-white" : "text-[#999]"}`}>
                      {Math.round(mins / 60)}h
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active day sessions */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-white">{activeDay}</h3>
                <span className="text-[13px] text-[#666]">
                  {activeSchedule?.sessions.reduce((a, s) => a + s.duration, 0)} min total
                </span>
              </div>

              <div className="space-y-3">
                {activeSchedule?.sessions.map((session, idx) => {
                  const style = getCourseStyle(session.courseName);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-[12px] border"
                      style={{ backgroundColor: style.bg, borderColor: style.border }}
                    >
                      <div className="text-center">
                        <p className="text-[13px] font-bold" style={{ color: style.text }}>
                          {session.startTime}
                        </p>
                        <p className="text-[11px] text-[#666] mt-0.5">{session.duration}m</p>
                      </div>
                      <div className="w-px h-10 bg-[#ffffff10]" />
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold text-white">{session.topic}</p>
                        <p className="text-[12px] mt-0.5" style={{ color: style.text }}>
                          {session.courseName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-medium text-white transition-colors"
                          style={{ backgroundColor: style.text }}
                        >
                          <Play size={10} />
                          Start
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Timeline visualization */}
              <div className="mt-5 pt-4 border-t border-[#1c1c1c]">
                <p className="text-[12px] text-[#666] mb-3">Daily Timeline</p>
                <div className="relative h-8 bg-[#1c1c1c] rounded-[8px] overflow-hidden">
                  {activeSchedule?.sessions.map((session, idx) => {
                    const colors = ["#0099ff", "#a855f7", "#f97316", "#22c55e"];
                    const startHour = parseInt(session.startTime.split(":")[0]);
                    const left = ((startHour - 8) / 12) * 100;
                    const width = (session.duration / 720) * 100;
                    return (
                      <div
                        key={idx}
                        className="absolute top-1 bottom-1 rounded-[4px] opacity-80"
                        style={{
                          left: `${Math.max(0, left)}%`,
                          width: `${width}%`,
                          backgroundColor: colors[idx % colors.length],
                        }}
                        title={session.topic}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"].map((t) => (
                    <span key={t} className="text-[10px] text-[#555]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-4">
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-[#f59e0b]" />
                <h3 className="text-[15px] font-semibold text-white">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                {plan.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#1c1c1c] rounded-[10px]">
                    <CheckCircle size={14} className="text-[#22c55e] mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] text-[#ccc] leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress to goal */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-[#0099ff]" />
                <h3 className="text-[15px] font-semibold text-white">Weekly Progress</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Hours Completed", current: 12, total: plan.weeklyGoalHours, color: "#0099ff" },
                  { label: "Sessions Done", current: 8, total: 14, color: "#a855f7" },
                  { label: "Study Streak", current: mockAnalytics.currentStreak, total: 14, color: "#f97316" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[12px] text-[#999]">{item.label}</span>
                      <span className="text-[12px] font-medium text-white">
                        {item.current}/{item.total}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#1c1c1c] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min((item.current / item.total) * 100, 100)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course focus distribution */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-[#a855f7]" />
                <h3 className="text-[15px] font-semibold text-white">Focus Distribution</h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Machine Learning", pct: 35, color: "#f97316" },
                  { name: "React & Next.js", pct: 30, color: "#0099ff" },
                  { name: "UI/UX Design", pct: 25, color: "#a855f7" },
                  { name: "Other", pct: 10, color: "#666" },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[12px] text-[#999]">{item.name}</span>
                      <span className="text-[12px] font-medium text-white">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1c1c1c] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
