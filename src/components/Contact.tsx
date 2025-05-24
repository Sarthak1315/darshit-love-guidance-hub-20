import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Mail, Calendar, MessageCircle, Heart, Sparkles, Send } from "lucide-react";
const Contact = () => {
  return <section className="py-24 bg-gradient-to-br from-white via-pink-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff1493' fill-opacity='0.02'%3E%3Cpath d='M50 50m-50 0a50,50 0 1,1 100,0a50,50 0 1,1 -100,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Let's Connect
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards finding love, clarity, and happiness. Your journey to a beautiful life starts with a simple conversation.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          
          
          {/* Contact Information */}
          <div className="space-y-8">
            {[{
            icon: MapPin,
            title: "Location",
            description: "Surat, Gujarat, India",
            gradient: "from-pink-500 to-rose-500"
          }, {
            icon: Clock,
            title: "Response Time",
            description: "Within 24 hours guaranteed",
            gradient: "from-purple-500 to-indigo-500"
          }, {
            icon: Calendar,
            title: "Availability",
            description: "Monday - Saturday, 10 AM - 8 PM IST",
            gradient: "from-pink-500 to-purple-500"
          }, {
            icon: MessageCircle,
            title: "Communication",
            description: "Video calls, WhatsApp, Email support",
            gradient: "from-indigo-500 to-purple-600"
          }].map((item, index) => {})}
            
            <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-8 rounded-2xl border border-pink-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Why Choose Personal Consultation?</h3>
                  <p className="text-gray-700 mb-4">Experience the magic of personalized guidance that transforms lives.</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-700">
                {["Completely personalized guidance for your unique situation", "Safe, judgment-free space to share your deepest concerns", "Practical strategies you can start using immediately", "Ongoing support to ensure your continued growth"].map((item, index) => <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;