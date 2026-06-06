import { useState, useEffect } from "react";
import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

const fallbackNews = [
  { id: "1", title: "Podziękowanie", slug: "podziekowanie", excerpt: "Podziękowanie dla Małej Japonii. Otrzymaliśmy dziś wsparcie w postaci darowizny od nowego Darczyńcy.", content: "", category: null, published_at: "2024-11-20", created_at: "2024-11-20", featured_image: null },
  { id: "2", title: "30-lecie Stowarzyszenia", slug: "30-lecie", excerpt: "Informacja Prasowa - Stowarzyszenie Walki z Rakiem Płuca obchodzi 30-lecie.", content: "", category: null, published_at: "2024-11-04", created_at: "2024-11-04", featured_image: null },
  { id: "3", title: "Pomocna dłoń Darczyńców", slug: "pomocna-dlon", excerpt: "Zwracamy się z podziękowaniem do wszystkich osób o dobrych sercach!", content: "", category: null, published_at: "2024-09-02", created_at: "2024-09-02", featured_image: null },
];

const Aktualnosci = () => {
  const [items, setItems] = useState<NewsItem[]>(fallbackNews);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("id, title, slug, excerpt, content, category, published_at, created_at, featured_image")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (data && data.length > 0) setItems(data);
    };
    fetchNews();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <>
      <SEOHead
        title="Aktualności"
        description="Najnowsze informacje i aktualności od Stowarzyszenia Walki z Rakiem Płuca."
        path="/aktualnosci"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Aktualności
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4">Najnowsze informacje ze Stowarzyszenia</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-md transition-shadow overflow-hidden">
                  <div className={item.featured_image ? "md:flex" : ""}>
                    {item.featured_image && (
                      <div className="md:w-64 md:shrink-0">
                        <img src={item.featured_image} alt={item.title} className="w-full h-48 md:h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{formatDate(item.published_at || item.created_at)}</p>
                      <h2 className="font-serif font-bold text-xl text-foreground mb-3">{item.title}</h2>
                      {item.excerpt && <p className="text-muted-foreground leading-relaxed mb-3">{item.excerpt}</p>}
                      <Link to={`/aktualnosci/${item.slug}`} className="text-primary font-semibold text-sm inline-flex items-center hover:underline">
                        Czytaj dalej <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Aktualnosci;
