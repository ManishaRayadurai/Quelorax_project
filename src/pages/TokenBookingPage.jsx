import { useState } from "react";
import { Ticket } from "lucide-react";
import Btn from "../components/ui/Btn";

function formatToday() {
    return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// Builds a self-consistent booking record purely from what the user
// actually selected in the form — no hardcoded department/slot/token data.
function buildBookingRecord({ dept, service, slot, priority }) {
    const prefix = (dept.trim()[0] || "A").toUpperCase();
    const tokenNum = Math.floor(20 + Math.random() * 60); // 20-79
    const peopleAhead = priority === "emergency" ? Math.floor(Math.random() * 2) : Math.floor(3 + Math.random() * 9);
    const minutesPerPerson = priority === "senior" ? 2 : 3;
    const estWaitMin = Math.max(2, peopleAhead * minutesPerPerson);
    const counterNum = Math.floor(1 + Math.random() * 6);

    return {
        department: dept,
        service,
        slot,
        priority,
        tokenNumber: `${prefix}-${String(tokenNum).padStart(3, "0")}`,
        tokenSeq: tokenNum,
        peopleAhead,
        estWaitMin,
        counterNum,
        date: formatToday(),
        bookedAt: Date.now(),
    };
}

export default function TokenBookingPage({ navigate, moduleContent, onBook }) {
    const [dept, setDept] = useState("");
    const [service, setService] = useState("");
    const [slot, setSlot] = useState("");
    const [priority, setPriority] = useState("normal");
    const departments = moduleContent?.departments || ["General OPD", "Cardiology", "Orthopedics", "Pediatrics", "Ophthalmology", "Emergency"];
    const services = moduleContent?.services || ["Consultation", "Follow-up Visit", "Lab Test", "Scan / Imaging", "Vaccination"];
    const [error, setError] = useState("");

    const handleGenerate = () => {
        if (!dept || !service || !slot) {
            setError("Please select a department, service, and time slot before generating your token.");
            return;
        }
        setError("");
        const record = buildBookingRecord({ dept, service, slot, priority });
        if (onBook) onBook(record);
        navigate("token-confirmation");
    };

    return (<div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Token Booking
        </h1>
        <p className="text-slate-500 text-sm mt-1">Book your queue token for the desired department</p>
      </div>

      <div className="max-w-lg">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
          {error && (<div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>)}
          {[
            { label: "Department", val: dept, set: setDept, opts: departments },
            { label: "Service", val: service, set: setService, opts: services },
            { label: "Preferred Slot", val: slot, set: setSlot, opts: ["09:00 AM – 10:00 AM (8 slots)", "10:00 AM – 11:00 AM (3 slots)", "11:00 AM – 12:00 PM (12 slots)", "02:00 PM – 03:00 PM (15 slots)", "03:00 PM – 04:00 PM (7 slots)"] },
        ].map((f) => (<div key={f.label}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{f.label}</label>
              <select value={f.val} onChange={(e) => f.set(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
                <option value="">Select {f.label}</option>
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>))}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Priority</label>
            <div className="grid grid-cols-3 gap-3">
              {[
            { value: "normal", label: "Normal", activeClass: "border-blue-600 bg-blue-50 text-blue-700" },
            { value: "senior", label: "Senior Citizen", activeClass: "border-purple-600 bg-purple-50 text-purple-700" },
            { value: "emergency", label: "Emergency", activeClass: "border-red-600 bg-red-50 text-red-700" },
        ].map((p) => (<button key={p.value} onClick={() => setPriority(p.value)} className={`py-3 rounded-xl text-xs font-semibold border-2 transition-all ${priority === p.value ? p.activeClass : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                  {p.label}
                </button>))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Btn variant="ghost" className="flex-1 border border-slate-200" onClick={() => navigate("patient-dashboard")}>
              Cancel
            </Btn>
            <Btn variant="primary" icon={Ticket} className="flex-1" onClick={handleGenerate}>
              Generate Token
            </Btn>
          </div>
        </div>
      </div>
    </div>);
}
