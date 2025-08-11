"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function OnboardingForm({
  email,
  userId,
  className,
  ...props
}: React.ComponentProps<"form"> & { email: string; userId: string }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/org/create", {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify({ name, slug, email, ownerId: userId }),
    });

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      window.location.href = `/dashboard/${slug}/github`;
    } else {
      toast.error(data.error);
    }
  };
  return (
    <form className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your organization name below to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="org-name">Organiazation Name</Label>
          </div>
          <Input id="org-name" type="text" required value={name} onChange={(e)=>{
            const value = e.target.value;
            setName(value);
            setSlug(generateSlug(value));
          }} />
        </div>
        <div className="grid gap-3">
                <Label htmlFor="org-slug">Slug (auto-generated)</Label>
                <Input id="org-slug" value={slug} disabled />
                <Label>Github Integration</Label>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.location.href =  `https://github.com/login/oauth/authorize?client_id=Ov23liOoHprDDf7R3Ne9&scope=read:user user:email read:org repo`} >
                    Connect Github Organization
                </Button>
        <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Organization"}
        </Button>
      </div>
        </div>
    </form>
    );
}