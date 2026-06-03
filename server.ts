import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: any = null;
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. AI Study Assistant Chat API
app.post("/api/gemini/chat", async (req, res) => {
  const { messages, selectedSubject } = req.body;
  const ai = getAI();

  const contextPrompt = `You are "Protons AI Study Assistant", an online educational tutor at PROTONS TUITION CENTRE.
Your expertise is in ${selectedSubject || "general academic excellence, STEM, Mathematics, Physics, Chemistry, Biology, and ICT"}.
Guidelines:
1. Provide highly professional, educational, motivating, and clear explanations.
2. Structure your answers with simple markdown, bullet points, and highlight formulas.
3. Encourage students and suggest smart revision recommendations where appropriate.
4. Keep the response compact and readable; do not exceed 300 words.`;

  if (!ai) {
    // Elegant fallback simulation if API is missing
    const userMsg = messages[messages.length - 1]?.content || "";
    const lowerMsg = userMsg.toLowerCase();
    let reply = "Welcome to PROTONS TUITION CENTRE! How can I assist you with your studies today?";

    if (lowerMsg.includes("math") || lowerMsg.includes("equation") || lowerMsg.includes("formula")) {
      reply = `**Hello from Protons Tuition Centre!** Here is a quick tip on **Mathematics (Quadratic Equation)**:\n\n*   Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n*   *Tip:* Always check the discriminant ($D = b^2 - 4ac$) first to find the nature of the roots! This is part of our *Smart Revision Recommendations*.\n\nType any academic question or request a quick practice quiz to begin! (Configure your \`GEMINI_API_KEY\` in Secrets for fully real-time AI responses).`;
    } else if (lowerMsg.includes("physics") || lowerMsg.includes("force") || lowerMsg.includes("chemistry")) {
      reply = `**Academic Guidance (Science/Physics)**:\n\nAn key formula frequently examined is Newton's Second Law: $F = ma$ (Force = mass × acceleration) or kinetic energy $KE = \\frac{1}{2}mv^2$.\n\nAt Protons, we specialize in high-impact science coaching. Let me know if you would like automated quiz questions for this topic!`;
    } else if (lowerMsg.includes("quiz") || lowerMsg.includes("test")) {
      reply = `I can generate multiple-choice questions for you! Please use the **Smart Quiz Generator** tab on this screen to create custom quizzes instantly.`;
    } else {
      reply = `**Hi, thank you for contacting Protons AI Study Support!**\n\nI can help you review study materials, draft checklists, or answer questions in Science, Maths, or English. \n\nOur office and hotlines are open! Call/WhatsApp us at **0114605536** to join our intensive classes, or ask me another specific question here.`;
    }

    return res.json({
      text: reply,
      simulated: true,
    });
  }

  try {
    // Reconstruct the message log for Gemini parameter guidelines
    const model = "gemini-3.5-flash";
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Inject system instructions naturally inside config
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: contextPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with AI model" });
  }
});

// 2. Automated Smart Quiz Generator API (JSON Mode)
app.post("/api/gemini/quiz", async (req, res) => {
  const { subject, topic, grade } = req.body;
  const ai = getAI();

  if (!ai) {
    // Generate simulated quiz matching required JSON schema
    const simulatedQuizzes: Record<string, any> = {
      mathematics: {
        title: "Mathematics Diagnostic - Quadratic Equations",
        questions: [
          {
            question: "What is the discriminant of the quadratic equation 2x² - 5x + 3 = 0?",
            options: ["1", "4", "25", "-1"],
            correctIndex: 0,
            explanation: "The discriminant is D = b² - 4ac. Here, a=2, b=-5, c=3. D = (-5)² - 4(2)(3) = 25 - 24 = 1."
          },
          {
            question: "If a quadratic equation has a discriminant equal to zero, what is the nature of its roots?",
            options: ["Two distinct real roots", "Two equal real roots", "No real roots", "Infinite roots"],
            correctIndex: 1,
            explanation: "When D = 0, the equation has two equal and real roots (or one repeated root)."
          }
        ]
      },
      physics: {
        title: "Physics Revision - Force and Motion",
        questions: [
          {
            question: "A force of 15 N is applied to a mass of 3 kg. What is the acceleration produced?",
            options: ["5 m/s²", "45 m/s²", "0.2 m/s²", "12 m/s²"],
            correctIndex: 0,
            explanation: "Using F = ma, we get a = F/m = 15/3 = 5 m/s²."
          },
          {
            question: "Which of Newton's laws of motion describes action and reaction forces?",
            options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
            correctIndex: 2,
            explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction."
          }
        ]
      }
    };

    const key = (subject || "").toLowerCase();
    const quiz = simulatedQuizzes[key] || {
      title: `${subject || "General Science"} - ${topic || "Revision Mock"}`,
      questions: [
        {
          question: `Which of the following describes the core theme in ${topic || "academic fundamentals"}?`,
          options: ["Strategic repetition & feedback", "Passive memorization", "Random guessing", "Ignoring syllabus criteria"],
          correctIndex: 0,
          explanation: "Active learning through focused retrieval and feedback has scientifically been proven to accelerate consolidation."
        },
        {
          question: `What is the key objective of learners at Protons Tuition Centre?`,
          options: ["Academic excellence & mastery", "Mere attendance", "Avoiding revision", "Storing materials without reading"],
          correctIndex: 0,
          explanation: "Supporting learners with structured technology-driven assistance transforms potential into top exam grades!"
        }
      ]
    };

    return res.json({ quiz, simulated: true });
  }

  try {
    const prompt = `Create a high-quality educational multiple-choice quiz about the subject "${subject}" for a "${grade}" student, specifically focusing on the topic "${topic || "Syllabus Overview"}". Generate exactly 3 challenging but fair questions with brief, clarifying explanations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The title of the generated educational quiz",
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "The question statement clearly formatted",
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Exactly 4 multiple-choice answers",
                  },
                  correctIndex: {
                    type: Type.INTEGER,
                    description: "The 0-based index of the correct option",
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "Brief academic derivation or explanation showing why this is the correct choice",
                  },
                },
                required: ["question", "options", "correctIndex", "explanation"],
              },
            },
          },
          required: ["title", "questions"],
        },
      },
    });

    const quizData = JSON.parse(response.text.trim());
    res.json({ quiz: quizData });
  } catch (error: any) {
    console.error("Gemini Quiz API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI quiz" });
  }
});

// 3. Smart Revision Recommendations API
app.post("/api/gemini/recommendations", async (req, res) => {
  const { quizScore, subject, weakPoints } = req.body;
  const ai = getAI();

  const prompt = `Create a personalized smart learning guidance report & actionable revision suggestions for a student taking ${subject}.
Score from recent quiz: ${quizScore}/100.
Areas they struggled with or want to improve: "${weakPoints || "general formulas and concepts"}".
Provide 3 bulleted specific techniques and 1 recommended daily practice checklist. Keep the language highly encouraging, professional, and structured.`;

  if (!ai) {
    return res.json({
      recommendations: `### Protons Recommended Revision Strategy for ${subject || "your studies"}\n\n*   **Active Recall Drill:** Since you marked "${weakPoints || "key formulas"}" as challenging, practice writing them down from memory on blank papers every morning.\n*   **Spaced Repetition Interval:** Review this topic in exactly 2 days, and then 5 days. \n*   **Leverage Protons WhatsApp Hotlines (0114605536):** Direct-message your complex questions to our subject tutors for instant breakdown.\n\n#### Your Daily 20-Min Action Checklist:\n1. Solve at least 2 structured practice questions on this topic.\n2. Summarize the textbook explanation in a single sentence mapping out the steps.\n3. Complete one smart simulator mock quiz. (Configure your \`GEMINI_API_KEY\` to get tailored daily timetables dynamically generated here).`,
      simulated: true,
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });
    res.json({ recommendations: response.text });
  } catch (error: any) {
    console.error("Gemini Recommendations Error:", error);
    res.status(500).json({ error: "Failed to generate personalized guidance" });
  }
});

// Serve Frontend Vite Assets and start server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Ensure binding to host 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PROTONS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
