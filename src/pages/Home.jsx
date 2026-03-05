import Navbar from "../components/Navbar";
import { Play, Radio, Code, Globe, Zap, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-purple-500/30">
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
        
        <div className="relative z-10">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-6 inline-block animate-fade-in">
            🚀 Now in Public Beta
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            TV + Radio <br /> <span className="text-purple-500">Unchained.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10">
            The ultimate open-source streaming engine. Access thousands of global TV channels 
            and radio stations through a clean, ad-free, and community-driven interface.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2">
              <Play size={20} fill="black" /> Start Watching
            </button>
            <button className="px-8 py-4 bg-white/10 border border-white/10 backdrop-blur-md font-bold rounded-full hover:bg-white/20 transition-all flex items-center gap-2">
              <Github size={20} /> View Source
            </button>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-yellow-400" />}
            title="Ultra-Low Latency"
            description="Optimized HLS and Dash playback for a buffer-free experience across all devices."
          />
          <FeatureCard 
            icon={<Globe className="text-blue-400" />}
            title="Global Reach"
            description="Built-in support for IPTV playlists and radio directories from 150+ countries."
          />
          <FeatureCard 
            icon={<Code className="text-purple-400" />}
            title="Open Source"
            description="Fully transparent code. Host it yourself, customize the UI, and keep your data private."
          />
        </div>
      </section>

      {/* --- "Live Now" Preview Section --- */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Live Right Now</h2>
              <p className="text-gray-400">Discover what's trending across the network.</p>
            </div>
            <button className="text-purple-400 hover:text-purple-300 font-medium">View all channels →</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-zinc-800 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-2 left-2 bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">LIVE</div>
                </div>
                <h3 className="font-semibold text-gray-200">Channel {i} Stream</h3>
                <p className="text-sm text-gray-500">World News • 2.4k watching</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Community / Contribution Section --- */}
      <section className="py-32 text-center px-6">
        <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-zinc-900/50 border border-white/5">
          <Radio className="mx-auto mb-6 text-purple-500" size={48} />
          <h2 className="text-4xl font-bold mb-6">Built by the community.</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Missing a channel? Found a bug? TV + Radio is built by contributors around the globe. 
            Join our Discord or submit a Pull Request on GitHub.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
            Become a Contributor
          </button>
        </div>
      </section>

      {/* --- Simple Footer --- */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2024 TV + Radio Open Source Project. Licensed under MIT.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-purple-500/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}