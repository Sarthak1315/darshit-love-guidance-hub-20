
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

// Enhanced input validation
const validateInput = (data: OrderRequest): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate full name
  if (!data.fullName || data.fullName.trim().length < 2 || data.fullName.length > 100) {
    errors.push('Full name must be between 2 and 100 characters');
  }
  
  // Validate email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!data.email || !emailRegex.test(data.email) || data.email.length > 254) {
    errors.push('Valid email address is required');
  }
  
  // Validate mobile
  const mobileRegex = /^[0-9+\-\s()]{10,15}$/;
  if (!data.mobile || !mobileRegex.test(data.mobile)) {
    errors.push('Valid mobile number is required (10-15 digits)');
  }
  
  // Validate instagram
  if (!data.instagram || data.instagram.length > 50) {
    errors.push('Instagram username is required and must be less than 50 characters');
  }
  
  // Validate question
  if (!data.question || data.question.length < 10 || data.question.length > 2000) {
    errors.push('Question must be between 10 and 2000 characters');
  }
  
  // Check for suspicious content
  const suspiciousPattern = /[<>"\';\\]/;
  if ([data.fullName, data.email, data.mobile, data.instagram, data.question].some(field => 
    suspiciousPattern.test(field))) {
    errors.push('Input contains invalid characters');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Sanitize input data
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/["\';]/g, '') // Remove quotes
    .trim();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData: OrderRequest = await req.json();
    
    // Validate input
    const validation = validateInput(rawData);
    if (!validation.isValid) {
      console.error('Input validation failed:', validation.errors);
      throw new Error(`Invalid input: ${validation.errors.join(', ')}`);
    }
    
    // Sanitize input data
    const { fullName, email, mobile, instagram, question } = {
      fullName: sanitizeInput(rawData.fullName),
      email: sanitizeInput(rawData.email),
      mobile: sanitizeInput(rawData.mobile),
      instagram: sanitizeInput(rawData.instagram),
      question: sanitizeInput(rawData.question)
    };
    
    console.log('Creating Razorpay order for validated user:', { fullName, email, mobile, instagram });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Razorpay credentials
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    console.log('Razorpay Key ID available:', !!razorpayKeyId);
    console.log('Razorpay Key Secret available:', !!razorpayKeySecret);

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('Razorpay credentials missing');
      throw new Error('Payment service configuration error');
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
        question: question.substring(0, 100) // Limit note length for security
      }
    };

    console.log('Creating Razorpay order with validated data');

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
      const errorText = await razorpayResponse.text();
      console.error('Razorpay API error:', errorText);
      throw new Error('Payment service temporarily unavailable');
    }

    const order = await razorpayResponse.json();
    console.log('Razorpay order created successfully:', order.id);

    // Store initial payment submission with sanitized data
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
      throw new Error('Failed to save submission data');
    }

    console.log('Payment submission created successfully:', data.id);

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
    
    // Return user-friendly error messages without exposing system details
    const userMessage = error.message.includes('Invalid input') 
      ? error.message 
      : 'Service temporarily unavailable. Please try again later.';
    
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
