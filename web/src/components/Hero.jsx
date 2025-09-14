import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "../assets/hero.jpg"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground lg:text-6xl">
                Feature Flags
                <span className="block text-accent-foreground">Made Simple</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 lg:max-w-lg">
                Feature flag management with MongoDB storage, React SDK, and secure API key management. Toggle features without redeployments.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to={"/dashboard"}>
                <Button size="lg" variant="secondary" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">Easy</div>
                <div className="text-sm text-primary-foreground/70">Integration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">Fast</div>
                <div className="text-sm text-primary-foreground/70">Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">React</div>
                <div className="text-sm text-primary-foreground/70">SDK Ready</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              <img 
                src={heroImg} 
                alt="Feature flag management dashboard interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;