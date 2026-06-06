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

type Member = Tables<"team_members">;

const emptyForm = {
  name: "", position: "", bio: "", photo: "", sort_order: 0, published: true,
  position_en: "", position_ua: "", bio_en: "", bio_ua: "",
};

export default function AdminTeam() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const { data: members, isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order");
      if (error) throw error;
      return data as Member[];
    },
  });

  const upsert = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name, position: form.position, bio: form.bio,
        photo: form.photo, sort_order: form.sort_order, published: form.published,
        position_en: form.position_en || null, position_ua: form.position_ua || null,
        bio_en: form.bio_en || null, bio_ua: form.bio_ua || null,
      };
      if (editing) {
        const { error } = await supabase.from("team_members").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast({ title: editing ? "Zaktualizowano" : "Dodano" }); closeForm(); },
    onError: (e: Error) => toast({ title: "Błąd", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast({ title: "Usunięto" }); },
  });

  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({
      name: m.name, position: m.position ?? "", bio: m.bio ?? "",
      photo: m.photo ?? "", sort_order: m.sort_order, published: m.published,
      position_en: (m as any).position_en ?? "", position_ua: (m as any).position_ua ?? "",
      bio_en: (m as any).bio_en ?? "", bio_ua: (m as any).bio_ua ?? "",
    });
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm); };

  const f = (key: keyof typeof form, value: string | boolean | number) => setForm({ ...form, [key]: value });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Zespół</h1>
        {!showForm && <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> Dodaj osobę</Button>}
      </div>

      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{editing ? "Edytuj" : "Nowa osoba"}</h2>
            <Button variant="ghost" size="icon" onClick={closeForm}><X className="h-4 w-4" /></Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Imię i nazwisko</Label><Input value={form.name} onChange={(e) => f("name", e.target.value)} /></div>
            <div><Label>URL zdjęcia</Label><Input value={form.photo} onChange={(e) => f("photo", e.target.value)} /></div>
            <div><Label>Kolejność</Label><Input type="number" value={form.sort_order} onChange={(e) => f("sort_order", Number(e.target.value))} /></div>
          </div>

          <Tabs defaultValue="pl">
            <TabsList>
              <TabsTrigger value="pl">🇵🇱 Polski</TabsTrigger>
              <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              <TabsTrigger value="ua">🇺🇦 Українська</TabsTrigger>
            </TabsList>

            <TabsContent value="pl" className="space-y-4 mt-4">
              <div><Label>Stanowisko (PL)</Label><Input value={form.position} onChange={(e) => f("position", e.target.value)} /></div>
              <div><Label>Bio (PL)</Label><Textarea value={form.bio} onChange={(e) => f("bio", e.target.value)} rows={4} /></div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4 mt-4">
              <div><Label>Position (EN)</Label><Input value={form.position_en} onChange={(e) => f("position_en", e.target.value)} /></div>
              <div><Label>Bio (EN)</Label><Textarea value={form.bio_en} onChange={(e) => f("bio_en", e.target.value)} rows={4} /></div>
            </TabsContent>

            <TabsContent value="ua" className="space-y-4 mt-4">
              <div><Label>Посада (UA)</Label><Input value={form.position_ua} onChange={(e) => f("position_ua", e.target.value)} /></div>
              <div><Label>Біографія (UA)</Label><Textarea value={form.bio_ua} onChange={(e) => f("bio_ua", e.target.value)} rows={4} /></div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(v) => f("published", v)} />
            <Label>Opublikowany</Label>
          </div>
          <Button onClick={() => upsert.mutate()} disabled={upsert.isPending || !form.name}>
            {upsert.isPending ? "Zapisywanie…" : "Zapisz"}
          </Button>
        </div>
      )}

      {isLoading ? <p>Ładowanie…</p> : (
        <div className="bg-background border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Imię i nazwisko</th>
                <th className="p-3">Stanowisko</th>
                <th className="p-3">Kolejność</th>
                <th className="p-3">Status</th>
                <th className="p-3 w-24">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {members?.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 text-muted-foreground">{m.position || "-"}</td>
                  <td className="p-3 text-muted-foreground">{m.sort_order}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${m.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {m.published ? "Widoczny" : "Ukryty"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(m)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {members?.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Brak członków zespołu</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
