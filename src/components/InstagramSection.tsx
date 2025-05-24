
import { Instagram, Heart, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramSection = () => {
  return (
    <section id="content" className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff69b4' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Instagram className="w-4 h-4" />
            Follow My Journey
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join My Instagram Community
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Daily inspiration, relationship tips, and real stories from 219K+ followers who found love and happiness.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          {/* Instagram Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
                <Users className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">219K+</div>
                <div className="text-white/70">Followers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/70">Lives Changed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">1M+</div>
                <div className="text-white/70">Monthly Views</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
                <Instagram className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">Daily</div>
                <div className="text-white/70">Content</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">What You'll Get:</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  Daily relationship advice and love tips
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Real success stories from my clients
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Live Q&A sessions and interactive content
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  Behind-the-scenes of my coaching journey
                </li>
              </ul>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('https://www.instagram.com/i_am_darshit8/?igsh=MWtqbXh6bGVqcDVweg%3D%3D#', '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow @i_am_darshit8
            </Button>
          </div>
          
          {/* Instagram Embed Preview */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <div className="aspect-square bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-xl p-1">
              <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/lovable-uploads/793ac983-fcc0-4071-919c-9a5de291435e.png"
                      alt="Darshit Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">i_am_darshit8</div>
                      <div className="text-sm text-gray-600">Relationship Coach</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Instagram className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">Latest Posts</p>
                    <p className="text-sm text-gray-500">Daily love & relationship advice</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <Heart className="w-6 h-6 text-red-500" />
                      <div className="text-sm font-medium">219,847 followers</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Transform your love life with daily guidance..." 
                    <span className="text-pink-600 font-medium">more</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
