import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchChannels } from "../services/api";
import { Share2, Info, Flag, Heart, Users, ChevronRight } from "lucide-react";

export default function Watch() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchChannels().then((data) => {
      setChannel(data[id]);
      // Grab a few other channels for the sidebar
      setRecommendations(data.slice(0, 6));
    });
  }, [id]);

  if (!channel) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-20 pb-12 px-4 md:px-8 max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Main Player Column --- */}
          <div className="flex-1">
            {/* Player Container with Ambient Glow */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-video">
                <Player url={channel.stream} />
              </div>
            </div>

            {/* Stream Info Area */}
            <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Live</span>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{channel.name}</h1>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <Users size={16} /> 2,842 watching
                  </span>
                  <span>•</span>
                  <span>{channel.category || "General Content"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all">
                  <Heart size={18} /> <span className="hidden sm:inline">Save</span>
                </button>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all">
                  <Share2 size={18} /> <span className="hidden sm:inline">Share</span>
                </button>
                <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:text-red-500">
                  <Flag size={18} />
                </button>
              </div>
            </div>

            {/* Description Box */}
            <div className="mt-8 p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-200">
                <Info size={18} className="text-purple-500" /> About this stream
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Broadcasting live from the {channel.name} network. Experience the best in 
                digital streaming quality. This feed is part of the open-source TV+Radio 
                initiative, providing decentralized access to global media.
              </p>
            </div>
          </div>

          {/* --- Right Sidebar: Recommendations --- */}
          <div className="w-full lg:w-96">
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
              Up Next
              <ChevronRight size={20} className="text-gray-500" />
            </h2>
            
            <div className="flex flex-col gap-4">
              {recommendations.map((item, idx) => (
                <Link 
                  to={`/watch/${idx}`} 
                  key={idx} 
                  className="group flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="w-32 aspect-video bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">LIVE</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-200 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">Global Broadcast</p>
                    <p className="text-[10px] text-gray-600 mt-1 flex items-center gap-1">
                      <Users size={10} /> 1.2k
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