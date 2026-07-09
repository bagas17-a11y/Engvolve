import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { HeroBackground } from "./HeroBackground";

const LOOP_DURATION = 5; // seconds before resetting

export const HeroSection = () => {
  const navigate = useNavigate();
  const screenRef = useRef<HTMLVideoElement>(null);
  const selfieRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vids = [screenRef.current, selfieRef.current].filter(Boolean) as HTMLVideoElement[];
    const handlers: (() => void)[] = [];
    vids.forEach(v => {
      const fn = () => { if (v.currentTime >= LOOP_DURATION) v.currentTime = 0; };
      v.addEventListener("timeupdate", fn);
      handlers.push(() => v.removeEventListener("timeupdate", fn));
    });
    return () => handlers.forEach(h => h());
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-36 pb-0">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs mb-8 animate-entrance"
          style={{
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(255,255,255,0.14)",
            color: "rgba(255,255,255,0.88)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FFE4A0" }} />
          AI-powered · Built by 8.5+ scorers · For Indonesian students
        </div>

        {/* Headline */}
        <h1
          className="leading-[1.10] mb-5 max-w-3xl animate-entrance"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 300,
            color: "#FFFFFF",
            animationDelay: "100ms",
          }}
        >
          Indonesia's First Ever<br />
          <span style={{ fontWeight: 600, color: "#FFE4A0" }}>All-in-one IELTS</span>
          <br />
          <span style={{ fontWeight: 300 }}>Prep Platform.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-sm md:text-base max-w-lg mb-10 leading-relaxed animate-entrance"
          style={{ color: "rgba(255,255,255,0.70)", animationDelay: "200ms", fontWeight: 300 }}
        >
          Engvolve gives you personalised feedback, real Band 6.5+ strategies, and a coach in
          your pocket — built by scorers who've been where you are.
        </p>


        {/* Mac desktop video demo */}
        <div
          className="relative w-full max-w-5xl mx-auto animate-entrance"
          style={{ animationDelay: "480ms" }}
        >
          {/* Ambient glow */}
          <div className="absolute -inset-4 -bottom-10 rounded-3xl pointer-events-none" style={{
            background: "radial-gradient(ellipse at center bottom, rgba(72,168,204,0.25) 0%, transparent 65%)",
            filter: "blur(28px)",
          }} />

          <div style={{ animation: "float 7s ease-in-out 1.4s infinite" }}>
            {/* Mac desktop shell */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #1e4f82 0%, #0e3860 45%, #071e3d 100%)",
                border: "1px solid rgba(72,168,204,0.22)",
                boxShadow: "0 32px 80px rgba(4,16,40,0.65), 0 0 0 1px rgba(72,168,204,0.08)",
                padding: "10px 12px 8px 12px",
              }}
            >
              {/* macOS menu bar */}
              <div
                className="relative z-10 flex items-center justify-between px-3 py-1 mb-2 rounded-md"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "0.60rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Engvolve</span>
                  {["File", "View", "Help"].map(m => (
                    <span key={m} style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.38)" }}>{m}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.38)" }}>Wed 1:35 PM</span>
                  <span style={{ fontSize: "0.60rem", color: "rgba(255,255,255,0.50)" }}>🔋 WiFi ◼</span>
                </div>
              </div>

              {/* Floating app window */}
              <div
                className="relative z-10 rounded-xl overflow-hidden"
                style={{
                  background: "#0D1628",
                  border: "1px solid rgba(72,168,204,0.18)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.50)",
                }}
              >
                {/* Window title bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2"
                  style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(72,168,204,0.10)" }}
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#FF5F57", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.22)" }} />
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#FFBD2E", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.16)" }} />
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#28C840", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.12)" }} />
                  <span style={{ flex: 1, textAlign: "center", fontSize: "0.60rem", color: "rgba(255,255,255,0.28)" }}>
                    Engvolve — AI IELTS Preparation
                  </span>
                </div>

                {/* Screen recording + PIP overlay */}
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  <video
                    ref={screenRef}
                    src="/videos/demo.mov"
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover block"
                  />

                  {/* Talking-head PIP — place selfie.mov in public/videos/ to activate */}
                  <div
                    className="absolute bottom-3 right-3 rounded-xl overflow-hidden"
                    style={{
                      width: "22%",
                      aspectRatio: "3/4",
                      border: "2px solid rgba(255,255,255,0.18)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                      background: "#1a2840",
                    }}
                  >
                    <video
                      ref={selfieRef}
                      src="/videos/selfie.mp4"
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover block"
                    />
                  </div>
                </div>
              </div>

              {/* macOS Dock */}
              <div className="relative z-10 flex justify-center mt-2">
                <div
                  className="flex items-end gap-1.5 px-3 py-1.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.09)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.11)",
                  }}
                >
                  {[
                    { bg: "linear-gradient(135deg,#48A8CC,#185688)", label: "E" },
                    { bg: "#4ade80", label: "" },
                    { bg: "#f97316", label: "" },
                    { bg: "#8b5cf6", label: "" },
                    { bg: "#ec4899", label: "" },
                    { bg: "rgba(255,255,255,0.15)", label: "" },
                  ].map((app, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: app.bg }}
                    >
                      {app.label && <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "#fff" }}>{app.label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
