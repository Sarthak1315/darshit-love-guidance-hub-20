
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    setLoading(true);

    try {
      console.log('Starting payment process for:', paymentData.fullName);

      // Load Razorpay checkout script first
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay checkout script. Please check your internet connection.');
      }

      console.log('Creating order through Supabase edge function...');

      // Create order ONLY through Supabase edge function
      const { data: orderData, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: paymentData
      });

      console.log('Order creation response:', orderData);

      if (error) {
        console.error('Order creation error:', error);
        throw new Error(error.message || 'Failed to create payment order');
      }

      if (!orderData?.success) {
        console.error('Order creation failed:', orderData);
        throw new Error(orderData?.error || 'Failed to create order');
      }

      const { order, submissionId } = orderData;
      console.log('Order created successfully. Opening Razorpay checkout modal...');

      if (!window.Razorpay) {
        throw new Error('Razorpay checkout not available');
      }

      // Configure Razorpay checkout modal - NO API CALLS, ONLY MODAL CONFIG
      const options = {
        key: 'rzp_test_jHo8JWCfGwxWrTk98Hp6xoDy', // Public key for checkout
        amount: order.amount,
        currency: order.currency,
        name: 'Darshit Korat',
        description: 'Personal Guidance Session - ₹500',
        image: '/lovable-uploads/793ac983-fcc0-4071-919c-9a5de291435e.png',
        order_id: order.id,
        prefill: {
          name: paymentData.fullName,
          email: paymentData.email,
          contact: paymentData.mobile,
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
                description: "Payment completed but verification failed. Please contact support.",
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
                description: "Please contact support with your payment details.",
                variant: "destructive",
              });
            }
          } catch (verifyError: any) {
            console.error('Payment verification error:', verifyError);
            toast({
              title: "Payment Verification Error",
              description: "Payment completed but verification failed. Please contact support.",
              variant: "destructive",
            });
          }
        },
        modal: {
          // Prevent modal from making API calls on dismiss
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
          // Disable escape key to prevent unexpected dismissals
          escape: false,
          // Disable click outside to close
          backdropclose: false
        }
      };

      console.log('Opening Razorpay checkout modal...');
      
      // Create and open Razorpay checkout
      const rzp = new window.Razorpay(options);
      
      // Handle payment failures through event handler
      rzp.on('payment.failed', async function (response: any) {
        console.log('Payment failed:', response.error);
        setLoading(false);
        
        try {
          await supabase.functions.invoke('verify-payment', {
            body: {
              type: 'failure',
              order_id: order.id,
              payment_id: response.error.metadata?.payment_id,
              error_description: response.error.description,
              submissionId
            }
          });
        } catch (error) {
          console.error('Error recording payment failure:', error);
        }

        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment failed. Please try again.",
          variant: "destructive",
        });
      });

      // Open the modal
      rzp.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      setLoading(false);
      
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { handlePayment, loading };
};
