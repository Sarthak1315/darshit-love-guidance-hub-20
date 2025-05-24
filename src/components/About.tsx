
import { Heart, Sparkles, Users, Target } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-pink-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ff69b4" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              About Me
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
              Meet Darshit Korat
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your trusted companion in the journey of love and life, helping hearts connect and souls flourish.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Based in the vibrant city of Surat, Gujarat, I'm more than just a relationship coach – I'm a storyteller of love, a guide through life's complexities, and a believer in the magic of human connections.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a community of over <span className="font-bold text-pink-600">219,000 followers</span> on Instagram and thousands of lives touched through my content, I've dedicated my heart to helping people navigate the beautiful, chaotic, and wonderful world of relationships.
              </p>
              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">My Mission</h4>
                  <p className="text-gray-600">To help every soul find their perfect love story and life purpose.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-pink-600">219K+</div>
                    <div className="text-sm text-gray-600">Instagram Followers</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-purple-600">1000+</div>
                    <div className="text-sm text-gray-600">Lives Transformed</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-pink-600">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Love Guidance",
                description: "Navigate romantic relationships with confidence, understanding, and deep emotional intelligence.",
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: Target,
                title: "Life Coaching",
                description: "Discover your purpose, set meaningful goals, and create the life you've always dreamed of.",
                gradient: "from-purple-500 to-indigo-500"
              },
              {
                icon: Users,
                title: "Personal Growth",
                description: "Build self-confidence, improve communication, and develop lasting, meaningful relationships.",
                gradient: "from-pink-500 to-purple-500"
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-200 group-hover:transform group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
