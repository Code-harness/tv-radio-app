import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function Player({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    const video = videoRef.current;

    if (Hls.isSupported() && url.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [url]);

  return (
    url.endsWith(".mp3") ? 
      <audio controls src={url} className="w-full" /> :
      <video ref={videoRef} controls className="w-full h-[500px] bg-black" />
  );
}