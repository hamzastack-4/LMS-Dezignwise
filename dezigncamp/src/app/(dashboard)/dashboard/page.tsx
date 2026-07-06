"use client";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockUser, mockCourses, mockAssignments, mockNotifications, mockTodos } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { BookOpen, Clock, TrendingUp, Flame, CheckCircle, AlertCircle, ChevronRight, Play, Brain } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label:"Active Courses", value:"4", icon:BookOpen, color:"#0099ff", bg:"#0c1a2e", sub:"1 completed" },
  { label:"Watch Time", value:"30h 40m", icon:Clock, color:"#a78bf5", bg:"#13104a", sub:"This semester" },
  { label:"Avg. Progress", value:"64%", icon:TrendingUp, color:"#22c55e", bg:"#052e16", sub:"All courses" },
  { label:"Study Streak", value:"7 days", icon:Flame, color:"#ff7a3d", bg:"#2d1900", sub:"Keep it going!" },
];

export default function DashboardPage() {
  const pending = mockAssignments.filter(a => a.status === "pending" || a.status === "overdue");
  const pendingTodos = mockTodos.filter(t => !t.completed);
  const active = mockCourses.filter(c => c.status === "active");

  return (
    <div>
      <TopBar title={`Welcome back, ${mockUser.name.split(" ")[0]} 👋`} subtitle={`${mockUser.department} · Semester ${mockUser.semester}`} />
      <div className="p-6 space-y-6 max-w-[1200px]">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="p-4">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3" style={{backgroundColor:s.bg}}>
                  <Icon className="w-4 h-4" style={{color:s.color}} />
                </div>
                <p className="text-[32px] font-medium text-white leading-none mb-1">{s.value}</p>
                <p className="text-[13px] font-medium text-white">{s.label}</p>
                <p className="text-[12px] text-[#999] mt-0.5">{s.sub}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-white tracking-tight">Continue Learning</h2>
              <Link href="/courses" className="text-[13px] text-[#0099ff] hover:opacity-80 flex items-center gap-1">
                All Courses <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {active.slice(0,3).map(course => (
                <Card key={course.id} className="p-4 hover:bg-[#1c1c1c] cursor-pointer group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[10px] bg-[#1c1c1c] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-[#999]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-[14px] font-medium text-white truncate">{course.title}</p>
                        <Badge>{course.category}</Badge>
                      </div>
                      <p className="text-[12px] text-[#999] mb-2">{course.instructorName}</p>
                      <ProgressBar value={course.progress} />
                      <p className="text-[12px] text-[#999] mt-1">{course.completedLectures}/{course.totalLectures} lectures</p>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <button className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shrink-0">
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            {/* AI Study Plan Teaser */}
            <Card variant="violet" className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-white/20 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white mb-1">AI Study Plan Ready</p>
                  <p className="text-[12px] text-white/70 mb-3">Personalised plan for this week — focus on ML and React today.</p>
                  <Link href="/study-plan"><Button variant="primary" size="sm">View Plan</Button></Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Assignments */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[22px] font-bold text-white tracking-tight">Assignments</h2>
                <Link href="/assignments" className="text-[13px] text-[#0099ff] flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></Link>
              </div>
              <div className="space-y-2">
                {pending.slice(0,4).map(a => (
                  <Card key={a.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.status==="overdue"?"bg-[#ff5577]":"bg-[#0099ff]"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-white leading-tight mb-0.5">{a.title}</p>
                        <p className="text-[12px] text-[#999]">Due {formatDate(a.dueDate)}</p>
                      </div>
                      {a.status==="overdue"
                        ? <AlertCircle className="w-3.5 h-3.5 text-[#ff5577] shrink-0 mt-0.5" />
                        : <Clock className="w-3.5 h-3.5 text-[#999] shrink-0 mt-0.5" />}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Todos */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[22px] font-bold text-white tracking-tight">Tasks</h2>
                <Link href="/todo" className="text-[13px] text-[#0099ff] flex items-center gap-1">All <ChevronRight className="w-3 h-3" /></Link>
              </div>
              <Card className="p-4 space-y-2">
                {pendingTodos.slice(0,4).map(todo => (
                  <div key={todo.id} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-[#262626] shrink-0 flex items-center justify-center">
                      {todo.completed && <CheckCircle className="w-3 h-3 text-[#0099ff]" />}
                    </div>
                    <p className="flex-1 text-[14px] text-white truncate">{todo.title}</p>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${todo.priority==="high"?"bg-[#ff5577]":todo.priority==="medium"?"bg-[#ff7a3d]":"bg-[#999]"}`} />
                  </div>
                ))}
              </Card>
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[22px] font-bold text-white tracking-tight">Recent</h2>
                <Link href="/notifications" className="text-[13px] text-[#0099ff] flex items-center gap-1">All <ChevronRight className="w-3 h-3" /></Link>
              </div>
              <div className="space-y-2">
                {mockNotifications.slice(0,3).map(n => (
                  <Card key={n.id} className="p-3">
                    <div className="flex items-start gap-2">
                      {!n.isRead && <div className="w-1.5 h-1.5 rounded-full bg-[#0099ff] shrink-0 mt-1.5" />}
                      <div className={!n.isRead?"":"pl-3.5"}>
                        <p className="text-[14px] font-medium text-white leading-tight mb-0.5">{n.title}</p>
                        <p className="text-[12px] text-[#999]">{n.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
