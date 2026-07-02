import { useState } from "react";
import { Users, Clock, CheckCircle, ArrowRight, Plus, Hash, Filter } from "lucide-react";
import Btn from "../components/ui/Btn";
import Badge from "../components/ui/Badge";
import StatCard from "../components/ui/StatCard";
import { getGreeting } from "../utils/greeting";

export default function ReceptionistDashboard({ navigate, user, moduleContent }) {
    const isGovt        = moduleContent?.key === "government";
    const counterLabel  = moduleContent?.counterLabel  || "Counter";
    const primaryDept   = moduleContent?.primaryDept   || "General OPD";
    const priorityLabels= moduleContent?.priorityLabels|| { normal:"Normal", senior:"Senior Citizen", emergency:"Emergency" };
    const entityLabel   = moduleContent?.entityLabel   || "Patient";
    const dashTitle     = moduleContent?.dashboardTitles?.receptionist || "Reception Dashboard";

    const [queue, setQueue] = useState(moduleContent?.sampleQueue || []);
    const [filterPriority, setFilterPriority] = useState("all");

    const callNext = () => {
        setQueue(prev => {
            const idx = prev.findIndex(q => q.status === "waiting");
            if (idx === -1) return prev;
            const next = [...prev];
            next.forEach(q => { if (q.status === "serving") q.status = "done"; });
            next[idx] = { ...next[idx], status: "serving", wait: "Now" };
            return next.filter(q => q.status !== "done");
        });
    };

    const markDone = (token) => setQueue(prev => prev.filter(q => q.token !== token));

    const visibleQueue  = filterPriority === "all" ? queue : queue.filter(q => q.priority === filterPriority);
    const currentToken  = queue.find(q => q.status === "serving")?.token || "—";
    const waitingCount  = queue.filter(q => q.status === "waiting").length;

    const colHeader = isGovt
        ? ["Token", "Name", "Service Dept.", "Priority", "Est. Wait", "Status", "Actions"]
        : ["Token", "Name", "Department",    "Priority", "Est. Wait", "Status", "Actions"];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    {dashTitle}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    {getGreeting()}, {(user?.name || "Guest").split(" ")[0]} · {counterLabel} 3, {primaryDept}
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard icon={Hash}         label={`Current ${isGovt ? "Application" : "Token"}`} value={currentToken} color="blue"/>
                <StatCard icon={Users}        label={`${entityLabel}s Waiting`} value={String(waitingCount)} trend="+3" color="teal"/>
                <StatCard icon={CheckCircle}  label="Completed Today" value="87" trend="+12%" color="green"/>
                <StatCard icon={Clock}        label="Avg Wait"         value="22 min" color="purple"/>
            </div>

            <div className="flex flex-wrap gap-3 mb-5">
                <Btn variant="primary" icon={Plus}         onClick={() => navigate("token-booking")}>
                    {isGovt ? "Issue New Token" : "Generate Token"}
                </Btn>
                <Btn variant="teal"    icon={ArrowRight}   onClick={callNext}>Call Next</Btn>
                <Btn variant="secondary" icon={CheckCircle} onClick={() => currentToken !== "—" && markDone(currentToken)}>
                    Mark Completed
                </Btn>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">
                        Live {isGovt ? "Application" : "Queue"}
                    </h3>
                    <div className="relative">
                        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
                            className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-3 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Priorities</option>
                            <option value="normal">{priorityLabels.normal}</option>
                            <option value="senior">{priorityLabels.senior}</option>
                            <option value="emergency">{priorityLabels.emergency}</option>
                        </select>
                        <Filter size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                {colHeader.map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-5 py-3 uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {visibleQueue.map(q => (
                                <tr key={q.token} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-3.5 font-mono font-bold text-blue-700 text-sm">{q.token}</td>
                                    <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{q.name}</td>
                                    <td className="px-5 py-3.5 text-sm text-slate-600">{q.dept}</td>
                                    <td className="px-5 py-3.5">
                                        <Badge text={priorityLabels[q.priority] || q.priority}
                                            color={q.priority==="normal" ? "gray" : q.priority==="senior" ? "purple" : "red"}/>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-slate-600">{q.wait}</td>
                                    <td className="px-5 py-3.5">
                                        <Badge text={q.status==="serving" ? "Serving" : "Waiting"} color={q.status==="serving" ? "green" : "yellow"}/>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-1.5">
                                            <button onClick={callNext}            className="text-xs bg-blue-50    text-blue-700    px-2.5 py-1 rounded-lg hover:bg-blue-100    font-medium transition-colors">Call</button>
                                            <button onClick={() => markDone(q.token)} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg hover:bg-emerald-100 font-medium transition-colors">Done</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {visibleQueue.length === 0 && (
                                <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">No entries match this filter.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
