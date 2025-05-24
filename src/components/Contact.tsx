
import { MapPin, Clock, Mail, Calendar, MessageCircle, Heart } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-pink-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff1493' fill-opacity='0.02'%3E%3Cpath d='M50 50m-50 0a50,50 0 1,1 100,0a50,50 0 1,1 -100,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Get in Touch
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
            Connect With Me
          </h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: MapPin,
              title: "Location",
              description: "Surat, Gujarat, India",
              gradient: "from-pink-500 to-rose-500"
            },
            {
              icon: Clock,
              title: "Response Time",
              description: "Within 24 hours guaranteed",
              gradient: "from-purple-500 to-indigo-500"
            },
            {
              icon: Calendar,
              title: "Availability",
              description: "Monday - Saturday, 10 AM - 8 PM IST",
              gradient: "from-pink-500 to-purple-500"
            },
            {
              icon: MessageCircle,
              title: "Communication",
              description: "Video calls, WhatsApp, Email support",
              gradient: "from-indigo-500 to-purple-600"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 group text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
