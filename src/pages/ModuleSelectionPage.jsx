import { CheckCircle, ArrowRight, HeartPulse, Landmark, Check } from "lucide-react";
import PublicNav from "../components/layout/PublicNav";

export default function ModuleSelectionPage({ navigate, setModule, activeModule }) {
    const modules = [
        {
            module: "hospital",
            label: "Hospital Module",
            desc: "OPD appointments, specialist consultations, lab tests, pharmacy queues, emergency services, and more.",
            icon: HeartPulse,
            features: ["OPD & Specialist", "Emergency Triage", "Lab & Pharmacy"],
            grad: "from-blue-600 to-blue-400",
            border: "hover:border-blue-200",
            accent: "text-blue-700",
            ring: "ring-blue-500",
        },
        {
            module: "government",
            label: "Government Module",
            desc: "Aadhaar services, license renewal, certificate issuance, tax filing, passport services, and more.",
            icon: Landmark,
            features: ["Aadhaar Services", "License & Permits", "Certificates & IDs"],
            grad: "from-cyan-600 to-cyan-400",
            border: "hover:border-cyan-200",
            accent: "text-cyan-700",
            ring: "ring-cyan-500",
        },
    ];
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <PublicNav navigate={navigate}/>
      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold">
              Step 1 of 2
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Select Your Module
            </h2>
            <p className="text-slate-500">Choose the service category to proceed with token booking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((m) => {
                const isActive = activeModule === m.module;
                return (<button key={m.module} onClick={() => { setModule(m.module); navigate("role-selection"); }} className={`group bg-white rounded-3xl p-8 shadow-sm border ${isActive ? `border-2 ${m.ring} ring-2 ring-offset-2` : "border-slate-100"} ${m.border} hover:shadow-xl transition-all duration-300 text-left relative`}>
                  {isActive && (<div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check size={15} className="text-white"/>
                    </div>)}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.grad} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <m.icon size={28} className="text-white"/>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {m.label}
                  </h3>
                  <p className="text-slate-500 mb-5 text-sm leading-relaxed">{m.desc}</p>
                  <div className="space-y-1.5 mb-6">
                    {m.features.map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={13} className="text-emerald-500 shrink-0"/>
                        {f}
                      </div>))}
                  </div>
                  <div className={`flex items-center gap-2 ${m.accent} font-semibold text-sm`}>
                    <span>{isActive ? "Continue with" : "Select"} {m.label.split(" ")[0]}</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
                  </div>
                </button>);
            })}
          </div>
        </div>
      </div>
    </div>);
}
