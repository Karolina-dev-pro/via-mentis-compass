import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Submission = Tables<"contact_submissions">;

export default function AdminContacts() {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Submission[];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-contacts"] }); toast({ title: "Usunięto" }); },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Wiadomości kontaktowe</h1>
      {isLoading ? <p>Ładowanie…</p> : (
        <div className="space-y-4">
          {submissions?.map((s) => (
            <div key={s.id} className="bg-background border rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.email} {s.phone && `• ${s.phone}`}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("pl-PL")}</span>
                  <Button variant="ghost" size="icon" onClick={() => remove.mutate(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
              {s.purpose && <p className="text-sm mb-2"><span className="font-medium">Cel:</span> {s.purpose}</p>}
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{s.message}</p>
            </div>
          ))}
          {submissions?.length === 0 && <p className="text-center text-muted-foreground py-8">Brak wiadomości</p>}
        </div>
      )}
    </div>
  );
}
