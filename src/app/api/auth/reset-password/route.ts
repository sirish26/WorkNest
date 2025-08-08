
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, otp, newPassword } = await req.json();

  if (!email || !otp || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const storedOtp = user.resetPassword?.otp;
  const expires = user.resetPassword?.expires;
  const verified = user.resetPassword?.verified;

  if (!storedOtp || !expires || storedOtp !== otp || Date.now() > expires) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetPassword = undefined;

  await user.save();

  return NextResponse.json({ message: "Password reset successful" });
}
