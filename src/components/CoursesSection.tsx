import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, BookOpen, Clock, Users, ArrowUpRight, CheckCircle2, PhoneCall } from "lucide-react";
import { Course } from "../types";

interface CoursesSectionProps {
  courses: Course[];
  onNavigate: (tab: string) => void;
  onSelectCourseForFeeEstimate?: (courseId: string) => void;
}

export default function CoursesSection({ courses, onNavigate, onSelectCourseForFeeEstimate }: CoursesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  const categories = ["All", "Mathematics", "Sciences", "Languages", "Technology"];

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 animate-fade-in p-1">
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">我们的课程 — Our Curated Programs</h2>
          <p className="text-slate-500 text-sm max-w-2xl mt-1">
            Carefully structured syllabus packages targeting Form 1-5, SPM, and Pre-University students. Our programs merge traditional rigor with interactive digital resources.
          </p>
        </div>

        <button
          onClick={() => onNavigate("Payments")}
          className="text-xs font-semibold bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg border border-brand-100 hover:bg-brand-100 transition-colors flex items-center gap-1.5"
        >
          <span>View Custom Core Package Pricing</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. FILTERS AND SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search math, force, physics, Python..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. GRID OF COURSES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header elements */}
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider font-bold bg-slate-100 text-slate-600 border border-slate-150">
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold font-display text-slate-900 tracking-tight leading-snug">
                      {course.name}
                    </h3>
                  </div>

                  <span className="text-sm font-bold text-brand-600 font-mono bg-brand-50 px-2.5 py-1 rounded-lg">
                    RM {course.fee}/mo
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 border-b border-slate-50 pb-3">
                  <span className="font-medium text-slate-700">{course.grade}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.enrolledCount} active students</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {course.description}
                </p>

                {/* Syllabus Accordion toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleSyllabus(course.id)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 rounded-xl px-4 flex justify-between items-center text-xs font-semibold text-slate-600 transition-all border border-slate-200/50"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>{expandedSyllabus[course.id] ? "Hide Syllabus Blueprint" : "Show Syllabus Blueprint (5 Modules)"}</span>
                    </span>
                    {expandedSyllabus[course.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Accordion expansion */}
                  {expandedSyllabus[course.id] && (
                    <div className="mt-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 space-y-2.5 animate-slide-down">
                      <h5 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Exam Target Modules:</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {course.syllabus.map((topic, index) => (
                          <div key={index} className="flex gap-2 items-start text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span><strong className="text-slate-800">Module {index + 1}:</strong> {topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {onSelectCourseForFeeEstimate ? (
                  <button
                    onClick={() => {
                      onSelectCourseForFeeEstimate(course.id);
                      onNavigate("Payments");
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Estimate/Add to Invoice</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate("Payments")}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <span>View Tuition Packages</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/60114605536?text=Hi%20Protons%20Tuition,%20I%20want%20to%20enroll%20in%20the%20${encodeURIComponent(course.name)}%20program!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Enrol via WhatsApp</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm">We couldn't find any courses matching your search query.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-xs text-brand-600 font-bold hover:underline"
            >
              Reset all search filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
