import { PlayCircle, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChannelCard({ channel, index }) {
  return (
    <Link to={`/watch/${index}`} className="group relative">
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
        
        {/* Image Container */}
        <div className="aspect-video relative overflow-hidden bg-zinc-800">
          <img 
            src={channel.thumbnail} 
            alt={channel.name} 
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
            onError={(e) => { e.target.src = "https://placehold.co/600x400/000000/FFFFFF?text=No+Logo"; }}
          />
          
          {/* Group Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            <Tag size={10} className="text-purple-400" />
            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-tight">
              {channel.group}
            </span>
          </div>

          {/* Hover Play Icon */}
          <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <PlayCircle size={48} className="text-white drop-shadow-2xl" />
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-sm text-white truncate group-hover:text-purple-400 transition-colors">
            {channel.name}
          </h3>
          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 italic">
             Ready to stream • HLS
          </p>
        </div>
      </div>
    </Link>
  );
}