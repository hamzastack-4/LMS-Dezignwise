"use client";
import { Bell, Search } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { mockUser, mockNotifications } from "@/lib/mock-data";

export default function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const unread = mockNotifications.filter(n => !n.isRead).length;
  return (
    <header className="h-14 border-b border-[#1a1a1a] flex items-center px-6 gap-4 bg-[#090909] sticky top-0 z-10">
      <div className="flex-1 min-w-0">
        <h1 className="text-[22px] font-bold text-white tracking-tight truncate leading-tight">{title}</h1>
        {subtitle && <p className="text-[12px] text-[#999]">{subtitle}</p>}
      </div>
      <div className="hidden md:flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-[100px] px-3 py-1.5 w-52">
        <Search className="w-3.5 h-3.5 text-[#999] shrink-0" />
        <input type="text" placeholder="Search…"
          className="bg-transparent text-[14px] text-white placeholder:text-[#999] outline-none w-full" />
      </div>
      <button className="relative w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center hover:bg-[#1c1c1c] transition-colors">
        <Bell className="w-4 h-4 text-white" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#d44df0] text-white text-[10px] flex items-center justify-center font-bold">{unread}</span>
        )}
      </button>
      <Avatar name={mockUser.name} size="sm" />
    </header>
  );
}
