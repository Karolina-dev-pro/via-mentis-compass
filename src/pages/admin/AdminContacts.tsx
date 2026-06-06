import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen } from "lucide-react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean | null;
  created_at: string;
};

const AdminContacts = () => {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, is_read: true } : i));
  };

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
    const item = items.find((i) => i.id === id);
    if (item && !item.is_read) markAsRead(id);
  };

  const unreadCount = items.filter((i) => !i.is_read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Wiadomości {unreadCount > 0 && <Badge className="ml-2">{unreadCount} nowych</Badge>}
        </h2>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Ładowanie...</p>
      ) : items.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Brak wiadomości.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className={item.is_read ? "" : "border-primary/30 bg-primary/5"}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(item.id)}>
                  <div className="flex items-center gap-3 min-w-0">
                    {item.is_read ? <MailOpen className="h-4 w-4 text-muted-foreground shrink-0" /> : <Mail className="h-4 w-4 text-primary shrink-0" />}
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground truncate">{item.subject}</h3>
                      <p className="text-xs text-muted-foreground">{item.name} · {item.email} · {new Date(item.created_at).toLocaleDateString("pl-PL")}</p>
                    </div>
                  </div>
                </div>

                {expanded === item.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <p className="text-sm"><strong>Od:</strong> {item.name} ({item.email})</p>
                    {item.phone && <p className="text-sm"><strong>Tel:</strong> {item.phone}</p>}
                    <p className="text-sm"><strong>Temat:</strong> {item.subject}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-2">{item.message}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}>Odpowiedz</a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
