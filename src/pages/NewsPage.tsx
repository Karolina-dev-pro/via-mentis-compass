import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/contexts/LanguageContext";
import { localized } from "@/lib/i18n-helpers";

export default function NewsPage() {
  const { lang, tr } = useLang();
  const { data: news, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>{tr("meta_news_title")}</title>
        <meta name="description" content={tr("meta_news_desc")} />
        <link rel="canonical" href="https://viamentis.pl/aktualnosci" />
        <meta property="og:title" content={tr("meta_news_title")} />
        <meta property="og:description" content={tr("meta_news_desc")} />
        <meta property="og:url" content="https://viamentis.pl/aktualnosci" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">{tr("news_title")}</h1>
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-elevated animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {news?.map((item) => (
                <article key={item.id} className="card-elevated">
                  <div className="flex items-center gap-3 mb-2">
                    {item.category && (
                      <span className="text-xs font-medium px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
                        {localized(item as any, "category", lang)}
                      </span>
                    )}
                    <time className="text-xs text-muted-foreground">{item.date}</time>
                  </div>
                  <h2 className="font-sans font-semibold text-lg mb-2">
                    {localized(item as any, "title", lang)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {localized(item as any, "excerpt", lang)}
                  </p>
                </article>
              ))}
              {news?.length === 0 && (
                <p className="text-muted-foreground text-center py-8">{tr("news_empty")}</p>
              )}
            </div>
          )}
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
