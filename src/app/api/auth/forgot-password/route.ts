import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateOTP } from "@/lib/otp";
import {sendOTPToEmail} from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000;

  user.resetPassword = { otp, expires };
  await user.save();

  await sendOTPToEmail({
    to: user.email,
    subject: "Password Reset OTP",
    html: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
  });

  return NextResponse.json({ message: "OTP sent to email" });
}
