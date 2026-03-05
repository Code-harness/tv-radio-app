import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChannelCard from "../components/ChannelCard";
import { fetchChannels } from "../services/api";
import { Search, ChevronDown } from "lucide-react";

export default function Channels() {
  const [allChannels, setAllChannels] = useState([]); // Master list
  const [visibleChannels, setVisibleChannels] = useState([]); // What the user sees
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const CHANNELS_PER_PAGE = 50;

  useEffect(() => {
    fetchChannels().then((data) => {
      setAllChannels(data);
      // Initial load of first 50
      setVisibleChannels(data.slice(0, CHANNELS_PER_PAGE));
      setLoading(false);
    });
  }, []);

  // Handle Search + Pagination
  useEffect(() => {
    const filtered = allChannels.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Reset to page 1 on search
    setPage(1);
    setVisibleChannels(filtered.slice(0, CHANNELS_PER_PAGE));
  }, [searchQuery, allChannels]);

  const loadMore = () => {
    const nextPage = page + 1;
    const startIndex = 0; // We keep existing items and append new ones
    const endIndex = nextPage * CHANNELS_PER_PAGE;
    
    const filtered = allChannels.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setVisibleChannels(filtered.slice(startIndex, endIndex));
    setPage(nextPage);
  };

  const hasMore = visibleChannels.length < allChannels.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).length;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold italic uppercase tracking-tighter">Live Stream Library</h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search 1,000+ channels..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-600 transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {visibleChannels.map((channel, index) => (
            <ChannelCard key={index} channel={channel} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-16 mb-24">
            <button 
              onClick={loadMore}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-purple-500/10"
            >
              Load More Channels <ChevronDown size={20} />
            </button>
          </div>
        )}

        {loading && <p className="text-center text-gray-500">Scanning satellite feeds...</p>}
      </div>
    </div>
  );
}