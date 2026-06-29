import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  corsHeaders,
  handleCorsPreflightRequest,
  successResponse,
  unauthorizedError,
  rateLimitError,
  aiServiceError,
  internalError,
} from "../shared/errors.ts";
import { verifyUser } from "../shared/auth.ts";
import { checkRateLimit } from "../shared/rate-limit.ts";

const MODULE_LABELS: Record<string, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return handleCorsPreflightRequest(req);

  try {
    const auth = await verifyUser(req);
    if (!auth.success) return unauthorizedError(auth.error ?? "Authentication required", corsHeaders);

    const rateLimit = await checkRateLimit(auth.userId!, "mudahinaja-coach");
    if (!rateLimit.allowed) return rateLimitError(undefined, rateLimit.retryAfter, corsHeaders);

    let body: { mode?: string; message?: string };
    try { body = await req.json(); } catch { body = {}; }

    const { mode = "daily_brief", message } = body;
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) return internalError("AI service unavailable", undefined, corsHeaders);

    // Fetch user context from Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseServiceKey);

    const [profileRes, progressRes] = await Promise.all([
      sb.from("profiles").select("full_name, exam_date, subscription_tier, target_band_score").eq("user_id", auth.userId).maybeSingle(),
      sb.from("user_progress").select("exam_type, band_score, completed_at, feedback, errors_log").eq("user_id", auth.userId!).neq("exam_type", "diagnostic").order("completed_at", { ascending: false }).limit(5),
    ]);

    const profile = profileRes.data;
    const recentProgress = progressRes.data ?? [];

    const firstName = profile?.full_name?.split(" ")[0] ?? "Student";
    const examDate = profile?.exam_date;
    const daysLeft = examDate
      ? Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;
    const targetBand = profile?.target_band_score ?? 7;

    const latestScores: Record<string, number> = {};
    recentProgress.forEach((p) => {
      if (p.band_score && !latestScores[p.exam_type]) {
        latestScores[p.exam_type] = p.band_score;
      }
    });

    const scoresSummary = Object.entries(latestScores)
      .map(([mod, s]) => `${MODULE_LABELS[mod] ?? mod}: Band ${s.toFixed(1)}`)
      .join(", ") || "Belum ada latihan";

    const lastActivity = recentProgress[0];
    const lastModule = lastActivity ? (MODULE_LABELS[lastActivity.exam_type] ?? lastActivity.exam_type) : null;
    const lastBand = lastActivity?.band_score;

    const weakestEntry = Object.entries(latestScores).sort((a, b) => a[1] - b[1])[0];
    const weakestModule = weakestEntry ? (MODULE_LABELS[weakestEntry[0]] ?? weakestEntry[0]) : null;

    const systemPrompt = `Kamu adalah MudahinAja, coach IELTS AI pribadi yang membantu pelajar Indonesia mencapai skor target mereka.

Karakter kamu:
- Berbicara dalam Bahasa Indonesia yang natural dan encouraging
- Tahu detail progres dan skor user
- Memberi saran konkret dan personal, bukan generik
- Pendek dan langsung — tidak bertele-tele
- Hangat tapi profesional

Konteks user saat ini:
- Nama: ${firstName}
- Target band: ${targetBand}
- Skor terbaru: ${scoresSummary}
- Modul terlemah: ${weakestModule ?? "belum diketahui"}
${daysLeft !== null ? `- Hari menuju ujian: ${daysLeft} hari (${examDate})` : "- Tanggal ujian: belum diset"}
${lastModule ? `- Latihan terakhir: ${lastModule}${lastBand ? ` Band ${lastBand.toFixed(1)}` : ""}` : ""}`;

    let userPrompt: string;

    if (mode === "daily_brief") {
      userPrompt = `Berikan daily brief singkat untuk ${firstName} hari ini (maksimal 3-4 kalimat).
Struktur:
1. Satu kalimat pembuka berdasarkan progres terbaru mereka
2. Satu tugas konkret yang direkomendasikan hari ini (modul atau revision note tertentu)
3. Satu tips cepat yang relevan dengan kelemahan mereka

Jika exam dalam < 14 hari, tambahkan urgency yang membantu (bukan menakutkan).`;
    } else {
      userPrompt = message ?? "Halo, ada yang bisa kamu bantu?";
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        messages: [
          { role: "user", content: `${systemPrompt}\n\n${userPrompt}` },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      if (response.status === 429) return rateLimitError(undefined, 60, corsHeaders);
      return aiServiceError("AI service error", { status: response.status }, corsHeaders);
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "";

    return successResponse({ reply, mode }, 200, corsHeaders);
  } catch (err) {
    console.error("mudahinaja-coach error:", err);
    return internalError("Internal error", undefined, corsHeaders);
  }
});
