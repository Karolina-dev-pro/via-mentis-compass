import SEOHead from "@/components/seo/SEOHead";

const PolitykaPrywatnosci = () => {
  return (
    <>
      <SEOHead
        title="Polityka Prywatności"
        description="Polityka prywatności Stowarzyszenia Walki z Rakiem Płuca."
        path="/polityka-prywatnosci"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">Polityka Prywatności</h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl prose prose-lg">
          <h2 className="text-2xl font-bold text-foreground">Informacje ogólne</h2>
          <p className="text-muted-foreground leading-relaxed">
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych przez użytkowników w związku z korzystaniem ze strony internetowej Stowarzyszenia Walki z Rakiem Płuca.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Administratorem danych osobowych jest Stowarzyszenie Walki z Rakiem Płuca z siedzibą w Gdańsku, ul. Rajska 6, 80-850 Gdańsk.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8">Pliki cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Strona używa plików cookies (ciasteczek). Cookies mogą zbierać dane osobowe użytkowników serwisu. Każdy użytkownik może zaakceptować pliki cookies lub wyłączyć je w przeglądarce.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8">Kontakt</h2>
          <p className="text-muted-foreground leading-relaxed">
            W sprawach dotyczących polityki prywatności prosimy o kontakt: stowarzyszenie@rakpluca.org.pl
          </p>
        </div>
      </section>
    </>
  );
};

export default PolitykaPrywatnosci;
