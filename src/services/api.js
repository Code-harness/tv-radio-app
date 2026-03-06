export const fetchChannels = async () => {
  try {
    const res = await fetch("/channels.json");
    if (!res.ok) throw new Error("Failed to load channel data");

    const data = await res.json();

    return data.map((item) => ({
      slug: item.slug,
      name: item.name.trim(),
      group: item.group || "General",
      thumbnail: item.logo || "https://ui-avatars.com/api/?name=TV",
      stream: item.stream.trim(),
      type: item.group?.toLowerCase().includes("radio") ? "radio" : "tv",
    }));
  } catch (err) {
    console.error("Error loading JSON file:", err);
    return [];
  }
};
