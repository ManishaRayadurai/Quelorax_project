import { useEffect, useState } from "react";
import { CheckCircle, Lock, User, LogOut, AlertCircle } from "lucide-react";
import Btn from "../components/ui/Btn";
import { updateUser } from "../data/mockAuth";
import { useLanguage } from "../context/LanguageContext";

const NOTIFS_KEY = "quelorax_notif_prefs";

function readStoredNotifs() {
    try {
        const raw = localStorage.getItem(NOTIFS_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        // ignore
    }
    return { queue: true, reminder: true, emergency: true, system: false };
}

export default function SettingsPage({ user, onLogout, onUserUpdate }) {
    const { language, setLanguage, t, languages } = useLanguage();
    const [notifs, setNotifs] = useState(readStoredNotifs);
    const [form, setForm] = useState({
        name: user?.name || "Guest",
        mobile: user?.mobile ? `+91 ${user.mobile}` : "",
        email: user?.email || "",
    });
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    // Keep the form in sync if the logged-in user changes underneath us.
    useEffect(() => {
        setForm({
            name: user?.name || "Guest",
            mobile: user?.mobile ? `+91 ${user.mobile}` : "",
            email: user?.email || "",
        });
    }, [user?.id]);

    const upd = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleSave = () => {
        setError("");
        if (!user?.id) {
            setError("You need to be logged in to save changes.");
            return;
        }
        const result = updateUser(user.id, {
            name: form.name,
            email: form.email,
            mobile: form.mobile,
        });
        if (!result.ok) {
            setError(result.error);
            return;
        }
        // Persist notification preferences (local UI preference, no server).
        try {
            localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
        } catch {
            // ignore
        }
        // Push the updated user back up to App state so the sidebar,
        // topbar, and profile menu reflect the change immediately.
        if (onUserUpdate) onUserUpdate(result.user);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (<div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t("settings_title")}
        </h1>
        <p className="text-slate-500 text-sm mt-1">{t("settings_subtitle")}</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {saved && (<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl px-4 py-3">
            <CheckCircle size={16}/>
            <span>{t("settings_saved")}</span>
          </div>)}
        {error && (<div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
            <AlertCircle size={16}/>
            <span>{error}</span>
          </div>)}

        {/* Profile */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-5">{t("settings_profile")}</h3>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
              <User size={24} className="text-white"/>
            </div>
            <div>
              <p className="font-bold text-slate-900">{form.name}</p>
              <p className="text-sm text-slate-500 capitalize">{user?.role || "Patient"} · ID: {user?.id || "—"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("settings_full_name")}</label>
              <input value={form.name} onChange={(e) => upd("name", e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("settings_mobile")}</label>
              <input value={form.mobile} onChange={(e) => upd("mobile", e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("settings_email")}</label>
              <input value={form.email} onChange={(e) => upd("email", e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">{t("settings_language")}</h3>
          <div className="flex gap-3">
            {languages.map((l) => (<button key={l.code} onClick={() => setLanguage(l.code)} className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${language === l.code
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                {l.label}
              </button>))}
          </div>
          <p className="text-xs text-slate-400 mt-3">Language changes apply instantly across the app and are remembered for next time.</p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">{t("settings_notifications")}</h3>
          <div className="space-y-1">
            {[
            { key: "queue", label: "Queue Updates", desc: "Token calls and position changes" },
            { key: "reminder", label: "Reminders", desc: "Appointment and service reminders" },
            { key: "emergency", label: "Emergency Alerts", desc: "Critical alerts and counter changes" },
            { key: "system", label: "System Updates", desc: "Maintenance and feature announcements" },
        ].map((n) => (<div key={n.key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{n.label}</p>
                  <p className="text-xs text-slate-500">{n.desc}</p>
                </div>
                <button onClick={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key] }))} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${notifs[n.key] ? "bg-blue-600" : "bg-slate-200"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifs[n.key] ? "translate-x-5" : "translate-x-0.5"}`}/>
                </button>
              </div>))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">{t("settings_security")}</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <Lock size={15} className="text-slate-400 shrink-0"/>
                <span className="text-sm font-medium text-slate-700">Change Password</span>
              </div>
              <span className="text-xs text-slate-400">Use "Forgot Password?" on login to reset</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <LogOut size={15} className="text-slate-400 shrink-0"/>
                <span className="text-sm font-medium text-slate-700">Sign out of this account</span>
              </div>
              <button onClick={onLogout} className="text-xs text-red-600 font-semibold hover:underline">Logout</button>
            </div>
          </div>
        </div>

        <Btn variant="primary" size="lg" icon={CheckCircle} className="w-full" onClick={handleSave}>
          {t("settings_save")}
        </Btn>
      </div>
    </div>);
}
