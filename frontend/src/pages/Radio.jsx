import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchRadios } from "../services/api"; // Assuming a similar API helper
import { Radio, Activity, Headset, Star, Search, Play, Pause, Volume2 } from "lucide-react";

export default function Radios() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStation, setCurrentStation] = useState(null);

  useEffect(() => {
    fetchRadios()
      .then((data) => {
        setStations(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Top Header & Search --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-purple-500 mb-2">
              <Activity size={20} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Live Frequency</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter">GLOBAL RADIO</h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by frequency or genre..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:bg-white/10 transition-all outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* --- Radio Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading ? (
            [...Array(10)].map((_, i) => <div key={i} className="h-48 bg-white/5 rounded-3xl animate-pulse" />)
          ) : (
            stations.map((station) => (
              <StationCard 
                key={station.id} 
                station={station} 
                isActive={currentStation?.id === station.id}
                onClick={() => setCurrentStation(station)}
              />
            ))
          )}
        </div>
      </div>

      {/* --- Floating Audio Player Bar --- */}
      {currentStation && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 transition-all animate-slide-up">
          <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center animate-spin-slow">
                <RadioIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">{currentStation.name}</h4>
                <p className="text-xs text-gray-400 mt-1">128kbps • Stereo</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-white transition-colors"><Star size={20} /></button>
              <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <Pause size={24} fill="black" />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <Volume2 size={20} className="text-gray-400" />
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StationCard({ station, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`group relative p-6 rounded-[2.5rem] cursor-pointer transition-all duration-500 border ${
        isActive ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
      }`}
    >
      <div className="aspect-square rounded-full bg-zinc-800 mb-4 overflow-hidden relative flex items-center justify-center shadow-inner">
        {station.favicon ? (
          <img src={station.favicon} alt={station.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <Headset size={40} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
        )}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play size={20} fill="black" className="ml-1" />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="font-bold text-sm truncate">{station.name}</h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{station.tags?.split(',')[0] || 'Radio'}</p>
      </div>
    </div>
  );
}

function RadioIcon({ size }) {
    return <Radio size={size} />;
}