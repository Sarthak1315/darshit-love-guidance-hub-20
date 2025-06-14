
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

// Enhanced input validation
const validateVerificationInput = (data: any): { isValid: boolean; error: string } => {
  if (data.type === 'success') {
    const required = ['razorpay_payment_id', 'razorpay_order_id', 'razorpay_signature', 'submissionId'];
    for (const field of required) {
      if (!data[field] || typeof data[field] !== 'string') {
        return { isValid: false, error: `Missing or invalid ${field}` };
      }
    }
    
    // Validate format of payment IDs
    if (!data.razorpay_payment_id.startsWith('pay_') || 
        !data.razorpay_order_id.startsWith('order_')) {
      return { isValid: false, error: 'Invalid payment ID format' };
    }
  } else if (data.type === 'failure') {
    if (!data.submissionId || typeof data.submissionId !== 'string') {
      return { isValid: false, error: 'Missing submission ID' };
    }
  } else {
    return { isValid: false, error: 'Invalid request type' };
  }
  
  return { isValid: true, error: '' };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Payment verification request type:', body.type);

    // Validate input
    const validation = validateVerificationInput(body);
    if (!validation.isValid) {
      console.error('Validation error:', validation.error);
      throw new Error(validation.error);
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (body.type === 'success') {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature, submissionId }: PaymentVerification = body;

      // Verify payment signature
      const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
      if (!razorpayKeySecret) {
        throw new Error('Payment verification service not configured');
      }

      // Create signature verification using crypto
      const encoder = new TextEncoder();
      const data = encoder.encode(razorpay_order_id + "|" + razorpay_payment_id);
      const key = encoder.encode(razorpayKeySecret);
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
      const generated_signature = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const isSignatureValid = generated_signature === razorpay_signature;
      console.log('Signature validation result:', isSignatureValid);

      // Update payment submission with enhanced error handling
      const { data: updateData, error: dbError } = await supabase
        .from('payment_submissions')
        .update({
          payment_status: isSignatureValid ? 'success' : 'failed',
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          failure_reason: isSignatureValid ? null : 'Invalid payment signature',
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (dbError) {
        console.error('Database error during update:', dbError);
        throw new Error('Failed to update payment status');
      }

      console.log('Payment verification completed for submission:', updateData.id);

      return new Response(JSON.stringify({
        success: true,
        verified: isSignatureValid,
        submission: updateData
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });

    } else if (body.type === 'failure') {
      const { order_id, payment_id, error_description, submissionId }: PaymentFailure = body;

      // Sanitize error description
      const sanitizedErrorDescription = error_description ? 
        error_description.replace(/[<>"\';\\]/g, '').substring(0, 200) : 
        'Payment failed';

      // Update payment submission with failure
      const { data: updateData, error: dbError } = await supabase
        .from('payment_submissions')
        .update({
          payment_status: 'failed',
          payment_id: payment_id || null,
          failure_reason: sanitizedErrorDescription,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (dbError) {
        console.error('Database error during failure update:', dbError);
        throw new Error('Failed to update payment failure status');
      }

      console.log('Payment failure recorded for submission:', updateData.id);

      return new Response(JSON.stringify({
        success: true,
        submission: updateData
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
    
    // Return user-friendly error message
    const userMessage = error.message.includes('Missing') || error.message.includes('Invalid') 
      ? 'Invalid payment verification request' 
      : 'Payment verification service temporarily unavailable';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: userMessage
      }),
      {
        status: 400,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
