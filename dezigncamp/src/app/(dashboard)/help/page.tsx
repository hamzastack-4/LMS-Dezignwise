"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Book, Video, ExternalLink, Send } from "lucide-react";

const faqs = [
  {
    id: "f1",
    category: "Getting Started",
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, navigate to the Courses page, browse available courses, and click the 'Enroll' button on any course card. You'll be automatically added to the course and can start learning immediately.",
  },
  {
    id: "f2",
    category: "Getting Started",
    question: "How does the YouTube learning engine work?",
    answer: "DezignCamp integrates with YouTube playlists provided by your instructors. Your watch progress is automatically tracked, and you can resume from where you left off. The system records completion per lecture and updates your overall course progress.",
  },
  {
    id: "f3",
    category: "Assignments",
    question: "How do I submit an assignment?",
    answer: "Go to the Assignments page, find your assignment, and click 'Submit'. You can upload files, write text responses, or both depending on the assignment type. Ensure you submit before the deadline shown on the assignment card.",
  },
  {
    id: "f4",
    category: "Assignments",
    question: "What happens if I miss an assignment deadline?",
    answer: "Assignments marked as 'Overdue' can no longer be submitted unless your instructor extends the deadline. Contact your course instructor directly through the messaging system to request an extension.",
  },
  {
    id: "f5",
    category: "Grades",
    question: "How are grades calculated?",
    answer: "Your final grade is calculated based on a weighted average: Assignments (40%), Quizzes (20%), Exams (30%), and GDB participation (10%). Your instructor may adjust these weights — check your specific course settings.",
  },
  {
    id: "f6",
    category: "AI Features",
    question: "How does the AI Study Plan work?",
    answer: "The AI analyzes your course progress, upcoming deadlines, past performance, and available time to generate a personalized weekly study schedule. It prioritizes courses where you're falling behind and balances your workload across the week.",
  },
  {
    id: "f7",
    category: "AI Features",
    question: "Can I regenerate my AI Study Plan?",
    answer: "Yes! Go to the Study Plan page and click 'Regenerate'. The AI will create a fresh plan based on your current progress and deadlines. Plans are also automatically updated every Monday morning.",
  },
  {
    id: "f8",
    category: "Technical",
    question: "Why is my video not playing?",
    answer: "Video playback issues are usually caused by ad-blockers or browser extensions blocking YouTube embeds. Try disabling your ad-blocker for this site, or switch to a different browser. Ensure you have a stable internet connection.",
  },
  {
    id: "f9",
    category: "Account",
    question: "How do I update my profile information?",
    answer: "Click on your avatar in the sidebar to open profile settings. You can update your name, email, profile photo, and notification preferences from there. Note that Student ID and Department can only be changed by administrators.",
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

const resources = [
  { icon: Book, title: "Documentation", desc: "Complete platform guide", color: "#0099ff", link: "#" },
  { icon: Video, title: "Video Tutorials", desc: "Step-by-step walkthroughs", color: "#a855f7", link: "#" },
  { icon: MessageCircle, title: "Community Forum", desc: "Ask fellow students", color: "#22c55e", link: "#" },
  { icon: Mail, title: "Email Support", desc: "support@dezigncamp.edu", color: "#f59e0b", link: "mailto:support@dezigncamp.edu" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSendTicket = () => {
    if (!ticketTitle.trim() || !ticketDesc.trim()) return;
    setTicketSent(true);
    setTicketTitle("");
    setTicketDesc("");
    setTimeout(() => setTicketSent(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      <TopBar title="Help & Support" subtitle="Find answers and get assistance" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Hero search */}
        <div
          className="rounded-[20px] p-8 text-center"
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #0d1a2e 100%)",
            border: "1px solid #0099ff20",
          }}
        >
          <div className="w-14 h-14 bg-[#0099ff20] rounded-[16px] flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={28} className="text-[#0099ff]" />
          </div>
          <h2 className="text-[24px] font-bold text-white mb-2">How can we help you?</h2>
          <p className="text-[14px] text-[#666] mb-6">Search our knowledge base or browse categories below</p>

          <div className="max-w-lg mx-auto flex items-center gap-2 bg-[#141414] rounded-[12px] px-4 h-12 border border-[#1c1c1c] focus-within:border-[#0099ff40]">
            <Search size={16} className="text-[#555] flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="flex-1 bg-transparent text-[14px] text-white placeholder-[#555] outline-none"
            />
          </div>
        </div>

        {/* Quick Resources */}
        <div className="grid grid-cols-4 gap-4">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.link}
              className="flex flex-col items-center gap-3 p-4 bg-[#141414] hover:bg-[#1c1c1c] rounded-[16px] transition-colors text-center group"
            >
              <div
                className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                style={{ backgroundColor: `${r.color}20` }}
              >
                <r.icon size={22} style={{ color: r.color }} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white group-hover:text-[#0099ff] transition-colors">
                  {r.title}
                </p>
                <p className="text-[11px] text-[#666] mt-0.5">{r.desc}</p>
              </div>
              <ExternalLink size={12} className="text-[#444] group-hover:text-[#0099ff] transition-colors" />
            </a>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* FAQ */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-white">Frequently Asked Questions</h3>
              <span className="text-[12px] text-[#666]">{filteredFaqs.length} articles</span>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-[100px] text-[12px] font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#0099ff] text-white"
                      : "bg-[#141414] text-[#666] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ accordion */}
            <div className="space-y-2">
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[14px] text-[#666]">No results found for "{searchQuery}"</p>
                </div>
              )}
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-[#141414] rounded-[14px] border border-[#1c1c1c] overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2 py-0.5 rounded-[100px] text-[10px] font-medium text-[#0099ff] bg-[#0099ff15]"
                      >
                        {faq.category}
                      </span>
                      <p className="text-[14px] font-medium text-white">{faq.question}</p>
                    </div>
                    {expandedId === faq.id ? (
                      <ChevronUp size={16} className="text-[#666] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-[#666] flex-shrink-0" />
                    )}
                  </button>
                  {expandedId === faq.id && (
                    <div className="px-4 pb-4 border-t border-[#1c1c1c]">
                      <p className="text-[13px] text-[#999] leading-relaxed pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Ticket */}
          <div className="space-y-4">
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[15px] font-semibold text-white mb-1">Contact Support</h3>
              <p className="text-[12px] text-[#666] mb-4">
                Can't find your answer? Submit a support ticket and we'll get back to you within 24 hours.
              </p>

              {ticketSent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-[#22c55e20] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send size={20} className="text-[#22c55e]" />
                  </div>
                  <p className="text-[14px] font-semibold text-[#22c55e]">Ticket Submitted!</p>
                  <p className="text-[12px] text-[#666] mt-1">We'll respond within 24 hours</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-[#666] uppercase tracking-wider mb-1.5 block">Subject</label>
                    <input
                      value={ticketTitle}
                      onChange={(e) => setTicketTitle(e.target.value)}
                      placeholder="Brief description of issue..."
                      className="w-full bg-[#1c1c1c] rounded-[10px] px-3 h-10 text-[13px] text-white placeholder-[#555] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#666] uppercase tracking-wider mb-1.5 block">Description</label>
                    <textarea
                      value={ticketDesc}
                      onChange={(e) => setTicketDesc(e.target.value)}
                      placeholder="Describe your issue in detail..."
                      rows={4}
                      className="w-full bg-[#1c1c1c] rounded-[10px] px-3 py-2 text-[13px] text-white placeholder-[#555] outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#666] uppercase tracking-wider mb-1.5 block">Priority</label>
                    <select className="w-full bg-[#1c1c1c] rounded-[10px] px-3 h-10 text-[13px] text-white outline-none">
                      <option>Low — General question</option>
                      <option>Medium — Issue with feature</option>
                      <option>High — Cannot access content</option>
                      <option>Critical — Exam / submission issue</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSendTicket}
                    className="w-full h-10 bg-[#0099ff] hover:bg-[#0080dd] rounded-[10px] text-[13px] font-semibold text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    Submit Ticket
                  </button>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-[#141414] rounded-[20px] p-5">
              <h3 className="text-[14px] font-semibold text-white mb-3">System Status</h3>
              <div className="space-y-2">
                {[
                  { service: "Platform", status: "Operational", ok: true },
                  { service: "Video Streaming", status: "Operational", ok: true },
                  { service: "AI Features", status: "Operational", ok: true },
                  { service: "File Uploads", status: "Degraded", ok: false },
                ].map((s) => (
                  <div key={s.service} className="flex items-center justify-between">
                    <span className="text-[12px] text-[#999]">{s.service}</span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: s.ok ? "#22c55e" : "#f59e0b" }}
                      />
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: s.ok ? "#22c55e" : "#f59e0b" }}
                      >
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="flex items-center gap-1 mt-3 text-[11px] text-[#0099ff] hover:underline">
                View status page <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
