import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Users, Shield, ArrowRight, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const fallbackNews = [
  {
    date: "20 listopada 2024",
    title: "Podziękowanie",
    excerpt: "Podziękowanie dla Małej Japonii. Otrzymaliśmy dziś wsparcie w postaci darowizny od nowego Darczyńcy.",
    slug: "/aktualnosci",
  },
  {
    date: "4 listopada 2024",
    title: "30-lecie Stowarzyszenia",
    excerpt: "Informacja Prasowa - Stowarzyszenie Walki z Rakiem Płuca obchodzi 30-lecie swojej działalności.",
    slug: "/aktualnosci",
  },
  {
    date: "2 września 2024",
    title: "Pomocna dłoń Darczyńców",
    excerpt: "Zwracamy się z podziękowaniem do wszystkich osób o dobrych sercach! Wasze darowizny mają dużą moc sprawczą.",
    slug: "/aktualnosci",
  },
];

const knowledgeCards = [
  {
    icon: BookOpen,
    title: "Przyczyny i Objawy",
    text: "Rak płuca jest nowotworem rokującym źle. Wynika to głównie z powodu wykrycia choroby w zaawansowanym stadium.",
    link: "/rak-pluca",
  },
  {
    icon: Shield,
    title: "Profilaktyka",
    text: "Zapoznaj się z bazą wiedzy o profilaktyce raka płuca zgromadzoną w jednym miejscu.",
    link: "/profilaktyka",
  },
  {
    icon: Heart,
    title: "Jak możesz pomóc?",
    text: "Osoby fizyczne mogą przez cały rok wpłacać darowizny na konto Stowarzyszenia i odliczać je od podatku.",
    link: "/1-procent",
  },
  {
    icon: Users,
    title: "Razem jest łatwiej",
    text: "Nasze Stowarzyszenie wspiera osoby chore oraz ich rodziny w walce z nowotworem.",
    link: "/o-nas",
  },
];

const Index = () => {
  const [newsItems, setNewsItems] = useState(fallbackNews.map(n => ({ ...n })));

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("title, slug, excerpt, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (data && data.length > 0) {
        setNewsItems(data.map(n => ({
          date: new Date(n.published_at || n.created_at).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
          title: n.title,
          excerpt: n.excerpt || "",
          slug: "/aktualnosci",
        })));
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <SEOHead
        title="Stowarzyszenie Walki z Rakiem Płuca"
        description="Stowarzyszenie Walki z Rakiem Płuca - wspieramy chorych na raka płuca i ich rodziny od 1994 roku. Informacje, profilaktyka, wsparcie."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]">
        <div className="absolute inset-0">
          <img src="/images/hero-bg.webp" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 py-20 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Walczymy z rakiem płuca <span className="text-secondary">od 1994 roku</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl leading-relaxed">
              Wspieramy chorych na raka płuca i ich rodziny. Edukujemy, łączymy pacjentów ze specjalistami i działamy na rzecz lepszej profilaktyki.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base">
                <Link to="/o-nas">Poznaj nas</Link>
              </Button>
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base">
                <Link to="/kontakt">Skontaktuj się</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Aktualności</h2>
            <Button asChild variant="ghost" className="text-primary font-semibold">
              <Link to="/aktualnosci">
                Wszystkie <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border">
                  <CardContent className="p-6">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{item.date}</p>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.excerpt}</p>
                    <Link to={item.slug} className="text-primary font-semibold text-sm hover:underline inline-flex items-center">
                      Czytaj dalej <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Przekaż darowiznę!</h2>
            <p className="text-lg text-secondary-foreground/85 max-w-2xl mx-auto mb-6 leading-relaxed">
              Zgodnie z przepisami osoby fizyczne mogą wpłacać darowizny na konto Stowarzyszenia i odliczać je od podstawy opodatkowania PIT (do 6% dochodu).
            </p>
            <div className="bg-secondary-foreground/10 rounded-lg p-6 inline-block mb-6">
              <p className="text-sm font-semibold mb-1">Nr konta bankowego:</p>
              <p className="text-xl md:text-2xl font-bold font-mono tracking-wider">54 1020 1811 0000 0302 0073 4228</p>
            </div>
            <div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <Link to="/1-procent">Dowiedz się więcej o 1,5%</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rak Płuca info */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Rak Płuca - Definicja i Epidemiologia</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Terminem „rak płuca" określa się raka tchawicy, oskrzeli i miąższu płucnego. Rak płuca to najbardziej śmiertelny spośród wszystkich nowotworów - jest przyczyną 28% zgonów wśród mężczyzn i 10% wśród kobiet.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Każdego roku w Polsce z powodu raka płuca umiera blisko 20 tys. osób. To więcej niż na raka piersi, raka jelita grubego i raka prostaty razem wziętych.
              </p>
              <Button asChild className="font-semibold">
                <Link to="/rak-pluca">Czytaj więcej</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {knowledgeCards.map((card, i) => (
                <Link key={i} to={card.link} className="group">
                  <Card className="h-full hover:shadow-md transition-all border-border group-hover:border-primary/30">
                    <CardContent className="p-5">
                      <card.icon className="h-8 w-8 text-secondary mb-3" />
                      <h3 className="font-serif font-bold text-sm mb-2 text-foreground">{card.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{card.text}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* KRS */}
      <section className="py-12 bg-muted">
        <div className="container text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Przekaż 1,5% podatku!</h2>
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono tracking-wider">KRS: 0000 126 412</p>
        </div>
      </section>

      {/* Facebook */}
      <section className="py-16 bg-background">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">Śledź nas na Facebooku</h2>
          <a
            href="https://www.facebook.com/993254464036926?ref=embed_page"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-bold text-lg"
          >
            <Facebook className="h-6 w-6" />
            Stowarzyszenie Walki z Rakiem Płuca
          </a>
        </div>
      </section>
    </>
  );
};

export default Index;
