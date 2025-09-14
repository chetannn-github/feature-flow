import { Link } from "react-router-dom";
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
            Full source code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <a href="https://www.npmjs.com/package/feature-flow-react-sdk" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="group min-w-[200px]">
                Deploy Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>


            <a href="https://github.com/chetannn-github/feature-flow" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg" 
                variant="ghost" 
                className="group min-w-[200px] border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </a>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <div className="flex justify-center items-center gap-8 mt-4 text-primary-foreground/60">
              <div className="text-center">
                <div className="text-lg font-semibold">Easy to use</div>
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