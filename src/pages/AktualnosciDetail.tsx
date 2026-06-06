import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  published_at: string | null;
  created_at: string;
  featured_image: string | null;
};

const AktualnosciDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("news")
        .select("id, title, slug, excerpt, content, category, published_at, created_at, featured_image")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setItem(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  };

  const sanitizedContent = item ? DOMPurify.sanitize(item.content, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr",
      "ul", "ol", "li", "blockquote", "pre", "code",
      "strong", "em", "u", "s", "a", "img", "span", "div",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel", "style"],
    ALLOW_DATA_ATTR: false,
  }) : "";

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container max-w-3xl text-center text-muted-foreground">Ładowanie...</div>
      </section>
    );
  }

  if (!item) {
    return (
      <>
        <SEOHead title="Nie znaleziono" description="" path={`/aktualnosci/${slug}`} />
        <section className="py-24 bg-background">
          <div className="container max-w-3xl text-center">
            <p className="text-muted-foreground mb-4">Nie znaleziono artykułu.</p>
            <Button asChild variant="outline"><Link to="/aktualnosci"><ArrowLeft className="mr-2 h-4 w-4" />Wróć do aktualności</Link></Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={item.title}
        description={item.excerpt || `${item.title} - Stowarzyszenie Walki z Rakiem Płuca`}
        path={`/aktualnosci/${item.slug}`}
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container max-w-3xl">
          <Link to="/aktualnosci" className="text-primary-foreground/70 hover:text-primary-foreground text-sm inline-flex items-center mb-4 transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" /> Wszystkie aktualności
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-primary-foreground">
            {item.title}
          </motion.h1>
          <p className="text-primary-foreground/70 text-sm mt-3">
            {formatDate(item.published_at || item.created_at)}
            {item.category && ` · ${item.category}`}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container max-w-3xl">
          {item.featured_image && (
            <img src={item.featured_image} alt={item.title} className="w-full rounded-lg mb-8 object-cover max-h-[400px]" />
          )}
          <article
            className="prose prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-li:text-muted-foreground prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </section>
    </>
  );
};

export default AktualnosciDetail;
