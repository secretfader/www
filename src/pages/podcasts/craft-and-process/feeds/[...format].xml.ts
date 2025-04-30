import { basename } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import {
  getPodcasts,
  getPodcast,
  buildCustomData,
  xmlns,
  entriesToRSSItems,
} from "../../../../utils/feed";

//
// Astro APIs
//
export async function GET(ctx) {
  const {
    id,
    data: { title, authors, categories, media, explicit },
    body: description,
    site,
    entries,
  } = await getPodcast(
    { site: ctx.site, base: `/podcasts`, query: "craft-and-process" },
    getPodcasts(),
  );

  let format = "mp3";
  if (ctx.params.format && ctx.params.format == "video") {
    format = "mp4";
  }

  return await rss({
    title: format === "mp4" ? `${title}: Video` : title,
    description,
    site,
    xmlns: xmlns(),
    customData: buildCustomData({
      id,
      site: ctx.url,
      title,
      authors,
      categories,
      explicit,
    }),
    items: entriesToRSSItems(entries, format, {
      media,
      site,
    }),
  });
}

export async function getStaticPaths() {
  const podcasts = await getPodcasts();

  const audio = podcasts.map((p) => ({
    params: { format: "audio" },
    props: p,
  }));

  const video = podcasts.map((p) => ({
    params: { format: "video" },
    props: p,
  }));

  return [...audio, ...video]; // disco
}
