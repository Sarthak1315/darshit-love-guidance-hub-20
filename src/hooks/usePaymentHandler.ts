
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
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentData: PaymentData) => {
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order
      const { data: orderData, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: paymentData
      });

      if (error) throw error;

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const { order, submissionId } = orderData;

      // Razorpay options
      const options = {
        key: 'rzp_test_9999999999', // Replace with your Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Darshit Korat',
        description: 'Personal Guidance Session',
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
        handler: async function (response: any) {
          console.log('Payment successful:', response);
          
          // Verify payment
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

            if (verifyError) throw verifyError;

            if (verifyData.success && verifyData.verified) {
              toast({
                title: "Payment Successful! 🎉",
                description: "Thank you! Darshit will respond to your question within 24-48 hours.",
              });
              return true; // Success
            } else {
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support with your payment details.",
                variant: "destructive",
              });
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            toast({
              title: "Payment Verification Error",
              description: "Please contact support with your payment details.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: async function() {
            console.log('Payment modal closed');
            // Record payment failure/cancellation
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
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', async function (response: any) {
        console.log('Payment failed:', response.error);
        
        // Record payment failure
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

      rzp.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading };
};
