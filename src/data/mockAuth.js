// ──────────────────────────────────────────────────────────────────────────
// Mock Authentication "Backend"
// Simulates a real auth system entirely in the browser using localStorage,
// so signup / login / forgot-password / reset-password all behave like a
// real flow (validation, errors, persisted accounts, reset tokens) without
// needing an actual server.
// ──────────────────────────────────────────────────────────────────────────

const USERS_KEY = "quelorax_users";
const SESSION_KEY = "quelorax_session";
const RESET_KEY = "quelorax_reset_tokens";

const SEED_USERS = [
    { id: "P-10284", name: "Rajesh Kumar", email: "rajesh.kumar@gmail.com", mobile: "9876543210", password: "patient123", role: "patient", module: "hospital" },
    { id: "R-20011", name: "Priya Sharma", email: "priya.sharma@gmail.com", mobile: "9876512345", password: "reception123", role: "receptionist", module: "hospital" },
    { id: "N-30077", name: "Meena Devi", email: "meena.devi@gmail.com", mobile: "9876523456", password: "nurse123", role: "nurse", module: "hospital" },
    { id: "D-40019", name: "Dr. Arjun Nair", email: "arjun.nair@gmail.com", mobile: "9876534567", password: "doctor123", role: "doctor", module: "hospital" },
    { id: "A-90001", name: "Admin User", email: "admin@quelorax.com", mobile: "9876545678", password: "admin123", role: "admin", module: "hospital" },
];

function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (!raw) {
            localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
            return [...SEED_USERS];
        }
        return JSON.parse(raw);
    } catch {
        return [...SEED_USERS];
    }
}

function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readResetTokens() {
    try {
        const raw = localStorage.getItem(RESET_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function writeResetTokens(tokens) {
    localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
}

export function getSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function setSession(user) {
    const { password, ...safeUser } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return safeUser;
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidMobile(value) {
    return /^[6-9]\d{9}$/.test(value.replace(/\D/g, "").slice(-10));
}

function findUserByIdentifier(identifier) {
    const users = readUsers();
    const norm = identifier.trim().toLowerCase();
    return users.find((u) => u.email.toLowerCase() === norm || u.mobile === norm.replace(/\D/g, ""));
}

// ── Login ────────────────────────────────────────────────────────────────
// Returns { ok: true, user } on success, { ok: false, error } on failure.
export function login({ identifier, password, role }) {
    if (!identifier || !identifier.trim()) {
        return { ok: false, error: "Please enter your email or mobile number." };
    }
    if (!password) {
        return { ok: false, error: "Please enter your password." };
    }
    const user = findUserByIdentifier(identifier);
    if (!user) {
        return { ok: false, error: "No account found with that email or mobile number." };
    }
    if (user.password !== password) {
        return { ok: false, error: "Incorrect password. Please try again." };
    }
    // Role is detected automatically from the account record — the login
    // form no longer asks the user to pick one.
    const safeUser = setSession(user);
    return { ok: true, user: safeUser };
}

// ── Signup ───────────────────────────────────────────────────────────────
export function signup({ name, email, mobile, password, confirm, role, module }) {
    if (!name || !name.trim()) return { ok: false, error: "Please enter your full name." };
    if (!isValidEmail(email || "")) return { ok: false, error: "Please enter a valid email address." };
    const cleanMobile = (mobile || "").replace(/\D/g, "").slice(-10);
    if (!isValidMobile(cleanMobile)) return { ok: false, error: "Please enter a valid 10-digit mobile number." };
    if (!password || password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    if (password !== confirm) return { ok: false, error: "Passwords do not match." };

    const users = readUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase() || u.mobile === cleanMobile);
    if (exists) {
        return { ok: false, error: "An account with this email or mobile number already exists. Please login instead." };
    }

    const id = `${(role || "patient")[0].toUpperCase()}-${Math.floor(10000 + Math.random() * 89999)}`;
    const newUser = {
        id,
        name: name.trim(),
        email: email.trim(),
        mobile: cleanMobile,
        password,
        role: role || "patient",
        module: module || "hospital",
    };
    users.push(newUser);
    writeUsers(users);
    const safeUser = setSession(newUser);
    return { ok: true, user: safeUser };
}

// ── Update Profile ───────────────────────────────────────────────────────
// Persists profile edits (name / mobile / email) made from the Settings
// page to both the "users table" and the active session so every part of
// the app (sidebar, topbar, profile menu) reflects the change immediately.
export function updateUser(userId, updates) {
    if (!userId) return { ok: false, error: "No active session found." };
    if (updates.email && !isValidEmail(updates.email)) {
        return { ok: false, error: "Please enter a valid email address." };
    }
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return { ok: false, error: "Account not found." };

    const cleanMobile = updates.mobile ? updates.mobile.replace(/\D/g, "").slice(-10) : users[idx].mobile;
    const updated = {
        ...users[idx],
        name: updates.name?.trim() || users[idx].name,
        email: updates.email?.trim() || users[idx].email,
        mobile: cleanMobile,
    };
    users[idx] = updated;
    writeUsers(users);
    const safeUser = setSession(updated);
    return { ok: true, user: safeUser };
}

// ── Switch Active Module ─────────────────────────────────────────────────
// An account isn't locked to the module it originally signed up under —
// the user can explicitly switch to Hospital or Government services from
// the landing page. This persists that choice as the account's new default
// so it "sticks" the next time they log in without picking a module first.
export function setUserModule(userId, moduleId) {
    if (!userId || !moduleId) return { ok: false, error: "Missing account or module." };
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return { ok: false, error: "Account not found." };
    users[idx] = { ...users[idx], module: moduleId };
    writeUsers(users);
    const safeUser = setSession(users[idx]);
    return { ok: true, user: safeUser };
}

// ── Forgot / Reset Password ─────────────────────────────────────────────
// requestPasswordReset: looks up the account and issues a 6-digit reset code
// (shown directly in the UI since there's no real email/SMS backend here).
export function requestPasswordReset(identifier) {
    if (!identifier || !identifier.trim()) {
        return { ok: false, error: "Please enter your registered email or mobile number." };
    }
    const user = findUserByIdentifier(identifier);
    if (!user) {
        return { ok: false, error: "No account found with that email or mobile number." };
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const tokens = readResetTokens();
    tokens[user.id] = { code, expires: Date.now() + 10 * 60 * 1000 };
    writeResetTokens(tokens);
    return { ok: true, userId: user.id, code, maskedTarget: maskIdentifier(user.email) };
}

export function verifyResetCode(userId, code) {
    const tokens = readResetTokens();
    const entry = tokens[userId];
    if (!entry) return { ok: false, error: "Reset code not found. Please request a new one." };
    if (Date.now() > entry.expires) return { ok: false, error: "This reset code has expired. Please request a new one." };
    if (entry.code !== code.trim()) return { ok: false, error: "Incorrect reset code. Please try again." };
    return { ok: true };
}

export function resetPassword(userId, code, newPassword, confirmPassword) {
    const check = verifyResetCode(userId, code);
    if (!check.ok) return check;
    if (!newPassword || newPassword.length < 6) {
        return { ok: false, error: "New password must be at least 6 characters." };
    }
    if (newPassword !== confirmPassword) {
        return { ok: false, error: "Passwords do not match." };
    }
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return { ok: false, error: "Account not found." };
    users[idx].password = newPassword;
    writeUsers(users);
    const tokens = readResetTokens();
    delete tokens[userId];
    writeResetTokens(tokens);
    return { ok: true };
}

function maskIdentifier(email) {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(local.length - 2, 2))}@${domain}`;
}
