import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FBF8] w-full">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;