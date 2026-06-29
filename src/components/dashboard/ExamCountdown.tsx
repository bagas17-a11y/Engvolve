import { useState } from "react";
import { CalendarDays, Pencil, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

function daysUntil(dateStr: string): number {
  const exam = new Date(dateStr);
  exam.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function ExamCountdown() {
  const { user, profile, refreshProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(profile?.exam_date ?? "");
  const [saving, setSaving] = useState(false);

  const days = profile?.exam_date ? daysUntil(profile.exam_date) : null;

  const handleSave = async () => {
    if (!user || !value) return;
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from("profiles")
        .update({ exam_date: value })
        .eq("user_id", user.id);
      if (error) throw error;
      await refreshProfile();
      setEditing(false);
      toast.success("Exam date saved.");
    } catch {
      toast.error("Failed to save exam date.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setValue(profile?.exam_date ?? "");
    setEditing(false);
  };

  const urgencyClass =
    days === null
      ? "border-border/30 bg-secondary/20"
      : days <= 7
      ? "border-red-500/40 bg-red-500/5"
      : days <= 14
      ? "border-yellow-500/40 bg-yellow-500/5"
      : "border-accent/20 bg-accent/5";

  const dayLabel =
    days === null
      ? null
      : days < 0
      ? "Exam passed"
      : days === 0
      ? "Today!"
      : `${days} day${days !== 1 ? "s" : ""} to exam`;

  const dayColor =
    days === null
      ? "text-muted-foreground"
      : days <= 7
      ? "text-red-400"
      : days <= 14
      ? "text-yellow-400"
      : "text-accent";

  if (editing) {
    return (
      <div className={`glass-card p-4 mb-6 flex items-center gap-3 border ${urgencyClass}`}>
        <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-muted-foreground shrink-0">Exam date:</span>
        <input
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-transparent border-b border-border/60 text-sm text-foreground focus:outline-none focus:border-accent px-1"
          autoFocus
        />
        <button
          onClick={handleSave}
          disabled={saving || !value}
          className="ml-1 text-accent hover:text-accent/80 disabled:opacity-40"
          aria-label="Save"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Cancel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (!profile?.exam_date) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="glass-card p-3 mb-6 flex items-center gap-2 border border-dashed border-border/40 hover:border-accent/40 transition-colors w-full text-left group"
      >
        <CalendarDays className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Set your exam date for a personalised countdown
        </span>
      </button>
    );
  }

  return (
    <div className={`glass-card p-3 mb-6 flex items-center justify-between border ${urgencyClass}`}>
      <div className="flex items-center gap-2">
        <CalendarDays className={`w-4 h-4 ${dayColor}`} />
        <span className={`text-sm font-medium ${dayColor}`}>{dayLabel}</span>
        <span className="text-xs text-muted-foreground">
          · {new Date(profile.exam_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
      <button
        onClick={() => { setValue(profile.exam_date ?? ""); setEditing(true); }}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Edit exam date"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
