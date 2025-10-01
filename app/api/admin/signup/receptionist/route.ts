import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      password,
      department,
      experience,
      employeeId,
      shift,
      workLocation,
      role,
    } = body;

    // Validate required fields
    if (!name || !email || !password || !department || !employeeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or employee ID already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new receptionist
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "receptionist",
      department,
      experience: parseInt(experience) || 0,
      employeeId,
      shift,
      workLocation,
      isActive: true,
    });

    await newUser.save();

    // Remove password from response
    const { password: _, ...userResponse } = newUser.toObject();

    return NextResponse.json(
      {
        message: "Receptionist registered successfully",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Receptionist registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
