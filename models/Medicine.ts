import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedicine extends Document {
  _id: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  medicineName: string;
  dosage: string;
  frequency: string; // e.g., "2 times daily", "every 8 hours"
  duration: string; // e.g., "7 days", "2 weeks"
  instructions: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "discontinued";
  sideEffects?: string[];
  reminderTimes: string[]; // e.g., ["08:00", "20:00"]
}

const MedicineSchema = new Schema<IMedicine>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "completed", "discontinued"],
      default: "active",
    },
    sideEffects: [{ type: String }],
    reminderTimes: [{ type: String }],
  },
  { timestamps: true }
);

const Medicine: Model<IMedicine> =
  mongoose.models.Medicine ||
  mongoose.model<IMedicine>("Medicine", MedicineSchema);

export default Medicine;
