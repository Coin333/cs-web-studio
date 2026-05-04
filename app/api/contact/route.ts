import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function buildHtml(p: ContactPayload): string {
  const row = (label: string, value: string) =>
    `<tr>
       <td style="padding:8px 0;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:140px;vertical-align:top">${escapeHtml(
         label,
       )}</td>
       <td style="padding:8px 0;color:#18181b;font-size:14px;vertical-align:top">${value}</td>
     </tr>`;

  const messageHtml = escapeHtml(p.message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;padding:28px">
    <tr><td>
      <p style="margin:0 0 4px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:600">${SITE_NAME}</p>
      <h1 style="margin:0 0 24px;color:#18181b;font-size:22px;font-weight:700">New contact form submission</h1>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${row("Name", escapeHtml(p.name))}
        ${row(
          "Email",
          `<a href="mailto:${escapeHtml(p.email)}" style="color:#4f46e5;text-decoration:none">${escapeHtml(p.email)}</a>`,
        )}
        ${p.business ? row("Business", escapeHtml(p.business)) : ""}
        ${
          p.website
            ? row(
                "Website",
                `<a href="${escapeHtml(p.website)}" target="_blank" style="color:#4f46e5;text-decoration:none">${escapeHtml(p.website)}</a>`,
              )
            : ""
        }
        ${row("Message", `<div style="line-height:1.55">${messageHtml}</div>`)}
      </table>
      <p style="margin:24px 0 0;color:#a1a1aa;font-size:11px">Reply directly to this email — the sender's address is set as Reply-To.</p>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const result = validate(json);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;
    // 'onboarding@resend.dev' works without domain verification.
    // Replace with a verified sender once DNS is set up on cswebstudio.tech.
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? "CS Web Studio <onboarding@resend.dev>";

    if (!apiKey) {
      // Dev / unconfigured fallback: log instead of failing the user-facing form.
      console.log("[contact] (no RESEND_API_KEY) submission", {
        name: result.name,
        email: result.email,
        business: result.business,
        website: result.website,
        messageLength: result.message.length,
      });
      return NextResponse.json({ ok: true, dev: true }, { status: 200 });
    }

    const resend = new Resend(apiKey);
    const subject = result.business
      ? `New inquiry: ${result.business} (${result.name})`
      : `New inquiry from ${result.name}`;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: result.email,
      subject,
      html: buildHtml(result),
      text: [
        `New contact form submission`,
        ``,
        `Name: ${result.name}`,
        `Email: ${result.email}`,
        result.business ? `Business: ${result.business}` : null,
        result.website ? `Website: ${result.website}` : null,
        ``,
        `Message:`,
        result.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] resend send failed", error);
      return NextResponse.json(
        { error: "Could not send your message right now. Try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
