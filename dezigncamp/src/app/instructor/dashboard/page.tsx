"use client";
import TopBar from "@/components/layout/TopBar";
import { Users, BookOpen, TrendingUp, Star, Clock, FileText, MessageSquare, CheckCircle, Plus, BarChart2, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Total Students", value: "248", change: "+12 this week", icon: Users, color: "#0099ff" },
  { label: "Active Courses", value: "6", change: "2 in progress", icon: BookOpen, color: "#a855f7" },
  { label: "Avg. Completion", value: "73%", change: "+5% this month", icon: TrendingUp, color: "#22c55e" },
  { label: "Course Rating", value: "4.8", change: "from 124 reviews", icon: Star, color: "#f59e0b" },
];

const enrollmentData = [
  { month: "Jan", students: 18 },
  { month: "Feb", students: 24 },
  { month: "Mar", students: 31 },
  { month: "Apr", students: 28 },
  { month: "May", students: 42 },
  { month: "Jun", students: 38 },
  { month: "Jul", students: 47 },
];

const completionTrend = [
  { week: "W1", pct: 62 },
  { week: "W2", pct: 68 },
  { week: "W3", pct: 71 },
  { week: "W4", pct: 73 },
];

const recentStudents = [
  { name: "Alex Johnson", course: "Advanced UI/UX Design", progress: 75, status: "active" },
  { name: "Maria Garcia", course: "React & Next.js", progress: 88, status: "active" },
  { name: "David Kim", course: "Machine Learning", progress: 34, status: "struggling" },
  { name: "Sophie Chen", course: "Advanced UI/UX Design", progress: 100, status: "completed" },
  { name: "James Wilson", course: "Data Structures", progress: 60, status: "active" },
];

const pendingTasks = [
  { type: "grade", title: "Grade Design System Assignment", course: "UI/UX Design", count: 12, priority: "high" },
  { type: "review", title: "Review GDB responses", course: "React & Next.js", count: 8, priority: "medium" },
  { type: "upload", title: "Upload Lecture 15 Video", course: "Machine Learning", count: 1, priority: "high" },
  { type: "announce", title: "Post quiz announcement", course: "UI/UX Design", count: 1, priority: "low" },
];

const courses = [
  { id: "c1", title: "Advanced UI/UX Design Fundamentals", students: 87, completion: 71, rating: 4.9, status: "active" },
  { id: "c2", title: "React & Next.js Development", students: 64, completion: 68, rating: 4.7, status: "active" },
  { id: "c3", title: "Machine Learning with Python", students: 52, completion: 45, rating: 4.6, status: "active" },
  { id: "c4", title: "Data Structures & Algorithms", students: 45, completion: 100, rating: 5.0, status: "completed" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-[8px] px-3 py-2">
      <p className="text-[12px] text-[#999]">{label}</p>
      <p className="text-[14px] font-bold text-white">{payload[0].value}{payload[0].name === "pct" ? "%" : ""}</p>
    </div>
  );
};

export default function InstructorDashboardPage() {
  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Instructor Dashboard" subtitle="Manage your courses and track student progress" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#141414] rounded-[16px] p-4">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <span className="text-[11px] text-[#22c55e] font-medium">{stat.change}</span>
              </div>
              <p className="text-[28px] font-bold text-white">{stat.value}</p>
              <p className="text-[12px] text-[#666] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Charts */}
          <div className="col-span-2 space-y-4">
            {/* Enrollment chart */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-white">Student Enrollment</h3>
                <span className="text-[12px] text-[#666]">Past 7 months</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={enrollmentData} barSize={20}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="students" fill="#0099ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Completion trend */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-white">Completion Rate Trend</h3>
                <span className="text-[12px] text-[#22c55e] font-medium">↑ Improving</span>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={completionTrend}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} domain={[50, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="pct" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* My Courses */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-white">My Courses</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0099ff] hover:bg-[#0080dd] rounded-[8px] text-[12px] font-medium text-white transition-colors">
                  <Plus size={13} />
                  New Course
                </button>
              </div>
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-3 bg-[#1c1c1c] rounded-[12px]">
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #0099ff30, #a855f730)" }}
                    >
                      {course.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white truncate">{course.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-1 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${course.completion}%`, backgroundColor: course.completion === 100 ? "#22c55e" : "#0099ff" }}
                          />
                        </div>
                        <span className="text-[11px] text-[#666] flex-shrink-0">{course.completion}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-right flex-shrink-0">
                      <div>
                        <p className="text-[13px] font-semibold text-white">{course.students}</p>
                        <p className="text-[10px] text-[#666]">students</p>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#f59e0b]">★ {course.rating}</p>
                        <p className="text-[10px] text-[#666]">rating</p>
                      </div>
                      <button className="w-8 h-8 bg-[#2a2a2a] hover:bg-[#333] rounded-[8px] flex items-center justify-center transition-colors">
                        <Eye size={13} className="text-[#999]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Pending tasks */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white">Pending Actions</h3>
                <span className="w-5 h-5 bg-[#ef4444] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {pendingTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingTasks.map((task, idx) => {
                  const priorityColors = { high: "#ef4444", medium: "#f59e0b", low: "#666" };
                  const color = priorityColors[task.priority as keyof typeof priorityColors];
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#1c1c1c] rounded-[10px]">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white">{task.title}</p>
                        <p className="text-[11px] text-[#666] mt-0.5">{task.course}</p>
                      </div>
                      {task.count > 1 && (
                        <span className="text-[11px] font-bold text-white bg-[#2a2a2a] px-2 py-0.5 rounded-full">
                          {task.count}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent student activity */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[15px] font-semibold text-white mb-4">Student Activity</h3>
              <div className="space-y-3">
                {recentStudents.map((student, idx) => {
                  const statusColors = { active: "#0099ff", completed: "#22c55e", struggling: "#ef4444" };
                  const color = statusColors[student.status as keyof typeof statusColors];
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${color}60, ${color}30)` }}
                      >
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-white truncate">{student.name}</p>
                        <p className="text-[11px] text-[#666] truncate">{student.course.split(" ").slice(0, 2).join(" ")}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[12px] font-bold" style={{ color }}>{student.progress}%</p>
                        <p className="text-[10px] text-[#555] capitalize">{student.status}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 bg-[#1c1c1c] hover:bg-[#252525] rounded-[10px] text-[12px] text-[#666] hover:text-white transition-colors">
                View all students →
              </button>
            </div>

            {/* Quick actions */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[14px] font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: FileText, label: "New Assignment", color: "#0099ff" },
                  { icon: MessageSquare, label: "Post GDB", color: "#a855f7" },
                  { icon: BarChart2, label: "Analytics", color: "#22c55e" },
                  { icon: CheckCircle, label: "Grade Work", color: "#f59e0b" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-3 bg-[#1c1c1c] hover:bg-[#222] rounded-[10px] transition-colors"
                  >
                    <action.icon size={18} style={{ color: action.color }} />
                    <span className="text-[11px] text-[#999] text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
