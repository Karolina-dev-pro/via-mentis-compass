import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider, useLang, type Lang } from "@/contexts/LanguageContext";
import TeamPage from "@/pages/TeamPage";

// Mock supabase client to return a deterministic team list (7 members).
const mockTeam = [
  { id: "1", name: "Artur Prażak", position: "Psycholog, fundator", position_en: "Psychologist, founder", position_ua: "Психолог, засновник", bio: "PL bio", bio_en: "EN bio", bio_ua: "UA bio", photo: "/team/Artur-Prazak.webp", sort_order: 1, published: true },
  { id: "2", name: "Aleksandra Kulak", position: "Wiceprezes", position_en: "Vice-president", position_ua: "Віце-президент", bio: "PL", bio_en: "EN", bio_ua: "UA", photo: "/team/Aleksandra-Kulak.webp", sort_order: 2, published: true },
  { id: "3", name: "Krystyna Hartenberger", position: "Psychotraumatolog", position_en: "Psychotraumatologist", position_ua: "Психотравматолог", bio: "PL", bio_en: "EN", bio_ua: "UA", photo: "/team/Krystyna-Hartenberger.webp", sort_order: 3, published: true },
  { id: "4", name: "Anna Błażejewska-Woźniak", position: "Psycholog", position_en: "Psychologist", position_ua: "Психолог", bio: "PL", bio_en: "EN", bio_ua: "UA", photo: "/team/Anna-Blazejewska-Wozniak.webp", sort_order: 4, published: true },
  { id: "5", name: "Emilia Pająk", position: "Psycholog dzieci", position_en: "Child psychologist", position_ua: "Дитячий психолог", bio: "PL", bio_en: "EN", bio_ua: "UA", photo: "/team/Emilia-Pajak.webp", sort_order: 5, published: true },
  { id: "6", name: "Ewelina Pukacka", position: "Pedagog", position_en: "Educator", position_ua: "Педагог", bio: "PL", bio_en: "EN", bio_ua: "UA", photo: "/team/Ewelina-Pukacka.webp", sort_order: 6, published: true },
  { id: "7", name: "Luiza Błaszczak", position: "Terapeuta", position_en: "Therapist", position_ua: "Терапевт", bio: "PL", bio_en: "EN", bio_ua: "UA", photo: "/team/Luiza-Blaszczak.webp", sort_order: 7, published: true },
];

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: mockTeam, error: null }),
        }),
      }),
    }),
  },
}));

function LangSetter({ lang }: { lang: Lang }) {
  const { setLang } = useLang();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (typeof window !== "undefined") {
    setLang(lang);
  }
  return null;
}

function renderTeam(lang: Lang = "pl") {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <LanguageProvider>
            <LangSetter lang={lang} />
            <TeamPage />
          </LanguageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

describe("TeamPage - responsywny układ 4 + 3", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderuje 7 kart członków zespołu", async () => {
    renderTeam();
    await waitFor(() => {
      expect(screen.getAllByTestId("team-card")).toHaveLength(7);
    });
  });

  it("dzieli zespół na 4 osoby na górze i 3 na dole", async () => {
    renderTeam();
    await waitFor(() => {
      const top = screen.getByTestId("team-top-row");
      const bottom = screen.getByTestId("team-bottom-row");
      expect(within(top).getAllByTestId("team-card")).toHaveLength(4);
      expect(within(bottom).getAllByTestId("team-card")).toHaveLength(3);
    });
  });

  it("używa responsywnych klas grid (mobile 1 / tablet 2 / desktop 4 i 3)", async () => {
    renderTeam();
    await waitFor(() => {
      const top = screen.getByTestId("team-top-row");
      const bottom = screen.getByTestId("team-bottom-row");
      expect(top.className).toContain("grid-cols-1");
      expect(top.className).toContain("sm:grid-cols-2");
      expect(top.className).toContain("lg:grid-cols-4");
      expect(bottom.className).toContain("grid-cols-1");
      expect(bottom.className).toContain("sm:grid-cols-2");
      expect(bottom.className).toContain("lg:grid-cols-3");
    });
  });
});

describe("TeamPage - alt-texty PL/EN/UA", () => {
  beforeEach(() => localStorage.clear());

  const expectAltsForLang = async (lang: Lang, positions: string[]) => {
    renderTeam(lang);
    await waitFor(() => {
      const cards = screen.getAllByTestId("team-card");
      expect(cards).toHaveLength(7);
    });
    const imgs = screen.getAllByRole("img").filter((el) =>
      el.getAttribute("alt")?.includes("Fundacja Via Mentis")
    );
    expect(imgs).toHaveLength(7);
    imgs.forEach((img, i) => {
      const alt = img.getAttribute("alt") ?? "";
      expect(alt).toContain(mockTeam[i].name);
      expect(alt).toContain(positions[i]);
      expect(alt).toMatch(/Fundacja Via Mentis$/);
    });
  };

  it("PL: alt = imię - stanowisko PL, Fundacja Via Mentis", async () => {
    await expectAltsForLang("pl", mockTeam.map((m) => m.position));
  });

  it("EN: alt zawiera tłumaczenie EN stanowiska", async () => {
    await expectAltsForLang("en", mockTeam.map((m) => m.position_en));
  });

  it("UA: alt zawiera tłumaczenie UA stanowiska", async () => {
    await expectAltsForLang("ua", mockTeam.map((m) => m.position_ua));
  });
});
