import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

export default function TermsPage() {
  const { lang } = useLang();

  const content = {
    pl: {
      title: "Regulamin serwisu",
      intro:
        "Regulamin określa zasady korzystania z serwisu viamentis.pl prowadzonego przez Fundację Via Mentis.",
      sections: [
        { h: "1. Postanowienia ogólne", p: "Właścicielem serwisu jest Fundacja Via Mentis z siedzibą przy ul. Świętokrzyskiej 5, 05-300 Mińsk Mazowiecki, KRS: 0001189614. Korzystanie z serwisu jest bezpłatne i dobrowolne." },
        { h: "2. Zakres usług", p: "Serwis udostępnia informacje o działalności Fundacji, ofercie pomocy psychologicznej, zespole oraz umożliwia kontakt poprzez formularz kontaktowy." },
        { h: "3. Zasady korzystania", p: "Użytkownik zobowiązuje się do korzystania z serwisu zgodnie z prawem i dobrymi obyczajami. Zabronione jest dostarczanie treści bezprawnych, wprowadzanie nieprawdziwych danych oraz działania zakłócające pracę serwisu." },
        { h: "4. Formularz kontaktowy", p: "Wysłanie wiadomości wymaga podania imienia, adresu e-mail, treści wiadomości oraz wyrażenia zgody na przetwarzanie danych osobowych zgodnie z Polityką prywatności." },
        { h: "5. Odpowiedzialność", p: "Fundacja dokłada starań, aby informacje w serwisie były aktualne i rzetelne, jednak nie ponoszą odpowiedzialności za skutki ich wykorzystania bez konsultacji ze specjalistą. Treści serwisu nie zastępują porady lekarskiej ani terapeutycznej." },
        { h: "6. Prawa autorskie", p: "Treści, grafiki i logotypy zamieszczone w serwisie są chronione prawem autorskim. Ich kopiowanie i rozpowszechnianie wymaga zgody Fundacji." },
        { h: "7. Reklamacje", p: "Reklamacje dotyczące działania serwisu można zgłaszać na adres kontakt@viamentis.pl. Odpowiedź udzielana jest w terminie do 14 dni." },
        { h: "8. Postanowienia końcowe", p: "Fundacja zastrzega sobie prawo zmiany Regulaminu. W sprawach nieuregulowanych stosuje się przepisy prawa polskiego." },
      ],
    },
    en: {
      title: "Terms of service",
      intro: "These Terms set out the rules of using the viamentis.pl website operated by Via Mentis Foundation.",
      sections: [
        { h: "1. General", p: "The site is owned by Via Mentis Foundation, registered at ul. Świętokrzyska 5, 05-300 Mińsk Mazowiecki, Poland, KRS: 0001189614. Use of the site is free and voluntary." },
        { h: "2. Scope", p: "The site provides information about the Foundation, its psychological support offer, the team, and allows contact through a form." },
        { h: "3. Rules of use", p: "The user agrees to use the site lawfully. Submitting unlawful content, false data or interfering with the site's operation is prohibited." },
        { h: "4. Contact form", p: "Sending a message requires providing a name, email, message content and consenting to data processing in line with the Privacy Policy." },
        { h: "5. Liability", p: "The Foundation strives to keep information current, but is not liable for consequences of using it without consulting a specialist. Content does not replace medical or therapeutic advice." },
        { h: "6. Copyright", p: "Content, graphics and logos are protected by copyright. Copying or distribution requires the Foundation's consent." },
        { h: "7. Complaints", p: "Complaints about site operation can be sent to kontakt@viamentis.pl. We respond within 14 days." },
        { h: "8. Final provisions", p: "The Foundation may amend these Terms. Polish law applies to matters not regulated herein." },
      ],
    },
    ua: {
      title: "Регламент сайту",
      intro: "Цей Регламент визначає правила користування сайтом viamentis.pl, який веде Фонд Via Mentis.",
      sections: [
        { h: "1. Загальні положення", p: "Власник сайту - Фонд Via Mentis, юридична адреса: ul. Świętokrzyska 5, 05-300 Mińsk Mazowiecki, Польща, KRS: 0001189614. Користування сайтом безкоштовне та добровільне." },
        { h: "2. Обсяг послуг", p: "Сайт надає інформацію про діяльність фонду, психологічну допомогу, команду та дозволяє надіслати контактне повідомлення." },
        { h: "3. Правила користування", p: "Користувач зобов'язується користуватись сайтом відповідно до закону. Заборонено надсилати протиправний вміст, неправдиві дані або заважати роботі сайту." },
        { h: "4. Контактна форма", p: "Надсилання повідомлення вимагає імені, email, тексту та згоди на обробку даних відповідно до Політики конфіденційності." },
        { h: "5. Відповідальність", p: "Фонд намагається підтримувати інформацію актуальною, але не несе відповідальності за її використання без консультації спеціаліста. Зміст сайту не замінює медичну чи терапевтичну допомогу." },
        { h: "6. Авторські права", p: "Тексти, графіка та логотипи захищені авторським правом. Копіювання потребує згоди фонду." },
        { h: "7. Скарги", p: "Скарги: kontakt@viamentis.pl. Відповідь - до 14 днів." },
        { h: "8. Прикінцеві положення", p: "Фонд має право змінювати Регламент. У питаннях, не врегульованих Регламентом, застосовується польське право." },
      ],
    },
  } as const;

  const c = content[lang];

  return (
    <>
      <Helmet>
        <html lang={lang === "ua" ? "uk" : lang} />
        <title>{c.title} - Fundacja Via Mentis</title>
        <meta name="description" content="Fundacja Via Mentis - pomoc psychologiczna dla dzieci i młodzieży" />
        <link rel="canonical" href="https://viamentis.pl/regulamin" />
        <link rel="alternate" hrefLang="pl" href="https://viamentis.pl/regulamin" />
        <link rel="alternate" hrefLang="en" href="https://viamentis.pl/regulamin?lang=en" />
        <link rel="alternate" hrefLang="uk" href="https://viamentis.pl/regulamin?lang=ua" />
        <link rel="alternate" hrefLang="x-default" href="https://viamentis.pl/regulamin" />
        <meta property="og:locale" content={lang === "pl" ? "pl_PL" : lang === "en" ? "en_GB" : "uk_UA"} />
      </Helmet>
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">{c.title}</h1>
          <p className="text-muted-foreground mb-8">{c.intro}</p>
          <div className="space-y-6">
            {c.sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-xl font-semibold mb-2">{s.h}</h2>
                <p className="text-foreground/80 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
