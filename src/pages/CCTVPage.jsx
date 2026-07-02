import { AlertTriangle, Camera } from "lucide-react";
import Badge from "../components/ui/Badge";

export default function CCTVPage({ moduleContent }) {
    const isGovt = moduleContent?.key === "government";
    const cameras = [
        { id: "CAM-01", location: "Main Entrance", density: 78, status: "active" },
        { id: "CAM-02", location: isGovt ? "Aadhaar Services Waiting" : "General OPD Waiting", density: 92, status: "active" },
        { id: "CAM-03", location: isGovt ? "Grievance Cell" : "Emergency Wing", density: 45, status: "active" },
        { id: "CAM-04", location: isGovt ? "License & RTO Counter" : "Pharmacy Queue", density: 65, status: "active" },
        { id: "CAM-05", location: isGovt ? "Certificates Desk" : "Radiology Dept.", density: 38, status: "active" },
        { id: "CAM-06", location: isGovt ? "Tax & Revenue Wing" : "Pediatrics Ward", density: 55, status: "offline" },
    ];
    const crowdBadge = (d) => d > 85 ? "red" : d > 65 ? "yellow" : "green";
    const crowdLabel = (d) => d > 85 ? "Overcrowded" : d > 65 ? "Moderate" : "Low";
    const barColor = (d) => d > 85 ? "bg-red-500" : d > 65 ? "bg-amber-500" : "bg-emerald-500";
    const heatmap = Array.from({ length: 6 }, (_, r) => Array.from({ length: 14 }, (_, c) => {
        const dist = Math.sqrt(Math.pow(r - 2.5, 2) + Math.pow(c - 4, 2));
        return Math.max(10, Math.min(100, 90 - dist * 12 + Math.floor((r * c * 7) % 25)));
    }));
    return (<div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            CCTV Monitoring
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Live crowd density · {cameras.filter((c) => c.status === "active").length} cameras active
          </p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
          <span className="text-sm font-bold text-red-600">LIVE</span>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5"/>
        <div>
          <p className="font-semibold text-red-800 text-sm">Overcrowding Alert — CAM-02</p>
          <p className="text-red-600 text-xs mt-0.5">
            {cameras[1].location} at 92% capacity. Consider redirecting {isGovt ? "citizens" : "patients"} to alternate counters.
          </p>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {cameras.map((cam) => (<div key={cam.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="relative h-36 bg-gradient-to-br from-slate-800 to-slate-950">
              {cam.status === "offline" ? (<div className="flex items-center justify-center h-full flex-col gap-2">
                  <Camera size={22} className="text-slate-500"/>
                  <p className="text-slate-400 text-xs">Camera Offline</p>
                </div>) : (<>
                  {Array.from({ length: Math.floor(cam.density / 8) }, (_, i) => (<div key={i} className="absolute w-5 h-5 rounded-full blur-sm opacity-70" style={{
                        backgroundColor: cam.density > 85 ? "#f87171" : cam.density > 65 ? "#fbbf24" : "#34d399",
                        left: `${(i * 41 + 8) % 82}%`,
                        top: `${(i * 67 + 10) % 72}%`,
                    }}/>))}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 rounded-lg px-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
                    <span className="text-white text-xs font-mono">{cam.id}</span>
                  </div>
                  <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-lg ${cam.density > 85 ? "bg-red-100 text-red-700" : cam.density > 65 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {cam.density}%
                  </div>
                </>)}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-800 text-sm">{cam.location}</p>
                <Badge text={cam.status === "offline" ? "Offline" : crowdLabel(cam.density)} color={cam.status === "offline" ? "gray" : crowdBadge(cam.density)}/>
              </div>
              {cam.status === "active" && (<div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${barColor(cam.density)}`} style={{ width: `${cam.density}%` }}/>
                </div>)}
            </div>
          </div>))}
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Crowd Density Heatmap</h3>
          <span className="text-xs text-slate-400">Updated just now</span>
        </div>
        <div className="grid gap-1 rounded-xl overflow-hidden" style={{ gridTemplateColumns: "repeat(14, 1fr)" }}>
          {heatmap.flat().map((val, idx) => {
            const r = val > 80 ? 239 : val > 60 ? 245 : val > 40 ? 6 : 6;
            const g = val > 80 ? 68 : val > 60 ? 158 : val > 40 ? 182 : 182;
            const b = val > 80 ? 68 : val > 60 ? 11 : val > 40 ? 212 : 212;
            const opacity = Math.max(0.2, val / 100);
            return (<div key={idx} className="aspect-square rounded-sm" style={{ backgroundColor: `rgba(${r},${g},${b},${opacity})` }}/>);
        })}
        </div>
        <div className="flex items-center gap-6 mt-3">
          {[
            { label: "Low Density", color: "bg-cyan-200" },
            { label: "Moderate", color: "bg-amber-400" },
            { label: "High / Critical", color: "bg-red-500" },
        ].map((l) => (<div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-500">
              <div className={`w-3 h-3 rounded-sm ${l.color}`}/>
              {l.label}
            </div>))}
        </div>
      </div>
    </div>);
}
