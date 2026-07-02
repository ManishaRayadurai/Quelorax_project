import { useState } from "react";
import { FileText, X, Upload, CheckCircle, Eye } from "lucide-react";
import Btn from "../components/ui/Btn";

export default function UploadDocumentsPage({ navigate }) {
    const [dragging, setDragging] = useState(false);
    const [uploaded, setUploaded] = useState([]);
    const [confirmed, setConfirmed] = useState(false);

    const handleUploadAll = () => {
        setConfirmed(true);
        setTimeout(() => {
            setUploaded([]);
            setConfirmed(false);
        }, 1800);
    };

    return (<div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Upload Documents
        </h1>
        <p className="text-slate-500 text-sm mt-1">Securely share medical records and identity documents</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {confirmed && (<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl px-4 py-3">
            <CheckCircle size={16}/>
            <span>Documents uploaded successfully.</span>
          </div>)}

        <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            setUploaded((prev) => [...prev, "dropped_document.pdf"]);
        }} className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${dragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"}`}>
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-blue-600"/>
          </div>
          <p className="font-semibold text-slate-700 mb-1">Drag &amp; Drop files here</p>
          <p className="text-sm text-slate-500 mb-5">or click to browse · PDF, JPG, PNG up to 10 MB</p>
          <Btn variant="primary" icon={Upload} onClick={() => setUploaded((prev) => [...prev, `report_${prev.length + 1}.pdf`])}>
            Browse Files
          </Btn>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4 text-sm">Supported Documents</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {["Medical Records", "Lab Reports", "Prescription", "ID Proof", "Insurance Card", "X-Ray / Scan"].map((d) => (<div key={d} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={13} className="text-emerald-500 shrink-0"/>
                {d}
              </div>))}
          </div>
        </div>

        {uploaded.length > 0 && (<div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">Ready to Upload ({uploaded.length})</h3>
            <div className="space-y-2 mb-4">
              {uploaded.map((f, i) => (<div key={i} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FileText size={15} className="text-blue-600"/>
                    <span className="text-sm font-medium text-slate-700">{f}</span>
                  </div>
                  <button onClick={() => setUploaded((prev) => prev.filter((_, j) => j !== i))} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X size={13}/>
                  </button>
                </div>))}
            </div>
            <div className="flex gap-3">
              <Btn variant="primary" icon={Upload} className="flex-1" onClick={handleUploadAll}>Upload All</Btn>
              <Btn variant="outline" icon={Eye} onClick={() => navigate("previous-uploads")}>Previous</Btn>
            </div>
          </div>)}

        {uploaded.length === 0 && (<Btn variant="outline" icon={FileText} onClick={() => navigate("previous-uploads")}>
            View Previous Uploads
          </Btn>)}
      </div>
    </div>);
}
