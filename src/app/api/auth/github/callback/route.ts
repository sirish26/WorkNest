import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/onboarding?error=NoCode");
  }

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // Fetch user info
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const orgsRes = await axios.get("https://api.github.com/user/orgs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // You can now save accessToken, user info, orgs, etc.
    // For now, just redirect back
    return NextResponse.redirect(new URL('/onboarding', process.env.NEXT_PUBLIC_APP_URL));
  } catch (err: any) {
    console.error(err);
    return NextResponse.redirect(new URL('/onboarding?error=OAuthFailed', process.env.NEXT_PUBLIC_APP_URL));
  }
}
