import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { tr } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{tr("not_found_desc")}</p>
        <a href="/" className="text-accent underline hover:text-accent/80">
          {tr("not_found_link")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
