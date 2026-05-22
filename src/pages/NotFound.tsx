import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Home, LayoutDashboard, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { buildWhatsAppLink, CONTACT_MESSAGES } from "@/lib/contact";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center glass-card p-10">
        <p className="text-7xl font-light text-accent mb-2">404</p>
        <h1 className="text-2xl font-light text-foreground mb-3">
          Halaman tidak ditemukan / Page not found
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          We can't find <code className="text-foreground/80">{location.pathname}</code>.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          The link may be outdated or mistyped. Let's get you back on track.
        </p>

        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate(-1)} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Button>
          {user ? (
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Go to dashboard
            </Button>
          ) : (
            <Button onClick={() => navigate("/")} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Back to home
            </Button>
          )}
          <a
            href={buildWhatsAppLink(CONTACT_MESSAGES.generalHelp)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors inline-flex items-center justify-center gap-1.5 mt-2"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Or chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
