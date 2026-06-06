import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Send, Phone, Mail, Calendar, RefreshCw, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

function newCaptcha() {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b, sum: a + b };
}

export default function ContactPage() {
  const { tr } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [captcha, setCaptcha] = useState(() => newCaptcha());
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const honeypotName = useMemo(() => "website_url", []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — bots fill hidden fields
    if (String(formData.get(honeypotName) || "").trim() !== "") {
      setSubmitted(true);
      return;
    }
    // Time trap — submissions under 2s are almost certainly bots
    if (Date.now() - startedAt < 2000) {
      setError(tr("captcha_error"));
      return;
    }
    // Math CAPTCHA
    if (Number(captchaAnswer) !== captcha.sum) {
      setError(tr("captcha_error"));
      setCaptcha(newCaptcha());
      setCaptchaAnswer("");
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: String(formData.get("name")).trim().slice(0, 100),
      email: String(formData.get("email")).trim().slice(0, 255),
      phone: formData.get("phone") ? String(formData.get("phone")).trim().slice(0, 20) : null,
      purpose: formData.get("purpose") ? String(formData.get("purpose")) : null,
      message: String(formData.get("message")).trim().slice(0, 1000),
      consent: true,
    });

    setLoading(false);
    if (dbError) {
      setError(tr("contact_error"));
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>{tr("meta_contact_title")}</title>
        <meta name="description" content={tr("meta_contact_desc")} />
        <link rel="canonical" href="https://viamentis.pl/kontakt" />
        <meta property="og:title" content={tr("meta_contact_title")} />
        <meta property="og:description" content={tr("meta_contact_desc")} />
        <meta property="og:url" content="https://viamentis.pl/kontakt" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-12">{tr("nav_contact")}</h1>

          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-elevated space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{tr("contact_phone")}</p>
                    <a href="tel:+48504911500" className="text-sm text-muted-foreground hover:text-foreground">+48 504 911 500</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{tr("contact_email")}</p>
                    <a href="mailto:kontakt@viamentis.pl" className="text-sm text-muted-foreground hover:text-foreground">kontakt@viamentis.pl</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{tr("contact_address")}</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Fundacja+Via+Mentis%2C+ul.+%C5%9Awi%C4%99tokrzyska+5%2C+Mi%C5%84sk+Mazowiecki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      ul. Świętokrzyska 5<br />05-300 Mińsk Mazowiecki
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{tr("contact_registration")}</p>
                    <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">TwojPsycholog →</a>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="card-elevated p-0 overflow-hidden">
                <iframe
                  title="Fundacja Via Mentis - ul. Świętokrzyska 5, Mińsk Mazowiecki"
                  src="https://www.google.com/maps?q=Fundacja+Via+Mentis%2C+ul.+%C5%9Awi%C4%99tokrzyska+5%2C+Mi%C5%84sk+Mazowiecki&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card-elevated text-center py-12">
                  <p className="text-xl font-bold mb-2">{tr("contact_thanks")}</p>
                  <p className="text-muted-foreground">{tr("contact_thanks_desc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-elevated space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{tr("contact_name")} *</label>
                      <input name="name" type="text" required maxLength={100} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{tr("contact_email")} *</label>
                      <input name="email" type="email" required maxLength={255} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{tr("contact_phone")}</label>
                      <input name="phone" type="tel" maxLength={20} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{tr("contact_purpose")} *</label>
                      <select name="purpose" required className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option value="">{tr("contact_select")}</option>
                        <option value="Konsultacja">{tr("contact_consultation")}</option>
                        <option value="Terapia">{tr("contact_therapy")}</option>
                        <option value="Warsztat">{tr("contact_workshop")}</option>
                        <option value="Współpraca">{tr("contact_cooperation")}</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{tr("contact_message")} *</label>
                    <textarea name="message" required maxLength={1000} rows={4} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  </div>

                  {/* Honeypot — hidden from humans */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                    <label>
                      Website
                      <input type="text" name={honeypotName} tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  {/* Math CAPTCHA */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {tr("captcha_label")} {captcha.a} + {captcha.b}? *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        required
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        className="w-32 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={() => { setCaptcha(newCaptcha()); setCaptchaAnswer(""); }}
                        className="p-2 rounded-lg border hover:bg-muted transition-colors"
                        aria-label="Refresh"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" required className="mt-0.5" />
                    <span>{tr("contact_consent")}</span>
                  </label>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-cta w-full sm:w-auto disabled:opacity-50">
                    <Send className="h-4 w-4" /> {loading ? tr("contact_sending") : tr("contact_send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
