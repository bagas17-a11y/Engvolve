import { ReactNode, useState, useRef, useCallback, useContext, createContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lightbulb, PenLine, BookOpen, ChevronDown, ChevronUp, CheckCircle2, XCircle, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_GLOW = "#3b82f6";

export function SectionTitle({
  number,
  title,
  className,
}: {
  number: number;
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "flex items-baseline gap-3 mt-8 mb-3 text-lg font-bold text-foreground border-b border-border pb-2 first:mt-0",
        className
      )}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold bg-blue-500/20 text-blue-500"
        style={{ boxShadow: "0 0 12px rgba(59, 130, 246, 0.2)" }}
      >
        {number}
      </span>
      {title}
    </h2>
  );
}

export function SubSectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-base font-semibold text-foreground mt-4 mb-2 tracking-tight",
        className
      )}
    >
      {title}
    </h3>
  );
}

export function KeyList({
  items,
  className,
}: {
  items: (ReactNode | string)[];
  className?: string;
}) {
  return (
    <ul className={cn("list-disc pl-5 space-y-1.5 text-sm text-foreground/80", className)}>
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {typeof item === "string" ? item : item}
        </li>
      ))}
    </ul>
  );
}

export function MiniPractice({
  title,
  prompt,
  modelLabel = "Model answer",
  model,
  modelItems,
  collapsibleModel = true,
  defaultModelVisible = false,
  inputMode = "free",
  className,
}: {
  title: string;
  prompt: ReactNode;
  modelLabel?: string;
  model?: ReactNode;
  modelItems?: ReactNode[];
  collapsibleModel?: boolean;
  defaultModelVisible?: boolean;
  inputMode?: "none" | "free";
  className?: string;
}) {
  const [showModel, setShowModel] = useState(defaultModelVisible);
  const hasModel = model || (modelItems && modelItems.length > 0);
  const isRevealed = !collapsibleModel || showModel;

  return (
    <div
      className={cn(
        "rounded-xl border border-border overflow-hidden bg-secondary/60",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-blue-500/10">
        <BookOpen className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-semibold text-blue-600">{title}</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="text-sm text-foreground/80">{prompt}</div>
        {inputMode === "free" && (
          <div>
            <textarea
              placeholder="Type your answer here…"
              className="w-full min-h-[80px] rounded-lg border border-border bg-background/80 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              rows={3}
            />
          </div>
        )}
        {hasModel && (
          <div>
            {collapsibleModel && !isRevealed ? (
              <button
                type="button"
                onClick={() => setShowModel(true)}
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-500/10 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
                Reveal {modelLabel.toLowerCase()}
              </button>
            ) : collapsibleModel ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowModel(false)}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-2"
                >
                  <ChevronUp className="h-3 w-3" />
                  Hide answer
                </button>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
                    {modelLabel}
                  </p>
                  {model && <p className="text-sm text-foreground/90">{model}</p>}
                  {modelItems && (
                    <ol className="list-decimal pl-4 space-y-1.5 text-sm text-foreground/90">
                      {modelItems.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
                  {modelLabel}
                </p>
                {model && <p className="text-sm text-foreground/90">{model}</p>}
                {modelItems && (
                  <ol className="list-decimal pl-4 space-y-1.5 text-sm text-foreground/90">
                    {modelItems.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ol>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function DefinitionCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/80 bg-secondary/50 p-4 text-foreground",
        className
      )}
    >
      {title && (
        <h3 className="text-base font-semibold text-foreground mb-3">{title}</h3>
      )}
      <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
    </div>
  );
}

export function ExaminerTip({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-emerald-500/40 bg-emerald-500/6 p-3.5 relative overflow-hidden">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
          <Lightbulb className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-600 mb-1">
            Examiner Tip
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}

export function WorkedExample({ children }: { children: ReactNode }) {
  return (
    <div
      className="my-3 rounded-r-lg border-l-2 pl-3 py-2 pr-3"
      style={{
        borderLeftColor: PRIMARY_GLOW,
        backgroundColor: "rgba(59, 130, 246, 0.06)",
      }}
    >
      <p className="text-xs font-medium text-blue-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
        <PenLine className="h-3 w-3" />
        Worked Example
      </p>
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  );
}

export function RevisionTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border bg-secondary/60">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {headers.map((h) => (
              <TableHead
                key={h}
                className="h-11 px-4 text-left text-sm font-medium text-muted-foreground border-b border-border bg-secondary/80"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              className="border-b border-border border-l-0 border-r-0 hover:bg-secondary/30 transition-colors"
            >
              {row.map((cell, j) => (
                <TableCell
                  key={j}
                  className="px-4 py-3 text-sm text-foreground/90 border-0"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function MistakeRow({
  wrong,
  correct,
}: {
  wrong: string;
  correct: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-1.5 text-sm">
      <span className="text-red-500">✗</span>
      <span className="text-foreground/70">&quot;{wrong}&quot;</span>
      <span className="text-muted-foreground">→</span>
      <span className="text-emerald-500">✓ &quot;{correct}&quot;</span>
    </div>
  );
}

// ─── Worksheet context ────────────────────────────────────────────────────────

interface WsAnswer {
  questionText: string;
  answer: string;
  isCorrect?: boolean;
  modelAnswer: string;
  section: string;
}

const WsCtx = createContext<{
  register: (id: string, q: string, model: string, section: string) => void;
  report: (id: string, answer: string, isCorrect?: boolean) => void;
} | null>(null);

const WsSectionCtx = createContext<string>("");

// WorksheetContainer — wraps all blocks, owns answers state, provides Download PDF
export function WorksheetContainer({ topicName, children }: { topicName: string; children: ReactNode }) {
  const answersRef = useRef<Map<string, WsAnswer>>(new Map());
  const orderRef = useRef<string[]>([]);

  const register = useCallback((id: string, q: string, model: string, section: string) => {
    if (!answersRef.current.has(id)) orderRef.current.push(id);
    if (!answersRef.current.get(id)?.answer) {
      answersRef.current.set(id, { questionText: q, answer: "", modelAnswer: model, section, isCorrect: undefined });
    }
  }, []);

  const report = useCallback((id: string, answer: string, isCorrect?: boolean) => {
    const prev = answersRef.current.get(id);
    if (prev) answersRef.current.set(id, { ...prev, answer, isCorrect });
  }, []);

  const handleDownload = () => {
    const rows = orderRef.current.map(id => answersRef.current.get(id)!);
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    // group by section
    const sections: { title: string; items: (WsAnswer & { idx: number })[] }[] = [];
    let globalIdx = 1;
    rows.forEach(r => {
      let sec = sections.find(s => s.title === r.section);
      if (!sec) { sec = { title: r.section, items: [] }; sections.push(sec); }
      sec.items.push({ ...r, idx: globalIdx++ });
    });

    const verdictColor = (r: WsAnswer) => r.isCorrect === true ? "#16a34a" : r.isCorrect === false ? "#dc2626" : "#94a3b8";
    const verdictText = (r: WsAnswer) => r.isCorrect === true ? "✓ Correct" : r.isCorrect === false ? "✗ Incorrect" : "Not checked";
    const answerBg = (r: WsAnswer) => r.isCorrect === true ? "#f0fdf4" : r.isCorrect === false ? "#fef2f2" : r.answer ? "#f8fafc" : "#f1f5f9";
    const answerBorder = (r: WsAnswer) => r.isCorrect === true ? "#22c55e" : r.isCorrect === false ? "#ef4444" : "#cbd5e1";

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>${topicName} Worksheet</title>
<style>
  body{font-family:Arial,sans-serif;max-width:760px;margin:0 auto;padding:28px;color:#1e293b}
  h1{font-size:20px;color:#1e40af;border-bottom:2px solid #1e40af;padding-bottom:8px;margin-bottom:4px}
  .meta{color:#64748b;font-size:12px;margin-bottom:24px}
  .section{margin-bottom:28px}
  .sec-title{font-size:13px;font-weight:700;color:#1e40af;background:#eff6ff;padding:7px 12px;border-radius:6px;margin-bottom:12px;border-left:3px solid #3b82f6}
  .qblock{margin-bottom:14px;padding:12px;border:1px solid #e2e8f0;border-radius:8px;page-break-inside:avoid}
  .qnum{font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:3px}
  .qtext{font-size:14px;margin-bottom:8px;line-height:1.5}
  .ans{padding:8px 12px;border-radius:6px;border-width:1px;border-style:solid;font-size:14px}
  .verdict{font-size:11px;font-weight:700;margin-top:5px}
  .model{font-size:12px;color:#64748b;margin-top:6px;line-height:1.4}
  .model b{color:#475569}
  @media print{button{display:none!important}}
</style></head><body>
<h1>${topicName} — Worksheet</h1>
<div class="meta">Completed: ${date} &nbsp;|&nbsp; For manual grading by the EngInAja team</div>
${sections.map(s => `
<div class="section">
  <div class="sec-title">${s.title}</div>
  ${s.items.map(r => `
  <div class="qblock">
    <div class="qnum">Question ${r.idx}</div>
    <div class="qtext">${r.questionText}</div>
    <div class="ans" style="background:${answerBg(r)};border-color:${answerBorder(r)}">
      ${r.answer || '<span style="color:#94a3b8;font-style:italic">No answer given</span>'}
    </div>
    <div class="verdict" style="color:${verdictColor(r)}">${verdictText(r)}</div>
    <div class="model"><b>Model answer:</b> ${r.modelAnswer}</div>
  </div>`).join("")}
</div>`).join("")}
</body></html>`;

    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); setTimeout(() => win.print(), 400); }
  };

  return (
    <WsCtx.Provider value={{ register, report }}>
      <div className="space-y-4">
        {children}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          <ClipboardList className="w-4 h-4" />
          Download worksheet as PDF (for team grading)
        </button>
      </div>
    </WsCtx.Provider>
  );
}

// WorksheetBlock — section wrapper, provides title to questions
export function WorksheetBlock({ title, instruction, children }: { title: string; instruction: string; children: ReactNode }) {
  return (
    <WsSectionCtx.Provider value={title}>
      <div className="rounded-xl border border-border overflow-hidden bg-secondary/60">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-blue-500/10">
          <ClipboardList className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-600">{title}</span>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-4">{instruction}</p>
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </WsSectionCtx.Provider>
  );
}

// WorksheetQuestion — text input OR choice buttons, with context reporting
export function WorksheetQuestion({
  id,
  number,
  question,
  modelAnswer,
  accepted,
  choices,
  multiline = false,
}: {
  id: string;
  number: number;
  question: string;
  modelAnswer: string;
  accepted?: string[];
  choices?: string[];   // renders clickable option boxes instead of text input
  multiline?: boolean;
}) {
  const ctx = useContext(WsCtx);
  const section = useContext(WsSectionCtx);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  useEffect(() => {
    ctx?.register(id, question, modelAnswer, section);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isChoiceMode = !!choices;
  const answer = isChoiceMode ? (selected ?? "") : value;
  const isAutoCheck = (accepted && accepted.length > 0);
  const normalise = (s: string) => s.trim().toLowerCase().replace(/[""]/g, '"').replace(/['']/g, "'");
  const isCorrect = isAutoCheck ? accepted!.some(a => normalise(a) === normalise(answer)) : undefined;

  const handleCheck = () => {
    if (!answer.trim()) return;
    ctx?.report(id, answer, isAutoCheck ? isCorrect : undefined);
    setChecked(true);
  };

  const handleReset = () => {
    setValue(""); setSelected(null); setChecked(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-foreground/90 leading-relaxed">
        <span className="font-semibold text-muted-foreground mr-1.5">{number}.</span>
        {question}
      </p>

      {!checked ? (
        <div className="space-y-2">
          {isChoiceMode ? (
            <div className="flex flex-wrap gap-2">
              {choices!.map((opt, ci) => (
                <button
                  key={ci}
                  onClick={() => setSelected(opt)}
                  className={cn(
                    "flex-1 min-w-[120px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all text-left",
                    selected === opt
                      ? "border-blue-500 bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/40"
                      : "border-border bg-background/60 text-foreground/70 hover:border-blue-500/50 hover:bg-blue-500/8"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={value}
              onChange={e => setValue(e.target.value)}
              rows={2}
              placeholder="Type your answer here…"
              className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none"
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCheck()}
              placeholder="Type your answer…"
              className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          )}
          <button
            onClick={handleCheck}
            disabled={!answer.trim()}
            className="rounded-lg bg-blue-500/15 border border-blue-500/30 px-4 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Check answer
          </button>
        </div>
      ) : (
        <div className={cn(
          "rounded-lg border px-3 py-2.5 space-y-1.5",
          isAutoCheck
            ? isCorrect ? "border-emerald-500/30 bg-emerald-500/8" : "border-red-500/30 bg-red-500/8"
            : "border-blue-500/30 bg-blue-500/8"
        )}>
          {isAutoCheck && (
            <div className="flex items-center gap-1.5">
              {isCorrect
                ? <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-xs font-semibold text-emerald-400">Correct!</span></>
                : <><XCircle className="w-4 h-4 text-red-400" /><span className="text-xs font-semibold text-red-400">Not quite — see the answer below.</span></>
              }
            </div>
          )}
          {isChoiceMode && selected && (
            <p className="text-xs text-muted-foreground">Your answer: <span className="font-medium text-foreground/80">{selected}</span></p>
          )}
          {(!isAutoCheck || !isCorrect) && (
            <>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Model answer</p>
              <p className="text-sm text-foreground/90 leading-relaxed">{modelAnswer}</p>
            </>
          )}
          <button onClick={handleReset} className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
