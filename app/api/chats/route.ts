import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import ChatSession from "@/models/ChatSession";

// GET /api/chats - Get all chat sessions for the user (registered users only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // For guest users, return empty array as their chats are stored client-side only
    if (!session?.user) {
      return NextResponse.json({ chatSessions: [] });
    }

    await connectDB();

    const chatSessions = await ChatSession.find({
      userId: (session.user as any).id,
    })
      .select("_id title createdAt updatedAt")
      .sort({ updatedAt: -1 });

    return NextResponse.json({ chatSessions });
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/chats - Create a new chat session (registered users only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // For guest users, don't create database entries - they'll handle chats client-side
    if (!session?.user) {
      // Return a mock response for guest users to maintain API compatibility
      const mockId = `guest_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      return NextResponse.json({
        chatSession: {
          _id: mockId,
          title: "Guest Chat",
          createdAt: new Date(),
          updatedAt: new Date(),
          isGuest: true,
        },
      });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const newChatSession = new ChatSession({
      userId: (session.user as any).id,
      title,
      messages: [
        {
          sender: "bot",
          text: "Hello! I'm AyurBot, your AI assistant for Ayurveda, yoga, and holistic wellness. I have access to traditional knowledge about doshas, herbs, treatments, meditation, and natural health practices. How can I help you today?",
          timestamp: new Date(),
        },
      ],
    });

    await newChatSession.save();

    return NextResponse.json({
      chatSession: {
        _id: newChatSession._id,
        title: newChatSession.title,
        createdAt: newChatSession.createdAt,
        updatedAt: newChatSession.updatedAt,
        isGuest: false,
      },
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
