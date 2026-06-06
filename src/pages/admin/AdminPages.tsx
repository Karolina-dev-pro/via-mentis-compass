import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WysiwygEditor from "@/components/admin/WysiwygEditor";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Page = Database["public"]["Tables"]["pages"]["Row"];

const AdminPages = () => {
  const [items, setItems] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const fetchPages = async () => {
    setLoading(true);
    const { data } = await supabase.from("pages").select("*").order("title");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[ąàáâãäå]/g, "a").replace(/[ćčç]/g, "c").replace(/[ęèéêë]/g, "e")
      .replace(/[łl]/g, "l").replace(/[ńñ]/g, "n").replace(/[óòôõö]/g, "o").replace(/[śšş]/g, "s")
      .replace(/[żźž]/g, "z").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const resetForm = () => {
    setTitle(""); setSlug(""); setContent(""); setMetaTitle(""); setMetaDescription(""); setIsPublished(true); setEditing(null);
  };

  const openEdit = (item: Page) => {
    setEditing(item); setTitle(item.title); setSlug(item.slug); setContent(item.content);
    setMetaTitle(item.meta_title || ""); setMetaDescription(item.meta_description || "");
    setIsPublished(item.is_published ?? true); setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title || !content) { toast({ title: "Błąd", description: "Tytuł i treść wymagane", variant: "destructive" }); return; }
    const payload = {
      title, slug: slug || generateSlug(title), content,
      meta_title: metaTitle || null, meta_description: metaDescription || null,
      is_published: isPublished, author_id: user?.id || null,
    };

    const { error } = editing
      ? await supabase.from("pages").update(payload).eq("id", editing.id)
      : await supabase.from("pages").insert(payload);

    if (error) { toast({ title: "Błąd", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Zapisano" }); setDialogOpen(false); resetForm(); fetchPages(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Usunąć tę stronę?")) return;
    await supabase.from("pages").delete().eq("id", id);
    toast({ title: "Usunięto" }); fetchPages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Strony</h2>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }} className="gap-2"><Plus className="h-4 w-4" /> Nowa strona</Button>
      </div>

      {loading ? <p className="text-muted-foreground">Ładowanie...</p> : items.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Brak stron.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {item.is_published ? <Eye className="h-4 w-4 text-secondary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    <h3 className="font-bold text-foreground truncate">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">/{item.slug}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edytuj stronę" : "Nowa strona"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Tytuł *</Label><Input value={title} onChange={(e) => { setTitle(e.target.value); if (!editing) setSlug(generateSlug(e.target.value)); }} className="mt-1" /></div>
            <div><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1" /></div>
            <div><Label>Treść *</Label><div className="mt-1"><WysiwygEditor content={content} onChange={setContent} placeholder="Treść strony..." /></div></div>
            <div><Label>Meta title</Label><Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="mt-1" /></div>
            <div><Label>Meta description</Label><Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} className="mt-1" /></div>
            <div className="flex items-center gap-2">
              <Switch checked={isPublished} onCheckedChange={setIsPublished} id="pub" />
              <Label htmlFor="pub">Opublikowana</Label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>Anuluj</Button>
              <Button onClick={handleSave}>Zapisz</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPages;
