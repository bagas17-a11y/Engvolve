import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Headphones, PenTool, Mic, LayoutDashboard } from "lucide-react";

/**
 * Sticky bottom navigation for mobile dashboard.
 * Lets students switch between the four practice modules with one tap.
 * Hidden on md+ screens where the sidebar handles navigation.
 */
const items = [
  { label: "Home", path: "/dashboard", icon: LayoutDashboard },
  { label: "Reading", path: "/dashboard/reading", icon: BookOpen },
  { label: "Listening", path: "/dashboard/listening", icon: Headphones },
  { label: "Writing", path: "/dashboard/writing", icon: PenTool },
  { label: "Speaking", path: "/dashboard/speaking", icon: Mic },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Module navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 w-full py-2 text-[10px] transition-colors ${
                  active
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
