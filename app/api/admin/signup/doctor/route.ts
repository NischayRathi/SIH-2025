import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    await connectDB();
    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      email,
      password,
      phone,
      specialization,
      licenseNumber,
      experience,
      department,
    } = body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !licenseNumber ||
      !department
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create doctor
    const doctor = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      phone,
      specialization,
      licenseNumber,
      experience: parseInt(experience),
      department,
    });

    await doctor.save();

    return NextResponse.json({
      message: "Doctor account created successfully",
      doctorId: doctor._id,
    });
  } catch (error) {
    console.error("Doctor signup API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
