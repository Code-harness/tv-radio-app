import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Music,
  AlertCircle,
  RefreshCw,
  Volume2,
  VolumeX,
  Maximize,
  Play,
  Pause,
} from "lucide-react";

export default function Player({ url }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
  };

  // Handle Volume Slider
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  // Toggle Mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      videoRef.current.muted = newMuteState;
      if (newMuteState) setVolume(0);
      else setVolume(videoRef.current.volume || 1);
    }
  };

  useEffect(() => {
    if (!url) return;
    setError(false);
    setIsLoading(true);

    const video = videoRef.current;
    let hls;

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration || bufferedEnd;
        setProgress((bufferedEnd / duration) * 100);
      }
    };

    if (Hls.isSupported() && !isAudio) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.response?.code === 404 || data.fatal) setError(true);
      });
    }

    video.addEventListener("progress", handleProgress);
    return () => {
      if (hls) hls.destroy();
      video.removeEventListener("progress", handleProgress);
    };
  }, [url]);

  const isAudio =
    url?.endsWith(".mp3") || url?.includes("icecast") || url?.includes("radio");

  return (
    <div className="w-full bg-[#080c17] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative group">
      {/* Loading/Error Overlays */}
      {error && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0f1d] p-6 text-center">
          <AlertCircle className="text-red-500 mb-4" size={40} />
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest"
          >
            Reconnect
          </button>
        </div>
      )}

      {isLoading && !error && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a0f1d]">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isAudio ? (
        <div className="h-[300px] flex flex-col items-center justify-center bg-gradient-to-b from-blue-600/10 to-transparent p-8">
          <Music className="text-blue-500 mb-6" size={56} />
          <audio
            ref={videoRef}
            autoPlay
            src={url}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="opacity-80"
            controls
          />
        </div>
      ) : (
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Controls */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {/* Buffer Line */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-blue-400 transition-all active:scale-90"
                >
                  {isPlaying ? (
                    <Pause size={28} fill="currentColor" />
                  ) : (
                    <Play size={28} fill="currentColor" />
                  )}
                </button>

                {/* --- Functional Volume --- */}
                <div className="flex items-center gap-3 group/vol">
                  <button
                    onClick={toggleMute}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-500 hover:bg-white/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-600/20 border border-red-500/30 px-3 py-1 rounded-lg flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-red-500">
                    Live
                  </span>
                </div>
                <button
                  onClick={() => videoRef.current.requestFullscreen()}
                  className="text-white/50 hover:text-white"
                >
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
