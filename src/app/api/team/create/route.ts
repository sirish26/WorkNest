import { connectDB } from "@/lib/db";
import Team from "@/models/Team";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { teamName, slug, orgId, teamLead, users } = await req.json();

    if (!teamName || !slug || !orgId || !teamLead || !users?.length) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const team = await Team.create({
      teamName,
      slug,
      orgId,
      teamLead,
      users,
    });

    return NextResponse.json({ message: "Team created", teamId: team._id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
