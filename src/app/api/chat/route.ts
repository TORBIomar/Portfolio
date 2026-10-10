import { NextResponse } from "next/server";
import {
  SYSTEM_PORTFOLIO_PROMPT,
  getLocalAiResponse,
  ChatAction,
} from "@/data/aiKnowledge";
import { PERSONAL_INFO } from "@/data/portfolioData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid question." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    const geminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // If Gemini key is available, attempt real generative response with grounded context
    if (geminiKey) {
      try {
        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        // Format history (last 4 turns for context)
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history.slice(-4);
          for (const item of recentHistory) {
            if (item.sender === "user" || item.sender === "ai") {
              contents.push({
                role: item.sender === "user" ? "user" : "model",
                parts: [{ text: item.text }],
              });
            }
          }
        }

        // Add current query
        contents.push({
          role: "user",
          parts: [{ text: trimmedMessage }],
        });

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PORTFOLIO_PROMPT }],
              },
              contents: contents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const candidateText =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText && typeof candidateText === "string") {
            // Augment with smart actions based on content intent
            const actions: ChatAction[] = [];
            const lowerRes = candidateText.toLowerCase();

            if (lowerRes.includes("resume") || lowerRes.includes("cv")) {
              actions.push({
                label: "Download English Resume (PDF)",
                type: "download",
                payload: PERSONAL_INFO.resumeUrlEn,
                icon: "download",
              });
            }
            if (
              lowerRes.includes("contact") ||
              lowerRes.includes("email") ||
              lowerRes.includes("hire")
            ) {
              actions.push({
                label: "Email Omar",
                type: "contact",
                payload: `mailto:${PERSONAL_INFO.email}`,
                icon: "mail",
              });
              actions.push({
                label: "WhatsApp Chat",
                type: "link",
                payload: PERSONAL_INFO.whatsappUrl,
                icon: "whatsapp",
              });
            }
            if (lowerRes.includes("zahiri") || lowerRes.includes("cad")) {
              actions.push({
                label: "Zahiri CAD Demo",
                type: "link",
                payload: "https://zahiri-metal-3d-cad.vercel.app/",
                icon: "external",
              });
            }

            return NextResponse.json({
              success: true,
              answer: candidateText,
              actions: actions.length > 0 ? actions : undefined,
              source: "gemini",
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local engine:", geminiError);
      }
    }

    // High-fidelity deterministic local fallback
    const localResult = getLocalAiResponse(trimmedMessage);
    return NextResponse.json({
      success: true,
      answer: localResult.text,
      actions: localResult.actions,
      suggestions: localResult.suggestions,
      source: "local",
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    const fallback = getLocalAiResponse("help");
    return NextResponse.json({
      success: true,
      answer: fallback.text,
      actions: fallback.actions,
      suggestions: fallback.suggestions,
      source: "fallback",
    });
  }
}
