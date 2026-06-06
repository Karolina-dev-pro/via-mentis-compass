import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/seo/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Strona nie znaleziona (404)"
        description="Strona, której szukasz, nie istnieje. Wróć na stronę główną Stowarzyszenia Walki z Rakiem Płuca."
        path={location.pathname}
      />
      <div className="flex min-h-[60vh] items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">Strona nie została znaleziona</p>
          <Link to="/" className="text-primary underline hover:text-primary/90 text-lg">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
