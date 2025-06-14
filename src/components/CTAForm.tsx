
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePaymentHandler } from "@/hooks/usePaymentHandler";
import { validateForm, validatePaymentForm } from "@/utils/formValidation";
import PaymentForm from "./PaymentForm";
import CTAFormHeader from "./CTAFormHeader";

const CTAForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [instagram, setInstagram] = useState("");
  const [question, setQuestion] = useState("");
  const { toast } = useToast();
  const { handlePayment, loading } = usePaymentHandler();

  const isFormValid = validateForm(fullName, email, mobile, instagram, question, agreed);

  const onSubmit = async () => {
    const paymentData = { fullName, email, mobile, instagram, question, agreed };
    const validation = validatePaymentForm(paymentData);
    
    if (!validation.isValid) {
      toast({
        title: "Missing Information",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    const success = await handlePayment({ fullName, email, mobile, instagram, question });
    
    if (success) {
      // Reset form on successful payment
      setFullName("");
      setEmail("");
      setMobile("");
      setInstagram("");
      setQuestion("");
      setAgreed(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-pink-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff1493' fill-opacity='0.02'%3E%3Cpath d='M50 50m-50 0a50,50 0 1,1 100,0a50,50 0 1,1 -100,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <CTAFormHeader />
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <CardHeader className="bg-gradient-to-br from-white to-pink-50 pb-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl text-gray-900 mb-2">Share Your Story</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Get personalized guidance from Darshit for just ₹500
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              <PaymentForm
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                mobile={mobile}
                setMobile={setMobile}
                instagram={instagram}
                setInstagram={setInstagram}
                question={question}
                setQuestion={setQuestion}
                agreed={agreed}
                setAgreed={setAgreed}
                loading={loading}
                onSubmit={onSubmit}
                isFormValid={isFormValid}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTAForm;
