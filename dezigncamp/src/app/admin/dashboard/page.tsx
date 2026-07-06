"use client";
import TopBar from "@/components/layout/TopBar";
import { Users, BookOpen, TrendingUp, DollarSign, Shield, Server, AlertTriangle, CheckCircle, UserPlus, Settings, Activity, Globe } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const platformStats = [
  { label: "Total Users", value: "2,847", change: "+124 this month", icon: Users, color: "#0099ff" },
  { label: "Active Courses", value: "48", change: "6 new this month", icon: BookOpen, color: "#a855f7" },
  { label: "Completion Rate", value: "67%", change: "+3% from last month", icon: TrendingUp, color: "#22c55e" },
  { label: "Revenue (MRR)", value: "$24.8K", change: "+18% from last month", icon: DollarSign, color: "#f59e0b" },
];

const userGrowthData = [
  { month: "Jan", students: 180, instructors: 12 },
  { month: "Feb", students: 220, instructors: 14 },
  { month: "Mar", students: 310, instructors: 18 },
  { month: "Apr", students: 285, instructors: 22 },
  { month: "May", students: 420, instructors: 26 },
  { month: "Jun", students: 390, instructors: 30 },
  { month: "Jul", students: 480, instructors: 35 },
];

const activityData = [
  { day: "Mon", logins: 420 },
  { day: "Tue", logins: 380 },
  { day: "Wed", logins: 510 },
  { day: "Thu", logins: 460 },
  { day: "Fri", logins: 430 },
  { day: "Sat", logins: 280 },
  { day: "Sun", logins: 190 },
];

const roleData = [
  { name: "Students", value: 2564, color: "#0099ff" },
  { name: "Instructors", value: 248, color: "#a855f7" },
  { name: "Admins", value: 35, color: "#f59e0b" },
];

const recentActivity = [
  { type: "user", message: "New instructor registered: Dr. Mohammed Al-Rashid", time: "2m ago", icon: UserPlus, color: "#0099ff" },
  { type: "course", message: "Course 'Web3 Development' submitted for review", time: "15m ago", icon: BookOpen, color: "#a855f7" },
  { type: "alert", message: "High CPU usage detected on media server", time: "1h ago", icon: AlertTriangle, color: "#ef4444" },
  { type: "success", message: "Database backup completed successfully", time: "2h ago", icon: CheckCircle, color: "#22c55e" },
  { type: "user", message: "Bulk enrollment: 45 students added to CSC-301", time: "3h ago", icon: Users, color: "#f59e0b" },
  { type: "system", message: "Platform updated to v2.4.1", time: "5h ago", icon: Settings, color: "#666" },
];

const systemHealth = [
  { service: "Web Server", status: "healthy", uptime: "99.98%", color: "#22c55e" },
  { service: "Database", status: "healthy", uptime: "99.99%", color: "#22c55e" },
  { service: "Media CDN", status: "warning", uptime: "98.2%", color: "#f59e0b" },
  { service: "Email Service", status: "healthy", uptime: "99.95%", color: "#22c55e" },
  { service: "AI API", status: "healthy", uptime: "99.7%", color: "#22c55e" },
  { service: "Storage (S3)", status: "healthy", uptime: "100%", color: "#22c55e" },
];

const topCourses = [
  { title: "Advanced UI/UX Design", students: 847, rating: 4.9, revenue: "$6,240" },
  { title: "React & Next.js Dev", students: 642, rating: 4.7, revenue: "$4,820" },
  { title: "Machine Learning", students: 521, rating: 4.8, revenue: "$5,100" },
  { title: "Data Structures", students: 432, rating: 5.0, revenue: "$3,890" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-[8px] px-3 py-2">
      <p className="text-[12px] text-[#999]">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-[13px] font-bold" style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Admin Dashboard" subtitle="Platform overview and management console" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Platform Stats */}
        <div className="grid grid-cols-4 gap-4">
          {platformStats.map((stat) => (
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
          {/* Charts + Tables */}
          <div className="col-span-2 space-y-5">
            {/* User Growth */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-white">User Growth</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-[#0099ff] rounded-full" />
                    <span className="text-[11px] text-[#666]">Students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-[#a855f7] rounded-full" />
                    <span className="text-[11px] text-[#666]">Instructors</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0099ff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0099ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInstructors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="students" stroke="#0099ff" strokeWidth={2} fill="url(#colorStudents)" />
                  <Area type="monotone" dataKey="instructors" stroke="#a855f7" strokeWidth={2} fill="url(#colorInstructors)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Logins */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-white">Daily Active Logins</h3>
                <span className="text-[12px] text-[#666]">This week</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={activityData} barSize={28}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="logins" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Courses */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[16px] font-bold text-white mb-4">Top Performing Courses</h3>
              <div className="space-y-3">
                {topCourses.map((course, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-[#1c1c1c] rounded-[12px]">
                    <span className="text-[18px] font-bold text-[#333] w-6">#{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white truncate">{course.title}</p>
                      <p className="text-[11px] text-[#666] mt-0.5">{course.students.toLocaleString()} students</p>
                    </div>
                    <div className="flex items-center gap-4 text-right flex-shrink-0">
                      <div>
                        <p className="text-[13px] font-bold text-[#f59e0b]">★ {course.rating}</p>
                        <p className="text-[10px] text-[#555]">rating</p>
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#22c55e]">{course.revenue}</p>
                        <p className="text-[10px] text-[#555]">revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* User breakdown pie */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[15px] font-semibold text-white mb-4">User Breakdown</h3>
              <div className="flex justify-center mb-3">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={roleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {roleData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[12px] text-[#999]">{item.name}</span>
                    </div>
                    <span className="text-[12px] font-bold text-white">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Server size={15} className="text-[#22c55e]" />
                <h3 className="text-[15px] font-semibold text-white">System Health</h3>
              </div>
              <div className="space-y-2.5">
                {systemHealth.map((service) => (
                  <div key={service.service} className="flex items-center justify-between">
                    <span className="text-[12px] text-[#999]">{service.service}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#555]">{service.uptime}</span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#1c1c1c] flex items-center gap-2">
                <Activity size={12} className="text-[#666]" />
                <span className="text-[11px] text-[#555]">Last checked 2 min ago</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[15px] font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${event.color}20` }}
                    >
                      <event.icon size={13} style={{ color: event.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[#ccc] leading-snug">{event.message}</p>
                      <p className="text-[10px] text-[#555] mt-0.5">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[14px] font-semibold text-white mb-3">Admin Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: UserPlus, label: "Add User", color: "#0099ff" },
                  { icon: Shield, label: "Permissions", color: "#a855f7" },
                  { icon: Globe, label: "Announcements", color: "#22c55e" },
                  { icon: Settings, label: "Settings", color: "#f59e0b" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-3 bg-[#1c1c1c] hover:bg-[#222] rounded-[10px] transition-colors"
                  >
                    <action.icon size={17} style={{ color: action.color }} />
                    <span className="text-[11px] text-[#999]">{action.label}</span>
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
