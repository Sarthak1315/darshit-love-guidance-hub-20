
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Video, MessageCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "One-on-One Consultation",
      duration: "60 minutes",
      price: "₹2,999",
      description: "Personal video call session to discuss your relationship challenges and life concerns",
      features: [
        "Private video consultation",
        "Personalized advice and guidance",
        "Follow-up action plan",
        "24-hour email support"
      ],
      icon: Video,
      popular: true
    },
    {
      title: "Express Session",
      duration: "30 minutes",
      price: "₹1,499", 
      description: "Quick consultation for urgent relationship or life questions",
      features: [
        "Focused problem-solving",
        "Immediate guidance",
        "Quick actionable steps",
        "Same-day booking available"
      ],
      icon: Clock,
      popular: false
    },
    {
      title: "Ongoing Support",
      duration: "Monthly",
      price: "₹4,999",
      description: "Monthly package with regular check-ins and continuous support",
      features: [
        "2 consultations per month",
        "WhatsApp support access",
        "Progress tracking",
        "Priority booking"
      ],
      icon: MessageCircle,
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Consultation Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect consultation package that fits your needs. Every session is designed to provide you with clarity, confidence, and actionable guidance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`relative overflow-hidden transition-transform hover:scale-105 ${service.popular ? 'border-purple-500 border-2 shadow-lg' : 'border-gray-200'}`}>
              {service.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="text-3xl font-bold text-purple-600 mt-2">{service.price}</div>
                <CardDescription className="text-gray-600 mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 rounded-full ${
                    service.popular 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
