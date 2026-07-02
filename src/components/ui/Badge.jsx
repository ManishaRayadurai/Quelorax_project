export default function Badge({ text, color = "blue" }) {
    const colors = {
        blue: "bg-blue-100 text-blue-700",
        green: "bg-emerald-100 text-emerald-700",
        red: "bg-red-100 text-red-700",
        yellow: "bg-amber-100 text-amber-700",
        purple: "bg-purple-100 text-purple-700",
        gray: "bg-slate-100 text-slate-600",
        teal: "bg-cyan-100 text-cyan-700",
        orange: "bg-orange-100 text-orange-700",
    };
    return (<span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[color]}`}>{text}</span>);
}
