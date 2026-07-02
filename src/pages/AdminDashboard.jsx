import { useState, useEffect } from "react";
import { Users, Activity, Building, FileBarChart, Ticket, HeartPulse, Landmark } from "lucide-react";
import Badge from "../components/ui/Badge";
import StatCard from "../components/ui/StatCard";
import { getGreeting } from "../utils/greeting";

function useLive(base, { min, max, step, ms }) {
    const [val, setVal] = useState(base);
    useEffect(() => {
        const t = setInterval(() => {
            setVal(v => {
                const n = v + (Math.random() > 0.5 ? step : -step);
                return Math.min(max, Math.max(min, n));
            });
        }, ms);
        return () => clearInterval(t);
    }, []);
    return val;
}

export default function AdminDashboard({ navigate, user, moduleContent }) {
    const isGovt         = moduleContent?.key === "government";
    const orgName        = moduleContent?.orgName        || "City General Hospital";
    const systemStatus   = moduleContent?.systemStatus   || [];
    const quickAction    = moduleContent?.quickActions?.[0] || { label:"Manage Departments", desc:"Configure queues", page:"receptionist-dashboard" };
    const deptCount      = moduleContent?.departments?.length || 6;
    const entityPlural   = moduleContent?.entityLabelPlural  || "Patients";
    const dashTitle      = moduleContent?.dashboardTitles?.admin || "Admin Dashboard";
    const ModuleIcon     = isGovt ? Landmark : HeartPulse;

    const totalUsers  = useLive(1284, { min:1260, max:1320, step:2,  ms:5000 });
    const activeQ     = useLive(12,   { min:8,    max:16,   step:1,  ms:6000 });
    const tokensToday = useLive(356,  { min:340,  max:400,  step:2,  ms:4500 });

    const deptUsage = (moduleContent?.deptPie || []).map(d => ({
        name: d.name,
        pct:  d.value,
        color: d.color,
    }));

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <ModuleIcon size={15} className={isGovt ? "text-cyan-600" : "text-blue-600"}/>
                    <span className={`text-xs font-semibold ${isGovt ? "text-cyan-600" : "text-blue-600"}`}>
                        {isGovt ? "Government Module" : "Hospital Module"}
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    {dashTitle}
                </h1>
                <p className="text-slate-500 text-sm mt-1">{getGreeting()}, {(user?.name || "Guest").split(" ")[0]} · System Overview · {orgName}</p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard icon={Users}    label={`Total ${entityPlural}`}  value={totalUsers.toLocaleString()} trend="+24"  color="blue"/>
                <StatCard icon={Activity} label="Active Queues"            value={String(activeQ)}                          color="teal"/>
                <StatCard icon={Building} label={isGovt ? "Service Windows" : "Departments"} value={String(deptCount)}      color="purple"/>
                <StatCard icon={Ticket}   label={isGovt ? "Applications Today" : "Tokens Today"} value={String(tokensToday)} trend="+8%" color="green"/>
            </div>

            {/* Dept / Window usage */}
            {deptUsage.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                    <h3 className="font-bold text-slate-900 mb-4">
                        {isGovt ? "Service Window Load" : "Department Load"}
                    </h3>
                    <div className="space-y-3">
                        {deptUsage.map(d => (
                            <div key={d.name}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-slate-700 font-medium">{d.name}</span>
                                    <span className="text-slate-500 font-mono text-xs">{d.pct}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width:`${d.pct}%`, background: d.color }}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* System status */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h3 className="font-bold text-slate-900 mb-4">System Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {systemStatus.map(s => (
                        <div key={s.label} className="flex items-center justify-between py-2.5 px-4 bg-slate-50 rounded-xl">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                                <p className="text-xs text-slate-500">Uptime: {s.uptime}</p>
                            </div>
                            <Badge text={s.status} color={s.color}/>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { icon:Users,       label:`Manage ${entityPlural}`,     desc:"Add, edit, or remove system users",        page:"settings",            accent: isGovt ? "text-cyan-600"   : "text-blue-600" },
                    { icon:Building,    label:quickAction.label,             desc:quickAction.desc,                           page:quickAction.page,       accent: isGovt ? "text-teal-600"   : "text-cyan-600" },
                    { icon:FileBarChart,label:"View Reports",                desc:"Daily, weekly, monthly analytics",         page:"reports",             accent:"text-purple-600" },
                ].map(a => (
                    <button key={a.label} onClick={() => navigate(a.page)}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all text-left group">
                        <a.icon size={24} className={`${a.accent} mb-3 group-hover:scale-110 transition-transform`}/>
                        <p className="font-bold text-slate-900 mb-1">{a.label}</p>
                        <p className="text-sm text-slate-500">{a.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
