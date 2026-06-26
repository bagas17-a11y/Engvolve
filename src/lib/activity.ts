import { supabase } from "@/integrations/supabase/client";

export type ActivityType = "revision_note" | "practice" | "study_plan" | "mudahinaja" | "flashcard";

export interface ActivityEntry {
  activity_type: ActivityType;
  label: string;
  route: string;
  created_at: string;
}

const LS_KEY = "ielts-recent-activity";
const MAX_LOCAL = 10;

/** Write an activity event to localStorage (instant) and Supabase (async). */
export async function logActivity(
  userId: string | undefined,
  type: ActivityType,
  label: string,
  route: string,
) {
  const entry: ActivityEntry = {
    activity_type: type,
    label,
    route,
    created_at: new Date().toISOString(),
  };

  // localStorage — always write, user-agnostic (recent device activity)
  try {
    const raw = localStorage.getItem(LS_KEY);
    const list: ActivityEntry[] = raw ? JSON.parse(raw) : [];
    // dedupe: remove older entry with same route
    const deduped = list.filter((a) => a.route !== route);
    deduped.unshift(entry);
    localStorage.setItem(LS_KEY, JSON.stringify(deduped.slice(0, MAX_LOCAL)));
  } catch { /* ignore */ }

  // Supabase — only when signed in
  if (!userId) return;
  (supabase as any)
    .from("user_activity")
    .insert({ user_id: userId, activity_type: type, label, route })
    .then(({ error }: any) => { if (error) console.error("activity log:", error); });
}

/** Read last N activities from localStorage (instant, no async needed for UI). */
export function getRecentActivity(n = 3): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as ActivityEntry[]).slice(0, n);
  } catch {
    return [];
  }
}

/** Track the last route visited so "Resume Study" works. */
export function setLastRoute(route: string) {
  try { localStorage.setItem("ielts-last-route", route); } catch { /* ignore */ }
}

export function getLastRoute(): string | null {
  try { return localStorage.getItem("ielts-last-route"); } catch { return null; }
}
