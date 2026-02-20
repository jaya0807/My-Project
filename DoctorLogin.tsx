import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Eye, EyeOff, Lock, Mail, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DoctorLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/doctor-dashboard");
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(196 85% 48% / 0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl gradient-text">ECHO</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mt-3 text-muted-foreground text-sm">
            <Stethoscope className="w-4 h-4 text-primary" />
            <span>Doctor Portal</span>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="flex rounded-xl bg-secondary/50 p-1 mb-6">
            <button
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isSignup ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isSignup ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-secondary/50 border-border/50 focus:border-primary" placeholder="Dr. Jane Smith" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" className="pl-10 bg-secondary/50 border-border/50 focus:border-primary" placeholder="doctor@hospital.com" />
              </div>
            </div>

            {isSignup && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">License ID</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-secondary/50 border-border/50 focus:border-primary" placeholder="MD-2024-XXXXX" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPass ? "text" : "password"}
                  className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-primary"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 font-semibold py-5">
              {isSignup ? "Create Doctor Account" : "Sign In Securely"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              🔒 HIPAA-inspired encrypted connection · Secure Medical Portal
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
