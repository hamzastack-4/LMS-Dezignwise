import { cn, getInitials } from "@/lib/utils";

const GRAD_COLORS = ["#6a4cf5","#d44df0","#ff7a3d","#ff5577","#0099ff"];
const SIZES = { sm:"w-7 h-7 text-[11px]", md:"w-9 h-9 text-[13px]", lg:"w-12 h-12 text-[14px]", xl:"w-16 h-16 text-[16px]" };

export default function Avatar({ name, src, size = "md", className }:
  { name: string; src?: string; size?: "sm"|"md"|"lg"|"xl"; className?: string }) {
  if (src) return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} className={cn("rounded-full object-cover border border-[#262626]", SIZES[size], className)} />
  );
  const bg = GRAD_COLORS[name.charCodeAt(0) % GRAD_COLORS.length];
  return (
    <div className={cn("rounded-full flex items-center justify-center text-white font-medium shrink-0", SIZES[size], className)}
      style={{ backgroundColor: bg }}>
      {getInitials(name)}
    </div>
  );
}
