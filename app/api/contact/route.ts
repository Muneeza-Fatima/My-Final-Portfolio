import { NextResponse } from "next/server";
import { Resend } from "resend";

const fields = ["name", "email", "country", "projectType", "message"] as const;
type Field = (typeof fields)[number];

// User input is placed into HTML email markup, so it must be escaped.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error("Contact API is missing RESEND_API_KEY or CONTACT_EMAIL.");
    return NextResponse.json(
      { success: false, message: "The contact form is temporarily unavailable." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as Partial<Record<Field, unknown>>;
    const values = Object.fromEntries(
      fields.map((field) => [field, typeof body[field] === "string" ? (body[field] as string).trim() : ""]),
    ) as Record<Field, string>;

    if (fields.some((field) => !values[field])) {
      return NextResponse.json(
        { success: false, message: "Please complete all fields." },
        { status: 400 },
      );
    }

    const safe = Object.fromEntries(
      fields.map((field) => [field, escapeHtml(values[field])]),
    ) as Record<Field, string>;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: values.email,
      subject: `New Portfolio Inquiry from ${values.name.slice(0, 80)}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;">
          <h2>New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Country:</strong> ${safe.country}</p>
          <p><strong>Project Type:</strong> ${safe.projectType}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${safe.message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Your message could not be sent. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
