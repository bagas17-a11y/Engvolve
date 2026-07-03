const founderUniversities = [
  { name: "UC Berkeley", logo: "/assets/berkeley-logo.png" },
  { name: "UCLA", logo: "/assets/ucla-logo.png" },
];

const destinations = [
  {
    region: "United States",
    flag: "🇺🇸",
    cardStyle: {
      background: "linear-gradient(135deg, rgba(72,168,204,0.10) 0%, rgba(30,150,190,0.04) 100%)",
      border: "1px solid rgba(72,168,204,0.22)",
    },
    accentColor: "#48A8CC",
    tagStyle: { background: "rgba(72,168,204,0.09)", border: "1px solid rgba(72,168,204,0.20)" },
    universities: ["Harvard", "MIT", "Stanford", "Columbia", "UC Berkeley", "UCLA"],
  },
  {
    region: "United Kingdom",
    flag: "🇬🇧",
    cardStyle: {
      background: "linear-gradient(135deg, rgba(10,28,64,0.07) 0%, rgba(14,56,96,0.03) 100%)",
      border: "1px solid rgba(10,28,64,0.14)",
    },
    accentColor: "#0A1C40",
    tagStyle: { background: "rgba(10,28,64,0.05)", border: "1px solid rgba(10,28,64,0.14)" },
    universities: ["Oxford", "Cambridge", "Imperial College", "UCL", "LSE", "Edinburgh"],
  },
  {
    region: "Singapore",
    flag: "🇸🇬",
    cardStyle: {
      background: "linear-gradient(135deg, rgba(24,86,136,0.09) 0%, rgba(72,168,204,0.04) 100%)",
      border: "1px solid rgba(24,86,136,0.18)",
    },
    accentColor: "#185688",
    tagStyle: { background: "rgba(24,86,136,0.07)", border: "1px solid rgba(24,86,136,0.16)" },
    universities: ["NUS", "NTU", "SMU", "SUTD"],
  },
  {
    region: "Europe",
    flag: "🇪🇺",
    cardStyle: {
      background: "linear-gradient(135deg, rgba(245,188,60,0.09) 0%, rgba(245,128,58,0.03) 100%)",
      border: "1px solid rgba(245,188,60,0.24)",
    },
    accentColor: "#C8860A",
    tagStyle: { background: "rgba(245,188,60,0.08)", border: "1px solid rgba(245,188,60,0.20)" },
    universities: ["Sciences Po", "TU Delft", "Erasmus", "LMU Munich", "University of Amsterdam"],
  },
];

const specialPaths = [
  { label: "IUP Programmes", desc: "International Undergraduate Programs at top Indonesian universities", icon: "🏛️" },
  { label: "Master's Degrees", desc: "Postgraduate study at ranked global universities", icon: "🎓" },
  { label: "Scholarships", desc: "LPDP, Chevening, Fulbright, and other funded programmes", icon: "🏅" },
];

export const CredibilitySection = () => {
  return (
    <section className="py-20 bg-background border-t border-border/30">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Founder credibility */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.15em] mb-3">
            Founded by alumni of
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {founderUniversities.map((u) => (
              <div key={u.name} className="flex flex-col items-center gap-2">
                <img src={u.logo} alt={u.name} className="w-28 h-28 object-contain" />
                <span className="text-sm text-foreground/60">{u.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Built for students with{" "}
            <span className="text-gradient">global ambitions</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether you're targeting a top-ranked university abroad, an IUP programme, or a fully-funded scholarship — IELTS is your first step. We help you clear it with confidence.
          </p>
        </div>

        {/* Destination cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {destinations.map((d) => (
            <div
              key={d.region}
              className="rounded-xl p-5"
              style={d.cardStyle}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{d.flag}</span>
                <p className="text-sm font-semibold" style={{ color: d.accentColor }}>{d.region}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {d.universities.map((uni) => (
                  <span
                    key={uni}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ ...d.tagStyle, color: "rgba(10,28,64,0.62)" }}
                  >
                    {uni}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Special paths strip */}
        <div className="grid gap-3 sm:grid-cols-3">
          {specialPaths.map((p) => (
            <div
              key={p.label}
              className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4"
            >
              <span className="text-xl shrink-0">{p.icon}</span>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">{p.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
