import { cn } from "@/lib/utils";

const COLORS = {
  blue:   "#0099ff",
  violet: "#6a4cf5",
  green:  "#22c55e",
  orange: "#ff7a3d",
};

export default function ProgressBar({ value, className, color = "blue", showLabel = false, size = "sm" }:
  { value: number; className?: string; color?: keyof typeof COLORS; showLabel?: boolean; size?: "sm" | "md" }) {
  const h = size === "md" ? "h-1.5" : "h-1";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 bg-[#1c1c1c] rounded-full overflow-hidden", h)}>
        <div className={cn("h-full rounded-full transition-all duration-500", h)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: COLORS[color] }} />
      </div>
      {showLabel && <span className="text-[12px] text-[#999] w-8 text-right shrink-0">{Math.round(value)}%</span>}
    </div>
  );
}
