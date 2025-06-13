
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentVerification {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  submissionId: string;
}

interface PaymentFailure {
  order_id: string;
  payment_id?: string;
  error_description: string;
  submissionId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Payment verification request:', body);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (body.type === 'success') {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature, submissionId }: PaymentVerification = body;

      // Verify payment signature
      const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
      if (!razorpayKeySecret) {
        throw new Error('Razorpay secret not configured');
      }

      // Create signature verification
      const crypto = await import('node:crypto');
      const generated_signature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

      const isSignatureValid = generated_signature === razorpay_signature;
      console.log('Signature valid:', isSignatureValid);

      // Update payment submission
      const { data, error: dbError } = await supabase
        .from('payment_submissions')
        .update({
          payment_status: isSignatureValid ? 'success' : 'failed',
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          failure_reason: isSignatureValid ? null : 'Invalid signature',
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Payment submission updated:', data.id);

      return new Response(JSON.stringify({
        success: true,
        verified: isSignatureValid,
        submission: data
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });

    } else if (body.type === 'failure') {
      const { order_id, payment_id, error_description, submissionId }: PaymentFailure = body;

      // Update payment submission with failure
      const { data, error: dbError } = await supabase
        .from('payment_submissions')
        .update({
          payment_status: 'failed',
          payment_id: payment_id || null,
          failure_reason: error_description,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Payment failure recorded:', data.id);

      return new Response(JSON.stringify({
        success: true,
        submission: data
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    throw new Error('Invalid request type');

  } catch (error: any) {
    console.error('Error in verify-payment function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
