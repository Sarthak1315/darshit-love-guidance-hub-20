
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Youtube, MessageCircle, Heart, Sparkles } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Express Session",
      duration: "30 minutes",
      price: "₹300",
      description: "Quick consultation for urgent relationship or life questions",
      features: ["Focused problem-solving", "Immediate guidance", "Quick actionable steps", "Same-day booking available"],
      icon: Clock,
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "One-on-One Consultation",
      duration: "60 minutes",
      price: "₹500",
      description: "Personal video call session to discuss your relationship challenges and life concerns",
      features: ["Private video consultation", "Personalized advice and guidance", "Follow-up action plan", "24-hour email support"],
      icon: Youtube,
      popular: true,
      gradient: "from-pink-500 to-purple-500"
    },
    {
      title: "Ongoing Support",
      duration: "Monthly",
      price: "₹1,500",
      description: "Monthly package with regular check-ins and continuous support",
      features: ["2 consultations per month", "WhatsApp support access", "Progress tracking", "Priority booking"],
      icon: MessageCircle,
      popular: false,
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ff1493' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            My Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
            Choose Your Path to Happiness
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every journey is unique. Select the consultation style that resonates with your heart and fits your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`relative overflow-hidden border-0 shadow-2xl transition-all duration-500 hover:shadow-3xl group ${service.popular ? 'transform scale-105 z-10' : 'hover:transform hover:scale-105'}`}>
              {service.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Heart className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{service.title}</CardTitle>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.price}
                  </span>
                  <span className="text-gray-500">/ {service.duration}</span>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                <ul className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Book This Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl">
            <Heart className="w-8 h-8 text-pink-600" />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Still unsure which session is right for you?</h3>
              <p className="text-gray-600">Let's have a quick chat to find your perfect match!</p>
            </div>
            <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
              Get Guidance
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
