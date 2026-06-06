import { useState, useMemo } from "react";
import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Facebook, Navigation, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Imię i nazwisko jest wymagane").max(100),
  email: z.string().trim().email("Nieprawidłowy adres e-mail").max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().min(1, "Temat jest wymagany").max(200),
  message: z.string().trim().min(1, "Wiadomość jest wymagana").max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: "Zgoda jest wymagana" }) }),
});

const Kontakt = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [captchaSeed, setCaptchaSeed] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const captcha = useMemo(() => {
    void captchaSeed;
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    return { a, b, sum: a + b };
  }, [captchaSeed]);

  const refreshCaptcha = () => {
    setCaptchaAnswer("");
    setCaptchaSeed((s) => s + 1);
  };

  const address = "ul. Rajska 6, 80-850 Gdańsk";
  const mapsQuery = encodeURIComponent("Dom Technika NOT, ul. Rajska 6, 80-850 Gdańsk");
  const mapSrc = `https://maps.google.com/maps?q=${mapsQuery}&z=17&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // bot trap

    if (parseInt(captchaAnswer, 10) !== captcha.sum) {
      setErrors({ captcha: "Nieprawidłowa odpowiedź - spróbuj ponownie." });
      refreshCaptcha();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      consent: formData.get("consent") === "on" ? true as const : false as const,
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        subject: result.data.subject,
        message: result.data.message,
      });

      if (error) throw error;

      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.",
      });
      (e.target as HTMLFormElement).reset();
      refreshCaptcha();
    } catch {
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Kontakt"
        description="Skontaktuj się ze Stowarzyszeniem Walki z Rakiem Płuca. Adres: ul. Rajska 6, 80-850 Gdańsk."
        path="/kontakt"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground"
          >
            Kontakt
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4">Skontaktuj się z nami</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Dane kontaktowe</h2>
                <div className="bg-muted rounded-lg p-6 mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Nr konta bankowego:</p>
                  <p className="font-bold text-foreground font-mono">54 1020 1811 0000 0302 0073 4228</p>
                  <p className="text-sm text-muted-foreground mt-2">KRS: 0000126412 | NIP: 9570755875</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Spotkania w biurze</h3>
                    <p className="text-muted-foreground text-sm">ul. Rajska 6, 80-850 Gdańsk</p>
                    <p className="text-muted-foreground text-sm">Dom Technika NOT, II piętro, pokój 208</p>
                    <p className="text-muted-foreground text-sm mt-1">Godziny do uzgodnienia telefonicznego.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Telefon</h3>
                    <a href="tel:+48455405114" className="text-primary hover:underline">+48 455 405 114</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">E-mail</h3>
                    <a href="mailto:stowarzyszenie@rakpluca.org.pl" className="text-primary hover:underline">stowarzyszenie@rakpluca.org.pl</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Facebook className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Facebook</h3>
                    <a
                      href="https://www.facebook.com/993254464036926?ref=embed_page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Stowarzyszenie Walki z Rakiem Płuca
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Wyślij wiadomość</h2>
              <p className="text-muted-foreground mb-6">
                Jeżeli macie Państwo pytania, prosimy o kontakt. Nasz zespół jest gotowy, by Cię wspierać.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="name">Imię i nazwisko *</Label>
                  <Input id="name" name="name" required maxLength={100} className="mt-1" />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className="mt-1" />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Telefon (opcjonalnie)</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={20} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="subject">Temat *</Label>
                  <Input id="subject" name="subject" required maxLength={200} className="mt-1" />
                  {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Wiadomość *</Label>
                  <Textarea id="message" name="message" required maxLength={5000} rows={5} className="mt-1" />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="consent" name="consent" required />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. *
                  </Label>
                </div>
                {errors.consent && <p className="text-destructive text-sm">{errors.consent}</p>}

                <div>
                  <Label htmlFor="captcha">
                    Weryfikacja antyspamowa: ile to jest {captcha.a} + {captcha.b}? *
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="captcha"
                      name="captcha"
                      type="number"
                      inputMode="numeric"
                      required
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="max-w-[140px]"
                      autoComplete="off"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={refreshCaptcha}
                      aria-label="Zmień pytanie weryfikacyjne"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.captcha && <p className="text-destructive text-sm mt-1">{errors.captcha}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full font-bold" disabled={submitting}>
                  {submitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Google Map */}
          <div className="mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Jak do nas trafić</h2>
                <p className="text-muted-foreground mt-1">Dom Technika NOT, {address} (II piętro, pokój 208)</p>
              </div>
              <Button asChild variant="default" className="font-semibold w-full md:w-auto">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Wyznacz trasę do Stowarzyszenia Walki z Rakiem Płuca, ${address}`}
                >
                  <Navigation className="h-4 w-4" />
                  Wyznacz trasę
                </a>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden border border-border shadow-sm bg-muted">
              <div className="aspect-[16/10] md:aspect-[21/9] w-full">
                <iframe
                  src={mapSrc}
                  title="Mapa Google - lokalizacja Stowarzyszenia Walki z Rakiem Płuca, ul. Rajska 6, 80-850 Gdańsk"
                  aria-label="Mapa Google z pinezką oznaczającą siedzibę Stowarzyszenia Walki z Rakiem Płuca przy ul. Rajskiej 6 w Gdańsku"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontakt;
