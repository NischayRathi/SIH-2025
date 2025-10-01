import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    default: "doctor",
    immutable: true,
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  licenseNumber: {
    type: String,
    required: [true, "License number is required"],
    unique: true,
  },
  experience: {
    type: Number,
    required: [true, "Years of experience is required"],
    min: [0, "Experience cannot be negative"],
  },
  qualification: {
    type: String,
    required: [true, "Qualification is required"],
  },
  workLocation: {
    type: String,
    required: [true, "Work location is required"],
  },
  clinicId: {
    type: String,
    required: [true, "Clinic ID is required"],
    unique: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
DoctorSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Email and licenseNumber already have unique indexes from schema definition

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
