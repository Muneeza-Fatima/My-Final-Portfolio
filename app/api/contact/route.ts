import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log("===== CONTACT API =====");
    console.log(
      "RESEND_API_KEY exists:",
      !!process.env.RESEND_API_KEY
    );
    console.log(
      "CONTACT_EMAIL:",
      process.env.CONTACT_EMAIL
    );

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "RESEND_API_KEY is missing.",
        },
        {
          status: 500,
        }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      return NextResponse.json(
        {
          success: false,
          message: "CONTACT_EMAIL is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    const {
      name,
      email,
      country,
      projectType,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !country ||
      !projectType ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all fields.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;">
          <h2>New Portfolio Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Country:</strong> ${country}</p>

          <p><strong>Project Type:</strong> ${projectType}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    console.log("Email sent successfully:", data);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}