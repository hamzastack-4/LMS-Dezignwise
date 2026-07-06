"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockCourses } from "@/lib/mock-data";
import { CheckCircle, Play, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { formatTime } from "@/lib/utils";

const MODULES = [
  { id:"m1", title:"Module 1: Foundations", lectures:[
    { id:"l1", title:"Introduction to UI/UX Design", youtubeId:"c9Wg6Cb_YlU", duration:1320, isCompleted:true, watchedSeconds:1320 },
    { id:"l2", title:"Design Thinking Process", youtubeId:"gHGT6bXqmO8", duration:980, isCompleted:true, watchedSeconds:980 },
    { id:"l3", title:"User Research Methods", youtubeId:"Ovj4hFxko7c", duration:1560, isCompleted:false, watchedSeconds:720 },
  ]},
  { id:"m2", title:"Module 2: Wireframing", lectures:[
    { id:"l4", title:"Lo-Fi vs Hi-Fi Wireframes", youtubeId:"qpH7-KFWZRI", duration:1100, isCompleted:false, watchedSeconds:0 },
    { id:"l5", title:"Figma Fundamentals", youtubeId:"FTFaQWZBqQ8", duration:2400, isCompleted:false, watchedSeconds:0 },
  ]},
  { id:"m3", title:"Module 3: Design Systems", lectures:[
    { id:"l6", title:"Components & Variants", youtubeId:"EK-pHkc5EL4", duration:2100, isCompleted:false, watchedSeconds:0 },
    { id:"l7", title:"Auto Layout Mastery", youtubeId:"TyaGpGDFczw", duration:1800, isCompleted:false, watchedSeconds:0 },
  ]},
];

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = mockCourses.find(c => c.id === params.id) || mockCourses[0];
  const [openMod, setOpenMod] = useState("m1");
  const [activeLec, setActiveLec] = useState(MODULES[0].lectures[0]);
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState<"lectures"|"notes"|"resources">("lectures");

  return (
    <div>
      <TopBar title={course.title} subtitle={course.instructorName} />
      <div className="p-6 space-y-6">
        {/* Progress Banner */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-medium text-white">Course Progress</span>
                <span className="text-[14px] text-white">{course.progress}%</span>
              </div>
              <ProgressBar value={course.progress} size="md" />
            </div>
            <div className="flex gap-2 shrink-0">
              <Badge variant="blue">{course.category}</Badge>
              <Badge>{course.duration} total</Badge>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-0 overflow-hidden">
              <div className="aspect-video">
                <iframe src={`https://www.youtube.com/embed/${activeLec.youtubeId}?rel=0&modestbranding=1`}
                  title={activeLec.title} className="w-full h-full" allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              </div>
              <div className="p-4">
                <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{activeLec.title}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-[12px] text-[#999] flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(activeLec.duration)}</span>
                  {activeLec.isCompleted && <span className="text-[12px] text-[#22c55e] flex items-center gap-1"><CheckCircle className="w-3 h-3" />Completed</span>}
                  {!activeLec.isCompleted && activeLec.watchedSeconds>0 && <span className="text-[12px] text-[#0099ff]">{Math.round((activeLec.watchedSeconds/activeLec.duration)*100)}% watched</span>}
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Card className="p-0 overflow-hidden">
              <div className="flex border-b border-[#1a1a1a]">
                {(["lectures","notes","resources"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-3 text-[14px] font-medium capitalize transition-colors ${tab===t?"text-white border-b-2 border-[#0099ff] -mb-px":"text-[#999] hover:text-white"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-4">
                {tab==="notes" && (
                  <div>
                    <p className="text-[13px] text-[#999] mb-3">Notes for: {activeLec.title}</p>
                    <textarea value={notes} onChange={e=>setNotes(e.target.value)}
                      placeholder="Write your notes here…" rows={8}
                      className="w-full bg-[#1c1c1c] text-white text-[15px] rounded-[10px] p-4 border border-[#262626] outline-none focus:border-[#0099ff] transition-colors resize-none placeholder:text-[#999]" />
                    <div className="flex justify-between mt-3">
                      <p className="text-[12px] text-[#999]">{notes.length} chars</p>
                      <Button variant="primary" size="sm">Save Notes</Button>
                    </div>
                  </div>
                )}
                {tab==="resources" && <p className="text-[14px] text-[#999]">No resources attached.</p>}
                {tab==="lectures" && <p className="text-[14px] text-[#999]">Select a lecture from the right panel.</p>}
              </div>
            </Card>
          </div>

          {/* Curriculum */}
          <div className="space-y-3">
            <h3 className="text-[22px] font-bold text-white tracking-tight">Curriculum</h3>
            {MODULES.map(mod => {
              const open = openMod===mod.id;
              const done = mod.lectures.filter(l=>l.isCompleted).length;
              return (
                <Card key={mod.id} className="p-0 overflow-hidden">
                  <button onClick={()=>setOpenMod(open?"":mod.id)}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#1c1c1c] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-white leading-tight">{mod.title}</p>
                      <p className="text-[12px] text-[#999] mt-0.5">{done}/{mod.lectures.length} done</p>
                    </div>
                    {open ? <ChevronDown className="w-4 h-4 text-[#999]" /> : <ChevronRight className="w-4 h-4 text-[#999]" />}
                  </button>
                  {open && (
                    <div className="border-t border-[#1a1a1a]">
                      {mod.lectures.map(lec => {
                        const isActive = activeLec.id===lec.id;
                        return (
                          <button key={lec.id} onClick={()=>setActiveLec(lec)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#1c1c1c] ${isActive?"bg-[#1c1c1c]":""}`}>
                            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                              {lec.isCompleted ? <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                               : isActive ? <Play className="w-3.5 h-3.5 text-[#0099ff]" />
                               : <div className="w-3.5 h-3.5 rounded-full border border-[#262626]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[12px] leading-snug ${isActive?"text-white":"text-[#999]"}`}>{lec.title}</p>
                              <p className="text-[11px] text-[#999] mt-0.5">{formatTime(lec.duration)}</p>
                            </div>
                            {!lec.isCompleted && lec.watchedSeconds>0 && (
                              <ProgressBar value={(lec.watchedSeconds/lec.duration)*100} className="w-10" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
