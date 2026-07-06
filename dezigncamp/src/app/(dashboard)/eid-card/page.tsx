"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { mockUser, mockAnalytics, mockCourses } from "@/lib/mock-data";
import { Download, Share2, Shield, Award, BookOpen, Clock, Star, QrCode } from "lucide-react";

export default function EIDCardPage() {
  const [cardFlipped, setCardFlipped] = useState(false);
  const user = mockUser;

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const completedCourses = mockCourses.filter((c) => c.status === "completed");
  const activeCourses = mockCourses.filter((c) => c.status === "active");

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="e-ID Card" subtitle="Your digital student identity" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card display */}
          <div className="flex gap-8 items-start">
            {/* ID Card */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              {/* Front side */}
              {!cardFlipped ? (
                <div
                  className="w-[340px] h-[200px] rounded-[20px] overflow-hidden relative cursor-pointer select-none"
                  onClick={() => setCardFlipped(true)}
                  style={{
                    background: "linear-gradient(135deg, #0a0a1a 0%, #0d1a2e 40%, #1a0a2e 100%)",
                    border: "1px solid #ffffff15",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Background glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#0099ff] opacity-10 rounded-full translate-x-16 -translate-y-16 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a855f7] opacity-10 rounded-full -translate-x-8 translate-y-8 pointer-events-none" />

                  {/* Card content */}
                  <div className="relative p-5 h-full flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-[#0099ff] tracking-widest uppercase">DezignCamp</p>
                        <p className="text-[10px] text-[#666] tracking-wider">Learning Management System</p>
                      </div>
                      <div
                        className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #0099ff, #a855f7)" }}
                      >
                        <span className="text-white text-[14px] font-black">DC</span>
                      </div>
                    </div>

                    {/* Middle row — Avatar + Name */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-[12px] flex items-center justify-center text-[18px] font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0099ff, #a855f7)" }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-[16px] font-bold text-white">{user.name}</p>
                        <p className="text-[11px] text-[#0099ff] font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                        <p className="text-[11px] text-[#666]">{user.department}</p>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-[#555] uppercase tracking-wider">Student ID</p>
                        <p className="text-[12px] font-bold text-[#0099ff] font-mono">{user.studentId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#555] uppercase tracking-wider">Semester</p>
                        <p className="text-[12px] font-bold text-white">{user.semester}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#555] uppercase tracking-wider">Valid Thru</p>
                        <p className="text-[12px] font-bold text-white">12/2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Back side */
                <div
                  className="w-[340px] h-[200px] rounded-[20px] overflow-hidden relative cursor-pointer select-none"
                  onClick={() => setCardFlipped(false)}
                  style={{
                    background: "linear-gradient(135deg, #1a0a2e 0%, #0a1628 100%)",
                    border: "1px solid #ffffff15",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="relative p-5 h-full flex flex-col justify-between">
                    {/* Magnetic stripe */}
                    <div className="h-8 bg-[#000] rounded-[4px] opacity-80" />

                    {/* QR Code placeholder */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-20 h-20 rounded-[10px] flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #ffffff10" }}
                      >
                        <QrCode size={40} className="text-[#0099ff]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#666] mb-1">Scan to verify identity</p>
                        <p className="text-[11px] font-mono text-[#0099ff] mb-2">{user.studentId}</p>
                        <p className="text-[10px] text-[#555]">dezigncamp.edu/verify</p>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center gap-2">
                      <Shield size={12} className="text-[#22c55e]" />
                      <p className="text-[10px] text-[#555]">
                        This card is the property of DezignCamp LMS. If found, please return.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[12px] text-[#555]">Click to flip • {cardFlipped ? "Back" : "Front"}</p>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] hover:bg-[#1c1c1c] rounded-[100px] text-[13px] font-medium text-white transition-colors">
                  <Download size={14} className="text-[#0099ff]" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] hover:bg-[#1c1c1c] rounded-[100px] text-[13px] font-medium text-white transition-colors">
                  <Share2 size={14} className="text-[#a855f7]" />
                  Share
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4">
              {/* Personal Info */}
              <div className="bg-[#141414] rounded-[20px] p-5">
                <h3 className="text-[15px] font-semibold text-white mb-4">Student Information</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email", value: user.email },
                    { label: "Student ID", value: user.studentId || "N/A" },
                    { label: "Department", value: user.department || "N/A" },
                    { label: "Current Semester", value: `Semester ${user.semester}` },
                    { label: "Joined", value: user.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[11px] text-[#555] uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-[13px] font-medium text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Stats */}
              <div className="bg-[#141414] rounded-[20px] p-5">
                <h3 className="text-[15px] font-semibold text-white mb-4">Academic Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Enrolled Courses", value: mockAnalytics.totalCourses, icon: BookOpen, color: "#0099ff" },
                    { label: "Completed", value: mockAnalytics.completedCourses, icon: Award, color: "#22c55e" },
                    { label: "Avg. Grade", value: `${mockAnalytics.averageGrade}%`, icon: Star, color: "#f59e0b" },
                    { label: "Study Hours", value: `${Math.round(mockAnalytics.totalWatchTime / 60)}h`, icon: Clock, color: "#a855f7" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 p-3 rounded-[12px]"
                      style={{ backgroundColor: `${s.color}10` }}
                    >
                      <div
                        className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${s.color}20` }}
                      >
                        <s.icon size={15} style={{ color: s.color }} />
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-white">{s.value}</p>
                        <p className="text-[11px] text-[#666]">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-[#141414] rounded-[20px] p-5">
            <h3 className="text-[15px] font-semibold text-white mb-4">Enrolled Courses</h3>
            <div className="grid grid-cols-2 gap-3">
              {mockCourses.map((course) => {
                const colors = { active: "#0099ff", completed: "#22c55e", paused: "#f59e0b" };
                const color = colors[course.status] || "#666";
                return (
                  <div key={course.id} className="flex items-center gap-3 p-3 bg-[#1c1c1c] rounded-[12px]">
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 text-[14px] font-bold text-white"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {course.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white truncate">{course.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-[10px] font-medium capitalize"
                          style={{ color }}
                        >
                          {course.status}
                        </span>
                        <span className="text-[10px] text-[#555]">•</span>
                        <span className="text-[10px] text-[#555]">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
