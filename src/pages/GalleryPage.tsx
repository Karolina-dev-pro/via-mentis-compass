import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";
import img00 from "@/assets/gallery/alians-przeciwko-depresji-via-mentis.webp";
import img01 from "@/assets/gallery/eph-helsinki-2025_4.webp";
import img02 from "@/assets/gallery/eph-helsinki-2025_6.webp";
import img03 from "@/assets/gallery/eph-helsinki-2025_7.webp";
import img04 from "@/assets/gallery/eph-helsinki-2025_8.webp";
import img05 from "@/assets/gallery/eph-helsinki-2025_9.webp";
import img06 from "@/assets/gallery/eph-helsinki-2025_12.webp";
import img07 from "@/assets/gallery/fundacja-via-mentis-psycholog-minsk.webp";
import img08 from "@/assets/gallery/konferencja-zycie_warte.webp";
import img09 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_0.webp";
import img10 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_1.webp";
import img11 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_2.webp";
import img12 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_3.webp";
import img13 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_4.webp";
import img14 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_5.webp";
import img15 from "@/assets/gallery/via-mentis-fundacja-minsk-depresja_7.webp";
import img16 from "@/assets/gallery/via-mentis-minsk-mazowiecki_1.webp";
import img17 from "@/assets/gallery/via-mentis-minsk-mazowiecki_2.webp";

const images = [
  { src: img00, name: "alians-przeciwko-depresji-via-mentis" },
  { src: img01, name: "eph-helsinki-2025_4" },
  { src: img02, name: "eph-helsinki-2025_6" },
  { src: img03, name: "eph-helsinki-2025_7" },
  { src: img04, name: "eph-helsinki-2025_8" },
  { src: img05, name: "eph-helsinki-2025_9" },
  { src: img06, name: "eph-helsinki-2025_12" },
  { src: img07, name: "fundacja-via-mentis-psycholog-minsk" },
  { src: img08, name: "konferencja-zycie_warte" },
  { src: img09, name: "via-mentis-fundacja-minsk-depresja_0" },
  { src: img10, name: "via-mentis-fundacja-minsk-depresja_1" },
  { src: img11, name: "via-mentis-fundacja-minsk-depresja_2" },
  { src: img12, name: "via-mentis-fundacja-minsk-depresja_3" },
  { src: img13, name: "via-mentis-fundacja-minsk-depresja_4" },
  { src: img14, name: "via-mentis-fundacja-minsk-depresja_5" },
  { src: img15, name: "via-mentis-fundacja-minsk-depresja_7" },
  { src: img16, name: "via-mentis-minsk-mazowiecki_1" },
  { src: img17, name: "via-mentis-minsk-mazowiecki_2" },
];

export default function GalleryPage() {
  const { tr } = useLang();
  const title = tr("nav_gallery");
  return (
    <>
      <Helmet>
        <title>{title} - Fundacja Via Mentis</title>
        <meta name="description" content="Fundacja Via Mentis - pomoc psychologiczna dla dzieci i młodzieży" />
        <link rel="canonical" href="https://viamentis.pl/galeria" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <a
                key={img.name}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg bg-muted aspect-[4/3] group"
              >
                <img
                  src={img.src}
                  alt={img.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="h-14 lg:hidden" />
    </>
  );
}
