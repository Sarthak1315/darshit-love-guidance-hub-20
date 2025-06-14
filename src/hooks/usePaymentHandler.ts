import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { paymentRateLimiter } from "@/utils/rateLimiter";
import { sanitizeInput } from "@/utils/formValidation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  fullName: string;
  email: string;
  mobile: string;
  instagram: string;
  question: string;
}

export const usePaymentHandler = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        console.log('Razorpay already loaded');
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay checkout script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay checkout script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentData: PaymentData) => {
    // Check rate limit first
    const userIdentifier = paymentData.email || paymentData.mobile;
    const rateLimitResult = paymentRateLimiter.recordAttempt(userIdentifier);
    
    if (!rateLimitResult.allowed) {
      const blockTimeMinutes = rateLimitResult.blockTimeMs ? Math.ceil(rateLimitResult.blockTimeMs / (1000 * 60)) : 60;
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${blockTimeMinutes} minutes before trying again to prevent abuse.`,
        variant: "destructive",
      });
      return;
    }

    if (rateLimitResult.remainingAttempts <= 1) {
      toast({
        title: "Rate Limit Warning",
        description: `You have ${rateLimitResult.remainingAttempts} attempt(s) remaining before being temporarily blocked.`,
        variant: "destructive",
      });
    }

    setLoading(true);

    try {
      console.log('Starting payment process for:', paymentData.fullName);

      // Sanitize all input data before processing
      const sanitizedData = {
        fullName: sanitizeInput(paymentData.fullName),
        email: sanitizeInput(paymentData.email),
        mobile: sanitizeInput(paymentData.mobile),
        instagram: sanitizeInput(paymentData.instagram),
        question: sanitizeInput(paymentData.question)
      };

      // Load Razorpay checkout script first
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay checkout script. Please check your internet connection.');
      }

      console.log('Creating order through Supabase edge function...');

      // Create order ONLY through Supabase edge function with sanitized data
      const { data: orderData, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: sanitizedData
      });

      console.log('Order creation response:', orderData);

      if (error) {
        console.error('Order creation error:', error);
        throw new Error('Payment service temporarily unavailable. Please try again later.');
      }

      if (!orderData?.success) {
        console.error('Order creation failed:', orderData);
        throw new Error('Unable to create payment order. Please verify your details and try again.');
      }

      const { order, submissionId } = orderData;
      console.log('Order created successfully. Opening Razorpay checkout modal...');

      if (!window.Razorpay) {
        throw new Error('Payment system not available. Please refresh the page and try again.');
      }

      // Configure Razorpay checkout modal with enhanced security
      const options = {
        key: 'rzp_test_jHo8JWCfGwxWrTk98Hp6xoDy', // Public key for checkout
        amount: order.amount,
        currency: order.currency,
        name: 'Darshit Korat',
        description: 'Personal Guidance Session - ₹500',
        image: '/lovable-uploads/793ac983-fcc0-4071-919c-9a5de291435e.png',
        order_id: order.id,
        prefill: {
          name: sanitizedData.fullName,
          email: sanitizedData.email,
          contact: sanitizedData.mobile,
        },
        theme: {
          color: '#ec4899'
        },
        // Disable retry to prevent additional API calls
        retry: {
          enabled: false
        },
        // Success handler - verify through Supabase ONLY
        handler: async function (response: any) {
          console.log('Payment completed successfully:', response);
          setLoading(false);
          
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                type: 'success',
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                submissionId
              }
            });

            console.log('Payment verification response:', verifyData);

            if (verifyError) {
              console.error('Payment verification error:', verifyError);
              toast({
                title: "Payment Verification Error",
                description: "Payment completed but verification failed. Please contact support with your payment ID.",
                variant: "destructive",
              });
              return;
            }

            if (verifyData?.success && verifyData?.verified) {
              toast({
                title: "Payment Successful! 🎉",
                description: "Thank you! Darshit will respond to your question within 24-48 hours.",
              });
            } else {
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support with your payment details for assistance.",
                variant: "destructive",
              });
            }
          } catch (verifyError: any) {
            console.error('Payment verification error:', verifyError);
            toast({
              title: "Payment Verification Error",
              description: "Payment completed but verification failed. Please save your payment ID and contact support.",
              variant: "destructive",
            });
          }
        },
        modal: {
          // Handle modal dismissal securely
          ondismiss: async function() {
            console.log('Payment modal dismissed by user');
            setLoading(false);
            
            try {
              await supabase.functions.invoke('verify-payment', {
                body: {
                  type: 'failure',
                  order_id: order.id,
                  error_description: 'Payment cancelled by user',
                  submissionId
                }
              });
            } catch (error) {
              console.error('Error recording payment cancellation:', error);
            }

            toast({
              title: "Payment Cancelled",
              description: "Payment was cancelled. You can try again anytime.",
              variant: "destructive",
            });
          },
          // Security settings
          escape: false,
          backdropclose: false
        }
      };

      console.log('Opening Razorpay checkout modal...');
      
      // Create and open Razorpay checkout
      const rzp = new window.Razorpay(options);
      
      // Handle payment failures securely
      rzp.on('payment.failed', async function (response: any) {
        console.log('Payment failed:', response.error);
        setLoading(false);
        
        try {
          await supabase.functions.invoke('verify-payment', {
            body: {
              type: 'failure',
              order_id: order.id,
              payment_id: response.error.metadata?.payment_id,
              error_description: 'Payment processing failed',
              submissionId
            }
          });
        } catch (error) {
          console.error('Error recording payment failure:', error);
        }

        toast({
          title: "Payment Failed",
          description: "Payment could not be processed. Please try again or contact support if the issue persists.",
          variant: "destructive",
        });
      });

      // Open the modal
      rzp.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      setLoading(false);
      
      // Provide user-friendly error messages without exposing system details
      const userMessage = error.message.includes('network') || error.message.includes('connection') 
        ? "Network error. Please check your connection and try again."
        : error.message || "Something went wrong. Please try again or contact support.";
      
      toast({
        title: "Payment Error",
        description: userMessage,
        variant: "destructive",
      });
    }
  };

  return { handlePayment, loading };
};
