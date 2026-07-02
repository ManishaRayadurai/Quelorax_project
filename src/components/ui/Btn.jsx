export default function Btn({ children, onClick, variant = "primary", className = "", icon: Icon, size = "md", type = "button", }) {
    const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer select-none";
    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-base",
    };
    const variants = {
        primary: "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white focus:ring-blue-500 shadow-sm hover:shadow-md",
        secondary: "bg-blue-50 hover:bg-blue-100 text-blue-700 focus:ring-blue-400",
        outline: "border-2 border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-400",
        ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
        teal: "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white focus:ring-cyan-400 shadow-sm hover:shadow-md",
    };
    return (<button type={type} onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={size === "lg" ? 18 : 15}/>}
      {children}
    </button>);
}
