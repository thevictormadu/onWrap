import { NextRequest, NextResponse } from "next/server";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_OAUTH_REDIRECT_URL =
  process.env.GITHUB_OAUTH_REDIRECT_URL ||
  `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/github-auth/callback`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieState = req.cookies.get("gh_oauth_state")?.value;

  if (!code || !state || !cookieState || state !== cookieState) {
    return NextResponse.json(
      { error: "Invalid OAuth state." },
      { status: 400 }
    );
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return NextResponse.json(
      {
        error:
          "GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.",
      },
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: GITHUB_OAUTH_REDIRECT_URL,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const text = await tokenResponse.text();
      return NextResponse.json(
        { error: "Failed to exchange OAuth code", details: text },
        { status: 500 }
      );
    }

    const tokenJson = (await tokenResponse.json()) as {
      access_token?: string;
      token_type?: string;
      error?: string;
    };

    if (!tokenJson.access_token) {
      return NextResponse.json(
        { error: "No access token in OAuth response", details: tokenJson },
        { status: 500 }
      );
    }

    const accessToken = tokenJson.access_token;

    // Fetch the authenticated user's login so we can auto-start the wrap
    let login: string | null = null;
    try {
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (userResponse.ok) {
        const userJson = (await userResponse.json()) as { login?: string };
        login = userJson.login ?? null;
      }
    } catch {
      // Non-fatal: we'll just skip auto-start if this fails
      login = null;
    }

    const redirectUrl = new URL("/", req.url);
    if (login) {
      redirectUrl.searchParams.set("autostart", "1");
      redirectUrl.searchParams.set("username", login);
    }

    const response = NextResponse.redirect(redirectUrl);

    // Clear state cookie
    response.cookies.set("gh_oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    // Store GitHub access token in an HTTP‑only cookie
    response.cookies.set("gh_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error during OAuth callback", details: `${error}` },
      { status: 500 }
    );
  }
}
