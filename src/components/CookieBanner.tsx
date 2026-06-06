import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const STORAGE_KEY = "cookie_consent_v1";

type Consent = { necessary: true; analytics: boolean; ts: string };

export default function CookieBanner() {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (c: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      // ignore
    }
    setOpen(false);
    setManage(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, ts: new Date().toISOString() });
  const rejectAll = () => save({ necessary: true, analytics: false, ts: new Date().toISOString() });
  const saveChoice = () => save({ necessary: true, analytics, ts: new Date().toISOString() });

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={tr("cookie_title")}
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card text-card-foreground shadow-2xl p-5 sm:p-6">
        {!manage ? (
          <>
            <h2 className="text-lg font-semibold mb-2">{tr("cookie_title")}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {tr("cookie_desc")}{" "}
              <Link to="/polityka-prywatnosci" className="underline hover:text-foreground">
                {tr("nav_privacy")}
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                onClick={() => setManage(true)}
                className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
              >
                {tr("cookie_manage")}
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
              >
                {tr("cookie_reject")}
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {tr("cookie_accept")}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-3">{tr("cookie_manage")}</h2>
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 p-3 rounded-lg border bg-muted/40">
                <input type="checkbox" checked disabled className="mt-1" />
                <div>
                  <p className="text-sm font-medium">{tr("cookie_necessary")}</p>
                  <p className="text-xs text-muted-foreground">{tr("cookie_necessary_desc")}</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium">{tr("cookie_analytics")}</p>
                  <p className="text-xs text-muted-foreground">{tr("cookie_analytics_desc")}</p>
                </div>
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                onClick={() => setManage(false)}
                className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
              >
                {tr("cookie_back")}
              </button>
              <button
                onClick={saveChoice}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {tr("cookie_save")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
