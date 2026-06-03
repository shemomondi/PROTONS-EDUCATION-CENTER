export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Course {
  id: string;
  name: string;
  grade: string;
  category: "Mathematics" | "Sciences" | "Languages" | "Technology";
  description: string;
  syllabus: string[];
  duration: string;
  fee: number;
  icon: string;
  enrolledCount: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  isCompleted: boolean;
  selectedAnswers: Record<number, number>;
}

export interface TuitionPackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  frequency: "Monthly" | "Quarterly" | "Annually";
  inclusions: string[];
  isPopular?: boolean;
}

export interface StudentProfile {
  name: string;
  grade: string;
  registerNumber: string;
  enrolledCourses: string[];
  attendancePercent: number;
  completedQuizzes: number;
  hoursLearned: number;
  avatarSeed: string;
  streakDays: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "Important" | "Exam Prep" | "AI Update" | "General";
}

export interface RecordedLesson {
  id: string;
  title: string;
  subject: string;
  duration: string;
  videoUrl: string;
  notesUrl: string;
  author: string;
  grade: string;
  views: number;
  description: string;
}

export interface PaymentTransaction {
  id: string;
  studentName: string;
  purpose: string;
  amount: number;
  method: string;
  status: "Successful" | "Pending";
  date: string;
  referenceId: string;
}

export interface RegistrationSubmission {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  subjectsOfInterest: string[];
  additionalNotes: string;
  status: "Received" | "Reviewed" | "Admitted";
  date: string;
}
