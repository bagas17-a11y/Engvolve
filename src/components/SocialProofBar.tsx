import { ShieldCheck, Users, MessageSquare, Sparkles, Globe } from "lucide-react";

/**
 * Honest pilot-stage trust strip.
 * Replaces the previous fake "Trusted by British Council / IDP / Cambridge" claim.
 */
const trustItems = [
  { icon: Users, label: "Built by 8.5+ IELTS scorers" },
  { icon: Globe, label: "Indonesia-based founding team" },
  { icon: Sparkles, label: "AI feedback on every practice" },
  { icon: MessageSquare, label: "WhatsApp support in Bahasa" },
  { icon: ShieldCheck, label: "Manual review before approval" },
];

export const SocialProofBar = () => {
  return (
    <section className="py-10 border-y border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs text-muted-foreground mb-6 tracking-wide uppercase">
          Why IELTS candidates trust IELTSinAja
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/40 border border-border/40"
              >
                <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground/80 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[11px] text-muted-foreground/70 mt-6 max-w-xl mx-auto">
          IELTSinAja is an independent IELTS-prep product currently in pilot. We are not
          affiliated with British Council, IDP, or Cambridge.
        </p>
      </div>
    </section>
  );
};
