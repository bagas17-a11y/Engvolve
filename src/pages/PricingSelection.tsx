import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Check,
  Sparkles,
  Crown,
  Upload,
  Copy,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Tag,
  MessageCircle,
  Info,
  Building2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PLANS, PROMO_CODE, resolvePrice, type PlanDefinition } from "@/lib/plans";
import { OPERATOR, buildWhatsAppLink, CONTACT_MESSAGES } from "@/lib/contact";
import { selfServiceActivateFree } from "@/lib/subscription";

interface DisplayPlan extends PlanDefinition {
  computedDisplayPrice: string;
  computedAmount: number;
  computedOriginalPrice: string | null;
}

const buildDisplayPlans = (promoApplied: boolean): DisplayPlan[] =>
  PLANS.map((plan) => {
    const { displayPrice, amount, originalDisplayPrice } = resolvePrice(plan, promoApplied);
    return {
      ...plan,
      computedDisplayPrice: displayPrice,
      computedAmount: amount,
      computedOriginalPrice: originalDisplayPrice,
    };
  });

const bankDetails = OPERATOR.bank;

export default function PricingSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, refreshProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<DisplayPlan | null>(null);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const plans = buildDisplayPlans(promoApplied);

  // If user arrived with ?plan=… preset, jump them straight into the right path:
  //   - Free  → auto-activate and route to /dashboard (once they're logged in)
  //   - Pro/Elite → straight into the bank-transfer flow
  useEffect(() => {
    const planKeyParam = searchParams.get("plan");
    if (!planKeyParam) return;
    const target = plans.find((p) => p.planKey === planKeyParam);
    if (!target) return;

    if (target.tier === "free") {
      if (!user) return; // wait until auth resolves
      void handleSelectPlan(target);
      return;
    }

    setSelectedPlan(target);
    setShowBankTransfer(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user]);

  const copyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopiedAccount(true);
    toast.success("Account number copied!");
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const copyAmount = (amount: number) => {
    navigator.clipboard.writeText(amount.toString());
    setCopiedAmount(true);
    toast.success("Amount copied!");
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      toast.success("Promo applied — 50% off Pro for your first month.");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleSelectPlan = async (plan: DisplayPlan) => {
    if (plan.tier === "free") {
      if (!user) {
        navigate("/auth?mode=signup&plan=free");
        return;
      }

      const result = await selfServiceActivateFree(user.id);
      if (!result.success) {
        toast.error(result.errorMessage ?? "Could not activate your Free plan.");
        return;
      }

      await refreshProfile();
      navigate("/dashboard");
      toast.success("Welcome! You can start practising now.");
      return;
    }

    setSelectedPlan(plan);
    setShowBankTransfer(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || !user || !selectedPlan) return;

    const file = event.target.files[0];

    // Validate file type
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Please upload an image or PDF file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-receipts")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from("payment_verifications")
        .insert({
          user_id: user.id,
          plan_type: selectedPlan.planKey,
          amount: selectedPlan.computedAmount,
          receipt_url: fileName,
          status: "pending",
        });

      if (insertError) throw insertError;

      setSubmitted(true);
      toast.success("Receipt uploaded! We'll verify your payment within 24 hours.");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload receipt");
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-atmospheric flex items-center justify-center p-6">
        <Card className="glass-card max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-2xl font-light mb-4 text-foreground">Receipt received!</h1>
          <p className="text-muted-foreground mb-2">
            We'll verify your transfer within 24 hours (usually much faster during Jakarta
            business hours).
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We'll email you the moment your account unlocks. You can also message us on
            WhatsApp to nudge things along.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate("/waiting-room")} className="w-full">
              Go to waiting room
            </Button>
            <a
              href={buildWhatsAppLink(CONTACT_MESSAGES.paymentTransferred)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Notify us on WhatsApp
              </Button>
            </a>
          </div>
        </Card>
      </div>
    );
  }

  if (showBankTransfer && selectedPlan) {
    return (
      <div className="min-h-screen bg-atmospheric p-6">
        <div className="max-w-lg mx-auto pt-12">
          <Button 
            variant="ghost" 
            onClick={() => setShowBankTransfer(false)} 
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Button>

          <Card className="glass-card p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-light">Complete your transfer</CardTitle>
              <p className="text-muted-foreground mt-2 text-sm">
                Operated by <strong className="text-foreground">{OPERATOR.name}</strong>.
                Transfer the exact amount below, then upload your receipt.
              </p>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
              {/* Plan Summary */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-foreground font-medium">{selectedPlan.name}</span>
                    {selectedPlan.period && (
                      <span className="text-muted-foreground text-xs ml-2">
                        ({selectedPlan.period})
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-accent font-medium">{selectedPlan.computedDisplayPrice}</span>
                    {selectedPlan.computedOriginalPrice && (
                      <span className="text-muted-foreground line-through ml-2 text-sm">
                        {selectedPlan.computedOriginalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Operator + Bank Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/5 border border-accent/20 rounded-lg p-3">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p>
                    We're a pilot product, so we accept direct BCA transfer to the founder's
                    account below. After we verify, your account unlocks within 24 hours.
                  </p>
                </div>

                <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Bank transfer details
                </h3>

                <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank</span>
                    <span className="text-foreground font-medium">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Account number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-mono">{bankDetails.accountNumber}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyAccount}
                        className="h-8 w-8 p-0"
                        aria-label="Copy account number"
                      >
                        {copiedAccount ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account name</span>
                    <span className="text-foreground">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/40">
                    <span className="text-muted-foreground">Exact amount to transfer</span>
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-medium text-lg">
                        IDR {selectedPlan.computedAmount.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyAmount(selectedPlan.computedAmount)}
                        className="h-8 w-8 p-0"
                        aria-label="Copy amount"
                      >
                        {copiedAmount ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Receipt */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Upload your receipt</h3>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                      <Loader2 className="w-10 h-10 text-accent animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload your bank transfer screenshot
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Image or PDF, max 5MB
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                <p className="text-[11px] text-muted-foreground text-center">
                  Make sure your receipt shows the date, amount, and recipient account.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
                <p className="text-xs text-muted-foreground text-center">
                  Need help with the transfer? We'll guide you through it.
                </p>
                <a
                  href={buildWhatsAppLink(CONTACT_MESSAGES.pricingHelp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with us on WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atmospheric p-6">
      <div className="max-w-5xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light mb-4 text-foreground">
            Choose Your <span className="text-gradient">Learning Path</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Select the plan that matches your ambition. All plans include AI-powered IELTS practice.
          </p>
          
          {/* Promo Code Section */}
          <div className="max-w-sm mx-auto">
            {!showPromoInput ? (
              <Button
                variant="ghost"
                onClick={() => setShowPromoInput(true)}
                className="text-accent hover:text-accent/80"
              >
                <Tag className="w-4 h-4 mr-2" />
                Have a promo code?
              </Button>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                  disabled={promoApplied}
                />
                <Button 
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode}
                >
                  {promoApplied ? "Applied!" : "Apply"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const highlighted = plan.badge === "Recommended";
            const isElite = plan.tier === "elite";
            return (
              <div
                key={plan.name}
                className={`relative ${highlighted ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {highlighted && (
                  <div className="absolute -inset-0.5 bg-gradient-to-b from-accent/50 to-accent/20 rounded-2xl blur-sm -z-10" />
                )}
                {isElite && (
                  <div className="absolute -inset-0.5 bg-gradient-to-b from-elite-gold/50 to-elite-gold/20 rounded-2xl blur-sm -z-10" />
                )}

                <Card
                  className={`glass-card h-full flex flex-col ${
                    highlighted
                      ? "border-accent/30"
                      : isElite
                      ? "border-elite-gold/30"
                      : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    {plan.badge && (
                      <Badge
                        className={`w-fit mb-4 ${
                          plan.badge === "Recommended"
                            ? "bg-accent/20 text-accent border-accent/30"
                            : "bg-elite-gold/20 text-elite-gold border-elite-gold/30"
                        }`}
                      >
                        {plan.badge === "Recommended" ? (
                          <Sparkles className="w-3 h-3 mr-1" />
                        ) : (
                          <Crown className="w-3 h-3 mr-1" />
                        )}
                        {plan.badge}
                      </Badge>
                    )}

                    <CardTitle className="text-xl font-light">{plan.name}</CardTitle>

                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-light text-foreground">
                        {plan.computedDisplayPrice}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground text-sm">{plan.period}</span>
                      )}
                    </div>
                    {plan.computedOriginalPrice && (
                      <p className="text-sm text-muted-foreground line-through mt-1">
                        {plan.computedOriginalPrice}
                      </p>
                    )}

                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      variant={highlighted ? "default" : "outline"}
                      className={`w-full ${
                        isElite
                          ? "border-elite-gold/30 text-elite-gold hover:bg-elite-gold/10"
                          : plan.tier === "free"
                          ? "border-muted-foreground/30"
                          : ""
                      }`}
                    >
                      {plan.tier === "free" ? "Start free" : plan.tier === "elite" ? "Buy Elite" : "Choose Pro"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Help line */}
        <div className="mt-10 text-center text-xs text-muted-foreground">
          Questions about pricing or payment?{" "}
          <a
            href={buildWhatsAppLink(CONTACT_MESSAGES.pricingHelp)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Chat with us on WhatsApp
          </a>
          .
        </div>
      </div>
    </div>
  );
}
