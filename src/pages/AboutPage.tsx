import { Shield, Eye, Info, HeartHandshake } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { tr } = useLang();

  const helpItems = [
    { title: tr("about_help1_title"), desc: tr("about_help1_desc") },
    { title: tr("about_help2_title"), desc: tr("about_help2_desc") },
    { title: tr("about_help3_title"), desc: tr("about_help3_desc") },
    { title: tr("about_help4_title"), desc: tr("about_help4_desc") },
  ];

  const rules = [
    { icon: Shield, title: tr("about_rule1_title"), desc: tr("about_rule1_desc") },
    { icon: Eye, title: tr("about_rule2_title"), desc: tr("about_rule2_desc") },
    { icon: Info, title: tr("about_rule3_title"), desc: tr("about_rule3_desc") },
    { icon: HeartHandshake, title: tr("about_rule4_title"), desc: tr("about_rule4_desc") },
  ];

  return (
    <>
      <Helmet>
        <title>{tr("meta_about_title")}</title>
        <meta name="description" content={tr("meta_about_desc")} />
        <link rel="canonical" href="https://viamentis.pl/o-fundacji" />
        <meta property="og:title" content={tr("meta_about_title")} />
        <meta property="og:description" content={tr("meta_about_desc")} />
        <meta property="og:url" content="https://viamentis.pl/o-fundacji" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">{tr("about_title")}</h1>
          <p className="text-lg text-muted-foreground mb-8">{tr("about_mission")}</p>

          <h2 className="text-2xl font-bold mb-6">{tr("about_how")}</h2>
          <div className="grid gap-6 mb-12">
            {helpItems.map((item, i) => (
              <div key={i} className="card-elevated flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-accent font-bold text-sm">{i + 1}</span>
                <div>
                  <h3 className="font-sans font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">{tr("about_rules")}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {rules.map((item) => (
              <div key={item.title} className="card-elevated flex gap-3">
                <item.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3">{tr("about_legal")}</h2>
            <ul className="space-y-1 text-sm text-secondary-foreground">
              <li><strong>KRS:</strong> 0001189614</li>
              <li><strong>NIP:</strong> 8222418299</li>
              <li><strong>REGON:</strong> 542491018</li>
              <li><strong>{tr("about_krs_date")}:</strong> 20.08.2025</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
