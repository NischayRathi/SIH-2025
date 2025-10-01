import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      contactNumber,
      specialization,
      licenseNumber,
      experience,
      qualification,
      workLocation,
      clinicId,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      !contactNumber ||
      !specialization ||
      !licenseNumber ||
      !qualification ||
      !workLocation ||
      !clinicId
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return NextResponse.json(
        { error: "Doctor with this email already exists" },
        { status: 400 }
      );
    }

    // Check if license number already exists
    const existingLicense = await Doctor.findOne({ licenseNumber });
    if (existingLicense) {
      return NextResponse.json(
        { error: "Medical license number already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create doctor
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      specialization,
      licenseNumber,
      experience: experience || 0,
      qualification,
      workLocation,
      clinicId,
    });

    return NextResponse.json(
      { message: "Doctor account created successfully", doctorId: doctor._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Doctor signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
