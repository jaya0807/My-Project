import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PatientLogin = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(168 75% 42% / 0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl gradient-text">ECHO</span>
          </Link>
          <p className="mt-2 text-muted-foreground text-sm">Patient Monitoring Portal</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mb-8">Sign in to view your tremor monitoring data and health reports.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base font-medium text-foreground">Patient ID or Email</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-12 h-14 text-base bg-secondary/50 border-border/50 focus:border-accent rounded-xl"
                  placeholder="patient@email.com or PT-XXXXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPass ? "text" : "password"}
                  className="pl-12 pr-12 h-14 text-base bg-secondary/50 border-border/50 focus:border-accent rounded-xl"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-base bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 font-semibold rounded-xl">
              Sign In to My Dashboard
            </Button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
            <p className="text-sm text-muted-foreground text-center">
              Need help? Contact your neurologist or call <span className="text-accent font-semibold">1-800-ECHO-MED</span>
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

export default PatientLogin;
