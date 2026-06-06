import { Link } from "react-router-dom";
import { Newspaper, FileText, Image, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  { title: "Aktualności", desc: "Zarządzaj wpisami i publikuj na stronie", icon: Newspaper, path: "/admin/news" },
  { title: "Strony", desc: "Edytuj treść stron statycznych", icon: FileText, path: "/admin/pages" },
  { title: "Media", desc: "Biblioteka zdjęć i plików", icon: Image, path: "/admin/media" },
  { title: "Wiadomości", desc: "Wiadomości z formularza kontaktowego", icon: Mail, path: "/admin/contacts" },
];

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Panel zarządzania</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.path} to={c.path}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <c.icon className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
