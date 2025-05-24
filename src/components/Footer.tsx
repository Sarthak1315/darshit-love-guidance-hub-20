
import { Heart, Instagram, Youtube, Mail, MapPin, Phone, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff69b4' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/f0bbde04-e1db-4d82-8c87-588913097ba3.png" 
                alt="Darshit Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming hearts, one conversation at a time. Join the journey of love, growth, and endless possibilities.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/i_am_darshit8/?igsh=MWtqbXh6bGVqcDVweg%3D%3D#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                "Relationship Counseling",
                "Life Coaching",
                "Personal Guidance", 
                "Online Consultation"
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-pink-400 transition-colors duration-300 flex items-center gap-2">
                    <Heart className="w-3 h-3" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                "About Me",
                "My Content",
                "Book Consultation",
                "Success Stories"
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-pink-400 transition-colors duration-300 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Get in Touch</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>Surat, Gujarat</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>hello@darshitkorat.com</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>219K+ followers</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Darshit Korat. All rights reserved. Made with love for love.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Crafted with <Heart className="w-4 h-4 text-pink-500 animate-pulse" /> for transforming lives
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
