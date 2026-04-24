import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/take-home", label: "Take-Home" },
  { to: "/hourly", label: "Hourly" },
  { to: "/compare", label: "Compare" },
  { to: "/self-employed", label: "Self-Emp" },
  { to: "/dividend", label: "Dividend" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="UK Net Pay" width={28} height={28} className="dark:invert" />
          <span className="font-semibold tracking-tight">UK Net Pay</span>
          <span className="ml-2 text-xs text-muted-foreground tabular hidden sm:inline">2026/27</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`transition-colors ${
                pathname === n.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}