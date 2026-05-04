import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  business?: string;
  email: string;
  website?: string;
  message: string;
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function validate(input: unknown): ContactPayload | { error: string } {
  if (!input || typeof input !== "object") {
    return { error: "Invalid request body." };
  }
  const { name, email, message, business, website } = input as Record<
    string,
    unknown
  >;

  if (!isString(name) || name.trim().length < 1 || name.length > 200) {
    return { error: "Name is required." };
  }
  if (!isString(email) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "A valid email is required." };
  }
  if (
    !isString(message) ||
    message.trim().length < 1 ||
    message.length > 5000
  ) {
    return { error: "A short message is required." };
  }
  if (
    business !== undefined &&
    (!isString(business) || business.length > 200)
  ) {
    return { error: "Invalid business name." };
  }
  if (website !== undefined && (!isString(website) || website.length > 500)) {
    return { error: "Invalid website URL." };
  }

  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    business: isString(business) ? business.trim() : undefined,
    website: isString(website) ? website.trim() : undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const result = validate(json);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Hook this up to a real destination (email, Slack, DB) later.
    // For now, log server-side so the route is fully functional.
    console.log("[contact] new submission", {
      name: result.name,
      email: result.email,
      business: result.business,
      website: result.website,
      messageLength: result.message.length,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
