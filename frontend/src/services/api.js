// URL for free public IPTV API (no key needed)
export const API_URL = "https://iptv-org.github.io/api/channels.json";

export const fetchChannels = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Optional: filter for only TV or radio channels
    const filtered = data.filter(ch => ch.url && (ch.type === "tv" || ch.type === "radio"));

    return filtered;
  } catch (err) {
    console.error("Failed to fetch channels:", err);
    return [];
  }
};