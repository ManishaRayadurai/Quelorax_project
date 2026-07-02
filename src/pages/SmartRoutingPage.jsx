import { useState } from "react";
import { CheckCircle, ArrowRight, Eye, Zap } from "lucide-react";
import Btn from "../components/ui/Btn";

export default function SmartRoutingPage({ navigate }) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const suggestions = ["Fever and body ache", "Chest pain", "Aadhaar Update", "License Renewal", "Eye checkup", "Pregnancy checkup"];
    const aiMap = {
        default: { dept: "General OPD", reason: "Recommended for initial consultation and general symptoms.", wait: "~22 min", counter: "Counter 3 or 4", floor: "Ground Floor, Block A" },
        chest: { dept: "Cardiology", reason: "Chest pain requires immediate cardiac evaluation by a specialist.", wait: "~15 min", counter: "Counter 7", floor: "2nd Floor, Block C" },
        aadhaar: { dept: "UIDAI Services", reason: "Aadhaar update requires identity verification at the UIDAI counter.", wait: "~35 min", counter: "Counter 1 or 2", floor: "Ground Floor, Hall B" },
        license: { dept: "RTO Services", reason: "License renewal falls under the Driving License section at RTO.", wait: "~45 min", counter: "Counter 5", floor: "1st Floor, Wing D" },
        eye: { dept: "Ophthalmology", reason: "Eye checkup requires specialist consultation at the Eye OPD.", wait: "~30 min", counter: "Counter 9", floor: "1st Floor, Block B" },
        pregnancy: { dept: "Obstetrics & Gynaecology", reason: "Pregnancy checkup with OB/GYN specialist for prenatal care.", wait: "~20 min", counter: "Counter 8", floor: "2nd Floor, Wing A" },
    };
    const getSuggestion = () => {
        const low = input.toLowerCase();
        let key = "default";
        if (low.includes("chest"))
            key = "chest";
        else if (low.includes("aadhaar"))
            key = "aadhaar";
        else if (low.includes("license"))
            key = "license";
        else if (low.includes("eye"))
            key = "eye";
        else if (low.includes("pregnan"))
            key = "pregnancy";
        setResult(aiMap[key]);
    };
    return (<div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          AI Smart Routing
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Describe your symptoms or service — AI suggests the right department instantly
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow">
              <Zap size={15} className="text-white"/>
            </div>
            <h3 className="font-bold text-slate-900">Describe Your Need</h3>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="E.g. Fever and body ache, Aadhaar Update, License Renewal..." rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white mb-4 transition-all"/>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s) => (<button key={s} onClick={() => setInput(s)} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors font-medium">
                {s}
              </button>))}
          </div>
          <Btn variant="primary" icon={Zap} onClick={getSuggestion} className="w-full">
            Get AI Suggestion
          </Btn>
        </div>

        {result && (<div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={18} className="text-emerald-600"/>
              <h3 className="font-bold text-slate-900">AI Recommendation</h3>
              <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold">
                96% match
              </span>
            </div>
            <div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">Recommended Department</p>
              <p className="text-2xl font-bold text-blue-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {result.dept}
              </p>
              <p className="text-sm text-slate-600 mb-4">{result.reason}</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                { label: "Est. Wait", val: result.wait },
                { label: "Counter", val: result.counter },
                { label: "Location", val: result.floor },
            ].map((d) => (<div key={d.label} className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-xs text-slate-500">{d.label}</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{d.val}</p>
                  </div>))}
              </div>
            </div>
            <Btn variant="primary" icon={ArrowRight} onClick={() => navigate("token-booking")} className="w-full">
              Proceed to Token Booking
            </Btn>
          </div>)}
      </div>
    </div>);
}
