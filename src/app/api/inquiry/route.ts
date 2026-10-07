import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/data/portfolioData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      );
    }

    const recipientEmail = PERSONAL_INFO.email || "torbi.dev@outlook.com";
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`;

    const formSubmitRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _subject: subject?.trim() || `Portfolio Inquiry from ${name.trim()}`,
        message: message.trim(),
        _template: "table",
        _captcha: "false",
      }),
    });

    const resData = await formSubmitRes.json().catch(() => ({}));

    // FormSubmit returns status 200/JSON even if activation is pending
    return NextResponse.json({
      success: true,
      message: "Inquiry dispatched successfully.",
      details: resData,
    });
  } catch (error: any) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send message at this time. Please try again or contact directly.",
      },
      { status: 500 }
    );
  }
}
