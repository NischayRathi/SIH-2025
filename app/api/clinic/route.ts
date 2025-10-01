import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Clinic from "@/models/Clinic";

export async function GET() {
  try {
    await connectDB();

    const clinics = await Clinic.find({ isActive: true })
      .select("clinicId name address")
      .sort({ name: 1 });

    return NextResponse.json({ clinics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinics" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clinicId,
      name,
      address,
      contactNumber,
      email,
      description,
      services,
    } = body;

    if (!clinicId || !name || !address || !contactNumber || !email) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if clinic ID already exists
    const existingClinic = await Clinic.findOne({ clinicId });
    if (existingClinic) {
      return NextResponse.json(
        { error: "Clinic ID already exists" },
        { status: 400 }
      );
    }

    // Create clinic
    const clinic = await Clinic.create({
      clinicId,
      name,
      address,
      contactNumber,
      email,
      description,
      services: services || [],
    });

    return NextResponse.json(
      { message: "Clinic created successfully", clinic },
      { status: 201 }
    );
  } catch (error) {
    console.error("Clinic creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
