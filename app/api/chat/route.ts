import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, history } = body;

    // Simple test response
    return NextResponse.json({
      answer: `You asked: "${question}". This is a test response from AyurBot!`,
      usedRAG: false,
      sourcesCount: 0,
      fallback: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      answer: "Sorry, I'm having technical difficulties. Please try again.",
      usedRAG: false,
      sourcesCount: 0,
      fallback: true,
    });
  }
}