
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube, Instagram, ExternalLink } from "lucide-react";

const SocialContent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Watch My Content
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get inspired and learn from my YouTube videos and Instagram content. Real advice, real stories, real solutions for your love and life challenges.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* YouTube Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Youtube className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">YouTube Channel</h3>
                <p className="text-gray-600">In-depth relationship guidance and life advice</p>
              </div>
            </div>
            
            {/* First YouTube Video */}
            <Card className="overflow-hidden shadow-lg mb-6">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/Kbp_DPyJ7-w"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full aspect-video"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Second YouTube Video */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/CdkBGE8soYE"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full aspect-video"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
            
            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
              <Youtube className="w-5 h-5 mr-2" />
              Visit My YouTube Channel
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {/* Instagram Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Instagram</h3>
                <p className="text-gray-600">219K+ followers • Daily inspiration & tips</p>
              </div>
            </div>
            
            {/* Instagram Content Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Instagram className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Relationship Tips</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Instagram className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Life Advice</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Instagram className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Q&A Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Instagram className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Success Stories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-pink-300 text-pink-600 hover:bg-pink-50"
              onClick={() => window.open('https://www.instagram.com/i_am_darshit8/?igsh=MWtqbXh6bGVqcDVweg%3D%3D#', '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow @i_am_darshit8
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialContent;
