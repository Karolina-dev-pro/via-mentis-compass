import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & about */}
          <div className="space-y-4">
            <img
              src="/images/logo-Walka-z-Rakiem-Pluca.jpg"
              alt="Logo Stowarzyszenia"
              className="h-14 w-auto bg-primary-foreground rounded p-1"
            />
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Stowarzyszenie Walki z Rakiem Płuca zostało założone w 1994 roku. Naszym celem jest walka o lepszy byt osób chorych na raka płuca.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Nawigacja</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "O Nas", path: "/o-nas" },
                { label: "Rak płuca", path: "/rak-pluca" },
                { label: "Profilaktyka", path: "/profilaktyka" },
                { label: "Aktualności", path: "/aktualnosci" },
                { label: "Kontakt", path: "/kontakt" },
                { label: "Przekaż 1,5%", path: "/1-procent" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>ul. Rajska 6, 80-850 Gdańsk<br />Dom Technika NOT, II piętro, pok. 208</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+48455405114" className="hover:text-primary-foreground">+48 455 405 114</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:stowarzyszenie@rakpluca.org.pl" className="hover:text-primary-foreground">stowarzyszenie@rakpluca.org.pl</a>
              </li>
            </ul>
          </div>

          {/* Social + KRS */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Wesprzyj nas</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <p><strong className="text-primary-foreground">KRS:</strong> 0000 126 412</p>
              <p><strong className="text-primary-foreground">NIP:</strong> 9570755875</p>
              <p><strong className="text-primary-foreground">Nr konta:</strong><br />54 1020 1811 0000 0302 0073 4228</p>
              <a
                href="https://www.facebook.com/993254464036926?ref=embed_page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-primary-foreground hover:text-secondary transition-colors"
              >
                <Facebook className="h-5 w-5" /> Śledź nas na Facebooku
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Stowarzyszenie Walki z Rakiem Płuca. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/polityka-prywatnosci" className="hover:text-primary-foreground">
              Polityka prywatności
            </Link>
            <span aria-hidden="true" className="text-primary-foreground/30">|</span>
            <Link to="/regulamin" className="hover:text-primary-foreground">
              Regulamin
            </Link>
            <span aria-hidden="true" className="text-primary-foreground/30">|</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-preferences"))}
              className="hover:text-primary-foreground"
            >
              Ustawienia cookies
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 px-4 text-center text-[11px] tracking-wide text-primary-foreground/50">
        Projekt i wykonanie: Karolina Jędrzejewska |{" "}
        <a
          href="https://stronypro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-foreground/70 hover:text-secondary hover:underline underline-offset-2 transition-colors"
        >
          stronypro.com
        </a>{" "}
        (wolontariat)
      </div>
    </footer>
  );
};

export default Footer;
