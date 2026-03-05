export const API_URL = "http://localhost:5000";

export const fetchChannels = async () => {
  try {
    const res = await fetch(`${API_URL}/channels`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch channels:", err);
    return [];
  }
};