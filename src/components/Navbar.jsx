import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tv, Github, Menu, X, Play, GitPullRequest } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const repoUrl = "https://github.com/Code-harness/tv-radio-app";

  // Auto-close mobile menu on navigation
  useEffect(() => setIsOpen(false), [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* --- Dark Overlay Background --- */}
      <div 
        className={`fixed inset-0 bg-[#060912]/80 backdrop-blur-md z-[90] transition-opacity duration-500 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0a0f1d]/90 backdrop-blur-xl transition-all">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-all shadow-lg shadow-blue-500/20">
              <Tv size={20} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold tracking-tighter leading-none text-white">
                TELERADIO
              </span>
              {/* <span className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mt-0.5">
                Project
              </span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink to="/channels" label="TV Channels" />
            <NavLink to="/radios" label="Radio Stations" />
            <div className="h-4 w-[1px] bg-white/10" />
            <a 
              href={repoUrl}
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-bold text-blue-100/40 hover:text-white transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              <span>V 1.0.0</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link 
              to="/channels" 
              className="hidden sm:flex items-center gap-2 bg-white text-[#0a0f1d] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95"
            >
              <Play size={16} fill="currentColor" /> Go Live
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-xl bg-white/5 text-blue-100/60 active:bg-white/10 relative z-[110]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu Content --- */}
        <div className={`
          fixed inset-x-0 top-20 bg-[#0a0f1d] z-[95] lg:hidden transition-all duration-500 ease-in-out border-b border-white/5
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}
        `}>
          <div className="flex flex-col p-6 gap-3">
            <MobileLink to="/channels" label="TV Channels" />
            <MobileLink to="/radio" label="Radio Stations" />
            
            <div className="mt-2 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <GitPullRequest size={16} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Contribute</span>
              </div>
              <p className="text-xs text-blue-100/40 leading-relaxed mb-3">
                Let's improve the directory.
              </p>
              <a 
                href={`${repoUrl}`}
                className="text-xs font-bold text-white border-b border-blue-500 pb-0.5"
              >
                Submit Changes
              </a>
            </div>

            <Link 
              to="/channels" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-center font-bold text-base shadow-lg shadow-blue-600/20 mt-2"
            >
              Watch Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, label }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-bold text-blue-100/40 hover:text-blue-400 transition-colors relative py-2 group"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 rounded-full transition-all group-hover:w-full" />
    </Link>
  );
}

function MobileLink({ to, label }) {
  return (
    <Link 
      to={to} 
      className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/5 text-lg font-bold text-white active:bg-blue-600 transition-colors"
    >
      {label}
    </Link>
  );
}