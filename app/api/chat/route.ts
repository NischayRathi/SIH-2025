import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";

// Fallback responses for when AI is unavailable
const fallbackResponses = {
  greeting:
    "Hello! I'm AyurBot, your AI assistant for Ayurveda, yoga, and wellness questions. How can I help you today?",
  ayurveda:
    "Ayurveda is an ancient system of medicine from India that focuses on balancing mind, body, and spirit. It uses natural remedies, diet, lifestyle practices, and herbal treatments. The three doshas (Vata, Pitta, Kapha) are central concepts.",
  yoga: "Yoga combines physical postures (asanas), breathing exercises (pranayama), and meditation for overall wellness. Start with basic poses and focus on proper breathing. Regular practice brings flexibility, strength, and mental clarity.",
  meditation:
    "Meditation helps reduce stress and improve mental clarity. Start with 5-10 minutes daily, focusing on your breath. Sit comfortably, close your eyes, and gently return attention to breathing when your mind wanders.",
  dosha:
    "The three doshas are Vata (air/space - movement), Pitta (fire/water - metabolism), and Kapha (earth/water - structure). Each person has a unique constitution with one or more dominant doshas.",
  health:
    "For serious health concerns, please consult qualified healthcare professionals. Ayurveda emphasizes prevention through proper diet, daily routines, seasonal adjustments, and lifestyle practices suited to your constitution.",
  herbs:
    "Common Ayurvedic herbs include turmeric (anti-inflammatory), ashwagandha (stress relief), triphala (digestion), and tulsi (immunity). Always consult a practitioner before using herbs medicinally.",
  diet: "Ayurvedic nutrition emphasizes eating according to your dosha, seasonal foods, proper food combinations, and mindful eating. Warm, cooked foods are generally preferred over cold, raw foods.",
  default:
    "I'm currently having technical difficulties accessing my full knowledge base. For detailed Ayurvedic guidance, I recommend consulting with a qualified Ayurvedic practitioner or referring to authentic texts.",
};

function getResponseKeywords(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
    return "greeting";
  if (q.includes("ayurveda") || q.includes("ayurvedic")) return "ayurveda";
  if (q.includes("yoga") || q.includes("asana") || q.includes("pose"))
    return "yoga";
  if (q.includes("meditat") || q.includes("mindful")) return "meditation";
  if (
    q.includes("dosha") ||
    q.includes("vata") ||
    q.includes("pitta") ||
    q.includes("kapha")
  )
    return "dosha";
  if (
    q.includes("health") ||
    q.includes("wellness") ||
    q.includes("sick") ||
    q.includes("disease")
  )
    return "health";
  if (q.includes("herb") || q.includes("medicine") || q.includes("remedy"))
    return "herbs";
  if (
    q.includes("food") ||
    q.includes("diet") ||
    q.includes("nutrition") ||
    q.includes("eat")
  )
    return "diet";
  return "default";
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY!,
  model: "text-embedding-004",
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

// helper
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 503 && attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries reached without success"); // ✅ ensures return
}

export async function POST(req: Request) {
  let question = "";
  let history: any[] = [];

  try {
    const body = await req.json();
    question = body.question;
    history = body.history;

    // embed question
    const queryVector = await embeddings.embedQuery(question);

    // search Pinecone
    const searchResults = await pineconeIndex.query({
      topK: 10,
      vector: queryVector,
      includeMetadata: true,
    });

    const context = searchResults.matches
      .map((m) => String(m.metadata?.text ?? "")) // safe string
      .filter((t) => t.trim().length > 0)
      .join("\n\n---\n\n");

    const historyText = Array.isArray(history)
      ? history.map((h: any) => `${h.sender}: ${h.text}`).join("\n")
      : "";
    try {
      // system instruction
      const systemInstruction = `You are AyurBot, a knowledgeable and friendly AI assistant specializing in Ayurveda, yoga, and holistic health. 

Guidelines:
- Provide helpful, accurate information about Ayurveda, yoga, meditation, and natural health
- Keep responses concise but informative (2-3 sentences when possible)  
- Avoid repetitive greetings like "Namaste" in every response
- Be warm and encouraging but professional
- Always suggest consulting healthcare professionals for serious medical concerns
- Focus on traditional wellness practices and natural remedies

${historyText ? `Previous conversation:\n${historyText}\n` : ""}
${context ? `Relevant context:\n${context}\n` : ""}

User's question: ${question}

Please provide a helpful response:`;

      // generate response
      const response = await withRetry(() =>
        model.generateContent({
          contents: [{ role: "user", parts: [{ text: systemInstruction }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        })
      );

      return NextResponse.json({
        answer: response.response.text(),
        usedRAG: context.length > 0,
        sourcesCount: searchResults.matches.length,
        fallback: false,
      });
    } catch (aiError: any) {
      console.log("AI API failed, using fallback response:", aiError.message);

      // Use intelligent fallback based on question content
      const keyword = getResponseKeywords(question);
      const fallbackAnswer =
        fallbackResponses[keyword as keyof typeof fallbackResponses] ||
        fallbackResponses.default;

      return NextResponse.json({
        answer: fallbackAnswer,
        usedRAG: false,
        sourcesCount: 0,
        fallback: true,
      });
    }
  } catch (error: any) {
    console.error("Chat API error:", error);

    // Final fallback
    const keyword = getResponseKeywords(question);
    const fallbackAnswer =
      fallbackResponses[keyword as keyof typeof fallbackResponses] ||
      fallbackResponses.default;

    return NextResponse.json({
      answer: fallbackAnswer,
      usedRAG: false,
      sourcesCount: 0,
      fallback: true,
    });
  }
}
