
export const validateForm = (
  fullName: string,
  email: string,
  mobile: string,
  instagram: string,
  question: string,
  agreed: boolean
): boolean => {
  return !!(fullName && email && mobile && instagram && question && agreed);
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
  
  if (!fullName || !email || !mobile || !instagram || !question || !agreed) {
    return {
      isValid: false,
      message: "Please fill all fields and agree to the terms."
    };
  }
  
  return { isValid: true, message: "" };
};
