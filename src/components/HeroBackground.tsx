export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>

      {/* ── Daytime ocean gradient — white sky → cyan → deep ocean ── */}
      <div className="absolute inset-0" style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #ECF7FF 9%, #C8E8F8 24%, #88CEEC 40%, #6AB8DC 46%, #48A8CC 50%, #2878A8 62%, #185688 76%, #0E3860 88%, #082040 100%)",
      }} />

      {/* ── Sun glow — upper right ── */}
      <div className="absolute" style={{
        top: "-10%", left: "58%",
        width: "420px", height: "420px",
        background: "radial-gradient(circle, rgba(255,248,210,0.60) 0%, rgba(255,230,140,0.24) 40%, transparent 68%)",
        filter: "blur(60px)",
      }} />

      {/* ── Soft clouds ── */}
      <div className="absolute" style={{
        top: "6%", left: "5%",
        width: "220px", height: "52px",
        background: "rgba(255,255,255,0.72)",
        borderRadius: "60px",
        filter: "blur(22px)",
      }} />
      <div className="absolute" style={{
        top: "13%", left: "38%",
        width: "300px", height: "44px",
        background: "rgba(255,255,255,0.58)",
        borderRadius: "50px",
        filter: "blur(24px)",
      }} />
      <div className="absolute" style={{
        top: "5%", right: "6%",
        width: "170px", height: "50px",
        background: "rgba(255,255,255,0.65)",
        borderRadius: "50px",
        filter: "blur(20px)",
      }} />
      <div className="absolute" style={{
        top: "20%", left: "15%",
        width: "140px", height: "36px",
        background: "rgba(255,255,255,0.45)",
        borderRadius: "40px",
        filter: "blur(18px)",
      }} />

      {/* ── Horizon glow (where sky meets ocean) ── */}
      <div className="absolute" style={{
        top: "45%", left: 0, right: 0,
        height: "90px",
        background: "linear-gradient(180deg, transparent 0%, rgba(255,248,220,0.28) 45%, transparent 100%)",
        filter: "blur(16px)",
      }} />

      {/* ── Sunlight reflection on water — vertical streak ── */}
      <div className="absolute" style={{
        top: "50%", right: "28%",
        width: "70px",
        bottom: 0,
        background: "linear-gradient(180deg, rgba(255,252,190,0.42) 0%, rgba(255,240,150,0.14) 45%, transparent 80%)",
        filter: "blur(14px)",
      }} />
      <div className="absolute" style={{
        top: "52%", right: "22%",
        width: "220px",
        bottom: 0,
        background: "linear-gradient(180deg, rgba(255,255,200,0.14) 0%, transparent 65%)",
        filter: "blur(24px)",
      }} />

      {/* ── Ocean surface — horizon wave shapes ── */}
      <svg
        className="absolute w-full"
        style={{ top: "45%", height: "12%" }}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 C200,16 400,44 600,28 C800,12 1000,40 1200,24 C1320,14 1390,34 1440,24 L1440,90 L0,90 Z"
          fill="rgba(72,168,204,0.92)"
        />
      </svg>
      <svg
        className="absolute w-full"
        style={{ top: "50%", height: "9%" }}
        viewBox="0 0 1440 65"
        preserveAspectRatio="none"
      >
        <path
          d="M0,24 C160,12 340,32 520,20 C700,8 880,30 1060,16 C1220,4 1360,24 1440,16 L1440,65 L0,65 Z"
          fill="rgba(40,120,168,0.90)"
        />
      </svg>

      {/* ── Subtle ocean surface lines ── */}
      <svg
        className="absolute w-full"
        style={{ top: "53%", height: "7%" }}
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
      >
        <path
          d="M0,10 C120,6 240,14 360,8 C480,2 600,12 720,7 C840,2 960,11 1080,6 C1200,1 1320,9 1440,5"
          fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4"
        />
        <path
          d="M0,22 C100,16 220,25 340,18 C460,11 580,22 700,15 C820,8 940,20 1060,14 C1180,8 1300,18 1440,12"
          fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="0.9"
        />
        <path
          d="M0,33 C140,27 280,36 420,29 C560,22 700,33 840,27 C980,21 1120,31 1260,26 C1340,23 1400,29 1440,26"
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"
        />
      </svg>

      {/* ── Rocket — bottom-left, flies to top-right ── */}
      <div style={{ position: "absolute", left: "4%", bottom: "6%", zIndex: 1 }}>
        <div className="animate-rocket-diagonal">
          <div style={{ transform: "rotate(38deg)", transformOrigin: "center center" }}>
            <svg
              viewBox="-24 -68 48 136"
              width="130"
              height="260"
              style={{
                display: "block",
                filter:
                  "drop-shadow(0 0 14px rgba(72,168,204,0.80)) " +
                  "drop-shadow(0 0 40px rgba(72,168,204,0.35))",
              }}
            >
              <defs>
                <radialGradient id="rBodyOcean" cx="35%" cy="30%" r="60%">
                  <stop offset="0%"   stopColor="hsl(200 60% 42%)" />
                  <stop offset="100%" stopColor="hsl(210 65% 22%)" />
                </radialGradient>
              </defs>
              <path
                d="M0,-64 C12,-48 16,-12 16,24 C16,34 10,38 0,38 C-10,38 -16,34 -16,24 C-16,-12 -12,-48 0,-64 Z"
                fill="url(#rBodyOcean)"
              />
              <path d="M-5,-62 C4,-46 8,-12 8,18 C8,30 4,36 0,38" stroke="hsl(200 80% 72%)" strokeWidth="1.6" fill="none" opacity="0.55" />
              <path d="M0,-64 C6,-52 8,-34 8,-20 C8,-15 4.5,-13 0,-13 C-4.5,-13 -8,-15 -8,-20 C-8,-34 -6,-52 0,-64 Z"
                    fill="hsl(198 90% 68%)" />
              <path d="M0,-64 C2.5,-56 3,-48 3,-40" stroke="hsl(0 0% 100%)" strokeWidth="1.1" fill="none" opacity="0.28" />
              <circle cx="0" cy="8"  r="10.5" fill="hsl(210 62% 9%)" />
              <circle cx="0" cy="8"  r="9"    fill="hsl(200 60% 16%)" />
              <circle cx="0" cy="8"  r="7.5"  fill="hsl(200 64% 20%)" />
              <circle cx="-3" cy="5" r="3"    fill="hsl(200 80% 92%)" opacity="0.18" />
              <path d="M-16,20 L-30,46 L-16,36 Z" fill="hsl(200 65% 38%)" />
              <path d="M16,20 L30,46 L16,36 Z"   fill="hsl(200 65% 38%)" />
              <rect x="-10" y="38" width="20" height="8" rx="3" fill="hsl(210 40% 18%)" />
            </svg>
            <div className="animate-flame" style={{ marginTop: "-8px", display: "flex", justifyContent: "center", transformOrigin: "center top" }}>
              <svg viewBox="-14 0 28 52" width="44" height="74" style={{ display: "block", filter: "drop-shadow(0 0 12px hsl(42 90% 55% / 0.95))" }}>
                <path d="M-12,0 Q-8,28 0,48 Q8,28 12,0 Z"   fill="hsl(42 90% 55%)"  opacity="0.96" />
                <path d="M-7.5,0 Q-5,20 0,36 Q5,20 7.5,0 Z" fill="hsl(28 100% 64%)" opacity="0.86" />
                <path d="M-4,0 Q-2.5,12 0,22 Q2.5,12 4,0 Z" fill="hsl(55 100% 88%)" opacity="0.92" />
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
