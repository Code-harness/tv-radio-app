import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchChannels } from "../services/api";
import {
  Play,
  Github,
  ArrowRight,
  Shield,
  Cpu,
  Zap,
  Activity,
  Globe,
} from "lucide-react";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const repoUrl = "https://github.com/Code-harness/tv-radio-app";

  useEffect(() => {
    fetchChannels().then((data) => {
      const shuffled = [...data]
        .map((channel, index) => ({ ...channel, originalId: index }))
        .sort(() => 0.5 - Math.random());
      setFeatured(shuffled.slice(0, 5));
    });
  }, []);

  return (
    // Replaced black with deep navy: #0a0f1d
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-purple-500/30 font-sans transition-colors duration-300">
      <Navbar />

      {/* --- Premium Hero Section --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Ambient background glow - Navy/Purple blend */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),_transparent_50%)]" />

        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300/70 mb-10">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Global Stream Engine
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Entertainment <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
              without boundaries.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100/60 text-lg md:text-xl mb-12 leading-relaxed font-light">
            An advanced open-source directory for TV and Radio. Experience
            high-fidelity streams with zero tracking and a refined interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/channels"
              className="group w-full sm:w-auto px-10 py-4 bg-white text-[#0a0f1d] font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/10"
            >
              Start Watching
              <Play
                size={18}
                fill="currentColor"
                className="group-hover:scale-110 transition-transform"
              />
            </Link>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Github size={20} /> Repository
            </a>
          </div>

          <div className="mt-16 opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-xs font-bold tracking-widest text-blue-300/50 uppercase">
              Developed by{" "}
              <a
                href="https://github.com/Code-harness"
                className="text-white hover:text-blue-400 underline decoration-blue-500/50 underline-offset-4"
              >
                CodeHarness
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* --- Stats Grid --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem
            icon={<Activity size={20} />}
            value="30,000+"
            label="Live Channels"
          />
          <StatItem icon={<Globe size={20} />} value="150+" label="Countries" />
          <StatItem
            icon={<Zap size={20} />}
            value="99.9%"
            label="Stream Uptime"
          />
          <StatItem
            icon={<Cpu size={20} />}
            value="0"
            label="Ads or Trackers"
          />
        </div>
      </section>

      {/* --- Dynamic Content Grid --- */}
      <section className="py-24 bg-[#080c17]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Live Discovery</h2>
              <p className="text-blue-200/40 font-medium">
                Curated picks from our network
              </p>
            </div>
            <Link
              to="/channels"
              className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group uppercase tracking-widest"
            >
              Browse Directory{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {featured.length > 0
              ? featured.map((channel) => (
                  <Link
                    to={`/watch/${channel.originalId}`}
                    key={channel.originalId}
                    className="group flex flex-col"
                  >
                    <div className="aspect-video bg-white/5 rounded-2xl mb-5 overflow-hidden border border-white/10 flex items-center justify-center relative shadow-2xl group-hover:border-blue-500/50 transition-all">
                      <img
                        src={channel.thumbnail}
                        alt={channel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/400x225/0a0f1d/333?text=STREAMING";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/90 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">
                          Live
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-blue-50 group-hover:text-blue-400 transition-colors truncate px-1">
                      {channel.name}
                    </h3>
                    <p className="text-[10px] text-blue-300/40 font-bold uppercase tracking-widest mt-1.5 px-1">
                      {channel.group}
                    </p>
                  </Link>
                ))
              : [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-white/5 rounded-2xl animate-pulse border border-white/5"
                  />
                ))}
          </div>
        </div>
      </section>

      {/* --- Values --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5">
        <ValueCard
          icon={<Zap className="text-blue-400" size={28} />}
          title="Instant Response"
          text="Advanced HLS engine optimized by CodeHarness for sub-second stream ignition."
        />
        <ValueCard
          icon={<Shield className="text-blue-400" size={28} />}
          title="Privacy First"
          text="Zero tracking, no cookies, and completely serverless architecture for total privacy."
        />
        <ValueCard
          icon={<Cpu className="text-blue-400" size={28} />}
          title="Modern Core"
          text="Built with React 18 and Tailwind CSS for a robust, future-proof experience."
        />
      </section>

      <Footer />
    </div>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-blue-400 mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[10px] font-bold text-blue-300/30 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left group">
      <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-blue-100/50 leading-relaxed text-sm font-medium">
        {text}
      </p>
    </div>
  );
}
