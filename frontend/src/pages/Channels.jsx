import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChannelCard from "../components/ChannelCard";
import { fetchChannels } from "../services/api";

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChannels()
      .then(data => {
        setChannels(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!channels.length) return <p className="p-4">No channels found</p>;

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Channels</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((channel, index) => (
            <ChannelCard key={index} channel={channel} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}