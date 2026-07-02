import { useState } from "react";
import { FileText, Download, Upload, RefreshCw, Eye, CheckCircle } from "lucide-react";
import Btn from "../components/ui/Btn";
import Badge from "../components/ui/Badge";

const INITIAL_FILES = [
    { name: "Blood_Test_Report.pdf", type: "Lab Report", date: "20 Jun 2026", size: "1.2 MB" },
    { name: "Chest_XRay.jpg", type: "X-Ray Image", date: "15 Jun 2026", size: "3.8 MB" },
    { name: "Prescription_Dr_Nair.pdf", type: "Prescription", date: "10 Jun 2026", size: "0.4 MB" },
    { name: "Aadhaar_Card.pdf", type: "ID Proof", date: "01 Jun 2026", size: "0.8 MB" },
    { name: "Insurance_Policy.pdf", type: "Insurance", date: "28 May 2026", size: "2.1 MB" },
];

export default function PreviousUploadsPage({ navigate }) {
    const [files, setFiles] = useState(INITIAL_FILES);
    const [toast, setToast] = useState("");
    const [previewFile, setPreviewFile] = useState(null);

    const flashToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    const handleDownload = (file) => {
        const blob = new Blob([`Quelorax — Document Reference\nFile: ${file.name}\nType: ${file.type}\nUploaded: ${file.date}\nSize: ${file.size}`], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.replace(/\.[^.]+$/, "") + "_reference.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        flashToast(`Downloaded ${file.name}`);
    };

    const handleReupload = (idx) => {
        setFiles((prev) => prev.map((f, i) => i === idx ? { ...f, date: "30 Jun 2026" } : f));
        flashToast("File re-synced with the latest version.");
    };

    return (<div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Previous Uploads
          </h1>
          <p className="text-slate-500 text-sm mt-1">{files.length} documents stored securely</p>
        </div>
        <Btn variant="primary" icon={Upload} size="sm" onClick={() => navigate("upload-documents")}>
          Upload New
        </Btn>
      </div>

      {toast && (<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl px-4 py-3 mb-4">
          <CheckCircle size={16}/>
          <span>{toast}</span>
        </div>)}

      {previewFile && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setPreviewFile(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <FileText size={20} className="text-blue-600"/>
            </div>
            <p className="font-bold text-slate-900 mb-1">{previewFile.name}</p>
            <p className="text-sm text-slate-500 mb-1">{previewFile.type} · {previewFile.size}</p>
            <p className="text-xs text-slate-400 mb-5">Uploaded {previewFile.date}</p>
            <Btn variant="primary" className="w-full" onClick={() => setPreviewFile(null)}>Close Preview</Btn>
          </div>
        </div>)}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["File Name", "Type", "Upload Date", "Size", "Actions"].map((h) => (<th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3.5">
                    {h}
                  </th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {files.map((f, i) => (<tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <FileText size={14} className="text-blue-600"/>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{f.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge text={f.type} color="blue"/></td>
                  <td className="px-5 py-4 text-sm text-slate-600">{f.date}</td>
                  <td className="px-5 py-4 text-sm text-slate-500" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {f.size}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setPreviewFile(f)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Preview"><Eye size={14}/></button>
                      <button onClick={() => handleDownload(f)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Download"><Download size={14}/></button>
                      <button onClick={() => handleReupload(i)} className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Re-sync"><RefreshCw size={14}/></button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
