import { getCollection } from "astro:content";

export const byDate = (a, b) =>
  new Date(b.data.pubDate) - new Date(a.data.pubDate);

export const published = (e) => new Date(e.data.pubDate) < new Date();

export const getPodcasts = async () => await getCollection("podcasts");

export const formatDate = (date) => new Date(date).toLocaleDateString();
