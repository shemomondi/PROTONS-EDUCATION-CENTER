import React, { useState } from "react";
import { ArrowRight, Phone, Award, ShieldCheck, Zap, MessageSquare, Sparkles, AlertCircle, Share2, ClipboardList } from "lucide-react";
import { Announcement } from "../types";

interface HomeSectionProps {
  announcements: Announcement[];
  onNavigate: (tab: string) => void;
}

export default function HomeSection({ announcements, onNavigate }: HomeSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Important", "Exam Prep", "AI Update", "General"];

  const filteredAnnouncements = announcements.filter(
    (ann) => selectedCategory === "All" || ann.category === selectedCategory
  );

  return (
    <div className="space-y-16 animate-fade-in p-1">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-radial from-slate-900 via-brand-950 to-slate-950 text-white p-8 md:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-500 opacity-15 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-teal-600 opacity-10 blur-3xl"></div>

        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-100 hover:bg-brand-500/30 px-4 py-1.5 rounded-full text-sm font-medium border border-brand-500/30 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-brand-100" />
            <span>Next-Gen Education Powered by Protons AI</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight leading-none">
            PROTONS <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 via-teal-100 to-white">TUITION CENTRE</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
            Welcome to PROTONS TUITION CENTRE — where education meets innovation. We are committed to empowering learners through quality teaching, smart technology, and AI-powered learning solutions designed to help every student succeed academically and professionally. Our platform provides accessible, flexible, and interactive education for students everywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => onNavigate("AI Learning Assistant")}
              className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Explore AI Study Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("Courses")}
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-4 h-4 text-brand-100" />
              <span>Browse Our Classes</span>
            </button>
            <a
              href="https://wa.me/60114605536?text=Hi%20Protons%20Tuition%20Centre,%20I%20would%20like%20to%20enroll%20in%20classes!"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: 0114605536</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4 glow-hover transition-all">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">Academic Excellence</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Curated pathways guided by seasoned subject experts and exam board markers. Our modules target critical concept gaps to yield maximum outcome.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4 glow-hover transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">AI-Augmented Learning</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Instant customizable quizzes, automated support chatbots, and personalized recommendations built using highly modern Gemini intelligence.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4 glow-hover transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">Trustworthy Outcomes</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Trusted by hundreds of parents and tutors. 100% focused on flexible and transparent billing adjusting to real learner schedules.
          </p>
        </div>
      </section>

      {/* 3. MISSION STATEMENT WITH HERO CALLOUT */}
      <section className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200/60 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            Our Mission & Commitment
          </h2>
          <blockquote className="text-lg italic text-slate-700 border-l-4 border-brand-500 pl-4 py-2">
            "To bridge educational boundaries by synergizing elite pedagogy with cutting-edge artificial intelligence, molding resilient and globally minded learners equipped for tomorrow."
          </blockquote>
          <p className="text-slate-600 leading-relaxed text-sm">
            At PROTONS, high-performance teaching is not a slogan—it is built directly into our infrastructure. Every lesson incorporates cognitive learning science, retrieval drills, and spaced-repetition diagnostics supported by our custom digital portal.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("About Us")}
              className="text-brand-600 hover:text-brand-700 font-semibold inline-flex items-center gap-1 group text-sm"
            >
              <span>Learn more about Protons Philosophy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500" />
            Technology Integration Highlights
          </h4>
          <div className="space-y-3">
            {[
              { title: "AI Study Assistant", desc: "Dynamic explanation of science concepts on request." },
              { title: "Automated Quiz Generation", desc: "Adaptive assessment with detailed correction guides." },
              { title: "Live and Recorded Classes", desc: "Flexible review tools with zero device-compatibility limits." },
              { title: "Direct Instructor Contact", desc: "WhatsApp integration triggers rapid expert help loops." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">{item.title}</h5>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURRENT NOTIFICATIONS & ANNOUNCEMENTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Announcements & Notice Board
            </h2>
            <p className="text-slate-500 text-sm">
              Stay in loop with scheduled revisions, administrative notices, and AI system upgrades.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between hover:scale-[1.01] transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-xs font-mono text-slate-400">{ann.date}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ann.category === "Important"
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : ann.category === "AI Update"
                          ? "bg-brand-50 text-brand-600 border border-brand-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                    >
                      {ann.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 font-display text-base leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
                </div>

                <div className="pt-2 border-t border-slate-50 flex justify-between items-center text-[11px]">
                  <span className="text-brand-600 font-medium">Protons Newsroom</span>
                  <button className="text-slate-400 hover:text-brand-600 inline-flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm">No announcements found matching this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. QUICK WHATSAPP CONVENIENCE BLOCK */}
      <section className="p-8 rounded-3xl bg-green-50 border border-green-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold font-display text-slate-900">
            Have Questions About Packages or Enrolment?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl">
            Our active administration helpline is standing by to resolve queries regarding schedules, payment method set up, curriculum adjustments, and customized learning options.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-center">
          <a
            href="https://wa.me/60114605536?text=Hello%20Protons%20Tuition%20Centre,%20I'd%20love%20to%20know%20more%20about%20your%20monthly%20rates."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-center flex items-center justify-center gap-2 transition-all hover:shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Us on WhatsApp</span>
          </a>
          <a
            href="tel:0114605536"
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-center flex items-center justify-center gap-2 transition-all hover:shadow-md"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Hotline: 0114605536</span>
          </a>
        </div>
      </section>
    </div>
  );
}
