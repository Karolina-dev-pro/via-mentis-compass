import { Helmet } from "react-helmet-async";

const JsonLdOrganization = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stowarzyszenie Walki z Rakiem Płuca",
    url: "https://www.rakpluca.org.pl",
    logo: "https://www.rakpluca.org.pl/images/og-image.jpg",
    description: "Stowarzyszenie założone w 1994 roku, wspierające osoby chore na raka płuca i ich rodziny.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Rajska 6, Dom Technika NOT, II piętro, pokój 208",
      addressLocality: "Gdańsk",
      postalCode: "80-850",
      addressCountry: "PL",
    },
    telephone: "+48455405114",
    email: "stowarzyszenie@rakpluca.org.pl",
    sameAs: ["https://www.facebook.com/993254464036926"],
    foundingDate: "1994",
    nonprofitStatus: "Nonprofit501c3",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default JsonLdOrganization;
