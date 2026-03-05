import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchChannels } from "../services/api";
import { Share2, Info, Flag, Heart, Users, ChevronRight, Zap, Play } from "lucide-react";

export default function Watch() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchChannels().then((data) => {
      // Mapping persistent IDs
      const dataWithIds = data.map((item, index) => ({
        ...item,
        originalId: index,
      }));

      const current = dataWithIds.find((c) => c.originalId.toString() === id);
      setChannel(current);

      if (current) {
        // Find channels in the same group (category)
        let related = dataWithIds.filter(
          (c) => c.group === current.group && c.originalId !== current.originalId
        );

        // Fallback: If not enough related, shuffle in others
        if (related.length < 8) {
          const others = dataWithIds.filter((c) => c.group !== current.group);
          related = [...related, ...others.sort(() => 0.5 - Math.random())];
        }

        setRecommendations(related.slice(0, 12));
      }
    });
    
    window.scrollTo(0, 0);
  }, [id]);

  if (!channel) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- Main Player --- */}
          <div className="flex-1">
            <div className="relative rounded-[2rem] overflow-hidden bg-black shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] border border-white/5 aspect-video">
              <Player url={channel.stream} />
            </div>

            <div className="mt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Channel Logo in Main View */}
                  <div className="hidden sm:flex w-20 h-20 bg-zinc-900 rounded-2xl border border-white/10 items-center justify-center p-3 shrink-0">
                    <img src={channel.logo} alt="" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                        Live
                      </span>
                      <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">{channel.group}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase">{channel.name}</h1>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-4 bg-zinc-900 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all">
                    <Share2 size={18} /> SHARE
                  </button>
                </div>
              </div>

              <div className="mt-10 p-1 bg-gradient-to-r from-white/10 to-transparent rounded-[2.5rem]">
                <div className="bg-[#0a0a0a] p-8 rounded-[2.4rem]">
                   <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Broadcast Details</h3>
                   <p className="text-zinc-400 text-lg leading-relaxed">
                     You are currently watching <span className="text-white font-bold">{channel.name}</span>. 
                     This stream is sourced via the <span className="text-purple-500">{channel.group}</span> network. 
                     Experience ad-free, open-source streaming at its best.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- Recommended Sidebar with Logos --- */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-purple-600 rounded-full" />
              <h2 className="text-xl font-black italic tracking-tight">RECOMMENDED</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {recommendations.map((item) => (
                <Link 
                  to={`/watch/${item.originalId}`} 
                  key={item.originalId} 
                  className="group flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all"
                >
                  {/* Recommendation Thumbnail / Logo */}
                  <div className="w-24 h-16 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/5 p-2 flex items-center justify-center">
                    <img 
                      src={item.logo} 
                      alt="" 
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://placehold.co/100x100/111/fff?text=TV"; }}
                    />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-purple-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <Play size={16} fill="white" className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-zinc-200 group-hover:text-purple-400 transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">
                      {item.group}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}