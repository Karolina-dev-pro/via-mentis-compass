import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/contexts/LanguageContext";
import { localized } from "@/lib/i18n-helpers";

// Local fallback photos keyed by name
import artur from "@/assets/team/Artur-Prazak.webp";
import anna from "@/assets/team/Anna-Blazejewska-Wozniak.webp";
import emilia from "@/assets/team/Emilia-Pajak.webp";
import ewelina from "@/assets/team/Ewelina-Pukacka.webp";
import luiza from "@/assets/team/Luiza-Blaszczak.webp";

const localPhotos: Record<string, string> = {
  "Artur Prażak": artur,
  "Anna Błażejewska-Woźniak": anna,
  "Emilia Pająk": emilia,
  "Ewelina Pukacka": ewelina,
  "Luiza Błaszczak": luiza,
};

export default function TeamPage() {
  const { lang, tr } = useLang();
  const { data: team, isLoading } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>{tr("meta_team_title")}</title>
        <meta name="description" content={tr("meta_team_desc")} />
        <link rel="canonical" href="https://viamentis.pl/zespol" />
        <meta property="og:title" content={tr("meta_team_title")} />
        <meta property="og:description" content={tr("meta_team_desc")} />
        <meta property="og:url" content="https://viamentis.pl/zespol" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-4">{tr("team_title")}</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">{tr("team_desc")}</p>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-elevated text-center animate-pulse">
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4" />
                  <div className="h-5 bg-muted rounded w-1/2 mx-auto mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            (() => {
              const renderMember = (member: NonNullable<typeof team>[number]) => {
                const img = member.photo || localPhotos[member.name];
                const position = localized(member as any, "position", lang);
                return (
                  <article key={member.id} className="card-elevated text-center" data-testid="team-card">
                    {img ? (
                      <img
                        src={img}
                        alt={`${member.name} - ${position}, Fundacja Via Mentis`}
                        className="w-40 h-40 rounded-full object-cover object-top mx-auto mb-4"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-accent">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                    <h2 className="font-sans font-semibold text-lg">{member.name}</h2>
                    <p className="text-sm text-accent font-medium mb-3">{position}</p>
                    <p className="text-sm text-muted-foreground">{localized(member as any, "bio", lang)}</p>
                  </article>
                );
              };
              const top = team?.slice(0, 4) ?? [];
              const bottom = team?.slice(4) ?? [];
              return (
                <div className="space-y-8">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    data-testid="team-top-row"
                  >
                    {top.map(renderMember)}
                  </div>
                  {bottom.length > 0 && (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                      data-testid="team-bottom-row"
                    >
                      {bottom.map(renderMember)}
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
