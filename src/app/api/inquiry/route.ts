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

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "9cc52726-2085-4a72-9421-2b644a6d0c9b";

    const web3formsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        Origin: "https://www.omartorbi.engineer",
        Referer: "https://www.omartorbi.engineer/",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || `Portfolio Inquiry from ${name.trim()}`,
        message: message.trim(),
        from_name: `${name.trim()} (Portfolio)`,
      }),
    });

    const resData = await web3formsRes.json().catch(() => ({}));

    if (web3formsRes.ok && resData.success) {
      return NextResponse.json({
        success: true,
        message: "Inquiry dispatched successfully.",
      });
    }

    console.error("Web3Forms API error response:", resData);
    return NextResponse.json(
      {
        success: false,
        error: resData.message || "Failed to deliver inquiry.",
      },
      { status: 502 }
    );
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
