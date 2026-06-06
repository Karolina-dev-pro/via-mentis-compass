import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Users, FileText, MessageSquare, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_fundacja.png";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/aktualnosci", icon: Newspaper, label: "Aktualności" },
  { to: "/admin/zespol", icon: Users, label: "Zespół" },
  { to: "/admin/dokumenty", icon: FileText, label: "Dokumenty" },
  { to: "/admin/wiadomosci", icon: MessageSquare, label: "Wiadomości" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;
    try {
      const res = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) navigate("/admin/login");
        setLoading(false);
      });
      subscription = res.data.subscription;
    } catch (err) {
      console.error("Auth state subscribe failed:", err);
      setLoading(false);
      navigate("/admin/login");
    }
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) navigate("/admin/login");
      } catch (err) {
        console.error("getSession failed:", err);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    })();
    return () => subscription?.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Ładowanie…</div>;

  return (
    <div className="min-h-screen flex bg-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col shrink-0">
        <div className="p-4 border-b flex items-center gap-3">
          <img src={logo} alt="Via Mentis" className="h-8" />
          <span className="font-bold text-sm">Admin CMS</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Wyloguj się
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
