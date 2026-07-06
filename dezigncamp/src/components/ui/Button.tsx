"use client";
import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-[100px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed gap-2";
    const variants = {
      primary:   "bg-white text-black hover:opacity-90 active:scale-95",
      secondary: "bg-[#141414] text-white hover:bg-[#1c1c1c] border border-[#262626]",
      ghost:     "bg-transparent text-[#999] hover:text-white hover:bg-[#141414]",
      danger:    "bg-[#ff5577] text-white hover:opacity-90",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-[13px]",
      md: "px-[15px] py-[10px] text-[14px]",
      lg: "px-6 py-3 text-[15px]",
    };
    return (
      <button ref={ref} disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {loading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
