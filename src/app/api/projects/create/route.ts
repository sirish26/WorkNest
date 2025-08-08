import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, slug, orgId, teamId, members } = await req.json();

    if (!name || !slug || !orgId || !teamId || !members?.length) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const project = await Project.create({
      name,
      slug,
      orgId,
      teamId,
      members,
    });

    return NextResponse.json({ message: "Project created", projectId: project._id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
