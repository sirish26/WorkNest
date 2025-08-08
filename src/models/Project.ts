import mongoose, { Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  orgId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    orgId: { type: Schema.Types.ObjectId, ref: "Org", required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
