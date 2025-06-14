
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

interface PaymentFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  mobile: string;
  setMobile: (value: string) => void;
  instagram: string;
  setInstagram: (value: string) => void;
  question: string;
  setQuestion: (value: string) => void;
  agreed: boolean;
  setAgreed: (value: boolean) => void;
  loading: boolean;
  onSubmit: () => void;
  isFormValid: boolean;
}

const PaymentForm = ({
  fullName,
  setFullName,
  email,
  setEmail,
  mobile,
  setMobile,
  instagram,
  setInstagram,
  question,
  setQuestion,
  agreed,
  setAgreed,
  loading,
  onSubmit,
  isFormValid
}: PaymentFormProps) => {
  const paymentButtonRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setAgreed(checked === true);
  };

  useEffect(() => {
    // Load Razorpay payment button script when form is valid
    if (isFormValid && paymentButtonRef.current) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_Qh0yf65kkgJLE5');
      script.async = true;
      
      // Clear previous script if any
      paymentButtonRef.current.innerHTML = '';
      paymentButtonRef.current.appendChild(script);
    }
  }, [isFormValid]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
        <Input 
          placeholder="Enter your full name" 
          className="rounded-xl border-2 border-gray-200 focus:border-pink-400 transition-colors duration-300 h-12 text-lg" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
        <Input 
          type="email"
          placeholder="Enter your email address" 
          className="rounded-xl border-2 border-gray-200 focus:border-pink-400 transition-colors duration-300 h-12 text-lg" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Mobile Number *</label>
        <Input 
          type="tel"
          placeholder="Enter your mobile number" 
          className="rounded-xl border-2 border-gray-200 focus:border-pink-400 transition-colors duration-300 h-12 text-lg" 
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Instagram Username *</label>
        <Input 
          placeholder="@your_instagram_username" 
          className="rounded-xl border-2 border-gray-200 focus:border-pink-400 transition-colors duration-300 h-12 text-lg" 
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Your Question / Problem *</label>
        <Textarea 
          placeholder="Share what's in your heart. What guidance do you seek? (relationships, love life, personal growth, life decisions, etc.)"
          className="rounded-xl border-2 border-gray-200 focus:border-pink-400 min-h-[150px] transition-colors duration-300 text-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <div className="flex items-center space-x-3 p-4 bg-pink-50 rounded-xl border border-pink-200">
        <Checkbox 
          id="agree" 
          checked={agreed}
          onCheckedChange={handleCheckboxChange}
          className="w-5 h-5"
          disabled={loading}
        />
        <label htmlFor="agree" className="text-sm text-gray-700 leading-relaxed">
          I agree to pay ₹500 for personalized guidance and understand that Darshit will respond personally to my question within 24-48 hours.
        </label>
      </div>
      
      {isFormValid ? (
        <div className="w-full">
          <div ref={paymentButtonRef} className="w-full flex justify-center"></div>
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>🔒 Secure Payment via Razorpay • 💝 Personal response guaranteed • ⚡ 24-48 hour response time</p>
            <p className="mt-2 text-xs text-orange-600">
              ⚠️ Your form details will be saved regardless of payment status
            </p>
          </div>
        </div>
      ) : (
        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={true}
          type="button"
        >
          <Send className="w-6 h-6 mr-3" />
          Complete all fields to proceed
        </Button>
      )}
    </div>
  );
};

export default PaymentForm;
