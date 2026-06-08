const STARS = [
  { l: "4%",  t: "7%",  s: "1px",   o: 0.55, d: "0s",    dr: "3.2s" },
  { l: "11%", t: "23%", s: "1.5px", o: 0.40, d: "1.1s",  dr: "2.6s" },
  { l: "18%", t: "54%", s: "1px",   o: 0.70, d: "0.4s",  dr: "3.8s" },
  { l: "26%", t: "14%", s: "2px",   o: 0.30, d: "2.3s",  dr: "2.9s" },
  { l: "33%", t: "78%", s: "1px",   o: 0.60, d: "0.7s",  dr: "4.1s" },
  { l: "41%", t: "38%", s: "1.5px", o: 0.45, d: "1.8s",  dr: "3.0s" },
  { l: "48%", t: "91%", s: "1px",   o: 0.35, d: "3.1s",  dr: "2.4s" },
  { l: "55%", t: "19%", s: "2px",   o: 0.65, d: "0.2s",  dr: "3.5s" },
  { l: "62%", t: "67%", s: "1px",   o: 0.50, d: "1.5s",  dr: "4.3s" },
  { l: "70%", t: "44%", s: "1.5px", o: 0.40, d: "2.8s",  dr: "2.8s" },
  { l: "77%", t: "82%", s: "1px",   o: 0.60, d: "0.9s",  dr: "3.6s" },
  { l: "84%", t: "11%", s: "2px",   o: 0.35, d: "3.5s",  dr: "2.2s" },
  { l: "91%", t: "59%", s: "1px",   o: 0.70, d: "1.3s",  dr: "4.0s" },
  { l: "96%", t: "30%", s: "1.5px", o: 0.45, d: "0.6s",  dr: "3.3s" },
  { l: "8%",  t: "88%", s: "1px",   o: 0.55, d: "2.1s",  dr: "2.7s" },
  { l: "15%", t: "43%", s: "2px",   o: 0.30, d: "4.0s",  dr: "3.9s" },
  { l: "22%", t: "72%", s: "1px",   o: 0.65, d: "0.5s",  dr: "2.5s" },
  { l: "30%", t: "6%",  s: "1.5px", o: 0.50, d: "1.7s",  dr: "4.2s" },
  { l: "37%", t: "55%", s: "1px",   o: 0.40, d: "3.3s",  dr: "3.1s" },
  { l: "45%", t: "27%", s: "2px",   o: 0.60, d: "0.8s",  dr: "2.3s" },
  { l: "52%", t: "83%", s: "1px",   o: 0.35, d: "2.5s",  dr: "3.7s" },
  { l: "59%", t: "48%", s: "1.5px", o: 0.70, d: "1.2s",  dr: "4.4s" },
  { l: "67%", t: "15%", s: "1px",   o: 0.45, d: "3.8s",  dr: "2.6s" },
  { l: "74%", t: "71%", s: "2px",   o: 0.55, d: "0.3s",  dr: "3.0s" },
  { l: "81%", t: "36%", s: "1px",   o: 0.40, d: "2.0s",  dr: "3.4s" },
  { l: "88%", t: "92%", s: "1.5px", o: 0.65, d: "1.6s",  dr: "2.8s" },
  { l: "94%", t: "50%", s: "1px",   o: 0.30, d: "4.2s",  dr: "4.0s" },
  { l: "2%",  t: "33%", s: "2px",   o: 0.60, d: "0.1s",  dr: "2.4s" },
  { l: "13%", t: "65%", s: "1px",   o: 0.50, d: "2.7s",  dr: "3.8s" },
  { l: "20%", t: "9%",  s: "1.5px", o: 0.35, d: "1.4s",  dr: "3.2s" },
  { l: "28%", t: "47%", s: "1px",   o: 0.70, d: "3.6s",  dr: "2.9s" },
  { l: "35%", t: "86%", s: "2px",   o: 0.45, d: "0.6s",  dr: "4.1s" },
  { l: "43%", t: "21%", s: "1px",   o: 0.55, d: "1.9s",  dr: "2.7s" },
  { l: "50%", t: "61%", s: "1.5px", o: 0.40, d: "3.2s",  dr: "3.5s" },
  { l: "57%", t: "4%",  s: "1px",   o: 0.65, d: "0.7s",  dr: "4.2s" },
  { l: "64%", t: "39%", s: "2px",   o: 0.30, d: "2.4s",  dr: "2.3s" },
  { l: "72%", t: "76%", s: "1px",   o: 0.60, d: "1.0s",  dr: "3.6s" },
  { l: "79%", t: "22%", s: "1.5px", o: 0.50, d: "3.9s",  dr: "2.8s" },
  { l: "86%", t: "58%", s: "1px",   o: 0.35, d: "0.4s",  dr: "4.0s" },
  { l: "93%", t: "85%", s: "2px",   o: 0.70, d: "2.2s",  dr: "3.1s" },
  { l: "6%",  t: "75%", s: "1px",   o: 0.45, d: "1.3s",  dr: "2.6s" },
  { l: "17%", t: "18%", s: "1.5px", o: 0.55, d: "3.4s",  dr: "3.9s" },
  { l: "24%", t: "90%", s: "1px",   o: 0.40, d: "0.9s",  dr: "2.4s" },
  { l: "32%", t: "32%", s: "2px",   o: 0.65, d: "2.6s",  dr: "3.3s" },
  { l: "39%", t: "69%", s: "1px",   o: 0.30, d: "1.6s",  dr: "4.3s" },
  { l: "47%", t: "41%", s: "1.5px", o: 0.60, d: "3.7s",  dr: "2.9s" },
  { l: "54%", t: "13%", s: "1px",   o: 0.50, d: "0.2s",  dr: "3.7s" },
  { l: "61%", t: "57%", s: "2px",   o: 0.35, d: "2.9s",  dr: "2.5s" },
  { l: "69%", t: "28%", s: "1px",   o: 0.70, d: "1.1s",  dr: "4.1s" },
  { l: "76%", t: "94%", s: "1.5px", o: 0.45, d: "3.0s",  dr: "3.0s" },
];

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ── Drifting aurora orbs ────────────────────────────── */}
      <div className="aurora-orb absolute rounded-full" style={{
        top: "10%", left: "50%",
        width: "500px", height: "500px",
        background: "hsl(200 80% 60% / 0.045)",
        filter: "blur(100px)",
        animationDelay: "0s",
      }} />
      <div className="aurora-orb absolute rounded-full" style={{
        top: "55%", left: "5%",
        width: "380px", height: "380px",
        background: "hsl(220 70% 45% / 0.06)",
        filter: "blur(80px)",
        animationDelay: "9s",
      }} />
      <div className="aurora-orb absolute rounded-full" style={{
        top: "25%", right: "2%",
        width: "420px", height: "420px",
        background: "hsl(200 90% 55% / 0.035)",
        filter: "blur(90px)",
        animationDelay: "4.5s",
      }} />

      {/* ── Star field ─────────────────────────────────────── */}
      {STARS.map((star, i) => (
        <div
          key={i}
          className="star absolute rounded-full bg-white"
          style={{
            left: star.l, top: star.t,
            width: star.s, height: star.s,
            opacity: star.o,
            animationDelay: star.d,
            animationDuration: star.dr,
          }}
        />
      ))}

      {/* ── Moon ───────────────────────────────────────────── */}
      {/* Positioned top-right, partially off-edge for dramatic crop */}
      <div
        className="animate-moon-glow absolute"
        style={{ top: "-2%", right: "-1%", zIndex: 1 }}
      >
        {/* Outer diffuse halo */}
        <div style={{
          position: "absolute",
          inset: "-80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(200 80% 70% / 0.07) 40%, transparent 75%)",
          filter: "blur(40px)",
        }} />
        {/* Mid halo */}
        <div style={{
          position: "absolute",
          inset: "-30px",
          borderRadius: "50%",
          background: "hsl(200 75% 65% / 0.05)",
          filter: "blur(20px)",
        }} />

        <svg
          viewBox="0 0 260 260"
          width="260"
          height="260"
          style={{ display: "block" }}
        >
          <defs>
            {/* Main surface — off-center radial for 3-D depth */}
            <radialGradient id="moonSurface" cx="40%" cy="36%" r="62%">
              <stop offset="0%"   stopColor="hsl(214 32% 38%)" />
              <stop offset="35%"  stopColor="hsl(220 40% 26%)" />
              <stop offset="75%"  stopColor="hsl(224 46% 18%)" />
              <stop offset="100%" stopColor="hsl(228 54% 11%)" />
            </radialGradient>
            {/* Specular shimmer — upper-left light source */}
            <radialGradient id="moonShimmer" cx="34%" cy="30%" r="38%">
              <stop offset="0%"   stopColor="hsl(210 55% 78%)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="hsl(210 55% 78%)" stopOpacity="0" />
            </radialGradient>
            {/* Brand-accent rim light */}
            <radialGradient id="moonRim" cx="50%" cy="50%" r="50%">
              <stop offset="82%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(200 78% 66%)" stopOpacity="0.22" />
            </radialGradient>
            {/* Shadow limb — right-side darkening */}
            <radialGradient id="moonLimb" cx="72%" cy="50%" r="38%">
              <stop offset="0%"   stopColor="hsl(228 60% 6%)" stopOpacity="0.50" />
              <stop offset="100%" stopColor="hsl(228 60% 6%)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base disc */}
          <circle cx="130" cy="130" r="118" fill="hsl(228 54% 10%)" />
          {/* Surface gradient */}
          <circle cx="130" cy="130" r="118" fill="url(#moonSurface)" />
          {/* Limb darkening on shadow side */}
          <circle cx="130" cy="130" r="118" fill="url(#moonLimb)" />

          {/* Maria (large dark regions — give realism) */}
          <ellipse cx="108" cy="112" rx="30" ry="24" fill="hsl(226 48% 14%)" opacity="0.38" />
          <ellipse cx="158" cy="148" rx="24" ry="18" fill="hsl(226 48% 14%)" opacity="0.30" />
          <ellipse cx="88"  cy="160" rx="18" ry="14" fill="hsl(226 48% 14%)" opacity="0.25" />

          {/* Craters */}
          <circle cx="95"  cy="108" r="16" fill="hsl(228 52% 8%)"  opacity="0.55" />
          <circle cx="95"  cy="108" r="16" fill="none" stroke="hsl(216 36% 30%)" strokeWidth="0.9" opacity="0.40" />

          <circle cx="168" cy="148" r="11" fill="hsl(228 52% 8%)"  opacity="0.45" />
          <circle cx="168" cy="148" r="11" fill="none" stroke="hsl(216 36% 30%)" strokeWidth="0.7" opacity="0.30" />

          <circle cx="112" cy="178" r="20" fill="hsl(228 52% 8%)"  opacity="0.50" />
          <circle cx="112" cy="178" r="20" fill="none" stroke="hsl(216 36% 30%)" strokeWidth="0.9" opacity="0.35" />

          <circle cx="185" cy="88"  r="13" fill="hsl(228 52% 8%)"  opacity="0.40" />
          <circle cx="185" cy="88"  r="13" fill="none" stroke="hsl(216 36% 30%)" strokeWidth="0.7" opacity="0.28" />

          <circle cx="72"  cy="165" r="8"  fill="hsl(228 52% 8%)"  opacity="0.38" />
          <circle cx="152" cy="80"  r="6"  fill="hsl(228 52% 8%)"  opacity="0.32" />
          <circle cx="200" cy="140" r="9"  fill="hsl(228 52% 8%)"  opacity="0.35" />

          {/* Specular highlight */}
          <circle cx="130" cy="130" r="118" fill="url(#moonShimmer)" />
          {/* Brand accent rim */}
          <circle cx="130" cy="130" r="118" fill="url(#moonRim)" />
          {/* Hard border ring */}
          <circle cx="130" cy="130" r="118" fill="none" stroke="hsl(200 75% 65%)" strokeWidth="1.2" opacity="0.18" />
        </svg>
      </div>

      {/* ── Rocket — bottom-left → top-right ───────────────── */}
      <div
        className="animate-rocket-diagonal absolute"
        style={{ left: "3%", bottom: "-15%", zIndex: 3 }}
      >
        {/* Rocket assembly: static 38-deg tilt for direction of travel */}
        <div style={{ transform: "rotate(38deg)", transformOrigin: "center bottom" }}>

          {/* Body */}
          <svg
            viewBox="-20 -58 40 116"
            width="88"
            height="176"
            style={{
              display: "block",
              filter: "drop-shadow(0 0 14px hsl(200 80% 70% / 0.65)) drop-shadow(0 0 40px hsl(200 80% 70% / 0.28))",
            }}
          >
            <defs>
              <radialGradient id="rocketBody" cx="35%" cy="30%" r="60%">
                <stop offset="0%"   stopColor="hsl(218 50% 34%)" />
                <stop offset="100%" stopColor="hsl(224 56% 18%)" />
              </radialGradient>
            </defs>

            {/* Main body */}
            <path
              d="M0,-54 C10,-40 13,-10 13,20 C13,27 8,30 0,30 C-8,30 -13,27 -13,20 C-13,-10 -10,-40 0,-54 Z"
              fill="url(#rocketBody)"
            />
            {/* Body sheen — left stripe */}
            <path
              d="M-4,-52 C3,-38 6,-10 6,14 C6,23 3,28 0,30"
              stroke="hsl(200 80% 72%)"
              strokeWidth="1.3"
              fill="none"
              opacity="0.55"
            />
            {/* Body sheen — right faint */}
            <path
              d="M-10,-40 C-8,-22 -8,0 -8,12"
              stroke="hsl(200 80% 72%)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.20"
            />

            {/* Nose cone — brand accent */}
            <path
              d="M0,-54 C5,-44 6.5,-28 6.5,-17 C6.5,-13 3.5,-11 0,-11 C-3.5,-11 -6.5,-13 -6.5,-17 C-6.5,-28 -5,-44 0,-54 Z"
              fill="hsl(200 82% 70%)"
            />
            {/* Nose tip specular */}
            <path
              d="M0,-54 C2,-47 2.5,-40 2.5,-34"
              stroke="hsl(0 0% 100%)"
              strokeWidth="0.9"
              fill="none"
              opacity="0.28"
            />

            {/* Porthole */}
            <circle cx="0" cy="6"  r="8.5" fill="hsl(222 62% 7%)" />
            <circle cx="0" cy="6"  r="7.5" fill="hsl(204 60% 13%)" />
            <circle cx="0" cy="6"  r="6.5" fill="hsl(208 64% 17%)" />
            {/* Porthole shine */}
            <circle cx="-2.5" cy="3.5" r="2.5" fill="hsl(200 80% 92%)" opacity="0.20" />
            {/* Porthole accent ring */}
            <circle cx="0" cy="6" r="8.5" fill="none" stroke="hsl(200 70% 55%)" strokeWidth="0.8" opacity="0.35" />

            {/* Left fin */}
            <path d="M-13,16 L-25,38 L-13,30 Z" fill="hsl(202 65% 38%)" />
            <path d="M-13,16 L-25,38" stroke="hsl(200 80% 62%)" strokeWidth="0.7" opacity="0.40" />
            {/* Right fin */}
            <path d="M13,16 L25,38 L13,30 Z"  fill="hsl(202 65% 38%)" />
            <path d="M13,16 L25,38"  stroke="hsl(200 80% 62%)" strokeWidth="0.7" opacity="0.40" />

            {/* Nozzle */}
            <rect x="-8"  y="30" width="16" height="7"  rx="2.5" fill="hsl(222 40% 16%)" />
            <rect x="-8"  y="30" width="16" height="2"  rx="0"   fill="hsl(222 40% 28%)" />
            <rect x="-8"  y="35" width="16" height="2"  rx="0"   fill="hsl(222 40% 12%)" />
          </svg>

          {/* Flame — separate SVG with flicker animation */}
          <div
            className="animate-flame"
            style={{
              marginTop: "-6px",
              display: "flex",
              justifyContent: "center",
              transformOrigin: "center top",
            }}
          >
            <svg
              viewBox="-12 0 24 46"
              width="42"
              height="72"
              style={{
                display: "block",
                filter: "drop-shadow(0 0 10px hsl(42 90% 55% / 0.9))",
              }}
            >
              {/* Outer flame */}
              <path d="M-10,0 Q-7,24 0,42 Q7,24 10,0 Z" fill="hsl(42 90% 55%)"  opacity="0.96" />
              {/* Mid flame */}
              <path d="M-6.5,0 Q-4,17 0,30 Q4,17 6.5,0 Z" fill="hsl(28 100% 64%)" opacity="0.86" />
              {/* Inner core */}
              <path d="M-3.5,0 Q-2,10 0,18 Q2,10 3.5,0 Z" fill="hsl(55 100% 88%)" opacity="0.92" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};
