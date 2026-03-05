import { Link } from "react-router-dom";

export default function ChannelCard({ channel, index }) {
  return (
    <Link to={`/watch/${index}`}>
      <div className="border p-4 rounded-lg hover:shadow-lg hover:border-red-500 transition mb-4">
        <h2 className="font-bold text-lg">{channel.name}</h2>
        <p className="text-sm text-gray-400">{channel.type.toUpperCase()}</p>
      </div>
    </Link>
  );
}