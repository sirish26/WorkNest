"use client"
import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function getDeviceInfo() {
    const ipRes = await fetch("https://api.ipify.org?format=json")
    const ipData = await ipRes.json()

    const userAgent = navigator.userAgent
    const platform = navigator.platform
    const deviceId = window.navigator.hardwareConcurrency?.toString() ?? "unknown"
    const deviceType = /Mobi|Android/i.test(userAgent) ? "mobile" : "desktop"

    return {
      deviceType,
      deviceId,
      ipAddress: ipData.ip,
      location: platform,
      lastUsed: new Date().toISOString(),
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const deviceInfo = await getDeviceInfo()

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: email.split("@")[0],
        email,
        password,
        provider: "email",
        deviceInfo,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      router.push("/onboarding")
    } else {
      alert(data.error || "Signup failed")
    }

    setLoading(false)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              {/* <span className="sr-only">Acme Inc.</span> */}
            </a>
            <h1 className="text-xl font-bold">Welcome to Worknest.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
             <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full">
              Continue with Github
            </Button>
            <Button variant="outline" type="button" className="w-full">

              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
