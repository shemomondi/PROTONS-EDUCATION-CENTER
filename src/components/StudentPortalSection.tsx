import React, { useState } from "react";
import { User, ClipboardCheck, Award, Flame, Calendar, Clock, Upload, CheckCircle, RefreshCw, Layers, AlertCircle } from "lucide-react";
import { StudentProfile } from "../types";

interface StudentPortalProps {
  student: StudentProfile;
}

interface SubmittedHomework {
  fileName: string;
  subject: string;
  submittedAt: string;
  status: "Completed" | "Awaiting Evaluation";
  id: string;
}

export default function StudentPortalSection({ student }: StudentPortalProps) {
  const [homeworks, setHomeworks] = useState<SubmittedHomework[]>([
    {
      id: "hw-1",
      fileName: "Trigonometry_Form5_Exercise3.pdf",
      subject: "Mathematics",
      submittedAt: "01 June 2026",
      status: "Completed",
    },
    {
      id: "hw-2",
      fileName: "OrganicChemistry_Stoich_Draft1.docx",
      subject: "Chemistry",
      submittedAt: "28 May 2026",
      status: "Completed",
    },
  ]);

  const [hwSubject, setHwSubject] = useState("Mathematics");
  const [hwFileName, setHwFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [todoList, setTodoList] = useState([
    { id: 1, text: "Finish Mathematics Quadratic MCQ test series", completed: true },
    { id: 2, text: "Revise Mole Concept concentration conversions", completed: false },
    { id: 3, text: "Download Newtonian Mechanics physical syllabus worksheet", completed: false },
    { id: 4, text: "Check upcoming chemistry live lecture link", completed: true },
    { id: 5, text: "Complete daily 20-min active recall checklist", completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleUploadAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwFileName.trim()) {
      setErrorMessage("Please type/select a valid file name to simulate assignment upload.");
      return;
    }
    setErrorMessage("");
    setIsUploading(true);

    setTimeout(() => {
      const newHw: SubmittedHomework = {
        id: `hw-${Date.now()}`,
        fileName: hwFileName.endsWith(".pdf") || hwFileName.endsWith(".docx") ? hwFileName : `${hwFileName}.pdf`,
        subject: hwSubject,
        submittedAt: "Today (03 June 2026)",
        status: "Awaiting Evaluation",
      };

      setHomeworks((prev) => [newHw, ...prev]);
      setHwFileName("");
      setIsUploading(false);
      setSuccessMessage("Assignment successfully uploaded to Protons evaluation queue!");
      setTimeout(() => setSuccessMessage(""), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-fade-in p-1">
      {/* 1. MOCK STUDENT PROFILE CARD */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-full bg-brand-100 border border-brand-200 text-brand-700 flex items-center justify-center font-bold text-lg">
            SM
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2 justify-center md:justify-start">
              <span>{student.name}</span>
              <span className="text-xs font-mono font-bold bg-brand-50 text-brand-600 px-2 py-0.5 rounded border border-brand-150">
                ACTIVE STUDENT
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Grade Level: {student.grade} &bull; Reg: {student.registerNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-center justify-center">
          <div className="bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-xl text-slate-700">
            <span className="block text-xs text-slate-400 font-semibold font-display">STREAK</span>
            <span className="font-bold flex items-center gap-1 font-mono text-sm text-amber-600 justify-center mt-1">
              <Flame className="w-4.5 h-4.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{student.streakDays} Days</span>
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-xl text-slate-700">
            <span className="block text-xs text-slate-400 font-semibold font-display">ATTENDANCE</span>
            <span className="font-bold font-mono text-sm text-brand-700 block mt-1">
              {student.attendancePercent}%
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-xl text-slate-700">
            <span className="block text-xs text-slate-400 font-semibold font-display">HOURS LEARNED</span>
            <span className="font-bold font-mono text-sm text-indigo-700 block mt-1">
              {student.hoursLearned} Hrs
            </span>
          </div>
        </div>
      </section>

      {/* 2. DYNAMICS SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CHECKLIST & PROGRESS TRACKING (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ClipboardCheck className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-slate-800 text-base font-display">Daily Academic Tasks Checklist</h3>
              <p className="text-[10px] text-slate-400">Complete items to maintain your study streak and diagnostic status rating.</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {todoList.map((todo) => (
              <label
                key={todo.id}
                className={`flex gap-3 items-center p-3 rounded-xl border border-dotted transition-all cursor-pointer select-none ${
                  todo.completed
                    ? "bg-slate-50/50 border-slate-200 text-slate-400 line-through"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4.5 h-4.5 accent-brand-600 rounded cursor-pointer"
                />
                <span className="text-xs font-medium leading-relaxed">{todo.text}</span>
              </label>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold">
              Tasks: {todoList.filter((t) => t.completed).length}/{todoList.length} Finished
            </span>

            <button
              onClick={() => {
                const refreshed = todoList.map((t) => ({ ...t, completed: false }));
                setTodoList(refreshed);
              }}
              className="text-brand-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Daily Board</span>
            </button>
          </div>
        </div>

        {/* 3. ASSIGNMENT UPLOADER & HISTORY (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Uploader Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Upload className="w-5 h-5 text-brand-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-base font-display">Upload School Assignment</h3>
                <p className="text-[10px] text-slate-400">Submit homework in PDF/DOCX representing Form 4-5 topics.</p>
              </div>
            </div>

            <form onSubmit={handleUploadAssignment} className="space-y-3.5 text-xs text-slate-600">
              <div className="space-y-1">
                <label className="font-bold text-slate-600">Subject Class:</label>
                <select
                  value={hwSubject}
                  onChange={(e) => setHwSubject(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Biologies">Biology</option>
                  <option value="ICT">ICT Computing</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600">Assign File Name:</label>
                <input
                  type="text"
                  placeholder="e.g. AcidBaseTitr_Module_PartB.pdf"
                  value={hwFileName}
                  onChange={(e) => setHwFileName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              {errorMessage && (
                <div className="text-rose-600 flex items-center gap-1 bg-rose-50 border border-rose-100 p-2 rounded-lg text-[10px]">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="text-brand-700 flex items-center gap-1 bg-brand-50 border border-brand-100 p-2 rounded-lg text-[10px]">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying and Uploading PDF...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Simulate Assignment Submission</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Submitted list log */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-xs font-display uppercase tracking-wider text-slate-400 border-b border-slate-50 pb-2">
              Submission History LOG
            </h4>

            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {homeworks.map((hw) => (
                <div key={hw.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center text-xs">
                  <div className="space-y-1 min-w-0">
                    <span className="block font-semibold text-slate-800 truncate">{hw.fileName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {hw.subject} &bull; {hw.submittedAt}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-bold ${
                      hw.status === "Completed"
                        ? "bg-green-50 text-green-600 border border-green-150"
                        : "bg-amber-50 text-amber-600 border border-amber-150"
                    }`}
                  >
                    {hw.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
