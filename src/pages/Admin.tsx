import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { LogOut, RefreshCw, BarChart3, ShieldAlert, MousePointerClick, Eye, CalendarDays } from "lucide-react";
import { format, parseISO, subDays } from "date-fns";

interface AnalyticEvent {
  id: string;
  created_at: string;
  event_type: 'page_view' | 'click';
  link_name: string;
  source: string | null;
}

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AnalyticEvent[]>([]);
  const [timeRange, setTimeRange] = useState<number>(7);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchStats();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchStats();
    });

    return () => subscription.unsubscribe();
  }, [timeRange]);

  const fetchStats = async () => {
    setLoading(true);
    const startDate = subDays(new Date(), timeRange).toISOString();

    const { data: analytics, error } = await supabase
      .from("analytics")
      .select("*")
      .gte('created_at', startDate)
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error) {
      console.error("Error fetching analytics:", error);
    } else if (analytics) {
      setData(analytics as AnalyticEvent[]);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- Process Data for Charts ---
  
  // 1. Total Metrics
  const totalViews = data.filter(d => d.event_type === 'page_view').length;
  const totalClicks = data.filter(d => d.event_type === 'click').length;
  const clickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  // 2. Clicks by Link (Bar Chart Data)
  const linkClicks = useMemo(() => {
    const counts: Record<string, number> = {};
    data.filter(d => d.event_type === 'click').forEach((d) => {
      counts[d.link_name] = (counts[d.link_name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ link_name: name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // top 10
  }, [data]);

  // 3. Time Series Data (Area Chart Data)
  const timeSeriesData = useMemo(() => {
    if (data.length === 0) return [];
    
    // Create an object holding the last X days initialized to 0
    const lastXDays: Record<string, { date: string; views: number; clicks: number }> = {};
    for (let i = timeRange - 1; i >= 0; i--) {
      const d = format(subDays(new Date(), i), 'MMM dd');
      lastXDays[d] = { date: d, views: 0, clicks: 0 };
    }

    // Populate with actual data
    data.forEach(event => {
      const dateStr = format(parseISO(event.created_at), 'MMM dd');
      if (lastXDays[dateStr]) {
        if (event.event_type === 'page_view') lastXDays[dateStr].views += 1;
        if (event.event_type === 'click') lastXDays[dateStr].clicks += 1;
      }
    });

    return Object.values(lastXDays);
  }, [data, timeRange]);

  // 4. Source Data (Pie/Bar Chart Data)
  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};
    // Only count unique page views per source, or just all page views
    data.filter(d => d.event_type === 'page_view').forEach((d) => {
      const src = d.source || 'direct'; // Default to direct if no source
      counts[src] = (counts[src] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ source_name: name.toUpperCase(), count }))
      .sort((a, b) => b.count - a.count);
  }, [data]);


  if (!session) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldAlert className="text-primary w-6 h-6" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-bold text-center mb-2">Admin Panel</h2>
          <p className="text-center text-sm text-foreground/60 mb-8">Sign in to view site analytics</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none transition-colors text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none transition-colors text-white"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-body">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <BarChart3 className="text-primary w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold">Analytics Dashboard</h1>
              <p className="text-sm text-foreground/60">Live traffic & interactions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Time Range Toggles */}
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setTimeRange(days)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    timeRange === days 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-foreground/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {days}Z
                </button>
              ))}
            </div>

            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
               <Eye className="text-blue-400 w-6 h-6" />
             </div>
             <div>
                <p className="text-sm text-foreground/60 font-medium tracking-wide">TOTAL VISITS</p>
                <p className="text-3xl font-display font-bold">{totalViews}</p>
             </div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
               <MousePointerClick className="text-primary w-6 h-6" />
             </div>
             <div>
                <p className="text-sm text-foreground/60 font-medium tracking-wide">TOTAL LINK CLICKS</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-display font-bold">{totalClicks}</p>
                  <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary flex items-center gap-1">
                    {clickRate}% Rate
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Time Series Area Chart */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays className="w-5 h-5 text-foreground/70" />
            <h2 className="text-lg font-semibold">Traffic Over Time (Last {timeRange} Days)</h2>
          </div>
          <div className="h-[300px] w-full">
            {timeSeriesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(75, 70%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(75, 70%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(80, 15%, 12%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem' }}
                  />
                  <Area type="monotone" dataKey="views" name="Page Views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="clicks" name="Link Clicks" stroke="hsl(75, 70%, 50%)" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-full flex items-center justify-center text-foreground/40 text-sm">
                 {loading ? 'Processing time-series...' : 'No historical data found.'}
               </div>
            )}
          </div>
        </div>

        {/* Clicks Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Most Clicked Links
            </h2>
            <div className="h-[250px] w-full">
              {linkClicks.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={linkClicks} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="link_name"
                      stroke="rgba(255,255,255,0.3)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.3)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{
                        backgroundColor: 'hsl(80, 15%, 12%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                      }}
                    />
                    <Bar dataKey="count" name="Clicks" radius={[4, 4, 0, 0]}>
                      {linkClicks.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(75, 70%, 50%)' : 'rgba(255,255,255,0.2)'}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-foreground/40 text-sm">
                  Waiting for clicks...
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h2 className="text-lg font-semibold mb-4 text-foreground/90">Detailed Click Ranks</h2>
            <div className="divide-y divide-white/5 max-h-[250px] overflow-y-auto pr-2">
              {linkClicks.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-white">{item.link_name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-foreground/50">clicks</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-primary">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
              {!loading && linkClicks.length === 0 && (
                <div className="py-8 text-center text-foreground/40 text-sm">
                  Waiting for traffic...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Traffic Sources Breakdown */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            Top Traffic Sources (UTM)
          </h2>
          <div className="h-[250px] w-full">
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis type="category" dataKey="source_name" stroke="rgba(255,255,255,0.6)" fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: 'hsl(80, 15%, 12%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Bar dataKey="count" name="Visitors" radius={[0, 4, 4, 0]}>
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : 'rgba(59, 130, 246, 0.4)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-foreground/40 text-sm">
                No source data available yet...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
