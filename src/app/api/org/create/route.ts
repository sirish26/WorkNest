import { connectDB } from "@/lib/db";
import Org from "@/models/Org";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);
    
    const { name, slug, email, ownerId } = body;

    if (!name || !slug || !email || !ownerId) {
      console.warn("Missing fields:", { name, slug, email, ownerId });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const domain = email.split("@")[1];

    const existing = await Org.findOne({ $or: [{ slug }, { domain }] });
    if (existing) return NextResponse.json({ error: "Org already exists" }, { status: 409 });

    const org = await Org.create({
      name,
      slug,
      ownerId,
    });

    return NextResponse.json({ message: "Org created", orgId: org._id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
