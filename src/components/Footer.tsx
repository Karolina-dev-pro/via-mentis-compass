import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import logo from "@/assets/logo_fundacja.png";

export default function Footer() {
  const { tr } = useLang();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Fundacja Via Mentis" className="h-12 w-auto brightness-0 invert" />
            <p className="text-sm opacity-80">{tr("footer_desc")}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">{tr("footer_menu")}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: tr("nav_about"), path: "/o-fundacji" },
                { label: tr("nav_services"), path: "/oferta" },
                { label: tr("nav_team"), path: "/zespol" },
                { label: tr("nav_contact"), path: "/kontakt" },
              ].map((l) => (
                <li key={l.path}><Link to={l.path} className="opacity-80 hover:opacity-100 transition-opacity">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">{tr("nav_contact")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 opacity-70" /><a href="tel:+48504911500" className="opacity-80 hover:opacity-100">+48 504 911 500</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 opacity-70" /><a href="mailto:kontakt@viamentis.pl" className="opacity-80 hover:opacity-100">kontakt@viamentis.pl</a></li>
              <li className="flex items-center gap-2"><ExternalLink className="h-4 w-4 opacity-70" /><a href="https://twojpsycholog.pl/profil-osrodka/fundacja-via-mentis-507" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">{tr("book_online")}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">{tr("footer_legal")}</h3>
            <ul className="space-y-1 text-sm opacity-80">
              <li>KRS: 0001189614</li>
              <li>NIP: 8222418299</li>
              <li>REGON: 542491018</li>
              <li>{tr("footer_entry")}: 20.08.2025</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} Fundacja Via Mentis. {tr("footer_rights")}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/polityka-prywatnosci" className="hover:opacity-100">{tr("footer_privacy")}</Link>
            <Link to="/regulamin" className="hover:opacity-100">{tr("footer_terms")}</Link>
            <Link to="/dokumenty">{tr("footer_statute")}</Link>
            <Link to="/dokumenty">{tr("footer_child_policy")}</Link>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-6 pt-4 text-center text-[11px] tracking-wide opacity-60">
          <p>
            {tr("footer_credit_prefix")}{" "}
            <a
              href="https://stronypro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline hover:opacity-100 transition-opacity"
            >
              stronypro.com
            </a>{" "}
            {tr("footer_credit_suffix")}
          </p>
        </div>
      </div>
    </footer>
  );
}
