import { useState } from "react";
import { Clock, Activity, BarChart2, Shield, Volume2, Zap, UserPlus, Ticket, HeartPulse, Landmark, Navigation, Star, CheckCircle, ArrowRight, Sparkles, Mail, Phone, MapPin, Send, User as UserIcon, MessageSquare, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Btn from "../components/ui/Btn";
import PublicNav from "../components/layout/PublicNav";
import { useLanguage } from "../context/LanguageContext";

export default function LandingPage({ navigate, goToModule }) {
    const { t } = useLanguage();
    const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [contactSent, setContactSent] = useState(false);

    const updContact = (k, v) => setContactForm((prev) => ({ ...prev, [k]: v }));

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;
        setContactSent(true);
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setContactSent(false), 5000);
    };

    const features = [
        { icon: Zap, title: "AI-Powered Predictions", desc: "Machine learning forecasts crowd levels and wait times with 94% accuracy.", color: "blue" },
        { icon: Clock, title: "Real-Time Queue Tracking", desc: "Live token status, queue position, and ETA updates on every device.", color: "teal" },
        { icon: Navigation, title: "Smart Department Routing", desc: "AI recommends the right department based on your symptoms or service.", color: "purple" },
        { icon: Shield, title: "Priority Management", desc: "Automated priority lanes for emergencies, senior citizens, and VIPs.", color: "green" },
        { icon: BarChart2, title: "Advanced Analytics", desc: "Crowd flow dashboards with predictive insights for administrators.", color: "orange" },
        { icon: Volume2, title: "Multilingual Voice Assistant", desc: "Voice support in English and Tamil for accessible queue management.", color: "teal" },
    ];
    const iconBgs = {
        blue: "bg-blue-100 text-blue-700",
        teal: "bg-cyan-100 text-cyan-700",
        purple: "bg-purple-100 text-purple-700",
        green: "bg-emerald-100 text-emerald-700",
        orange: "bg-amber-100 text-amber-700",
        red: "bg-red-100 text-red-700",
    };
    const testimonials = [
        { name: "Dr. Kavitha Rao", role: "Medical Superintendent, City General Hospital", quote: "Queue chaos in our OPD dropped almost overnight. Patients now know exactly when to arrive.", rating: 5 },
        { name: "S. Manoharan", role: "District Civic Service Center", quote: "Aadhaar and certificate counters used to overflow into the corridor. Quelorax fixed that in weeks.", rating: 5 },
        { name: "Anjali Patel", role: "Patient, General OPD", quote: "I booked a token from home and walked in 20 minutes before my turn. No more waiting rooms.", rating: 5 },
    ];

    return (<div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <PublicNav navigate={navigate}/>

      {/* Hero */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"/>
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-8">
              <Sparkles size={13} className="text-cyan-400"/>
              <span className="text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                AI-Powered Queue Intelligence
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("hero_title_1")}<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t("hero_title_2")}
              </span>
              <br />{t("hero_title_3")}
            </h1>

            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("hero_subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Btn size="lg" variant="primary" icon={HeartPulse} onClick={() => goToModule("hospital")}>
                {t("hero_cta_hospital")}
              </Btn>
              <Btn size="lg" variant="teal" icon={Landmark} onClick={() => goToModule("government")}>
                {t("hero_cta_government")}
              </Btn>
              <button onClick={() => navigate("login")} className="px-7 py-3.5 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/60 transition-all">
                {t("hero_cta_login")}
              </button>
              <button onClick={() => navigate("register")} className="px-7 py-3.5 text-base font-semibold text-blue-200 border-2 border-blue-400/40 rounded-xl hover:bg-blue-500/20 hover:border-blue-400/80 transition-all">
                {t("hero_cta_signup")}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
            { value: "2.4M+", label: "Tokens Generated" },
            { value: "94%", label: "Prediction Accuracy" },
            { value: "58%", label: "Wait Time Reduction" },
            { value: "500+", label: "Institutions" },
        ].map((s) => (<div key={s.label} className="text-center p-5 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <p className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-sm text-slate-400 mt-1">{s.label}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Module Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold">
              Two Modules, One Platform
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Built for Hospitals and Government Offices Alike
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Each module is purpose-tuned with its own departments, terminology, and workflows —
              not a one-size-fits-all queue screen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => goToModule("hospital")} className="group text-left bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <HeartPulse size={28} className="text-white"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Hospital Module
              </h3>
              <p className="text-slate-500 mb-5 text-sm leading-relaxed">
                OPD appointments, specialist consultations, lab tests, pharmacy queues, emergency
                triage, and ward management — all in one queue system.
              </p>
              <div className="space-y-1.5 mb-6">
                {["OPD & Specialist Consultations", "Emergency Triage Priority", "Lab & Pharmacy Queues"].map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={13} className="text-emerald-500 shrink-0"/>
                    {f}
                  </div>))}
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                <span>Explore Hospital Module</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
              </div>
            </button>

            <button onClick={() => goToModule("government")} className="group text-left bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-8 border border-cyan-100 hover:border-cyan-300 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Landmark size={28} className="text-white"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Government Module
              </h3>
              <p className="text-slate-500 mb-5 text-sm leading-relaxed">
                Aadhaar services, license renewal, certificate issuance, tax filing, and grievance
                redressal — streamlined for civic service centers.
              </p>
              <div className="space-y-1.5 mb-6">
                {["Aadhaar & Identity Services", "License & Permit Renewal", "Certificates & Grievances"].map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={13} className="text-emerald-500 shrink-0"/>
                    {f}
                  </div>))}
              </div>
              <div className="flex items-center gap-2 text-cyan-700 font-semibold text-sm">
                <span>Explore Government Module</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Intelligent Features for Modern Queuing
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Purpose-built for hospitals and government offices — combining AI, real-time
              data, and intuitive design.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (<div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBgs[f.color]}`}>
                  <f.icon size={22}/>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
            { step: "01", title: "Register & Login", desc: "Create your account and choose your role — patient, staff, or admin.", icon: UserPlus },
            { step: "02", title: "Select Service", desc: "Pick hospital or government module, then let AI guide you to the right department.", icon: Navigation },
            { step: "03", title: "Book Token", desc: "Generate your queue token instantly with a QR code and slot confirmation.", icon: Ticket },
            { step: "04", title: "Track Live", desc: "Monitor your position in real time and receive smart notifications.", icon: Activity },
        ].map((s, i) => (<div key={s.step} className="relative text-center">
                {i < 3 && (<div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-blue-100 z-0"/>)}
                <div className="relative z-10 w-12 h-12 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Trusted by Institutions and Citizens
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (<div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={14} className="text-amber-400 fill-amber-400"/>))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("contact_title")}
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto">{t("contact_subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info column */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: MapPin, title: t("contact_office"), value: "4th Floor, Anna Salai, Chennai, Tamil Nadu 600002" },
                { icon: Phone, title: t("contact_phone"), value: "+91 44 4567 8900" },
                { icon: Mail, title: "Email", value: "support@quelorax.com" },
                { icon: Clock, title: t("contact_hours"), value: t("contact_hours_value") },
              ].map((c) => (<div key={c.title} className="flex items-start gap-3 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                    <c.icon size={17} className="text-cyan-300"/>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{c.value}</p>
                  </div>
                </div>))}
            </div>

            {/* Form column */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
              {contactSent && (<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl px-4 py-3 mb-5">
                  <CheckCircle size={16}/>
                  <span>{t("contact_sent")}</span>
                </div>)}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t("contact_name")}</label>
                    <div className="relative">
                      <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input required value={contactForm.name} onChange={(e) => updContact("name", e.target.value)} placeholder="Your name" className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t("contact_email")}</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input required type="email" value={contactForm.email} onChange={(e) => updContact("email", e.target.value)} placeholder="you@example.com" className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t("contact_subject")}</label>
                  <input value={contactForm.subject} onChange={(e) => updContact("subject", e.target.value)} placeholder="How can we help?" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t("contact_message")}</label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3 text-slate-400"/>
                    <textarea required rows={4} value={contactForm.message} onChange={(e) => updContact("message", e.target.value)} placeholder="Tell us about your institution and requirements..." className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"/>
                  </div>
                </div>
                <Btn type="submit" variant="primary" size="lg" icon={Send} className="w-full sm:w-auto">
                  {t("contact_send")}
                </Btn>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
            <button onClick={() => navigate("register")} className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl shadow hover:bg-blue-50 transition-all text-base">
              Get Started Free
            </button>
            <button onClick={() => navigate("login")} className="px-8 py-3.5 text-white font-semibold border-2 border-white/50 rounded-xl hover:bg-white/10 transition-all text-base">
              Login to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-slate-400 pt-16 pb-8 overflow-hidden">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"/>
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"/>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <p className="text-sm leading-relaxed">
                Smart, real-time queue and crowd management built to eliminate long waits at hospitals, government offices, and public service centers.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-300 transition-all">
                    <Icon size={15}/>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><button onClick={() => navigate("register")} className="hover:text-white transition-colors">Get Started</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><button onClick={() => navigate("login")} className="hover:text-white transition-colors">Login to Dashboard</button></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Get In Touch</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Mail size={15} className="mt-0.5 text-blue-400 shrink-0"/>
                  <span>support@example.com</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={15} className="mt-0.5 text-blue-400 shrink-0"/>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} className="mt-0.5 text-blue-400 shrink-0"/>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">© 2026 All rights reserved. Smart Queue & Crowd Management System.</p>
            <p className="text-xs text-slate-500">Made with care for faster, fairer service.</p>
          </div>
        </div>
      </footer>
    </div>);
}
