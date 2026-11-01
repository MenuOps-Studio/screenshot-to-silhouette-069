CREATE TABLE public.lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  source_page text CHECK (source_page IS NULL OR char_length(source_page) <= 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.lead_submissions TO service_role;

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: visitors cannot read, edit or delete leads.
-- Inserts happen from server code only.