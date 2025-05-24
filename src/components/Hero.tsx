
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Star, Instagram } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(255, 182, 193)"
        gradientBackgroundEnd="rgb(147, 112, 219)"
        firstColor="255, 105, 180"
        secondColor="138, 43, 226"
        thirdColor="255, 20, 147"
        fourthColor="186, 85, 211"
        fifthColor="255, 182, 193"
        containerClassName="absolute inset-0"
      >
        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="flex flex-col lg:flex-row items-center gap-16 w-full">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/30">
                  <Sparkles className="w-4 h-4" />
                  Relationship & Life Coach
                  <Heart className="w-4 h-4 text-pink-300" />
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                  Find Your
                  <span className="block bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                    Love Story
                  </span>
                </h1>
                
                <p className="text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
                  Transform your relationships and discover your true path in life. Get personalized guidance from Darshit Korat, your trusted relationship coach.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                  Get Your Guidance
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-full text-lg transition-all duration-300"
                  onClick={() => window.open('https://www.instagram.com/i_am_darshit8/?igsh=MWtqbXh6bGVqcDVweg%3D%3D#', '_blank')}
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Follow on Instagram
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Available Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">219K+ Followers</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Much Larger Profile Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                  <img 
                    src="/lovable-uploads/793ac983-fcc0-4071-919c-9a5de291435e.png" 
                    alt="Darshit Korat - Relationship Coach"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <Heart className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  );
};

export default Hero;
