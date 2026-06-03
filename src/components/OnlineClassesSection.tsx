import React, { useState, useEffect } from "react";
import { Tv, Play, Download, Search, Users, ShieldAlert, Sparkles, MessageCircle, ArrowRight, Video, HelpCircle } from "lucide-react";
import { RecordedLesson } from "../types";

interface OnlineClassesProps {
  recordedLessons: RecordedLesson[];
  onNavigate: (tab: string) => void;
}

export default function OnlineClassesSection({ recordedLessons, onNavigate }: OnlineClassesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [activeVideo, setActiveVideo] = useState<RecordedLesson | null>(recordedLessons[0] || null);

  // Live class simulation states
  const [showLiveLobby, setShowLiveLobby] = useState(false);
  const [simulatedChats, setSimulatedChats] = useState([
    { user: "Tutor Admin", text: "Welcome everyone! Form 5 Mathematics revision begins.", time: "7:31 PM" },
    { user: "Sharifa M.", text: "Ready Dr Adrian! The discriminant graphs are in chapter 3, correct?", time: "7:32 PM" },
    { user: "Isaac Lee", text: "Got my workbook ready", time: "7:32 PM" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const subjects = ["All", "Mathematics", "Physics", "Chemistry"];

  const upcomingClasses = [
    {
      id: "up-1",
      title: "PRO-Accelerated Mathematics: Calculus Limits SPM Prep",
      tutor: "Dr. Adrian Proton",
      time: "Tonight, 7:30 PM - 9:30 PM",
      status: "Starting Soon",
      spots: 8,
    },
    {
      id: "up-2",
      title: "Advanced Chemistry: Titration Curves & Lab Analysis",
      tutor: "Madam Sarah Lee",
      time: "Tomorrow, 8:00 PM - 9:30 PM",
      status: "Booked",
      spots: 14,
    },
    {
      id: "up-3",
      title: "Newtonian Dynamics: Acceleration Fields & Mechanics",
      tutor: "Sir Robert K.",
      time: "Sat Jun 06, 2:00 PM - 3:30 PM",
      status: "Open",
      spots: 25,
    },
  ];

  // Simulated live chat additions
  useEffect(() => {
    if (!showLiveLobby) return;

    const interval = setInterval(() => {
      const texts = [
        "Is this equation going to be tested on the midterm exam?",
        "Ah! This method is much quicker than using factoring formulas.",
        "Could you re-show the discriminant sign chart on the whiteboard please?",
        "Yes, I understand now! Thank you Dr Adrian."
      ];
      const users = ["Rina Tan", "Alex Wong", "Isaac Lee", "Sarah M."];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      setSimulatedChats((prev) => [
        ...prev,
        {
          user: randomUser,
          text: randomText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [showLiveLobby]);

  const handleSendLiveChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setSimulatedChats((prev) => [
      ...prev,
      {
        user: "Sharifa M. (You)",
        text: chatInput,
        time: "Now",
      },
    ]);
    setChatInput("");
  };

  const filteredLessons = recordedLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = selectedSubject === "All" || lesson.subject === selectedSubject;
    return matchesSearch && matchesSub;
  });

  return (
    <div className="space-y-12 animate-fade-in p-1">
      {/* 1. LOBBY OR ACTIVE LOBBY SIMULATOR */}
      {!showLiveLobby ? (
        <section className="bg-slate-50 border border-slate-200 p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 border border-rose-250 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 bg-rose-600 rounded-full" />
              <span>LIVE VIRTUAL CLASSROOM TODAY</span>
            </span>

            <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Interactive Protons Virtual Lobby
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl font-light">
              Join live broadcasts directed by SPM markers and academic principals. Interact via real-time questions, review mock whiteboards, and challenge concept benchmarks together with peers.
            </p>

            <div className="space-y-3.5 max-w-xl">
              {upcomingClasses.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-150 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-2xs transition-shadow">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">Tutor: {item.tutor} &bull; {item.time}</p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                    {item.status === "Starting Soon" ? (
                      <button
                        onClick={() => setShowLiveLobby(true)}
                        className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-lg transition-transform hover:scale-[1.02] flex items-center gap-1 shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Enter Live Class Lobby</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-xs font-semibold border border-slate-150">
                        Syllabus Enrolled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-xs font-display uppercase tracking-wider text-slate-400">
              Technical Specifications & Inclusions
            </h4>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>Protons virtual lobbies adjust resolutions dynamically to accommodate variable local network environments. Standard inclusions:</p>
              <ul className="list-disc pl-5 space-y-1.5 font-light">
                <li>Instant downloadable practice modules & assignments sheets.</li>
                <li>Live active feedback chatting with subject examiners.</li>
                <li>Playback transcripts generated instantly and reviewable next day.</li>
                <li>WhatsApp follow-ups for unresolved doubts.</li>
              </ul>
            </div>
          </div>
        </section>
      ) : (
        /* ================= VIRTUAL LOBBY SIMULATOR SCREEN ================= */
        <section className="bg-slate-900 rounded-3xl border border-slate-800 text-white p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider bg-rose-500 text-white px-2 py-0.5 rounded uppercase font-bold text-center">
                ● BROADCAST IN SESSION
              </span>
              <h3 className="font-bold text-lg font-display text-white">
                PRO-Accelerated Mathematics: Calculus Limits SPM Prep
              </h3>
            </div>

            <button
              onClick={() => setShowLiveLobby(false)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
            >
              Exit Virtual Lobby
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[460px]">
            {/* Whiteboard Canvas / Share-Screen simulation (8 cols) */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-850 relative overflow-hidden flex flex-col justify-between p-6">
              <div className="absolute top-4 left-4 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
                <span className="font-semibold text-slate-200">Demonstrating: Limits and Graphs</span>
              </div>

              {/* Whiteboard content sketch */}
              <div className="flex-1 flex flex-col justify-center items-center font-display space-y-6 select-none my-8">
                <div className="space-y-2 text-center p-6 bg-slate-900 rounded-2xl border border-brand-500/10 shadow-lg max-w-sm">
                  <h4 className="text-brand-400 font-bold text-base font-mono">Whiteboard Derivative</h4>
                  <div className="text-xl font-bold bg-slate-950 text-white px-4 py-2.5 rounded font-mono border border-slate-800">
                    lim_&#123;x &rarr; 2&#125; &#40;x&sup2; - 4&#41;/&#40;x - 2&#41;
                  </div>
                  <div className="text-xs text-emerald-400 font-mono mt-1">
                    = lim_&#123;x &rarr; 2&#125; (x + 2) = 4
                  </div>
                  <p className="text-[11px] text-slate-400 font-light pt-2">
                    Tip: Factory out binomial components before applying limits directly to avoid zero denominators.
                  </p>
                </div>
              </div>

              {/* Peer counters / stats */}
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-850">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Participating: Dr. Adrian + 14 Students</span>
                </span>

                <span className="text-[10px] uppercase font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Whiteboard Shared
                </span>
              </div>
            </div>

            {/* Chat screen sidepane (4 cols) */}
            <div className="lg:col-span-4 bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden flex flex-col justify-between h-full">
              <h4 className="px-4 py-3 bg-slate-900 text-xs font-bold tracking-wider uppercase border-b border-slate-850 flex justify-between items-center">
                <span>Direct Classroom Chat</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </h4>

              <div className="p-4 space-y-3 overflow-y-auto flex-1 font-mono text-[11px]">
                {simulatedChats.map((chat, idx) => (
                  <div key={idx} className="space-y-0.5 border-b border-slate-900 pb-1.5 last:border-0">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold text-emerald-400">{chat.user}</span>
                      <span className="text-slate-500">{chat.time}</span>
                    </div>
                    <p className="text-slate-300 leading-normal font-sans text-xs">{chat.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendLiveChat} className="p-3 bg-slate-900 border-t border-slate-850 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-950 text-xs rounded border border-slate-850 focus:outline-none focus:border-brand-500 text-white"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="px-3.5 py-1 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 2. RECORDED VIDEOS LECTURE VAULT */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">Recorded Lecture Library</h2>
          <p className="text-slate-500 text-sm">Missed a scheduled class? Catch up anytime with pristine recordings indexed with modules notes.</p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter topics or tutors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 text-slate-800 font-medium"
            />
          </div>

          <div className="flex gap-1">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedSubject === sub
                    ? "bg-brand-600 text-white"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active video player mock (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {activeVideo ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-4">
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden relative group">
                  <video
                    key={activeVideo.id}
                    src={activeVideo.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=640&auto=format&fit=crop"
                  />
                  <div className="absolute inset-0 bg-transparent pointer-events-none" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {activeVideo.title}
                    </h3>
                    <span className="text-xs font-bold text-brand-600 font-mono bg-brand-50 px-2.5 py-1 rounded-lg">
                      {activeVideo.subject}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-sans">
                    Lecturer: {activeVideo.author} &bull; Class: {activeVideo.grade} &bull; Duration: {activeVideo.duration}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {activeVideo.description}
                  </p>

                  {/* Syllabus / Notes Download Action */}
                  <div className="pt-3 border-t border-slate-50 flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-xs">
                      <span className="block font-bold text-slate-800">Module Notes: Complete Formula Summary</span>
                      <span className="text-[10px] text-slate-400">PDF Document &bull; 4.2 MB &bull; SPM Ready</span>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Your simulated notes PDF booklet has started downloading! Check assignment tracking in Student Portal.");
                      }}
                      className="px-3 py-1.5 bg-brand-100 text-brand-700 hover:bg-brand-200 transition-colors rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl text-center border text-slate-400">
                <Tv className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <span>Select a lecture recording from list to play.</span>
              </div>
            )}
          </div>

          {/* List of alternative choices (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-150 p-6 shadow-sm flex flex-col h-[520px] justify-between">
            <h4 className="font-bold text-slate-800 text-xs font-display uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
              Available Lecture Playlist
            </h4>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 py-3">
              {filteredLessons.length > 0 ? (
                filteredLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveVideo(lesson)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex gap-3.5 ${
                      activeVideo?.id === lesson.id
                        ? "bg-brand-50 border-brand-250 hover:bg-brand-50"
                        : "bg-white border-slate-150 hover:bg-slate-50"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex-shrink-0 flex items-center justify-center text-brand-100">
                      <Play className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h5 className="font-bold text-slate-800 text-xs md:text-sm leading-tight truncate">
                        {lesson.title}
                      </h5>
                      <p className="text-[10px] text-slate-400 font-medium truncate">
                        {lesson.author} &bull; {lesson.duration}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No lessons found matching this filter.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 bg-slate-50 rounded-xl p-3 border border-slate-150 text-[11px] text-slate-500 leading-normal flex items-start gap-1.5 mt-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>Are you looking for another topical concept? You can request custom revisions instantly at the AI Assistant Tab or call us direct at 0114605536.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
