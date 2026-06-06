import { Phone, Calendar } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function StickyCTA() {
  const { tr } = useLang();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-primary text-primary-foreground border-t border-primary-foreground/10 safe-area-pb">
      <div className="flex">
        <a href="tel:+48504911500" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-r border-primary-foreground/10">
          <Phone className="h-4 w-4" /> +48 504 911 500
        </a>
        <a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium">
          <Calendar className="h-4 w-4" /> {tr("cta")}
        </a>
      </div>
    </div>
  );
}
