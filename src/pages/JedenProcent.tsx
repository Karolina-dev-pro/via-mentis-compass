import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JedenProcent = () => {
  return (
    <>
      <SEOHead
        title="Przekaż 1,5% podatku"
        description="Przekaż 1,5% podatku na Stowarzyszenie Walki z Rakiem Płuca. KRS: 0000 126 412."
        path="/1-procent"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground"
          >
            Przekaż 1,5% podatku
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4">Twoje wsparcie ma ogromne znaczenie</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-secondary text-secondary-foreground rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">KRS: 0000 126 412</h2>
              <p className="text-lg text-secondary-foreground/85">
                Wpisz ten numer w odpowiednią rubrykę swojego zeznania podatkowego
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Jeżeli chcecie przekazać swój 1,5% podatku na rzecz Stowarzyszenia Walki z Rakiem Płuca, wpisujcie w odpowiednią rubrykę swojego zeznania podatkowego nasz numer KRS.
            </p>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Przekaż darowiznę</h3>
              <p className="text-muted-foreground mb-2">
                Osoby fizyczne mogą przez cały rok wpłacać darowizny na konto Stowarzyszenia i odliczać je od podstawy opodatkowania PIT w kwocie nie przekraczającej 6% dochodu.
              </p>
              <p className="font-bold text-foreground font-mono text-lg mt-4">
                Nr konta: 54 1020 1811 0000 0302 0073 4228
              </p>
            </div>

            <div className="text-center pt-4">
              <Button asChild size="lg" className="font-bold">
                <Link to="/kontakt">Skontaktuj się z nami</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default JedenProcent;
