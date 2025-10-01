import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const medicines = await Medicine.find({
      patientId: (session.user as any).id,
    })
      .populate("doctorId", "name specialization")
      .populate("appointmentId")
      .sort({ startDate: -1 });

    return NextResponse.json(medicines);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch medicines" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      medicineName,
      dosage,
      frequency,
      duration,
      instructions,
      appointmentId,
      doctorId,
      startDate,
      endDate,
      reminderTimes,
    } = body;

    await connectDB();

    const medicine = new Medicine({
      patientId: (session.user as any).id,
      medicineName,
      dosage,
      frequency,
      duration,
      instructions,
      appointmentId,
      doctorId,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days
      reminderTimes: reminderTimes || [],
      status: "active",
    });

    await medicine.save();
    await medicine.populate("doctorId", "name specialization");

    return NextResponse.json(medicine, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create medicine record" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { medicineId, action, status } = body;

    await connectDB();

    const medicine = await Medicine.findOne({
      _id: medicineId,
      patientId: (session.user as any).id,
    });

    if (!medicine) {
      return NextResponse.json(
        { error: "Medicine not found" },
        { status: 404 }
      );
    }

    if (action === "mark_completed" || status) {
      medicine.status = status || "completed";
      await medicine.save();
    }

    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update medicine" },
      { status: 500 }
    );
  }
}
