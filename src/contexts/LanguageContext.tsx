import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "pl" | "en" | "ua";

type Translations = Record<string, Record<Lang, string>>;

const t: Translations = {
  // Nav
  nav_home: { pl: "Strona główna", en: "Home", ua: "Головна" },
  nav_about: { pl: "O Fundacji", en: "About", ua: "Про фонд" },
  nav_services: { pl: "Oferta", en: "Services", ua: "Послуги" },
  nav_team: { pl: "Zespół", en: "Team", ua: "Команда" },
  nav_news: { pl: "Aktualności", en: "News", ua: "Новини" },
  nav_gallery: { pl: "Galeria", en: "Gallery", ua: "Галерея" },
  nav_contact: { pl: "Kontakt", en: "Contact", ua: "Контакти" },
  nav_documents: { pl: "Dokumenty", en: "Documents", ua: "Документи" },

  // CTA
  cta: { pl: "Zarezerwuj termin", en: "Book an appointment", ua: "Записатися на прийом" },
  book_online: { pl: "Rejestracja online - TwojPsycholog", en: "Book online - TwojPsycholog", ua: "Онлайн-запис - TwojPsycholog" },

  // Hero
  hero_h1: { pl: "Wsparcie emocjonalne i edukacyjne dla dzieci i młodzieży", en: "Emotional & educational support for children and youth", ua: "Емоційна та освітня підтримка для дітей і підлітків" },
  hero_lead: { pl: "Pomagamy dzieciom i młodzieży rozwijać kompetencje emocjonalne, radzić sobie z trudnościami i odnajdywać swoją drogę w bezpiecznym otoczeniu.", en: "We help children and youth develop emotional competence, cope with challenges, and find their way in a safe environment.", ua: "Ми допомагаємо дітям і підліткам розвивати емоційні компетенції, долати труднощі та знаходити свій шлях у безпечному середовищі." },
  hero_tagline: { pl: "Bezpieczne wsparcie dla dzieci i młodzieży", en: "Safe psychological support for children & youth", ua: "Безпечна психологічна підтримка для дітей та підлітків" },

  // Sections
  section_what: { pl: "Co robimy", en: "What we do", ua: "Що ми робимо" },
  section_about: { pl: "O nas", en: "About us", ua: "Про нас" },
  section_news: { pl: "Aktualności", en: "News", ua: "Новини" },

  // Footer
  footer_rights: { pl: "Wszelkie prawa zastrzeżone.", en: "All rights reserved.", ua: "Всі права захищені." },
  footer_menu: { pl: "Menu", en: "Menu", ua: "Меню" },
  footer_legal: { pl: "Dane formalne", en: "Legal information", ua: "Юридичні дані" },
  footer_statute: { pl: "Statut", en: "Statute", ua: "Статут" },
  footer_child_policy: { pl: "Polityka ochrony dzieci", en: "Child protection policy", ua: "Політика захисту дітей" },
  footer_credit_prefix: { pl: "Projekt i wykonanie: Karolina Jędrzejewska |", en: "Design and development: Karolina Jędrzejewska |", ua: "Дизайн і розробка: Karolina Jędrzejewska |" },
  footer_credit_suffix: { pl: "(wolontariat)", en: "(volunteer work)", ua: "(волонтерство)" },
  footer_desc: { pl: "Bezpieczne wsparcie emocjonalne i edukacyjne dla dzieci i młodzieży.", en: "Safe emotional and educational support for children and youth.", ua: "Безпечна емоційна та освітня підтримка для дітей і підлітків." },
  footer_entry: { pl: "Wpis", en: "Entry", ua: "Запис" },

  // Contact form
  contact_name: { pl: "Imię i nazwisko", en: "Full name", ua: "Повне ім'я" },
  contact_email: { pl: "Email", en: "Email", ua: "Електронна пошта" },
 contact_phone: { pl: "Telefon", en: "Phone", ua: "Телефон" },
 contact_address: { pl: "Adres", en: "Address", ua: "Адреса" },
  contact_purpose: { pl: "Cel kontaktu", en: "Purpose", ua: "Мета" },
  contact_message: { pl: "Wiadomość", en: "Message", ua: "Повідомлення" },
  contact_send: { pl: "Wyślij wiadomość", en: "Send message", ua: "Надіслати повідомлення" },
  contact_consent: { pl: "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z RODO.", en: "I consent to the processing of my personal data in accordance with GDPR.", ua: "Я даю згоду на обробку моїх персональних даних відповідно до GDPR." },
  contact_sending: { pl: "Wysyłanie...", en: "Sending...", ua: "Надсилання..." },
  contact_error: { pl: "Wystąpił błąd. Spróbuj ponownie później.", en: "An error occurred. Please try again later.", ua: "Виникла помилка. Спробуйте пізніше." },
  contact_thanks: { pl: "Dziękujemy!", en: "Thank you!", ua: "Дякуємо!" },
  contact_thanks_desc: { pl: "Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.", en: "Your message has been sent. We will reply as soon as possible.", ua: "Ваше повідомлення надіслано. Ми відповімо якнайшвидше." },
  contact_select: { pl: "- wybierz -", en: "- select -", ua: "- оберіть -" },
  contact_consultation: { pl: "Konsultacja", en: "Consultation", ua: "Консультація" },
  contact_therapy: { pl: "Terapia", en: "Therapy", ua: "Терапія" },
  contact_workshop: { pl: "Warsztat", en: "Workshop", ua: "Майстер-клас" },
  contact_cooperation: { pl: "Współpraca", en: "Cooperation", ua: "Співпраця" },
  contact_registration: { pl: "Rejestracja online", en: "Online registration", ua: "Онлайн-реєстрація" },

  // Read more
  read_more: { pl: "Czytaj więcej", en: "Read more", ua: "Читати далі" },

  // HomePage features
  feat_emotional: { pl: "Wsparcie emocjonalne", en: "Emotional support", ua: "Емоційна підтримка" },
  feat_emotional_desc: { pl: "Warsztaty i grupy wsparcia uczące rozumienia emocji i budowania relacji.", en: "Workshops and support groups teaching emotional understanding and relationship building.", ua: "Майстер-класи та групи підтримки, що навчають розуміти емоції та будувати стосунки." },
  feat_therapy: { pl: "Pomoc terapeutyczna", en: "Therapeutic support", ua: "Терапевтична допомога" },
  feat_therapy_desc: { pl: "Konsultacje psychologiczne i terapia indywidualna dla dzieci i młodzieży.", en: "Psychological consultations and individual therapy for children and youth.", ua: "Психологічні консультації та індивідуальна терапія для дітей і підлітків." },
  feat_tus: { pl: "Treningi TUS", en: "Social skills training", ua: "Тренінги соціальних навичок" },
  feat_tus_desc: { pl: "Treningi Umiejętności Społecznych prowadzone przez certyfikowanych trenerów.", en: "Social skills training led by certified trainers.", ua: "Тренінги соціальних навичок, які проводять сертифіковані тренери." },
  feat_schools: { pl: "Współpraca ze szkołami", en: "School partnerships", ua: "Співпраця зі школами" },
  feat_schools_desc: { pl: "Programy profilaktyczne i edukacyjne we współpracy z placówkami oświatowymi.", en: "Prevention and educational programs in partnership with schools.", ua: "Профілактичні та освітні програми у співпраці з навчальними закладами." },

  // HomePage what we do subtitle
  home_what_desc: { pl: "Oferujemy kompleksowe wsparcie psychologiczne, pedagogiczne i terapeutyczne.", en: "We offer comprehensive psychological, pedagogical and therapeutic support.", ua: "Ми пропонуємо комплексну психологічну, педагогічну та терапевтичну підтримку." },

  // HomePage about section
  home_about_title: { pl: "O Fundacji Via Mentis", en: "About Via Mentis Foundation", ua: "Про фонд Via Mentis" },
  home_about_desc: { pl: "Misją Fundacji Via Mentis jest tworzenie zdrowego i wspierającego środowiska, w którym każde dziecko i młody człowiek może się rozwijać. Dbamy, aby młodzi ludzie czuli się bezpiecznie, potrafili radzić sobie z trudnymi emocjami i mieli dostęp do profesjonalnej pomocy.", en: "The mission of the Via Mentis Foundation is to create a healthy and supportive environment where every child and young person can thrive. We ensure that young people feel safe, can cope with difficult emotions, and have access to professional help.", ua: "Місія фонду Via Mentis - створювати здорове та підтримуюче середовище, де кожна дитина та молода людина може розвиватися. Ми дбаємо, щоб молоді люди почувалися безпечно, вміли справлятися зі складними емоціями та мали доступ до професійної допомоги." },
  home_stat_specialists: { pl: "specjalistów w zespole", en: "specialists in the team", ua: "спеціалістів у команді" },
  home_stat_children: { pl: "dzieci pod opieką", en: "children in our care", ua: "дітей під опікою" },
  home_stat_programs: { pl: "programów wsparcia", en: "support programs", ua: "програм підтримки" },
  home_stat_founded: { pl: "rok założenia", en: "year founded", ua: "рік заснування" },

  // HomePage CTA banner
  home_cta_title: { pl: "Potrzebujesz wsparcia? Skontaktuj się z nami", en: "Need support? Contact us", ua: "Потрібна підтримка? Зв'яжіться з нами" },
  home_cta_desc: { pl: "Pierwsza konsultacja pomoże nam lepiej zrozumieć Twoje potrzeby. Umów się przez telefon, e-mail lub formularz online.", en: "The first consultation will help us better understand your needs. Book via phone, email, or online form.", ua: "Перша консультація допоможе нам краще зрозуміти ваші потреби. Запишіться телефоном, електронною поштою або через онлайн-форму." },

  // About page
  about_title: { pl: "O Fundacji Via Mentis", en: "About Via Mentis Foundation", ua: "Про фонд Via Mentis" },
  about_mission: { pl: "Misją Fundacji Via Mentis jest tworzenie zdrowego i wspierającego środowiska, w którym każde dziecko i młody człowiek może się rozwijać. Dbamy, aby młodzi ludzie czuli się bezpiecznie, potrafili radzić sobie z trudnymi emocjami i mieli dostęp do profesjonalnej pomocy.", en: "The mission of the Via Mentis Foundation is to create a healthy and supportive environment where every child and young person can thrive. We ensure that young people feel safe, can cope with difficult emotions, and have access to professional help.", ua: "Місія фонду Via Mentis - створювати здорове та підтримуюче середовище, де кожна дитина та молода людина може розвиватися. Ми дбаємо, щоб молоді люди почувалися безпечно, вміли справлятися зі складними емоціями та мали доступ до професійної допомоги." },
  about_how: { pl: "Jak pomagamy", en: "How we help", ua: "Як ми допомагаємо" },
  about_help1_title: { pl: "Wsparcie emocjonalne i edukacyjne", en: "Emotional and educational support", ua: "Емоційна та освітня підтримка" },
  about_help1_desc: { pl: "Organizujemy warsztaty, szkolenia i grupy wsparcia uczące rozumienia emocji, budowania relacji i dbania o zdrowie psychiczne.", en: "We organise workshops, trainings and support groups teaching emotional understanding, relationship building and mental health care.", ua: "Ми організовуємо майстер-класи, тренінги та групи підтримки, які навчають розуміти емоції, будувати стосунки та піклуватися про психічне здоров'я." },
  about_help2_title: { pl: "Wsparcie edukacyjne i terapeutyczne", en: "Educational and therapeutic support", ua: "Освітня та терапевтична підтримка" },
  about_help2_desc: { pl: "Pomoc pedagogiczna i terapia dla dzieci i młodzieży, prowadzona przez wykwalifikowany zespół.", en: "Pedagogical support and therapy for children and youth, led by a qualified team.", ua: "Педагогічна підтримка та терапія для дітей і підлітків, які проводить кваліфікована команда." },
  about_help3_title: { pl: "Działania społeczne i współpraca", en: "Social activities and cooperation", ua: "Соціальна діяльність та співпраця" },
  about_help3_desc: { pl: "Konferencje, debaty i partnerstwa ze szkołami, samorządami i organizacjami pozarządowymi.", en: "Conferences, debates and partnerships with schools, local governments and NGOs.", ua: "Конференції, дебати та партнерство зі школами, органами місцевого самоврядування та НГО." },
  about_help4_title: { pl: "Badania i publikacje", en: "Research and publications", ua: "Дослідження та публікації" },
  about_help4_desc: { pl: "Prowadzenie analiz, publikacji oraz pozyskiwanie środków na rozwój działalności.", en: "Conducting analyses, publications and fundraising for development.", ua: "Проведення аналізів, публікацій та залучення коштів на розвиток діяльності." },
  about_rules: { pl: "Zasady współpracy", en: "Cooperation principles", ua: "Принципи співпраці" },
  about_rule1_title: { pl: "Poufność i bezpieczeństwo", en: "Confidentiality and safety", ua: "Конфіденційність і безпека" },
  about_rule1_desc: { pl: "Wszystkie rozmowy są objęte tajemnicą.", en: "All conversations are confidential.", ua: "Усі розмови є конфіденційними." },
  about_rule2_title: { pl: "Ochrona wizerunku", en: "Image protection", ua: "Захист зображень" },
  about_rule2_desc: { pl: "Publikujemy zdjęcia tylko za zgodą.", en: "We publish photos only with consent.", ua: "Ми публікуємо фотографії лише за згодою." },
  about_rule3_title: { pl: "Informacja i wysłuchanie", en: "Information and listening", ua: "Інформація та вислуховування" },
  about_rule3_desc: { pl: "Przejrzysty proces pomocy i pełne informowanie uczestników.", en: "Transparent support process and full information for participants.", ua: "Прозорий процес допомоги та повне інформування учасників." },
  about_rule4_title: { pl: "Prawo wyboru", en: "Right to choose", ua: "Право вибору" },
  about_rule4_desc: { pl: "Uczestnictwo jest dobrowolne; dostępna jest bezpłatna pomoc w ramach fundacji.", en: "Participation is voluntary; free support is available through the foundation.", ua: "Участь є добровільною; безкоштовна допомога доступна в рамках фонду." },
  about_legal: { pl: "Dane formalne", en: "Legal information", ua: "Юридичні дані" },
  about_krs_date: { pl: "Data wpisu do Rejestru Stowarzyszeń", en: "Date of entry in the Register", ua: "Дата внесення до Реєстру" },

  // Services page
  services_title: { pl: "Oferta", en: "Our services", ua: "Наші послуги" },
  services_desc: { pl: "Wszystkie usługi prowadzone są przez wykwalifikowany i certyfikowany zespół specjalistów.", en: "All services are provided by a qualified and certified team of specialists.", ua: "Усі послуги надаються кваліфікованою та сертифікованою командою спеціалістів." },
  svc1_title: { pl: "Konsultacje psychologiczne", en: "Psychological consultations", ua: "Психологічні консультації" },
  svc1_desc: { pl: "Indywidualne spotkania diagnostyczne i konsultacyjne z psychologiem.", en: "Individual diagnostic and consultative sessions with a psychologist.", ua: "Індивідуальні діагностичні та консультативні зустрічі з психологом." },
  svc2_title: { pl: "Terapia indywidualna", en: "Individual therapy", ua: "Індивідуальна терапія" },
  svc2_desc: { pl: "Terapia dla dzieci i młodzieży prowadzona metodami CBT, ACT i DBT.", en: "Therapy for children and youth using CBT, ACT, and DBT methods.", ua: "Терапія для дітей і підлітків методами CBT, ACT та DBT." },
  svc3_title: { pl: "Wsparcie pedagogiczne", en: "Pedagogical support", ua: "Педагогічна підтримка" },
  svc3_desc: { pl: "Pomoc pedagogiczna, terapia pedagogiczna i działania rewalidacyjne.", en: "Pedagogical support, pedagogical therapy and rehabilitation activities.", ua: "Педагогічна допомога, педагогічна терапія та реабілітаційні заходи." },
  svc4_title: { pl: "Treningi Umiejętności Społecznych (TUS)", en: "Social Skills Training (SST)", ua: "Тренінги соціальних навичок (ТСН)" },
  svc4_desc: { pl: "Zajęcia grupowe rozwijające kompetencje społeczne u dzieci i młodzieży.", en: "Group classes developing social skills in children and youth.", ua: "Групові заняття з розвитку соціальних навичок у дітей і підлітків." },
  svc5_title: { pl: "Warsztaty psychoedukacyjne", en: "Psychoeducational workshops", ua: "Психоосвітні майстер-класи" },
  svc5_desc: { pl: "Warsztaty dla dzieci, młodzieży i rodziców z zakresu zdrowia psychicznego.", en: "Workshops for children, youth and parents on mental health.", ua: "Майстер-класи для дітей, підлітків і батьків з питань психічного здоров'я." },
  svc6_title: { pl: "Programy profilaktyczne", en: "Prevention programs", ua: "Профілактичні програми" },
  svc6_desc: { pl: "Programy realizowane we współpracy ze szkołami i placówkami oświatowymi.", en: "Programs implemented in cooperation with schools and educational institutions.", ua: "Програми, що реалізуються у співпраці зі школами та навчальними закладами." },

  // Team page
  team_title: { pl: "Nasz zespół", en: "Our team", ua: "Наша команда" },
  team_desc: { pl: "Specjaliści z doświadczeniem w pracy z dziećmi i młodzieżą - psycholodzy, pedagodzy, terapeuci.", en: "Specialists with experience working with children and youth - psychologists, educators, therapists.", ua: "Спеціалісти з досвідом роботи з дітьми та підлітками - психологи, педагоги, терапевти." },

  // News page
  news_title: { pl: "Aktualności", en: "News", ua: "Новини" },
  news_empty: { pl: "Brak aktualności.", en: "No news yet.", ua: "Новин поки немає." },

  // Documents page
  docs_title: { pl: "Dokumenty", en: "Documents", ua: "Документи" },

  // 404 page
  not_found_title: { pl: "Strona nie znaleziona", en: "Page not found", ua: "Сторінку не знайдено" },
  not_found_desc: { pl: "Przepraszamy, ta strona nie istnieje.", en: "Sorry, this page does not exist.", ua: "Вибачте, ця сторінка не існує." },
  not_found_link: { pl: "Wróć na stronę główną", en: "Return to Home", ua: "Повернутися на головну" },

  // Meta titles & descriptions
  meta_home_title: { pl: "Fundacja Via Mentis - pomoc psychologiczna dla dzieci i młodzieży", en: "Via Mentis Foundation - psychological support for children and youth", ua: "Фонд Via Mentis - психологічна допомога для дітей і підлітків" },
  meta_home_desc: { pl: "Fundacja Via Mentis wspiera dzieci, młodzież i rodziny w radzeniu sobie z trudnościami emocjonalnymi. Warsztaty, terapia, wsparcie pedagogiczne.", en: "Via Mentis Foundation supports children, youth and families in coping with emotional difficulties. Workshops, therapy, pedagogical support.", ua: "Фонд Via Mentis підтримує дітей, підлітків і сім'ї у подоланні емоційних труднощів. Майстер-класи, терапія, педагогічна підтримка." },
  meta_about_title: { pl: "O Fundacji Via Mentis - misja i działalność", en: "About Via Mentis Foundation - mission and activities", ua: "Про фонд Via Mentis - місія та діяльність" },
  meta_about_desc: { pl: "Poznaj misję Fundacji Via Mentis. Tworzymy bezpieczne środowisko wsparcia emocjonalnego i edukacyjnego dla dzieci i młodzieży.", en: "Learn about the Via Mentis Foundation mission. We create a safe environment of emotional and educational support for children and youth.", ua: "Дізнайтеся про місію фонду Via Mentis. Ми створюємо безпечне середовище емоційної та освітньої підтримки для дітей і підлітків." },
  meta_services_title: { pl: "Oferta Fundacji Via Mentis - terapia, wsparcie, warsztaty", en: "Via Mentis Foundation services - therapy, support, workshops", ua: "Послуги фонду Via Mentis - терапія, підтримка, майстер-класи" },
  meta_services_desc: { pl: "Konsultacje psychologiczne, terapia, TUS, warsztaty i programy profilaktyczne. Wykwalifikowany zespół specjalistów.", en: "Psychological consultations, therapy, social skills training, workshops and prevention programs. Qualified team of specialists.", ua: "Психологічні консультації, терапія, тренінги соціальних навичок, майстер-класи та профілактичні програми. Кваліфікована команда спеціалістів." },
  meta_team_title: { pl: "Zespół Fundacji Via Mentis - specjaliści dla dzieci i młodzieży", en: "Via Mentis Foundation team - specialists for children and youth", ua: "Команда фонду Via Mentis - спеціалісти для дітей і підлітків" },
  meta_team_desc: { pl: "Poznaj nasz zespół psychologów, pedagogów i terapeutów. Wykwalifikowani specjaliści pracujący z dziećmi i młodzieżą.", en: "Meet our team of psychologists, educators and therapists. Qualified specialists working with children and youth.", ua: "Познайомтеся з нашою командою психологів, педагогів і терапевтів. Кваліфіковані спеціалісти, які працюють з дітьми і підлітками." },
  meta_news_title: { pl: "Aktualności - Fundacja Via Mentis", en: "News - Via Mentis Foundation", ua: "Новини - Фонд Via Mentis" },
  meta_news_desc: { pl: "Najnowsze wiadomości, wydarzenia i aktualności Fundacji Via Mentis.", en: "Latest news, events and updates from Via Mentis Foundation.", ua: "Останні новини, події та оновлення фонду Via Mentis." },
  meta_docs_title: { pl: "Dokumenty - Fundacja Via Mentis", en: "Documents - Via Mentis Foundation", ua: "Документи - Фонд Via Mentis" },
  meta_docs_desc: { pl: "Statut fundacji, polityka ochrony dzieci i inne dokumenty Fundacji Via Mentis do pobrania.", en: "Foundation statute, child protection policy and other Via Mentis Foundation documents for download.", ua: "Статут фонду, політика захисту дітей та інші документи фонду Via Mentis для завантаження." },
  meta_contact_title: { pl: "Kontakt - Fundacja Via Mentis", en: "Contact - Via Mentis Foundation", ua: "Контакти - Фонд Via Mentis" },
  meta_contact_desc: { pl: "Skontaktuj się z Fundacją Via Mentis. Telefon, e-mail, formularz kontaktowy lub rejestracja online przez TwojPsycholog.", en: "Contact Via Mentis Foundation. Phone, email, contact form or online registration via TwojPsycholog.", ua: "Зв'яжіться з фондом Via Mentis. Телефон, електронна пошта, контактна форма або онлайн-реєстрація через TwojPsycholog." },

  // Privacy & Terms
  nav_privacy: { pl: "Polityka prywatności", en: "Privacy policy", ua: "Політика конфіденційності" },
  nav_terms: { pl: "Regulamin", en: "Terms of service", ua: "Регламент" },
  footer_privacy: { pl: "Polityka prywatności", en: "Privacy policy", ua: "Політика конфіденційності" },
  footer_terms: { pl: "Regulamin", en: "Terms of service", ua: "Регламент" },

  // Cookie banner
  cookie_title: { pl: "Pliki cookies", en: "Cookies", ua: "Файли cookie" },
  cookie_desc: { pl: "Używamy plików cookies, aby zapewnić poprawne działanie strony oraz - za Twoją zgodą - analizować ruch i ulepszać nasze usługi. Szczegóły znajdziesz w Polityce prywatności.", en: "We use cookies to ensure the site works correctly and - with your consent - to analyse traffic and improve our services. See our Privacy Policy for details.", ua: "Ми використовуємо файли cookie, щоб сайт працював коректно, а також - за вашої згоди - аналізувати трафік та покращувати послуги. Деталі - у Політиці конфіденційності." },
  cookie_accept: { pl: "Akceptuję wszystkie", en: "Accept all", ua: "Прийняти всі" },
  cookie_reject: { pl: "Odrzuć", en: "Reject", ua: "Відхилити" },
  cookie_manage: { pl: "Zarządzaj preferencjami", en: "Manage preferences", ua: "Керувати налаштуваннями" },
  cookie_save: { pl: "Zapisz wybór", en: "Save choice", ua: "Зберегти вибір" },
  cookie_back: { pl: "Powrót", en: "Back", ua: "Назад" },
  cookie_necessary: { pl: "Niezbędne", en: "Necessary", ua: "Необхідні" },
  cookie_necessary_desc: { pl: "Wymagane do działania strony - zawsze włączone.", en: "Required for the site to work - always on.", ua: "Потрібні для роботи сайту - завжди увімкнені." },
  cookie_analytics: { pl: "Analityczne", en: "Analytics", ua: "Аналітичні" },
  cookie_analytics_desc: { pl: "Pomagają nam zrozumieć, jak korzystasz ze strony.", en: "Help us understand how you use the site.", ua: "Допомагають зрозуміти, як ви користуєтеся сайтом." },

  // CAPTCHA
  captcha_label: { pl: "Weryfikacja: ile to jest", en: "Verification: how much is", ua: "Перевірка: скільки буде" },
  captcha_error: { pl: "Niepoprawny wynik weryfikacji.", en: "Incorrect verification result.", ua: "Неправильна відповідь перевірки." },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pl",
  setLang: () => {},
  tr: (key) => key,
});

const htmlLangMap: Record<Lang, string> = { pl: "pl", en: "en", ua: "uk" };

const safeGet = (k: string): string | null => {
  try { return localStorage.getItem(k); } catch { return null; }
};
const safeSet = (k: string, v: string) => {
  try { localStorage.setItem(k, v); } catch { /* ignore */ }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const q = params.get("lang");
        if (q === "pl" || q === "en" || q === "ua") return q;
      } catch { /* ignore */ }
    }
    const saved = safeGet("lang");
    return saved === "pl" || saved === "en" || saved === "ua" ? saved : "pl";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    safeSet("lang", l);
  };


  const tr = (key: string) => t[key]?.[lang] ?? key;

  useEffect(() => {
    document.documentElement.lang = htmlLangMap[lang];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
