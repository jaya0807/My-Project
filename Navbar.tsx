import { Link, useLocation } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">ECHO</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={`transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>Home</Link>
          <Link to="/doctor-login" className={`transition-colors hover:text-primary ${isActive('/doctor-login') ? 'text-primary' : 'text-muted-foreground'}`}>Doctor Portal</Link>
          <Link to="/patient-login" className={`transition-colors hover:text-primary ${isActive('/patient-login') ? 'text-primary' : 'text-muted-foreground'}`}>Patient Login</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/doctor-login">
            <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10">
              Doctor Login
            </Button>
          </Link>
          <Link to="/patient-login">
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0">
              Patient Login
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/30 px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary">Home</Link>
          <Link to="/doctor-login" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary">Doctor Portal</Link>
          <Link to="/patient-login" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary">Patient Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
