
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderRequest {
  fullName: string;
  email: string;
  mobile: string;
  instagram: string;
  question: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, mobile, instagram, question }: OrderRequest = await req.json();
    
    console.log('Creating Razorpay order for:', { fullName, email, mobile, instagram });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create Razorpay order
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured');
    }

    const orderData = {
      amount: 50000, // 500 INR in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        fullName,
        email,
        mobile,
        instagram,
        question: question.substring(0, 100) // Limit note length
      }
    };

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const error = await razorpayResponse.text();
      console.error('Razorpay order creation failed:', error);
      throw new Error(`Razorpay order creation failed: ${error}`);
    }

    const order = await razorpayResponse.json();
    console.log('Razorpay order created:', order.id);

    // Store initial payment submission with pending status
    const { data, error: dbError } = await supabase
      .from('payment_submissions')
      .insert({
        full_name: fullName,
        email,
        mobile,
        instagram,
        question,
        payment_status: 'pending',
        order_id: order.id,
        amount: 500,
        currency: 'INR'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('Payment submission created:', data.id);

    return new Response(JSON.stringify({
      success: true,
      order,
      submissionId: data.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in create-razorpay-order function:', error);
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
