import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, CheckCircle, TrendingUp, Ticket } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import { peakData, waitData, forecastData } from "../data/chartData";

export default function AnalyticsPage({ moduleContent }) {
    const deptPie = moduleContent?.deptPie || [];
    return (<div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Analytics Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">AI-powered crowd flow insights and operational metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Avg Wait Time" value="24 min" trend="-18%" color="green"/>
        <StatCard icon={Users} label="Peak Crowd" value="95%" trend="10 AM" color="orange"/>
        <StatCard icon={Ticket} label="Tokens Today" value="356" trend="+8%" color="blue"/>
        <StatCard icon={CheckCircle} label="Completion Rate" value="94%" trend="+2%" color="teal"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-0.5">Peak Crowd Hours</h3>
          <p className="text-xs text-slate-400 mb-4">Token volume and crowd % by hour</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={peakData} margin={{ right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="hour" tick={{ fontSize: 10 }}/>
              <YAxis tick={{ fontSize: 10 }}/>
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }}/>
              <Bar dataKey="tokens" fill="#1D4ED8" radius={[4, 4, 0, 0]} name="Tokens"/>
              <Bar dataKey="crowd" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Crowd %"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-0.5">Average Waiting Time</h3>
          <p className="text-xs text-slate-400 mb-4">Actual vs AI predicted (minutes)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={waitData} margin={{ right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="day" tick={{ fontSize: 10 }}/>
              <YAxis tick={{ fontSize: 10 }}/>
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }}/>
              <Line type="monotone" dataKey="actual" stroke="#1D4ED8" strokeWidth={2.5} dot={{ r: 4 }} name="Actual"/>
              <Line type="monotone" dataKey="predicted" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="AI Predicted"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-0.5">Department Traffic</h3>
          <p className="text-xs text-slate-400 mb-4">Token share by department</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={deptPie} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value">
                  {deptPie.map((entry, idx) => (<Cell key={idx} fill={entry.color}/>))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {deptPie.map((d) => (<div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}/>
                    <span className="text-slate-600 truncate">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-800 ml-2">{d.value}%</span>
                </div>))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-0.5">AI Crowd Forecast</h3>
          <p className="text-xs text-slate-400 mb-4">Predicted crowd % for next 5 hours</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={forecastData} margin={{ right: 10 }}>
              <defs>
                <linearGradient id="crowdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="time" tick={{ fontSize: 10 }}/>
              <YAxis tick={{ fontSize: 10 }}/>
              <Tooltip />
              <Area type="monotone" dataKey="crowd" stroke="#06B6D4" strokeWidth={2.5} fill="url(#crowdGrad)" name="Crowd %"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>);
}
