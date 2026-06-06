import { Helmet } from "react-helmet-async";
import { FileText, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/contexts/LanguageContext";
import { localized } from "@/lib/i18n-helpers";

export default function DocumentsPage() {
  const { tr, lang } = useLang();
  const { data: docs, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("published_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>{tr("meta_docs_title")}</title>
        <meta name="description" content={tr("meta_docs_desc")} />
        <link rel="canonical" href="https://viamentis.pl/dokumenty" />
        <meta property="og:title" content={tr("meta_docs_title")} />
        <meta property="og:description" content={tr("meta_docs_desc")} />
        <meta property="og:url" content="https://viamentis.pl/dokumenty" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">{tr("docs_title")}</h1>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="card-elevated flex items-start gap-4 animate-pulse">
                  <div className="h-8 w-8 rounded bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {docs?.map((doc) => (
                <a key={doc.id} href={doc.file_url} target="_blank" rel="noopener noreferrer" className="card-elevated flex items-start gap-4 group">
                  <FileText className="h-8 w-8 text-accent shrink-0" />
                  <div className="flex-1">
                    <h2 className="font-sans font-semibold group-hover:text-accent transition-colors">{localized(doc as Record<string, unknown>, "title", lang)}</h2>
                    <p className="text-sm text-muted-foreground">{localized(doc as Record<string, unknown>, "description", lang)}</p>
                  </div>
                  <Download className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
