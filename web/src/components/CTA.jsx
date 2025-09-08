import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground lg:text-5xl">
            Ready to Take Control of Your Features?
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Deploy your own feature flag management system in minutes. 
            Full source code, complete documentation, and enterprise-ready architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="group min-w-[200px]">
              Deploy Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group min-w-[200px] border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/70 text-sm">
              Join developers who've deployed their own feature flag systems
            </p>
            <div className="flex justify-center items-center gap-8 mt-4 text-primary-foreground/60">
              <div className="text-center">
                <div className="text-lg font-semibold">Self-Hosted</div>
                <div className="text-xs">Complete Control</div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;