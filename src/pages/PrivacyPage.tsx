import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLang();

  const content = {
    pl: {
      title: "Polityka prywatności",
      intro:
        "Niniejsza Polityka prywatności opisuje zasady przetwarzania danych osobowych użytkowników serwisu viamentis.pl prowadzonego przez Fundację Via Mentis.",
      sections: [
        {
          h: "1. Administrator danych",
          p: "Administratorem danych osobowych jest Fundacja Via Mentis, ul. Świętokrzyska 5, 05-300 Mińsk Mazowiecki, KRS: 0001189614, NIP: 8222418299, REGON: 542491018. Kontakt: kontakt@viamentis.pl, tel. +48 504 911 500.",
        },
        {
          h: "2. Cel i podstawa przetwarzania",
          p: "Dane przetwarzamy w celu udzielenia odpowiedzi na zapytanie z formularza kontaktowego (art. 6 ust. 1 lit. a RODO - zgoda) oraz w celu realizacji statutowych zadań fundacji (art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes).",
        },
        {
          h: "3. Zakres danych",
          p: "Przetwarzamy: imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), treść wiadomości oraz dane techniczne (adres IP, typ urządzenia) zbierane automatycznie.",
        },
        {
          h: "4. Okres przechowywania",
          p: "Dane z formularza kontaktowego przechowujemy przez okres niezbędny do udzielenia odpowiedzi i nie dłużej niż 24 miesiące, chyba że dłuższy okres wynika z przepisów prawa.",
        },
        {
          h: "5. Twoje prawa",
          p: "Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz wycofania zgody w dowolnym momencie. Przysługuje Ci również prawo wniesienia skargi do Prezesa UODO.",
        },
        {
          h: "6. Pliki cookies",
          p: "Serwis wykorzystuje wyłącznie niezbędne pliki cookies wymagane do działania strony (np. zapamiętanie wyboru języka, sesji administracyjnej). Pliki analityczne uruchamiamy wyłącznie po wyrażeniu przez Ciebie zgody w banerze cookies.",
        },
        {
          h: "7. Odbiorcy danych",
          p: "Dane mogą być powierzane podmiotom świadczącym usługi hostingu i obsługi technicznej serwisu na podstawie umów powierzenia. Nie przekazujemy danych poza EOG.",
        },
        {
          h: "8. Kontakt",
          p: "We wszystkich sprawach związanych z ochroną danych prosimy o kontakt: kontakt@viamentis.pl.",
        },
      ],
    },
    en: {
      title: "Privacy policy",
      intro:
        "This Privacy Policy describes how Via Mentis Foundation processes personal data of users of viamentis.pl.",
      sections: [
        { h: "1. Data controller", p: "The data controller is Via Mentis Foundation, ul. Świętokrzyska 5, 05-300 Mińsk Mazowiecki, Poland, KRS: 0001189614, NIP: 8222418299. Contact: kontakt@viamentis.pl, +48 504 911 500." },
        { h: "2. Purpose and legal basis", p: "We process data to respond to contact form enquiries (Art. 6(1)(a) GDPR - consent) and to carry out the foundation's statutory tasks (Art. 6(1)(f) GDPR - legitimate interest)." },
        { h: "3. Scope of data", p: "We process: name, email address, phone number (optional), message content and technical data (IP address, device type) collected automatically." },
        { h: "4. Retention", p: "Contact form data is kept as long as necessary to respond and no longer than 24 months, unless a longer period is required by law." },
        { h: "5. Your rights", p: "You have the right to access, rectify, erase, restrict, port, object and withdraw consent at any time. You may lodge a complaint with the Polish DPA (UODO)." },
        { h: "6. Cookies", p: "The site uses only necessary cookies required for it to function (e.g. language choice, admin session). Analytics cookies are loaded only after you give consent in the cookie banner." },
        { h: "7. Recipients", p: "Data may be entrusted to hosting and technical service providers under data processing agreements. We do not transfer data outside the EEA." },
        { h: "8. Contact", p: "For any data protection matters, please contact kontakt@viamentis.pl." },
      ],
    },
    ua: {
      title: "Політика конфіденційності",
      intro:
        "Ця Політика описує, як Фонд Via Mentis обробляє персональні дані користувачів сайту viamentis.pl.",
      sections: [
        { h: "1. Контролер даних", p: "Контролер даних - Фонд Via Mentis, ul. Świętokrzyska 5, 05-300 Mińsk Mazowiecki, Польща, KRS: 0001189614, NIP: 8222418299. Контакт: kontakt@viamentis.pl, +48 504 911 500." },
        { h: "2. Мета та правова підстава", p: "Дані обробляються для відповіді на запит з контактної форми (ст. 6(1)(a) GDPR - згода) та для виконання статутних завдань фонду (ст. 6(1)(f) GDPR - законний інтерес)." },
        { h: "3. Обсяг даних", p: "Обробляємо: ім'я, email, телефон (за бажанням), текст повідомлення та технічні дані (IP, тип пристрою), що збираються автоматично." },
        { h: "4. Термін зберігання", p: "Дані з форми зберігаються не довше 24 місяців, якщо інше не вимагається законом." },
        { h: "5. Ваші права", p: "Ви маєте право на доступ, виправлення, видалення, обмеження, перенесення, заперечення та відкликання згоди. Маєте право подати скаргу до UODO." },
        { h: "6. Файли cookie", p: "Сайт використовує лише необхідні cookie. Аналітичні cookie вмикаються тільки після вашої згоди в банері." },
        { h: "7. Одержувачі", p: "Дані можуть передаватися постачальникам хостингу та технічних послуг на підставі договорів. Ми не передаємо дані за межі ЄЕЗ." },
        { h: "8. Контакт", p: "З питань захисту даних: kontakt@viamentis.pl." },
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
        <link rel="canonical" href="https://viamentis.pl/polityka-prywatnosci" />
        <link rel="alternate" hrefLang="pl" href="https://viamentis.pl/polityka-prywatnosci" />
        <link rel="alternate" hrefLang="en" href="https://viamentis.pl/polityka-prywatnosci?lang=en" />
        <link rel="alternate" hrefLang="uk" href="https://viamentis.pl/polityka-prywatnosci?lang=ua" />
        <link rel="alternate" hrefLang="x-default" href="https://viamentis.pl/polityka-prywatnosci" />
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
