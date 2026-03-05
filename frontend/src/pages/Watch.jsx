import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchChannels } from "../services/api";

export default function Watch() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    fetchChannels().then(data => setChannel(data[id]));
  }, [id]);

  if (!channel) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{channel.name}</h1>
        <Player url={channel.stream} />
      </div>
    </div>
  );
}