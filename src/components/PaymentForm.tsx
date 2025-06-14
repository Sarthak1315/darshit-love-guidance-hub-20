
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Send, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { validateName, validateEmail, validateMobile, validateInstagram, validateQuestion, sanitizeInput } from "@/utils/formValidation";

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
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    instagram: "",
    question: ""
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    mobile: false,
    instagram: false,
    question: false
  });

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setAgreed(checked === true);
  };

  const validateField = (fieldName: string, value: string) => {
    let validation = { isValid: true, message: "" };
    
    switch (fieldName) {
      case 'fullName':
        validation = validateName(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'mobile':
        validation = validateMobile(value);
        break;
      case 'instagram':
        validation = validateInstagram(value);
        break;
      case 'question':
        validation = validateQuestion(value);
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: validation.isValid ? "" : validation.message
    }));

    return validation.isValid;
  };

  const handleInputChange = (fieldName: string, value: string, setter: (value: string) => void) => {
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    setter(sanitizedValue);
    
    // Validate if field has been touched
    if (touched[fieldName as keyof typeof touched]) {
      validateField(fieldName, sanitizedValue);
    }
  };

  const handleBlur = (fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      mobile: true,
      instagram: true,
      question: true
    });

    // Validate all fields
    const isNameValid = validateField('fullName', fullName);
    const isEmailValid = validateField('email', email);
    const isMobileValid = validateField('mobile', mobile);
    const isInstagramValid = validateField('instagram', instagram);
    const isQuestionValid = validateField('question', question);

    const allFieldsValid = isNameValid && isEmailValid && isMobileValid && isInstagramValid && isQuestionValid && agreed;

    if (allFieldsValid && !loading) {
      onSubmit();
    }
  };

  const getFieldClassName = (fieldName: string) => {
    const baseClass = "rounded-xl border-2 transition-colors duration-300 h-12 text-lg";
    const hasError = touched[fieldName as keyof typeof touched] && fieldErrors[fieldName as keyof typeof fieldErrors];
    
    if (hasError) {
      return `${baseClass} border-red-300 focus:border-red-500`;
    }
    return `${baseClass} border-gray-200 focus:border-pink-400`;
  };

  const getTextareaClassName = () => {
    const baseClass = "rounded-xl border-2 min-h-[150px] transition-colors duration-300 text-lg";
    const hasError = touched.question && fieldErrors.question;
    
    if (hasError) {
      return `${baseClass} border-red-300 focus:border-red-500`;
    }
    return `${baseClass} border-gray-200 focus:border-pink-400`;
  };

  const ErrorMessage = ({ message }: { message: string }) => (
    message ? (
      <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
        <AlertTriangle className="w-4 h-4" />
        {message}
      </div>
    ) : null
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
        <Input 
          placeholder="Enter your full name" 
          className={getFieldClassName('fullName')}
          value={fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value, setFullName)}
          onBlur={() => handleBlur('fullName', fullName)}
          required
          disabled={loading}
          maxLength={100}
        />
        <ErrorMessage message={fieldErrors.fullName} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
        <Input 
          type="email"
          placeholder="Enter your email address" 
          className={getFieldClassName('email')}
          value={email}
          onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
          onBlur={() => handleBlur('email', email)}
          required
          disabled={loading}
          maxLength={254}
        />
        <ErrorMessage message={fieldErrors.email} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Mobile Number *</label>
        <Input 
          type="tel"
          placeholder="Enter your mobile number" 
          className={getFieldClassName('mobile')}
          value={mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value, setMobile)}
          onBlur={() => handleBlur('mobile', mobile)}
          required
          disabled={loading}
          maxLength={15}
        />
        <ErrorMessage message={fieldErrors.mobile} />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Instagram Username *</label>
        <Input 
          placeholder="@your_instagram_username" 
          className={getFieldClassName('instagram')}
          value={instagram}
          onChange={(e) => handleInputChange('instagram', e.target.value, setInstagram)}
          onBlur={() => handleBlur('instagram', instagram)}
          required
          disabled={loading}
          maxLength={50}
        />
        <ErrorMessage message={fieldErrors.instagram} />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Your Question / Problem * 
          <span className="text-gray-500 text-xs">({question.length}/2000 characters)</span>
        </label>
        <Textarea 
          placeholder="Share what's in your heart. What guidance do you seek? (relationships, love life, personal growth, life decisions, etc.)"
          className={getTextareaClassName()}
          value={question}
          onChange={(e) => handleInputChange('question', e.target.value, setQuestion)}
          onBlur={() => handleBlur('question', question)}
          required
          disabled={loading}
          maxLength={2000}
        />
        <ErrorMessage message={fieldErrors.question} />
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
      
      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid || loading}
      >
        <Send className="w-6 h-6 mr-3" />
        {loading ? "Processing Payment..." : "Pay ₹500 via Razorpay"}
      </Button>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>🔒 Secure Payment via Razorpay • 💝 Personal response guaranteed • ⚡ 24-48 hour response time</p>
        <p className="mt-2 text-xs text-orange-600">
          ⚠️ Your form details will be saved regardless of payment status
        </p>
      </div>
    </form>
  );
};

export default PaymentForm;
