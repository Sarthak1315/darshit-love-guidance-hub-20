
-- Add mobile and email columns to the payment_submissions table
ALTER TABLE public.payment_submissions 
ADD COLUMN mobile TEXT,
ADD COLUMN email TEXT;
