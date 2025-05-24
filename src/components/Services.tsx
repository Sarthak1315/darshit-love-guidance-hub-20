import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Video, MessageCircle } from "lucide-react";
const Services = () => {
  const services = [{
    title: "One-on-One Consultation",
    duration: "60 minutes",
    price: "₹500",
    description: "Personal video call session to discuss your relationship challenges and life concerns",
    features: ["Private video consultation", "Personalized advice and guidance", "Follow-up action plan", "24-hour email support"],
    icon: Video,
    popular: true
  }, {
    title: "Express Session",
    duration: "30 minutes",
    price: "₹300",
    description: "Quick consultation for urgent relationship or life questions",
    features: ["Focused problem-solving", "Immediate guidance", "Quick actionable steps", "Same-day booking available"],
    icon: Clock,
    popular: false
  }, {
    title: "Ongoing Support",
    duration: "Monthly",
    price: "₹1,500",
    description: "Monthly package with regular check-ins and continuous support",
    features: ["2 consultations per month", "WhatsApp support access", "Progress tracking", "Priority booking"],
    icon: MessageCircle,
    popular: false
  }];
  return;
};
export default Services;