import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchChannels } from "../services/api";
import { Share2, Heart, Play, ArrowLeft } from "lucide-react";

export default function Watch() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchChannels().then((data) => {
      const dataWithIds = data.map((item, index) => ({
        ...item,
        originalId: index,
      }));

      const current = dataWithIds.find((c) => c.originalId.toString() === id);
      setChannel(current);

      if (current) {
        let related = dataWithIds.filter(
          (c) =>
            c.group === current.group && c.originalId !== current.originalId,
        );

        if (related.length < 8) {
          const others = dataWithIds.filter((c) => c.group !== current.group);
          related = [...related, ...others.sort(() => 0.5 - Math.random())];
        }
        setRecommendations(related.slice(0, 10));
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  if (!channel)
    return (
      <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-blue-500/30 font-sans">
      <Navbar />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* Back Button Link */}
        <Link
          to="/channels"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-400/60 hover:text-blue-400 mb-6 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to All Channels
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Player Section --- */}
          <div className="flex-1 min-w-0">
            <div className="rounded-3xl overflow-hidden bg-black border border-white/5 shadow-2xl aspect-video">
              <Player url={channel.stream} />
            </div>

            <div className="mt-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/5 pb-8">
                <div className="flex gap-5">
                  <div className="hidden sm:flex w-16 h-16 bg-white/5 rounded-2xl border border-white/10 items-center justify-center p-3 shrink-0">
                    <img
                      src={channel.thumbnail}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-red-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                        Live
                      </span>
                      <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        {channel.group}
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                      {channel.name}
                    </h1>
                    <p className="text-blue-100/40 text-sm mt-2 font-medium">
                      Global Network Broadcast
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all text-blue-100/60">
                    <Heart size={18} />
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              {/* Description Box */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">
                    About Stream
                  </h3>
                  <p className="text-blue-100/60 text-sm leading-relaxed">
                    Streaming{" "}
                    <span className="text-white font-semibold">
                      {channel.name}
                    </span>{" "}
                    in high definition. Broadcasted via {channel.group}{" "}
                    category. This open-source player provides zero-tracking and
                    ultra-low latency.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">
                    Technical Info
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-100/30">Protocol</span>
                      <span className="text-blue-100/80">HLS / m3u8</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-100/30">Source</span>
                      <span className="text-blue-100/80">Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Recommendations Sidebar --- */}
          <div className="w-full lg:w-[380px] shrink-0">
            <h2 className="text-sm font-bold tracking-[0.2em] text-blue-100/30 uppercase mb-6">
              Up Next
            </h2>

            <div className="flex flex-col gap-3">
              {recommendations.map((item) => (
                <Link
                  to={`/watch/${item.originalId}`}
                  key={item.originalId}
                  className="group flex items-center gap-4 p-2 rounded-2xl border border-transparent hover:bg-white/[0.03] hover:border-white/5 transition-all"
                >
                  <div className="w-28 h-16 bg-[#080c17] rounded-xl overflow-hidden flex-shrink-0 relative border border-white/5 p-2 flex items-center justify-center">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/100x100/0a0f1d/333?text=TV";
                      }}
                    />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play size={14} fill="white" className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-blue-100 group-hover:text-blue-400 transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="text-[9px] text-blue-100/30 font-bold uppercase tracking-tight mt-1">
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
