import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      contactNumber,
      adminKey,
      department,
      employeeId,
      designation,
      workLocation,
    } = body;

    // Validate admin key
    const ADMIN_KEY =
      process.env.ADMIN_AUTHORIZATION_KEY || "PRAKRITI_ADMIN_2024_SECURE_KEY";
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json(
        { error: "Invalid admin authorization key" },
        { status: 403 }
      );
    }

    if (
      !name ||
      !email ||
      !password ||
      !contactNumber ||
      !department ||
      !employeeId ||
      !designation ||
      !workLocation
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 400 }
      );
    }

    // Check if employee ID already exists
    const existingEmployeeId = await Admin.findOne({ employeeId });
    if (existingEmployeeId) {
      return NextResponse.json(
        { error: "Employee ID already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      department,
      employeeId,
      designation,
      workLocation,
    });

    return NextResponse.json(
      { message: "Admin account created successfully", adminId: admin._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
