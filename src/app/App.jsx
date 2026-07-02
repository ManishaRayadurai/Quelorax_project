import { useState, useEffect } from "react";

import VoiceAssistant from "../components/widgets/VoiceAssistant";
import DashboardLayout from "../components/layout/DashboardLayout";

import LandingPage from "../pages/LandingPage";
import ModuleSelectionPage from "../pages/ModuleSelectionPage";
import RoleSelectionPage from "../pages/RoleSelectionPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

import PatientDashboard from "../pages/PatientDashboard";
import SmartRoutingPage from "../pages/SmartRoutingPage";
import TokenBookingPage from "../pages/TokenBookingPage";
import TokenConfirmationPage from "../pages/TokenConfirmationPage";
import QueueTrackingPage from "../pages/QueueTrackingPage";
import NotificationsPage from "../pages/NotificationsPage";
import UploadDocumentsPage from "../pages/UploadDocumentsPage";
import PreviousUploadsPage from "../pages/PreviousUploadsPage";

import ReceptionistDashboard from "../pages/ReceptionistDashboard";
import NurseDashboard from "../pages/NurseDashboard";
import DoctorDashboard from "../pages/DoctorDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import AnalyticsPage from "../pages/AnalyticsPage";
import ReportsPage from "../pages/ReportsPage";
import SettingsPage from "../pages/SettingsPage";
import CCTVPage from "../pages/CCTVPage";

import { getSession, clearSession, setUserModule } from "../data/mockAuth";
import { getModuleContent } from "../data/moduleContent";

const PUBLIC_PAGES = ["landing", "module-selection", "role-selection", "login", "register", "forgot-password"];

// Pages every role is allowed to see, in addition to their own dashboard.
const SHARED_PAGES = ["notifications", "settings"];

const ROLE_PAGES = {
    patient: ["patient-dashboard", "smart-routing", "token-booking", "token-confirmation", "queue-tracking", "upload-documents", "previous-uploads"],
    receptionist: ["receptionist-dashboard", "token-booking", "queue-tracking", "smart-routing", "upload-documents", "analytics", "reports"],
    nurse: ["nurse-dashboard", "queue-tracking", "token-booking", "analytics"],
    doctor: ["doctor-dashboard", "queue-tracking", "upload-documents", "analytics", "reports"],
    admin: ["admin-dashboard", "receptionist-dashboard", "analytics", "reports", "cctv", "notifications", "settings"],
};

const DASHBOARD_FOR_ROLE = {
    patient: "patient-dashboard",
    receptionist: "receptionist-dashboard",
    nurse: "nurse-dashboard",
    doctor: "doctor-dashboard",
    admin: "admin-dashboard",
};

// Turns internal page ids into real-looking, readable URL paths so the
// browser's address bar changes as the user navigates — e.g. "patient-dashboard"
// becomes "#/dashboard", "token-booking" becomes "#/tokens/book". Falls back
// to "#/<page-id>" for anything not explicitly mapped.
const PAGE_TO_PATH = {
    "landing": "/",
    "module-selection": "/modules",
    "role-selection": "/select-role",
    "login": "/login",
    "register": "/register",
    "forgot-password": "/forgot-password",
    "patient-dashboard": "/dashboard",
    "receptionist-dashboard": "/reception/dashboard",
    "nurse-dashboard": "/nurse/dashboard",
    "doctor-dashboard": "/doctor/dashboard",
    "admin-dashboard": "/admin/dashboard",
    "smart-routing": "/smart-routing",
    "token-booking": "/tokens/book",
    "token-confirmation": "/tokens/confirmation",
    "queue-tracking": "/queue/track",
    "notifications": "/notifications",
    "upload-documents": "/documents/upload",
    "previous-uploads": "/documents/history",
    "analytics": "/analytics",
    "reports": "/reports",
    "settings": "/settings",
    "cctv": "/cctv",
};
const PATH_TO_PAGE = Object.fromEntries(Object.entries(PAGE_TO_PATH).map(([page, path]) => [path, page]));

function pathForPage(page) {
    return PAGE_TO_PATH[page] || `/${page}`;
}

function pageForPath(path) {
    return PATH_TO_PAGE[path] || null;
}

export default function App() {
    const [page, setPage] = useState(() => {
        const initialHash = window.location.hash.replace(/^#/, "") || "/";
        return pageForPath(initialHash) || "landing";
    });
    const [user, setUser] = useState(null);
    const [module, setModule] = useState("hospital");
    // True only while the user is mid-flow through an explicit module pick
    // (landing page "Hospital/Government Services" buttons, or the
    // Select-Your-Module page). This is what lets a fresh module choice
    // win over whatever module the account last used.
    const [moduleChosenExplicitly, setModuleChosenExplicitly] = useState(false);
    const [pendingRole, setPendingRole] = useState(null);
    const [voiceOpen, setVoiceOpen] = useState(false);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
    // Holds the most recent token booking so the confirmation and
    // queue-tracking screens can show the real selections instead of
    // placeholder data.
    const [booking, setBooking] = useState(null);

    // Restore an existing session on first load, then make sure the page
    // implied by the current URL is actually one this user is allowed to see.
    useEffect(() => {
        const existing = getSession();
        if (existing) {
            setUser(existing);
            setModule(existing.module || "hospital");
        }
        setPage((currentPage) => {
            const isPublicTarget = PUBLIC_PAGES.includes(currentPage);
            if (isPublicTarget) return currentPage;
            if (!existing) {
                setRedirectAfterLogin(currentPage);
                return "login";
            }
            const allowed = SHARED_PAGES.includes(currentPage) || (ROLE_PAGES[existing.role] || []).includes(currentPage);
            return allowed ? currentPage : (DASHBOARD_FOR_ROLE[existing.role] || "patient-dashboard");
        });
    }, []);

    // Keep the URL's hash in sync with the current page so the app behaves
    // like a real multi-page app (shareable/bookmarkable URLs, working
    // browser back/forward buttons) even though it's a client-only SPA.
    useEffect(() => {
        const path = pathForPage(page);
        if (window.location.hash.replace(/^#/, "") !== path) {
            window.location.hash = path;
        }
    }, [page]);

    useEffect(() => {
        const onHashChange = () => {
            const path = window.location.hash.replace(/^#/, "") || "/";
            const mapped = pageForPath(path);
            if (mapped) setPage(mapped);
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const navigate = (p) => {
        if (p === "landing") {
            // Starting over — a later plain "Login" click shouldn't inherit
            // a module choice from an earlier, abandoned flow.
            setModuleChosenExplicitly(false);
        }
        // Guard: protected pages require a logged-in user with permission.
        const isPublicTarget = PUBLIC_PAGES.includes(p);
        if (!isPublicTarget) {
            if (!user) {
                setRedirectAfterLogin(p);
                setPage("login");
                return;
            }
            const allowed = SHARED_PAGES.includes(p) || (ROLE_PAGES[user.role] || []).includes(p);
            if (!allowed) {
                // Not permitted for this role — send them back to their own dashboard.
                setPage(DASHBOARD_FOR_ROLE[user.role] || "patient-dashboard");
                return;
            }
        }
        setPage(p);
    };

    const handleLoginSuccess = (loggedInUser) => {
        // If the user explicitly picked a module this session (via the
        // landing page CTAs or the Select-Your-Module screen), that choice
        // takes priority over whatever module the account last used —
        // otherwise fall back to the account's saved module, or hospital.
        const resolvedModule = moduleChosenExplicitly ? module : (loggedInUser.module || module || "hospital");

        let finalUser = loggedInUser;
        if (loggedInUser.module !== resolvedModule) {
            // Persist the newly chosen module as the account's active one
            // so it "sticks" for next time too.
            const result = setUserModule(loggedInUser.id, resolvedModule);
            if (result.ok) finalUser = result.user;
        }

        setUser(finalUser);
        setModule(resolvedModule);
        setModuleChosenExplicitly(false);
        const dest = redirectAfterLogin || DASHBOARD_FOR_ROLE[loggedInUser.role] || "patient-dashboard";
        setRedirectAfterLogin(null);
        setPage(dest);
    };

    const handleLogout = () => {
        clearSession();
        setUser(null);
        setPendingRole(null);
        setRedirectAfterLogin(null);
        setModuleChosenExplicitly(false);
        setBooking(null);
        setPage("landing");
    };

    const goToModule = (m) => {
        setModule(m);
        setModuleChosenExplicitly(true);
        navigate("role-selection");
    };

    // Passed to ModuleSelectionPage, which sets the module directly (rather
    // than through goToModule) before sending the user to role-selection.
    const chooseModule = (m) => {
        setModule(m);
        setModuleChosenExplicitly(true);
    };

    const isPublic = PUBLIC_PAGES.includes(page);
    const moduleContent = getModuleContent(module);

    const dashboardContent = {
        "patient-dashboard": <PatientDashboard navigate={navigate} user={user} moduleContent={moduleContent}/>,
        "smart-routing": <SmartRoutingPage navigate={navigate} moduleContent={moduleContent}/>,
        "token-booking": <TokenBookingPage navigate={navigate} moduleContent={moduleContent} onBook={setBooking}/>,
        "token-confirmation": <TokenConfirmationPage navigate={navigate} moduleContent={moduleContent} booking={booking}/>,
        "queue-tracking": <QueueTrackingPage navigate={navigate} moduleContent={moduleContent} booking={booking}/>,
        "notifications": <NotificationsPage navigate={navigate}/>,
        "upload-documents": <UploadDocumentsPage navigate={navigate}/>,
        "previous-uploads": <PreviousUploadsPage navigate={navigate}/>,
        "receptionist-dashboard": <ReceptionistDashboard navigate={navigate} user={user} moduleContent={moduleContent}/>,
        "nurse-dashboard": <NurseDashboard user={user} moduleContent={moduleContent}/>,
        "doctor-dashboard": <DoctorDashboard user={user} moduleContent={moduleContent}/>,
        "admin-dashboard": <AdminDashboard navigate={navigate} user={user} moduleContent={moduleContent}/>,
        "analytics": <AnalyticsPage moduleContent={moduleContent}/>,
        "reports": <ReportsPage moduleContent={moduleContent}/>,
        "settings": <SettingsPage user={user} onLogout={handleLogout} onUserUpdate={(u) => setUser(u)}/>,
        "cctv": <CCTVPage moduleContent={moduleContent}/>,
    };

    return (<div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <VoiceAssistant open={voiceOpen} setOpen={setVoiceOpen} moduleContent={moduleContent}/>

      {page === "landing" && <LandingPage navigate={navigate} goToModule={goToModule}/>}
      {page === "module-selection" && <ModuleSelectionPage navigate={navigate} setModule={chooseModule} activeModule={module}/>}
      {page === "role-selection" && <RoleSelectionPage navigate={navigate} setRole={setPendingRole} module={module} moduleContent={moduleContent}/>}
      {page === "login" && <LoginPage navigate={navigate} role={pendingRole} setRole={setPendingRole} module={module} onSuccess={handleLoginSuccess}/>}
      {page === "register" && <RegisterPage navigate={navigate} module={module} onSuccess={handleLoginSuccess}/>}
      {page === "forgot-password" && <ForgotPasswordPage navigate={navigate}/>}

      {!isPublic && dashboardContent[page] !== undefined && (<DashboardLayout navigate={navigate} currentPage={page} role={user?.role} user={user} moduleContent={moduleContent} onLogout={handleLogout}>
          {dashboardContent[page]}
        </DashboardLayout>)}
    </div>);
}
