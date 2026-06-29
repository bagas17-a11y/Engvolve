import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Target, TrendingUp, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MODULE_LABELS: Record<string, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

const MODULE_ORDER = ["reading", "listening", "writing", "speaking"];

function moduleColor(band: number) {
  if (band >= 7) return "text-green-400";
  if (band >= 6) return "text-yellow-400";
  return "text-red-400";
}

interface ErrorEntry { type: string; count: number; }

function WeaknessModuleCard({
  module,
  band,
  errors,
  criteriaScores,
}: {
  module: string;
  band: number | null;
  errors: ErrorEntry[];
  criteriaScores: Record<string, number> | null;
}) {
  const label = MODULE_LABELS[module] ?? module;
  const hasData = errors.length > 0 || criteriaScores !== null;

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        {band !== null && (
          <span className={`text-sm font-light ${moduleColor(band)}`}>
            Band {band.toFixed(1)}
          </span>
        )}
      </div>

      {!hasData && (
        <p className="text-xs text-muted-foreground">No sessions yet</p>
      )}

      {/* Reading / Listening: question type error counts */}
      {errors.length > 0 && (
        <div className="space-y-1.5">
          {errors
            .slice()
            .sort((a, b) => b.count - a.count)
            .map((e) => (
              <div key={e.type} className="flex items-center gap-2">
                <div
                  className="h-1.5 rounded-full bg-destructive/60 shrink-0"
                  style={{ width: `${Math.min(100, (e.count / Math.max(...errors.map((x) => x.count))) * 100)}%`, minWidth: 8 }}
                />
                <span className="text-xs text-muted-foreground capitalize truncate">
                  {e.type.replace(/_/g, " ")}
                </span>
                <span className="text-xs text-foreground/60 ml-auto shrink-0">{e.count}</span>
              </div>
            ))}
        </div>
      )}

      {/* Writing / Speaking: criteria bands */}
      {criteriaScores && (
        <div className="space-y-1.5">
          {Object.entries(criteriaScores)
            .sort((a, b) => a[1] - b[1])
            .map(([criterion, score]) => (
              <div key={criterion} className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground capitalize truncate">
                  {criterion
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                </span>
                <span className={`text-xs font-medium shrink-0 ${moduleColor(score)}`}>
                  {score}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export function BridgeToSuccess() {
  const { profile } = useAuth();
  const { progress } = useUserProgress();
  const navigate = useNavigate();

  const currentBand = useMemo(() => {
    const diagnosticResult = progress.find((p) => (p.exam_type as string) === "diagnostic");
    if (diagnosticResult?.band_score) return Number(diagnosticResult.band_score);
    return Number(profile?.current_reading_score) || 5;
  }, [progress, profile]);

  const targetBand = Number(profile?.target_band_score) || 7;

  const progressPercentage = useMemo(() => {
    const gap = targetBand - 5;
    const achieved = currentBand - 5;
    return Math.min(100, Math.max(0, (achieved / gap) * 100));
  }, [currentBand, targetBand]);

  const diagnosticTaken = progress.some((p) => (p.exam_type as string) === "diagnostic");

  // Per-module weakness data: latest session's errors_log + criteria
  const moduleWeakness = useMemo(() => {
    const result: Record<
      string,
      { band: number | null; errors: ErrorEntry[]; criteriaScores: Record<string, number> | null }
    > = {};

    for (const mod of MODULE_ORDER) {
      const sessions = progress.filter((p) => p.exam_type === mod);
      if (!sessions.length) {
        result[mod] = { band: null, errors: [], criteriaScores: null };
        continue;
      }
      const latest = sessions[0];
      const errors: ErrorEntry[] = Array.isArray(latest.errors_log)
        ? (latest.errors_log as ErrorEntry[]).filter((e) => e.count > 0)
        : [];
      const meta = latest.metadata as Record<string, unknown> | null;
      const criteriaScores =
        meta?.criteriaScores && typeof meta.criteriaScores === "object"
          ? (meta.criteriaScores as Record<string, number>)
          : null;
      result[mod] = { band: latest.band_score, errors, criteriaScores };
    }
    return result;
  }, [progress]);

  const anyModuleData = MODULE_ORDER.some(
    (m) =>
      moduleWeakness[m]?.band !== null ||
      (moduleWeakness[m]?.errors.length ?? 0) > 0 ||
      moduleWeakness[m]?.criteriaScores !== null
  );

  if (!diagnosticTaken) {
    return (
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium">Take the Diagnostic Quiz</h3>
            <p className="text-sm text-muted-foreground">
              Discover your current level and get a personalised learning path
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/diagnostic")}
          className="w-full btn-neumorphic-primary text-sm py-3"
        >
          Start Diagnostic Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Path to Target */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Path to Target
          </h3>
          <span className="text-xs text-muted-foreground">
            {(targetBand - currentBand).toFixed(1)} bands to go
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-light text-accent leading-none">{currentBand}</span>
            <span className="text-[11px] font-medium text-accent/70 uppercase tracking-wide">Current</span>
          </div>
          <div className="flex-1 mx-4 border-t-2 border-dashed border-border/50" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-light text-elite-gold leading-none">{targetBand}</span>
            <span className="text-[11px] font-medium text-elite-gold/70 uppercase tracking-wide">Target</span>
          </div>
        </div>

        <div className="relative">
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-elite-gold rounded-full transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent ring-2 ring-background shadow-md transition-all duration-700"
            style={{ left: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between px-0.5">
          {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((band) => (
            <div key={band} className="flex flex-col items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${band <= currentBand ? "bg-accent" : "bg-border"}`} />
              {Number.isInteger(band) && (
                <span className="text-[10px] text-muted-foreground">{band}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Module Weakness Breakdown */}
      <div className="space-y-3">
        <h3 className="font-medium flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 text-destructive/70" />
          Weakness Breakdown
        </h3>
        {!anyModuleData && (
          <p className="text-xs text-muted-foreground px-1">
            Complete practice sessions to see your weakness breakdown per module.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODULE_ORDER.map((mod) => (
            <WeaknessModuleCard
              key={mod}
              module={mod}
              band={moduleWeakness[mod]?.band ?? null}
              errors={moduleWeakness[mod]?.errors ?? []}
              criteriaScores={moduleWeakness[mod]?.criteriaScores ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
