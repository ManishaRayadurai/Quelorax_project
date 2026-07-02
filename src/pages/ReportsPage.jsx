import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Download, CheckCircle } from "lucide-react";
import Btn from "../components/ui/Btn";
import { dailyTokens } from "../data/chartData";

const REPORTS = [
    { title: "Daily Report", subtitle: "30 June 2026", tokens: 356, avgWait: "22 min", completed: "94%", peak: "10:00 AM", grad: "from-blue-700 to-blue-500" },
    { title: "Weekly Report", subtitle: "Jun 24–30, 2026", tokens: 2847, avgWait: "26 min", completed: "91%", peak: "Tue/Wed", grad: "from-cyan-700 to-cyan-500" },
    { title: "Monthly Report", subtitle: "June 2026", tokens: 11240, avgWait: "28 min", completed: "89%", peak: "Week 2", grad: "from-purple-700 to-purple-500" },
];

export default function ReportsPage({ moduleContent }) {
    const [toast, setToast] = useState("");
    const orgName = moduleContent?.orgName || "Quelorax";

    const flashToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2200);
    };

    const downloadBlob = (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const buildSummary = (r) => [
        `${orgName} — ${r.title}`,
        r.subtitle,
        "=".repeat(36),
        `Total Tokens: ${r.tokens.toLocaleString()}`,
        `Average Wait: ${r.avgWait}`,
        `Completion Rate: ${r.completed}`,
        `Peak Time: ${r.peak}`,
    ].join("\n");

    const handleGenerate = (r) => {
        downloadBlob(buildSummary(r), `${r.title.replace(/\s+/g, "_")}.txt`, "text/plain");
        flashToast(`${r.title} generated and downloaded.`);
    };

    const handlePdf = (r) => {
        downloadBlob(buildSummary(r), `${r.title.replace(/\s+/g, "_")}.pdf.txt`, "application/pdf");
        flashToast(`${r.title} exported (PDF-style summary).`);
    };

    const handleCsv = (r) => {
        const csv = ["Metric,Value", `Total Tokens,${r.tokens}`, `Average Wait,${r.avgWait}`, `Completion Rate,${r.completed}`, `Peak Time,${r.peak}`].join("\n");
        downloadBlob(csv, `${r.title.replace(/\s+/g, "_")}.csv`, "text/csv");
        flashToast(`${r.title} exported as CSV.`);
    };

    return (<div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Reports
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate and export queue analytics reports</p>
        </div>
      </div>

      {toast && (<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl px-4 py-3 mb-5">
          <CheckCircle size={16}/>
          <span>{toast}</span>
        </div>)}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {REPORTS.map((r) => (<div key={r.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`bg-gradient-to-r ${r.grad} p-5 text-white`}>
              <p className="text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.title}</p>
              <p className="text-sm opacity-80 mt-0.5">{r.subtitle}</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                { label: "Total Tokens", value: r.tokens.toLocaleString() },
                { label: "Avg Wait", value: r.avgWait },
                { label: "Completion", value: r.completed },
                { label: "Peak", value: r.peak },
            ].map((d) => (<div key={d.label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500">{d.label}</p>
                    <p className="font-bold text-slate-900 mt-0.5 text-sm">{d.value}</p>
                  </div>))}
              </div>
              <div className="space-y-2">
                <Btn variant="primary" size="sm" icon={FileText} className="w-full" onClick={() => handleGenerate(r)}>Generate Report</Btn>
                <div className="flex gap-2">
                  <Btn variant="outline" size="sm" icon={Download} className="flex-1" onClick={() => handlePdf(r)}>PDF</Btn>
                  <Btn variant="secondary" size="sm" icon={Download} className="flex-1" onClick={() => handleCsv(r)}>CSV</Btn>
                </div>
              </div>
            </div>
          </div>))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4">Daily Token Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyTokens} margin={{ right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="date" tick={{ fontSize: 11 }}/>
            <YAxis tick={{ fontSize: 11 }}/>
            <Tooltip />
            <Bar dataKey="tokens" fill="#1D4ED8" radius={[4, 4, 0, 0]} name="Tokens"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>);
}
