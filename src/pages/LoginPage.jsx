import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle, ShieldCheck } from "lucide-react";
import Btn from "../components/ui/Btn";
import PublicNav from "../components/layout/PublicNav";
import { login } from "../data/mockAuth";
import { useLanguage } from "../context/LanguageContext";

const ROLE_LABELS = {
    patient: "Patient / Citizen",
    receptionist: "Receptionist",
    nurse: "Nurse / Queue Operator",
    doctor: "Doctor / Officer",
    admin: "Admin",
};

export default function LoginPage({ navigate, role, setRole, onSuccess }) {
    const { t } = useLanguage();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError("");
        setLoading(true);
        // Role is detected automatically from the matched account — the
        // user is never asked to choose it here.
        const result = login({ identifier, password });
        setLoading(false);
        if (!result.ok) {
            setError(result.error);
            return;
        }
        if (setRole) setRole(null);
        onSuccess(result.user);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      <PublicNav navigate={navigate}/>
      <div className="flex-1 flex items-center justify-center px-4 pt-16 pb-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Lock size={24} className="text-white"/>
              </div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {t("login_welcome")}
              </h2>
              <p className="text-blue-100 text-sm mt-1">{t("login_subtitle")}</p>
            </div>

            <div className="p-8 space-y-4" onKeyDown={handleKeyDown}>
              {error && (<div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5"/>
                  <span>{error}</span>
                </div>)}

              {role && ROLE_LABELS[role] && (<div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-xl px-4 py-2.5">
                  <ShieldCheck size={14} className="shrink-0"/>
                  <span>Continuing as <span className="font-semibold">{ROLE_LABELS[role]}</span> — your account role is applied automatically.</span>
                </div>)}

              <div className="bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-xl px-4 py-2.5">
                Demo accounts use password <span className="font-mono font-bold">role123</span> e.g. patient123, admin123 — or sign up for a new account.
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("login_identifier")}</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="email@example.com or mobile" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("login_password")}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>

              <Btn variant="primary" size="lg" className="w-full mt-2" onClick={handleLogin}>
                {loading ? "Signing in..." : t("login_button")}
              </Btn>

              <div className="flex items-center justify-between pt-1">
                <button onClick={() => navigate("forgot-password")} className="text-sm text-blue-700 hover:underline font-medium">
                  {t("login_forgot")}
                </button>
                <button onClick={() => navigate("register")} className="text-sm text-blue-700 hover:underline font-medium">
                  {t("login_signup")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
