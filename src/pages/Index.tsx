
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CTAForm from "@/components/CTAForm";
import InstagramSection from "@/components/InstagramSection";
import SocialContent from "@/components/SocialContent";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <CTAForm />
      <InstagramSection />
      <SocialContent />
      <Footer />
    </div>
  );
};

export default Index;
