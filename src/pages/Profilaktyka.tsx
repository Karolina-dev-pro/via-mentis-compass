import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const links = [
  { title: "Jakie są przyczyny powstawania raka?", url: "https://www.zwrotnikraka.pl/przyczyny-powstawania-raka/" },
  { title: "Antyrakowy dekalog – zasady zdrowego żywienia", url: "https://www.zwrotnikraka.pl/zywieniowy-dekalog-zasady-zdrowego-zywienia-prewencji-chorob-nowotworowych/" },
  { title: "Co to są komórki nowotworowe", url: "https://www.zwrotnikraka.pl/komorki-nowotworowe-opis/" },
  { title: "Rak i nowotwór złośliwy – co to jest?", url: "https://www.zwrotnikraka.pl/rak-nowotwor-zlosliwy-co-to-jest/" },
  { title: "Nowotwory złośliwe płuca – mutacje i genetyka", url: "https://www.zwrotnikraka.pl/nowotwory-zlosliwe-pluca-mutacje-genetyka/" },
  { title: "Klasyfikacja nowotworów TNM", url: "https://www.zwrotnikraka.pl/klasyfikacja-nowotworow-tnm/" },
  { title: "Czy rak jest dziedziczny?", url: "https://www.zwrotnikraka.pl/czy-rak-jest-dziedziczny/" },
  { title: "Immunoterapia nowotworów – jak leczy się raka?", url: "https://www.zwrotnikraka.pl/immunoterapia-nowotworow-jak-leczy-sie-raka/" },
  { title: "Rak płuca – leczenie", url: "https://www.zwrotnikraka.pl/rak-pluca-leczenie/" },
];

const Profilaktyka = () => {
  return (
    <>
      <SEOHead
        title="Profilaktyka"
        description="Wiarygodne źródła wiedzy o raku płuca oraz metodach profilaktyki i leczenia."
        path="/profilaktyka"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground"
          >
            Profilaktyka
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4">Wiarygodne źródła wiedzy o raku płuca</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground leading-relaxed mb-8">
              Poniżej podajemy Państwu wiarygodne źródła wiedzy o raku płuca oraz metodach leczenia:
            </p>

            <h2 className="text-xl font-bold text-foreground mb-4">Zwrotnik Raka</h2>
            <div className="space-y-3">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted transition-colors group"
                >
                  <span className="bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground group-hover:text-primary transition-colors flex-1">{link.title}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Profilaktyka;
