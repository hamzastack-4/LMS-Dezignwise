"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { mockUser } from "@/lib/mock-data";
import {
  LayoutDashboard, BookOpen, Calendar, FileText, BarChart2,
  ClipboardList, BrainCircuit, Clock, CheckSquare, CreditCard,
  HeadphonesIcon, Bell, LogOut, GraduationCap, Settings,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
  { label: "My Courses",   href: "/courses",      icon: BookOpen },
  { label: "Calendar",     href: "/calendar",     icon: Calendar },
  { label: "To-Do List",   href: "/todo",         icon: CheckSquare },
  { label: "Notes",        href: "/notes",        icon: FileText },
  { label: "Grade Book",   href: "/grades",       icon: BarChart2 },
  { label: "Assignments",  href: "/assignments",  icon: ClipboardList },
  { label: "Study Plan",   href: "/study-plan",   icon: BrainCircuit },
  { label: "Schedule",     href: "/schedule",     icon: Clock },
  { label: "e-ID Card",    href: "/eid-card",     icon: CreditCard },
  { label: "Notifications",href: "/notifications",icon: Bell },
  { label: "Help & Support",href: "/help",        icon: HeadphonesIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 h-screen bg-[#090909] border-r border-[#1a1a1a] flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[#1a1a1a]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-white text-[18px] tracking-tight">DezignCamp</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href}
                className={cn("flex items-center gap-3 px-3 py-2 rounded-[10px] text-[14px] font-medium transition-all",
                  active ? "bg-[#141414] text-white" : "text-[#999] hover:text-white hover:bg-[#141414]")}>
                <Icon className={cn("w-4 h-4 shrink-0", active ? "text-[#0099ff]" : "text-[#999]")} />
                <span>{label}</span>
                {label === "Notifications" && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#d44df0] shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-[#1a1a1a]">
          <p className="text-[11px] text-[#999] px-3 mb-2 uppercase tracking-wider">Panels</p>
          <Link href="/instructor/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[14px] text-[#999] hover:text-white hover:bg-[#141414] transition-all">
            <Settings className="w-4 h-4" /><span>Instructor Panel</span>
          </Link>
          <Link href="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[14px] text-[#999] hover:text-white hover:bg-[#141414] transition-all">
            <BarChart2 className="w-4 h-4" /><span>Admin Panel</span>
          </Link>
        </div>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-[10px] hover:bg-[#141414] transition-all cursor-pointer">
          <Avatar name={mockUser.name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-medium text-white truncate">{mockUser.name}</p>
            <p className="text-[12px] text-[#999] truncate">{mockUser.studentId}</p>
          </div>
          <button className="text-[#999] hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
