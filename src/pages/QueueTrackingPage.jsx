import { useEffect, useState } from "react";
import { ChevronRight, RefreshCw, Zap } from "lucide-react";
import Btn from "../components/ui/Btn";
import Badge from "../components/ui/Badge";

export default function QueueTrackingPage({ navigate, moduleContent, booking }) {
    const [refreshing, setRefreshing] = useState(false);
    const counterLabel = moduleContent?.counterLabel || "Counter";

    const b = booking || {
        department: moduleContent?.primaryDept || "General OPD",
        tokenNumber: "A-042",
        tokenSeq: 42,
        peopleAhead: 6,
        estWaitMin: 24,
        counterNum: 3,
    };
    const primaryDept = b.department;

    // People-ahead count gently ticks down over time to feel like a real,
    // live-updating queue, without ever going below zero.
    const [peopleAhead, setPeopleAhead] = useState(b.peopleAhead);
    const [waitMin, setWaitMin] = useState(b.estWaitMin);

    useEffect(() => {
        setPeopleAhead(b.peopleAhead);
        setWaitMin(b.estWaitMin);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [b.tokenNumber]);

    useEffect(() => {
        if (peopleAhead <= 0) return;
        const id = setInterval(() => {
            setPeopleAhead((prev) => Math.max(0, prev - 1));
            setWaitMin((prev) => Math.max(0, prev - 3));
        }, 8000);
        return () => clearInterval(id);
    }, [peopleAhead]);

    const tokenPrefix = b.tokenNumber.split("-")[0] || "A";
    const tokenSeq = b.tokenSeq ?? (parseInt(b.tokenNumber.split("-")[1], 10) || 42);
    const nowServingSeq = Math.max(1, tokenSeq - peopleAhead);
    const nowServing = `${tokenPrefix}-${String(nowServingSeq).padStart(3, "0")}`;
    const nextUp = `${tokenPrefix}-${String(tokenSeq + 1).padStart(3, "0")}`;

    const totalSpan = Math.max(1, (b.peopleAhead || 6) + 2);
    const progressPct = Math.min(100, Math.round(((totalSpan - peopleAhead) / totalSpan) * 100));

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 700);
    };

    return (<div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Live Queue Tracking
        </h1>
        <p className="text-slate-500 text-sm mt-1">{`Real-time status · ${primaryDept} · ${counterLabel} ${b.counterNum}`}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl">
        {/* Token Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-5">Token Status</h3>

          <div className="flex items-center justify-between mb-6">
            {[
            { label: "Now Serving", token: nowServing, style: "bg-emerald-50 border-2 border-emerald-200 text-emerald-700" },
            null,
            { label: "Your Token", token: b.tokenNumber, style: "bg-blue-700 border-2 border-blue-800 text-white shadow-xl shadow-blue-200" },
            null,
            { label: "Next Up", token: nextUp, style: "bg-slate-50 border-2 border-slate-200 text-slate-400" },
        ].map((item, i) => item === null ? (<ChevronRight key={i} size={22} className="text-slate-200 shrink-0"/>) : (<div key={i} className="text-center">
                  <p className={`text-xs font-semibold mb-2 ${item.label === "Your Token" ? "text-blue-600" : "text-slate-500"}`}>
                    {item.label}
                  </p>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.style}`}>
                    <span className="text-sm font-bold font-mono">{item.token}</span>
                  </div>
                </div>))}
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Progress</span>
              <span>{peopleAhead === 0 ? "You're next!" : `${peopleAhead} people ahead`}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500" style={{ width: `${progressPct}%` }}/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <p className="text-3xl font-bold text-blue-700 tabular-nums">{peopleAhead}</p>
              <p className="text-xs text-slate-500 mt-1">People Ahead</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-100">
              <p className="text-3xl font-bold text-cyan-700 tabular-nums">{waitMin}</p>
              <p className="text-xs text-slate-500 mt-1">Est. Minutes</p>
            </div>
          </div>
        </div>

        {/* AI & Crowd */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={15} className="text-blue-600"/>
              <h3 className="font-bold text-slate-900">AI Wait Prediction</h3>
              <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                92% confidence
              </span>
            </div>
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-xl p-4 text-white text-center mb-4">
              <p className="text-4xl font-bold tabular-nums">{waitMin} min</p>
            </div>
            <div className="space-y-1.5">
              {[
            { label: "Best case", val: `${Math.max(1, waitMin - 6)} min`, color: "text-emerald-600" },
            { label: "Expected", val: `${waitMin} min`, color: "text-blue-600" },
            { label: "Worst case", val: `${waitMin + 11} min`, color: "text-amber-600" },
        ].map((r) => (<div key={r.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{r.label}</span>
                  <span className={`font-semibold ${r.color}`}>{r.val}</span>
                </div>))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Crowd Level</h3>
              <Badge text="Moderate" color="yellow"/>
            </div>
            <div className="relative h-4 bg-gradient-to-r from-emerald-200 via-amber-200 to-red-200 rounded-full mb-1.5">
              <div className="absolute top-0 -translate-x-1/2 -translate-y-[20%] w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow" style={{ left: "72%" }}/>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Low</span>
              <span className="font-semibold text-amber-600">72% capacity</span>
              <span>High</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Btn variant="secondary" icon={RefreshCw} className={`flex-1 ${refreshing ? "opacity-60" : ""}`} onClick={handleRefresh}>{refreshing ? "Refreshing..." : "Refresh"}</Btn>
            <Btn variant="ghost" className="flex-1 border border-slate-200" onClick={() => navigate("patient-dashboard")}>
              Back
            </Btn>
          </div>
        </div>
      </div>
    </div>);
}
