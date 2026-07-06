"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockAssignments, mockCourses } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Clock, CheckCircle, AlertCircle, Upload, FileText, MessageSquare, BookOpen } from "lucide-react";

type SF = "all"|"pending"|"submitted"|"graded"|"overdue";
type TF = "all"|"assignment"|"quiz"|"gdb"|"exam";

export default function AssignmentsPage() {
  const [sf, setSf] = useState<SF>("all");
  const [tf, setTf] = useState<TF>("all");
  const filtered = mockAssignments.filter(a=>(sf==="all"||a.status===sf)&&(tf==="all"||a.type===tf));
  const course = (id:string) => mockCourses.find(c=>c.id===id)?.title||"Unknown";
  const sv:Record<string,"success"|"blue"|"warning"|"coral"|"default"> = {graded:"success",submitted:"blue",pending:"warning",overdue:"coral"};
  const typeIcon:Record<string,React.ElementType> = {assignment:FileText,quiz:BookOpen,gdb:MessageSquare,exam:AlertCircle};
  const typeColor:Record<string,{bg:string,c:string}> = {
    quiz:{bg:"#0c1a2e",c:"#0099ff"},gdb:{bg:"#13104a",c:"#a78bf5"},exam:{bg:"#2d1900",c:"#ff7a3d"},assignment:{bg:"#1c1c1c",c:"#999"}
  };

  return (
    <div>
      <TopBar title="Assignments" subtitle={`${mockAssignments.filter(a=>a.status==="pending").length} pending`} />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[["Total",mockAssignments.length],["Pending",mockAssignments.filter(a=>a.status==="pending").length],
            ["Submitted",mockAssignments.filter(a=>a.status==="submitted").length],["Graded",mockAssignments.filter(a=>a.status==="graded").length]].map(([l,v])=>(
            <Card key={l as string} className="p-4 text-center">
              <p className="text-[32px] font-medium text-white">{v}</p>
              <p className="text-[13px] text-[#999]">{l}</p>
            </Card>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 bg-[#141414] border border-[#262626] rounded-[100px] p-1">
            {(["all","pending","submitted","graded","overdue"] as SF[]).map(s=>(
              <button key={s} onClick={()=>setSf(s)} className={`px-3 py-1 rounded-[100px] text-[13px] capitalize transition-all ${sf===s?"bg-[#1c1c1c] text-white":"text-[#999] hover:text-white"}`}>{s}</button>
            ))}
          </div>
          <div className="flex gap-1 bg-[#141414] border border-[#262626] rounded-[100px] p-1">
            {(["all","assignment","quiz","gdb","exam"] as TF[]).map(t=>(
              <button key={t} onClick={()=>setTf(t)} className={`px-3 py-1 rounded-[100px] text-[13px] capitalize transition-all ${tf===t?"bg-[#1c1c1c] text-white":"text-[#999] hover:text-white"}`}>{t==="gdb"?"GDB":t}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map(a => {
            const Icon = typeIcon[a.type];
            const tc = typeColor[a.type]||{bg:"#1c1c1c",c:"#999"};
            return (
              <Card key={a.id} className={`p-5 ${a.status==="overdue"?"border-[#ff5577]/30":""}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{backgroundColor:tc.bg}}>
                    <Icon className="w-4 h-4" style={{color:tc.c}} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-[14px] font-medium text-white">{a.title}</h3>
                      <Badge variant={sv[a.status]||"default"}>{a.status}</Badge>
                      <Badge>{a.type.toUpperCase()}</Badge>
                    </div>
                    <p className="text-[12px] text-[#999] mb-2">{course(a.courseId)}</p>
                    <p className="text-[15px] text-[#999] leading-relaxed">{a.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className={`flex items-center gap-1 text-[12px] ${a.status==="overdue"?"text-[#ff5577]":"text-[#999]"}`}>
                        {a.status==="overdue"?<AlertCircle className="w-3 h-3" />:<Clock className="w-3 h-3" />}
                        Due: {formatDate(a.dueDate)}{a.status==="overdue"?" (Overdue)":""}
                      </div>
                      <div className="text-[12px] text-[#999]">Max: {a.totalMarks} marks</div>
                      {a.score!==undefined && <div className="text-[12px] text-[#22c55e] font-medium">Score: {a.score}/{a.totalMarks}</div>}
                      {a.submittedAt && <div className="text-[12px] text-[#0099ff] flex items-center gap-1"><CheckCircle className="w-3 h-3" />Submitted {formatDate(a.submittedAt)}</div>}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {a.status==="pending" && <Button variant="primary" size="sm"><Upload className="w-3.5 h-3.5" />Submit</Button>}
                    {a.status==="graded" && <Button variant="secondary" size="sm">View Feedback</Button>}
                    {a.status==="overdue" && <Button variant="danger" size="sm">Late Submit</Button>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
