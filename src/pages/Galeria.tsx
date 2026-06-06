import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";

const Galeria = () => {
  return (
    <>
      <SEOHead
        title="Galeria"
        description="Galeria zdjęć Stowarzyszenia Walki z Rakiem Płuca - spotkania, konferencje, wydarzenia."
        path="/galeria"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground"
          >
            Galeria
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4">Zdjęcia z naszej działalności</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Spotkania i wydarzenia</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Galeria zdjęć dokumentujących działalność Stowarzyszenia - spotkania, konferencje, wydarzenia edukacyjne.
              Zdjęcia będą uzupełniane na bieżąco.
            </p>
            <div className="bg-muted rounded-lg p-12 text-center">
              <p className="text-muted-foreground">
                Galeria zdjęć zostanie uzupełniona po uruchomieniu systemu zarządzania mediami (CMS).
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Galeria;
