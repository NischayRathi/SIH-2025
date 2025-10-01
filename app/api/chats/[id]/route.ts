import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import ChatSession from "@/models/ChatSession";

// GET /api/chats/[id] - Get a specific chat session
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    // For guest users or guest chat IDs, return empty (client handles guest chats)
    if (!session?.user || resolvedParams.id.startsWith("guest_")) {
      return NextResponse.json({
        chatSession: {
          _id: resolvedParams.id,
          messages: [],
          isGuest: true,
        },
      });
    }

    await connectDB();

    const chatSession = await ChatSession.findOne({
      _id: resolvedParams.id,
      userId: (session.user as any).id,
    });

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ chatSession });
  } catch (error) {
    console.error("Error fetching chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/chats/[id] - Add a message to chat session
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // For guest users or guest chat IDs, return success without database operations
    if (!session?.user || resolvedParams.id.startsWith("guest_")) {
      return NextResponse.json({ success: true, isGuest: true });
    }

    await connectDB();

    const chatSession = await ChatSession.findOne({
      _id: resolvedParams.id,
      userId: (session.user as any).id,
    });

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    chatSession.messages.push(message);
    await chatSession.save();

    return NextResponse.json({ success: true, isGuest: false });
  } catch (error) {
    console.error("Error updating chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/chats/[id] - Update chat session title
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const chatSession = await ChatSession.findOneAndUpdate(
      {
        _id: resolvedParams.id,
        userId: (session.user as any).id,
      },
      { title, updatedAt: new Date() },
      { new: true }
    );

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, chatSession });
  } catch (error) {
    console.error("Error updating chat session title:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/chats/[id] - Delete a chat session
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    // For guest users or guest chat IDs, return success without database operations
    if (!session?.user || resolvedParams.id.startsWith("guest_")) {
      return NextResponse.json({ success: true, isGuest: true });
    }

    await connectDB();

    const result = await ChatSession.deleteOne({
      _id: resolvedParams.id,
      userId: (session.user as any).id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, isGuest: false });
  } catch (error) {
    console.error("Error deleting chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
