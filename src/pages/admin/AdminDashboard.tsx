import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Users, FileText, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const { data: newsCount } = useQuery({
    queryKey: ["admin-news-count"],
    queryFn: async () => {
      const { count } = await supabase.from("news").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
  const { data: teamCount } = useQuery({
    queryKey: ["admin-team-count"],
    queryFn: async () => {
      const { count } = await supabase.from("team_members").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
  const { data: docsCount } = useQuery({
    queryKey: ["admin-docs-count"],
    queryFn: async () => {
      const { count } = await supabase.from("documents").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
  const { data: msgCount } = useQuery({
    queryKey: ["admin-msg-count"],
    queryFn: async () => {
      const { count } = await supabase.from("contact_submissions").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Aktualności", count: newsCount, icon: Newspaper },
    { label: "Członkowie zespołu", count: teamCount, icon: Users },
    { label: "Dokumenty", count: docsCount, icon: FileText },
    { label: "Wiadomości", count: msgCount, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background rounded-xl border p-5">
            <div className="flex items-center gap-3 mb-2">
              <s.icon className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-bold">{s.count ?? "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
