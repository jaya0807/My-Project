import { Link } from "react-router-dom";
import { Activity, ArrowRight, Brain, ChevronRight, Clock, Shield, TrendingUp, Wifi, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import echoBand from "@/assets/echo-band.png";

const features = [
  { icon: Activity, title: "Real-Time Tremor Tracking", desc: "Continuous monitoring of tremor intensity with millisecond precision via MPU6050 accelerometer." },
  { icon: Brain, title: "AI-Assisted Classification", desc: "Machine learning algorithms classify tremor severity on a 0–10 Parkinson's Digital Tremor Index scale." },
  { icon: Zap, title: "FFT Frequency Analysis", desc: "Fast Fourier Transform isolates tremor biomarkers in the 3–8 Hz Parkinsonian frequency band." },
  { icon: TrendingUp, title: "Weekly Progression Trends", desc: "Longitudinal tremor data visualized to track disease progression and medication impact over time." },
  { icon: Shield, title: "Alert System", desc: "Automated alerts for high tremor activity immediately notify assigned neurologists and caregivers." },
  { icon: Wifi, title: "IoT Connectivity", desc: "ESP32-powered wireless transmission ensures seamless real-time cloud data sync from any location." },
];

const steps = [
  { num: "01", title: "Sensor Capture", desc: "MPU6050 captures 3-axis acceleration at 200 Hz" },
  { num: "02", title: "Signal Processing", desc: "Bandpass filtering removes noise and artifacts" },
  { num: "03", title: "FFT Analysis", desc: "Frequency-domain tremor biomarker extraction" },
  { num: "04", title: "Risk Scoring", desc: "AI model assigns Tremor Severity Score 0–10" },
  { num: "05", title: "Dashboard", desc: "Physician views real-time data and alerts" },
];

const Index = () => {
  return (
    <div className="min-h-screen hero-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-glow opacity-40 pointer-events-none" />
        <div className="container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-primary mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
              IoT-Powered · AI-Assisted · Real-Time
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Accurate Tremor{" "}
              <span className="gradient-text">Monitoring.</span>
              <br />
              Anytime, Anywhere.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              ECHO is a wearable IoT tremor detection system delivering continuous, objective motor symptom quantification — enabling early Parkinson's detection through frequency-domain tremor biomarkers and AI-assisted tremor classification.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/doctor-login">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 glow-primary font-semibold gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/doctor-login">
                <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-semibold gap-2">
                  Doctor Login <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/patient-login">
                <Button size="lg" variant="outline" className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 font-semibold gap-2">
                  Patient Login
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/30">
              {[["98%", "Detection Accuracy"], ["< 50ms", "Latency"], ["24/7", "Monitoring"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold gradient-text">{val}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl scale-95" />
              <img
                src={echoBand}
                alt="ECHO Tremor Monitoring Band"
                className="relative rounded-3xl w-full max-w-md object-cover glow-primary"
              />
              {/* Floating stats */}
              <div className="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3 animate-fade-in">
                <div className="text-xs text-muted-foreground">Tremor Score</div>
                <div className="font-display text-2xl font-bold text-warning">6.2 / 10</div>
                <div className="text-xs text-warning">Moderate</div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 animate-fade-in">
                <div className="text-xs text-muted-foreground">Frequency Peak</div>
                <div className="font-display text-2xl font-bold gradient-text">5.4 Hz</div>
                <div className="text-xs text-primary">Parkinsonian Band</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Parkinson's */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Understanding the Condition</span>
            <h2 className="font-display text-4xl font-bold mt-3 mb-6">About Parkinson's Tremor</h2>
            <p className="text-muted-foreground leading-relaxed">
              Parkinson's disease affects over 10 million people worldwide. Its hallmark symptom — a 3–8 Hz resting tremor — often goes undetected until significant neurodegeneration has occurred. ECHO's continuous remote monitoring changes that.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "3–8 Hz", sub: "Parkinsonian Tremor Frequency", desc: "Distinctive frequency band that differentiates Parkinson's tremor from essential tremor and other movement disorders." },
              { title: "10M+", sub: "People Affected Globally", desc: "Parkinson's disease is the fastest-growing neurological disorder, with incidence expected to double by 2040." },
              { title: "Early Detection", sub: "Changes Everything", desc: "Monitoring from prodromal stages enables timely intervention, slowing progression and improving quality of life." },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="font-display text-3xl font-bold gradient-text mb-1">{item.title}</div>
                <div className="text-sm font-semibold text-foreground mb-3">{item.sub}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ECHO Works */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">System Architecture</span>
            <h2 className="font-display text-4xl font-bold mt-3 mb-4">How ECHO Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From raw sensor data to clinical insights in milliseconds.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="glass-card rounded-2xl p-6 text-center w-44 hover:border-primary/30 transition-all hover:-translate-y-1">
                  <div className="font-display text-2xl font-bold gradient-text mb-2">{step.num}</div>
                  <div className="font-semibold text-sm text-foreground mb-2">{step.title}</div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-primary/40 mx-2 hidden md:block shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Capabilities</span>
            <h2 className="font-display text-4xl font-bold mt-3 mb-4">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Continuous Monitoring */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
              <div>
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Clinical Importance</span>
                <h2 className="font-display text-4xl font-bold mt-3 mb-6">Why Continuous Monitoring Matters</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Traditional clinic-based assessments capture only snapshots. ECHO's continuous remote monitoring reveals fluctuations across the full day — during medication on/off cycles, sleep, stress events, and daily activities.
                </p>
                <ul className="space-y-3">
                  {[
                    "Detect medication wearing-off before clinical symptoms emerge",
                    "Quantify medication impact with objective tremor data",
                    "Track long-term disease progression objectively",
                    "Enable remote neurological consultations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Parkinson's Digital Tremor Index", value: "PDTI™" },
                  { label: "Monitoring Hours Per Day", value: "24h" },
                  { label: "Data Points Per Minute", value: "12,000" },
                  { label: "Clinical Accuracy", value: "98.2%" },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-5 text-center">
                    <div className="font-display text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6">
              Start Monitoring Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join neurologists and patients worldwide using ECHO for precision Parkinson's management. Set up in minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/doctor-login">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 glow-primary font-semibold gap-2">
                  Doctor Portal <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/patient-login">
                <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-semibold">
                  Patient Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
