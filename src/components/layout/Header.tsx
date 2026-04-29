import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const NAV = [
  { to: "/take-home", label: "Take-Home" },
  { to: "/hourly", label: "Hourly" },
  { to: "/dividend", label: "Dividend" },
  { to: "/self-employed", label: "Self-Emp" },
  { to: "/ir35", label: "IR35" },
  { to: "/compare", label: "Compare" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Methodology strip */}
      <div className="w-full border-b border-border bg-surface/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-9 flex items-center justify-between text-[10px] uppercase tracking-widest font-medium">
          <div className="flex items-center gap-3 sm:gap-5 text-muted-foreground">
            <span className="text-aurora font-semibold">Verified 2026/27</span>
            <span className="hidden sm:inline">Oxford Methodology v4.2</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
            <span>HMRC Real-time</span>
            <div className="size-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-aurora shadow-glow" />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-base tracking-tight">UK Net Pay</span>
              <span className="text-[10px] text-muted-foreground tabular hidden sm:inline">Tax Year 2026/27</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`transition-colors font-medium ${
                  pathname === n.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/take-home"
              className="hidden sm:inline-flex items-center h-9 px-4 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
            >
              Calculate
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="lg:hidden h-9 w-9 rounded-lg border border-border flex items-center justify-center"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-6 py-4 grid grid-cols-2 gap-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
