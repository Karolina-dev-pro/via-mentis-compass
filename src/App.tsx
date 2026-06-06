import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import NewsPage from "./pages/NewsPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import DocumentsPage from "./pages/DocumentsPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNews from "./pages/admin/AdminNews";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminContacts from "./pages/admin/AdminContacts";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public site */}
              <Route element={<Layout><HomePage /></Layout>} path="/" />
              <Route element={<Layout><AboutPage /></Layout>} path="/o-fundacji" />
              <Route element={<Layout><ServicesPage /></Layout>} path="/oferta" />
              <Route element={<Layout><TeamPage /></Layout>} path="/zespol" />
              <Route element={<Layout><NewsPage /></Layout>} path="/aktualnosci" />
              <Route element={<Layout><GalleryPage /></Layout>} path="/galeria" />
              <Route element={<Layout><ContactPage /></Layout>} path="/kontakt" />
              <Route element={<Layout><DocumentsPage /></Layout>} path="/dokumenty" />
              <Route element={<Layout><PrivacyPage /></Layout>} path="/polityka-prywatnosci" />
              <Route element={<Layout><TermsPage /></Layout>} path="/regulamin" />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="aktualnosci" element={<AdminNews />} />
                <Route path="zespol" element={<AdminTeam />} />
                <Route path="dokumenty" element={<AdminDocuments />} />
                <Route path="wiadomosci" element={<AdminContacts />} />
              </Route>

              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
