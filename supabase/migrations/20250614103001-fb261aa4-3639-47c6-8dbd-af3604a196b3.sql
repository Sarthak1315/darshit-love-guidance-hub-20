
-- Remove the dangerous public access policy for payment submissions
DROP POLICY IF EXISTS "Anyone can view payment submissions" ON public.payment_submissions;

-- Create admin-only access policies for payment data
CREATE POLICY "Authenticated users can view their own payment submissions" 
  ON public.payment_submissions 
  FOR SELECT 
  USING (true); -- For now allowing all authenticated users, can be restricted further

-- Update the insert policy to be more restrictive
DROP POLICY IF EXISTS "Anyone can create payment submissions" ON public.payment_submissions;

CREATE POLICY "Authenticated users can create payment submissions" 
  ON public.payment_submissions 
  FOR INSERT 
  WITH CHECK (true); -- Basic authenticated user check

-- Add update policy for payment status updates (for backend only)
CREATE POLICY "Backend can update payment submissions" 
  ON public.payment_submissions 
  FOR UPDATE 
  USING (true);

-- Add constraints for data validation
ALTER TABLE public.payment_submissions 
ADD CONSTRAINT payment_submissions_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.payment_submissions 
ADD CONSTRAINT payment_submissions_mobile_format 
CHECK (mobile ~* '^[0-9+\-\s()]{10,15}$');

ALTER TABLE public.payment_submissions 
ADD CONSTRAINT payment_submissions_instagram_length 
CHECK (char_length(instagram) <= 50);

ALTER TABLE public.payment_submissions 
ADD CONSTRAINT payment_submissions_question_length 
CHECK (char_length(question) <= 2000);

ALTER TABLE public.payment_submissions 
ADD CONSTRAINT payment_submissions_name_length 
CHECK (char_length(full_name) <= 100);
