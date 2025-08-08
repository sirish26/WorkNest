import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";


export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      role,
      orgId,
      deviceInfo,
      username,
      provider = "email",
    } = await req.json();

    if (!name || !email || !password || !deviceInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { deviceType, deviceId, ipAddress, location } = deviceInfo;
    if (!deviceType || !deviceId || !ipAddress || !location) {
      return NextResponse.json({ error: "Incomplete device info" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role: role || "member",
      orgId,
      deviceInfo,
      provider,
      isVerified: false,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user._id },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
