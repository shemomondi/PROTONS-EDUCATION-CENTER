import { Course, TuitionPackage, Announcement, RecordedLesson, StudentProfile } from "./types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "math-sec-1",
    name: "Mathematics Masterclass",
    grade: "Secondary (Form 1 - 5)",
    category: "Mathematics",
    description: "Build exceptional structural prowess in Algebra, Trigonometry, and Calculus. Emphasizes problem-solving mechanics and exam-ready shortcuts.",
    syllabus: [
      "Fundamentals of Quadratic Functions",
      "Linear Inequalities and Graphical Representation",
      "Calculus: Rate of Change and Integration Mechanics",
      "Advanced Vectors and Matrices applications",
      "Symmetry, Similarity & Coordinate Geometry"
    ],
    duration: "4 Months | 2 Sessions/week",
    fee: 120,
    icon: "Calculator",
    enrolledCount: 142
  },
  {
    id: "physics-preu-1",
    name: "Advanced Physics & Mechanics",
    grade: "Pre-University / A-Levels",
    category: "Sciences",
    description: "Deep dive into Newtonian Mechanics, Electromagnetism, and Quantum Fundamentals. Focuses on structured derivation and laboratory analysis.",
    syllabus: [
      "Kinematics and Dynamics: Friction and Circular Fields",
      "Work, Intensity, and Gravitational Orbit Computations",
      "Electrostatics & AC/DC Network Circuits",
      "Wave Phase Interference & Superposition Principles",
      "Quantum and Nuclear Structure Essentials"
    ],
    duration: "6 Months | 2 Sessions/week",
    fee: 150,
    icon: "Atom",
    enrolledCount: 98
  },
  {
    id: "chem-sec-2",
    name: "Proton Chemistry Studio",
    grade: "Secondary (Form 4 - 5)",
    category: "Sciences",
    description: "Understand stoichiometry, rates of reactions, organic mechanics, and chemical equations with interactive visual aids and lab simulations.",
    syllabus: [
      "The Periodic Table & Chemical Bonding Dynamics",
      "Acid-Base Chemistry & Enthalpy of Neutralization",
      "Stoichiometry: Mole Calculations & Critical Titrations",
      "Electrochemistry: Electrolysis Cells & Redox half-equations",
      "Introduction to Organic Chemistry: Alkanes, Alkenes, and Esters"
    ],
    duration: "4 Months | 1 Session/week",
    fee: 110,
    icon: "FlaskConical",
    enrolledCount: 115
  },
  {
    id: "bio-sec-3",
    name: "Biology & Human Systems",
    grade: "Secondary (Form 4 - 5)",
    category: "Sciences",
    description: "Comprehensive review of cell metabolism, genetics, physiology, and ecosystems with mnemonics designed for top exam scores.",
    syllabus: [
      "Cell Biology, Structure and Passive Organelle transport",
      "Enzyme kinetics, activation energy, and optimal pH dynamics",
      "Human Physiology: Digestion, Cardiovascular, and Gas Exchange",
      "Mendelian Inheritance and Chromosomal Crossing-over",
      "Ecology: Food Webs, Nutrient Cycle, and Environmental balance"
    ],
    duration: "4 Months | 1 Session/week",
    fee: 110,
    icon: "Dna",
    enrolledCount: 84
  },
  {
    id: "eng-all-1",
    name: "English Rhetoric & Literature",
    grade: "All Levels (Primary & Secondary)",
    category: "Languages",
    description: "Express arguments clearly and construct elegant essays. Features vocabulary enrichment, grammatical analysis, and literature appreciation.",
    syllabus: [
      "Advanced Narrative Writing & Structural Storytelling",
      "Persuasive Rhetoric & Newspaper Editorial Editing",
      "Analytical Reading: Literary Devices and Metaphors",
      "Syntax: Perfecting Tenses and Subject-Verb Agreements",
      "Public Presentation & Constructive Debate workshops"
    ],
    duration: "3 Months | 1 Session/week",
    fee: 90,
    icon: "BookOpen",
    enrolledCount: 121
  },
  {
    id: "ict-all-2",
    name: "Tech-Driven Computer Science (ICT)",
    grade: "Pre-University & High School",
    category: "Technology",
    description: "Gain structural familiarity with computation logic, binary representation, custom databases, and introduction to script programming with Python.",
    syllabus: [
      "Hardware Architecture: Logical Gates and CPU Bus Mechanics",
      "Structured Algorithm Design: Flowcharts & Pseudocode",
      "Introduction to Python: Control Blocks, Lists & Methods",
      "Relational Databases: SQL queries, schemas & normalizations",
      "Web Architecture: Networking Protocols, HTML5, CSS3 foundations"
    ],
    duration: "3 Months | 2 Sessions/week",
    fee: 130,
    icon: "Cpu",
    enrolledCount: 67
  }
];

export const INITIAL_PACKAGES: TuitionPackage[] = [
  {
    id: "pkg-basic",
    title: "Proton Standard Starter",
    subtitle: "Ideal for focused review of 1 core active subject",
    price: 95,
    frequency: "Monthly",
    inclusions: [
      "1 Structured Subject (Math/Sciences/English)",
      "Weekly 2-hour Interactive Online Classes",
      "Fully operational AI Learning Assistant access",
      "Syllabus-aligned downloadable PDF manuals",
      "Monthly academic progress diagnostics report",
      "WhatsApp direct support query dispatch"
    ]
  },
  {
    id: "pkg-pro",
    title: "Protons Accelerated Duo",
    subtitle: "Highly popular bundle for dual-subject intensive prep",
    price: 180,
    frequency: "Monthly",
    inclusions: [
      "Any 2 Core Subjects tailored to your current level",
      "All physical + digital syllabus study worksheets",
      "24/7 AI chatbot premium personalized tutoring",
      "Priority automated quiz generation & revision",
      "WhatsApp tutor voice notes & homework verification",
      "Weekly live recorded lecture vaults & playback",
      "Mock exams simulation with peer comparison benchmarks"
    ],
    isPopular: true
  },
  {
    id: "pkg-ultimate",
    title: "Protons Elite STEM Bundle",
    subtitle: "Ultimate educational bundle for overall school grades top score",
    price: 495,
    frequency: "Quarterly",
    inclusions: [
      "Up to 4 Integrated Core Classes (Math, Physics, Chem, Bio)",
      "1-on-1 virtual revision review coaching check-ins",
      "Full digital student dashboard customization support",
      "Premium AI revision recommenders and homework support",
      "Priority answers verification by Protons board markers",
      "Unlimited access to mock final year practice testing",
      "Custom certification upon completing program modules"
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "✨ Interactive AI Study Hub Launch!",
    content: "We have fully integrated an automated AI study chatbot and customized quiz recommender onto our student platform. Explore premium exam guidance immediately!",
    date: "June 2026",
    category: "AI Update"
  },
  {
    id: "ann-2",
    title: "📅 Intensive Revision Class Schedules published",
    content: "The revision schedule for mathematics and advanced science subjects for the semester preparation starts next Monday. View 'Online Classes' tab to allocate your slots.",
    date: "May 2026",
    category: "Important"
  },
  {
    id: "ann-3",
    title: "🏆 Excellence scholarships program open for 2026 intake",
    content: "Applications for the distinguished Protons Scholar Tuition Grant are now being curated. Top scorers gain full fee waivers. Contact us at 0114605536.",
    date: "May 2026",
    category: "General"
  }
];

export const INITIAL_RECORDED_LESSONS: RecordedLesson[] = [
  {
    id: "vid-1",
    title: "Mastering Quadratic Equations - Discriminant Analysis",
    subject: "Mathematics",
    duration: "42 Mins",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notesUrl: "#",
    author: "Dr. Adrian Proton (Principal Mathematics)",
    grade: "Secondary",
    views: 1240,
    description: "Deep derivation showing how to prove real and imaginary roots using the discriminant formula. Solves three standard hard examination queries step-by-step."
  },
  {
    id: "vid-2",
    title: "Electromagnetism: Solenoids & Faraday's Law explained",
    subject: "Physics",
    duration: "55 Mins",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    notesUrl: "#",
    author: "Sir Robert K. (Physics Board Examiner)",
    grade: "Pre-University",
    views: 890,
    description: "Visual analysis of magnetic field structures surrounding current-carrying conductors, highlighting Lenz's law opposing dynamics."
  },
  {
    id: "vid-3",
    title: "Mole Calculations & Enthalpy Stoichiometry",
    subject: "Chemistry",
    duration: "38 Mins",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notesUrl: "#",
    author: "Madam Sarah Lee (Secondary Chemistry Lead)",
    grade: "Secondary",
    views: 940,
    description: "A flawless, intuitive guide to stoichiometric ratios and calculating enthalpy change. Perfect for students struggling with concentration and volumetric conversions."
  }
];

export const INITIAL_STUDENT: StudentProfile = {
  name: "Sharifa Momondi",
  grade: "Secondary (Form 5)",
  registerNumber: "PR-2026-0883",
  enrolledCourses: ["math-sec-1", "chem-sec-2"],
  attendancePercent: 96,
  completedQuizzes: 12,
  hoursLearned: 38.5,
  avatarSeed: "female-student",
  streakDays: 5
};
