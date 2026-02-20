import { useState, useRef, useEffect, useCallback } from "react";
import { Activity, Brain, CheckCircle, AlertCircle, Clock, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from "recharts";

/* ── Mock trend data ─────────────────────────────────────────── */
const stabilityTrend = [
  { day: "Mon", score: 72 }, { day: "Tue", score: 68 }, { day: "Wed", score: 65 },
  { day: "Thu", score: 70 }, { day: "Fri", score: 74 }, { day: "Sat", score: 71 }, { day: "Sun", score: 76 },
];

const reactionTrend = [
  { t: "1s", taps: 3 }, { t: "3s", taps: 7 }, { t: "5s", taps: 11 },
  { t: "7s", taps: 14 }, { t: "9s", taps: 17 }, { t: "11s", taps: 19 },
  { t: "13s", taps: 21 }, { t: "15s", taps: 23 },
];

const holdFluctuations = Array.from({ length: 40 }, (_, i) => ({
  t: i,
  v: Math.sin(i * 0.5) * 1.2 + (Math.random() - 0.5) * 0.6,
}));

/* ── Tooltip ─────────────────────────────────────────────────── */
const MiniTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-xl p-2 text-xs border border-border/50">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name ?? ""}: {p.value}</p>
      ))}
    </div>
  );
};

/* ── Rating helper ───────────────────────────────────────────── */
const RatingBadge = ({ rating }: { rating: string }) => {
  const cls =
    rating === "Good"            ? "severity-normal" :
    rating === "Moderate"        ? "severity-moderate" :
    "severity-high";
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{rating}</span>;
};

/* ════════════════════════════════════════════════════════════════
   1. STEADY HOLD TEST
══════════════════════════════════════════════════════════════════ */
const SteadyHoldTest = () => {
  const [phase, setPhase]       = useState<"idle" | "running" | "done">("idle");
  const [elapsed, setElapsed]   = useState(0);
  const [stability, setStability] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setPhase("running");
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev >= 9) {
          clearInterval(timerRef.current!);
          setPhase("done");
          setStability(Math.round(72 + Math.random() * 15));
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const reset = () => { setPhase("idle"); setElapsed(0); setStability(null); };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-base">Steady Hold Test</h4>
          <p className="text-xs text-muted-foreground">Objective Movement Stability Analysis</p>
        </div>
      </div>

      {phase === "idle" && (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">Hold your hand still for <span className="text-primary font-semibold">10 seconds</span>. The system will measure micro-deviations.</p>
          <Button onClick={start} className="bg-gradient-primary border-0 text-primary-foreground hover:opacity-90">
            Begin Test
          </Button>
        </div>
      )}

      {phase === "running" && (
        <div className="text-center py-4">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="42" stroke="hsl(var(--primary))" strokeWidth="8" fill="none"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - elapsed / 10)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-2xl font-bold gradient-text">{10 - elapsed}s</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Keep your hand still…</p>
        </div>
      )}

      {phase === "done" && stability !== null && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Stability Score</div>
              <div className={`font-display text-4xl font-bold ${stability >= 75 ? "text-success" : stability >= 55 ? "text-warning" : "text-destructive"}`}>
                {stability}<span className="text-lg text-muted-foreground">/100</span>
              </div>
            </div>
            <RatingBadge rating={stability >= 75 ? "Good" : stability >= 55 ? "Moderate" : "Needs Attention"} />
          </div>
          <p className="text-xs text-muted-foreground mb-3">Micro-movement fluctuation during hold:</p>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={holdFluctuations}>
              <defs>
                <linearGradient id="holdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={[-3, 3]} />
              <XAxis hide />
              <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={1.5} fill="url(#holdGrad)" />
            </AreaChart>
          </ResponsiveContainer>
          <Button size="sm" variant="outline" onClick={reset} className="mt-3 w-full border-border/50">
            Retake Test
          </Button>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   2. LINE TRACE TEST
══════════════════════════════════════════════════════════════════ */
const LineTraceTest = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing]     = useState(false);
  const [done, setDone]           = useState(false);
  const [deviation, setDeviation] = useState<number | null>(null);
  const [smoothness, setSmoothness] = useState<number | null>(null);
  const pathRef = useRef<{ x: number; y: number }[]>([]);

  const TARGET_Y = 90; // target line y coordinate within canvas

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // target line
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = "hsl(var(--border))";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, TARGET_Y);
    ctx.lineTo(canvas.width - 20, TARGET_Y);
    ctx.stroke();
    ctx.setLineDash([]);
    // labels
    ctx.fillStyle = "hsl(220 15% 55%)";
    ctx.font = "11px Inter";
    ctx.fillText("START →", 24, TARGET_Y - 8);
    ctx.fillText("→ END", canvas.width - 70, TARGET_Y - 8);
  }, []);

  useEffect(() => { drawGuide(); }, [drawGuide]);

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (done) return;
    const canvas = canvasRef.current!;
    pathRef.current = [];
    setDrawing(true);
    const pos = getPos(e, canvas);
    pathRef.current.push(pos);
    drawGuide();
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing || done) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    pathRef.current.push(pos);
    ctx.strokeStyle = "hsl(var(--accent))";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const onEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing) return;
    setDrawing(false);
    setDone(true);
    const pts = pathRef.current;
    if (pts.length < 5) return;
    const avgDev = pts.reduce((s, p) => s + Math.abs(p.y - TARGET_Y), 0) / pts.length;
    setDeviation(Math.round(avgDev));
    // smoothness: inverse of direction changes
    let changes = 0;
    for (let i = 2; i < pts.length; i++) {
      const dy1 = pts[i - 1].y - pts[i - 2].y;
      const dy2 = pts[i].y - pts[i - 1].y;
      if (Math.sign(dy1) !== Math.sign(dy2)) changes++;
    }
    const smooth = Math.max(0, Math.round(100 - (changes / pts.length) * 400));
    setSmoothness(Math.min(100, smooth));
  };

  const reset = () => {
    setDone(false);
    setDrawing(false);
    setDeviation(null);
    setSmoothness(null);
    pathRef.current = [];
    drawGuide();
  };

  const rating =
    deviation === null ? "" :
    deviation < 8  ? "Good" :
    deviation < 18 ? "Moderate" :
    "Needs Attention";

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-base">Line Trace Test</h4>
          <p className="text-xs text-muted-foreground">Motor Function Quantification</p>
        </div>
      </div>

      {!done && (
        <p className="text-xs text-muted-foreground mb-3">
          Trace the dashed line from start to end as smoothly as possible.
        </p>
      )}

      <canvas
        ref={canvasRef}
        width={460}
        height={180}
        className="w-full rounded-xl border border-border/30 bg-secondary/20 touch-none cursor-crosshair"
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      />

      {done && deviation !== null && smoothness !== null && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="glass rounded-xl p-3 text-center">
            <div className={`font-display text-xl font-bold ${deviation < 8 ? "text-success" : deviation < 18 ? "text-warning" : "text-destructive"}`}>
              {deviation}px
            </div>
            <div className="text-xs text-muted-foreground">Avg Deviation</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className={`font-display text-xl font-bold ${smoothness >= 70 ? "text-success" : smoothness >= 45 ? "text-warning" : "text-destructive"}`}>
              {smoothness}
            </div>
            <div className="text-xs text-muted-foreground">Smoothness</div>
          </div>
          <div className="glass rounded-xl p-3 text-center flex flex-col items-center justify-center">
            <RatingBadge rating={rating} />
          </div>
          <Button size="sm" variant="outline" onClick={reset} className="col-span-3 border-border/50">
            Retrace
          </Button>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   3. RAPID TAP TEST
══════════════════════════════════════════════════════════════════ */
const RapidTapTest = () => {
  const DURATION = 15;
  const [phase, setPhase]       = useState<"idle" | "running" | "done">("idle");
  const [elapsed, setElapsed]   = useState(0);
  const [taps, setTaps]         = useState(0);
  const [tapLog, setTapLog]     = useState<{ t: number; gap: number }[]>([]);
  const lastTapTime             = useRef<number>(0);
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setPhase("running");
    setElapsed(0);
    setTaps(0);
    setTapLog([]);
    lastTapTime.current = 0;
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev >= DURATION - 1) {
          clearInterval(timerRef.current!);
          setPhase("done");
          return DURATION;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleTap = () => {
    if (phase !== "running") return;
    const now = Date.now();
    const gap = lastTapTime.current ? now - lastTapTime.current : 0;
    lastTapTime.current = now;
    setTaps(t => t + 1);
    setTapLog(prev => [...prev, { t: prev.length + 1, gap }]);
  };

  const reset = () => { setPhase("idle"); setElapsed(0); setTaps(0); setTapLog([]); };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const tapSpeed        = phase === "done" ? (taps / DURATION).toFixed(1) : "—";
  const avgGap          = tapLog.length > 1
    ? Math.round(tapLog.slice(1).reduce((s, t) => s + t.gap, 0) / (tapLog.length - 1))
    : 0;
  const rhythmScore     = phase === "done" && tapLog.length > 2
    ? Math.min(100, Math.round(100 - (Math.abs(avgGap - 500) / 10)))
    : null;
  const fatigueIndex    = phase === "done" && tapLog.length >= 6
    ? (() => {
        const first = tapLog.slice(1, 4).reduce((s, t) => s + t.gap, 0) / 3;
        const last  = tapLog.slice(-3).reduce((s, t) => s + t.gap, 0) / 3;
        return Math.round(((last - first) / first) * 100);
      })()
    : null;

  const barData = tapLog.length > 1
    ? tapLog.slice(1).map((t, i) => ({ tap: i + 1, gap: Math.round(t.gap) }))
    : [];

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center">
          <Clock className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-base">Rapid Tap Test</h4>
          <p className="text-xs text-muted-foreground">Rhythm Consistency & Motor Fatigue Index</p>
        </div>
      </div>

      {phase === "idle" && (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">
            Tap the button as fast as you can for <span className="text-warning font-semibold">15 seconds</span>.
          </p>
          <Button onClick={start} className="bg-gradient-to-r from-warning/80 to-warning border-0 text-background hover:opacity-90 font-semibold">
            Start Tapping
          </Button>
        </div>
      )}

      {phase === "running" && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div>
              <div className="font-display text-4xl font-bold gradient-text">{taps}</div>
              <div className="text-xs text-muted-foreground">Taps</div>
            </div>
            <div className="text-muted-foreground">·</div>
            <div>
              <div className={`font-display text-4xl font-bold ${DURATION - elapsed <= 5 ? "text-destructive" : "text-warning"}`}>
                {DURATION - elapsed}s
              </div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
          <button
            onClick={handleTap}
            className="w-32 h-32 rounded-full bg-gradient-primary border-0 text-primary-foreground font-display font-bold text-xl glow-primary active:scale-95 transition-transform mx-auto block"
          >
            TAP
          </button>
        </div>
      )}

      {phase === "done" && (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="glass rounded-xl p-3 text-center">
              <div className="font-display text-2xl font-bold text-primary">{tapSpeed}</div>
              <div className="text-xs text-muted-foreground">Taps/sec</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className={`font-display text-2xl font-bold ${(rhythmScore ?? 0) >= 70 ? "text-success" : "text-warning"}`}>
                {rhythmScore ?? "—"}
              </div>
              <div className="text-xs text-muted-foreground">Rhythm Score</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className={`font-display text-2xl font-bold ${(fatigueIndex ?? 0) <= 15 ? "text-success" : "text-destructive"}`}>
                {fatigueIndex !== null ? `${fatigueIndex > 0 ? "+" : ""}${fatigueIndex}%` : "—"}
              </div>
              <div className="text-xs text-muted-foreground">Fatigue Index</div>
            </div>
          </div>
          {barData.length > 0 && (
            <>
              <p className="text-xs text-muted-foreground mb-2">Inter-tap interval (ms):</p>
              <ResponsiveContainer width="100%" height={90}>
                <BarChart data={barData.slice(-20)}>
                  <XAxis hide />
                  <YAxis hide />
                  <Tooltip content={<MiniTooltip />} />
                  <Bar dataKey="gap" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} name="Gap ms" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          <Button size="sm" variant="outline" onClick={reset} className="mt-3 w-full border-border/50">
            Retry Test
          </Button>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   PERFORMANCE SUMMARY CARD
══════════════════════════════════════════════════════════════════ */
const PerformanceSummary = () => (
  <div className="glass-card rounded-2xl p-6">
    <h4 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-success" /> Performance Summary
    </h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Motor Control Score",  value: "6.8", unit: "/10", color: "text-warning", icon: Activity },
        { label: "vs Last Week",         value: "+0.4", unit: "",   color: "text-success",  icon: TrendingUp },
        { label: "Stability Index",      value: "71%",  unit: "",   color: "text-primary",  icon: Zap },
        { label: "Reaction Consistency", value: "82%",  unit: "",   color: "text-accent",   icon: AlertCircle },
      ].map(s => (
        <div key={s.label} className="glass rounded-xl p-4 text-center">
          <s.icon className={`w-4 h-4 mx-auto mb-2 ${s.color}`} />
          <div className={`font-display text-2xl font-bold ${s.color}`}>
            {s.value}<span className="text-sm text-muted-foreground">{s.unit}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Motor Stability Trend */}
      <div>
        <h5 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Motor Stability Trend</h5>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={stabilityTrend}>
            <defs>
              <linearGradient id="stabGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fill: "hsl(220 15% 55%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 10 }} domain={[50, 100]} />
            <Tooltip content={<MiniTooltip />} />
            <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#stabGrad)" name="Stability" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Reaction Consistency Graph */}
      <div>
        <h5 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Reaction Consistency Graph</h5>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={reactionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="t" tick={{ fill: "hsl(220 15% 55%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 10 }} />
            <Tooltip content={<MiniTooltip />} />
            <Line type="monotone" dataKey="taps" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} name="Taps" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Improvement indicator */}
    <div className="mt-5 flex items-center gap-3 glass rounded-xl p-4">
      <TrendingUp className="w-5 h-5 text-success shrink-0" />
      <div>
        <div className="text-sm font-semibold text-success">Improvement Detected</div>
        <div className="text-xs text-muted-foreground">
          Motor Control Score improved by <span className="text-success font-semibold">+0.4 pts</span> compared to last week's baseline. Stability trend shows positive progression.
        </div>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
const DailyMotorAssessment = () => (
  <section className="mt-8">
    {/* Section header */}
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl">Daily Motor Assessment</h3>
          <p className="text-muted-foreground text-sm">Daily Neuromotor Assessment · Motor Function Quantification</p>
        </div>
      </div>
    </div>

    {/* 3 tests */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <SteadyHoldTest />
      <LineTraceTest />
      <RapidTapTest />
    </div>

    {/* Summary */}
    <PerformanceSummary />
  </section>
);

export default DailyMotorAssessment;
