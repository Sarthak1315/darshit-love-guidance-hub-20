
-- Create a table for payment submissions
CREATE TABLE public.payment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  instagram TEXT NOT NULL,
  question TEXT NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('success', 'failed', 'pending')),
  payment_id TEXT,
  order_id TEXT,
  amount INTEGER NOT NULL DEFAULT 500,
  currency TEXT NOT NULL DEFAULT 'INR',
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  razorpay_signature TEXT,
  failure_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making it public for now since no auth is implemented
ALTER TABLE public.payment_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert payment submissions
CREATE POLICY "Anyone can create payment submissions" 
  ON public.payment_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to view payment submissions (you may want to restrict this later)
CREATE POLICY "Anyone can view payment submissions" 
  ON public.payment_submissions 
  FOR SELECT 
  USING (true);
