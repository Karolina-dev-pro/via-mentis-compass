import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const serviceKeys = [
  { title: "svc1_title", desc: "svc1_desc" },
  { title: "svc2_title", desc: "svc2_desc" },
  { title: "svc3_title", desc: "svc3_desc" },
  { title: "svc4_title", desc: "svc4_desc" },
  { title: "svc5_title", desc: "svc5_desc" },
  { title: "svc6_title", desc: "svc6_desc" },
];

export default function ServicesPage() {
  const { tr } = useLang();

  return (
    <>
      <Helmet>
        <title>{tr("meta_services_title")}</title>
        <meta name="description" content={tr("meta_services_desc")} />
        <link rel="canonical" href="https://viamentis.pl/oferta" />
        <meta property="og:title" content={tr("meta_services_title")} />
        <meta property="og:description" content={tr("meta_services_desc")} />
        <meta property="og:url" content="https://viamentis.pl/oferta" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-4">{tr("services_title")}</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">{tr("services_desc")}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {serviceKeys.map((s) => (
              <div key={s.title} className="card-elevated flex gap-4">
                <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-sans font-semibold mb-1">{tr(s.title)}</h2>
                  <p className="text-sm text-muted-foreground">{tr(s.desc)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="btn-cta">
              {tr("cta")}
            </a>
          </div>
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
