import React from "react";
import { Award, Eye, Clock, Sparkles, BookOpen, Fingerprint } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-brand-600" />,
      title: "Intelligent Innovation",
      desc: "By merging real Generative AI APIs into our classrooms, we don't just teach the syllabus—we accelerate student comprehension mechanisms."
    },
    {
      icon: <Award className="w-5 h-5 text-teal-600" />,
      title: "Academic Integrity",
      desc: "All tuition modules are verified against national examinations guidelines so everything studied directly contributes to grade improvement."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      title: "Empathetic Guidance",
      desc: "We prioritize patient explanation of core concepts. Every student has a voice, and mistakes are treated as helpful diagnostic loops."
    }
  ];

  const boardMembers = [
    {
      name: "Dr. Adrian Proton",
      role: "Founder & Mathematics Principal",
      credentials: "Ph.D. in Pure Mathematics, Former University Faculty",
      bio: "Dr Adrian has spent 15+ years mentoring top SPM and A-level scorers. He specializes in mapping complex calculus into simple graphical patterns.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" // Elegant mockup avatar
    },
    {
      name: "Sir Robert K.",
      role: "Physics & Mechanics Consultant",
      credentials: "M.Sc. in Applied Physics, SPM Exam Review Coordinator",
      bio: "Robert specializes in breaking down Newtonian systems. He is noted for his predictive exam prep seminars that boast a 94% achievement rate.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    {
      name: "Madam Sarah Lee",
      role: "Chemistry Specialist & Lab Supervisor",
      credentials: "B.Sc. (Hons) in Chemistry, SPM Senior Marker",
      bio: "Sarah bridges abstract atomic structures with intuitive stoichiometry tables. She leads our interactive simulated chemistry studios.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"
    }
  ];

  const timeline = [
    {
      year: "2021",
      title: "Foundation",
      desc: "Protons Tuition Centre was born with the blueprint of delivering intensive, concept-centric secondary core subjects tutoring."
    },
    {
      year: "2023",
      title: "Digital Enrolment & LMS Integration",
      desc: "Launched our custom online homework tracking system, enabling parents to monitor student progress transparently."
    },
    {
      year: "2025",
      title: "The AI Educational Leap",
      desc: "Formally integrated Gemini AI engines, supporting students 24/7 with customized revisions advice and instant practice questionnaire builds."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in p-1">
      {/* 1. WHY CHOOSE PROTONS */}
      <section className="bg-white rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
            <Fingerprint className="w-4 h-4" />
            <span>The Protons Philosophy</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
            Empowering Minds with Innovative Learning Methods
          </h2>

          <p className="text-slate-600 leading-relaxed text-sm">
            At Protons Tuition Centre, we believe that education is not about copying slide notes—it's about understanding concepts fundamentally. Our curriculum structures are calibrated around the SPM, A-levels, and Form 1-5 syllabuses, ensuring students secure premium grades without burnt-out schedules.
          </p>

          <p className="text-slate-600 leading-relaxed text-sm">
            We are the first tuition centre in Malaysia to formally incorporate **AI study helpers** alongside human tutors, ensuring help is available the very instant a student needs it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {values.map((val, index) => (
            <div key={index} className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0 border border-slate-100">
                {val.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm md:text-base">{val.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. OUR KEY TEAM LEADERS */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            Our Brilliant Academic Board
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">
            Meet the experienced principal educators and SPMs/A-level examiners crafting our learning models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-50 border border-brand-100 flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      onError={(e) => {
                        // fallback fallback if layout fails
                        e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop";
                      }}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-display text-base leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-brand-600 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p className="font-mono text-[10px] text-slate-400 font-semibold uppercase">
                    🎓 {member.credentials}
                  </p>
                  <p>{member.bio}</p>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
                <a
                  href="https://wa.me/60114605536?text=Hello,%20I'd%20like%20to%20enrol%20in%20classes%20with%20your%20Math/Science%20principals."
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-600 hover:text-brand-700 font-bold inline-flex items-center gap-1"
                >
                  <span>Enrol in classes</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE STORY */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 -ml-12 -mt-12 w-48 h-48 bg-teal-500 opacity-10 blur-2xl"></div>

        <div className="relative space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold font-display tracking-tight">Our Timeline & Evolution</h2>
            <p className="text-slate-400 text-sm">How we evolved from a physical tuition classroom into a digital-first innovative center.</p>
          </div>

          <div className="relative border-l border-slate-700 ml-3 md:ml-6 space-y-8 py-3">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 md:pl-10">
                <div className="absolute -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-brand-500 border-4 border-slate-900" />
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                    {item.year}
                  </span>
                  <h4 className="font-bold text-white text-base md:text-lg">{item.title}</h4>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
