
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import SocialContent from "@/components/SocialContent";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <SocialContent />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
