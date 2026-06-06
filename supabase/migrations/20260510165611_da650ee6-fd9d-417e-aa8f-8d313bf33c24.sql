-- Gallery: admin write + admin read-all
CREATE POLICY "Admins can read all gallery_images"
  ON public.gallery_images FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert gallery_images"
  ON public.gallery_images FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery_images"
  ON public.gallery_images FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery_images"
  ON public.gallery_images FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Explicit restrictive policy on user_roles to block any non-admin INSERT path
CREATE POLICY "Only admins may insert roles"
  ON public.user_roles AS RESTRICTIVE
  FOR INSERT TO authenticated, anon
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins may update roles"
  ON public.user_roles AS RESTRICTIVE
  FOR UPDATE TO authenticated, anon
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins may delete roles"
  ON public.user_roles AS RESTRICTIVE
  FOR DELETE TO authenticated, anon
  USING (public.has_role(auth.uid(), 'admin'));