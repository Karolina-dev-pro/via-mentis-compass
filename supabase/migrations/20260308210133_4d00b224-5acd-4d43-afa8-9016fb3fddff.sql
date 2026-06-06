-- Drop the overly permissive policy
DROP POLICY "Anyone can submit contact" ON public.contact_messages;

-- Create a more specific policy that still allows public submissions
-- but limits what can be inserted
CREATE POLICY "Anyone can submit contact form" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND
    email IS NOT NULL AND
    subject IS NOT NULL AND
    message IS NOT NULL AND
    length(name) <= 100 AND
    length(email) <= 255 AND
    length(subject) <= 200 AND
    length(message) <= 5000
  );