import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  User,
  Video,
  CreditCard,
  MessageSquare,
  Phone,
  HelpCircle,
  Menu,
  X,
  Clock,
  MapPin,
  ClipboardList
} from "lucide-react";

// Local types & Mock data imports
import { Course, TuitionPackage, Announcement, RecordedLesson, StudentProfile } from "./types";
import {
  INITIAL_COURSES,
  INITIAL_PACKAGES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_RECORDED_LESSONS,
  INITIAL_STUDENT
} from "./mockData";

// Modular UI component imports
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import CoursesSection from "./components/CoursesSection";
import AIAssistantSection from "./components/AIAssistantSection";
import StudentPortalSection from "./components/StudentPortalSection";
import OnlineClassesSection from "./components/OnlineClassesSection";
import PaymentsSection from "./components/PaymentsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core mutable or transferable parameters
  const [selectedCourseForEstimate, setSelectedCourseForEstimate] = useState<string | null>(null);

  // Local academic records
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [packages] = useState<TuitionPackage[]>(INITIAL_PACKAGES);
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [recordedLessons] = useState<RecordedLesson[]>(INITIAL_RECORDED_LESSONS);
  const [student] = useState<StudentProfile>(INITIAL_STUDENT);

  const tabs = [
    { name: "Home", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "About Us", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "Courses", icon: <BookOpen className="w-4 h-4" /> },
    { name: "AI Learning Assistant", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Student Portal", icon: <User className="w-4 h-4" /> },
    { name: "Online Classes", icon: <Video className="w-4 h-4" /> },
    { name: "Payments", icon: <CreditCard className="w-4 h-4" /> },
    { name: "Contact Us", icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const handleNavigate = (tabName: string) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCourseForEstimate = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourseForEstimate(course.name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* 1. TOP STATS TICKER BAR */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-slate-850 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>Mon - Sat: 3:00 PM - 10:00 PM (Closed Sundays)</span>
          </span>
          <span className="hidden md:flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Sri Hartamas, Kuala Lumpur</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:0114605536"
            className="hover:text-brand-400 font-semibold transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Call: 0114605536</span>
          </a>
          <span className="text-slate-700">|</span>
          <a
            href="https://wa.me/60114605536?text=Hi%20Protons%20Tuition,%20I%20have%20questions%20regarding%20enrolment."
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1 text-emerald-400"
          >
            <MessageSquare className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp Fast Connect</span>
          </a>
        </div>
      </div>

      {/* 2. NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-3xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Brand */}
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => handleNavigate("Home")}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-md shadow-brand-600/15">
                <Sparkles className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <span className="block font-display font-extrabold text-slate-900 tracking-tight text-lg leading-tight">
                  PROTONS
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-brand-600 font-extrabold uppercase">
                  TUITION CENTRE
                </span>
              </div>
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleNavigate(tab.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 ${
                    activeTab === tab.name
                      ? "bg-brand-50 text-brand-700 font-bold border border-brand-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>

            {/* Right Action button */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://wa.me/60114605536?text=Hi%20Protons,%20I'm%20a%20new%20parent%20and%20interested%20in%20arranging%20classes."
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Class Desk</span>
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl absolute top-full left-0 w-full p-4 space-y-2 animate-slide-down">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleNavigate(tab.name)}
                className={`w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  activeTab === tab.name
                    ? "bg-brand-50 text-brand-700 font-bold border border-brand-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href="tel:0114605536"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold text-center"
              >
                Call Support
              </a>
              <a
                href="https://wa.me/60114605536"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. MAIN CONTENTS WRAPPER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {activeTab === "Home" && (
          <HomeSection announcements={announcements} onNavigate={handleNavigate} />
        )}

        {activeTab === "About Us" && <AboutSection />}

        {activeTab === "Courses" && (
          <CoursesSection
            courses={courses}
            onNavigate={handleNavigate}
            onSelectCourseForFeeEstimate={handleSelectCourseForEstimate}
          />
        )}

        {activeTab === "AI Learning Assistant" && <AIAssistantSection />}

        {activeTab === "Student Portal" && <StudentPortalSection student={student} />}

        {activeTab === "Online Classes" && (
          <OnlineClassesSection recordedLessons={recordedLessons} onNavigate={handleNavigate} />
        )}

        {activeTab === "Payments" && (
          <PaymentsSection
            packages={packages}
            courses={courses}
            selectedCourseForEstimate={selectedCourseForEstimate}
          />
        )}

        {activeTab === "Contact Us" && <ContactSection />}
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-extrabold text-white tracking-tight">
                PROTONS ACADEMY
              </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              Where quality academic coaching meets modern AI technology. Providing flexible, concepts-driven tutoring for SPM and Pre-University students.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Academic Programs</h4>
            <div className="space-y-1.5 font-light">
              <button onClick={() => handleNavigate("Courses")} className="block hover:underline hover:text-brand-400">
                Mathematics Masterclass
              </button>
              <button onClick={() => handleNavigate("Courses")} className="block hover:underline hover:text-brand-400">
                Secondary Sciences (Physics & Chem)
              </button>
              <button onClick={() => handleNavigate("Courses")} className="block hover:underline hover:text-brand-400">
                English Rhetoric and Essay Writing
              </button>
              <button onClick={() => handleNavigate("Courses")} className="block hover:underline hover:text-brand-400">
                ICT & Python Computing
              </button>
            </div>
          </div>

          {/* Column 3: AI Highlights */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Next-Gen Features</h4>
            <div className="space-y-1.5 font-light">
              <button onClick={() => handleNavigate("AI Learning Assistant")} className="block hover:underline hover:text-brand-400">
                AI Study Chat Companion (Gemini)
              </button>
              <button onClick={() => handleNavigate("AI Learning Assistant")} className="block hover:underline hover:text-brand-400">
                Automated Topical MCQ Generator
              </button>
              <button onClick={() => handleNavigate("AI Learning Assistant")} className="block hover:underline hover:text-brand-400">
                Personalized Revision Timetabler
              </button>
              <button onClick={() => handleNavigate("Student Portal")} className="block hover:underline hover:text-brand-400">
                Online Assignments Portal
              </button>
            </div>
          </div>

          {/* Column 4: Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Verification Helplines</h4>
            <div className="space-y-1.5 font-light">
              <span className="block font-semibold text-slate-200">Phone/WhatsApp:</span>
              <a href="tel:0114605536" className="block text-brand-400 hover:underline">
                0114605536
              </a>
              <span className="block font-semibold text-slate-200 pt-1">Administrative Center:</span>
              <p className="font-light text-slate-400">No. 22-1, Jalan Sri Hartamas 8, Kuala Lumpur</p>
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHTS HOLDER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-800 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-light">
            &copy; 2026 PROTONS TUITION CENTRE &bull; All Rights Reserved. Co. Ref RM-9908.
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/60114605536"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              WhatsApp Support (0114605536)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
