import { getCollection, getEntry, render as astroRender } from "astro:content";

export const render = astroRender;

export const byDate = (a, b) =>
  new Date(b.data.pubDate) - new Date(a.data.pubDate);

export const byDescNumber = (a, b) => b.data.number - a.data.number;

export const published = (e) => new Date(e.data.pubDate) < new Date();

export const getPodcasts = async () => await getCollection("podcasts");
export const getEpisodes = async () => await getCollection("episodes");
export const getVideos = async () => await getCollection("videos");

export const formatDate = (date) => new Date(date).toLocaleDateString();

export const getPodcastById = async (id: string) =>
  (await getPodcasts()).find((p) => p.id === id);

export const getEpisodesByShowID = async (id: string) =>
  (await getEpisodes())
    .filter(({ filePath }) => filePath && filePath.split("/").includes(id))
    .sort(byDescNumber);

export const getPage = async (id: string) => await getEntry("pages", id);

export const buildMediaURL = (host, asset) => {
  const parsed = new URL(host);
  const assetPath = [parsed.pathname, asset.filename].join("/");
  return new URL(assetPath, `https://${parsed.host}`);
};

export const rewriteURLForPodtrac = (url) => {
  const ext = url.endsWith("mp4") ? "mp4" : "mp3";

  if (import.meta.env.PROD) {
    url = url.replace("https://", "");
    url = url.replace("http://", "");
    url = `https://dts.podtrac.com/redirect.${ext}/${url}`;
  }

  return url;
};
