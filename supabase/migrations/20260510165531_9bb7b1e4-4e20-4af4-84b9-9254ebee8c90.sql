DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit valid contact form"
  ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (
    consent = true
    AND length(btrim(name)) BETWEEN 2 AND 100
    AND length(btrim(message)) BETWEEN 5 AND 1000
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 255
    AND (phone IS NULL OR length(phone) <= 20)
    AND (purpose IS NULL OR length(purpose) <= 100)
  );