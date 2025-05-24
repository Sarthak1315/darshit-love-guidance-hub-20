
import { Heart, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/9291eb33-271b-4ef1-b703-105b54bb6e5c.png" 
                alt="Darshit Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Helping you navigate love and life with clarity, compassion, and confidence.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/i_am_darshit8/?igsh=MWtqbXh6bGVqcDVweg%3D%3D#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Relationship Counseling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Life Coaching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personal Guidance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Online Consultation</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Me</a></li>
              <li><a href="#" className="hover:text-white transition-colors">My Content</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book Consultation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Surat, Gujarat</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@darshitkorat.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <span>219K+ followers</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Darshit Korat. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for love and life guidance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
