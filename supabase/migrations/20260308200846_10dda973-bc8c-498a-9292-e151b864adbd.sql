
-- Allow authenticated users to manage news
CREATE POLICY "Authenticated users can insert news" ON public.news FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update news" ON public.news FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete news" ON public.news FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated users can read all news" ON public.news FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to manage team_members
CREATE POLICY "Authenticated users can insert team_members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update team_members" ON public.team_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete team_members" ON public.team_members FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated users can read all team_members" ON public.team_members FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to manage documents
CREATE POLICY "Authenticated users can insert documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update documents" ON public.documents FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete documents" ON public.documents FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated users can read all documents" ON public.documents FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to read contact submissions
CREATE POLICY "Authenticated users can read contact submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete contact submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (true);
