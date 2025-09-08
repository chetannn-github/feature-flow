import CodeExample from "../components/CodeExample";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LiveDemo from "../components/LiveDemo";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
      <Hero />
      <Features />
      <CodeExample />
      <LiveDemo />
      <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
