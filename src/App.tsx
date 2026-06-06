import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import ONas from "./pages/ONas";
import RakPluca from "./pages/RakPluca";
import Profilaktyka from "./pages/Profilaktyka";
import Aktualnosci from "./pages/Aktualnosci";
import AktualnosciDetail from "./pages/AktualnosciDetail";
import Galeria from "./pages/Galeria";
import Kontakt from "./pages/Kontakt";
import JedenProcent from "./pages/JedenProcent";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import Regulamin from "./pages/Regulamin";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNews from "./pages/admin/AdminNews";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminContacts from "./pages/admin/AdminContacts";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route element={<Layout><Index /></Layout>} path="/" />
              <Route element={<Layout><ONas /></Layout>} path="/o-nas" />
              <Route element={<Layout><RakPluca /></Layout>} path="/rak-pluca" />
              <Route element={<Layout><Profilaktyka /></Layout>} path="/profilaktyka" />
              <Route element={<Layout><Aktualnosci /></Layout>} path="/aktualnosci" />
              <Route element={<Layout><AktualnosciDetail /></Layout>} path="/aktualnosci/:slug" />
              <Route element={<Layout><Galeria /></Layout>} path="/galeria" />
              <Route element={<Layout><Kontakt /></Layout>} path="/kontakt" />
              <Route element={<Layout><JedenProcent /></Layout>} path="/1-procent" />
              <Route element={<Layout><PolitykaPrywatnosci /></Layout>} path="/polityka-prywatnosci" />
              <Route element={<Layout><Regulamin /></Layout>} path="/regulamin" />

              {/* Admin login (no layout) */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin panel (protected) */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>

              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
