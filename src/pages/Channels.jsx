import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import ChannelCard from "../components/ChannelCard";
import { fetchChannels } from "../services/api";
import { Search, ChevronDown, LayoutGrid, Radio, Tv } from "lucide-react";
import Footer from "../components/Footer";

export default function Channels() {
  const [allChannels, setAllChannels] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchChannels().then((data) => {
      // FIX: Assign a persistent originalIndex so filtering doesn't break routing
      const dataWithIds = data.map((channel, index) => ({
        ...channel,
        originalId: index, // This stays the same even when filtered
      }));
      setAllChannels(dataWithIds);
      setLoading(false);
    });
  }, []);

  // Optimized Filtering logic
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
    <div className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6">
        {/* --- Modern Header Section --- */}
        <div className="flex flex-col space-y-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter mb-2 bg-gradient-to-r from-white via-white to-zinc-600 bg-clip-text text-transparent">
                EXPLORE CONTENT
              </h1>
              <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] text-xs">
                {filteredChannels.length} Streams Verified & Online
              </p>
            </div>

            {/* Glassmorphic Search */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search channel or category..."
                  className="w-full bg-zinc-900/50 border border-white/5 backdrop-blur-md rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(50); // Reset pagination on search
                  }}
                />
              </div>
            </div>
          </div>

          {/* --- Category Quick-Filters --- */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {["All", "Entertainment", "Movies", "News", "Sports", "Music"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setVisibleCount(50);
                  }}
                  className={`px-6 py-2 rounded-full border text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-white text-black border-white"
                      : "bg-transparent border-white/10 text-zinc-400 hover:border-white/30"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        {/* --- Grid Layout --- */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-zinc-900 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {visibleChannels.map((channel) => (
              <ChannelCard
                key={channel.originalId}
                channel={channel}
                index={channel.originalId} // Pass the original persistent ID
              />
            ))}
          </div>
        )}

        {/* --- Modern Load More --- */}
        {hasMore && (
          <div className="flex flex-col items-center justify-center mt-20 mb-32 space-y-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 50)}
              className="group flex items-center gap-3 px-10 py-4 bg-zinc-900 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 font-bold"
            >
              Show More Streams
              <ChevronDown
                size={20}
                className="group-hover:translate-y-1 transition-transform"
              />
            </button>
            <p className="text-zinc-600 text-xs uppercase tracking-widest">
              Viewing {visibleChannels.length} of {filteredChannels.length}
            </p>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
