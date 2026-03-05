import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Music, Tv } from "lucide-react";

export default function Player({ url }) {
  const videoRef = useRef(null);
  const isAudio =
    url?.endsWith(".mp3") || url?.includes("icecast") || url?.includes("radio");

  useEffect(() => {
    if (!url || isAudio) return;

    const video = videoRef.current;
    let hls;

    if (Hls.isSupported() && url.includes(".m3u8")) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video
          .play()
          .catch(() =>
            console.log("Autoplay blocked, waiting for user interaction."),
          );
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for Safari
      video.src = url;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [url, isAudio]);

  return (
    <div className="w-full bg-zinc-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500">
      {isAudio ? (
        /* --- Modern Audio Interface --- */
        <div className="h-[400px] flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/20 to-black p-8 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-32 h-32 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
              <Music className="text-purple-500" size={48} />
            </div>
          </div>
          <h2 className="text-xl font-medium text-gray-300 mb-6">
            Live Audio Stream
          </h2>
          <audio
            controls
            autoPlay
            src={url}
            className="w-full max-w-md accent-purple-500 custom-audio-player"
          />
        </div>
      ) : (
        /* --- Modern Video Interface --- */
        <div className="relative aspect-video group">
          <video
            ref={videoRef}
            controls
            autoPlay
            muted // Muted helps autoplay work reliably
            className="w-full h-full bg-black object-contain"
          />
          {/* Subtle overlay hint */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Live HD
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
