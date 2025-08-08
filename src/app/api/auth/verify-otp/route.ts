import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { email, otp } = await req.json();

  const user = await User.findOne({ email });
  if (!user || !user.resetPassword?.otp) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (Date.now() > user.resetPassword.expires) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  if (user.resetPassword.otp !== otp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  user.resetPassword.verified = true;
  await user.save();

  return NextResponse.json({ message: "OTP verified" });
}
