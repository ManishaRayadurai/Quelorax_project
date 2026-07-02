// ──────────────────────────────────────────────────────────────────────────
// Module-aware content: every label, department name, person name, and
// quick-action that differs between the Hospital module and the
// Government module lives here, so dashboards/pages can stay role-based
// in structure but swap their *content* based on the active module.
// ──────────────────────────────────────────────────────────────────────────

export const MODULES = {
    hospital: {
        key: "hospital",
        orgName: "City General Hospital",
        entityLabel: "Patient",
        entityLabelPlural: "Patients",
        staffLabel: "Staff",
        searchPlaceholder: "Search patients, tokens...",
        departments: ["General OPD", "Cardiology", "Orthopedics", "Pediatrics", "Ophthalmology", "Emergency"],
        services: ["Consultation", "Follow-up Visit", "Lab Test", "Scan / Imaging", "Vaccination"],
        primaryDept: "General OPD",
        counterLabel: "Counter",
        roleTitles: {
            patient: "Patient / Citizen",
            receptionist: "Receptionist",
            nurse: "Nurse / Queue Operator",
            doctor: "Doctor / Officer",
            admin: "Admin",
        },
        dashboardTitles: {
            patient: "Patient Dashboard",
            receptionist: "Reception Dashboard",
            nurse: "Nurse Dashboard",
            doctor: "Doctor Dashboard",
            admin: "Admin Dashboard",
        },
        queueRoles: { receptionist: "Counter Officer", nurse: "Triage Nurse", doctor: "Consulting Doctor" },
        sampleQueue: [
            { token: "A-036", name: "Meena Krishnan", dept: "General OPD", priority: "normal", status: "serving", wait: "Now" },
            { token: "A-037", name: "Ravi Shankar", dept: "General OPD", priority: "senior", status: "waiting", wait: "3 min" },
            { token: "A-038", name: "Anjali Patel", dept: "General OPD", priority: "normal", status: "waiting", wait: "8 min" },
            { token: "A-039", name: "Suresh Babu", dept: "Cardiology", priority: "emergency", status: "waiting", wait: "Urgent" },
            { token: "A-040", name: "Kavya Nair", dept: "General OPD", priority: "normal", status: "waiting", wait: "18 min" },
            { token: "A-041", name: "Dinesh Raj", dept: "Pediatrics", priority: "normal", status: "waiting", wait: "22 min" },
        ],
        priorityLabels: { normal: "Normal", senior: "Senior Citizen", emergency: "Emergency" },
        emergencyQueue: [
            { token: "E-005", name: "Kumar Reddy", age: 55, note: "Chest pain" },
            { token: "E-006", name: "Baby Girl Meena", age: 2, note: "High fever 104°F" },
        ],
        seniorQueue: [
            { token: "S-003", name: "Ammini Amma", age: 78, note: "Hypertension follow-up" },
            { token: "S-004", name: "Gopal Nair", age: 81, note: "Diabetes check" },
        ],
        mainQueue: [
            { token: "A-037", name: "Ravi Shankar", age: 68, note: "General consultation" },
            { token: "A-038", name: "Anjali Patel", age: 34, note: "Respiratory infection" },
            { token: "A-040", name: "Kavya Nair", age: 28, note: "Fever" },
        ],
        doctorQueue: [
            { token: "A-037", name: "Ravi Shankar", age: 68, reason: "Hypertension follow-up" },
            { token: "A-038", name: "Anjali Patel", age: 34, reason: "Respiratory infection" },
            { token: "A-039", name: "Suresh Babu", age: 45, reason: "Chest pain — urgent" },
            { token: "A-040", name: "Kavya Nair", age: 28, reason: "Fever and body ache" },
        ],
        quickActions: [
            { label: "Manage Departments", desc: "Configure queues and counters", page: "receptionist-dashboard" },
        ],
        systemStatus: [
            { label: "AI Engine", status: "Online", uptime: "99.9%", color: "green" },
            { label: "Queue Server", status: "Online", uptime: "99.7%", color: "green" },
            { label: "CCTV Stream", status: "Active", uptime: "98.2%", color: "green" },
            { label: "Notification Service", status: "Online", uptime: "99.5%", color: "green" },
            { label: "Database Cluster", status: "Optimal", uptime: "99.9%", color: "green" },
            { label: "Backup System", status: "Syncing", uptime: "100%", color: "teal" },
        ],
        deptPie: [
            { name: "General OPD", value: 35, color: "#1D4ED8" },
            { name: "Cardiology", value: 20, color: "#06B6D4" },
            { name: "Orthopedics", value: 15, color: "#10B981" },
            { name: "Pediatrics", value: 18, color: "#8B5CF6" },
            { name: "Emergency", value: 12, color: "#F59E0B" },
        ],
        smartRoutingSymptomLabel: "Describe your symptoms",
        smartRoutingPlaceholder: "e.g. chest pain, fever, vision problem...",
        accentGrad: "from-blue-600 to-blue-400",
        icon: "HeartPulse",
    },
    government: {
        key: "government",
        orgName: "District Civic Service Center",
        entityLabel: "Citizen",
        entityLabelPlural: "Citizens",
        staffLabel: "Officer",
        searchPlaceholder: "Search citizens, applications...",
        departments: ["Aadhaar Services", "License & RTO", "Certificates", "Tax & Revenue", "Passport Services", "Grievance Cell"],
        services: ["New Application", "Renewal", "Correction / Update", "Document Verification", "Status Enquiry"],
        primaryDept: "Aadhaar Services",
        counterLabel: "Window",
        roleTitles: {
            patient: "Citizen / Applicant",
            receptionist: "Front Desk Officer",
            nurse: "Verification Officer",
            doctor: "Approving Officer",
            admin: "Admin",
        },
        dashboardTitles: {
            patient: "Citizen Dashboard",
            receptionist: "Front Desk Dashboard",
            nurse: "Verification Dashboard",
            doctor: "Approval Dashboard",
            admin: "Admin Dashboard",
        },
        queueRoles: { receptionist: "Window Officer", nurse: "Verification Officer", doctor: "Approving Officer" },
        sampleQueue: [
            { token: "G-036", name: "Meena Krishnan", dept: "Aadhaar Services", priority: "normal", status: "serving", wait: "Now" },
            { token: "G-037", name: "Ravi Shankar", dept: "Aadhaar Services", priority: "senior", status: "waiting", wait: "3 min" },
            { token: "G-038", name: "Anjali Patel", dept: "Aadhaar Services", priority: "normal", status: "waiting", wait: "8 min" },
            { token: "G-039", name: "Suresh Babu", dept: "License & RTO", priority: "emergency", status: "waiting", wait: "Urgent" },
            { token: "G-040", name: "Kavya Nair", dept: "Certificates", priority: "normal", status: "waiting", wait: "18 min" },
            { token: "G-041", name: "Dinesh Raj", dept: "Tax & Revenue", priority: "normal", status: "waiting", wait: "22 min" },
        ],
        priorityLabels: { normal: "Normal", senior: "Senior Citizen", emergency: "Priority Case" },
        emergencyQueue: [
            { token: "P-005", name: "Kumar Reddy", age: 55, note: "Urgent grievance — pension delay" },
            { token: "P-006", name: "Latha Iyer", age: 61, note: "Disability certificate — time-bound" },
        ],
        seniorQueue: [
            { token: "S-003", name: "Ammini Amma", age: 78, note: "Pension renewal" },
            { token: "S-004", name: "Gopal Nair", age: 81, note: "Aadhaar address update" },
        ],
        mainQueue: [
            { token: "G-037", name: "Ravi Shankar", age: 68, note: "License renewal" },
            { token: "G-038", name: "Anjali Patel", age: 34, note: "Income certificate" },
            { token: "G-040", name: "Kavya Nair", age: 28, note: "Aadhaar correction" },
        ],
        doctorQueue: [
            { token: "G-037", name: "Ravi Shankar", age: 68, reason: "License renewal — document review" },
            { token: "G-038", name: "Anjali Patel", age: 34, reason: "Income certificate approval" },
            { token: "G-039", name: "Suresh Babu", age: 45, reason: "Grievance case — urgent" },
            { token: "G-040", name: "Kavya Nair", age: 28, reason: "Aadhaar correction sign-off" },
        ],
        quickActions: [
            { label: "Manage Counters", desc: "Configure service windows and queues", page: "receptionist-dashboard" },
        ],
        systemStatus: [
            { label: "AI Engine", status: "Online", uptime: "99.9%", color: "green" },
            { label: "Queue Server", status: "Online", uptime: "99.6%", color: "green" },
            { label: "CCTV Stream", status: "Active", uptime: "97.8%", color: "green" },
            { label: "Notification Service", status: "Online", uptime: "99.4%", color: "green" },
            { label: "Document Vault", status: "Optimal", uptime: "99.8%", color: "green" },
            { label: "Backup System", status: "Syncing", uptime: "100%", color: "teal" },
        ],
        deptPie: [
            { name: "Aadhaar Services", value: 32, color: "#0891B2" },
            { name: "License & RTO", value: 24, color: "#1D4ED8" },
            { name: "Certificates", value: 18, color: "#10B981" },
            { name: "Tax & Revenue", value: 14, color: "#8B5CF6" },
            { name: "Grievance Cell", value: 12, color: "#F59E0B" },
        ],
        smartRoutingSymptomLabel: "Describe the service you need",
        smartRoutingPlaceholder: "e.g. lost Aadhaar card, license renewal, income certificate...",
        accentGrad: "from-cyan-600 to-cyan-400",
        icon: "Landmark",
    },
};

export function getModuleContent(moduleKey) {
    return MODULES[moduleKey] || MODULES.hospital;
}
