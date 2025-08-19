export async function searchItunes(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=30`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).map((r) => ({
    id: r.trackId,
    title: r.trackName,
    artist: r.artistName,
    artwork: r.artworkUrl100?.replace('100x100bb','300x300bb'),
    url: r.previewUrl,
    year: r.releaseDate ? new Date(r.releaseDate).getFullYear() : undefined,
  }));
}
