import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "blue" | "violet" | "orange" | "coral" | "warning";

const STYLES: Record<BadgeVariant, string> = {
  default: "bg-[#1c1c1c] text-[#999]",
  success: "bg-[#052e16] text-[#22c55e]",
  blue:    "bg-[#0c1a2e] text-[#0099ff]",
  violet:  "bg-[#13104a] text-[#a78bf5]",
  orange:  "bg-[#2d1900] text-[#ff7a3d]",
  coral:   "bg-[#2d0a14] text-[#ff5577]",
  warning: "bg-[#2d2200] text-[#facc15]",
};

export default function Badge({ children, variant = "default", className }:
  { children: ReactNode; variant?: BadgeVariant; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[12px] font-medium", STYLES[variant], className)}>
      {children}
    </span>
  );
}
