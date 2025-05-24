
const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Meet Darshit Korat
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Based in Surat, Gujarat, I'm a passionate content creator and relationship coach who believes that everyone deserves love, clarity, and happiness in their life. With over 219,000 followers on Instagram and a growing YouTube community, I've dedicated my life to helping people navigate the beautiful complexity of relationships and personal growth.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Love Guidance</h3>
              <p className="text-gray-600">Helping you understand and navigate romantic relationships with clarity and confidence.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Life Coaching</h3>
              <p className="text-gray-600">Personal development and life direction guidance to help you reach your full potential.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clarity & Purpose</h3>
              <p className="text-gray-600">Finding your direction when life feels overwhelming or uncertain.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
