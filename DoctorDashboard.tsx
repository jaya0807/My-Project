import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity, AlertTriangle, Bell, ChevronRight, Download, Eye, LogOut, Search,
  Shield, User, Users, Wifi, Brain, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const patients = [
  { id: "PT-101", name: "Riya Patel",    connected: "Jan 12, 2025", reading: "Moderate",    score: 5.2 },
  { id: "PT-102", name: "Amit Kumar",    connected: "Feb 01, 2025", reading: "High Tremor",  score: 8.1 },
  { id: "PT-103", name: "Akash Singh",   connected: "Nov 28, 2024", reading: "Normal",       score: 2.1 },
  { id: "PT-104", name: "Priya Desai",   connected: "Mar 05, 2025", reading: "High Tremor",  score: 7.9 },
  { id: "PT-105", name: "Suresh Nair",   connected: "Dec 15, 2024", reading: "Normal",       score: 1.8 },
  { id: "PT-106", name: "Meera Joshi",   connected: "Feb 20, 2025", reading: "Moderate",     score: 4.6 },
];

const alerts = [
  { patient: "Amit Kumar",  msg: "High Tremor Spike Detected — PDTI Score: 8.1", time: "3 min ago",  level: "high" },
  { patient: "Priya Desai", msg: "Medication wearing-off pattern identified",      time: "21 min ago", level: "high" },
  { patient: "Riya Patel",  msg: "Tremor frequency elevated — 6.2 Hz sustained",  time: "1 hr ago",   level: "moderate" },
];

const ReadingBadge = ({ reading }: { reading: string }) => {
  const cls =
    reading === "High Tremor" ? "severity-high" :
    reading === "Moderate"   ? "severity-moderate" :
    "severity-normal";
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{reading}</span>;
};

const DoctorDashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filtered = patients.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)
  );

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
            <span className="text-sm text-muted-foreground">Parkinson's Monitoring Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">3</span>
            </div>
            <Link to="/doctor-profile">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <User className="w-4 h-4 text-primary" />
              </div>
            </Link>
            <Button size="sm" variant="ghost" onClick={() => navigate("/doctor-login")} className="text-muted-foreground hover:text-foreground gap-1">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Good morning, Dr. Jaya Sharma</h1>
          <p className="text-muted-foreground mt-1">Here's your patient overview for today · <span className="text-primary">3 active alerts</span></p>
        </div>

        {/* Stats — 6 metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {[
            { icon: Users,         label: "Total Patients",            value: "6",    sub: "+2 this month",    color: "text-primary" },
            { icon: AlertTriangle, label: "High Severity",             value: "2",    sub: "Require attention", color: "text-destructive" },
            { icon: Bell,          label: "Active Alerts",             value: "3",    sub: "Last 2 hours",      color: "text-warning" },
            { icon: Wifi,          label: "Devices Online",            value: "5/6",  sub: "1 disconnected",    color: "text-success" },
            { icon: Brain,         label: "Motor Perf. Score",         value: "7.2",  sub: "Avg across patients", color: "text-primary" },
            { icon: BarChart3,     label: "Daily Stability Index",     value: "63%",  sub: "PDTI™ composite",   color: "text-accent" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.sub}</span>
              </div>
              <div className={`font-display text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Alerts Panel */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" /> Alerts
              </h2>
              <Badge variant="destructive" className="text-xs">{alerts.length} new</Badge>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className={`rounded-xl p-4 ${alert.level === "high" ? "severity-high" : "severity-moderate"}`}>
                  <div className="font-semibold text-sm mb-1">{alert.patient}</div>
                  <p className="text-xs opacity-80 mb-2 leading-relaxed">{alert.msg}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-60">{alert.time}</span>
                    <Link to="/patient-dashboard">
                      <button className="text-xs font-semibold flex items-center gap-1 hover:opacity-80">
                        View Details <ChevronRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <h2 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> System Status
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: "Avg PDTI Score Today",         value: "4.62",  color: "text-warning" },
                { label: "Peak Frequency Detected",      value: "6.2 Hz", color: "text-primary" },
                { label: "Alerts Resolved Today",        value: "8",     color: "text-success" },
                { label: "Reports Exported",             value: "3",     color: "text-muted-foreground" },
                { label: "Parkinson's Digital Tremor Index", value: "PDTI™", color: "text-accent" },
                { label: "Motor Control Assessments",    value: "12",    color: "text-primary" },
              ].map(s => (
                <div key={s.label} className="glass rounded-xl p-4">
                  <div className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button size="sm" className="bg-gradient-primary border-0 text-primary-foreground gap-2 hover:opacity-90">
                <Download className="w-4 h-4" /> Export All Reports
              </Button>
              <Link to="/doctor-profile">
                <Button size="sm" variant="outline" className="border-border/50 gap-2">
                  <User className="w-4 h-4" /> My Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
            <h2 className="font-display font-semibold text-lg">Patient Registry</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 bg-secondary/50 border-border/50 w-64"
                placeholder="Search patients..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border/30">
                  <th className="text-left py-3 pr-4">Patient Name</th>
                  <th className="text-left py-3 pr-4">Patient ID</th>
                  <th className="text-left py-3 pr-4">Device Connected</th>
                  <th className="text-left py-3 pr-4">Last Reading</th>
                  <th className="text-left py-3 pr-4">PDTI Score</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-4 pr-4 font-medium">{p.name}</td>
                    <td className="py-4 pr-4 text-muted-foreground text-sm font-mono">{p.id}</td>
                    <td className="py-4 pr-4 text-muted-foreground text-sm">{p.connected}</td>
                    <td className="py-4 pr-4"><ReadingBadge reading={p.reading} /></td>
                    <td className="py-4 pr-4">
                      <span className={`font-display font-bold ${p.score >= 7 ? "text-destructive" : p.score >= 4 ? "text-warning" : "text-success"}`}>
                        {p.score}
                      </span>
                      <span className="text-muted-foreground text-xs ml-1">/10</span>
                    </td>
                    <td className="py-4">
                      <Link to="/patient-dashboard">
                        <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 gap-1 text-xs">
                          <Eye className="w-3 h-3" /> View Status
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
