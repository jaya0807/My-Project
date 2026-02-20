import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, ArrowLeft, Camera, LogOut, Mail, Phone, Save, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "Dr. Sarah Smith",
    email: "s.smith@neuromed.hospital.com",
    qualification: "MD, DM Neurology, Fellowship in Movement Disorders",
    licenseId: "MD-2019-NEU-48821",
    phone: "+1 (555) 234-5678",
    hospital: "NeuroCare Medical Center",
    specialization: "Movement Disorders & Parkinson's Disease",
  });

  return (
    <div className="min-h-screen hero-bg">
      {/* Header */}
      <header className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg gradient-text">ECHO</span>
            </Link>
            <span className="text-border">|</span>
            <span className="text-sm text-muted-foreground">Doctor Profile</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/doctor-dashboard">
              <Button size="sm" variant="outline" className="border-border/50 gap-1 text-muted-foreground">
                <ArrowLeft className="w-3 h-3" /> Dashboard
              </Button>
            </Link>
            <Button size="sm" variant="ghost" onClick={() => navigate("/doctor-login")} className="text-muted-foreground gap-1">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your professional information and account settings</p>
        </div>

        {/* Profile Header Card */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center glow-primary">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg glass-card border border-border/50 flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <Camera className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl font-bold">{form.name}</h2>
              <p className="text-primary text-sm font-medium mt-1">{form.specialization}</p>
              <p className="text-muted-foreground text-sm">{form.hospital}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="flex items-center gap-1.5 glass px-3 py-1 rounded-full text-xs text-success">
                  <Shield className="w-3 h-3" /> Verified Neurologist
                </span>
                <span className="glass px-3 py-1 rounded-full text-xs text-primary">
                  License: {form.licenseId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-8">
          <h3 className="font-display font-semibold text-lg mb-6 pb-4 border-b border-border/30">Professional Information</h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-primary" /> Full Name
                </Label>
                <Input
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
                </Label>
                <Input
                  type="email"
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-primary" /> Qualification
              </Label>
              <Input
                className="bg-secondary/50 border-border/50 focus:border-primary"
                value={form.qualification}
                onChange={e => setForm({ ...form, qualification: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Medical License ID</Label>
                <Input
                  className="bg-secondary/50 border-border/50 focus:border-primary font-mono"
                  value={form.licenseId}
                  onChange={e => setForm({ ...form, licenseId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" /> Contact Number
                </Label>
                <Input
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Hospital / Institution</Label>
              <Input
                className="bg-secondary/50 border-border/50 focus:border-primary"
                value={form.hospital}
                onChange={e => setForm({ ...form, hospital: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-border/30">
            <Button className="flex-1 bg-gradient-primary border-0 text-primary-foreground gap-2 hover:opacity-90 font-semibold">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
            <Button
              variant="outline"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 gap-2"
              onClick={() => navigate("/doctor-login")}
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          🔒 Your data is encrypted and protected under HIPAA-inspired security standards.
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
