import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  corsHeaders,
  handleCorsPreflightRequest,
  successResponse,
  validationError,
  unauthorizedError,
  rateLimitError,
  internalError,
} from "../shared/errors.ts";
import { verifyUser } from "../shared/auth.ts";
import { checkRateLimit } from "../shared/rate-limit.ts";
import { logAiUsage } from "../shared/usage-log.ts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: Message[];
  topicTitle: string;
  categoryLabel: string;
  subItems: string[];
  subtopicLabel?: string;
}

// Lightweight scope hint, not full note content — the AI answers from its
// own IELTS grammar/writing knowledge, scoped to this topic area, rather
// than the exact wording of the revision note (see project decision: doing
// full per-topic content extraction later if this proves useful).
function buildSystemPrompt(body: RequestBody): string {
  const { topicTitle, categoryLabel, subItems, subtopicLabel } = body;

  return `You are an expert IELTS grammar and writing tutor embedded inside Engvolve's Revision Notes section.

The student is currently reading the revision note titled "${topicTitle}" (category: ${categoryLabel}), which covers: ${subItems.join(", ")}.
${subtopicLabel ? `They are specifically viewing: ${subtopicLabel}.` : ""}

You do not have the exact text of this note in front of you, but you know IELTS grammar, mechanics, and academic writing conventions thoroughly. Answer as if you were the author of this note, staying scoped to this topic area.

RULES:
- Focus on explaining, clarifying, and giving extra examples related to "${topicTitle}" specifically.
- If the student asks something clearly outside this topic's scope, give a brief honest answer but suggest they check the relevant revision note topic instead — don't pretend this topic covers everything.
- Use IELTS-relevant examples (formal/academic register, exam-style sentences) wherever possible.
- Be concise: 2–4 short paragraphs or a short bullet list. Never write a wall of text.
- If the student writes in Bahasa Indonesia, reply in Bahasa Indonesia.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return handleCorsPreflightRequest(req);

  try {
    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return validationError("Invalid JSON", undefined, corsHeaders);
    }

    if (!body.messages || !Array.isArray(body.messages) || !body.topicTitle || !Array.isArray(body.subItems)) {
      return validationError("Missing required fields: messages, topicTitle, subItems", undefined, corsHeaders);
    }

    // Require an authenticated user and apply a per-user rate limit before
    // calling the paid AI backend. Reuses the ai-chatbot quota bucket.
    const auth = await verifyUser(req);
    if (!auth.success) {
      return unauthorizedError(auth.error ?? "Authentication required", corsHeaders);
    }

    const rateLimit = await checkRateLimit(auth.userId!, "ai-chatbot");
    if (!rateLimit.allowed) {
      return rateLimitError(undefined, rateLimit.retryAfter, corsHeaders);
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      return internalError("AI service not configured", undefined, corsHeaders);
    }

    const systemPrompt = buildSystemPrompt(body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: systemPrompt,
        messages: body.messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Claude API error:", err);
      return internalError("AI service error", { status: response.status }, corsHeaders);
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "Sorry, I couldn't process that. Please try again.";

    await logAiUsage({
      userId: auth.userId!,
      endpoint: "revision-tutor",
      model: "claude-haiku-4-5-20251001",
      inputTokens: data.usage?.input_tokens,
      outputTokens: data.usage?.output_tokens,
      metadata: { topicTitle: body.topicTitle },
    });

    return successResponse({ reply }, 200, corsHeaders);
  } catch (error) {
    // Log internally; do not leak error contents to the client.
    console.error("revision-tutor error:", error);
    return internalError("Internal server error", undefined, corsHeaders);
  }
});
