import { useState } from "react";
import { Phone, Mail, Lock, UserPlus, User, AlertCircle, CheckCircle2 } from "lucide-react";
import Btn from "../components/ui/Btn";
import PublicNav from "../components/layout/PublicNav";
import { signup } from "../data/mockAuth";
import { useLanguage } from "../context/LanguageContext";

export default function RegisterPage({ navigate, module, onSuccess }) {
    const { t } = useLanguage();
    const [form, setForm] = useState({
        name: "", email: "", mobile: "", password: "", confirm: "", role: "patient",
    });
    const [otpStage, setOtpStage] = useState("idle"); // idle -> sent -> verified
    const [otp, setOtp] = useState("");
    const [devOtp, setDevOtp] = useState("");
    const [error, setError] = useState("");

    const upd = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleSendOtp = () => {
        setError("");
        if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, "").slice(-10))) {
            setError("Please enter a valid 10-digit mobile number before requesting an OTP.");
            return;
        }
        const code = String(Math.floor(100000 + Math.random() * 900000));
        setDevOtp(code);
        setOtpStage("sent");
    };

    const handleVerifyOtp = () => {
        setError("");
        if (otp.trim() !== devOtp) {
            setError("Incorrect OTP. Please check and try again.");
            return;
        }
        setOtpStage("verified");
    };

    const handleRegister = () => {
        setError("");
        if (otpStage !== "verified") {
            setError("Please verify your mobile number with the OTP before registering.");
            return;
        }
        const result = signup({ ...form, module: module || "hospital" });
        if (!result.ok) {
            setError(result.error);
            return;
        }
        onSuccess(result.user);
    };

    return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      <PublicNav navigate={navigate}/>
      <div className="flex-1 flex items-center justify-center px-4 pt-16 pb-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <UserPlus size={24} className="text-white"/>
              </div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {t("register_title")}
              </h2>
              <p className="text-blue-100 text-sm mt-1">{t("register_subtitle")}</p>
            </div>

            <div className="p-8 space-y-4">
              {error && (<div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5"/>
                  <span>{error}</span>
                </div>)}

              {[
            { label: "Full Name", key: "name", type: "text", placeholder: "Enter full name", Icon: User },
            { label: "Email", key: "email", type: "email", placeholder: "email@example.com", Icon: Mail },
            { label: "Mobile Number", key: "mobile", type: "tel", placeholder: "+91 98765 43210", Icon: Phone },
            { label: "Password", key: "password", type: "password", placeholder: "Create strong password (min. 6 chars)", Icon: Lock },
            { label: "Confirm Password", key: "confirm", type: "password", placeholder: "Re-enter password", Icon: Lock },
        ].map((f) => (<div key={f.key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                  <div className="relative">
                    <f.Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input type={f.type} value={form[f.key]} onChange={(e) => upd(f.key, e.target.value)} placeholder={f.placeholder} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                  </div>
                </div>))}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
                <select value={form.role} onChange={(e) => upd("role", e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="patient">Patient / Citizen</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="nurse">Nurse / Queue Operator</option>
                  <option value="doctor">Doctor / Officer</option>
                  <option value="admin">Administrator</option>
                </select>
                {form.role === "admin" && (<p className="text-xs text-amber-600 mt-1.5">
                    Admin accounts get full system access — only create one for yourself or someone you trust.
                  </p>)}
              </div>

              {otpStage !== "idle" && (<div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Enter OTP</label>
                  {otpStage === "sent" && (<p className="text-xs text-amber-600 mb-1.5">
                      Demo mode — your OTP is <span className="font-mono font-bold tracking-widest">{devOtp}</span>
                    </p>)}
                  <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP sent to mobile" maxLength={6} disabled={otpStage === "verified"} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-center tracking-[0.4em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"/>
                  {otpStage === "verified" && (<p className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1.5 font-medium">
                      <CheckCircle2 size={13}/> Mobile number verified
                    </p>)}
                </div>)}

              <div className="flex gap-3 pt-1">
                {otpStage === "idle" && (<Btn variant="secondary" className="flex-1" onClick={handleSendOtp}>
                    Send OTP
                  </Btn>)}
                {otpStage === "sent" && (<Btn variant="secondary" className="flex-1" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Btn>)}
                {otpStage === "verified" && (<Btn variant="secondary" className="flex-1" onClick={handleSendOtp}>
                    Resend OTP
                  </Btn>)}
                <Btn variant="primary" className="flex-1" onClick={handleRegister}>
                  {t("register_button")}
                </Btn>
              </div>

              <p className="text-center text-sm text-slate-500">
                Already registered?{" "}
                <button onClick={() => navigate("login")} className="text-blue-700 font-semibold hover:underline">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
