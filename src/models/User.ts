import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username?: string;
  email: string;
  password: string;
  role: "owner" | "admin" | "project_manager" | "developer" | "hr" | "client" | "member";
  orgId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  projectIds?: mongoose.Types.ObjectId[];
  provider: "email" | "github";
  blocked?: boolean;
  isVerified?: boolean;
  lastLogin?: Date;
  deviceInfo?: {
    deviceType: string;
    deviceId: string;
    ipAddress: string;
    location: string;
    lastUsed: Date;
  };
  resetPassword: {
  otp: String,
  expires: Number,
  verified: Boolean
};
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "admin", "project_manager", "developer", "hr", "client", "member"],
      default: "member",
    },
    orgId: { type: Schema.Types.ObjectId, ref: "Org", },
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
    projectIds: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    provider: { type: String, enum: ["email", "github"], default: "email" },
    resetPassword: {
      otp: { type: String },
      expires: { type: Number },
      verified: { type: Boolean, default: false },
    },
    blocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    deviceInfo: {
      deviceType: { type: String, required: true },
      deviceId: { type: String, required: true },
      ipAddress: { type: String, required: true },
      location: { type: String, required: true },
      lastUsed: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
