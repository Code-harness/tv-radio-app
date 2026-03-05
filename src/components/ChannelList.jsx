import { useEffect, useState } from "react";
import axios from "axios";

function ChannelList() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/channels")
      .then(res => setChannels(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Channels</h2>

      {channels.map((channel, index) => (
        <div key={index}>
          <h3>{channel.name}</h3>
          <p>{channel.type}</p>
        </div>
      ))}

    </div>
  );
}

export default ChannelList;