"use client";
import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockCourses } from "@/lib/mock-data";
import { Search, Plus, BookOpen, Clock, CheckCircle, Play } from "lucide-react";

type F = "all"|"active"|"completed";

export default function CoursesPage() {
  const [filter, setFilter] = useState<F>("all");
  const [search, setSearch] = useState("");

  const filtered = mockCourses.filter(c => {
    const mf = filter==="all"||c.status===filter;
    const ms = c.title.toLowerCase().includes(search.toLowerCase())||c.instructorName.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  return (
    <div>
      <TopBar title="My Courses" subtitle={`${mockCourses.length} courses enrolled`} />
      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-1 bg-[#141414] border border-[#262626] rounded-[100px] p-1">
            {(["all","active","completed"] as F[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-[100px] text-[13px] font-medium capitalize transition-all ${filter===f?"bg-[#1c1c1c] text-white":"text-[#999] hover:text-white"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-[100px] px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-[#999] shrink-0" />
              <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}
                className="bg-transparent text-[14px] text-white placeholder:text-[#999] outline-none" />
            </div>
            <Link href="/courses/add"><Button variant="primary" size="sm"><Plus className="w-3.5 h-3.5" />Add</Button></Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <p className="text-[32px] font-medium text-white">{mockCourses.length}</p>
            <p className="text-[13px] text-[#999]">Total Enrolled</p>
          </Card>
          <Card variant="violet" className="p-4 text-center">
            <p className="text-[32px] font-medium text-white">{mockCourses.filter(c=>c.status==="active").length}</p>
            <p className="text-[13px] text-white/70">In Progress</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-[32px] font-medium text-[#22c55e]">{mockCourses.filter(c=>c.status==="completed").length}</p>
            <p className="text-[13px] text-[#999]">Completed</p>
          </Card>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => {
            const gradMap: Record<string,string> = { Design:"#d44df0", Development:"#6a4cf5", "AI/ML":"#ff7a3d" };
            const bg = gradMap[course.category] || "#0099ff";
            return (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card className="p-5 hover:bg-[#1c1c1c] transition-colors cursor-pointer h-full group">
                  <div className="w-full h-32 bg-[#1c1c1c] rounded-[15px] mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{background:`radial-gradient(ellipse at 50% 50%, ${bg}, transparent)`}} />
                    <BookOpen className="w-8 h-8 text-[#999] relative z-10" />
                    {course.status==="completed" && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 rounded-full bg-[#052e16] flex items-center justify-center">
                          <CheckCircle className="w-3.5 h-3.5 text-[#22c55e]" />
                        </div>
                      </div>
                    )}
                    {course.status==="active" && (
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <Play className="w-3 h-3 text-black ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-medium text-white leading-snug">{course.title}</h3>
                      <Badge variant={course.category==="Design"?"violet":course.category==="AI/ML"?"orange":"blue"}>{course.category}</Badge>
                    </div>
                    <p className="text-[12px] text-[#999]">{course.instructorName}</p>
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] text-[#999]">{course.completedLectures}/{course.totalLectures} lectures</span>
                        <span className="text-[12px] text-[#999]">{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} color={course.status==="completed"?"green":"blue"} />
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-1 text-[12px] text-[#999]">
                        <Clock className="w-3 h-3" />{course.duration}
                      </div>
                      <div className={`ml-auto text-[12px] font-medium ${course.status==="completed"?"text-[#22c55e]":"text-[#999]"}`}>
                        {course.status==="completed"?"✓ Completed":"In Progress"}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
          {/* Add card */}
          <Link href="/courses/add">
            <Card className="p-5 border-dashed! cursor-pointer h-full min-h-[200px] flex flex-col items-center justify-center gap-3 group hover:border-[#0099ff] transition-colors" style={{borderStyle:"dashed",borderColor:"#262626"}}>
              <div className="w-12 h-12 rounded-full bg-[#1c1c1c] group-hover:bg-[#0c1a2e] flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-[#999] group-hover:text-[#0099ff] transition-colors" />
              </div>
              <p className="text-[14px] text-[#999] group-hover:text-white transition-colors">Add YouTube Course</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
