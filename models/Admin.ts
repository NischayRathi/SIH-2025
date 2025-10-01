import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
    default: "admin",
    immutable: true,
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  employeeId: {
    type: String,
    required: [true, "Employee ID is required"],
    unique: true,
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
  },
  workLocation: {
    type: String,
    required: [true, "Work location is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
  },
  permissions: {
    type: [String],
    default: ["read", "write", "delete", "manage_users"],
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
AdminSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Email and employeeId already have unique indexes from schema definition

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
