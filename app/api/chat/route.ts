import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";

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
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, delayMs = 1000): Promise<T> {
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
  try {
    const { question, history } = await req.json();

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
    // system instruction
   const systemInstruction = `You are AyurBot, a friendly expert in Ayurveda, yoga, and health.
Here is the conversation so far:
${historyText || "No previous history."}
Context: ${context || "No specific context retrieved for this query."}`;

    // generate response
    const response = await withRetry(() =>
      model.generateContent({
        contents: [
          { role: "user", parts: [{ text: systemInstruction + "\n\nQuestion: " + question }] },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
      })
    );

    return NextResponse.json({
      answer: response.response.text(),
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}