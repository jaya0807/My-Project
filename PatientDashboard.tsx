import { Link, useNavigate } from "react-router-dom";
import { Activity, AlertTriangle, Bell, Calendar, Download, LogOut, TrendingUp, User, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import DailyMotorAssessment from "@/components/DailyMotorAssessment";

const realtimeData = [
  { t: "09:00", intensity: 2.1 }, { t: "09:05", intensity: 3.4 }, { t: "09:10", intensity: 5.2 },
  { t: "09:15", intensity: 4.8 }, { t: "09:20", intensity: 6.1 }, { t: "09:25", intensity: 7.3 },
  { t: "09:30", intensity: 5.9 }, { t: "09:35", intensity: 4.2 }, { t: "09:40", intensity: 5.8 },
  { t: "09:45", intensity: 6.7 }, { t: "09:50", intensity: 4.5 }, { t: "09:55", intensity: 3.8 },
];

const weeklyData = [
  { day: "Mon", thisWeek: 4.2, lastWeek: 3.8 },
  { day: "Tue", thisWeek: 5.1, lastWeek: 4.2 },
  { day: "Wed", thisWeek: 6.3, lastWeek: 4.8 },
  { day: "Thu", thisWeek: 5.8, lastWeek: 5.1 },
  { day: "Fri", thisWeek: 7.1, lastWeek: 5.3 },
  { day: "Sat", thisWeek: 4.9, lastWeek: 4.6 },
  { day: "Sun", thisWeek: 5.4, lastWeek: 4.2 },
];

const rawSignal = Array.from({ length: 50 }, (_, i) => ({
  i, v: Math.sin(i * 0.6) * 2 + Math.sin(i * 1.8) * 0.8 + (Math.random() - 0.5) * 0.4
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs border border-border/50">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const PatientDashboard = () => {
  const navigate = useNavigate();

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
            <span className="text-sm text-muted-foreground">Patient Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-warning cursor-pointer" />
            <Button size="sm" variant="ghost" onClick={() => navigate("/patient-login")} className="text-muted-foreground gap-1">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Patient Details */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg">Riya Patel</h2>
                <p className="text-muted-foreground text-sm">PT-101</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Age",                  value: "58 years" },
                { label: "Parkinson's Stage",    value: "Stage II" },
                { label: "Assigned Neurologist", value: "Dr. Jaya Sharma" },
                { label: "Last Check-up",        value: "Feb 10, 2025" },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-border/30">
                <span className="text-muted-foreground">Device Status</span>
                <span className="flex items-center gap-1.5 text-success text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
                  <Wifi className="w-3 h-3" /> Connected
                </span>
              </div>
            </div>
          </div>

          {/* Today's Status */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 text-muted-foreground text-sm uppercase tracking-wider">Today's Tremor Status</h3>
            <div className="severity-moderate rounded-2xl p-6 text-center mb-4">
              <div className="font-display text-5xl font-bold mb-2">5.2</div>
              <div className="text-lg font-semibold">Moderate Tremor</div>
              <div className="text-sm opacity-70 mt-1">PDTI Score / 10</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold text-primary">4.8 Hz</div>
                <div className="text-xs text-muted-foreground">Peak Frequency</div>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold text-warning">62%</div>
                <div className="text-xs text-muted-foreground">Tremor Active Time</div>
              </div>
            </div>
          </div>

          {/* Alert Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="severity-high rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Tremor Activity Detected</span>
              </div>
              <p className="text-sm opacity-80">Tremor intensity spike at 09:25 AM — PDTI reached 6.1. Consider contacting your neurologist.</p>
              <div className="text-xs opacity-60 mt-2">Today, 09:25 AM</div>
            </div>
            <div className="mt-auto space-y-3">
              <Button className="w-full bg-gradient-primary border-0 text-primary-foreground gap-2 hover:opacity-90">
                <Download className="w-4 h-4" /> Export Report as PDF
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Calendar className="w-3 h-3" />
                <span>Medication Reminder: Levodopa due at 12:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Real-Time Tremor */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-lg">Real-Time Tremor Intensity</h3>
                <p className="text-muted-foreground text-xs mt-0.5">Time vs. Tremor Intensity (PDTI Units)</p>
              </div>
              <span className="flex items-center gap-1.5 text-success text-xs font-semibold glass px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" /> LIVE
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={realtimeData}>
                <defs>
                  <linearGradient id="intensityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(196 85% 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(196 85% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 25% 18%)" />
                <XAxis dataKey="t" tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} domain={[0, 10]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="intensity" stroke="hsl(196 85% 48%)" strokeWidth={2} fill="url(#intensityGrad)" name="Intensity" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Trend */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-lg">Weekly Tremor Trend</h3>
                <p className="text-muted-foreground text-xs mt-0.5">This Week vs. Last Week (avg PDTI)</p>
              </div>
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 25% 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} domain={[0, 10]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(220 15% 55%)" }} />
                <Line type="monotone" dataKey="thisWeek" stroke="hsl(196 85% 48%)" strokeWidth={2.5} dot={{ r: 4 }} name="This Week" />
                <Line type="monotone" dataKey="lastWeek" stroke="hsl(168 75% 42%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Last Week" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Raw Signal + Medication */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-display font-semibold text-lg mb-1">Raw Sensor Signal Preview</h3>
            <p className="text-muted-foreground text-xs mb-5">MPU6050 Accelerometer · Z-Axis · Sampling @ 200 Hz</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={rawSignal}>
                <YAxis hide domain={[-4, 4]} />
                <XAxis hide />
                <Line type="monotone" dataKey="v" stroke="hsl(168 75% 42%)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Medication Tracker</h3>
            <div className="space-y-3">
              {[
                { med: "Levodopa 100mg", time: "08:00 AM", status: "Taken" },
                { med: "Levodopa 100mg", time: "12:00 PM", status: "Due" },
                { med: "Pramipexole",    time: "06:00 PM", status: "Upcoming" },
                { med: "Levodopa 100mg", time: "10:00 PM", status: "Upcoming" },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{m.med}</div>
                    <div className="text-xs text-muted-foreground">{m.time}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.status === "Taken" ? "severity-normal" : m.status === "Due" ? "severity-high" : "severity-moderate"}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Motor Assessment */}
        <DailyMotorAssessment />
      </div>
    </div>
  );
};

export default PatientDashboard;
