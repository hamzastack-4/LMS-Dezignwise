import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "featured" | "violet" | "magenta" | "orange" | "coral";
  onClick?: () => void;
  style?: CSSProperties;
}

const GRADIENTS: Record<string, string> = {
  violet:  "radial-gradient(ellipse at 30% 50%, #8b6cf7 0%, #6a4cf5 60%, #4a2fd4 100%)",
  magenta: "radial-gradient(ellipse at 30% 40%, #e86ef5 0%, #d44df0 60%, #a830c8 100%)",
  orange:  "radial-gradient(ellipse at 30% 40%, #ffaa6e 0%, #ff7a3d 60%, #e55a1a 100%)",
  coral:   "radial-gradient(ellipse at 30% 40%, #ff8899 0%, #ff5577 60%, #d43355 100%)",
};

export default function Card({ children, className, variant = "default", onClick, style }: CardProps) {
  const isGradient = variant in GRADIENTS;
  const base = "rounded-[20px] transition-all duration-150";
  const variants: Record<string, string> = {
    default:  "bg-[#141414] border border-[#262626]",
    featured: "bg-[#1c1c1c] border border-[#262626]",
  };
  const gradientVariants: Record<string, string> = {
    violet:  "rounded-[30px] text-white border-0",
    magenta: "rounded-[30px] text-white border-0",
    orange:  "rounded-[30px] text-white border-0",
    coral:   "rounded-[30px] text-white border-0",
  };

  return (
    <div onClick={onClick}
      style={isGradient ? { background: GRADIENTS[variant], ...style } : style}
      className={cn(base, isGradient ? gradientVariants[variant] : variants[variant],
        onClick && "cursor-pointer hover:opacity-90", className)}>
      {children}
    </div>
  );
}
