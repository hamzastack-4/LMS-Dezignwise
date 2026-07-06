"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { mockCalendarEvents } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const TYPE_COLOR: Record<string,string> = { assignment:"#ff5577", exam:"#ff7a3d", lecture:"#0099ff", reminder:"#6a4cf5" };
const TYPE_VARIANT: Record<string,"coral"|"orange"|"blue"|"violet"> = { assignment:"coral", exam:"orange", lecture:"blue", reminder:"violet" };

export default function CalendarPage() {
  const today = new Date();
  const [cur, setCur] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selDay, setSelDay] = useState<number|null>(today.getDate());
  const y = cur.getFullYear(), m = cur.getMonth();
  const firstDay = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();

  const getEvts = (d:number) => mockCalendarEvents.filter(e=>{
    const dt = new Date(e.startDate);
    return dt.getFullYear()===y && dt.getMonth()===m && dt.getDate()===d;
  });

  const cells = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const selEvts = selDay ? getEvts(selDay) : [];

  return (
    <div>
      <TopBar title="Calendar" subtitle="Academic Schedule" />
      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[22px] font-bold text-white">{MONTHS[m]} {y}</h2>
                <div className="flex gap-2">
                  <button onClick={()=>setCur(new Date(y,m-1,1))} className="w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center hover:bg-[#1c1c1c] transition-colors"><ChevronLeft className="w-4 h-4 text-white" /></button>
                  <button onClick={()=>setCur(new Date(y,m+1,1))} className="w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center hover:bg-[#1c1c1c] transition-colors"><ChevronRight className="w-4 h-4 text-white" /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d=><div key={d} className="text-center text-[13px] font-medium text-[#999] py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day,idx) => {
                  if(!day) return <div key={`e${idx}`} />;
                  const evts = getEvts(day);
                  const isToday = day===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();
                  const isSel = day===selDay;
                  return (
                    <button key={day} onClick={()=>setSelDay(day)}
                      className={`relative p-2 rounded-[10px] text-center transition-all min-h-[52px] flex flex-col items-center gap-1 ${isSel?"border border-[#0099ff]/40 bg-[#0c1a2e]":isToday?"bg-[#1c1c1c]":"hover:bg-[#141414]"}`}>
                      <span className={`text-[12px] w-6 h-6 flex items-center justify-center rounded-full font-medium ${isToday?"bg-white text-black text-[11px]":isSel?"text-[#0099ff]":"text-white"}`}>{day}</span>
                      {evts.length>0 && (
                        <div className="flex gap-0.5 flex-wrap justify-center">
                          {evts.slice(0,3).map(e=><div key={e.id} className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:TYPE_COLOR[e.type]||"#999"}} />)}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-4 pt-4 border-t border-[#1a1a1a] flex-wrap">
                {[["lecture","Lecture","#0099ff"],["assignment","Assignment","#ff5577"],["exam","Exam","#ff7a3d"],["reminder","Reminder","#6a4cf5"]].map(([t,l,c])=>(
                  <div key={t} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor:c}} />
                    <span className="text-[12px] text-[#999]">{l}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-white">{selDay ? `${MONTHS[m]} ${selDay}` : "Events"}</h2>
              <button className="w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center hover:bg-[#1c1c1c] transition-colors"><Plus className="w-4 h-4 text-white" /></button>
            </div>
            {selEvts.length===0
              ? <Card className="p-6 text-center"><p className="text-[14px] text-[#999]">No events on this day</p></Card>
              : <div className="space-y-2">
                  {selEvts.map(e=>(
                    <Card key={e.id} className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-[14px] font-medium text-white">{e.title}</p>
                        <Badge variant={TYPE_VARIANT[e.type]||"default"}>{e.type}</Badge>
                      </div>
                      {e.description && <p className="text-[12px] text-[#999]">{e.description}</p>}
                      <p className="text-[12px] text-[#999] mt-2">{new Date(e.startDate).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}</p>
                    </Card>
                  ))}
                </div>
            }
            <div>
              <h3 className="text-[12px] text-[#999] mb-2 uppercase tracking-wider">Upcoming</h3>
              <div className="space-y-2">
                {mockCalendarEvents.slice(0,4).map(e=>(
                  <Card key={e.id} className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{backgroundColor:TYPE_COLOR[e.type]||"#999"}} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-white truncate">{e.title}</p>
                        <p className="text-[11px] text-[#999]">{formatDate(e.startDate)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
