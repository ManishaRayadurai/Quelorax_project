import { Clock, Activity, Bell, FileText, Settings, LogOut, Camera, BarChart2, LayoutDashboard, FileBarChart, Ticket, User, Navigation } from "lucide-react";

// Nav items per role — labels are module-neutral; module-specific overrides applied below
const getSidebarItems = (role, mc) => {
    const isGovt = mc?.key === "government";
    const entityLabel   = mc?.entityLabel   || "Patient";
    const counterLabel  = mc?.counterLabel  || "Counter";
    const items = {
        patient: [
            { id: "patient-dashboard",  label: "Dashboard",        icon: LayoutDashboard },
            { id: "token-booking",      label: isGovt ? "Book Application" : "Book Token",   icon: Ticket },
            { id: "smart-routing",      label: isGovt ? "Service Finder"   : "Smart Routing", icon: Navigation },
            { id: "queue-tracking",     label: isGovt ? "Track Application" : "Track Queue",  icon: Clock },
            { id: "notifications",      label: "Notifications",    icon: Bell },
            { id: "upload-documents",   label: isGovt ? "Upload Documents" : "Medical Docs",  icon: FileText },
            { id: "settings",           label: "Settings",         icon: Settings },
        ],
        receptionist: [
            { id: "receptionist-dashboard", label: "Dashboard",           icon: LayoutDashboard },
            { id: "token-booking",          label: isGovt ? "Issue Token"  : "Token Management", icon: Ticket },
            { id: "queue-tracking",         label: isGovt ? `${counterLabel} Queue` : "Queue Management", icon: Clock },
            { id: "smart-routing",          label: isGovt ? "Service Guide" : "Smart Routing", icon: Navigation },
            { id: "notifications",          label: "Notifications",        icon: Bell },
            { id: "upload-documents",       label: "Documents",            icon: FileText },
            { id: "analytics",              label: "Analytics",            icon: BarChart2 },
            { id: "reports",                label: "Reports",              icon: FileBarChart },
            { id: "settings",              label: "Settings",             icon: Settings },
        ],
        nurse: [
            { id: "nurse-dashboard",    label: "Dashboard",                                   icon: LayoutDashboard },
            { id: "queue-tracking",     label: isGovt ? "Application Queue" : "Queue Management", icon: Clock },
            { id: "token-booking",      label: isGovt ? "Issue Token"       : "Token Management", icon: Ticket },
            { id: "notifications",      label: "Notifications",             icon: Bell },
            { id: "analytics",          label: "Analytics",                 icon: BarChart2 },
            { id: "settings",           label: "Settings",                  icon: Settings },
        ],
        doctor: [
            { id: "doctor-dashboard",   label: "Dashboard",                                    icon: LayoutDashboard },
            { id: "queue-tracking",     label: isGovt ? "Application Queue" : "Queue Management", icon: Clock },
            { id: "upload-documents",   label: isGovt ? "Case Documents"    : "Patient Records",  icon: FileText },
            { id: "notifications",      label: "Notifications",              icon: Bell },
            { id: "analytics",          label: "Analytics",                  icon: BarChart2 },
            { id: "reports",            label: "Reports",                    icon: FileBarChart },
            { id: "settings",           label: "Settings",                   icon: Settings },
        ],
        admin: [
            { id: "admin-dashboard",        label: "Dashboard",                                              icon: LayoutDashboard },
            { id: "receptionist-dashboard", label: isGovt ? "Window Management" : "Queue Management",       icon: Clock },
            { id: "analytics",              label: "Analytics & Insights",                                   icon: BarChart2 },
            { id: "reports",                label: "Reports",                                                icon: FileBarChart },
            { id: "cctv",                   label: "CCTV Monitor",                                           icon: Camera },
            { id: "notifications",          label: "Notifications",                                          icon: Bell },
            { id: "settings",               label: "Settings",                                               icon: Settings },
        ],
    };
    return items[role] || items.patient;
};

export default function Sidebar({ navigate, currentPage, role, open, setOpen, user, moduleContent, onLogout }) {
    const items   = getSidebarItems(role || "patient", moduleContent);
    const name    = user?.name || "Guest";
    const orgName = moduleContent?.orgName || "Quelorax";

    // Role badge: use module-aware title, capitalised
    const roleTitle = moduleContent?.roleTitles?.[role || "patient"]
        || (role ? role.charAt(0).toUpperCase() + role.slice(1) : "Patient");

    // Accent colour changes per module
    const isGovt      = moduleContent?.key === "government";
    const accentGrad  = isGovt ? "from-cyan-500 to-teal-400" : "from-blue-500 to-cyan-400";
    const activeBg    = isGovt ? "bg-cyan-700"               : "bg-blue-600";
    const activeShadow= isGovt ? "shadow-cyan-900/40"        : "shadow-blue-900/40";

    return (
        <>
            {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)}/>}
            <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                {/* Logo */}
                <div className="p-5 border-b border-slate-700/60">
                    <button onClick={() => navigate("landing")} className="flex items-center gap-2.5 w-full">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${accentGrad} flex items-center justify-center shadow-md shrink-0`}>
                            <Activity size={17} className="text-white"/>
                        </div>
                        <div className="text-left min-w-0">
                            <p className="font-bold text-white text-sm leading-none" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                                Quelorax
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 truncate">{orgName}</p>
                        </div>
                    </button>
                </div>

                {/* Module tag */}
                <div className="mx-3 mt-3">
                    <div className={`text-center py-1 rounded-lg text-xs font-bold tracking-wide ${isGovt ? "bg-cyan-900/60 text-cyan-300" : "bg-blue-900/60 text-blue-300"}`}>
                        {isGovt ? "🏛 Government Module" : "🏥 Hospital Module"}
                    </div>
                </div>

                {/* User chip */}
                <div className="px-4 py-3 mx-3 mt-2 bg-slate-800 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${accentGrad} flex items-center justify-center shrink-0`}>
                            <User size={16} className="text-white"/>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{name}</p>
                            {/* roleTitle is module-aware: "Citizen / Applicant" for govt patient, "Patient / Citizen" for hospital */}
                            <p className="text-xs text-slate-400 truncate">{roleTitle}</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 mt-3 space-y-0.5 overflow-y-auto">
                    {items.map(item => {
                        const active = currentPage === item.id;
                        return (
                            <button key={item.id} onClick={() => { navigate(item.id); setOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active ? `${activeBg} text-white shadow-lg ${activeShadow}` : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                <item.icon size={17}/>
                                {item.label}
                                {item.id === "notifications" && <span className="ml-auto w-2 h-2 rounded-full bg-red-500"/>}
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-slate-700/60">
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all">
                        <LogOut size={17}/> Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
