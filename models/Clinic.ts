import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
  clinicId: {
    type: String,
    required: [true, "Clinic ID is required"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Clinic name is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Clinic address is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  services: {
    type: [String],
    default: [],
  },
  operatingHours: {
    type: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
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
ClinicSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Email and clinicId already have unique indexes from schema definition

export default mongoose.models.Clinic || mongoose.model("Clinic", ClinicSchema);
