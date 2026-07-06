"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; hint?: string;
  leftIcon?: ReactNode; rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[14px] font-medium text-white">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]">{leftIcon}</span>}
        <input ref={ref}
          className={cn(
            "w-full bg-[#141414] text-white text-[15px] rounded-[10px] px-[14px] py-[10px] border border-[#262626] outline-none transition-all placeholder:text-[#999]",
            "focus:border-[#0099ff] focus:shadow-[0_0_0_1px_rgba(0,153,255,0.4)]",
            leftIcon && "pl-9", rightIcon && "pr-9",
            error && "border-[#ff5577]", className
          )} {...props} />
        {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999]">{rightIcon}</span>}
      </div>
      {error && <p className="text-[12px] text-[#ff5577]">{error}</p>}
      {hint && !error && <p className="text-[12px] text-[#999]">{hint}</p>}
    </div>
  )
);
Input.displayName = "Input";
export default Input;
