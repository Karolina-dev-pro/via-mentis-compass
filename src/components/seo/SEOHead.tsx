import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: string;
}

const SEOHead = ({
  title,
  description,
  path = "",
  ogImage = "/images/og-image.jpg",
  type = "website",
}: SEOHeadProps) => {
  const baseUrl = "https://www.rakpluca.org.pl";
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = title === "Stowarzyszenie Walki z Rakiem Płuca" ? title : `${title} | Stowarzyszenie Walki z Rakiem Płuca`;

  const isNoIndex = path.startsWith("/admin") || path.includes("404");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {isNoIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Stowarzyszenie Walki z Rakiem Płuca" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
    </Helmet>
  );
};

export default SEOHead;
