import { useState, useEffect } from "react";
import { Users, AlertTriangle, CheckCircle, Star } from "lucide-react";
import Badge from "../components/ui/Badge";
import StatCard from "../components/ui/StatCard";
import { getGreeting } from "../utils/greeting";

export default function NurseDashboard({ user, moduleContent }) {
    const isGovt       = moduleContent?.key === "government";
    const dashTitle    = moduleContent?.dashboardTitles?.nurse || (isGovt ? "Verification Dashboard" : "Nurse Dashboard");
    const primaryDept  = moduleContent?.primaryDept || "General OPD";
    const entityLabel  = moduleContent?.entityLabel || "Patient";

    // Re-initialise sections whenever moduleContent changes (hospital ↔ government)
    const [sections, setSections] = useState([]);
    const [servedCount, setServedCount] = useState(43);

    useEffect(() => {
        setSections([
            {
                id: "emergency",
                title: isGovt ? "Priority Cases" : "Emergency Queue",
                badge: "red",
                items: (moduleContent?.emergencyQueue || []).map(i => ({ ...i })),
            },
            {
                id: "senior",
                title: "Senior Citizen Queue",
                badge: "purple",
                items: (moduleContent?.seniorQueue || []).map(i => ({ ...i })),
            },
            {
                id: "main",
                title: isGovt ? "Regular Applications" : "Main Queue",
                badge: "blue",
                items: (moduleContent?.mainQueue || []).map(i => ({ ...i })),
            },
        ]);
    }, [moduleContent?.key]);  // re-run only when the module actually changes

    const handleAction = (sectionId, token, action) => {
        if (action === "done") {
            setSections(prev => prev.map(sec =>
                sec.id === sectionId
                    ? { ...sec, items: sec.items.filter(it => it.token !== token) }
                    : sec
            ));
            setServedCount(c => c + 1);
        }
    };

    const mainCount      = sections.find(s => s.id === "main")?.items.length || 0;
    const emergencyCount = sections.find(s => s.id === "emergency")?.items.length || 0;
    const seniorCount    = sections.find(s => s.id === "senior")?.items.length || 0;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    {dashTitle}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    {getGreeting()}, {(user?.name || "Guest").split(" ")[0]} · {primaryDept}
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard icon={Users}        label={isGovt ? "Regular Applications" : "Main Queue"}                 value={String(mainCount)}      color="blue"/>
                <StatCard icon={AlertTriangle} label={isGovt ? "Priority Cases"       : "Emergency"}                 value={String(emergencyCount)}  color="red"/>
                <StatCard icon={Star}          label="Senior Citizens"                                                value={String(seniorCount)}     color="purple"/>
                <StatCard icon={CheckCircle}   label={isGovt ? `${entityLabel}s Served Today` : "Served Today"}      value={String(servedCount)} trend="+8" color="green"/>
            </div>

            <div className="space-y-5">
                {sections.map(sec => (
                    <div key={sec.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">{sec.title}</h3>
                            <Badge text={`${sec.items.length} waiting`} color={sec.badge}/>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {sec.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-blue-700 text-sm font-mono">{item.token}</span>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                            <p className="text-xs text-slate-500">{item.age} yrs · {item.note}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => handleAction(sec.id, item.token, "call")} className="text-xs bg-blue-50    text-blue-700    px-2.5 py-1 rounded-lg hover:bg-blue-100    font-medium transition-colors">Call</button>
                                        <button onClick={() => handleAction(sec.id, item.token, "hold")} className="text-xs bg-amber-50   text-amber-700   px-2.5 py-1 rounded-lg hover:bg-amber-100   font-medium transition-colors">Hold</button>
                                        <button onClick={() => handleAction(sec.id, item.token, "done")} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg hover:bg-emerald-100 font-medium transition-colors">Done</button>
                                    </div>
                                </div>
                            ))}
                            {sec.items.length === 0 && <div className="px-5 py-6 text-center text-sm text-slate-400">Queue clear.</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
