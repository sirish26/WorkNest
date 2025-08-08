'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"


export default function ForgotPasswordDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {

  const [step, setStep] = useState<"email" | "otp" | "reset">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("/api/auth/forgot-password", { email })
      toast.success( "Check your email")
      setStep("otp")
    } catch (err: any) {
      toast.error("Email not found",{ description: err.response?.data?.message})
    }
  }

  const handleVerifyOtp = async () => {
    try {
      await axios.post("/api/auth/verify-otp", { email, otp })
      toast.success("You can now reset password")
      setStep("reset")
    } catch (err: any) {
      toast.error("OTP Verification Failed", {description: err.response?.data?.message})
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords don't match")
    }

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
        confirmPassword
      })
      toast.success("Password Updated", {description: "Logging you in..." })

      await axios.post("/api/auth/login", {
        email,
        password: newPassword
      })
      window.location.href = "/dashboard"
    } catch (err: any) {
      toast.error("Password Reset Failed", {description: err.response?.data?.message})
    }
  }

  const handleClose = () => {
    setOpen(false)
    setStep("email")
    setEmail("")
    setOtp("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Verify OTP"}
            {step === "reset" && "Reset Password"}
          </DialogTitle>
        </DialogHeader>

        {step === "email" && (
          <>
            <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSendOtp}>Send OTP</Button>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <Input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleVerifyOtp}>Verify OTP</Button>
            </div>
          </>
        )}

        {step === "reset" && (
          <>
            <Input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-2" />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleResetPassword}>Reset Password</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}