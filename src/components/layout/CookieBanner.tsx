import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const STORAGE_KEY = "cookie-consent-v2";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const openPreferences = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Consent = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      } catch {
        // ignore
      }
    }
    setVisible(true);
    setShowPreferences(true);
  }, []);

  useEffect(() => {
    const handler = () => openPreferences();
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  }, [openPreferences]);

  const save = (consent: Omit<Consent, "timestamp">) => {
    const data: Consent = { ...consent, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setVisible(false);
    setShowPreferences(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveChoice = () => save({ necessary: true, analytics, marketing });

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border shadow-2xl"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      <div className="container py-5 md:py-6">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h2 id="cookie-banner-title" className="font-bold text-foreground mb-1">
                Ta strona używa plików cookies
              </h2>
              <p className="text-sm text-muted-foreground">
                Używamy ciasteczek, aby zapewnić poprawne działanie strony i (za Twoją zgodą) analizować ruch oraz personalizować treści. Szczegóły w{" "}
                <Link to="/polityka-prywatnosci" className="text-primary underline">polityce prywatności</Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button onClick={acceptAll} size="sm" className="font-semibold">Akceptuj wszystkie</Button>
              <Button onClick={rejectAll} variant="outline" size="sm">Odrzuć opcjonalne</Button>
              <Button onClick={openPreferences} variant="ghost" size="sm">Ustawienia</Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              aria-label="Zamknij ustawienia cookies"
              className="absolute -top-1 right-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 id="cookie-banner-title" className="font-bold text-foreground mb-2">
              Zarządzaj preferencjami cookies
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Wybierz, jakie kategorie ciasteczek chcesz włączyć. Zgodę możesz w dowolnym momencie zmienić.
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-muted/50">
                <div className="flex-1">
                  <Label className="font-semibold text-foreground">Niezbędne</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Konieczne do działania strony. Nie można ich wyłączyć.
                  </p>
                </div>
                <Switch checked disabled aria-label="Niezbędne cookies (zawsze włączone)" />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-muted/50">
                <div className="flex-1">
                  <Label htmlFor="cookie-analytics" className="font-semibold text-foreground cursor-pointer">
                    Analityczne
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pomagają nam zrozumieć, jak korzystasz ze strony (np. liczba odwiedzin).
                  </p>
                </div>
                <Switch id="cookie-analytics" checked={analytics} onCheckedChange={setAnalytics} />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-muted/50">
                <div className="flex-1">
                  <Label htmlFor="cookie-marketing" className="font-semibold text-foreground cursor-pointer">
                    Marketingowe
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Służą do personalizacji treści i reklam w zewnętrznych serwisach.
                  </p>
                </div>
                <Switch id="cookie-marketing" checked={marketing} onCheckedChange={setMarketing} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={saveChoice} size="sm" className="font-semibold">Zapisz wybór</Button>
              <Button onClick={acceptAll} variant="outline" size="sm">Akceptuj wszystkie</Button>
              <Button onClick={rejectAll} variant="ghost" size="sm">Odrzuć opcjonalne</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;