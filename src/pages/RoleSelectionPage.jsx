import { UserCheck, Shield, Stethoscope, User, BriefcaseMedical, HeartPulse, Landmark } from "lucide-react";
import Btn from "../components/ui/Btn";
import PublicNav from "../components/layout/PublicNav";

export default function RoleSelectionPage({ navigate, setRole, module, moduleContent }) {
    const ModuleIcon = module === "government" ? Landmark : HeartPulse;
    const titles = moduleContent?.roleTitles || {};
    const roles = [
        { id: "patient", label: titles.patient || "Patient / Citizen", desc: module === "government" ? "Apply for services, track applications, upload documents" : "Book tokens, track queues, upload documents", icon: User, grad: "from-blue-600 to-blue-400", border: "hover:border-blue-200" },
        { id: "receptionist", label: titles.receptionist || "Receptionist", desc: "Manage tokens, assign counters, handle walk-ins", icon: UserCheck, grad: "from-cyan-600 to-cyan-400", border: "hover:border-cyan-200" },
        { id: "nurse", label: titles.nurse || "Nurse / Queue Operator", desc: "Manage queues and priority assignments", icon: BriefcaseMedical, grad: "from-purple-600 to-purple-400", border: "hover:border-purple-200" },
        { id: "doctor", label: titles.doctor || "Doctor / Officer", desc: "Review queue and process approvals", icon: Stethoscope, grad: "from-emerald-600 to-emerald-400", border: "hover:border-emerald-200" },
        { id: "admin", label: titles.admin || "Admin", desc: "Full system access, analytics, user management", icon: Shield, grad: "from-amber-600 to-amber-400", border: "hover:border-amber-200" },
    ];
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <PublicNav navigate={navigate}/>
      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold">
              <ModuleIcon size={13}/>
              {module === "government" ? "Government Module" : "Hospital Module"}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Select Your Role
            </h2>
            <p className="text-slate-500">Choose your role to access the appropriate dashboard</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((r) => (<div key={r.id} className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 ${r.border} hover:shadow-md transition-all`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.grad} flex items-center justify-center mb-4 shadow-md`}>
                  <r.icon size={22} className="text-white"/>
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {r.label}
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">{r.desc}</p>
                <Btn variant="primary" size="sm" className="w-full" onClick={() => { setRole(r.id); navigate("login"); }}>
                  Continue
                </Btn>
              </div>))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-8">
            Want a different service category?{" "}
            <button onClick={() => navigate("module-selection")} className="text-blue-700 font-semibold hover:underline">
              Change Module
            </button>
          </p>
        </div>
      </div>
    </div>);
}
