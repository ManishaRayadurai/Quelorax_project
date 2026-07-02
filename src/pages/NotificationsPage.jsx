import { useState } from "react";
import { Clock, Bell, AlertTriangle, CheckCircle, Info, CheckSquare } from "lucide-react";
import Btn from "../components/ui/Btn";

const INITIAL_ITEMS = [
    { type: "alert", title: "Token A-042 — Called Now", body: "Please proceed to Counter 3 immediately.", time: "Just now", read: false, color: "blue" },
    { type: "reminder", title: "Queue Reminder", body: "You are next in line. ~5 min.", time: "8 min ago", read: false, color: "teal" },
    { type: "emergency", title: "Emergency Alert", body: "Counter 3 suspended. Redirected to Counter 5.", time: "22 min ago", read: false, color: "red" },
    { type: "success", title: "Token Confirmed", body: "Lab Tests token B-015 booked for 2:00 PM today.", time: "1 hr ago", read: true, color: "green" },
    { type: "info", title: "Crowd Level Update", body: "Crowd reduced. New est. wait: 20 min.", time: "2 hrs ago", read: true, color: "purple" },
    { type: "reminder", title: "Tomorrow Appointment", body: "Follow-up — 1 Jul at 10:30 AM.", time: "3 hrs ago", read: true, color: "orange" },
];

export default function NotificationsPage() {
    const [items, setItems] = useState(INITIAL_ITEMS);
    const icons = {
        alert: Bell, reminder: Clock, emergency: AlertTriangle, success: CheckCircle, info: Info,
    };
    const iconBgs = {
        blue: "bg-blue-50 text-blue-600", teal: "bg-cyan-50 text-cyan-600",
        red: "bg-red-50 text-red-600", green: "bg-emerald-50 text-emerald-600",
        purple: "bg-purple-50 text-purple-600", orange: "bg-amber-50 text-amber-600",
        gray: "bg-slate-50 text-slate-500", yellow: "bg-amber-50 text-amber-600",
    };
    const unreadCount = items.filter((n) => !n.read).length;

    const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    const markOneRead = (idx) => setItems((prev) => prev.map((n, i) => i === idx ? { ...n, read: true } : n));

    return (<div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Notifications
          </h1>
          <p className="text-slate-500 text-sm mt-1">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        <Btn variant="ghost" icon={CheckSquare} size="sm" onClick={markAllRead}>Mark All Read</Btn>
      </div>

      <div className="max-w-2xl space-y-3">
        {items.map((n, i) => {
            const Icon = icons[n.type] || Bell;
            return (<div key={i} onClick={() => markOneRead(i)} className={`bg-white rounded-2xl p-4 shadow-sm border transition-all hover:shadow-md cursor-pointer ${n.read ? "border-slate-100" : "border-blue-100"}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgs[n.color]}`}>
                  <Icon size={17}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`font-semibold text-sm truncate ${n.read ? "text-slate-700" : "text-slate-900"}`}>
                      {n.title}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400">{n.time}</span>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-blue-600"/>}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{n.body}</p>
                </div>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
