import { Clock, Bell, Upload, Volume2, Ticket, Navigation, TrendingDown, TrendingUp, Info, HeartPulse, Landmark } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Btn from "../components/ui/Btn";
import Badge from "../components/ui/Badge";
import { getGreeting, getTodayLabel } from "../utils/greeting";

export default function PatientDashboard({ navigate, user, moduleContent }) {
    const isGovt       = moduleContent?.key === "government";
    const entityLabel  = moduleContent?.entityLabel   || "Patient";
    const orgName      = moduleContent?.orgName       || "City General Hospital";
    const primaryDept  = moduleContent?.primaryDept   || "General OPD";
    const counterLabel = moduleContent?.counterLabel  || "Counter";
    const dept2        = moduleContent?.departments?.[1] || (isGovt ? "License & RTO" : "Cardiology");
    const firstName    = (user?.name || "Guest").split(" ")[0];
    const greeting     = getGreeting();
    const todayLabel   = getTodayLabel();

    // Module-specific token prefix and secondary token
    const tokenPrefix  = isGovt ? "G" : "A";
    const token1       = `${tokenPrefix}-042`;
    const token2       = isGovt ? "G-017" : "C-017";

    // Module-specific alerts
    const alerts = isGovt ? [
        { msg: `Token ${token1} will be called in ~10 minutes`, time: "2 min ago", type: "info" },
        { msg: `${counterLabel} 3 delay — estimated +5 min extra wait`, time: "15 min ago", type: "warn" },
        { msg: "Application G-015 approved and ready for collection", time: "1 hr ago", type: "success" },
    ] : [
        { msg: `Token ${token1} will be called in ~10 minutes`, time: "2 min ago", type: "info" },
        { msg: `${counterLabel} 3 delay — estimated +5 min extra wait`, time: "15 min ago", type: "warn" },
        { msg: "Lab Test token B-015 confirmed for 2:00 PM", time: "1 hr ago", type: "success" },
    ];

    const quickCards = [
        { icon: Ticket,     label: isGovt ? "Book Application" : "Book Token",    desc: isGovt ? "Reserve service slot"    : "Reserve your slot",  color: "blue",   page: "token-booking" },
        { icon: Navigation, label: isGovt ? "Service Finder"   : "Smart Routing", desc: isGovt ? "Find right department"  : "AI dept. guide",      color: "teal",   page: "smart-routing" },
        { icon: Clock,      label: isGovt ? "Track Application": "Track Queue",   desc: "Live position",                                            color: "purple", page: "queue-tracking" },
        { icon: Bell,       label: "Notifications",                                desc: "Alerts & updates",                                         color: "orange", page: "notifications" },
        { icon: Upload,     label: isGovt ? "Upload Documents" : "Upload Docs",   desc: isGovt ? "Submit proofs"          : "Share records",         color: "green",  page: "upload-documents" },
        { icon: Volume2,    label: "Voice Help",                                   desc: "English / Tamil",                                          color: "red",    page: "notifications" },
    ];
    const iconBgs = { blue:"bg-blue-50 text-blue-700", teal:"bg-cyan-50 text-cyan-700", purple:"bg-purple-50 text-purple-700", orange:"bg-amber-50 text-amber-700", green:"bg-emerald-50 text-emerald-700", red:"bg-red-50 text-red-700" };

    const waitTrend = [
        { visit: "4th prev", wait: 38 },
        { visit: "3rd prev", wait: 29 },
        { visit: "Last visit", wait: 31 },
        { visit: "Today", wait: 24 },
    ];
    const avgWait  = Math.round(waitTrend.reduce((a,b) => a + b.wait, 0) / waitTrend.length);
    const trendDown = waitTrend[waitTrend.length - 1].wait < waitTrend[0].wait;
    const gradColor = isGovt ? "#0891B2" : "#1D4ED8";

    const ModuleIcon = isGovt ? Landmark : HeartPulse;

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <ModuleIcon size={16} className={isGovt ? "text-cyan-600" : "text-blue-600"}/>
                    <span className={`text-xs font-semibold ${isGovt ? "text-cyan-600" : "text-blue-600"}`}>
                        {isGovt ? "Government Module" : "Hospital Module"}
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    {greeting}, {firstName} 👋
                </h1>
                <p className="text-slate-500 text-sm mt-1">{todayLabel} · {orgName}</p>
            </div>

            {/* Active token banner */}
            <div className={`bg-gradient-to-r ${isGovt ? "from-cyan-700 to-teal-600" : "from-blue-700 to-cyan-600"} rounded-2xl p-5 mb-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
                <div>
                    <p className="text-blue-100 text-xs mb-1">Active {isGovt ? "Application" : "Token"}</p>
                    <p className="text-5xl font-extrabold tracking-wider font-mono">{token1}</p>
                    <p className="text-blue-100 text-sm mt-1">{primaryDept} · {counterLabel} 3</p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-blue-100 text-xs mb-1">Estimated Wait</p>
                    <p className="text-4xl font-bold">24 min</p>
                    <p className="text-blue-100 text-sm mt-1">6 {isGovt ? "citizens" : "people"} ahead</p>
                </div>
                <Btn onClick={() => navigate("queue-tracking")} className="bg-white text-blue-700 hover:bg-blue-50 shrink-0 font-bold">
                    Track Live
                </Btn>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {quickCards.map(c => (
                    <button key={c.label} onClick={() => navigate(c.page)} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconBgs[c.color]} group-hover:scale-110 transition-transform`}><c.icon size={19}/></div>
                        <p className="font-semibold text-slate-900 text-sm">{c.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
                    </button>
                ))}
            </div>

            {/* Queue status & alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wide text-slate-400">
                        Current Queue Status
                    </h3>
                    {[
                        { dept: primaryDept, token: token1, ahead: 6, wait: "24 min", status: "active" },
                        { dept: dept2, token: token2, ahead: 12, wait: "48 min", status: "waiting" },
                    ].map(q => (
                        <div key={q.token} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">{q.dept}</p>
                                <p className="text-xs text-slate-500">{isGovt ? "Application" : "Token"} {q.token} · {q.ahead} ahead</p>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="font-bold text-slate-900 text-sm">{q.wait}</p>
                                <Badge text={q.status === "active" ? "Active" : "Waiting"} color={q.status === "active" ? "green" : "yellow"}/>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wide text-slate-400">
                        Recent Alerts
                    </h3>
                    {alerts.map((a, i) => (
                        <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type==="info" ? "bg-blue-500" : a.type==="warn" ? "bg-amber-500" : "bg-emerald-500"}`}/>
                            <div>
                                <p className="text-sm text-slate-700">{a.msg}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Personal wait trend */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-1">
                    <div>
                        <h3 className="font-bold text-slate-900">Your Wait Time Trend</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Why your estimated wait looks the way it does today</p>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${trendDown ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {trendDown ? <TrendingDown size={13}/> : <TrendingUp size={13}/>}
                        {trendDown ? "Improving" : "Rising"}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
                    <div className="lg:col-span-2">
                        <ResponsiveContainer width="100%" height={160}>
                            <AreaChart data={waitTrend} margin={{ left:-20, right:10 }}>
                                <defs>
                                    <linearGradient id="waitGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%"  stopColor={gradColor} stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor={gradColor} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                <XAxis dataKey="visit" tick={{ fontSize:10 }}/>
                                <YAxis tick={{ fontSize:10 }}/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="wait" stroke={gradColor} strokeWidth={2.5} fill="url(#waitGrad)" name="Wait (min)"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-slate-50 rounded-xl p-3.5">
                            <p className="text-2xl font-bold text-slate-900">{avgWait} min</p>
                            <p className="text-xs text-slate-500 mt-0.5">Your average wait, last 4 visits</p>
                        </div>
                        <div className={`flex items-start gap-2 ${isGovt ? "bg-cyan-50" : "bg-blue-50"} rounded-xl p-3.5`}>
                            <Info size={14} className={`${isGovt ? "text-cyan-600" : "text-blue-600"} shrink-0 mt-0.5`}/>
                            <p className={`text-xs ${isGovt ? "text-cyan-700" : "text-blue-700"} leading-relaxed`}>
                                {trendDown
                                    ? `Your wait time has been getting shorter — mid-morning ${isGovt ? "windows" : "slots"} are currently the fastest at this ${isGovt ? "service center" : "center"}.`
                                    : `Wait times have crept up recently. Booking an early ${isGovt ? "window" : "slot"} or off-peak hour may help.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
