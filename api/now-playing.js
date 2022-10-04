import { getNowPlaying } from "../src/utils/spotify";

export default async function handler(_, response) {
  const data = await getNowPlaying();

  if (data.status === 204 || data.status > 400) {
    return response
      .status(200)
      .setHeader("content-type", "application/json")
      .json({ isPlaying: false });
  }

  const song = await data.json();

  if (song.item === null) {
    return response
      .status(200)
      .setHeader("content-type", "application/json")
      .json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return response
    .status(200)
    .setHeader("content-type", "application/json")
    .setHeader(
      "cache-control",
      "public, s-maxage=60, stale-while-revalidate=30"
    )
    .json({
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
}
