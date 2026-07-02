import { useState, useEffect } from "react";
import { Users, CheckCircle, User, FileText } from "lucide-react";
import Badge from "../components/ui/Badge";
import StatCard from "../components/ui/StatCard";
import { getGreeting } from "../utils/greeting";

export default function DoctorDashboard({ user, moduleContent }) {
    const isGovt       = moduleContent?.key === "government";
    const dashTitle    = moduleContent?.dashboardTitles?.doctor || (isGovt ? "Approval Dashboard" : "Doctor Dashboard");
    const primaryDept  = moduleContent?.primaryDept  || "General OPD";
    const entityLabel  = moduleContent?.entityLabel  || "Patient";
    const serveLabel   = isGovt ? "Case" : "Session";
    const entityPlural = moduleContent?.entityLabelPlural || "Patients";

    const [serving,        setServing]        = useState(false);
    const [remaining,      setRemaining]      = useState([]);
    const [completedToday, setCompletedToday] = useState(18);
    const [current,        setCurrent]        = useState(null);

    // Re-init queue when module switches
    useEffect(() => {
        setRemaining((moduleContent?.doctorQueue || []).map(i => ({ ...i })));
        setServing(false);
        setCurrent(null);
    }, [moduleContent?.key]);

    const startService = () => {
        if (remaining.length === 0) return;
        setCurrent(remaining[0]);
        setServing(true);
    };

    const finishService = () => {
        if (current) {
            setRemaining(prev => prev.filter(p => p.token !== current.token));
            setCompletedToday(c => c + 1);
        }
        setServing(false);
        setCurrent(null);
    };

    // Govt: highlight "urgent" cases differently
    const isUrgent = (reason) => reason?.toLowerCase().includes("urgent");

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    {dashTitle}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    {getGreeting()}, {(user?.name || "Guest").split(" ")[0]} · {primaryDept}{isGovt ? "" : ", Room 3"}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard icon={User}         label={`Current ${isGovt ? "Case"  : "Patient"}`}     value={serving && current ? current.token : "—"}           color="blue"/>
                <StatCard icon={Users}        label={`Remaining ${entityPlural}`}                    value={String(remaining.length)}                             color="teal"/>
                <StatCard icon={CheckCircle}  label={`${isGovt ? "Cases" : "Patients"} Today`}      value={String(completedToday)} trend="+2 hr"                 color="green"/>
            </div>

            {/* Currently serving banner */}
            <div className={`bg-gradient-to-r ${isGovt ? "from-cyan-700 to-teal-600" : "from-blue-700 to-cyan-600"} rounded-2xl p-5 mb-5 text-white`}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-blue-100 text-xs mb-1">
                            Currently {isGovt ? "Processing" : "Serving"}
                        </p>
                        <p className="text-xl font-bold">
                            {serving && current
                                ? `${current.name}, ${current.age} yrs`
                                : `No active ${isGovt ? "case" : "session"}`}
                        </p>
                        <p className="text-blue-100 text-sm mt-1">
                            {serving && current
                                ? `Token ${current.token} · ${current.reason}`
                                : `Click Start ${serveLabel} to begin`}
                        </p>
                    </div>
                    {!serving
                        ? <button onClick={startService} disabled={remaining.length === 0}
                            className="px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed">
                            Start {serveLabel}
                          </button>
                        : <button onClick={finishService}
                            className="px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow">
                            Finish {serveLabel}
                          </button>
                    }
                </div>
            </div>

            {/* Queue list */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">
                        Remaining {isGovt ? "Applications" : "Queue"}
                    </h3>
                </div>
                <div className="divide-y divide-slate-50">
                    {remaining.map((p, i) => (
                        <div key={i} className="flex items-center justify-between px-5 py-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isGovt ? "bg-cyan-100" : "bg-blue-100"}`}>
                                    {isGovt
                                        ? <FileText size={16} className="text-cyan-700"/>
                                        : <User     size={16} className="text-blue-700"/>}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                                    <p className="text-xs text-slate-500">{p.age} yrs · {p.reason}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm font-mono" style={{ color: isGovt ? "#0891B2" : "#1D4ED8" }}>
                                    {p.token}
                                </span>
                                {isUrgent(p.reason) && <Badge text="Urgent" color="red"/>}
                            </div>
                        </div>
                    ))}
                    {remaining.length === 0 && (
                        <div className="px-5 py-6 text-center text-sm text-slate-400">
                            {isGovt ? "All cases processed for today." : "Queue clear for today."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
