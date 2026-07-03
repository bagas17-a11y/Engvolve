import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// ── Step 1 mockup — goal setup ────────────────────────────────────────────────
const GoalSetupMockup = () => (
  <div className="mt-6 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(8px)", border: "1px solid rgba(24,86,136,0.10)", boxShadow: "0 4px 24px rgba(24,86,136,0.08)" }}>
    <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(24,86,136,0.08)" }}>
      <p className="text-[11px] font-semibold" style={{ color: "#185688" }}>Welcome to Mumpuni ✦</p>
    </div>
    <div className="p-4">
      <p className="text-[11px] font-medium mb-3" style={{ color: "#1A2840" }}>What's your IELTS target band?</p>
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {["5.0", "6.0", "6.5", "7.0"].map((band, i) => (
          <div key={band} className="py-2 rounded-lg text-center text-[11px] font-semibold transition-all"
               style={{
                 background: i === 2 ? "linear-gradient(135deg, #48A8CC, #185688)" : "rgba(24,86,136,0.06)",
                 color: i === 2 ? "#fff" : "#3A5878",
                 border: i === 2 ? "none" : "1px solid rgba(24,86,136,0.12)",
               }}>
            {band}
          </div>
        ))}
      </div>
      <p className="text-[11px] font-medium mb-2" style={{ color: "#1A2840" }}>When is your exam?</p>
      <div className="flex gap-1.5 mb-4">
        {["1 month", "3 months", "6 months+"].map((opt, i) => (
          <div key={opt} className="flex-1 py-1.5 rounded-lg text-center text-[10px]"
               style={{
                 background: i === 1 ? "rgba(72,168,204,0.15)" : "rgba(24,86,136,0.05)",
                 color: i === 1 ? "#185688" : "#7A95B0",
                 border: i === 1 ? "1px solid rgba(72,168,204,0.35)" : "1px solid rgba(24,86,136,0.10)",
               }}>
            {opt}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-2 rounded-xl text-[11px] font-semibold text-white"
           style={{ background: "linear-gradient(135deg, #48A8CC, #185688)" }}>
        Continue <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </div>
  </div>
);

// ── Step 2 mockup — diagnostic quiz ──────────────────────────────────────────
const DiagnosticMockup = () => (
  <div className="mt-6 rounded-xl overflow-hidden"
       style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", border: "1px solid rgba(24,86,136,0.10)", boxShadow: "0 4px 24px rgba(24,86,136,0.08)" }}>
    {/* Progress header */}
    <div className="px-4 pt-3 pb-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px]" style={{ color: "#7A95B0" }}>Question 1 of 24</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(24,86,136,0.08)", color: "#185688" }}>Background</span>
      </div>
      <div className="w-full rounded-full" style={{ height: 3, background: "rgba(24,86,136,0.10)" }}>
        <div className="h-full rounded-full" style={{ width: "4%", background: "linear-gradient(90deg, #48A8CC, #185688)" }} />
      </div>
    </div>
    {/* Question */}
    <div className="px-4 pb-4">
      <p className="text-[12px] font-semibold mb-3" style={{ color: "#1A2840", lineHeight: 1.4 }}>
        How would you describe your current English proficiency?
      </p>
      {[
        { label: "Beginner — I can understand basic phrases", selected: false },
        { label: "Intermediate — I can handle everyday conversations", selected: false },
        { label: "Upper-Intermediate — I'm comfortable in most situations", selected: false },
        { label: "Advanced — I can express complex ideas fluently", selected: true },
      ].map(({ label, selected }) => (
        <div key={label}
             className="flex items-center gap-2.5 px-3 py-2 rounded-xl mb-1.5"
             style={{
               border: selected ? "1.5px solid #48A8CC" : "1px solid rgba(24,86,136,0.12)",
               background: selected ? "rgba(72,168,204,0.07)" : "rgba(255,255,255,0.60)",
             }}>
          <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
               style={{ border: selected ? "2px solid #48A8CC" : "2px solid #CBD5E1" }}>
            {selected && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#48A8CC" }} />}
          </div>
          <span className="text-[10.5px]" style={{ color: "#1A2840" }}>{label}</span>
        </div>
      ))}
      <div className="mt-3 flex items-center justify-center py-2 rounded-xl text-[11px] font-semibold text-white"
           style={{ background: "linear-gradient(135deg, #48A8CC, #185688)" }}>
        Next Question <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </div>
  </div>
);

// ── Step 3 mockup — study roadmap ─────────────────────────────────────────────
const StudyPlanMockup = () => (
  <div className="mt-6 rounded-xl overflow-hidden"
       style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
    {/* Band prediction badges */}
    <div className="px-4 pt-3 pb-2 flex gap-2 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "rgba(72,168,204,0.18)", color: "#88D4F0", border: "1px solid rgba(72,168,204,0.28)" }}>
        Foundation Track
      </span>
      <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>
        Predicted 4.5 → Target 6.0–6.5
      </span>
    </div>
    {/* Stats row */}
    <div className="grid grid-cols-4 gap-0 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      {[["4", "Weeks"], ["0", "Done"], ["2/20", "Tasks"], ["13h", "Total"]].map(([val, label]) => (
        <div key={label} className="text-center">
          <p className="text-base font-bold" style={{ color: "#F0F8FF" }}>{val}</p>
          <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</p>
        </div>
      ))}
    </div>
    {/* Progress bar */}
    <div className="px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex justify-between mb-1">
        <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.38)" }}>Overall progress</span>
        <span className="text-[9px]" style={{ color: "#88D4F0" }}>10%</span>
      </div>
      <div className="w-full rounded-full" style={{ height: 3, background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full" style={{ width: "10%", background: "linear-gradient(90deg, #48A8CC, #6ECEF5)" }} />
      </div>
    </div>
    {/* Week cards */}
    <div className="p-3 space-y-2">
      {[
        { num: 1, title: "Grammar — Tenses & Agreement", tag: "Grammar", tasks: "2/4 tasks", time: "2.6h", active: true },
        { num: 2, title: "IELTS Writing Strategy",      tag: "Writing",  tasks: "0/5 tasks", time: "3.2h", active: false },
        { num: 3, title: "Full Practice Tests",          tag: "Mixed",    tasks: "0/6 tasks", time: "4.0h", active: false },
      ].map(({ num, title, tag, tasks, time, active }) => (
        <div key={num}
             className="px-3 py-2.5 rounded-xl"
             style={{
               background: active ? "rgba(72,168,204,0.12)" : "rgba(255,255,255,0.05)",
               border: active ? "1px solid rgba(72,168,204,0.28)" : "1px solid rgba(255,255,255,0.06)",
             }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                    style={{ background: active ? "rgba(72,168,204,0.25)" : "rgba(255,255,255,0.08)", color: active ? "#88D4F0" : "rgba(255,255,255,0.40)" }}>
                {num}
              </span>
              <span className="text-[10.5px] font-medium truncate" style={{ color: active ? "#EAF6FF" : "rgba(255,255,255,0.45)" }}>
                {title}
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full ml-2 shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}>
              {tag}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 ml-7">
            <div className="flex-1 rounded-full" style={{ height: 2, background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded-full"
                   style={{ width: active ? "50%" : "0%", background: "linear-gradient(90deg, #48A8CC, #6ECEF5)" }} />
            </div>
            <span className="text-[9px] shrink-0" style={{ color: "rgba(255,255,255,0.30)" }}>{tasks} · {time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Main section ──────────────────────────────────────────────────────────────
export const HowItWorksSection = () => {
  const navigate = useNavigate();

  const steps = [
    {
      num: "01",
      title: "Set your goal",
      desc: "Tell us your target band and exam date. Free sign-up, no card required.",
      bg: "#EBF7FF",
      numColor: "#48A8CC",
      titleColor: "#0A1C40",
      descColor: "#3A5878",
      mockup: <GoalSetupMockup />,
    },
    {
      num: "02",
      title: "Take the diagnostic",
      desc: "24 questions across all 4 modules map your exact level and pinpoint every band gap.",
      bg: "#DDF0F8",
      numColor: "#185688",
      titleColor: "#0A1C40",
      descColor: "#3A5878",
      mockup: <DiagnosticMockup />,
    },
    {
      num: "03",
      title: "Follow your roadmap",
      desc: "A week-by-week curriculum built around your gap. Every task has a reason — no guesswork.",
      bg: "#0E3860",
      numColor: "#6ECEF5",
      titleColor: "#F0F8FF",
      descColor: "rgba(180,210,240,0.65)",
      mockup: <StudyPlanMockup />,
    },
  ];

  return (
    <section className="py-24 px-6" style={{ background: "#ffffff" }} id="features">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#48A8CC" }}>
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl leading-tight" style={{ fontWeight: 400, color: "#0A1C40" }}>
            Three steps from zero<br />
            <span style={{ fontWeight: 600, color: "#185688" }}>to your target band.</span>
          </h2>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: step.bg, minHeight: 480 }}
            >
              <span className="text-xs font-bold tracking-widest mb-4" style={{ color: step.numColor }}>
                {step.num}
              </span>
              <h3 className="text-xl mb-2" style={{ fontWeight: 600, color: step.titleColor, lineHeight: 1.2 }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: step.descColor, fontWeight: 300 }}>
                {step.desc}
              </p>
              <div className="flex-1">
                {step.mockup}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/auth?mode=signup")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #48A8CC 0%, #0E3860 100%)",
              boxShadow: "0 4px 20px rgba(14,56,96,0.25)",
            }}
          >
            Start free — takes 2 minutes
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-3 text-xs" style={{ color: "#7A95B0" }}>
            No credit card · Free diagnostic included
          </p>
        </div>

      </div>
    </section>
  );
};
