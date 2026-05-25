import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { validateRequest, GenerateReadingSchema } from "../shared/validation.ts";
import {
  corsHeaders,
  handleCorsPreflightRequest,
  successResponse,
  validationError,
  unauthorizedError,
  rateLimitError,
  aiServiceError,
  internalError
} from "../shared/errors.ts";
import { verifyUser } from "../shared/auth.ts";
import { checkRateLimit } from "../shared/rate-limit.ts";
import { getMockReadingTest } from "./mock-data.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest(req);
  }

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return validationError("Invalid JSON body", undefined, corsHeaders);
    }

    const validation = validateRequest(GenerateReadingSchema, requestBody);
    if (!validation.success) {
      return validationError(validation.error.message, validation.error.details, corsHeaders);
    }

    const { difficulty } = validation.data;

    const auth = await verifyUser(req);
    if (!auth.success) {
      return unauthorizedError(auth.error ?? "Authentication required", corsHeaders);
    }

    const rateLimit = await checkRateLimit(auth.userId!, "generate-reading");
    if (!rateLimit.allowed) {
      return rateLimitError(undefined, rateLimit.retryAfter, corsHeaders);
    }

    // === Primary path: pull a random test from reading_test_library ===
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const admin = createClient(supabaseUrl, supabaseServiceKey);
        const { data: tests, error: libErr } = await admin
          .from("reading_test_library")
          .select("id, title, difficulty, total_questions, duration_minutes, sections, topic_tags")
          .eq("difficulty", difficulty)
          .eq("is_active", true);

        if (!libErr && tests && tests.length > 0) {
          const pick = tests[Math.floor(Math.random() * tests.length)];
          const responseData = {
            id: pick.id,
            title: pick.title,
            difficulty: pick.difficulty,
            totalQuestions: pick.total_questions,
            durationMinutes: pick.duration_minutes,
            topicTags: pick.topic_tags ?? [],
            sections: pick.sections.sections ?? pick.sections,
            generatedAt: new Date().toISOString(),
            source: "library",
          };
          console.log("Served reading test from library:", pick.title);
          return successResponse(responseData, 200, corsHeaders);
        }

        if (libErr) {
          console.warn("Library lookup failed, falling back:", libErr.message);
        } else {
          console.warn("No library tests for difficulty:", difficulty);
        }
      } catch (e) {
        console.warn("Library access threw, falling back:", e);
      }
    }

    // === Fallback path: mock data (also used when API key missing) ===
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    const USE_MOCK_DATA = Deno.env.get("USE_MOCK_DATA") === "true"
      || Deno.env.get("USE_MOCK_READING_DATA") === "true";

    if (USE_MOCK_DATA || !ANTHROPIC_API_KEY) {
      console.log("Using mock reading data (API key missing or mock mode enabled)");
      const mockTest = getMockReadingTest(difficulty);
      const responseData = {
        ...mockTest,
        generatedAt: new Date().toISOString(),
        id: crypto.randomUUID(),
        source: "mock",
      };
      return successResponse(responseData, 200, corsHeaders);
    }

    // Should not normally reach here, but if API key exists and library is empty,
    // return mock as a safe default rather than spending tokens on a partial test.
    console.warn("Library empty and live AI generation for 3-passage tests not yet implemented; returning mock.");
    const mockTest = getMockReadingTest(difficulty);
    return successResponse({
      ...mockTest,
      generatedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      source: "mock-fallback",
    }, 200, corsHeaders);

  } catch (error: unknown) {
    console.error("Generate reading error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return internalError(errorMessage, { error: String(error) }, corsHeaders);
  }
});
