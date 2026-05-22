import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const heroBullets = [
  "AI feedback on every Reading, Listening, Writing, and Speaking practice",
  "Built for Indonesian learners — explained in plain English & Bahasa",
  "1-on-1 coaching with an 8.5+ scorer on the Elite plan",
];

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-atmospheric overflow-hidden">
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-glow-accent/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-glow-warm/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-navy/50 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-entrance">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground/80">
              AI + alumni coaching for Indonesian IELTS candidates
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 animate-entrance delay-100">
            Latihan IELTS lengkap.
            <br />
            <span className="text-gradient">Feedback AI dalam detik.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto mb-8 animate-entrance delay-200">
            Practice Reading, Listening, Writing, and Speaking with instant AI band-score
            feedback — then accelerate with a real 8.5+ scorer on Elite.
          </p>

          {/* Trust bullets */}
          <ul className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-6 mb-10 animate-entrance delay-300 text-left sm:text-center max-w-3xl mx-auto">
            {heroBullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start sm:items-center gap-2 text-sm text-foreground/70"
              >
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-entrance delay-300">
            <Button
              variant="neumorphicPrimary"
              size="xl"
              className="group w-full sm:w-auto"
              onClick={() => navigate("/auth?mode=signup")}
            >
              Start free — no card needed
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="w-full sm:w-auto"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See pricing
            </Button>
          </div>

          <p className="text-xs text-muted-foreground animate-entrance delay-400">
            Free plan includes one practice for each module. Pro from IDR 500K / month.
          </p>
        </div>
      </div>
    </section>
  );
};
