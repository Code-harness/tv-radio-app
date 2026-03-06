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
  Monitor,
} from "lucide-react";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const repoUrl = "https://github.com/Code-harness/tv-radio-app";

  useEffect(() => {
    fetchChannels().then((data) => {
      // Shuffle channels randomly
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      // Pick first 5 for featured
      setFeatured(shuffled.slice(0, 5));
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <Navbar />

      {/* --- Aesthetic Hero Section --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/bg-hero.avif')` }}
        />

        {/* Overlay 1: Deep Navy Tint (Matching your color) */}
        <div className="absolute inset-0 z-[1] bg-[#0a0f1d]/85 backdrop-blur-[1px]" />

        {/* Overlay 2: Technical Texture */}
        <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

        {/* Overlay 3: Seamless Blend */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0a0f1d] via-transparent to-[#0a0f1d]/40" />

        <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
            Digital <br />
            <span className="text-white">Frequencies</span>
          </h1>

          <p className="max-w-xl mx-auto text-blue-100/40 text-sm md:text-lg mb-10 leading-relaxed font-bold uppercase tracking-widest">
            Advanced open-source streaming infrastructure. High-fidelity TV and
            Radio delivered with zero tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/channels"
              className="px-10 py-4 bg-white text-[#0a0f1d] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-500/10"
            >
              Start Watching
              <Play size={14} fill="currentColor" />
            </Link>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Github size={16} /> Repository
            </a>
          </div>
        </div>
      </section>

      {/* --- Telemetry Stats (Modern Grid) --- */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <StatItem
            icon={<Monitor size={18} />}
            value="30K+"
            label="Active Streams"
          />
          <StatItem
            icon={<Globe size={18} />}
            value="GLOBAL"
            label="Coverage"
          />
          <StatItem icon={<Zap size={18} />} value="99.9%" label="Uptime" />
          <StatItem
            icon={<Shield size={18} />}
            value="SAFE"
            label="Zero Trackers"
          />
        </div>
      </section>

      {/* --- Featured Channels Grid --- */}
      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-[0.3em]">
                <Activity size={14} /> System Scan
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Live Discovery
              </h2>
            </div>
            <Link
              to="/channels"
              className="hidden sm:flex items-center gap-2 text-[10px] font-black text-white/20 hover:text-blue-500 transition-all group uppercase tracking-[0.3em]"
            >
              Full Directory{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featured.length > 0
              ? featured.map((channel) => (
                  <Link
                    to={`/watch/${channel.slug}`}
                    key={channel.slug}
                    className="group p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all hover:border-blue-500/30"
                  >
                    <div className="aspect-video bg-black rounded-xl mb-4 overflow-hidden relative">
                      <img
                        src={channel.thumbnail}
                        alt={channel.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/400x225/0a0f1d/333?text=STREAM";
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-[8px] font-black uppercase tracking-tighter rounded">
                        Live
                      </div>
                    </div>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-50/80 group-hover:text-blue-400 truncate">
                      {channel.name}
                    </h3>
                    <p className="text-[9px] text-white/20 font-bold uppercase tracking-tight mt-1">
                      {channel.group}
                    </p>
                  </Link>
                ))
              : [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-white/5 animate-pulse rounded-2xl border border-white/5"
                  />
                ))}
          </div>
        </div>
      </section>

      {/* --- Value Proposition Grid --- */}
      <section className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          <ValueCard
            icon={<Zap size={20} />}
            title="Performance"
            text="Sub-second ignition via HLS engine optimization for seamless switching."
          />
          <ValueCard
            icon={<Shield size={20} />}
            title="Privacy"
            text="No cookies, no trackers. A completely serverless approach to security."
          />
          <ValueCard
            icon={<Cpu size={20} />}
            title="Core"
            text="Built with React 18 for a robust, future-proof directory experience."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-[#0a0f1d]">
      <div className="text-blue-500/40 mb-3">{icon}</div>
      <div className="text-xl font-black uppercase tracking-tighter">
        {value}
      </div>
      <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="p-10 space-y-4 bg-[#0a0f1d] hover:bg-white/[0.02] transition-colors group">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xs font-black uppercase tracking-[0.2em]">{title}</h3>
      <p className="text-white/30 leading-relaxed text-[10px] font-bold uppercase tracking-wider">
        {text}
      </p>
    </div>
  );
}
