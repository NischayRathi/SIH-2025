import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  _id: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  clinicId: string;
  receptionistId?: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  duration: number; // in minutes
  type: "consultation" | "follow-up" | "emergency" | "routine-checkup";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  symptoms: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  nextAppointment?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdByModel: "Receptionist" | "Doctor" | "User";
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    clinicId: { type: String, required: true },
    receptionistId: { type: Schema.Types.ObjectId, ref: "Receptionist" },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, default: 30 },
    type: {
      type: String,
      enum: ["consultation", "follow-up", "emergency", "routine-checkup"],
      default: "consultation",
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    symptoms: { type: String, required: true },
    diagnosis: { type: String },
    prescription: { type: String },
    notes: { type: String },
    nextAppointment: { type: Date },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "createdByModel",
    },
    createdByModel: {
      type: String,
      required: true,
      enum: ["Receptionist", "Doctor", "User"],
    },
  },
  { timestamps: true }
);

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
