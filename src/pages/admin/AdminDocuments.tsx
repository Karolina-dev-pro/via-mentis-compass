import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Doc = Tables<"documents">;

const emptyForm = { title: "", title_en: "", title_ua: "", file_url: "", description: "", description_en: "", description_ua: "", published: true };

export default function AdminDocuments() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Doc | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const { data: docs, isLoading } = useQuery({
    queryKey: ["admin-documents"],
    queryFn: async () => {
      const { data, error } = await supabase.from("documents").select("*").order("published_date", { ascending: false });
      if (error) throw error;
      return data as Doc[];
    },
  });

  const upsert = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        title_en: form.title_en || null,
        title_ua: form.title_ua || null,
        file_url: form.file_url,
        description: form.description,
        description_en: form.description_en || null,
        description_ua: form.description_ua || null,
        published: form.published,
      };
      if (editing) {
        const { error } = await supabase.from("documents").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("documents").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-documents"] }); toast({ title: editing ? "Zaktualizowano" : "Dodano" }); closeForm(); },
    onError: (e: Error) => toast({ title: "Błąd", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-documents"] }); toast({ title: "Usunięto" }); },
  });

  const openEdit = (d: Doc) => {
    setEditing(d);
    setForm({
      title: d.title,
      title_en: (d as any).title_en ?? "",
      title_ua: (d as any).title_ua ?? "",
      file_url: d.file_url,
      description: d.description ?? "",
      description_en: (d as any).description_en ?? "",
      description_ua: (d as any).description_ua ?? "",
      published: d.published,
    });
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dokumenty</h1>
        {!showForm && <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> Dodaj dokument</Button>}
      </div>

      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{editing ? "Edytuj" : "Nowy dokument"}</h2>
            <Button variant="ghost" size="icon" onClick={closeForm}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Tytuł (PL)</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>URL pliku (PDF)</Label><Input value={form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Tytuł (EN)</Label><Input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} placeholder="English title" /></div>
            <div><Label>Tytuł (UA)</Label><Input value={form.title_ua} onChange={(e) => setForm({ ...form, title_ua: e.target.value })} placeholder="Український заголовок" /></div>
          </div>
          <div><Label>Opis (PL)</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Opis (EN)</Label><Textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={2} placeholder="English description" /></div>
            <div><Label>Opis (UA)</Label><Textarea value={form.description_ua} onChange={(e) => setForm({ ...form, description_ua: e.target.value })} rows={2} placeholder="Український опис" /></div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
            <Label>Opublikowany</Label>
          </div>
          <Button onClick={() => upsert.mutate()} disabled={upsert.isPending || !form.title || !form.file_url}>
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
                <th className="p-3">URL</th>
                <th className="p-3">Status</th>
                <th className="p-3 w-24">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {docs?.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="p-3 font-medium">{d.title}</td>
                  <td className="p-3 text-muted-foreground truncate max-w-xs">{d.file_url}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${d.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {d.published ? "Opublikowany" : "Szkic"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(d)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {docs?.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Brak dokumentów</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
