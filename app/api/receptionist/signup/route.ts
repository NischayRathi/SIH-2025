import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Receptionist from "@/models/Receptionist";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      contactNumber,
      phone,
      department,
      employeeId,
      shift,
      workLocation,
      dateOfJoining,
      clinicId,
      experience,
    } = body;

    // Use phone if contactNumber is not provided (field name mismatch fix)
    const phoneNumber = contactNumber || phone;

    // Add detailed validation logging
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!phoneNumber) missingFields.push("phone/contactNumber");
    if (!department) missingFields.push("department");
    if (!employeeId) missingFields.push("employeeId");
    if (!shift) missingFields.push("shift");
    if (!workLocation) missingFields.push("workLocation");
    if (!clinicId) missingFields.push("clinicId");

    if (missingFields.length > 0) {
      console.error("Missing fields:", missingFields);
      console.error("Received data:", {
        name,
        email,
        password: "***",
        phoneNumber,
        department,
        employeeId,
        shift,
        workLocation,
        clinicId,
        experience,
      });
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if receptionist already exists
    const existingReceptionist = await Receptionist.findOne({ email });
    if (existingReceptionist) {
      return NextResponse.json(
        { error: "Receptionist with this email already exists" },
        { status: 400 }
      );
    }

    // Check if employee ID already exists
    const existingEmployeeId = await Receptionist.findOne({ employeeId });
    if (existingEmployeeId) {
      return NextResponse.json(
        { error: "Employee ID already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create receptionist
    const receptionist = await Receptionist.create({
      name,
      email,
      password: hashedPassword,
      contactNumber: phoneNumber,
      department,
      employeeId,
      shift,
      workLocation,
      dateOfJoining: dateOfJoining ? new Date(dateOfJoining) : new Date(),
      clinicId,
      experience: parseInt(experience) || 0,
    });

    return NextResponse.json(
      {
        message: "Receptionist account created successfully",
        receptionistId: receptionist._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Receptionist signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
