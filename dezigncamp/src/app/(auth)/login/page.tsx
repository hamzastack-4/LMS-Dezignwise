"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const handle = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1500);
  };
  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{background:"radial-gradient(circle,#6a4cf5,transparent)"}} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10" style={{background:"radial-gradient(circle,#d44df0,transparent)"}} />
      </div>
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-[12px] bg-white flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-[32px] font-medium text-white tracking-tight">DezignCamp</h1>
          <p className="text-[15px] text-[#999] mt-1">Sign in to your account</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-[30px] p-6 space-y-4">
          <form onSubmit={handle} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@dezigncamp.edu" leftIcon={<Mail className="w-4 h-4" />} defaultValue="alex.johnson@dezigncamp.edu" />
            <Input label="Password" type={showPass?"text":"password"} placeholder="Enter your password" leftIcon={<Lock className="w-4 h-4" />} defaultValue="password123"
              rightIcon={<button type="button" onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>} />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-[14px] text-[#999]">Remember me</span>
              </label>
              <a href="#" className="text-[14px] text-[#0099ff] hover:opacity-80">Forgot password?</a>
            </div>
            <Button variant="primary" className="w-full" loading={loading} type="submit">Sign In</Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#262626]" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-[#141414] text-[12px] text-[#999]">or continue with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" size="sm" className="w-full">Google</Button>
            <Button variant="secondary" size="sm" className="w-full">GitHub</Button>
          </div>
        </div>
        <p className="text-center text-[14px] text-[#999] mt-4">
          No account? <Link href="/register" className="text-[#0099ff] hover:opacity-80">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
