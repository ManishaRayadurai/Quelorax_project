import { useState } from "react";
import { X, Mic, Volume2, Send } from "lucide-react";

export default function VoiceAssistant({ open, setOpen, moduleContent }) {
    const isGovt = moduleContent?.key === "government";
    const primaryDept = moduleContent?.primaryDept || "General OPD";
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello! I am your Quelorax Assistant. Ask me about your token, wait time, or department directions." },
    ]);
    const [input, setInput] = useState("");
    const quickReplies = ["My token status", "Waiting time?", isGovt ? "Where is Aadhaar counter?" : "Where is OPD?", "Cancel token"];
    const respond = (msg) => {
        const lower = msg.toLowerCase().replace(/[?!.]/g, "");
        const map = {
            "my token status": `Your token A-042 is active in ${primaryDept}. 6 people ahead. ${moduleContent?.counterLabel || "Counter"} 3. Est. wait: 24 minutes.`,
            "waiting time": `Current AI prediction: 24 minutes for ${primaryDept}. Best case 18 min, worst case 35 min.`,
            "where is opd": "General OPD is on the Ground Floor, Block A. Follow the blue corridor from the main entrance.",
            "where is aadhaar counter": "Aadhaar Services is on the Ground Floor, Hall B. Follow the cyan signage from the main entrance.",
            "cancel token": "To cancel token A-042, please confirm. Note: this action is irreversible.",
        };
        const reply = map[lower] ||
            "I can help with your token status, wait times, and directions. Please ask a specific question.";
        setMessages((prev) => [...prev, { role: "user", text: msg }, { role: "bot", text: reply }]);
        setInput("");
    };
    return (<>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-2xl hover:shadow-blue-400/40 hover:scale-110 transition-all duration-200 flex items-center justify-center" aria-label="Voice Assistant">
        {open ? <X size={22}/> : <Mic size={22}/>}
      </button>

      {open && (<div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Volume2 size={16}/>
              </div>
              <div>
                <p className="font-bold text-sm">Quelorax Assistant</p>
                <p className="text-xs text-blue-100">English / தமிழ் supported</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-xs text-green-300">Live</span>
              </div>
            </div>
          </div>

          <div className="h-56 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (<div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-slate-700 shadow-sm rounded-bl-none"}`}>
                  {m.text}
                </div>
              </div>))}
          </div>

          <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
            {quickReplies.map((q) => (<button key={q} onClick={() => respond(q)} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-blue-100 transition-colors font-medium shrink-0">
                {q}
              </button>))}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && input.trim() && respond(input.trim())} placeholder="Type or speak..." className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
            <button onClick={() => input.trim() && respond(input.trim())} className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors shrink-0">
              <Send size={15}/>
            </button>
          </div>
        </div>)}
    </>);
}
