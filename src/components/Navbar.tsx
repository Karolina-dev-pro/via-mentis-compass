import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useLang, Lang } from "@/contexts/LanguageContext";
import logo from "@/assets/logo_fundacja.png";

const navItems = [
  { key: "nav_home", path: "/" },
  { key: "nav_about", path: "/o-fundacji" },
  { key: "nav_services", path: "/oferta" },
  { key: "nav_team", path: "/zespol" },
  { key: "nav_news", path: "/aktualnosci" },
  { key: "nav_gallery", path: "/galeria" },
  { key: "nav_contact", path: "/kontakt" },
  { key: "nav_documents", path: "/dokumenty" },
];

const langs: { code: Lang; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, tr } = useLang();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
      <div className="section-container flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Fundacja Via Mentis - logo" className="h-10 lg:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-secondary-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {tr(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1 border rounded-lg px-2 py-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  lang === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="btn-cta text-sm">
            {tr("cta")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-card pb-4">
          <nav className="section-container flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                  location.pathname === item.path ? "bg-secondary text-secondary-foreground" : "text-foreground/70"
                }`}
              >
                {tr(item.key)}
              </Link>
            ))}
            <div className="flex items-center gap-1 mt-2 px-3">
              {langs.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} className={`px-3 py-1 text-xs font-medium rounded ${lang === l.code ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="btn-cta text-sm mt-2 mx-3">
              {tr("cta")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
