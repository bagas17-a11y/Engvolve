export const HeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
    {/* Sky-to-paper gradient */}
    <div className="absolute inset-0" style={{
      background: "linear-gradient(180deg, #0C547A 0%, #1279A0 13%, #1E96BE 29%, #48A8CC 46%, #7EC8E0 63%, #B8E4F4 78%, #E2F6FF 91%, #FFFFFF 100%)",
    }} />

    {/* Noise grain overlay */}
    <svg className="absolute inset-0" width="100%" height="100%"
         style={{ opacity: 0.07, mixBlendMode: "overlay" as const }} aria-hidden>
      <filter id="heroGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#heroGrain)" />
    </svg>

    {/* Upper-left ambient glow — balances the moon */}
    <div className="absolute" style={{
      top: "-10%", left: "-8%",
      width: 440, height: 440,
      background: "radial-gradient(circle, rgba(100,200,240,0.18) 0%, transparent 65%)",
      filter: "blur(55px)",
    }} />

    {/* Moon — upper right */}
    <div className="absolute" style={{ top: "7%", right: "9%", width: 140, height: 140 }}>
      {/* Diffuse halo behind the moon */}
      <div className="absolute" style={{
        inset: -45,
        background: "radial-gradient(circle, rgba(168,220,248,0.30) 0%, rgba(168,220,248,0.07) 52%, transparent 72%)",
        filter: "blur(20px)",
      }} />
      <svg viewBox="0 0 140 140"
           style={{
             width: "100%", height: "100%",
             filter: "drop-shadow(0 0 18px rgba(168,220,248,0.68)) drop-shadow(0 0 50px rgba(168,220,248,0.26))",
           }}
           aria-hidden>
        <defs>
          <radialGradient id="moonFill" cx="36%" cy="32%" r="58%">
            <stop offset="0%"   stopColor="#F6FBFF" />
            <stop offset="46%"  stopColor="#DDF0FA" />
            <stop offset="79%"  stopColor="#BDE1F5" />
            <stop offset="100%" stopColor="#96C8E8" />
          </radialGradient>
        </defs>
        {/* Moon body */}
        <circle cx="70" cy="70" r="62" fill="url(#moonFill)" />
        {/* Rim glow ring */}
        <circle cx="70" cy="70" r="61" fill="none" stroke="rgba(210,242,255,0.50)" strokeWidth="5" />
        {/* Craters */}
        <ellipse cx="46" cy="52" rx="10" ry="8"  fill="rgba(80,152,200,0.16)" />
        <ellipse cx="88" cy="46" rx="7"  ry="6"  fill="rgba(80,152,200,0.13)" />
        <ellipse cx="78" cy="88" rx="12" ry="9"  fill="rgba(80,152,200,0.12)" />
        <ellipse cx="40" cy="90" rx="7"  ry="5"  fill="rgba(80,152,200,0.11)" />
        <ellipse cx="97" cy="76" rx="5"  ry="4"  fill="rgba(80,152,200,0.13)" />
        {/* Sunlit rim catch */}
        <path d="M28,50 C22,64 24,82 36,94"
              stroke="rgba(255,255,255,0.30)" strokeWidth="7" fill="none" strokeLinecap="round" />
      </svg>
    </div>

    {/* Star dots near moon */}
    {([
      { x: "78%", y: "4%",  s: 2   },
      { x: "88%", y: "3%",  s: 2.5 },
      { x: "73%", y: "13%", s: 1.5 },
      { x: "92%", y: "17%", s: 1.5 },
      { x: "82%", y: "25%", s: 2   },
      { x: "69%", y: "21%", s: 1.5 },
    ] as { x: string; y: string; s: number }[]).map((star, i) => (
      <div key={i} className="absolute rounded-full" style={{
        left: star.x, top: star.y,
        width: star.s, height: star.s,
        background: "rgba(255,255,255,0.65)",
        boxShadow: `0 0 ${star.s * 2.5}px rgba(200,240,255,0.85)`,
      }} />
    ))}

    {/* Horizon atmosphere band */}
    <div className="absolute" style={{
      top: "50%", left: 0, right: 0,
      height: 80,
      background: "linear-gradient(180deg, transparent 0%, rgba(100,200,240,0.08) 50%, transparent 100%)",
      filter: "blur(26px)",
    }} />

    {/* Bottom fade to section background */}
    <div className="absolute bottom-0 left-0 right-0" style={{
      height: 120,
      background: "linear-gradient(180deg, transparent 0%, #F8FAFB 100%)",
    }} />
  </div>
);
