import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Headphones,
  Link2,
  Mic,
  PenTool,
  Play,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PLANS, type TierPlan, type StudyWeek, type StudyTask } from "@/pages/dashboard/StudyPlanPage";

const TIER_ORDER = ["foundation", "developing", "polishing"] as const;
type TierKey = typeof TIER_ORDER[number];

const TIER_META: Record<TierKey, { color: string; badgeClass: string; labelClass: string; borderClass: string; headerClass: string }> = {
  foundation: {
    color: "blue",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    labelClass: "text-blue-400",
    borderClass: "border-blue-500/20",
    headerClass: "bg-blue-500/5",
  },
  developing: {
    color: "purple",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    labelClass: "text-purple-400",
    borderClass: "border-purple-500/20",
    headerClass: "bg-purple-500/5",
  },
  polishing: {
    color: "amber",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    labelClass: "text-amber-400",
    borderClass: "border-amber-500/20",
    headerClass: "bg-amber-500/5",
  },
};

const WEEK_COLORS: Record<string, string> = {
  blue: "border-blue-500/20 bg-blue-500/5",
  green: "border-green-500/20 bg-green-500/5",
  purple: "border-purple-500/20 bg-purple-500/5",
  amber: "border-amber-500/20 bg-amber-500/5",
  red: "border-red-500/20 bg-red-500/5",
};

const WEEK_LABEL_COLORS: Record<string, string> = {
  blue: "text-blue-400",
  green: "text-green-400",
  purple: "text-purple-400",
  amber: "text-amber-400",
  red: "text-red-400",
};

function TaskRow({ task }: { task: StudyTask }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = !!(task.description || task.resourcePath || task.sourceUrl || (task.worksheetPrompts?.length));

  return (
    <div className="rounded-lg border border-border/20 bg-secondary/10 overflow-hidden">
      <button
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-secondary/20 transition-colors"
        onClick={() => hasDetail && setExpanded((v) => !v)}
      >
        <div className="mt-0.5 shrink-0">
          {hasDetail ? (
            expanded
              ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <div className="w-3.5 h-3.5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">{task.label}</p>
          {!expanded && task.description && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {task.sourceType === "video" && <Play className="w-3 h-3 text-muted-foreground" />}
          {task.sourceType === "article" && <Link2 className="w-3 h-3 text-muted-foreground" />}
          {task.worksheetPrompts?.length ? (
            <Badge variant="outline" className="text-xs px-1.5 py-0 bg-accent/10 text-accent border-accent/30">
              {task.worksheetPrompts.length}Q
            </Badge>
          ) : null}
          <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{task.minutes}m</span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-border/10 pt-2 ml-6">
          {task.description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {task.resourcePath && (
              <Badge variant="outline" className="text-xs gap-1 bg-secondary/30">
                <FileText className="w-3 h-3" />
                {task.resourceLabel ?? task.resourcePath}
              </Badge>
            )}
            {task.sourceUrl && (
              <a href={task.sourceUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                <Badge variant="outline" className="text-xs gap-1 bg-secondary/30 hover:bg-secondary/50 cursor-pointer">
                  <ExternalLink className="w-3 h-3" />
                  {task.sourceType === "video" ? "Watch video" : "Read article"}
                </Badge>
              </a>
            )}
          </div>
          {task.relatedSources && task.relatedSources.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Related sources:</p>
              {task.relatedSources.map((src, i) => (
                <a key={i} href={src.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-accent hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  {src.label}
                </a>
              ))}
            </div>
          )}
          {task.worksheetPrompts && task.worksheetPrompts.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Worksheet questions ({task.worksheetPrompts.length}):</p>
              {task.worksheetPrompts.map((prompt, i) => (
                <div key={prompt.id} className="flex items-start gap-1.5 text-xs">
                  <span className="text-muted-foreground/60 shrink-0">{i + 1}.</span>
                  <div>
                    <span className="text-muted-foreground font-medium">{prompt.label}</span>
                    {prompt.type && (
                      <Badge variant="outline" className="ml-1.5 text-xs px-1.5 py-0 capitalize bg-secondary/20">
                        {prompt.type}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WeekSection({ week }: { week: StudyWeek }) {
  const [open, setOpen] = useState(false);
  const colorClass = WEEK_COLORS[week.color] ?? WEEK_COLORS.blue;
  const labelClass = WEEK_LABEL_COLORS[week.color] ?? WEEK_LABEL_COLORS.blue;

  return (
    <div className={`rounded-xl border ${colorClass} overflow-hidden`}>
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {open
            ? <ChevronDown className={`w-4 h-4 ${labelClass}`} />
            : <ChevronRight className={`w-4 h-4 ${labelClass}`} />}
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium uppercase tracking-wide ${labelClass}`}>Week {week.week}</span>
              {week.weeklyTheme && (
                <Badge variant="outline" className="text-xs px-1.5 py-0 bg-secondary/20">
                  Theme: {week.weeklyTheme}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs px-1.5 py-0 bg-secondary/20">
                {week.focus}
              </Badge>
            </div>
            <p className="text-sm font-medium mt-0.5">{week.theme}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground shrink-0 ml-3">{week.tasks.length} tasks</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border/10">
          {week.rationale && (
            <p className="text-xs text-muted-foreground leading-relaxed pt-3 italic border-l-2 border-border/30 pl-3">
              {week.rationale}
            </p>
          )}
          <div className="space-y-1.5">
            {week.tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TierPanel({ plan, tierKey }: { plan: TierPlan; tierKey: TierKey }) {
  const meta = TIER_META[tierKey];
  return (
    <div className="space-y-4">
      <div className={`rounded-xl border ${meta.borderClass} ${meta.headerClass} p-4`}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className={`text-xs ${meta.badgeClass}`}>Band {plan.bandRange}</Badge>
          <span className="text-xs text-muted-foreground">Target: Band {plan.targetBand}</span>
        </div>
        <p className="text-base font-medium">{plan.headline}</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{plan.description}</p>
      </div>
      <div className="space-y-3">
        {plan.weeks.map((week) => (
          <WeekSection key={week.week} week={week} />
        ))}
      </div>
    </div>
  );
}

export default function AdminStudyPlans() {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin, isCheckingAdmin } = useAuth();
  const [activeTier, setActiveTier] = useState<TierKey>("foundation");

  if (isLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    navigate("/dashboard");
    return null;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-light">Study Plans</h1>
            <p className="text-sm text-muted-foreground">Read-only view of all 3 tier curricula</p>
          </div>
        </div>

        <div className="flex gap-2">
          {TIER_ORDER.map((key) => {
            const plan = PLANS[key];
            const meta = TIER_META[key];
            const isActive = activeTier === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTier(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  isActive
                    ? `${meta.badgeClass} border-current`
                    : "text-muted-foreground border-border/30 hover:border-border/60 bg-secondary/10"
                }`}
              >
                {plan.tier}
                <span className="ml-1.5 text-xs opacity-70">Band {plan.bandRange}</span>
              </button>
            );
          })}
        </div>

        <TierPanel plan={PLANS[activeTier]} tierKey={activeTier} />
      </div>
    </DashboardLayout>
  );
}
