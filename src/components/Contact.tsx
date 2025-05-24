
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Calendar, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Find Your Way Forward?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step towards clarity and happiness. Book your consultation today and let's work together to transform your love and life.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Book Your Consultation</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you within 24 hours to schedule your session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input placeholder="Your first name" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input placeholder="Your last name" className="rounded-lg" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="your.email@example.com" className="rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input type="tel" placeholder="+91 9876543210" className="rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Consultation Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option>One-on-One Consultation (60 min) - ₹500</option>
                    <option>Express Session (30 min) - ₹300</option>
                    <option>Ongoing Support (Monthly) - ₹1,500</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell me about your situation</label>
                  <Textarea 
                    placeholder="Briefly describe what you'd like guidance on (relationships, life decisions, etc.). This helps me prepare for our session."
                    className="rounded-lg min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book My Consultation
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Surat, Gujarat, India</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Availability</h3>
                  <p className="text-gray-600">Monday - Saturday, 10 AM - 8 PM IST</p>
                </div>
              </div>
            </Card>
            
            <div className="bg-pink-100 p-6 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-2">Why Choose Personal Consultation?</h3>
              <ul className="space-y-2 text-pink-800">
                <li>• Personalized guidance tailored to your specific situation</li>
                <li>• Safe, confidential space to share your concerns</li>
                <li>• Practical strategies you can implement immediately</li>
                <li>• Follow-up support to track your progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
