export default function StatCard({ icon: Icon, label, value, trend, color = "blue", live = false, }) {
    const iconBgs = {
        blue: "bg-blue-50 text-blue-700",
        teal: "bg-cyan-50 text-cyan-700",
        purple: "bg-purple-50 text-purple-700",
        green: "bg-emerald-50 text-emerald-700",
        orange: "bg-amber-50 text-amber-700",
        red: "bg-red-50 text-red-700",
    };
    return (<div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBgs[color]}`}>
          <Icon size={20}/>
        </div>
        <div className="flex items-center gap-1.5">
          {live && (<span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"/>
            </span>)}
          {trend && (<span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {trend}
            </span>)}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-0.5 tabular-nums transition-all duration-300">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>);
}
