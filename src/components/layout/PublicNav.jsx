import { useState } from "react";
import { Activity, Menu, X, Globe, Check } from "lucide-react";
import Btn from "../../components/ui/Btn";
import { useLanguage } from "../../context/LanguageContext";

export default function PublicNav({ navigate }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { language, setLanguage, t, languages } = useLanguage();

    const goToSection = (id) => {
        setMenuOpen(false);
        navigate("landing");
        // Wait one tick for the landing page to mount, then scroll.
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
    };

    const navLinks = [
        { label: t("nav_home"), id: "home" },
        { label: t("nav_features"), id: "features" },
        { label: t("nav_about"), id: "about" },
        { label: t("nav_contact"), id: "contact" },
    ];

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    return (<nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate("landing")} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
              <Activity size={17} className="text-white"/>
            </div>
            <span className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Quelorax
            </span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (<button key={item.id} onClick={() => goToSection(item.id)} className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
                {item.label}
              </button>))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button onClick={() => setLangOpen((o) => !o)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors" aria-label="Change language">
                <Globe size={15}/>
                <span>{currentLang.short}</span>
              </button>
              {langOpen && (<>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)}/>
                  <div className="absolute right-0 top-11 z-20 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5">
                    {languages.map((l) => (<button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }} className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <span>{l.label}</span>
                        {language === l.code && <Check size={14} className="text-blue-600"/>}
                      </button>))}
                  </div>
                </>)}
            </div>
            <Btn variant="outline" size="sm" onClick={() => navigate("login")}>{t("nav_login")}</Btn>
            <Btn variant="primary" size="sm" onClick={() => navigate("register")}>{t("nav_signup")}</Btn>
          </div>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
      {menuOpen && (<div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          {navLinks.map((item) => (<button key={item.id} onClick={() => goToSection(item.id)} className="block w-full text-left text-sm font-medium text-slate-600 py-2.5 px-3 rounded-lg hover:bg-slate-50">
              {item.label}
            </button>))}

          {/* Language switcher (mobile) */}
          <div className="pt-2 border-t border-slate-100">
            <p className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Globe size={12}/> Language
            </p>
            <div className="flex gap-2 px-3 pb-1">
              {languages.map((l) => (<button key={l.code} onClick={() => setLanguage(l.code)} className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${language === l.code ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"}`}>
                  {l.label}
                </button>))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Btn variant="outline" onClick={() => navigate("login")} className="flex-1">{t("nav_login")}</Btn>
            <Btn variant="primary" onClick={() => navigate("register")} className="flex-1">{t("nav_signup")}</Btn>
          </div>
        </div>)}
    </nav>);
}
