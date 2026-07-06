"use client";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { mockGrades } from "@/lib/mock-data";
import { BarChart2, TrendingUp, Award, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const radarData = [
  {subject:"Assignments",score:90},{subject:"Quizzes",score:87},{subject:"Exams",score:85},
  {subject:"GDB",score:90},{subject:"Projects",score:88},{subject:"Attendance",score:95},
];
const barData = [
  {name:"DSA",value:91},{name:"UI/UX",value:89},{name:"React",value:75},{name:"ML",value:62},
];

function GradeBar({value}:{value:number}) {
  const color = value>=90?"#22c55e":value>=75?"#0099ff":value>=60?"#ff7a3d":"#ff5577";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#1c1c1c] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{width:`${value}%`,backgroundColor:color}} />
      </div>
      <span className="text-[14px] font-medium text-white w-8 text-right">{value}</span>
    </div>
  );
}

export default function GradesPage() {
  const avg = Math.round(mockGrades.reduce((a,g)=>a+g.total,0)/mockGrades.length);
  const best = mockGrades.reduce((a,g)=>g.total>a.total?g:a,mockGrades[0]);
  const gradeColor = (v:number) => v>=90?"text-[#22c55e]":v>=75?"text-[#0099ff]":v>=60?"text-[#ff7a3d]":"text-[#ff5577]";

  return (
    <div>
      <TopBar title="Grade Book" subtitle="Spring 2024 Semester" />
      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label:"GPA Average",value:`${avg}%`,icon:BarChart2,c:"#0099ff",bg:"#0c1a2e",sub:"Across courses"},
            {label:"Highest",value:best.grade,icon:Award,c:"#a78bf5",bg:"#13104a",sub:best.courseName.split(" ")[0],violet:true},
            {label:"Trend",value:"↑ 4.2%",icon:TrendingUp,c:"#22c55e",bg:"#052e16",sub:"vs last sem"},
            {label:"Standing",value:"Dean's",icon:CheckCircle,c:"#ff7a3d",bg:"#2d1900",sub:"Honor Roll"},
          ].map(s=>{
            const Icon = s.icon;
            return (
              <Card key={s.label} variant={s.violet?"violet":"default"} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-4 h-4" style={{color:s.violet?"rgba(255,255,255,0.7)":s.c}} />
                  <span className="text-[13px]" style={{color:s.violet?"rgba(255,255,255,0.7)":"#999"}}>{s.label}</span>
                </div>
                <p className="text-[32px] font-medium leading-none" style={{color:s.violet?"white":s.c}}>{s.value}</p>
                <p className="text-[12px] mt-0.5" style={{color:s.violet?"rgba(255,255,255,0.5)":"#999"}}>{s.sub}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Grade Cards */}
          <div className="space-y-3">
            <h2 className="text-[22px] font-bold text-white tracking-tight">Course Grades</h2>
            {mockGrades.map(g => (
              <Card key={g.id} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[14px] font-medium text-white mb-1">{g.courseName}</h3>
                    <Badge>{g.semester}</Badge>
                  </div>
                  <div className="text-right">
                    <span className={`text-[32px] font-medium ${gradeColor(g.total)}`}>{g.grade}</span>
                    <p className="text-[12px] text-[#999]">{g.total}%</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[["Assignments",g.assignments],["Quizzes",g.quizzes],["Exams",g.exams],["GDB",g.gdb]].filter(([,v])=>(v as number)>0).map(([label,val])=>(
                    <div key={label as string}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[12px] text-[#999]">{label}</span>
                        <span className="text-[12px] text-[#999]">{val}%</span>
                      </div>
                      <GradeBar value={val as number} />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="space-y-4">
            <h2 className="text-[22px] font-bold text-white tracking-tight">Analytics</h2>
            <Card className="p-5">
              <p className="text-[14px] font-medium text-white mb-4">Grade Comparison</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"#999",fontSize:12}} />
                  <YAxis domain={[0,100]} axisLine={false} tickLine={false} tick={{fill:"#999",fontSize:12}} />
                  <Tooltip contentStyle={{background:"#141414",border:"1px solid #262626",borderRadius:10}} labelStyle={{color:"#fff"}} itemStyle={{color:"#0099ff"}} />
                  <Bar dataKey="value" fill="#0099ff" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <p className="text-[14px] font-medium text-white mb-4">Skill Distribution</p>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis dataKey="subject" tick={{fill:"#999",fontSize:11}} />
                  <Radar name="Score" dataKey="score" stroke="#6a4cf5" fill="#6a4cf5" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <p className="text-[14px] font-medium text-white mb-3">Grading Scale</p>
              <div className="space-y-1.5">
                {[["A+","95–100","#22c55e"],["A","90–94","#22c55e"],["B+","85–89","#0099ff"],["B","80–84","#0099ff"],
                  ["C+","75–79","#ff7a3d"],["C","70–74","#ff7a3d"],["D","60–69","#ff5577"],["F","<60","#ff5577"]].map(([g,r,c])=>(
                  <div key={g as string} className="flex items-center justify-between">
                    <span className="text-[14px] font-medium" style={{color:c as string}}>{g}</span>
                    <span className="text-[12px] text-[#999]">{r}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
