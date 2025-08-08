import mongoose, { Schema } from "mongoose";

export interface ITeam extends Document {
  teamName: string;
  slug: string;
  orgId: mongoose.Types.ObjectId;
  teamLead: mongoose.Types.ObjectId;
  users: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    teamName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    orgId: { type: Schema.Types.ObjectId, ref: "Org", required: true },
    teamLead: { type: Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema);
