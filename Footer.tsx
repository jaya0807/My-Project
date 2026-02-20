import { Activity, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">ECHO</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            AI-powered tremor monitoring system for early detection and continuous management of Parkinson's disease tremors. Enabling precision medicine through real-time IoT analytics.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/doctor-login" className="hover:text-primary transition-colors">Doctor Portal</Link></li>
            <li><Link to="/patient-login" className="hover:text-primary transition-colors">Patient Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Technology</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>ESP32 + MPU6050</li>
            <li>FFT Signal Analysis</li>
            <li>AI Tremor Scoring</li>
            <li>Real-time IoT</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © 2025 ECHO Medical Systems. All rights reserved. HIPAA-Inspired Compliant.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> team@echo-med.io</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
