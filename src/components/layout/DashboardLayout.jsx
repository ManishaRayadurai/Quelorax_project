import { useState } from "react";
import { Bell, Settings, Menu, Search, User, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, navigate, currentPage, role, user, moduleContent, onLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    const placeholder = moduleContent?.searchPlaceholder || "Search...";

    return (<div className="flex h-screen bg-slate-50">
      <Sidebar navigate={navigate} currentPage={currentPage} role={role} open={sidebarOpen} setOpen={setSidebarOpen} user={user} moduleContent={moduleContent} onLogout={onLogout}/>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6 shadow-sm shrink-0 relative">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
              <Menu size={20}/>
            </button>
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={placeholder} className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"/>
              {searchQuery && (<button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={13}/>
                </button>)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("notifications")} className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell size={19}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/>
            </button>
            <button onClick={() => navigate("settings")} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <Settings size={19}/>
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen((p) => !p)} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center cursor-pointer shadow-sm ml-1">
                <User size={16} className="text-white"/>
              </button>
              {profileOpen && (<>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)}/>
                  <div className="absolute right-0 top-12 z-20 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                    <div className="px-4 py-2 border-b border-slate-50">
                      <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || "Guest"}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => { setProfileOpen(false); navigate("settings"); }} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                      Account Settings
                    </button>
                    <button onClick={() => { setProfileOpen(false); onLogout(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                </>)}
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>);
}
