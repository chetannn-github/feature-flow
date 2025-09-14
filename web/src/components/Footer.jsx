import { Flag, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-hero">
                <Flag className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">FeatureFlow</span>
            </div>
            <p className="text-muted-foreground">
              Self-hosted feature flag management platform built with the MERN stack.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/chetannn-github/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              
              <a href="https://www.linkedin.com/in/chetannn/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-800 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:chetan.rajawat25@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Email Us : chetan.rajawat@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 FeatureFlow. Built with Love &hearts;.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;