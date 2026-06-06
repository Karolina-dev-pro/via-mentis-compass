import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";

const RakPluca = () => {
  return (
    <>
      <SEOHead
        title="Rak Płuca - Definicja i Epidemiologia"
        description="Rak płuca to najbardziej śmiertelny nowotwór. Dowiedz się o przyczynach, objawach, leczeniu i statystykach."
        path="/rak-pluca"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground"
          >
            Rak Płuca
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4">Definicja i Epidemiologia</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
              <p className="text-lg font-semibold text-foreground">
                Terminem „rak płuca" określa się raka tchawicy, oskrzeli (dróg oddechowych) i miąższu płucnego (pęcherzyki płucne).
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Rak płuca to najbardziej śmiertelny spośród wszystkich nowotworów w Europie i na świecie, jest przyczyną 28% zgonów wśród mężczyzn i 10% wśród kobiet. Każdego roku w Polsce z powodu raka płuca umiera blisko 20 tys. osób. To więcej niż na raka piersi, raka jelita grubego i raka prostaty razem wziętych.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Śmiertelność powodowana rakiem płuca jest nadal bardzo duża, ze wskaźnikami przeżycia gorszymi niż dla innych częstych postaci raka. Wskaźnik pięcioletniego przeżycia w raku płuca wynosi w Polsce 3-5%.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Typy raka płuca</h2>

            <p className="text-muted-foreground leading-relaxed">
              Ze względu na odrębną biologię, przebieg kliniczny i sposób leczenia, rozróżnia się dwa główne typy raka płuca: <strong className="text-foreground">niedrobnokomórkowy</strong> i <strong className="text-foreground">drobnokomórkowy</strong>.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Najczęstszą postacią raka płuca jest rak niedrobnokomórkowy, w którym rozróżnia się trzy podtypy: Rak płaskonabłonkowy rozpoczyna się zwykle w jednym z większych oskrzeli i jego wzrost jest stosunkowo wolny. Wzrost zarówno raka gruczołowego, jak i raka wielokomórkowego rozpoczyna się na obwodzie płuca. Raka wielkokomórkowego charakteryzuje szybki wzrost i rozsiew.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Obok wymienionych dwóch głównych typów raka płuca, 5 do 10% przypadków stanowią inne rodzaje takie jak: rakowiak, oblak, rak śluzowokomórkowy i międzybłonniak złośliwy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Przyczyny i Objawy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Rak płuca jest nowotworem rokującym źle. Wynika to głównie z powodu wykrycia choroby w zaawansowanym stadium i dużej złośliwości samego nowotworu.
                </p>
                <a href="https://www.rakpluca.org.pl/rak-pluca/przyczyny-i-objawy/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold text-sm hover:underline">
                  Czytaj więcej →
                </a>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Leczenie raka płuca</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Uważa się, że wczesne wykrycie może wydłużyć czas przeżycia. Poznaj metody leczenia raka płuca.
                </p>
                <a href="https://www.rakpluca.org.pl/rak-pluca/leczenie-raka-pluca/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold text-sm hover:underline">
                  Czytaj więcej →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default RakPluca;
