import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Strona Główna", path: "/" },
  { label: "O Nas", path: "/o-nas" },
  { label: "1,5%", path: "/1-procent" },
  { label: "Rak płuca", path: "/rak-pluca" },
  { label: "Profilaktyka", path: "/profilaktyka" },
  { label: "Aktualności", path: "/aktualnosci" },
  { label: "Galeria", path: "/galeria" },
  { label: "Kontakt", path: "/kontakt" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Strona główna">
          <img
            src="/images/logo-Walka-z-Rakiem-Pluca.jpg"
            alt="Stowarzyszenie Walki z Rakiem Płuca"
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Nawigacja główna">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.facebook.com/993254464036926?ref=embed_page"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-primary hover:text-secondary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in-up" aria-label="Nawigacja mobilna">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-base font-semibold transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.facebook.com/993254464036926?ref=embed_page"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 flex items-center gap-2 text-primary font-semibold"
            >
              <Facebook className="h-5 w-5" /> Facebook
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
