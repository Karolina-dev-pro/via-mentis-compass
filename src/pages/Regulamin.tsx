import SEOHead from "@/components/seo/SEOHead";

const Regulamin = () => {
  return (
    <>
      <SEOHead
        title="Regulamin"
        description="Regulamin korzystania ze strony internetowej Stowarzyszenia Walki z Rakiem Płuca. Zasady korzystania z serwisu, prawa i obowiązki użytkowników."
        path="/regulamin"
        ogImage="/images/logo-Walka-z-Rakiem-Pluca.jpg"
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">Regulamin</h1>
          <p className="text-primary-foreground/80 text-lg mt-4">
            Zasady korzystania ze strony internetowej Stowarzyszenia Walki z Rakiem Płuca
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl prose prose-lg">
          <h2 className="text-2xl font-bold text-foreground">§1. Postanowienia ogólne</h2>
          <p className="text-muted-foreground leading-relaxed">
            Niniejszy Regulamin określa zasady korzystania ze strony internetowej Stowarzyszenia Walki z Rakiem Płuca, dostępnej pod adresem www.rakpluca.org.pl, zwanej dalej "Serwisem".
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Właścicielem i administratorem Serwisu jest Stowarzyszenie Walki z Rakiem Płuca z siedzibą w Gdańsku, ul. Rajska 6, 80-850 Gdańsk, KRS: 0000126412, NIP: 9570755875.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§2. Zakres usług</h2>
          <p className="text-muted-foreground leading-relaxed">
            Serwis ma charakter informacyjno-edukacyjny. Udostępnia treści dotyczące działalności Stowarzyszenia, profilaktyki, leczenia raka płuca oraz wsparcia osób chorych i ich rodzin.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Korzystanie z Serwisu jest bezpłatne i nie wymaga rejestracji.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§3. Prawa i obowiązki użytkownika</h2>
          <p className="text-muted-foreground leading-relaxed">
            Użytkownik zobowiązany jest do korzystania z Serwisu zgodnie z obowiązującym prawem, dobrymi obyczajami oraz postanowieniami niniejszego Regulaminu.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Zabronione jest dostarczanie treści o charakterze bezprawnym, w tym treści naruszających dobra osobiste osób trzecich.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§4. Treści informacyjne, nie medyczne</h2>
          <p className="text-muted-foreground leading-relaxed">
            Informacje publikowane w Serwisie mają charakter wyłącznie edukacyjny i informacyjny. Nie zastępują konsultacji lekarskiej, diagnozy ani leczenia. W sprawach zdrowotnych należy zawsze skonsultować się z wykwalifikowanym personelem medycznym.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§5. Prawa autorskie</h2>
          <p className="text-muted-foreground leading-relaxed">
            Wszelkie treści publikowane w Serwisie (teksty, zdjęcia, grafiki, logotypy) podlegają ochronie prawnej. Kopiowanie i rozpowszechnianie ich w celach komercyjnych wymaga pisemnej zgody Stowarzyszenia.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§6. Formularz kontaktowy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Korzystając z formularza kontaktowego, użytkownik wyraża zgodę na przetwarzanie podanych danych osobowych w celu obsługi zapytania, zgodnie z Polityką Prywatności.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§7. Pliki cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Zasady korzystania z plików cookies opisane są w Polityce Prywatności. Użytkownik może zarządzać zgodami w dowolnym momencie za pomocą banera cookies.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§8. Reklamacje</h2>
          <p className="text-muted-foreground leading-relaxed">
            Wszelkie uwagi i reklamacje dotyczące funkcjonowania Serwisu należy zgłaszać na adres: stowarzyszenie@rakpluca.org.pl. Stowarzyszenie rozpatrzy zgłoszenie w terminie 14 dni roboczych.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">§9. Postanowienia końcowe</h2>
          <p className="text-muted-foreground leading-relaxed">
            Stowarzyszenie zastrzega sobie prawo do wprowadzania zmian w Regulaminie. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Regulamin obowiązuje od dnia publikacji w Serwisie.
          </p>
        </div>
      </section>
    </>
  );
};

export default Regulamin;