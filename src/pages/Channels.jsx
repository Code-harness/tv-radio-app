import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import ChannelCard from "../components/ChannelCard";
import { fetchChannels } from "../services/api";
import { Search, ChevronDown } from "lucide-react";
import Footer from "../components/Footer";

export default function Channels() {
  const [allChannels, setAllChannels] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchChannels().then((data) => {
      const dataWithIds = data.map((channel, index) => ({
        ...channel,
        originalId: index,
      }));
      setAllChannels(dataWithIds);
      setLoading(false);
    });
  }, []);

  const filteredChannels = useMemo(() => {
    return allChannels.filter((c) => {
      const matchesSearch = c.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || c.group === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [allChannels, searchQuery, activeTab]);

  const visibleChannels = filteredChannels.slice(0, visibleCount);
  const hasMore = visibleCount < filteredChannels.length;

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-24 font-sans selection:bg-blue-500/30">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6">
        {/* --- Header Section --- */}
        <div className="flex flex-col border-b border-white/5 pb-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase leading-none">
                Explore Channels
              </h1>
              <p className="text-blue-100/20 font-bold uppercase tracking-[0.2em] text-[10px]">
                {filteredChannels.length} Verified Streams Online
              </p>
            </div>

            {/* Sharp Search Bar */}
            <div className="relative w-full md:w-[400px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                size={18}
              />
              <input
                type="text"
                placeholder="SEARCH DIRECTORY..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50 text-xs font-bold uppercase tracking-widest transition-all placeholder:text-white/10"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(50);
                }}
              />
            </div>
          </div>
        </div>

        {/* --- Category Quick-Filters --- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-10 no-scrollbar border-b border-white/5">
          {["All", "Entertainment", "Movies", "News", "Sports", "Music"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setVisibleCount(50);
                }}
                className={`px-6 py-2.5 rounded-lg border text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-[#0a0f1d] border-white"
                    : "bg-white/5 border-white/5 text-white/30 hover:text-white hover:border-white/20"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* --- Grid Layout --- */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-white/5 border border-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
            {visibleChannels.map((channel) => (
              <ChannelCard
                key={channel.originalId}
                channel={channel}
                index={channel.originalId}
              />
            ))}
          </div>
        )}

        {/* --- Load More --- */}
        {hasMore && (
          <div className="flex flex-col items-center justify-center mt-24 mb-32 space-y-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 50)}
              className="group flex items-center gap-4 px-12 py-4 bg-white text-[#0a0f1d] rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/5"
            >
              Load More Streams
              <ChevronDown
                size={16}
                className="group-hover:translate-y-1 transition-transform"
              />
            </button>
            <div className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
              Showing {visibleChannels.length} / {filteredChannels.length}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}