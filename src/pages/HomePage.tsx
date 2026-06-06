import { Link } from "react-router-dom";
import { Heart, BookOpen, Users, Handshake, ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import heroBanner from "@/assets/hero-banner.webp";

const featureKeys = [
  { icon: Heart, title: "feat_emotional", desc: "feat_emotional_desc" },
  { icon: BookOpen, title: "feat_therapy", desc: "feat_therapy_desc" },
  { icon: Users, title: "feat_tus", desc: "feat_tus_desc" },
  { icon: Handshake, title: "feat_schools", desc: "feat_schools_desc" },
];

export default function HomePage() {
  const { tr } = useLang();

  return (
    <>
      <Helmet>
        <title>{tr("meta_home_title")}</title>
        <meta name="description" content={tr("meta_home_desc")} />
        <link rel="canonical" href="https://viamentis.pl/" />
        <meta property="og:title" content={tr("meta_home_title")} />
        <meta property="og:description" content={tr("meta_home_desc")} />
        <meta property="og:url" content="https://viamentis.pl/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "Fundacja Via Mentis",
          "url": "https://viamentis.pl",
          "description": "Wsparcie emocjonalne, terapia i warsztaty dla dzieci i młodzieży.",
          "address": { "@type": "PostalAddress", "addressLocality": "Piotrków Trybunalski", "addressCountry": "PL" },
          "telephone": "+48504911500",
          "email": "fundacja@viamentis.pl"
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden">
        <img
          src={heroBanner}
          alt="Fundacja Via Mentis - wsparcie dla dzieci i młodzieży"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[image:var(--hero-gradient)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(152_45%_20%/0.5),hsl(152_45%_15%/0.7))]" />
        <div className="section-container relative py-20 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-widest opacity-70 mb-4">{tr("hero_tagline")}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-3xl mb-6 animate-fade-in-up">
            {tr("hero_h1")}
          </h1>
          <p className="text-lg lg:text-xl opacity-85 max-w-2xl mb-8" style={{ animationDelay: "0.15s" }}>
            {tr("hero_lead")}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold transition-all hover:opacity-90">
              <Calendar className="h-5 w-5" /> {tr("cta")}
            </a>
            <a href="tel:+48504911500" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-medium transition-all hover:bg-primary-foreground/10">
              <Phone className="h-5 w-5" /> +48 504 911 500
            </a>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">{tr("section_what")}</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">{tr("home_what_desc")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureKeys.map((f) => (
              <div key={f.title} className="card-elevated text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-sans font-semibold text-lg mb-2">{tr(f.title)}</h3>
                <p className="text-sm text-muted-foreground">{tr(f.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="section-container flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">{tr("home_about_title")}</h2>
            <p className="text-muted-foreground mb-4">{tr("home_about_desc")}</p>
            <Link to="/o-fundacji" className="btn-cta-outline inline-flex items-center gap-2 text-sm">
              {tr("read_more")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 text-center">
            {[
              { num: "6", label: tr("home_stat_specialists") },
              { num: "100+", label: tr("home_stat_children") },
              { num: "5+", label: tr("home_stat_programs") },
              { num: "2025", label: tr("home_stat_founded") },
            ].map((s) => (
              <div key={s.label} className="card-elevated">
                <p className="text-3xl font-bold text-accent">{s.num}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 lg:py-20 bg-[image:var(--hero-gradient)] text-primary-foreground">
        <div className="section-container text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">{tr("home_cta_title")}</h2>
          <p className="opacity-80 max-w-xl mx-auto mb-8">{tr("home_cta_desc")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold">
              <Calendar className="h-5 w-5" /> {tr("cta")}
            </a>
            <a href="tel:+48504911500" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-medium hover:bg-primary-foreground/10">
              <Phone className="h-5 w-5" /> +48 504 911 500
            </a>
            <a href="mailto:fundacja@viamentis.pl" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-medium hover:bg-primary-foreground/10">
              <Mail className="h-5 w-5" /> fundacja@viamentis.pl
            </a>
          </div>
        </div>
      </section>

      {/* Spacer for mobile sticky CTA */}
      <div className="h-14 lg:hidden" />
    </>
  );
}
