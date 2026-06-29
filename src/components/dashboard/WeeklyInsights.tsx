import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Flame, Target, Clock } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useAuth } from "@/hooks/useAuth";

const MODULE_LABELS: Record<string, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

const ERROR_NOTE_MAP: Record<string, { slug: string; label: string }> = {
  tfng:               { slug: "vocabulary-passages",       label: "True/False/Not Given" },
  ynng:               { slug: "vocabulary-passages",       label: "Yes/No/Not Given" },
  multiple_choice:    { slug: "vocabulary-passages",       label: "Multiple Choice" },
  matching_headings:  { slug: "paragraph-structuring",     label: "Matching Headings" },
  matching_features:  { slug: "collocations-paraphrasing", label: "Matching Features" },
  note_completion:    { slug: "sentence-structure",        label: "Note Completion" },
  summary_completion: { slug: "sentence-structure",        label: "Summary Completion" },
  form_completion:    { slug: "sentence-structure",        label: "Form Completion" },
  map_labeling:       { slug: "text-types",                label: "Map Labelling" },
  matching:           { slug: "collocations-paraphrasing", label: "Matching" },
};

export function WeeklyInsights() {
  const { progress } = useUserProgress();
  const { profile } = useAuth();

  const insights = useMemo(() => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = progress.filter(
      (p) => new Date(p.completed_at) >= sevenDaysAgo && p.exam_type !== "diagnostic"
    );
    const prevWeek = progress.filter((p) => {
      const d = new Date(p.completed_at);
      return d < sevenDaysAgo && d >= new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
    });

    if (thisWeek.length === 0) return null;

    // Sessions + modules this week
    const sessionCount = thisWeek.length;

    // Per-module average
    const moduleBands: Record<string, number[]> = {};
    thisWeek.forEach((p) => {
      if (p.band_score && p.exam_type !== "diagnostic") {
        if (!moduleBands[p.exam_type]) moduleBands[p.exam_type] = [];
        moduleBands[p.exam_type].push(p.band_score);
      }
    });
    const moduleAverages = Object.entries(moduleBands).map(([mod, bands]) => ({
      mod,
      avg: bands.reduce((a, b) => a + b, 0) / bands.length,
    }));
    const strongest = moduleAverages.sort((a, b) => b.avg - a.avg)[0] ?? null;

    // Most repeated error type across this week
    const errorTotals: Record<string, number> = {};
    thisWeek.forEach((p) => {
      (p.errors_log ?? []).forEach((e: { type: string; count: number }) => {
        errorTotals[e.type] = (errorTotals[e.type] || 0) + e.count;
      });
    });
    const topError = Object.entries(errorTotals).sort((a, b) => b[1] - a[1])[0] ?? null;

    // Prior week comparison for strongest module
    const prevModuleBands: Record<string, number[]> = {};
    prevWeek.forEach((p) => {
      if (p.band_score) {
        if (!prevModuleBands[p.exam_type]) prevModuleBands[p.exam_type] = [];
        prevModuleBands[p.exam_type].push(p.band_score);
      }
    });

    // Exam countdown pace
    const examDate = profile?.exam_date ? new Date(profile.exam_date) : null;
    const daysLeft = examDate
      ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;
    const projectedSessions = daysLeft !== null ? Math.round((sessionCount / 7) * daysLeft) : null;

    return { sessionCount, strongest, topError, daysLeft, projectedSessions };
  }, [progress, profile?.exam_date]);

  if (!insights) return null;

  return (
    <div className="glass-card p-5 mb-8 border border-accent/10">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-accent" />
        <h2 className="text-sm font-medium uppercase tracking-wide text-accent">This week</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Sessions */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-base font-light text-foreground">
              {insights.sessionCount} practice{insights.sessionCount !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground">in the last 7 days</p>
          </div>
        </div>

        {/* Strongest module */}
        {insights.strongest && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-base font-light text-foreground">
                {MODULE_LABELS[insights.strongest.mod] ?? insights.strongest.mod}{" "}
                <span className="text-green-400">Band {insights.strongest.avg.toFixed(1)}</span>
              </p>
              <p className="text-xs text-muted-foreground">strongest this week</p>
            </div>
          </div>
        )}

        {/* Top error */}
        {insights.topError && (() => {
          const note = ERROR_NOTE_MAP[insights.topError[0]];
          return (
            <div className="sm:col-span-2 flex items-start gap-3 pt-2 border-t border-border/20">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-destructive text-xs font-bold">!</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  Most missed: <span className="text-destructive">{insights.topError[1]}× </span>
                  {note?.label ?? insights.topError[0]} questions
                </p>
                {note && (
                  <Link
                    to={`/dashboard/revision-notes?topic=${note.slug}`}
                    className="text-xs text-accent hover:underline"
                  >
                    Review this topic →
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        {/* Exam pace */}
        {insights.daysLeft !== null && insights.daysLeft > 0 && insights.projectedSessions !== null && (
          <div className="sm:col-span-2 flex items-center gap-3 pt-2 border-t border-border/20">
            <div className="w-8 h-8 rounded-lg bg-elite-gold/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-elite-gold" />
            </div>
            <p className="text-sm text-muted-foreground">
              At your current pace you'll complete{" "}
              <span className="text-foreground font-medium">{insights.projectedSessions} more practices</span>{" "}
              before your exam in {insights.daysLeft} days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
