import mongoose from "mongoose";

const ReceptionistSchema = new mongoose.Schema({
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
    default: "receptionist",
    immutable: true,
  },
  employeeId: {
    type: String,
    required: [true, "Employee ID is required"],
    unique: true,
  },
  workLocation: {
    type: String,
    required: [true, "Work location is required"],
  },
  shift: {
    type: String,
    required: [true, "Shift is required"],
    enum: ["morning", "afternoon", "evening", "night"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  clinicId: {
    type: String,
    required: [true, "Clinic ID is required"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
  },
  experience: {
    type: Number,
    required: [true, "Years of experience is required"],
    min: [0, "Experience cannot be negative"],
  },
  dateOfJoining: {
    type: Date,
    required: [true, "Date of joining is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
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
ReceptionistSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Email and employeeId already have unique indexes from schema definition

export default mongoose.models.Receptionist ||
  mongoose.model("Receptionist", ReceptionistSchema);
