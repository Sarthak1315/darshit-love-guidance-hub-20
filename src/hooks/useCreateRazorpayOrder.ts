
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentFormData {
  fullName: string;
  email: string;
  mobile: string;
  instagram: string;
  question: string;
}

export function useCreateRazorpayOrder() {
  const [loading, setLoading] = useState(false);
  const [orderResponse, setOrderResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (paymentData: PaymentFormData) => {
    setLoading(true);
    setError(null);
    setOrderResponse(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: paymentData, // Your form data
      });

      if (error || !data?.success) {
        setError(data?.error || error?.message || "Order creation failed.");
        return null;
      }

      setOrderResponse(data);
      return data;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    loading,
    orderResponse,
    error,
  };
}
