import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChannelCard from "../components/ChannelCard";
import { fetchChannels } from "../services/api";
import { Search, Filter, Tv, Radio as RadioIcon, Heart } from "lucide-react";

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChannels()
      .then((data) => {
        setChannels(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter logic (optional but recommended for modern UIs)
  const filteredChannels = channels.filter(channel => 
    channel.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row gap-8">
        
        {/* --- Sidebar (Sticky) --- */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Library</h3>
            <nav className="space-y-1">
              <SidebarItem icon={<Tv size={18}/>} label="All Channels" active />
              <SidebarItem icon={<RadioIcon size={18}/>} label="Radio Stations" />
              <SidebarItem icon={<Heart size={18}/>} label="Favorites" />
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {['News', 'Sports', 'Movies', 'Music', 'Documentary'].map(cat => (
                <button key={cat} className="text-sm text-gray-400 hover:text-white transition-colors text-left px-3 py-1.5 rounded-lg hover:bg-white/5">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Browse Channels</h1>
              <p className="text-gray-500 text-sm">{filteredChannels.length} streams available</p>
            </div>

            <div className="relative group max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search channels, languages, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Grid Logic */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredChannels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredChannels.map((channel, index) => (
                <ChannelCard key={index} channel={channel} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-white/10">
              <Tv className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-xl font-medium">No channels found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Helper Components
function SidebarItem({ icon, label, active = false }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-zinc-800 rounded-xl mb-3" />
      <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
      <div className="h-3 bg-zinc-900 rounded w-1/2" />
    </div>
  );
}