import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, RefreshCw, Check, X, HelpCircle, ArrowRight, Library, FileText, AlertCircle, Bookmark, ChevronRight, GraduationCap } from "lucide-react";
import { Message, QuizQuestion, QuizState } from "../types";

export default function AIAssistantSection() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: `Welcome to the PROTONS AI Study Hub! I am your personal intelligent study assistant.
How can I support your homework review or revision exercises today?

**You can ask me to:**
*   *Explain complex principles* (e.g., "Explain how Lenz's law works in electromagnetism")
*   *Write down step-by-step math derivations* ("Prove the quadratic formula discriminant rules")
*   *Set up custom mock study goals* or daily revision planners.

Go ahead, ask an academic question below or select a subject filter!`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [chatSubject, setChatSubject] = useState("Sciences");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Quiz generator state
  const [quizSubject, setQuizSubject] = useState("Mathematics");
  const [quizTopic, setQuizTopic] = useState("Quadratic Equations");
  const [quizGrade, setQuizGrade] = useState("Secondary (Form 4 - 5)");
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<{ title: string; questions: QuizQuestion[] } | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    isCompleted: false,
    selectedAnswers: {},
  });
  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false);

  // Smart recommender state
  const [stargingScore, setStartingScore] = useState("75");
  const [weakPointsInput, setWeakPointsInput] = useState("Balancing chemistry equations & Mole calculations");
  const [isRecomLoading, setIsRecomLoading] = useState(false);
  const [recommendationsText, setRecommendationsText] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Preloaded prompts helper
  const handlePreloadedPrompt = (prompt: string, subject: string) => {
    setChatSubject(subject);
    setInput(prompt);
  };

  // 1. Submit Chat
  const handleSubmitChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isChatLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          selectedSubject: chatSubject,
        }),
      });

      const data = await response.json();
      const botMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.text || "I apologize, I received an invalid response from my core server models.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Oops! My network server encountered a transient issue. Please ensure your development server is running and check settings.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // 2. Generate Quiz
  const handleGenerateQuiz = async () => {
    setIsQuizLoading(true);
    setGeneratedQuiz(null);
    setHasCheckedAnswers(false);

    try {
      const response = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: quizSubject,
          topic: quizTopic,
          grade: quizGrade,
        }),
      });

      const data = await response.json();
      if (data.quiz) {
        setGeneratedQuiz(data.quiz);
        setQuizState({
          questions: data.quiz.questions || [],
          currentQuestionIndex: 0,
          score: 0,
          isCompleted: false,
          selectedAnswers: {},
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsQuizLoading(false);
    }
  };

  // Answer selection handler
  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (hasCheckedAnswers) return;
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [qIdx]: oIdx,
      },
    }));
  };

  // Score evaluation
  const handleCheckQuizAnswers = () => {
    let finalScore = 0;
    const total = quizState.questions.length;

    quizState.questions.forEach((q, idx) => {
      if (quizState.selectedAnswers[idx] === q.correctIndex) {
        finalScore += 1;
      }
    });

    const percentScore = Math.round((finalScore / (total || 1)) * 100);

    setQuizState((prev) => ({
      ...prev,
      score: percentScore,
      isCompleted: true,
    }));
    setHasCheckedAnswers(true);

    // Sync with Recommender score automatically!
    setStartingScore(percentScore.toString());
  };

  // 3. Generate Recommendations
  const handleGenerateRecommendations = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsRecomLoading(true);
    setRecommendationsText("");

    try {
      const response = await fetch("/api/gemini/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizScore: stargingScore,
          subject: quizSubject,
          weakPoints: weakPointsInput,
        }),
      });

      const data = await response.json();
      setRecommendationsText(data.recommendations || "Analysis complete. Keep testing concepts!");
    } catch (err) {
      console.error(err);
      setRecommendationsText("Failed to compile analysis. Please check your network credentials.");
    } finally {
      setIsRecomLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in p-1">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-8 rounded-3xl text-white relative overflow-hidden border border-slate-800">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-brand-500/20 text-brand-200 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>AI-Driven Education Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-none">
            Protons AI Personal Study Companion
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl font-light">
            Empower your revision dynamically. Ask high-context questions, build diagnostic quizzes aligned directly to Form 4-5 structures, or map out tailored step-by-step guidance reports.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-brand-500 opacity-15 blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ================= LEFT COLUMN: CHAT INTERFACE (7 Cols) ================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[650px] justify-between">
          {/* Chat header */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm font-display">Protons Chat Advisor</h3>
                <p className="text-[10px] text-slate-400">Powered by Gemini 3.5 AI</p>
              </div>
            </div>

            {/* Subject selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Topic:</span>
              <select
                value={chatSubject}
                onChange={(e) => setChatSubject(e.target.value)}
                className="text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="Sciences">Chemistry & Science</option>
                <option value="Physics">Advanced Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">Languages & Essay</option>
                <option value="ICT">ICT Computing</option>
              </select>
            </div>
          </div>

          {/* Chat history section */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm shadow-2xs leading-relaxed space-y-2 ${
                    msg.role === "user"
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-150"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span
                    className={`block text-[9px] text-right font-mono ${
                      msg.role === "user" ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-slate-150 flex items-center gap-2.5 text-xs text-slate-500">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />
                  <span>Proton AI is calculating explanation...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Preloaded buttons bar */}
          <div className="px-4 py-2 border-t border-slate-100 flex flex-wrap gap-1.5 bg-slate-50/50 shrink-0 select-none">
            <span className="text-[10px] text-slate-400 font-bold self-center uppercase mr-1">Tutor Prompts:</span>
            <button
              onClick={() => handlePreloadedPrompt("Explain the photoelectric effect with kinetic formula.", "Physics")}
              className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold rounded-md transition-colors"
            >
              Photoelectric Formula
            </button>
            <button
              onClick={() => handlePreloadedPrompt("Provide a quick SPM stoichiometric mole ratio guide.", "Sciences")}
              className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold rounded-md transition-colors"
            >
              SPM Chemistry Moles
            </button>
            <button
              onClick={() => handlePreloadedPrompt("What are common calculus differentiation rules on SPM?", "Mathematics")}
              className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold rounded-md transition-colors"
            >
              Calculus Derivative
            </button>
          </div>

          {/* Message input space */}
          <form onSubmit={handleSubmitChat} className="p-4 bg-white border-t border-slate-100 flex gap-2.5 shrink-0 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask any homework question in ${chatSubject}...`}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800"
            />
            <button
              type="submit"
              disabled={isChatLoading || !input.trim()}
              className="p-3 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE QUIZZER & ADVISOR (5 Cols) ================= */}
        <div className="lg:col-span-5 space-y-8">
          {/* Smart MCQ interactive quizzer */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <GraduationCap className="w-5 h-5 text-brand-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-base font-display">Automated Practice Quizzers</h3>
                <p className="text-[10px] text-slate-400">Generate structured exam diagnostic questionnaires instantly.</p>
              </div>
            </div>

            {/* Config inputs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Class Subject:</label>
                <select
                  value={quizSubject}
                  onChange={(e) => setQuizSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="ICT">ICT Computing</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">School Grade:</label>
                <select
                  value={quizGrade}
                  onChange={(e) => setQuizGrade(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                >
                  <option value="Secondary (Form 1 - 3)">Form 1 - 3 Lower</option>
                  <option value="Secondary (Form 4 - 5)">Form 4 - 5 upper</option>
                  <option value="Pre-University">Pre-U / A-Level</option>
                </select>
              </div>

              <div className="col-span-2 space-y-1">
                <label className="font-bold text-slate-600 block">Target Topical subconcept:</label>
                <input
                  type="text"
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  placeholder="e.g. Acid-Bases / Forces / Integration"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={isQuizLoading}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              {isQuizLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>AI is Formulating SPM Mock Answers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Quick 3-Question MCQ Quiz</span>
                </>
              )}
            </button>

            {/* Quiz output and answering states */}
            {generatedQuiz && (
              <div className="space-y-5 pt-3 border-t border-slate-100 animate-slide-down">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="font-bold text-slate-800 font-display leading-tight">{generatedQuiz.title}</h4>
                  {hasCheckedAnswers && (
                    <span className="font-mono text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md font-bold">
                      Grade Score: {quizState.score}%
                    </span>
                  )}
                </div>

                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                  {quizState.questions.map((q, qIdx) => (
                    <div key={qIdx} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <p className="text-xs font-semibold text-slate-800">
                        {qIdx + 1}. {q.question}
                      </p>

                      <div className="grid grid-cols-1 gap-1.5 text-xs">
                        {q.options.map((option, oIdx) => {
                          const isSelected = quizState.selectedAnswers[qIdx] === oIdx;
                          const isCorrect = q.correctIndex === oIdx;

                          let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                          if (isSelected) btnStyle = "bg-indigo-50 border-indigo-300 text-indigo-900";

                          // Color highlight post evaluation
                          if (hasCheckedAnswers) {
                            if (isCorrect) {
                              btnStyle = "bg-green-50 border-green-300 text-green-900 font-semibold";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-50 border-rose-300 text-rose-900";
                            } else {
                              btnStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(qIdx, oIdx)}
                              disabled={hasCheckedAnswers}
                              className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex justify-between items-center ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {hasCheckedAnswers && isCorrect && <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                              {hasCheckedAnswers && isSelected && !isCorrect && <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Block */}
                      {hasCheckedAnswers && (
                        <div className="p-2 bg-slate-100 rounded-md text-[10px] text-slate-600 leading-normal border-l-2 border-slate-400">
                          <span className="font-bold text-slate-700 mr-1">Tackling Guide:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!hasCheckedAnswers ? (
                  <button
                    onClick={handleCheckQuizAnswers}
                    disabled={Object.keys(quizState.selectedAnswers).length < quizState.questions.length}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                  >
                    Calculate Mock Diagnostic Score
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateQuiz}
                    className="w-full py-2 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Regenerate New Topical Questions</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Smart Revision Recommendations Planner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <div>
                <h3 className="font-bold text-white text-base font-display">AI Revision recommendations planner</h3>
                <p className="text-[10px] text-slate-400">Draft personalized learning timetables dynamically.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateRecommendations} className="space-y-3.5 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold">Recent Score (%):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={stargingScore}
                    onChange={(e) => setStartingScore(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold">Class subject focus:</label>
                  <span className="block p-2 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
                    {quizSubject}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 font-bold">Weak Areas or Challenges:</label>
                <textarea
                  rows={2}
                  value={weakPointsInput}
                  onChange={(e) => setWeakPointsInput(e.target.value)}
                  placeholder="e.g. stoichiometric mole computations or writing vectors"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isRecomLoading}
                className="w-full py-2 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                {isRecomLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling Spaced Repetition Blueprint...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Revision Recommendation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {recommendationsText && (
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-200 space-y-3 leading-relaxed max-h-[220px] overflow-y-auto animate-slide-down scrollbar-thin">
                <h4 className="font-bold text-brand-400 uppercase tracking-wider text-[10px] flex items-center gap-1 border-b border-slate-700 pb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>Personalized Protons recommendations:</span>
                </h4>
                <div className="prose prose-invert prose-xs text-slate-300 whitespace-pre-line">
                  {recommendationsText}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
