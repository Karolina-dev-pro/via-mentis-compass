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
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useRef } from "react";

type News = Database["public"]["Tables"]["news"]["Row"];

const AdminNews = () => {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const ext = file.name.split(".").pop();
    const path = `news/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      toast({ title: "Błąd uploadu", description: uploadError.message, variant: "destructive" });
      setUploadingImage(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setFeaturedImage(urlData.publicUrl);
    setUploadingImage(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const generateSlug = (text: string) =>
    text.toLowerCase()
      .replace(/[ąàáâãäå]/g, "a").replace(/[ćčç]/g, "c").replace(/[ęèéêë]/g, "e")
      .replace(/[ìíîï]/g, "i").replace(/[łl]/g, "l").replace(/[ńñ]/g, "n")
      .replace(/[óòôõö]/g, "o").replace(/[śšş]/g, "s").replace(/[ùúûü]/g, "u")
      .replace(/[żźž]/g, "z").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const resetForm = () => {
    setTitle(""); setSlug(""); setExcerpt(""); setContent("");
    setCategory(""); setFeaturedImage(""); setIsFeatured(false); setIsPublished(false);
    setEditing(null);
  };

  const openEdit = (item: News) => {
    setEditing(item);
    setTitle(item.title);
    setSlug(item.slug);
    setExcerpt(item.excerpt || "");
    setContent(item.content);
    setCategory(item.category || "");
    setFeaturedImage(item.featured_image || "");
    setIsFeatured(item.is_featured || false);
    setIsPublished(item.is_published || false);
    setDialogOpen(true);
  };

  const openNew = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title || !content) {
      toast({ title: "Błąd", description: "Tytuł i treść są wymagane", variant: "destructive" });
      return;
    }

    const finalSlug = slug || generateSlug(title);
    const payload = {
      title, slug: finalSlug, excerpt: excerpt || null, content,
      category: category || null,
      featured_image: featuredImage || null,
      is_featured: isFeatured, is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      author_id: user?.id || null,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("news").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("news").insert(payload));
    }

    if (error) {
      toast({ title: "Błąd", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing ? "Zaktualizowano" : "Dodano", description: `Wpis "${title}" zapisany.` });
      setDialogOpen(false);
      resetForm();
      fetchNews();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten wpis?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      toast({ title: "Błąd", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Usunięto" });
      fetchNews();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Aktualności</h2>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Nowy wpis</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Ładowanie...</p>
      ) : items.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Brak wpisów. Dodaj pierwszy!</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {item.featured_image && (
                    <img src={item.featured_image} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.is_published ? (
                        <Eye className="h-4 w-4 text-secondary" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <h3 className="font-bold text-foreground truncate">{item.title}</h3>
                      {item.is_featured && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Wyróżniony</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString("pl-PL")}
                      {item.category && ` · ${item.category}`}
                    </p>
                  </div>
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

      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edytuj wpis" : "Nowy wpis"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tytuł *</Label>
              <Input value={title} onChange={(e) => { setTitle(e.target.value); if (!editing) setSlug(generateSlug(e.target.value)); }} className="mt-1" />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1" placeholder="auto-generowany" />
            </div>
            <div>
              <Label>Skrót</Label>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="mt-1" />
            </div>
            <div>
              <Label>Obrazek wyróżniający</Label>
              {featuredImage ? (
                <div className="mt-1 relative inline-block">
                  <img src={featuredImage} alt="Podgląd" className="max-h-40 rounded object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => setFeaturedImage("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="mt-1">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="featured-image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    <Upload className="h-4 w-4" />
                    {uploadingImage ? "Przesyłanie..." : "Wybierz obrazek"}
                  </Button>
                </div>
              )}
            </div>
            <div>
              <Label>Treść *</Label>
              <div className="mt-1">
                <WysiwygEditor content={content} onChange={setContent} placeholder="Treść wpisu..." />
              </div>
            </div>
            <div>
              <Label>Kategoria</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={isPublished} onCheckedChange={setIsPublished} id="published" />
                <Label htmlFor="published">Opublikowany</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} id="featured" />
                <Label htmlFor="featured">Wyróżniony na stronie głównej</Label>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>Anuluj</Button>
              <Button onClick={handleSave}>{editing ? "Zapisz zmiany" : "Dodaj wpis"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNews;
