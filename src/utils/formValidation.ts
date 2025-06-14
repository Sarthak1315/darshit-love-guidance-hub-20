
// Enhanced validation with security checks
export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }
  
  if (email.length > 254) {
    return { isValid: false, message: "Email is too long" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  return { isValid: true, message: "" };
};

export const validateMobile = (mobile: string): { isValid: boolean; message: string } => {
  const mobileRegex = /^[0-9+\-\s()]{10,15}$/;
  
  if (!mobile) {
    return { isValid: false, message: "Mobile number is required" };
  }
  
  if (!mobileRegex.test(mobile)) {
    return { isValid: false, message: "Please enter a valid mobile number (10-15 digits)" };
  }
  
  return { isValid: true, message: "" };
};

export const validateName = (name: string): { isValid: boolean; message: string } => {
  if (!name) {
    return { isValid: false, message: "Name is required" };
  }
  
  if (name.length > 100) {
    return { isValid: false, message: "Name must be less than 100 characters" };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: "Name must be at least 2 characters" };
  }
  
  // Check for potentially malicious content
  const suspiciousPattern = /[<>"\';\\]/;
  if (suspiciousPattern.test(name)) {
    return { isValid: false, message: "Name contains invalid characters" };
  }
  
  return { isValid: true, message: "" };
};

export const validateInstagram = (instagram: string): { isValid: boolean; message: string } => {
  if (!instagram) {
    return { isValid: false, message: "Instagram username is required" };
  }
  
  if (instagram.length > 50) {
    return { isValid: false, message: "Instagram username must be less than 50 characters" };
  }
  
  // Remove @ if present and validate
  const cleanUsername = instagram.replace(/^@/, '');
  const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
  
  if (!instagramRegex.test(cleanUsername)) {
    return { isValid: false, message: "Please enter a valid Instagram username" };
  }
  
  return { isValid: true, message: "" };
};

export const validateQuestion = (question: string): { isValid: boolean; message: string } => {
  if (!question) {
    return { isValid: false, message: "Question is required" };
  }
  
  if (question.length > 2000) {
    return { isValid: false, message: "Question must be less than 2000 characters" };
  }
  
  if (question.length < 10) {
    return { isValid: false, message: "Please provide more details (at least 10 characters)" };
  }
  
  return { isValid: true, message: "" };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/["\';]/g, '') // Remove quotes that could be used for injection
    .trim();
};

export const validateForm = (
  fullName: string,
  email: string,
  mobile: string,
  instagram: string,
  question: string,
  agreed: boolean
): boolean => {
  const nameValid = validateName(fullName).isValid;
  const emailValid = validateEmail(email).isValid;
  const mobileValid = validateMobile(mobile).isValid;
  const instagramValid = validateInstagram(instagram).isValid;
  const questionValid = validateQuestion(question).isValid;
  
  return nameValid && emailValid && mobileValid && instagramValid && questionValid && agreed;
};

export const validatePaymentForm = (paymentData: {
  fullName: string;
  email: string;
  mobile: string;
  instagram: string;
  question: string;
  agreed: boolean;
}) => {
  const { fullName, email, mobile, instagram, question, agreed } = paymentData;
  
  // Validate each field individually
  const nameValidation = validateName(fullName);
  if (!nameValidation.isValid) {
    return { isValid: false, message: nameValidation.message };
  }
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return { isValid: false, message: emailValidation.message };
  }
  
  const mobileValidation = validateMobile(mobile);
  if (!mobileValidation.isValid) {
    return { isValid: false, message: mobileValidation.message };
  }
  
  const instagramValidation = validateInstagram(instagram);
  if (!instagramValidation.isValid) {
    return { isValid: false, message: instagramValidation.message };
  }
  
  const questionValidation = validateQuestion(question);
  if (!questionValidation.isValid) {
    return { isValid: false, message: questionValidation.message };
  }
  
  if (!agreed) {
    return { isValid: false, message: "Please agree to the terms to continue" };
  }
  
  return { isValid: true, message: "" };
};
