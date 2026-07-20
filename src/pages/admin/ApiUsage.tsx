import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowLeft, Zap, Loader2, RefreshCw, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface UsageRow {
  endpoint: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  created_at: string;
}

interface UserUsage {
  user_id: string;
  email: string;
  calls: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  lastCallAt: string | null;
  byEndpoint: Record<string, { calls: number; inputTokens: number; outputTokens: number }>;
  rows: UsageRow[];
}

function timeAgo(iso: string | null): string {
  if (!iso) return "Never";
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return "—";
  }
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default function ApiUsage() {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin, isCheckingAdmin } = useAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserUsage[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<UserUsage | null>(null);

  useEffect(() => {
    if (!isLoading && !user) { navigate("/auth"); return; }
    if (!isLoading && !isCheckingAdmin && user && !isAdmin) {
      navigate("/dashboard");
      toast({ title: "Access Denied", description: "Admin only.", variant: "destructive" });
    }
  }, [user, isLoading, isCheckingAdmin, isAdmin, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) fetchData();
  }, [user, isAdmin]);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [{ data: profiles }, { data: usageRows }] = await Promise.all([
        supabase.from("profiles").select("user_id, email").order("created_at", { ascending: false }),
        supabase
          .from("ai_usage_log")
          .select("user_id, endpoint, model, input_tokens, output_tokens, created_at")
          .order("created_at", { ascending: false }),
      ]);

      if (!profiles) return;

      const byUser: Record<string, UsageRow[]> = {};
      (usageRows ?? []).forEach((r) => {
        if (!byUser[r.user_id]) byUser[r.user_id] = [];
        byUser[r.user_id].push({
          endpoint: r.endpoint,
          model: r.model,
          input_tokens: r.input_tokens,
          output_tokens: r.output_tokens,
          created_at: r.created_at,
        });
      });

      const summaries: UserUsage[] = profiles.map((p) => {
        const rows = byUser[p.user_id] ?? [];
        const byEndpoint: UserUsage["byEndpoint"] = {};
        let inputTokens = 0;
        let outputTokens = 0;
        rows.forEach((r) => {
          inputTokens += r.input_tokens;
          outputTokens += r.output_tokens;
          if (!byEndpoint[r.endpoint]) byEndpoint[r.endpoint] = { calls: 0, inputTokens: 0, outputTokens: 0 };
          byEndpoint[r.endpoint].calls += 1;
          byEndpoint[r.endpoint].inputTokens += r.input_tokens;
          byEndpoint[r.endpoint].outputTokens += r.output_tokens;
        });
        return {
          user_id: p.user_id,
          email: p.email ?? "(no email)",
          calls: rows.length,
          inputTokens,
          outputTokens,
          totalTokens: inputTokens + outputTokens,
          lastCallAt: rows[0]?.created_at ?? null,
          byEndpoint,
          rows,
        };
      }).sort((a, b) => b.totalTokens - a.totalTokens);

      setUsers(summaries);
    } catch (err) {
      console.error("Failed to load API usage:", err);
      toast({ title: "Failed to load API usage", variant: "destructive" });
    } finally {
      setIsLoadingData(false);
    }
  };

  const filtered = useMemo(
    () => users.filter((u) => u.email.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  const grandTotal = useMemo(() => {
    return users.reduce(
      (acc, u) => ({
        calls: acc.calls + u.calls,
        inputTokens: acc.inputTokens + u.inputTokens,
        outputTokens: acc.outputTokens + u.outputTokens,
      }),
      { calls: 0, inputTokens: 0, outputTokens: 0 }
    );
  }, [users]);

  if (isLoading || isCheckingAdmin) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-light">API Usage</h1>
              <p className="text-sm text-muted-foreground">
                Claude API token usage per user — tracked from every ai-analyze / generate-* / chatbot call
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={fetchData} disabled={isLoadingData}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingData ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Grand totals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Users</p>
              <p className="text-2xl font-light">{users.length}</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">AI Calls</p>
              <p className="text-2xl font-light">{fmt(grandTotal.calls)}</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Input Tokens</p>
              <p className="text-2xl font-light">{fmt(grandTotal.inputTokens)}</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Output Tokens</p>
              <p className="text-2xl font-light">{fmt(grandTotal.outputTokens)}</p>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground">
          Note: logging started {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} — usage from before this only shows as 0 for users who tested earlier and haven't made a new AI call since.
        </p>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card className="glass-card">
          <CardContent className="p-0">
            {isLoadingData ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-16">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="text-center">Calls</TableHead>
                      <TableHead className="text-right">Input Tokens</TableHead>
                      <TableHead className="text-right">Output Tokens</TableHead>
                      <TableHead className="text-right">Total Tokens</TableHead>
                      <TableHead>Last Call</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((u) => (
                      <TableRow key={u.user_id} className="cursor-pointer hover:bg-secondary/20" onClick={() => setSelected(u)}>
                        <TableCell className="font-medium">{u.email}</TableCell>
                        <TableCell className="text-center">{u.calls}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmt(u.inputTokens)}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmt(u.outputTokens)}</TableCell>
                        <TableCell className="text-right tabular-nums font-semibold">{fmt(u.totalTokens)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{timeAgo(u.lastCallAt)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(u); }}>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selected?.email}</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-lg font-light">{fmt(selected.calls)}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Calls</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-lg font-light">{fmt(selected.inputTokens)}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Input Tok.</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-lg font-light">{fmt(selected.outputTokens)}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Output Tok.</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  By endpoint
                </h3>
                <div className="space-y-1.5">
                  {Object.entries(selected.byEndpoint)
                    .sort((a, b) => (b[1].inputTokens + b[1].outputTokens) - (a[1].inputTokens + a[1].outputTokens))
                    .map(([endpoint, stats]) => (
                      <div key={endpoint} className="flex items-center justify-between text-xs p-2 rounded-lg bg-secondary/20 border border-border/20">
                        <span className="font-mono text-foreground/80">{endpoint}</span>
                        <span className="text-muted-foreground">
                          {stats.calls} call{stats.calls !== 1 ? "s" : ""} · {fmt(stats.inputTokens)} in / {fmt(stats.outputTokens)} out
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Recent calls
                </h3>
                <div className="space-y-1.5 max-h-96 overflow-y-auto">
                  {selected.rows.slice(0, 50).map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-secondary/20 border border-border/20">
                      <div className="flex flex-col">
                        <span className="text-foreground/80">{r.endpoint}</span>
                        <span className="text-muted-foreground/70 font-mono">{r.model}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground">{fmt(r.input_tokens)} in / {fmt(r.output_tokens)} out</span>
                        <p className="text-muted-foreground/60">{timeAgo(r.created_at)}</p>
                      </div>
                    </div>
                  ))}
                  {selected.rows.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">No AI calls recorded for this user yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
