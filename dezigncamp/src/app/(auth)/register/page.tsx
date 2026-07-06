"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { GraduationCap, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student"|"instructor">("student");
  const handle = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1500);
  };
  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10" style={{background:"radial-gradient(circle,#6a4cf5,transparent)"}} />
      </div>
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-[12px] bg-white flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-[32px] font-medium text-white tracking-tight">Join DezignCamp</h1>
          <p className="text-[15px] text-[#999] mt-1">Create your account</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-[30px] p-6 space-y-4">
          <div className="flex gap-2 bg-[#1c1c1c] rounded-[100px] p-1">
            {(["student","instructor"] as const).map(r=>(
              <button key={r} onClick={()=>setRole(r)}
                className={`flex-1 py-1.5 rounded-[100px] text-[14px] font-medium capitalize transition-all ${role===r?"bg-white text-black":"text-[#999]"}`}>{r}</button>
            ))}
          </div>
          <form onSubmit={handle} className="space-y-3">
            <Input label="Full Name" type="text" placeholder="Your full name" leftIcon={<User className="w-4 h-4" />} />
            <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail className="w-4 h-4" />} />
            <Input label="Password" type="password" placeholder="Min 8 characters" leftIcon={<Lock className="w-4 h-4" />} />
            <Input label="Confirm Password" type="password" placeholder="Repeat password" leftIcon={<Lock className="w-4 h-4" />} />
            {role==="student" && <Input label="Student ID (optional)" type="text" placeholder="e.g. DC-2024-0001" />}
            <Button variant="primary" className="w-full" loading={loading} type="submit">Create Account</Button>
          </form>
        </div>
        <p className="text-center text-[14px] text-[#999] mt-4">
          Have an account? <Link href="/login" className="text-[#0099ff] hover:opacity-80">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
