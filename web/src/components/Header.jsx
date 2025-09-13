import { Button } from "./ui/button";
import { Flag, Menu } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/authSlice'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 mb-16 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-hero">
                <Flag className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">FeatureFlow</span>
            </div>
          </Link>


          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {!auth?.token && <Link to={"/sign-in"}>
              <Button variant="ghost">
                Sign In
              </Button>
            </Link>}

             {!auth?.token &&<Link to={"/sign-up"}>
                <Button>
                  Get Started
                </Button>
            </Link>}


            {auth?.token &&<Link to={"/dashboard"} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Button variant="ghost"> Go to Dashboard</Button>
            </Link>}


            {auth?.token &&<div onClick={() => dispatch(logout())}>
                <Button >
                  Logout
                </Button>
            </div>}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                

              {!auth?.token && <Link to={"/sign-in"}>
                <Button variant="ghost" className="justify-start w-full">
                  Sign In
                </Button>
                </Link>
              }
              
              {!auth?.token &&<Link to={"/sign-up"}>
                <Button className="justify-start w-full">
                  Get Started
                </Button>
                </Link>
              }

              {auth?.token &&<div className="w-full" onClick={() => dispatch(logout())}>
                <Button >
                  Logout
                </Button>
            </div>}
                
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;