import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
};

const AdminMedia = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
      if (uploadError) {
        toast({ title: "Błąd uploadu", description: uploadError.message, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);

      await supabase.from("media").insert({
        filename: file.name,
        url: urlData.publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user?.id || null,
      });
    }

    toast({ title: "Przesłano", description: `${files.length} plik(ów) dodanych.` });
    setUploading(false);
    fetchMedia();
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Usunąć "${item.filename}"?`)) return;
    // Extract path from URL
    const urlParts = item.url.split("/media/");
    if (urlParts[1]) {
      await supabase.storage.from("media").remove([urlParts[1]]);
    }
    await supabase.from("media").delete().eq("id", item.id);
    toast({ title: "Usunięto" });
    fetchMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "Skopiowano URL" });
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Biblioteka mediów</h2>
        <div>
          <input ref={fileRef} type="file" multiple accept="image/*,application/pdf" onChange={handleUpload} className="hidden" id="media-upload" />
          <Button onClick={() => fileRef.current?.click()} className="gap-2" disabled={uploading}>
            <Upload className="h-4 w-4" /> {uploading ? "Przesyłanie..." : "Dodaj pliki"}
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Ładowanie...</p>
      ) : items.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          Brak plików. Prześlij pierwszy!
        </CardContent></Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {item.mime_type?.startsWith("image/") ? (
                  <img src={item.url} alt={item.alt_text || item.filename} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                )}
              </div>
              <CardContent className="p-3">
                <p className="text-xs font-medium text-foreground truncate">{item.filename}</p>
                <p className="text-xs text-muted-foreground">{formatSize(item.size_bytes)}</p>
                <div className="flex gap-1 mt-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyUrl(item.url)}><Copy className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
