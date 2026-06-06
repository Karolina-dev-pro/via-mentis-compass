import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";

const ONas = () => {
  const goals = [
    "organizowanie i finansowanie szkoleń oraz doskonalenia zawodowego personelu medycznego",
    "organizowanie i prowadzenie profilaktyki antynikotynowej",
    "organizowanie i prowadzenie działań profilaktycznych wczesnego wykrywania raka płuca",
    "pozyskiwanie środków na zakup aparatury i sprzętu medycznego oraz jego modernizację",
    "wspieranie unowocześniania metod leczenia raka płuca",
    "współdziałanie z władzami, instytucjami i organizacjami",
    "reprezentację Stowarzyszenia w kraju i za granicą",
    "organizację spotkań, zjazdów, konferencji i szkoleń",
    "opracowywanie materiałów edukacyjnych, broszur, poradników",
    "przekazywanie środków finansowych na leczenie i rehabilitację",
    "organizowanie spotkań integracyjnych i imprez kulturalnych",
    "współpracę z instytucjami działającymi na rzecz chorych",
    "wymianę myśli naukowych oraz doświadczenia",
    "zapewnienie grup wsparcia dla osób chorych na raka płuca",
  ];

  return (
    <>
      <SEOHead
        title="O Nas"
        description="Stowarzyszenie Walki z Rakiem Płuca zostało założone w 1994 roku. Celem jest walka o lepszy byt osób chorych na raka płuca."
        path="/o-nas"
      />

      {/* Header */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground"
          >
            O Nas
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg mt-4 max-w-2xl">
            Poznaj Stowarzyszenie Walki z Rakiem Płuca
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">O Stowarzyszeniu Walki z Rakiem Płuca</h2>

            <div className="bg-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
              <p className="text-lg font-semibold text-foreground">
                Stowarzyszenie zostało założone w 1994 roku przez grupę lekarzy, pielęgniarek oraz pacjentów chcących pomóc chorym na raka płuca.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Celem Stowarzyszenia jest walka o lepszy byt osób wyleczonych i chorych na raka płuca. Chcemy, aby chorzy i ich bliscy nie byli pozostawieni sami sobie, aby mogli uzyskać pomoc i wsparcie. Planujemy założenie oddziałów w całej Polsce, aby dotrzeć do chorych z każdego regionu.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Misją Stowarzyszenia jest przede wszystkim poprawa sytuacji pacjentów chorych na raka płuca. Stowarzyszenie chce również zwrócić uwagę społeczeństwa na zagrożenia wpływające na zwiększoną zachorowalność na nowotwór płuca w Polsce oraz zjednoczyć pacjentów, opiekunów, specjalistów w dziedzinie ochrony zdrowia, polityków i przedstawicieli środków masowego przekazu w walce przeciwko tej chorobie.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Stowarzyszenie udziela praktycznego i emocjonalnego wsparcia pacjentom i ich bliskim poprzez przekazywanie niezbędnych informacji na temat raka płuca, profilaktyki i dostępnych możliwości terapeutycznych.
            </p>

            <h3 className="text-xl font-bold text-foreground pt-6">Stowarzyszenie realizuje swoje cele poprzez:</h3>
            <ol className="space-y-2">
              {goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{goal}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ONas;
