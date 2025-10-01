import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const appointments = await Appointment.find({
      patientId: (session.user as any).id,
    })
      .populate("doctorId", "name specialization")
      .sort({ date: -1 });

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
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
    const { doctorId, date, time, type, symptoms } = body;

    await connectDB();

    const appointment = new Appointment({
      patientId: (session.user as any).id,
      doctorId,
      date,
      time,
      type,
      symptoms,
      status: "scheduled",
    });

    await appointment.save();
    await appointment.populate("doctorId", "name specialization");

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
