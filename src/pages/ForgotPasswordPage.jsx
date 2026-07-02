import { useState } from "react";
import { Lock, Mail, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import Btn from "../components/ui/Btn";
import PublicNav from "../components/layout/PublicNav";
import { requestPasswordReset, resetPassword } from "../data/mockAuth";

export default function ForgotPasswordPage({ navigate }) {
    const [step, setStep] = useState("request"); // request -> code -> done
    const [identifier, setIdentifier] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [userId, setUserId] = useState(null);
    const [devCode, setDevCode] = useState("");

    const handleRequest = () => {
        setError("");
        const result = requestPasswordReset(identifier);
        if (!result.ok) {
            setError(result.error);
            return;
        }
        setUserId(result.userId);
        setDevCode(result.code);
        setInfo(`A 6-digit reset code has been sent to ${result.maskedTarget}.`);
        setStep("code");
    };

    const handleReset = () => {
        setError("");
        const result = resetPassword(userId, code, newPassword, confirmPassword);
        if (!result.ok) {
            setError(result.error);
            return;
        }
        setStep("done");
    };

    return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      <PublicNav navigate={navigate}/>
      <div className="flex-1 flex items-center justify-center px-4 pt-16 pb-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                {step === "done" ? <CheckCircle2 size={24} className="text-white"/> : <KeyRound size={24} className="text-white"/>}
              </div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {step === "request" && "Reset Password"}
                {step === "code" && "Verify & Reset"}
                {step === "done" && "Password Updated"}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {step === "request" && "Enter your registered email or mobile number"}
                {step === "code" && "Enter the code and choose a new password"}
                {step === "done" && "You can now log in with your new password"}
              </p>
            </div>

            <div className="p-8 space-y-4">
              {error && (<div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5"/>
                  <span>{error}</span>
                </div>)}
              {info && step === "code" && (<div className="flex items-start gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5"/>
                  <span>{info}</span>
                </div>)}

              {step === "request" && (<>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email / Mobile</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="email@example.com or mobile" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <Btn variant="primary" size="lg" className="w-full mt-2" onClick={handleRequest}>
                    Send Reset Code
                  </Btn>
                </>)}

              {step === "code" && (<>
                  <div className="bg-amber-50 border border-amber-100 text-amber-700 text-xs rounded-xl px-4 py-3">
                    Demo mode — no real SMS/email is sent. Your reset code is{" "}
                    <span className="font-mono font-bold tracking-widest">{devCode}</span>.
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Reset Code</label>
                    <input value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} placeholder="6-digit code" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-center tracking-[0.4em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <Btn variant="primary" size="lg" className="w-full mt-2" onClick={handleReset}>
                    Reset Password
                  </Btn>
                </>)}

              {step === "done" && (<Btn variant="primary" size="lg" className="w-full mt-2" onClick={() => navigate("login")}>
                  Go to Login
                </Btn>)}

              <p className="text-center text-sm text-slate-500 pt-1">
                Remembered your password?{" "}
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
