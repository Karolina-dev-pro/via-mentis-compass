import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type News = Tables<"news">;

const emptyForm = {
  title: "", slug: "", excerpt: "", body: "", category: "", published: false,
  title_en: "", title_ua: "", excerpt_en: "", excerpt_ua: "",
  body_en: "", body_ua: "", category_en: "", category_ua: "",
};

export default function AdminNews() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<News | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const { data: news, isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data as News[];
    },
  });

  const upsert = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        excerpt: form.excerpt, body: form.body, category: form.category, published: form.published,
        title_en: form.title_en || null, title_ua: form.title_ua || null,
        excerpt_en: form.excerpt_en || null, excerpt_ua: form.excerpt_ua || null,
        body_en: form.body_en || null, body_ua: form.body_ua || null,
        category_en: form.category_en || null, category_ua: form.category_ua || null,
      };
      if (editing) {
        const { error } = await supabase.from("news").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-news"] });
      toast({ title: editing ? "Zaktualizowano" : "Dodano" });
      closeForm();
    },
    onError: (e: Error) => toast({ title: "Błąd", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-news"] }); toast({ title: "Usunięto" }); },
  });

  const openEdit = (n: News) => {
    setEditing(n);
    setForm({
      title: n.title, slug: n.slug, excerpt: n.excerpt ?? "", body: n.body ?? "",
      category: n.category ?? "", published: n.published,
      title_en: (n as any).title_en ?? "", title_ua: (n as any).title_ua ?? "",
      excerpt_en: (n as any).excerpt_en ?? "", excerpt_ua: (n as any).excerpt_ua ?? "",
      body_en: (n as any).body_en ?? "", body_ua: (n as any).body_ua ?? "",
      category_en: (n as any).category_en ?? "", category_ua: (n as any).category_ua ?? "",
    });
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm); };

  const f = (key: keyof typeof form, value: string | boolean) => setForm({ ...form, [key]: value });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Aktualności</h1>
        {!showForm && <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> Dodaj wpis</Button>}
      </div>

      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{editing ? "Edytuj wpis" : "Nowy wpis"}</h2>
            <Button variant="ghost" size="icon" onClick={closeForm}><X className="h-4 w-4" /></Button>
          </div>

          <Tabs defaultValue="pl">
            <TabsList>
              <TabsTrigger value="pl">🇵🇱 Polski</TabsTrigger>
              <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              <TabsTrigger value="ua">🇺🇦 Українська</TabsTrigger>
            </TabsList>

            <TabsContent value="pl" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Tytuł (PL)</Label><Input value={form.title} onChange={(e) => f("title", e.target.value)} /></div>
                <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => f("slug", e.target.value)} placeholder="auto-generowany" /></div>
                <div><Label>Kategoria (PL)</Label><Input value={form.category} onChange={(e) => f("category", e.target.value)} /></div>
              </div>
              <div><Label>Skrót (PL)</Label><Textarea value={form.excerpt} onChange={(e) => f("excerpt", e.target.value)} rows={2} /></div>
              <div><Label>Treść (PL)</Label><Textarea value={form.body} onChange={(e) => f("body", e.target.value)} rows={8} /></div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Title (EN)</Label><Input value={form.title_en} onChange={(e) => f("title_en", e.target.value)} /></div>
                <div><Label>Category (EN)</Label><Input value={form.category_en} onChange={(e) => f("category_en", e.target.value)} /></div>
              </div>
              <div><Label>Excerpt (EN)</Label><Textarea value={form.excerpt_en} onChange={(e) => f("excerpt_en", e.target.value)} rows={2} /></div>
              <div><Label>Body (EN)</Label><Textarea value={form.body_en} onChange={(e) => f("body_en", e.target.value)} rows={8} /></div>
            </TabsContent>

            <TabsContent value="ua" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Заголовок (UA)</Label><Input value={form.title_ua} onChange={(e) => f("title_ua", e.target.value)} /></div>
                <div><Label>Категорія (UA)</Label><Input value={form.category_ua} onChange={(e) => f("category_ua", e.target.value)} /></div>
              </div>
              <div><Label>Витяг (UA)</Label><Textarea value={form.excerpt_ua} onChange={(e) => f("excerpt_ua", e.target.value)} rows={2} /></div>
              <div><Label>Зміст (UA)</Label><Textarea value={form.body_ua} onChange={(e) => f("body_ua", e.target.value)} rows={8} /></div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(v) => f("published", v)} />
            <Label>Opublikowany</Label>
          </div>
          <Button onClick={() => upsert.mutate()} disabled={upsert.isPending || !form.title}>
            {upsert.isPending ? "Zapisywanie…" : "Zapisz"}
          </Button>
        </div>
      )}

      {isLoading ? <p>Ładowanie…</p> : (
        <div className="bg-background border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Tytuł</th>
                <th className="p-3">Kategoria</th>
                <th className="p-3">Data</th>
                <th className="p-3">Status</th>
                <th className="p-3 w-24">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {news?.map((n) => (
                <tr key={n.id} className="border-t">
                  <td className="p-3 font-medium">{n.title}</td>
                  <td className="p-3 text-muted-foreground">{n.category || "-"}</td>
                  <td className="p-3 text-muted-foreground">{n.date}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${n.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {n.published ? "Opublikowany" : "Szkic"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(n)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(n.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {news?.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Brak wpisów</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
