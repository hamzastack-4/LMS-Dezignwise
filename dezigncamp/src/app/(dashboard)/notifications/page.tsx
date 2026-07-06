"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { mockNotifications } from "@/lib/mock-data";
import type { Notification } from "@/types";
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle, XCircle, Filter } from "lucide-react";

const typeConfig = {
  success: {
    icon: CheckCircle,
    color: "#22c55e",
    bg: "#22c55e15",
    border: "#22c55e30",
    label: "Success",
  },
  info: {
    icon: Info,
    color: "#0099ff",
    bg: "#0099ff15",
    border: "#0099ff30",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "#f59e0b15",
    border: "#f59e0b30",
    label: "Warning",
  },
  error: {
    icon: XCircle,
    color: "#ef4444",
    bg: "#ef444415",
    border: "#ef444430",
    label: "Error",
  },
};

const extraNotifications: Notification[] = [
  {
    id: "n005",
    title: "Course Enrolled",
    message: "You have been successfully enrolled in 'Machine Learning with Python'",
    type: "success",
    isRead: true,
    createdAt: "2024-06-29T12:00:00",
  },
  {
    id: "n006",
    title: "Assignment Overdue",
    message: "Linear Regression Project was due on June 28 and has not been submitted",
    type: "error",
    isRead: false,
    createdAt: "2024-06-28T23:59:00",
  },
  {
    id: "n007",
    title: "Quiz Reminder",
    message: "Your React Mid-Term Quiz is scheduled for July 15 at 10:00 AM",
    type: "info",
    isRead: true,
    createdAt: "2024-06-27T08:00:00",
  },
  {
    id: "n008",
    title: "Study Streak",
    message: "Amazing! You have maintained a 7-day study streak. Keep it up!",
    type: "success",
    isRead: true,
    createdAt: "2024-06-26T20:00:00",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    ...mockNotifications,
    ...extraNotifications,
  ]);
  const [filter, setFilter] = useState<"all" | "unread" | "success" | "info" | "warning" | "error">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    return n.type === filter;
  });

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Notifications" subtitle="Stay updated with your learning activity" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats + Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] rounded-[100px]">
              <Bell size={14} className="text-[#0099ff]" />
              <span className="text-[13px] font-medium text-white">{notifications.length} total</span>
              {unreadCount > 0 && (
                <>
                  <span className="text-[#555]">·</span>
                  <span className="text-[13px] font-medium text-[#0099ff]">{unreadCount} unread</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 px-3 py-2 bg-[#141414] hover:bg-[#1c1c1c] rounded-[100px] text-[12px] font-medium text-[#999] hover:text-white transition-colors"
              >
                <CheckCheck size={13} />
                Mark all read
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-2 bg-[#141414] hover:bg-[#1c1c1c] rounded-[100px] text-[12px] font-medium text-[#ef4444] hover:text-[#ff6666] transition-colors"
            >
              <Trash2 size={13} />
              Clear all
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-[#555]" />
          {(["all", "unread", "success", "info", "warning", "error"] as const).map((f) => {
            const count =
              f === "all"
                ? notifications.length
                : f === "unread"
                ? unreadCount
                : notifications.filter((n) => n.type === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-[100px] text-[12px] font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-[#0099ff] text-white"
                    : "bg-[#141414] text-[#666] hover:text-white"
                }`}
              >
                {f} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-[#141414] rounded-[20px] flex items-center justify-center mb-4">
              <Bell size={28} className="text-[#333]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#666] mb-2">No notifications</h3>
            <p className="text-[14px] text-[#444]">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((notification) => {
              const config = typeConfig[notification.type as keyof typeof typeConfig] || typeConfig.info;
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  onClick={() => !notification.isRead && markRead(notification.id)}
                  className="flex items-start gap-4 p-4 rounded-[16px] border cursor-pointer transition-all hover:border-[#2a2a2a]"
                  style={{
                    backgroundColor: notification.isRead ? "#141414" : config.bg,
                    borderColor: notification.isRead ? "#1c1c1c" : config.border,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon size={18} style={{ color: config.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-white">{notification.title}</p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-[#0099ff] flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] text-[#555]">{formatTime(notification.createdAt)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-[#444] hover:text-[#ef4444] transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#999] mt-1 leading-relaxed">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="px-2 py-0.5 rounded-[100px] text-[10px] font-medium capitalize"
                        style={{
                          backgroundColor: `${config.color}20`,
                          color: config.color,
                        }}
                      >
                        {config.label}
                      </span>
                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markRead(notification.id);
                          }}
                          className="text-[11px] text-[#0099ff] hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
