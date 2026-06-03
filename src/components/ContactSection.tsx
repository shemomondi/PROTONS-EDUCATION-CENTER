import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, HelpCircle, MessageSquare, CheckCircle, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import { RegistrationSubmission } from "../types";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    grade: "Secondary (Form 4 - 5)",
    additionalNotes: "",
    subjects: [] as string[],
  });

  const [submissions, setSubmissions] = useState<RegistrationSubmission[]>([
    {
      id: "reg-1",
      studentName: "Sharifa Momondi",
      email: "shemomondi746@gmail.com",
      phone: "0114605536",
      grade: "Secondary (Form 5)",
      subjectsOfInterest: ["Mathematics", "Chemistry"],
      additionalNotes: "Requesting schedule slots for SPM Physics crash courses as well.",
      status: "Admitted",
      date: "02 June 2026",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const availableSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "ICT"];

  const handleSubjectCheckbox = (subj: string) => {
    setFormData((prev) => {
      const alreadyChosen = prev.subjects.includes(subj);
      const updated = alreadyChosen
        ? prev.subjects.filter((s) => s !== subj)
        : [...prev.subjects, subj];
      return { ...prev, subjects: updated };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.phone.trim()) {
      alert("Please provide at least a student name and a valid contact phone number.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: RegistrationSubmission = {
        id: `reg-${Date.now()}`,
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade,
        subjectsOfInterest: formData.subjects,
        additionalNotes: formData.additionalNotes,
        status: "Received",
        date: "Today (03 June 2026)",
      };

      setSubmissions(([newSubmission, ...submissions]));
      setFormData({
        studentName: "",
        email: "",
        phone: "",
        grade: "Secondary (Form 4 - 5)",
        additionalNotes: "",
        subjects: [],
      });
      setIsSubmitting(false);
      setSuccessMsg("Registration Form received! Our team will contact you on WhatsApp shortly.");
      setTimeout(() => setSuccessMsg(""), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-fade-in p-1">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
          联系我们 — Contact PROTONS
        </h2>
        <p className="text-slate-500 text-sm">
          Register for enrollment, request info brochures, or directly communicate with our tutoring desks instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ================= LEFT COLUMN: CONTACT DETAILS & GPS LOGS ================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick numbers card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
            <h4 className="font-bold text-slate-800 text-sm font-display uppercase tracking-wider text-slate-400">
              Directories & Hotlines
            </h4>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
              <a
                href="tel:0114605536"
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-800">Phone Hotline Call</span>
                  <span className="text-slate-500">0114605536</span>
                </div>
              </a>

              <a
                href="https://wa.me/60114605536?text=Hi%20Protons%20Tuition,%20I'd%20like%20to%20register%20my%20child."
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100/70 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-800">Direct WhatsApp Chat</span>
                  <span className="text-emerald-500">0114605536 (Instant answers)</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Mail className="w-5 h-5 text-brand-600 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-800">Email Inquiry Desk</span>
                  <span className="text-slate-500">info@protonstuition.edu.my</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-800">Tuition Headquarters</span>
                  <span className="text-slate-500 font-light">Protons Academic Center, No. 22-1, Jalan Sri Hartamas 8, Kuala Lumpur</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED MAP CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs">
            <h4 className="p-4 bg-slate-50 border-b border-slate-150 text-xs font-bold tracking-wider text-slate-400 uppercase">
              Protons Academy Geolocation Map
            </h4>

            {/* Simulated map sketch panel */}
            <div className="h-56 bg-slate-900 relative flex flex-col justify-center items-center text-center p-6 space-y-2 text-white">
              <div className="absolute inset-0 bg-transparent" />
              <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center animate-bounce z-10 border border-white">
                <MapPin className="w-4.5 h-4.5 text-white" />
              </div>
              <h5 className="font-bold text-xs select-none z-10 font-display">Hartamas Headquarters Location</h5>
              <p className="text-[10px] text-slate-300 font-light select-none z-10">Intersection & Landmark near Hartamas Shopping Plaza</p>
              <span className="text-[9px] uppercase font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700 z-10 select-none">
                SIMULATED GPS BOX
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: SUBMISSION FORM & SUBMISSIONS HISTORY ================= */}
        <div className="lg:col-span-8 space-y-8">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-base font-display">Online registration & General Inquiry form</h3>
                <p className="text-[10px] text-slate-400">Apply for core subject revision cycles. We respond on phone/WhatsApp within 4 hours.</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-600">Student's Full Name:</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Sharifa Momondi"
                    className="w-full bg-slate-50 border border-slate-205 rounded-lg p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-600">Standard School Grade Level:</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-205 rounded-lg p-2.5"
                  >
                    <option value="Primary Class">Primary School (Form 1 - 3 Prep)</option>
                    <option value="Secondary Lower">Secondary Lower Form 1-3</option>
                    <option value="Secondary (Form 4 - 5)">Secondary Upper Form 4-5</option>
                    <option value="Pre-University">Pre-University / A-Level</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-600">Parent/Student Contact Phone (WhatsApp):</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0114605536"
                    className="w-full bg-slate-50 border border-slate-205 rounded-lg p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-600">Operational Email Address:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. parent@example.com"
                    className="w-full bg-slate-50 border border-slate-205 rounded-lg p-2.5"
                  />
                </div>
              </div>

              {/* Subject of interest checkboxes */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="block font-bold text-slate-600">Select Subjects of Interest:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableSubjects.map((subj) => {
                    const chosen = formData.subjects.includes(subj);
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => handleSubjectCheckbox(subj)}
                        className={`p-2 rounded-lg border text-left flex justify-between items-center transition-colors ${
                          chosen ? "bg-brand-50 border-brand-300 text-brand-900" : "bg-white border-slate-200"
                        }`}
                      >
                        <span>{subj}</span>
                        {chosen && <CheckCircle className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="block font-bold text-slate-600">Additional requirements (optional):</label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Tell us about previous performance scores, target timelines or specific package queries."
                  className="w-full bg-slate-50 border border-slate-205 rounded-lg p-2.5"
                />
              </div>

              {successMsg && (
                <div className="p-3 bg-brand-50 text-brand-700 font-bold text-xs border border-brand-150 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Form details & scheduling tuitior...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry & Request Brochure</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Submissions List Log */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-xs font-display uppercase tracking-wider text-slate-400">
              Sent Inquiries Monitor LOG
            </h4>

            {submissions.map((sub) => (
              <div key={sub.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs text-xs space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-slate-800 text-sm">{sub.studentName} ({sub.grade})</h5>
                    <p className="text-[10px] text-slate-400">Phone: {sub.phone} &bull; Email: {sub.email || "N/A"}</p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      sub.status === "Admitted"
                        ? "bg-green-50 text-green-600 border border-green-150"
                        : "bg-blue-50 text-blue-600 border border-blue-150 animate-pulse"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                <div className="text-[10px] text-slate-600 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <p className="font-bold text-slate-700">Subjects Chosen: <span className="font-medium text-slate-600">{sub.subjectsOfInterest.join(", ") || "General Inquiry"}</span></p>
                  {sub.additionalNotes && <p className="mt-1"><span className="font-bold text-slate-700">Notes:</span> {sub.additionalNotes}</p>}
                </div>

                <span className="block text-right text-[10px] text-slate-400 font-mono">Submitted Date: {sub.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
