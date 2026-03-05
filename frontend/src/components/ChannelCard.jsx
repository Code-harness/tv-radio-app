// components/ChannelCard.jsx
export default function ChannelCard({ channel }) {
  return (
    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={channel.thumbnail} 
          alt={channel.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold">
          {channel.quality}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold truncate">{channel.name}</h3>
        <p className="text-xs text-gray-500 uppercase mt-1">{channel.type}</p>
      </div>
    </div>
  );
}