
-- Update photos and reorder team. Leadership/Zarząd on top: Artur, Aleksandra, Krystyna.
UPDATE public.team_members SET photo = '/team/Artur-Prazak.webp', sort_order = 1 WHERE id = '4201598e-8609-4266-b4aa-e4e462a7325b';
UPDATE public.team_members SET photo = '/team/Aleksandra-Kulak.webp', sort_order = 2 WHERE id = '6a382f26-dde2-4d53-bf50-e2eac8db424b';
UPDATE public.team_members SET photo = '/team/Anna-Blazejewska-Wozniak.webp', sort_order = 4 WHERE id = 'b259dfcf-da38-4ac4-9434-57e09eae3683';
UPDATE public.team_members SET photo = '/team/Emilia-Pajak.webp', sort_order = 5 WHERE id = 'a622bfcd-2373-43a8-9bf0-d55013ac2e89';
UPDATE public.team_members SET photo = '/team/Ewelina-Pukacka.webp', sort_order = 6 WHERE id = '04742311-9def-4561-afc0-11f01a1446f9';
UPDATE public.team_members SET photo = '/team/Luiza-Blaszczak.webp', sort_order = 7 WHERE id = '778dc7ac-5740-4b00-8a6c-350b7b9eabcf';

INSERT INTO public.team_members (name, position, bio, photo, sort_order, published, position_en, bio_en, position_ua, bio_ua)
VALUES (
  'Krystyna Hartenberger',
  'Pedagog, interwent kryzysowy, certyfikowany psychotraumatolog',
  'Certyfikowana psychotraumatolog, interwent kryzysowy i pedagog. Wspiera dzieci, młodzież, rodziny i osoby dorosłe w kryzysie, po traumatycznych wydarzeniach oraz w sytuacjach silnego przeciążenia emocjonalnego. W pracy łączy empatię, spokój i profesjonalne podejście. Ukończyła pedagogikę na Uniwersytecie Warszawskim, studia podyplomowe z nauk o rodzinie na UKSW, Studium Pomocy Psychologicznej i Interwencji Kryzysowej w Instytucie Psychologii Zdrowia PTP oraz studia podyplomowe z psychotraumatologii. Inicjatorka pierwszej świetlicy terapeutycznej w Mińsku Mazowieckim, założycielka i prezes Stowarzyszenia Pomocy Rodzinie. Doświadczenie zdobywała w ośrodkach wsparcia, interwencji kryzysowej oraz placówkach pracujących z osobami doświadczającymi przemocy i chorującymi psychicznie. Prowadzi interwencje kryzysowe, terapię indywidualną i grupy wsparcia. Pracę regularnie poddaje superwizji.',
  '/team/Krystyna-Hartenberger.webp',
  3,
  true,
  'Educator, crisis interventionist, certified psychotraumatologist',
  'Certified psychotraumatologist, crisis interventionist and educator. Supports children, youth, families and adults in crisis, after traumatic events and in situations of severe emotional overload. Combines empathy, calm and a professional approach. Graduate of pedagogy at the University of Warsaw, postgraduate studies in family sciences at UKSW, the School of Psychological Help and Crisis Intervention at the Institute of Health Psychology PTP, and postgraduate studies in psychotraumatology. Initiator of the first therapeutic day-care centre in Mińsk Mazowiecki, founder and president of the Family Support Association. Gained experience in support centres, crisis intervention units and institutions working with people experiencing violence and mental illness. Provides crisis interventions, individual therapy and support groups. Regularly undergoes supervision.',
  'Педагог, кризовий інтервент, сертифікований психотравматолог',
  'Сертифікований психотравматолог, кризовий інтервент і педагог. Підтримує дітей, молодь, сім''ї та дорослих у кризі, після травматичних подій та в ситуаціях сильного емоційного перевантаження. У роботі поєднує емпатію, спокій і професійний підхід. Закінчила педагогіку у Варшавському університеті, післядипломні студії з наук про сім''ю в UKSW, Студіум психологічної допомоги та кризової інтервенції в Інституті психології здоров''я PTP, а також післядипломні студії з психотравматології. Ініціаторка першого терапевтичного центру в Мінську-Мазовецькому, засновниця та голова Товариства допомоги сім''ї. Досвід здобувала в центрах підтримки, кризової інтервенції та установах, що працюють з особами, які зазнали насильства та психічно хворими. Проводить кризові інтервенції, індивідуальну терапію та групи підтримки. Регулярно проходить супервізію.'
);
