import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLdOrganization />
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
