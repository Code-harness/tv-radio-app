import React, { useState } from "react";
import { Zap, ArrowRight, Radio } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans selection:bg-blue-600/30 flex flex-col">
      <Navbar />

      {/* SUBTLE SCANLINE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      <main className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* DECORATIVE BACKGROUND ELEMENT (NO GRADIENT) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl w-full text-center space-y-10 relative z-10">

          {/* MAIN HEADLINE */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter uppercase">
              THE SIGNAL <br /> 
              <span className="text-blue-600 font-black">IS COMING</span>
            </h1>
            <p className="text-blue-100/40 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
              We are finalizing the high-fidelity radio infrastructure. 
              Zero-tracking, ultra-low latency audio is launching soon.
            </p>
          </div>

          {/* CTA SECTION */}
          <div className="max-w-md mx-auto w-full">
            {!isSubscribed ? (
              <form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch gap-3 bg-[#0d1425] border border-white/10 rounded-2xl p-2 focus-within:border-blue-500/50 transition-all shadow-2xl"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter email for early access"
                  className="flex-1 bg-transparent py-4 px-5 outline-none text-sm font-medium placeholder:text-white/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Join List <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="py-4 px-6 bg-blue-600/10 border border-blue-600/20 rounded-2xl text-blue-400 font-bold text-sm uppercase tracking-widest animate-in fade-in zoom-in duration-300">
                Frequency locked. We'll notify you soon.
              </div>
            )}
          </div>

          {/* SECONDARY STATUS INDICATORS */}
          <div className="flex flex-wrap justify-center gap-8 pt-10">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-white/20" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">HLS Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio size={14} className="text-white/20" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}