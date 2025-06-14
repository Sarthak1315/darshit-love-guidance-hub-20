
import { Heart, MessageCircle, Star, Sparkles } from "lucide-react";

const CTAFormHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
        <Heart className="w-4 h-4" />
        Get Personal Guidance
      </div>
      <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
        Ready to Transform Your Life?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
        Share your story with me and get personalized guidance that will change your perspective on love and life.
      </p>
      <div className="flex items-center justify-center gap-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">219K+ Trust Me</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-pink-500" />
          <span className="font-medium">Personal Response</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          <span className="font-medium">Life Changing</span>
        </div>
      </div>
    </div>
  );
};

export default CTAFormHeader;
