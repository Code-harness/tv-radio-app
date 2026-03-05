import { Link } from "react-router-dom";
import { Tv, Radio, Github, Menu } from "lucide-react"; // Assuming lucide-react for icons

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-purple-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Tv size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            TV + RADIO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/channels" label="TV Channels" />
          <NavLink to="/radio" label="Radio Stations" />
          <NavLink to="/browse" label="Browse" />
          <div className="h-4 w-[1px] bg-white/10" /> {/* Divider */}
          <NavLink to="/community" label="Community" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <Github size={18} />
            <span>v2.0.4</span>
          </a>
          
          <Link 
            to="/watch" 
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            Go Live
          </Link>
          
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-gray-400">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

// Sub-component for cleaner links
function NavLink({ to, label }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  );
}