import { NextRequest, NextResponse } from "next/server";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_OAUTH_REDIRECT_URL =
  process.env.GITHUB_OAUTH_REDIRECT_URL ||
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/github-auth/callback`;

export async function GET(req: NextRequest) {
  if (!GITHUB_CLIENT_ID) {
    return NextResponse.json(
      {
        error:
          "GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.",
      },
      { status: 500 }
    );
  }

  // Basic CSRF protection via state parameter stored in a short‑lived cookie
  const state = crypto.randomUUID();

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", GITHUB_OAUTH_REDIRECT_URL);
  // Scopes include repository access for accurate star/fork counts
  // Note: 'repo' scope may require organization approval for org members
  url.searchParams.set("scope", "read:user repo user:email");
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url.toString());
  response.cookies.set("gh_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60, // 10 minutes
    path: "/",
  });

  return response;
}
