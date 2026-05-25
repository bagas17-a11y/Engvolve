import { useMemo } from "react";
import type { ReactNode } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { humanAiCurriculum } from "@/content";
import {
  getMasteryModule,
  type MasteryModuleId,
  type MasteryTip,
  type BandLevel,
} from "@/content/masteryGuides";
import {
  DefinitionCard,
  SectionTitle,
  ExaminerTip,
} from "@/pages/dashboard/revision-notes/RevisionNoteContent";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Crown,
  Lock,
  Zap,
  Lightbulb,
  Layout,
  AlertTriangle,
  Flag,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const moduleIcons: Record<string, React.ElementType> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
};

const BAND_LABEL: Record<BandLevel, string> = {
  "5to6": "5→6",
  "6to65": "6→6.5",
  "65to7plus": "6.5→7+",
};

const BAND_PILL_BASE =
  "rounded-full font-medium border";

const BAND_PILL_COLOR: Record<BandLevel, string> = {
  "5to6": "bg-teal-500/15 text-teal-700 border-teal-500/30",
  "6to65": "bg-blue-500/15 text-blue-700 border-blue-500/30",
  "65to7plus": "bg-purple-500/15 text-purple-700 border-purple-500/30",
};

const TIP_BORDER: Record<MasteryTip["type"], string> = {
  hack: "border-amber-400",
  tip: "border-blue-400",
  template: "border-purple-400",
  warning: "border-red-400",
  "indonesian-note": "border-green-400",
};

const TIP_ICON_COLOR: Record<MasteryTip["type"], string> = {
  hack: "text-amber-400",
  tip: "text-blue-400",
  template: "text-purple-400",
  warning: "text-red-400",
  "indonesian-note": "text-green-400",
};

// ─── Small Components ─────────────────────────────────────────────────────────

function TipIcon({ type, size = 16 }: { type: MasteryTip["type"]; size?: number }) {
  const cls = cn("shrink-0", TIP_ICON_COLOR[type]);
  switch (type) {
    case "hack":
      return <Zap size={size} className={cls} />;
    case "tip":
      return <Lightbulb size={size} className={cls} />;
    case "template":
      return <Layout size={size} className={cls} />;
    case "warning":
      return <AlertTriangle size={size} className={cls} />;
    case "indonesian-note":
      return <Flag size={size} className={cls} />;
  }
}

function BandPill({ level, size = "sm" }: { level: BandLevel; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        BAND_PILL_BASE,
        BAND_PILL_COLOR[level],
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2.5 py-1"
      )}
    >
      {BAND_LABEL[level]}
    </span>
  );
}

// ─── renderBody helpers ───────────────────────────────────────────────────────

function parseBold(line: string): ReactNode {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return line;
  return (
    <>
      {parts.map((part, i) =>
        /^\*\*[^*]+\*\*$/.test(part) ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function renderBody(text: string): ReactNode {
  if (!text) return null;

  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];
  let k = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul
        key={`ul-${k++}`}
        className="list-disc pl-4 space-y-1 text-foreground/80 text-sm mt-1 mb-1"
      >
        {listBuffer.map((item, i) => (
          <li key={i}>{parseBold(item.slice(2))}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listBuffer.push(line);
    } else {
      flushList();
      if (line.trim() === "") {
        nodes.push(<div key={`sp-${k++}`} className="h-2" />);
      } else {
        nodes.push(
          <p key={`p-${k++}`} className="text-foreground/80 text-sm leading-relaxed mb-1">
            {parseBold(line)}
          </p>
        );
      }
    }
  }
  flushList();

  return <>{nodes}</>;
}

// ─── TipCard ──────────────────────────────────────────────────────────────────

function TipCard({ tip }: { tip: MasteryTip }) {
  const heading =
    tip.type === "indonesian-note" ? `🇮🇩 Catatan: ${tip.heading}` : tip.heading;

  const hasBeforeAfter =
    tip.example !== undefined &&
    tip.example.before !== undefined &&
    tip.example.after !== undefined;

  const hasTextOnly =
    tip.example !== undefined && !hasBeforeAfter && tip.example.text !== undefined;

  return (
    <DefinitionCard>
      <div className={cn("border-l-4 pl-4", TIP_BORDER[tip.type])}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <TipIcon type={tip.type} size={16} />
          <span className="text-foreground font-semibold text-sm">{heading}</span>
        </div>

        {/* Body */}
        <div className="text-foreground/80 text-sm leading-relaxed">
          {renderBody(tip.body)}
        </div>

        {/* Example */}
        {tip.example && (hasBeforeAfter || hasTextOnly) && (
          <div className="bg-background rounded-lg p-3 mt-3 text-sm border border-border">
            {hasBeforeAfter ? (
              <>
                {tip.example.label && (
                  <span className="text-muted-foreground text-xs mb-2 block">
                    {tip.example.label}
                  </span>
                )}
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-500 font-bold shrink-0">✗</span>
                  <span className="text-red-600 text-xs">{tip.example.before}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold shrink-0">✓</span>
                  <span className="text-green-700 text-xs">{tip.example.after}</span>
                </div>
              </>
            ) : (
              <>
                {tip.example.label && (
                  <span className="text-muted-foreground text-xs mb-1 block">
                    {tip.example.label}
                  </span>
                )}
                {tip.example.text && (
                  <span className="text-foreground/90 text-xs italic">{tip.example.text}</span>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </DefinitionCard>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MaterialsPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isElite = profile?.subscription_tier === "elite";

  const rawModule = searchParams.get("module") || "writing";
  const moduleId: MasteryModuleId = (
    ["writing", "reading", "listening", "speaking"] as MasteryModuleId[]
  ).includes(rawModule as MasteryModuleId)
    ? (rawModule as MasteryModuleId)
    : "writing";

  const sectionId = searchParams.get("section") || null;

  const currentModule = useMemo(() => getMasteryModule(moduleId), [moduleId]);

  const currentSection = useMemo(() => {
    if (sectionId) {
      return (
        currentModule.sections.find((s) => s.id === sectionId) ??
        currentModule.sections[0]
      );
    }
    return currentModule.sections[0];
  }, [moduleId, sectionId, currentModule]);

  const setSection = (id: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("section", id);
      return next;
    });
  };

  const setModule = (id: MasteryModuleId) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("module", id);
      next.delete("section");
      return next;
    });
  };

  const moduleTitle =
    humanAiCurriculum.find((m) => m.id === moduleId)?.title ??
    moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

  const sectionIndex = currentModule.sections.findIndex(
    (s) => s.id === currentSection.id
  );

  // ── Lock screen ──────────────────────────────────────────────────────────

  if (!isElite) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 rounded-full bg-elite-gold/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-elite-gold" />
          </div>
          <h1 className="text-3xl font-light mb-4">
            Unlock <span className="text-elite-gold">Elite Materials</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Access the full curriculum and detailed lesson content for Listening, Reading, Writing,
            and Speaking. Upgrade to the Elite package to use this feature.
          </p>
          <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-light mb-4">What you get:</h3>
            <ul className="space-y-3 text-left max-w-md mx-auto">
              {[
                "Full curriculum for all 4 modules",
                "Detailed lessons with examples and tips",
                "Common mistakes and practice advice",
                "IELTS-specific tips per topic",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-foreground/80">
                  <Crown className="w-4 h-4 text-elite-gold flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <Button
            onClick={() => navigate("/pricing-selection")}
            className="bg-elite-gold/20 text-elite-gold border border-elite-gold/30 hover:bg-elite-gold/30"
          >
            View plans
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // ── Authenticated Elite content ───────────────────────────────────────────

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-light flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-elite-gold" />
            Elite Materials
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Curriculum and detailed lessons for all four IELTS modules.
          </p>
        </div>

        {/* Module tab bar */}
        <Tabs
          value={moduleId}
          onValueChange={(v) => setModule(v as MasteryModuleId)}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-4 h-auto gap-1 p-1">
            {humanAiCurriculum.map((mod) => {
              const Icon = moduleIcons[mod.id] ?? BookOpen;
              return (
                <TabsTrigger
                  key={mod.id}
                  value={mod.id}
                  className={cn(
                    "flex items-center gap-2 py-2.5",
                    moduleId === mod.id &&
                      "bg-elite-gold/20 text-elite-gold data-[state=active]:shadow-none"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {mod.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* ── Left sidebar ─────────────────────────────────────────────── */}
          <div className="w-full md:w-[260px] md:flex-shrink-0">
            {/* Sidebar header */}
            <div className="px-4 py-3 mb-1">
              <p className="text-elite-gold font-semibold text-sm">{moduleTitle}</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {currentModule.sections.length} section
                {currentModule.sections.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Section list */}
            <div className="space-y-0.5">
              {currentModule.sections.map((section) => {
                const isActive = section.id === currentSection.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setSection(section.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-r-lg transition-colors",
                      isActive
                        ? "bg-elite-gold/10 border-l-2 border-elite-gold text-elite-gold"
                        : "hover:bg-secondary/60 text-foreground/70 cursor-pointer border-l-2 border-transparent"
                    )}
                  >
                    <p className="text-sm font-medium leading-snug">{section.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {section.bandLevels.map((level) => (
                        <BandPill key={level} level={level} size="sm" />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right content panel ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* 1. Section header */}
            <div>
              <SectionTitle
                number={sectionIndex + 1}
                title={currentSection.title}
              />
              <p className="text-foreground/80 text-sm mt-2 mb-3 leading-relaxed">
                {currentSection.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentSection.bandLevels.map((level) => (
                  <BandPill key={level} level={level} size="md" />
                ))}
              </div>
            </div>

            {/* 2. Revision links */}
            {currentSection.revisionLinks && currentSection.revisionLinks.length > 0 && (
              <div>
                <p className="text-muted-foreground/70 text-xs mb-2">Refresh your basics</p>
                <div className="flex flex-wrap gap-2">
                  {currentSection.revisionLinks.map((link) => (
                    <button
                      key={link.topicId}
                      onClick={() =>
                        navigate(`/dashboard/revision-notes?topic=${link.topicId}`)
                      }
                      className="flex items-center gap-1.5 border border-border bg-secondary/50 rounded-full px-3 py-1 text-xs text-muted-foreground hover:border-blue-500/50 hover:text-blue-500 transition-colors"
                    >
                      <BookOpen size={12} className="shrink-0" />
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Tip cards */}
            <div className="space-y-4">
              {currentSection.tips.map((tip, i) => (
                <TipCard key={`${currentSection.id}-tip-${i}`} tip={tip} />
              ))}
            </div>

            {/* 4. IELTS tip */}
            {currentSection.ieltsTip && (
              <ExaminerTip>{currentSection.ieltsTip}</ExaminerTip>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
