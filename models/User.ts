import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "receptionist" | "admin";
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  medicalHistory?: string[];
  currentMedications?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  // Doctor specific fields
  specialization?: string;
  licenseNumber?: string;
  experience?: number;
  // Common field for both doctors and receptionists
  department?: string;
  // Receptionist specific fields
  shift?: "morning" | "afternoon" | "evening" | "night";
  employeeId?: string;
  workLocation?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["patient", "doctor", "receptionist", "admin"],
      default: "patient",
    },
    phone: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    medicalHistory: [{ type: String }],
    currentMedications: [{ type: String }],
    allergies: [{ type: String }],
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relationship: { type: String },
    },
    // Doctor fields
    specialization: { type: String },
    licenseNumber: { type: String },
    experience: { type: Number },
    department: { type: String },
    // Receptionist fields
    shift: { type: String, enum: ["morning", "afternoon", "evening", "night"] },
    employeeId: { type: String },
    workLocation: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js hot reload
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
