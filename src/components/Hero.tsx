
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ✨ Relationship & Life Coach
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Get Personal Guidance on 
                <span className="text-purple-600 block">Relationships, Love, and Life</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Navigating the complexities of love and life can feel overwhelming. Are you wrestling with relationship doubts, career crossroads, or a general sense of being lost? You're not alone. Many find themselves at a similar juncture, seeking clarity and direction amidst the confusion.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                This is where we step in. We offer compassionate and insightful guidance to help you untangle your thoughts, understand your feelings, and discover practical solutions to your love and life challenges. Consider this your safe space to explore your concerns and embark on a journey towards greater clarity, confidence, and fulfillment.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                Book Your Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-full">
                Watch My Content
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Available for consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏆 219K+ Instagram followers</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/lovable-uploads/6b14b84a-17e6-4d97-a0a4-bb7c4e109a04.png" 
                  alt="Darshit Korat - Relationship Coach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
